import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate, useHistory } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import bg from "../assets/img/bg.jpg";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";
import { UserContext } from "../localstorage/UserProfileContext";
import OTPInput from "react-otp-input";
var token_val = "";
const OTPForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const { nameLocal, updateName } = useContext(UserContext);
  const { image, updateImage } = useContext(UserContext);
  const [formData, setFormData] = useState("");
  const [btndisable, setFbtndisable] = useState(false);
  useEffect(() => {
    const { token, formData, type } = location.state || {};
    token_val = token;
    setType(type);
    if (token === "" || token === undefined) {
      // console.log("Navigating to /SignUp");
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
      type: type,
      full_name: formData.full_name,
      email: formData.email,
    };
    try {
      toast.success("OTP resend successfully!");
      setFbtndisable(true);
      const response = await axiosInstance.post("/resendotp", data);
      token_val = response.data.data.otp_token;
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
        console.log(type, "Dsdsdsdds-=-=");
        try {
          const data = {
            otp_get: otp,
            hash: token_val,
            email: formData.email,
          };
          setLoading(true);

          const response = await axiosInstance.post("/verifyotp", data);
          toast.success("OTP verified");
          console.log(
            " response.data.data.token",
            response.data.data.otp_token
          );
          navigate("/reset-password", {
            state: { token: response.data.data.otp_token },
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
            hash: token_val,
            email: formData.email,
          };
          setLoading(true);
          const response = await axiosInstance.post("/verifyotp", data);
          try {
            const response = await axiosInstance.post("/signup", formData);
            toast.success("OTP Verified.");
            // console.log("SDsdsdsdsdsd", response.data);

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
            localStorage.setItem("authToken", response.data.data.token);
            localStorage.setItem(
              "refreshToken",
              response.data.data.refreshToken
            );
            localStorage.setItem("full_name", response.data.data.full_name);
            localStorage.setItem("email", response.data.data.email);
            updateName(response.data.data.full_name);

            updateImage(
              response.data.data.profile_image != null
                ? process.env.REACT_APP_BUCKET +
                    "/" +
                    response.data.data.profile_image
                : "https://s3.us-east-1.amazonaws.com/laserbros-image-upload/1724131072668-default.png"
            );
            navigate("/quotes");
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
      // toast.error("Please fix the validation errors.");
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
            <Col md={9} lg={7} xl={5}>
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
                    {/* <Form.Control
                      type="text"
                      placeholder="Enter your One-Time Password"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      isInvalid={!!errors.otp}
                    /> */}
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      inputType="tel"
                      containerStyle="gap-1 justify-content-between"
                      // renderSeparator={
                      //   <span className="mx-2 text-gray-500">-</span>
                      // }
                      renderInput={(props) => <input {...props} className="otpinput" />}
                    
                    />
                    {errors.otp && (
                      <small className="text-danger form-text">
                        {errors.otp}
                      </small>
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
