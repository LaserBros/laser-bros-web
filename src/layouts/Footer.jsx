import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Icon } from "@iconify/react";
import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top-area">
        <Container>
          <div className="footer-top-one-wrapper">
            <div className="logo-area">
              <Link>
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="right-area">
              <div className="social-area">
                <Link>
                  <Icon icon="ri:facebook-fill" />{" "}
                </Link>
                <Link>
                  {" "}
                  <Icon icon="ri:youtube-fill" />{" "}
                </Link>
                <Link>
                  <Icon icon="ri:instagram-line" />{" "}
                </Link>
                <Link>
                  <Icon icon="ri:tiktok-fill" />{" "}
                </Link>
              </div>
              <Link to="mailto:info@LaserBros.com" className="mailtext">
                info@LaserBros.com
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col md={6} lg={3} xl={3}>
              <div className="footer-column">
                <h2 className="footer-heading">Help & Support</h2>
                <ul className="help-support list-unstyled">
                  <li>
                    <a href="#">909 E. Elm St. Suite 102 Graham, NC 27253</a>
                  </li>
                  <li>
                    <a href="telto:919-495-2902">919-495-2902</a>
                  </li>
                  <li>
                    <a href="mailto:info@LaserBros.com">info@LaserBros.com</a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={2} xl={{ span: 2, offset: 1 }}>
              <div className="footer-column">
                <h2 className="footer-heading">Services</h2>
                <ul className="footer-menu list-unstyled">
                  <li>
                    <Link to="/laser-cutting">Laser Cutting</Link>
                  </li>
                  <li>
                    <Link to="/bending">Bending</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={2} xl={2}>
              <div className="footer-column">
                <h2 className="footer-heading">Materials</h2>
                <ul className="footer-menu list-unstyled">
                  <li>
                    <Link to="/resources/aluminum">Aluminium</Link>
                  </li>
                  <li>
                    <Link to="/resources/steel">Steel</Link>
                  </li>
                  <li>
                    <Link to="/resources/stainless-steel">Stainless Steel</Link>
                  </li>
                  <li>
                    <Link to="/resources/brass">Brass</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={2} xl={2}>
              <div className="footer-column">
                <h2 className="footer-heading">Company</h2>
                <ul className="footer-menu list-unstyled">
                  <li>
                    <Link to="/about-us">About Us</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={2} xl={2}>
              <div className="footer-column">
                <h2 className="footer-heading">General</h2>
                <ul className="footer-menu list-unstyled">
                  <li>
                    <Link to="/resources/shipping">Shipping</Link>
                  </li>
                  <li>
                    <Link to="/resources/refund-policy">Refund Policy</Link>
                  </li>
                  <li>
                    <Link to="/resources/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/resources/terms-service">Terms Of Service</Link>
                  </li>
                  <li>
                    <Link to="/resources/faq">FAQ</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="copyright-area text-center">
        <Container>
          <p>
            © Copyright 2024 <b>Laser Bros.</b> All Rights Reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
};
export default Footer;
