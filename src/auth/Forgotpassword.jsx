import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import bg from "../assets/img/bg.jpg";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/quotes");
    }
  }, []);
  // Validate the form
  const validate = () => {
    const errors = {};
    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = {
          email: email,
        };
        setLoading(true);
        const response = await axiosInstance.post("/forgetpassword", formData);
        toast.success("OTP has been sent to your email address.");

        setEmail("");

        // Navigate to the OTP page with the userId
        const token = response.data.data.token;
        // console.log(response, response.data.data);
        navigate(`/OTP`, {
          state: { token: token, formData: formData, type: "forgot" },
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
    } else {
      toast.error("Please fix the validation errors.");
    }
  };

  return (
    <React.Fragment>
      <section className="login-main">
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
                <div className="headlogin_div mb-5 text-center">
                  <h2>Forgot Your Password</h2>
                  <p>
                    Please enter your email address to receive a one time
                    password.
                  </p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-5 form-group">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!!errors.email}
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  {/* <Button type="submit" className="btn btn-primary w-100">
                    Proceed
                  </Button> */}
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
                      "Proceed"
                    )}
                  </Button>
                  <p className="formfooter text-center mt-4 mb-0">
                    Back To <Link to="/login">Login</Link>
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
