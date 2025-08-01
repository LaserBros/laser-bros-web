import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import bg from "../assets/img/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";
import { UserContext } from "../localstorage/UserProfileContext";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { nameLocal, updateName } = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { image, updateImage } = useContext(UserContext);

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
        // console.log("Dsdd");
        setLoading(true);
        var getId = "";
        const response = await axiosInstance.post("/signin", data);
        const elementId = localStorage.getItem("setItemelementData");
        if (elementId) {
          getId = JSON.parse(elementId);
        }
        if (response.data.data.role_type == 1) {
          localStorage.setItem("adminToken", response.data.data.token);
        }

        if (response.data.data.role_type == 2) {
          localStorage.setItem("employeeToken", response.data.data.token);
          localStorage.setItem("employeePermision", JSON.stringify(response.data.data.user_permission));
        }
        if (response.data.data.role_type == 3) {
          localStorage.setItem("authToken", response.data.data.token);
        }

        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("full_name", response.data.data.full_name);
        localStorage.setItem("email", response.data.data.email);
        updateName(response.data.data.full_name);
        // localStorage.setItem("profile_pic", response.data.data.profile_image);
        updateImage(
          response.data.data.profile_image != null
            ? process.env.REACT_APP_BUCKET +
                "/" +
                response.data.data.profile_image
            : "https://s3.us-east-1.amazonaws.com/laserbros-image-upload/1724131072668-default.png"
        );
        if (getId && getId._id) {
          const data_id = {
            id: getId._id,
          };

          try {
            const response_local = await axiosInstance.post(
              "/users/updateRequestQuoteUserId",
              data_id
            );
            localStorage.setItem("setItemelementData", "");
            localStorage.setItem("setItempartsDBdata", "");
          } catch (error) {}
        }
        toast.success("Login Successfully!!");
        setLoading(false);
        // console.log("response.data.data.", response.data.data);
        if (response.data.data.role_type == 1) {
          navigate("/admin/dashboard");
        }
        if (response.data.data.role_type == 2) {
          const permissions = JSON.parse(localStorage.getItem("employeePermision")) || {};
          if (permissions.dashboard_permission === 1) {
            navigate("/employee/dashboard"); // Redirect to dashboard if permission is granted
          } else {
            navigate("/employee/fallback-page"); // Redirect to fallback page if no permission
          }
        }
        if (response.data.data.role_type == 3) {
          navigate("/quotes");
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
      // console.log("Form is invalid. Not submitting.");
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
