import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import bg from "../assets/img/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/quotes");
    }
  }, []);
  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!email) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email address.";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      valid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        email: email,
        password: password,
      };
      try {
        setLoading(true);
        const response = await axiosInstance.post("/signin", data);
        console.log(response.data);
        localStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem("full_name", response.data.data.full_name);
        localStorage.setItem("email", response.data.data.email);
        toast.success("Login Successfully!!");
        setLoading(false);
        navigate("/quotes");
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
      console.log("Form is invalid. Not submitting.");
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
                  <h2>Login To Your Account</h2>
                  <p>
                    Please fill in the login details below to proceed further.
                  </p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <Form.Text className="text-danger">
                        {errors.email}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input-group position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Icon
                        icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
                        onClick={togglePasswordVisibility}
                        className="password-toggle-icon"
                      />
                      {errors.password && (
                        <Form.Text className="text-danger">
                          {errors.password}
                        </Form.Text>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4 form-group forgotpassword text-end">
                    <Link to="/forgot-password">Forgot Password?</Link>
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
                      "Login"
                    )}
                  </Button>
                  <p className="formfooter text-center mt-4 mb-0">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
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
