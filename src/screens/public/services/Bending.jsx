import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import shape1 from "../../../assets/img/line-shape-1.svg";
import { Icon } from "@iconify/react";
import img1 from "../../../assets/img/service-img-2.jpg";
import MaterialsBending from "../../../components/MaterialsBending";
import { Link } from "react-router-dom";
export default function Bending() {
  return (
    <React.Fragment>
      <section className="banner-services banner-home">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="banner-content">
                <h1 className="text-start"><span>Bending<img src={shape1} className="img-fluid w-100" alt="" /></span> Services.</h1>
                <p className="text-start"><b className="d-block">What is sheet metal bending?</b> Sheet metal bending is the process of turning a flat piece of metal into a different shape by folding or bending it. It’s a common step in making things like metal boxes, enclosure, and brackets. The bending machines we use are CNC controlled and programmed offline to ensure your parts are manufacturable and made to spec.</p>
                <div className="bannerservice_btns mt-4 d-flex flex-wrap gap-2">
                  <div>
                    <Button className="d-inline-flex align-items-center my-1" as={Link}  to="/quotes/quotes-detail">Get Started Now! Upload Your DXF</Button>
                    <span className="loginUploadInfo_text">You'll need to login to upload</span>
                  </div>
                  <Button className="d-inline-flex align-items-center my-1" variant="outline-primary" as={Link} to="/resources/bending">
                    <Icon icon="ph:books-light" width={24} height={24} /> Bending Guidelines
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6} className="ps-lg-5">
              <div className="banner-service-img">
                <img src={img1} className="img-fluid" alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="laserCuttingInfo_sec">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="laserCuttingInfo_div pb-4">
                <h4>How a Bend Is Made:</h4>
                <p>Our CNC press brake uses hydraulic cylinders to create the powerful downward force needed to bend sheet metal.</p>
                <p>The bending process uses a set of tooling:</p>
                <ul className="listcustom">
                  <li>An upper punch (shaped like a wedge or blade)</li>
                  <li>A lower die (a groove that the punch presses into)</li>
                  <li>The type of tooling we use depends on the material type and thickness of the metal.</li>
                </ul>
                <p>The operator programs the machine by entering key information such as:</p>
                <ul className="listcustom">
                  <li>The bend angle</li>
                  <li>The flange length (the length of the bent section)</li>
                  <li>The overall part length</li>
                </ul>
                <p>The CNC system then controls the press brake to make accurate, consistent bends based on those settings.</p>
              </div>
              <div className="laserCuttingInfo_div pb-4">
                <Row>
                  <Col lg={6} className="my-2">
                    <h4>How the ordering process works:</h4>
                    <ul>
                      <li>Start by uploading your DXF file and entering all the material information</li>
                      <li>Select bending from the services row. You will be prompted to upload a STEP file. We require this since our machines operate on the 3D model to produce accurate bends.</li>
                      <li>If you don’t have a STEP file please reach out to us to work out a solution!</li>
                      <li>The checkout button will change to a “Request a Quote”. This is because we take the time to review your bends to make sure they’re manufacturable with the machine and tooling we have. Submitting your RFQ will notify us so we can start the review process! This process usually takes 1-3 hours.</li>
                      <li>Once we review and approve your order you can proceed with your payment (you won’t be charged unless you choose to proceed with your order). From there you sit back and relax while we get your parts cut and bent!</li>
                    </ul>
                  </Col>
                  <Col lg={6} className="my-2">
                    <iframe
                      width="100%"
                      height="450"
                      src="https://www.youtube.com/embed/5wW6jrJ1_Ro?autoplay=1&mute=1&loop=1&playlist=5wW6jrJ1_Ro"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </Col>
                </Row>
              </div>
              <div className="text-center">
                <Button className="d-inline-flex align-items-center mb-2" as={Link} to="/quotes/quotes-detail">Get Started Now! Upload Your DXF</Button>
                <span className="loginUploadInfo_text">You’ll need to login to upload</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="lasercuttingmaterial">
        <MaterialsBending />
      </div>
    </React.Fragment>
  );
}
