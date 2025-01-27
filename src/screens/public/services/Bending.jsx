import React from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Image
} from 'react-bootstrap';
import shape1 from "../../../assets/img/line-shape-1.svg";
import { Icon } from '@iconify/react';
import frame from "../../../assets/img/frame1.jpg";
import video from "../../../assets/img/bending-vid.mp4";
import dots from "../../../assets/img/dots.svg";
import img1 from "../../../assets/img/service-img-2.jpg";
import CTA from "../../../components/cta";
import materialimg1 from "../../../assets/img/material-img-1.jpg";
import materialimg2 from "../../../assets/img/material-img-2.jpg";
import materialimg3 from "../../../assets/img/material-img-3.jpg";
import { Link, useNavigate } from 'react-router-dom';
export default function Bending() {
      const navigate = useNavigate();
  
      const handleRedirect = () => {
        navigate("/resources/laser-cutting");
      };
      const handleQuote = () => {
          localStorage.removeItem("setItemelementData");
          localStorage.removeItem("setItempartsDBdata");
          navigate("/quotes/quotes-detail");
        };
    return (
        <React.Fragment>
            <section className="banner-services banner-home pb-0">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <div className="banner-content">
                                <h1 className="text-start"><span>Bending<img src={shape1} className="img-fluid w-100" alt="" /></span> Services.</h1>
                                <p className="text-start">We offer bending services for a lot of sheet metal parts. The materials we can bend varies based on the material and thickness. Be sure to check out our resource page to see our full list of materials, design parameters, and limitations.</p>
                                {/* <div className="banner-upload-file mb-4">
                                    <Icon icon="mage:file-plus" />
                                    <p><label htmlFor="uploadfile">Browse Files</label><input type="file" id="uploadfile" name="uploadfile" className="d-none" /><span> or Drag or Drop</span></p>
                                    <small> We accept DXF files for instant quotes</small>
                                </div> */}
                                <div className="banner-btns text-start mt-4">
                                    <Button className="btn btn-primary" onClick={handleQuote}>
                                     <Icon icon="icon-park-outline:add"/> Get an Instant Quote
                                    </Button>
                                    <Button className="btn btn-outline-primary" variant={null} onClick={handleRedirect}>
                                     <Icon icon="ph:books-light"/> Bending Guidelines
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="ps-lg-5">
                        <div className="banner-service-img">
                            <img src={img1} className="img-fluid" alt=""/>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="get-instant-quote">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <div className="get-quote-img">
                                <div className="portal-inner">
                                    {/* <div className="top-portal"><img src={dots} className="img-fluid" alt="" /></div> */}
                                        <video
                                                        src={video}
                                                        autoPlay
                                                        controls
                                                        muted
                                                        loop
                                                        style={{ maxWidth: "100%", height: "auto",marginTop:"-22px",marginBottom:"-30px" }}
                                                        width="100%"
                                                        height="auto"
                                                      >
                                                        Your browser does not support the video tag.
                                                      </video>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="ps-lg-4">
                            <div className="get-quote-content">
                                <div className="heading mb-4">
                                    <h2>How the process works</h2>
                                </div>
                                <div className="features-content-box">
                                    <div className="feature-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48"><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M28 40H7a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v12.059M39 41V29m-5 5l5-5l5 5" /><path stroke="currentColor" stroke-width="3" d="M4 11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v9H4z" /><circle r="2" fill="currentColor" transform="matrix(0 -1 -1 0 10 14)" /><circle r="2" fill="currentColor" transform="matrix(0 -1 -1 0 16 14)" /></g></svg>
                                    </div>
                                    <div className="content">
                                        <p>Start by uploading your DXF file and entering all the material information</p>
                                    </div>
                                </div>
                                <div className="features-content-box">
                                    <div className="feature-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M14 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10" /><path stroke-linecap="round" stroke-linejoin="round" d="M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011" /><path d="M22.082 18.365c.494.304.464 1.043-.045 1.1l-2.566.292l-1.152 2.312c-.228.458-.933.234-1.05-.334l-1.255-6.116c-.098-.48.333-.782.75-.525z" clip-rule="evenodd" /></g></svg>
                                    </div>
                                    <div className="content">
                                        <p>Select bending from the services row. This will prompt you to upload a STEP file for bending (a PDF drawing is also acceptable in some applications, but might require more time for review).</p>
                                    </div>
                                </div>
                                <div className="features-content-box">
                                    <div className="feature-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M8 16c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2h-1c-2.828 0-4.243 0-5.121.879C8 3.757 8 5.172 8 8" /><path d="M8 19.5c-2.357 0-3.536 0-4.268-.732C3 18.035 3 16.857 3 14.5v-5c0-2.357 0-3.536.732-4.268C4.464 4.5 5.643 4.5 8 4.5" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 12h9m0 0l-2.5 2.5M15 12l-2.5-2.5" /></g></svg>
                                    </div>
                                    <div className="content">
                                        <p>You’ll notice the checkout button is no longer available. This is because we manually review bent parts. This allows us to ensure we can make your parts and give you the most accurate price.</p>
                                    </div>
                                </div>
                                <div className="features-content-box">
                                    <div className="feature-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" stroke-width="3" width="36" height="36" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M43.5 25.27V12.4a4 4 0 0 0-4-4h-31a4 4 0 0 0-4 4v23.2a4 4 0 0 0 4 4h25.265M4.5 15.636h39" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M37.488 41.6c4.337-1.495 7.428-4.97 7.913-9.394c.19-1.739.065-4.308-.034-5.767a1.22 1.22 0 0 0-1.184-1.135c-1.962-.06-4.242-.388-6.004-2.123a.984.984 0 0 0-1.381 0c-1.763 1.735-4.043 2.062-6.004 2.123a1.22 1.22 0 0 0-1.184 1.135c-.1 1.46-.225 4.028-.034 5.767c.485 4.424 3.576 7.9 7.912 9.394m0 0V22.897" /></svg>
                                    </div>
                                    <div className="content">
                                        <p>Once you submit your bent parts for a “request for quote” we’ll review them and get back to you. If there’s no issues with the parts we will simply approve the quote and you’ll get a notification stating your order has been approved! You can then proceed with payment and we’ll get started on your order!</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="our-materials">
        <Container>
          <div className="heading mb-5 text-center">
            <h2>Materials We Bend</h2>
            <p className="max-width-470 mx-auto">Some of the materials we offer bending services on. Click on one to learn more!</p>
          </div>
          <Row>
            <Col lg={4} className="mb-4">
              <Link className="materials-grid hover-aluminum" to="/resources/aluminum">
                <div className="materials-info">
                  {/* <span className="material-img bgprimary"></span> */}
                  <span className="material-img">
                    <Image src={materialimg1} className="img-fluid" alt=""/>
                  </span>
                  <h2>Alumnimum</h2>
                </div>
                <div className="material-grade fw-medium d-flex flex-wrap gap-2 mt-3">
                  <span className="min-width-84">5052</span>
                </div>
                <div className="material-grade material-grade2 d-flex flex-wrap gap-1 mt-2">
                  <span>0.063</span> <span>0.080</span> <span>0.090</span> <span>0.100</span>
                  <span>0.125</span> <span>0.190</span> <span>0.25</span>
                </div>
              </Link>
            </Col>
            <Col lg={4} className="mb-4">
              <Link className="materials-grid hover-steel" to="/resources/steel">
                <div className="materials-info">
                  {/* <span className="material-img bgdanger"></span> */}
                  <span className="material-img">
                    <Image src={materialimg2} className="img-fluid" alt=""/>
                  </span>
                  <h2>Steel</h2>
                </div>
                <div className="material-grade fw-medium d-flex flex-wrap gap-2 mt-3">
                  <span className="min-width-84">1008</span> 
                </div>
                <div className="material-grade material-grade2 d-flex flex-wrap gap-1 mt-2">
                  <span>0.036</span> <span>0.048</span> <span>0.063</span> <span>0.074</span>
                  <span>0.090</span> <span>0.100</span> <span>0.120</span>
                  <span>0.188</span><span>0.25</span> 
                </div>
              </Link>
            </Col>
            <Col lg={4} className="mb-4">
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
                  <span>0.090</span> <span>0.100</span> <span>0.120</span><span>0.188</span> <span>0.25</span>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
            <CTA />
        </React.Fragment>
    )
}