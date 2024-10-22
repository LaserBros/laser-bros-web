import React, {useState} from "react";
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
import { Icon } from '@iconify/react';
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
                  <h2>Login To Your Account</h2>
                  <p>Please fill in the login details below to proceed further.</p>
                </div>
                <Form className="">
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email address"/>
                  </Form.Group>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input-group position-relative">
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter password"/>
                    <Icon
                          icon={showPassword ? 'lucide:eye-off' : 'lucide:eye'}
                          onClick={togglePasswordVisibility}
                          className="password-toggle-icon"
                        />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4 form-group forgotpassword text-end">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </Form.Group>
                  <Link to="/dashboard"> <Button as="input" type="submit" value="Login" className="btn btn-primary w-100"/></Link>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
    </React.Fragment>
  );
}
