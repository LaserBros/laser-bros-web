import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { fetchSingleAddress, updateAddress } from "../../api/api";
import { toast } from "react-toastify";

export default function AddAddress() {
  const { id } = useParams(); // Extract the id from the URL
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    _id: "",
    full_name: "",
    nickname: "",
    email: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
    phone_number: "",
  });

  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadAddress = async () => {
      try {
        const response = await fetchSingleAddress(id); // Fetch the address using the id
        setFormValues(response.data); // Set the fetched address data
      } catch (error) {
        console.error("Error fetching address:", error);
        toast.error("Failed to load address data");
      } finally {
        setLoading(false);
      }
    };

    loadAddress();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    console.log("SDdsdd");
    if (!formValues.full_name) newErrors.name = "Full Name is required";
    if (!formValues.nickname)
      newErrors.nickname = "Address Nickname is required";
    if (!formValues.email) newErrors.email = "Email Address is required";
    if (!formValues.address_line_1)
      newErrors.address1 = "Address Line 1 is required";
    if (!formValues.city) newErrors.city = "City is required";
    if (!formValues.pincode) newErrors.zipcode = "Zip Code is required";
    if (!formValues.phone_number)
      newErrors.phoneno = "Phone Number is required";
    else if (/[ -]/.test(formValues.phone_number))
      newErrors.phoneno =
        "Please enter your phone number without spaces or dashes";
    else if (!/^\d{6,15}$/.test(formValues.phone_number)) {
      newErrors.phone = "Phone No must be between 6 and 15 digits";
    }
    // else if (!/^\d{10}$/.test(formValues.phone_number))
    //   newErrors.phoneno = "Phone Number must be exactly 10 digits";
    // Add more validations as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (validateForm()) {
        await updateAddress(formValues);
        toast.success("Address updated successfully");
        setLoading(false);
      } else {
        setLoading(false);
        // toast.error("Something wents wrong. ");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something wents wrong. ");
    }
  };

  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center flex-wrap">
              <h5>Edit Address</h5>{" "}
              <Link
                to="/my-addresses"
                className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-18"
              >
                Back To Address
              </Link>
            </Card.Header>
            <Card.Body>
              <Form className="accountform" onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="full_name"
                        placeholder="Enter full name"
                        value={formValues.full_name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Address Nickname</Form.Label>
                      <Form.Control
                        type="text"
                        name="nickname"
                        placeholder="Enter full name"
                        value={formValues.nickname}
                        onChange={handleChange}
                        isInvalid={!!errors.nickname}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nickname}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formValues.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="country"
                        value={formValues.country || ""}
                        onChange={handleChange}
                      >
                        <option disabled value="">
                          Select
                        </option>
                        <option value="USA">USA</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        name="state"
                        value={formValues.state || ""}
                        onChange={handleChange}
                      >
                        <option disabled value="">
                          Select
                        </option>
                        {usStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        value={formValues.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Address Line 1</Form.Label>
                      <Form.Control
                        type="text"
                        name="address_line_1"
                        placeholder="Enter your address"
                        value={formValues.address_line_1}
                        onChange={handleChange}
                        isInvalid={!!errors.address1}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address1}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Address Line 2</Form.Label>
                      <Form.Control
                        type="text"
                        name="address_line_2"
                        placeholder="Apt., suite, unit number, etc. (optional)"
                        value={formValues.address_line_2}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        placeholder="Enter zip code"
                        value={formValues.pincode}
                        onChange={handleChange}
                        isInvalid={!!errors.zipcode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.zipcode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Phone No.</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone_number"
                        placeholder="Enter your phone no."
                        value={formValues.phone_number}
                        onChange={handleChange}
                        isInvalid={!!errors.phoneno}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneno}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
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
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
}
