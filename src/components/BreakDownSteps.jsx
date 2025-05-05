import React from "react";
import {
  Container,
  Image,
  Button,
  Row,
  Col
} from 'react-bootstrap'
import video1 from "../assets/img/website-upload.mp4"; 
import video2 from "../assets/img/website-configure.mp4";
import video3 from "../assets/img/website-checkout.mp4";
import video4 from "../assets/img/done-video.mp4";
import { Link } from "react-router-dom";
const BreakDownSteps = () => {
  return (
    <section className="HowITWorksmain_div">
      <Container>
        {/* <div className="maxWidth_680"> */}
        <div className="heading mb-5 text-center">
          <h2>Breaking Down The Process.</h2>
          <p>Upload. Configure. Checkout. Done.</p>
        </div>
        <div className="HowITWorksteps_box mb-4">
          {/* <Image className="StepIcon_img" src={icon1} alt="" /> */}
          <Row className="align-items-center">
            <Col lg={6} className="my-2">
              <h4 className="worksStep_head">Upload</h4>
              <div className="Worksteps_cont">
                <h4>Browse Files or Drag & Drop.</h4>
                <p className="mb-3">Add as many files as you need to your quote. Progress is automatically saved so you can leave and come back at any time! You can also create multiple quotes at once.</p>
                <p><b>We use DXF files</b> because they're common across a ton of industries; Manufacturing, Automotive, Aerospace, Engineering, Architectural Metalwork, and DIY enthusiasts to name a few...</p>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} className="my-2">
            <video
                src={video1}
                autoPlay
                muted
                loop
                playsInline
              />
            </Col>
          </Row>
        </div>
        {/* <h4 className="worksStep_head">Step 2. Configure</h4> */}
        <div className="HowITWorksteps_box mb-4">
        <Row className="align-items-center">
            <Col lg={6} className="my-2">
              <h4 className="worksStep_head">Configure</h4>
              <div className="Worksteps_cont">
                <h4>Configure your parts in four easy steps:</h4>
                <p>1.Select your units (mm or inch)</p>
                <p>2.Select your material type</p>
                <p>3.Select your material thickness</p>
                <p>4.Select any post-op finishing work</p>
                <h4 className="mt-3">It’s That Easy!</h4>
                <p>For select materials we offer services like bending too! Bent parts are still uploaded as <b>DXF</b> files, but you’ll need to supply a <b>STEP</b> file for validation.</p>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} className="my-2">
            <video
                src={video2}
                autoPlay
                muted
                loop
                playsInline
              />
            </Col>
          </Row>
          {/* <Image className="StepIcon_img" src={icon2} alt="" /> */}

        </div>
        {/* <h4 className="worksStep_head">Step 3. Checkout</h4> */}
        <div className="HowITWorksteps_box mb-4">
          {/* <Image className="StepIcon_img" src={icon3} alt="" /> */}
          <Row className="align-items-center">
            <Col lg={6} className="my-2">
              <h4 className="worksStep_head">Checkout</h4>
              <div className="Worksteps_cont">
                <p className="mb-3">Once you’re <b>Ready to Checkout Securely</b>, simply select your address from the dropdown and choose a shipping speed. We offer Ground shipping, 2nd Day Air, and Next Day Air. For large parts we can ship using LTL freight carriers.</p>
                <p>If you added a service that requires an RFQ you’ll be prompted with the same options. We take RFQ’s very seriously and get back to you as soon as possible on your request!</p>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} className="my-2">
            <video
                src={video3}
                autoPlay
                muted
                loop
                playsInline
              />
            </Col>
          </Row>
        </div>
        {/* <h4 className="worksStep_head">Step 4. Done</h4> */}
        <div className="HowITWorksteps_box mb-4">
          {/* <Image className="StepIcon_img" src={icon4} alt="" /> */}
          <Row className="align-items-center">
            <Col lg={6} className="my-2">
              <h4 className="worksStep_head">Done</h4>
              <div className="Worksteps_cont">
                <h4>You’re DONE!</h4>
                <p className="mb-3">Now you just sit back and wait while we handle the hard stuff.</p>
                <p>Our process involves pulling your files, nesting your parts, cutting and inspection, post ops <i>(like finishing or bending)</i>, and finally packaging and shipping!</p>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} className="my-2">
              <video
                src={video4}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: 'auto' }}
              />
            </Col>
          </Row>

        </div>
        <div className="text-center">
          <Button className="mb-2 d-inline-flex align-items-center" as={Link}  to="/quotes/quotes-detail">Get Started Now! Upload Your DXF</Button>
          <span className="loginUploadInfo_text">You’ll need to login to upload</span>
        </div>
        {/* </div> */}
      </Container>
    </section>
  )
};
export default BreakDownSteps;