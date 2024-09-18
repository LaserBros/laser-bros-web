import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Modal
} from 'react-bootstrap';
import logo from "../assets/img/logo.svg";
import bg from "../assets/img/bg.jpg";
import vector from "../assets/img/vector1.svg";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <section className="login-main">
        <div className="loginbg"><img src={bg} className="img-fluid" alt="" /> </div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={7} xl={6}>
              <div className="loginform">
                <div className="logologin text-center mb-3"><Link to="/"><img src={logo} className="img-fluid " alt="" /></Link></div>
                <div className="headlogin_div mb-5 text-center">
                  <h2>Reset Your Password</h2>
                  <p>Please enter the details below to reset your password.</p>
                </div>
                <Form className="">
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>New Password</Form.Label>
                    <div className="password-input-group position-relative">
                      <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter new password" />
                      <Icon
                        icon={showPassword ? 'lucide:eye-off' : 'lucide:eye'}
                        onClick={togglePasswordVisibility}
                        className="password-toggle-icon"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4 form-group">
                    <Form.Label>Confirm New Password</Form.Label>
                    <div className="password-input-group position-relative">
                      <Form.Control type={showPassword2 ? "text" : "password"} placeholder="Enter confirm new password" />
                      <Icon
                        icon={showPassword2 ? 'lucide:eye-off' : 'lucide:eye'}
                        onClick={togglePasswordVisibility2}
                        className="password-toggle-icon"
                      />
                    </div>
                  </Form.Group>
                  <Button as="input" onClick={handleShow} value="Reset Password" className="btn btn-primary w-100" />
                  <p className="formfooter text-center mt-4 mb-0">Back To <Link to="/">Login</Link></p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal show={show} onHide={handleClose} centered className="reset-success">
        <Modal.Body>
          <img src={vector} className="img-fluid mb-4" alt="" />
          <h2>Reset Password Successful!</h2>
          <p className="mb-4">Your password has been reset successfully. Please re-login to your account with your new password.</p>
          <Link to="/"><Button variant="primary" onClick={handleClose}>
            Login
          </Button></Link>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
