import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate, useHistory } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import bg from "../assets/img/bg.jpg";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";
var token_val = "";
const OTPForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  const [formData, setFormData] = useState("");
  const [btndisable, setFbtndisable] = useState(false);
  useEffect(() => {
    const { token, formData, type } = location.state || {};
    token_val = token;
    setType(type);
    if (token === "" || token === undefined) {
      console.log("Navigating to /SignUp"); // Add this line for debugging
      navigate("/SignUp");
    }
    token_val = token;
    // localStorage.setItem("authToken", token);
    setFormData(formData);
  }, []);

  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!otp) {
      errors.otp = "OTP is required.";
    } else if (otp.length !== 6) {
      errors.otp = "OTP must be 6 digits long.";
    }
    return errors;
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    const data = {
      email: formData.email,
    };
    try {
      toast.success("OTP resend successfully!");
      setFbtndisable(true);
      const response = await axiosInstance.post("/resendotp", data);
      token_val = response.data.data.otp_token;
      console.log(response.data.data.otp_token, "----====", token_val);
      // localStorage.setItem("authToken", "");
      // localStorage.setItem("authToken", response.data.data.otp_token);
    } catch (error) {
      setFbtndisable(false);
      // Check if error.response exists and is a 400 status
      if (error.response && error.response.status === 400) {
        // Handle 400 error
        toast.error(`${error.response.data.message || "Bad Request"}`);
      } else {
        // Handle other errors
        toast.error(`An error occurred: ${error.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (type == "forgot") {
        console.log(token_val);
        try {
          const data = {
            otp_get: otp,
          };
          setLoading(true);

          const response = await axiosInstance.post("/verifyotp", data, {
            headers: {
              Authorization: `Bearer ${token_val}`,
            },
          });
          toast.success("OTP verified");
          navigate("/reset-password", {
            state: { token: token_val },
          });
        } catch (error) {
          setLoading(false);

          // Check if error.response exists and is a 400 status
          if (error.response && error.response.status === 400) {
            // Handle 400 error
            toast.error(`${error.response.data.message || "Bad Request"}`);
          } else {
            // Handle other errors
            toast.error(`OTP expired.Please resend OTP`);
          }
        }
      } else {
        try {
          const data = {
            otp_get: otp,
          };
          setLoading(true);
          const response = await axiosInstance.post("/verifyotp", data, {
            headers: {
              Authorization: `Bearer ${token_val}`,
            },
          });
          try {
            const response = await axiosInstance.post("/signup", formData);
            toast.success("OTP Verified.");
            setOtp("");
            // Reset form data
            setFormData({
              full_name: "",
              company_name: "",
              email: "",
              phone_number: "",
              password: "",
              confirmPassword: "",
            });
            navigate("/Login");
            setLoading(false);
          } catch (error) {
            setLoading(false);

            // Check if error.response exists and is a 400 status
            if (error.response && error.response.status === 400) {
              // toast.error(`${error.response.data.message || "Bad Request"}`);
            } else {
              // Handle other errors
              // toast.error(`OTP expired.Please resend OTP`);
            }
          }
        } catch (error) {
          setLoading(false);

          // Check if error.response exists and is a 400 status
          if (error.response && error.response.status === 400) {
            // Handle 400 error
            toast.error(`${error.response.data.message || "Bad Request"}`);
          } else {
            // Handle other errors
            toast.error(`OTP expired.Please resend OTP`);
          }
        }
      }
    } else {
      // Show error notification or message
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
                  <h2>Enter Your One Time Password</h2>
                  <p>
                    Please enter the one time password we just sent to your
                    email address.
                  </p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>One-Time Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your One-Time Password"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      isInvalid={!!errors.otp}
                    />
                    {errors.otp && (
                      <Form.Control.Feedback type="invalid">
                        {errors.otp}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4 form-group forgotpassword text-end">
                    <Link
                      as="button"
                      onClick={handleResendOTP}
                      disabled={btndisable}
                    >
                      Resend OTP
                    </Link>
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
};

export default OTPForm;
