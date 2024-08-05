import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axiosInstance from "../axios/axiosInstance";
import logo from "../assets/img/logo.svg";
import bg from "../assets/img/bg.jpg";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/quotes");
    }
  }, []);
  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const isStrongPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.full_name) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email Address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email Address is invalid";
    if (!formData.phone_number) newErrors.phone = "Phone No is required";
    else if (!/^\d{10}$/.test(formData.phone_number))
      newErrors.phone = "Phone No is invalid";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isStrongPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character.";
    }

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/verifyemail", formData);
        toast.success("Form submitted successfully!");

        // Reset form data
        setFormData({
          full_name: "",
          company_name: "",
          email: "",
          phone_number: "",
          password: "",
          confirmPassword: "",
        });

        // Navigate to the OTP page with the userId
        const token = response.data.data.otp_token;
        navigate(`/OTP`, {
          state: { token: token, formData: formData, type: "signup" },
        });
        setLoading(false);
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
    }
  };

  return (
    <React.Fragment>
      <section className="login-main signup-main">
        <div className="loginbg">
          <img src={bg} className="img-fluid" alt="" />
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={7} xl={6}>
              <div className="loginform">
                <div className="logologin text-center mb-3">
                  <Link to="/">
                    <img src={logo} className="img-fluid" alt="" />
                  </Link>
                </div>
                <div className="headlogin_div mb-4 text-center">
                  <h2>Create Your Account</h2>
                  <p>Please fill the details below to create an account.</p>
                </div>
                <Form noValidate onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3 form-group">
                        <Form.Label>Full Namess</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                        />
                        {errors.fullName && (
                          <div className="error-text">{errors.fullName}</div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3 form-group">
                        <Form.Label>
                          Company Name<span>(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your company name"
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div className="error-text">{errors.email}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>Phone No</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone no"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                    />
                    {errors.phone && (
                      <div className="error-text">{errors.phone}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input-group position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <Icon
                        icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
                        onClick={togglePasswordVisibility}
                        className="password-toggle-icon"
                      />
                    </div>
                    {errors.password && (
                      <div className="error-text">{errors.password}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-4 form-group">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="password-input-group position-relative">
                      <Form.Control
                        type={showPassword2 ? "text" : "password"}
                        placeholder="Enter confirm password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <Icon
                        icon={showPassword2 ? "lucide:eye-off" : "lucide:eye"}
                        onClick={togglePasswordVisibility2}
                        className="password-toggle-icon"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <div className="error-text">{errors.confirmPassword}</div>
                    )}
                  </Form.Group>
                  <Button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  <p className="formfooter text-center mt-4 mb-0">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
