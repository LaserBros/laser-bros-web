import React from "react";
import {
  Form,
  Row,
  Col,
  Button ,
  Container
} from 'react-bootstrap';
import logo from "../assets/img/logo.svg";
import bg from "../assets/img/bg.jpg";
import { Link } from 'react-router-dom';
export default function OTP() {
 
  return (
    <React.Fragment>
      <section className="login-main">
        <div className="loginbg"><img src={bg} className="img-fluid" alt=""/> </div>
        <Container>
            <Row className="justify-content-center">
            <Col lg={7} xl={6}>
              <div className="loginform">
              <div className="logologin text-center mb-3"><Link to="/"><img src={logo} className="img-fluid " alt=""/></Link></div>
                <div className="headlogin_div mb-5 text-center">
                  <h2>Enter Your One Time Password</h2>
                  <p>Please enter the one time password we just sent to your email address.</p>
                </div>
                <Form className="">
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>One-Time Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter your One-Time Password"/>
                  </Form.Group>
                  
                  <Form.Group className="mb-4 form-group forgotpassword text-end">
                    <Link>Resend OTP</Link>
                  </Form.Group>
                  <Link to="/reset-password"><Button as="input" type="submit" value="Proceed" className="btn btn-primary w-100"/></Link>
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
