import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import axiosAdminInstance from "../axios/axiosadminInstanse";

export default function AddAddressAdmin({
  openPop,
  handleClose,
  setSuccessMessage,
  AddressInfo,
  Type,
  Id,
}) {
  useEffect(() => {
    setFormData({
      full_name: AddressInfo.full_name,
      nickname: AddressInfo.address_nickname || AddressInfo.nickname,
      email: AddressInfo.email,
      country: "USA",
      company_name: AddressInfo.company_name,
      address_line_1: AddressInfo.address_line_1,
      address_line_2: AddressInfo.address_line_2,
      city: AddressInfo.city,
      state: AddressInfo.state_code,
      pincode: AddressInfo.pincode,
      phone_number: AddressInfo.phone_number,
    });
    console.log("AddressInfo.address_nickname", AddressInfo);
  }, [openPop]);
  const [formData, setFormData] = useState({
    full_name: "",
    nickname: "",
    email: "",
    country: "USA",
    company_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
    phone_number: "",
  });
  const usStates = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
  ];

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    // console.log("openPop",openPop);
  }, []);

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!formData.full_name) {
      formErrors.fullName = "Full Name is required.";
      valid = false;
    }
    if (!formData.nickname) {
      formErrors.nickName = "Address Nickname is required.";
      valid = false;
    }

    if (!formData.email) {
      formErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid.";
      valid = false;
    }

    if (!formData.country) {
      formErrors.country = "Country is required.";
      valid = false;
    }

    if (!formData.address_line_1) {
      formErrors.addressLine1 = "Address Line 1 is required.";
      valid = false;
    }

    if (!formData.city) {
      formErrors.city = "City is required.";
      valid = false;
    }

    if (!formData.state) {
      formErrors.state = "State is required.";
      valid = false;
    }

    if (!formData.pincode) {
      formErrors.zipCode = "Zip Code is required.";
      valid = false;
    } else if (!/^\d{5}$/.test(formData.pincode)) {
      formErrors.zipCode = "Zip Code must be a 5-digit number.";
      valid = false;
    }
    if (!formData.phone_number) {
      formErrors.phoneNo = "Phone Number is required";
      valid = false;
    } else if (/[ -]/.test(formData.phone_number)) {
      formErrors.phoneNo =
        "Please enter your phone number without spaces or dashes";
      valid = false;
    } else if (!/^\d{6,15}$/.test(formData.phone_number)) {
      formErrors.phoneNo = "Phone Number must be exactly 10 digits";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      formData.state_code = formData.state;
      formData.type = Type == "Billing" ? "billing" : "shipping";
      formData.id = Id;
      try {
        setLoading(true);
        const response = await axiosAdminInstance.put(
          "/updateOrderAddress",
          formData
        );
        // console.log(response);
        toast.success("Address Updated sucessfully");
        setLoading(false);
        if (openPop) {
          setSuccessMessage(true);
        } else {
          toast.error(`Something wents Wrong.`);
        }
      } catch (error) {
        setLoading(false);
        // Check if error.response exists and is a 400 status
        if (error.response && error.response.status === 400) {
          // Handle 400 error
          toast.error(`${error.response.data.message || "Bad Request"}`);
        } else {
          // Handle other errors
          toast.error(`An error occurred: ${error.message}`);
        }
      }
    } else {
      // console.log("Form is invalid.");
    }
  };

  return (
    <React.Fragment>
      <section className={`myaccount ${openPop ? "" : "ptb-50"}`}>
        <Container>
          <Card>
            {!openPop && (
              <Card.Header className="d-flex justify-content-between align-items-center flex-wrap">
                <h5>Add Address</h5>
                <Link
                  to="/my-addresses"
                  className="btn btn-primary d-inline-flex align-items-center justify-content-center min-width-18"
                >
                  Back To Address
                </Link>
              </Card.Header>
            )}
            <Card.Body>
              <Form className="accountform" onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        isInvalid={!!errors.fullName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fullName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Company Name (optional)</Form.Label>
                      <Form.Control
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="Enter Company Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Address Nickname</Form.Label>
                      <Form.Control
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        placeholder="Enter Address Nickname"
                        isInvalid={!!errors.nickName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nickName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Address Line 1</Form.Label>
                      <Form.Control
                        type="text"
                        name="address_line_1"
                        value={formData.address_line_1}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        isInvalid={!!errors.addressLine1}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.addressLine1}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Address Line 2</Form.Label>
                      <Form.Control
                        type="text"
                        name="address_line_2"
                        value={formData.address_line_2}
                        onChange={handleChange}
                        placeholder="Apt., suite, unit number, etc. (optional)"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                      >
                        <option disabled value="">
                          Select
                        </option>
                        {usStates.map((state) => (
                          <option key={state.code} value={state.code}>
                            {state.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter zip code"
                        isInvalid={!!errors.zipCode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.zipCode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        isInvalid={!!errors.country}
                      >
                        <option disabled value="">
                          Select
                        </option>
                        <option value="USA">USA</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.country}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Phone No.</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Enter your phone no."
                        isInvalid={!!errors.phoneNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex align-items-center flex-wrap gap-3">
                  <Button
                    type="submit"
                    className="min-width-159 mt-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Update"
                    )}
                  </Button>
                  {openPop && (
                    <Button
                      type="submit"
                      as={Link}
                      className="min-width-159 mt-2 d-inline-flex align-items-center justify-content-center "
                      variant="outline-primary"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
}
