import React from "react";
import {
  Row,
  Col,
  Container,
  Image
} from 'react-bootstrap'
import { Link,useLocation  } from 'react-router-dom';
import materialimg1 from "../assets/img/material-img-1.jpg";
import materialimg2 from "../assets/img/material-img-2.jpg";
import materialimg3 from "../assets/img/material-img-3.jpg";
import materialimg4 from "../assets/img/material-img-4.jpg";
import materialimg5 from "../assets/img/material-img-5.jpg";
const Materials2 = () => {
  const location = useLocation();
  return (
    <section className="our-materials">
        <Container>
          <div className="heading mb-5 text-center">
            <h2>Materials We Can Cut.</h2>
            <p className="max-width-810 mx-auto">Below is a short list of our most common materials we offer for our laser cutting services. Click on one if you’d like to learn more! Or reach out to us via email or call.</p>
          </div>
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <Link className="materials-grid hover-aluminum" to="/resources/aluminum">
                <div className="materials-info">
                  {/* <span className="material-img bgprimary"></span> */}
                  <span className="material-img">
                    <Image src={materialimg1} className="img-fluid" alt=""/>
                  </span>
                  <h2>Aluminum</h2>
                </div>
                <div className="material-grade fw-medium d-flex flex-wrap gap-2 mt-3">
                  <span className="min-width-84">5052</span> <span>6061</span>
                </div>
                <div className="material-grade material-grade2 d-flex flex-wrap gap-1 mt-2">
                  <span>0.063</span> <span>0.080</span> <span>0.090</span> <span>0.100</span>
                  <span>0.125</span> <span>0.190</span> <span>0.25</span><span>0.375</span>
                </div>
              </Link>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Link className="materials-grid hover-steel" to="/resources/steel">
                <div className="materials-info">
                  {/* <span className="material-img bgdanger"></span> */}
                  <span className="material-img">
                    <Image src={materialimg2} className="img-fluid" alt=""/>
                  </span>
                  <h2>Steel</h2>
                </div>
                <div className="material-grade fw-medium d-flex flex-wrap gap-2 mt-3">
                  <span className="min-width-84">1008</span> <span>A36</span>
                </div>
                <div className="material-grade material-grade2 d-flex flex-wrap gap-1 mt-2">
                  <span>0.036</span> <span>0.048</span> <span>0.063</span> <span>0.074</span>
                  <span>0.090</span> <span>0.100</span> <span>0.120</span>
                  <span>0.188</span><span>0.25</span> <span>0.375</span>
                  <span>0.50</span> <span>0.75</span>
                  <span>1.00</span>
                </div>
              </Link>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Link className="materials-grid hover-stainless-steel" to="/resources/stainless-steel">
                <div className="materials-info">
                  {/* <span className="material-img bgsuccess"></span> */}
                  <span className="material-img">
                    <Image src={materialimg3} className="img-fluid" alt=""/>
                  </span>
                  <h2>Stainless Steel</h2>
                </div>
                <div className="material-grade fw-medium d-flex flex-wrap gap-2 mt-3">
                  <span className="min-width-84">304 2B</span> <span>304 #4</span> <span>316 2B</span>
                </div>
                <div className="material-grade material-grade2 d-flex flex-wrap gap-1 mt-2">
                  <span>0.036</span> <span>0.048</span> <span>0.063</span> <span>0.074</span>
                  <span>0.090</span> <span>0.100</span> <span>0.120</span><span>0.188</span> <span>0.25</span> <span>0.375</span>
                </div>
              </Link>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Link className="materials-grid hover-brass" to="/resources/brass">
                <div className="materials-info">
                  {/* <span className="material-img bgyellow"></span> */}
                  <span className="material-img">
                    <Image src={materialimg4} className="img-fluid" alt=""/>
                  </span>
                  <h2>Brass</h2>
                </div>
                <div className="material-grade fw-medium d-flex flex-wrap gap-2 mt-3">
                  <span className="min-width-84">260-grade</span>
                </div>
                <div className="material-grade material-grade2 d-flex flex-wrap gap-1 mt-2">
                  <span>0.040</span> <span>0.093</span><span>0.125</span>
                </div>
              </Link>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Link className="materials-grid hover-custom" to="/resources/specialty">
                <div className="materials-info">
                  {/* <span className="material-img bgpurple"></span> */}
                  <span className="material-img">
                    <Image src={materialimg5} className="img-fluid" alt=""/>
                  </span>
                  <h2>Custom</h2>
                </div>
                <div className="material-grade fw-medium d-flex flex-wrap gap-2 mt-3">
                  <span className="min-width-84">Customer Supplied</span> <span>Custom Order Material</span>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
  )
};
export default Materials2;