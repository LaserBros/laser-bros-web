import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Container, Modal } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import bg from "../assets/img/bg.jpg";
import vector from "../assets/img/vector1.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";
var token_val = "";
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { token } = location.state || {};
    token_val = token;
    if (token_val === "" || token_val === undefined) {
      // console.log("Navigating to /SignUp"); // Add this line for debugging
      navigate("/SignUp");
    }
    token_val = token;
    // localStorage.setItem("authToken", token);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear error and proceed with the password reset logic
    setError("");

    try {
      const data = {
        password: newPassword,
      };
      setLoading(true);
      const response = await axiosInstance.post("/resetpassword", data, {
        headers: {
          Authorization: `Bearer ${token_val}`,
        },
      });
      handleShow();
      setNewPassword("");
      setConfirmPassword("");
      token_val = "";
      setLoading(false);
    } catch (error) {
      setLoading(false);

      // Check if error.response exists and is a 400 status
      if (error.response && error.response.status === 400) {
        // Handle 400 error
        toast.error(`${error.response.data.message || "Bad Request"}`);
      } else {
        // Handle other errors
        toast.error(`Something wents wrong. Please try again later`);
      }
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
                  <h2>Reset Your Password</h2>
                  <p>Please enter the details below to reset your password.</p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>New Password</Form.Label>
                    <div className="password-input-group position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <Icon
                        icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
                        onClick={togglePasswordVisibility}
                        className="password-toggle-icon"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4 form-group">
                    <Form.Label>Confirm New Password</Form.Label>
                    <div className="password-input-group position-relative">
                      <Form.Control
                        type={showPassword2 ? "text" : "password"}
                        placeholder="Enter confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <Icon
                        icon={showPassword2 ? "lucide:eye-off" : "lucide:eye"}
                        onClick={togglePasswordVisibility2}
                        className="password-toggle-icon"
                      />
                    </div>
                  </Form.Group>
                  {error && <p className="text-danger">{error}</p>}
                  <Button
                    type="submit"
                    value="Reset Password"
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
                      "Reset Password"
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
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="reset-success"
      >
        <Modal.Body>
          <img src={vector} className="img-fluid mb-4" alt="" />
          <h2>Reset Password Successful!</h2>
          <p className="mb-4">
            Your password has been reset successfully. Please re-login to your
            account with your new password.
          </p>
          <Link to="/quotes">
            <Button variant="primary" onClick={handleClose}>
              Login
            </Button>
          </Link>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
