import React, { useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";

export default function AddAddress() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    country: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!formData.full_name) {
      formErrors.fullName = "Full Name is required.";
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
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      formErrors.zipCode = "Zip Code must be a 6-digit number.";
      valid = false;
    }

    if (!formData.phone_number) {
      formErrors.phoneNo = "Phone Number is required.";
      valid = false;
    } else if (!/^\d+$/.test(formData.phone_number)) {
      formErrors.phoneNo = "Phone Number is invalid.";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await axiosInstance.post(
          "/users/addAddress",
          formData
        );
        console.log(response);
        toast.success("Address added sucessfully");

        setLoading(false);
        navigate("/my-addresses");
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
      console.log("Form is invalid.");
    }
  };

  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center flex-wrap">
              <h5>Add Address</h5>
              <Link
                to="/my-addresses"
                className="btn btn-primary d-inline-flex align-items-center justify-content-center min-width-18"
              >
                Back To Addresses
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
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="India">India</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.country}
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
                        <option value="California">California</option>
                        <option value="New York">New York</option>
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
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Enter your phone no"
                        isInvalid={!!errors.phoneNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNo}
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
                    "Save"
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
