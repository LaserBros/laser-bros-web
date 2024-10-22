import React from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container
} from 'react-bootstrap';
import logo from "../assets/img/logo.svg";
import bg from "../assets/img/bg.jpg";
import { Link } from 'react-router-dom';
export default function ForgotPassword() {
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
                  <h2>Forgot Your Password</h2>
                  <p>Please enter your email address to receive a one time password.</p>
                </div>
                <Form className="">
                  <Form.Group className="mb-5 form-group">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email address" />
                  </Form.Group>
                  <Link to="/otp"><Button as="input" type="submit" value="Proceed" className="btn btn-primary w-100" /></Link>
                  <p className="formfooter text-center mt-4 mb-0">Back To <Link to="/">Login</Link></p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
