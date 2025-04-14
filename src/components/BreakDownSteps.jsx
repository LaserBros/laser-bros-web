import React from "react";
import {
  Container,
  Image,
  Button
} from 'react-bootstrap'
import icon1 from "../assets/img/icon/1.webp";
import icon2 from "../assets/img/icon/2.webp";
import icon3 from "../assets/img/icon/3.webp";
import icon4 from "../assets/img/icon/4.webp";
const BreakDownSteps = () => {
  return (
    <section className="HowITWorksmain_div">
      <Container>
        <div className="maxWidth_680">
          <div className="heading mb-5">
            <h2>Breaking Down The Process.</h2>
          </div>
          <h4 className="worksStep_head">Step 1. Upload</h4>
          <div className="HowITWorksteps_box mb-3">
            <Image className="StepIcon_img" src={icon1} alt="" />
            <div className="Worksteps_cont">
              <h4>Browse Files or Drag & Drop.</h4>
              <p className="mb-3">Add as many files as you need to your quote. Progress is automatically saved so you can leave and come back at any time! You can also create multiple quotes at once.</p>
              <p><b>We use DXF files</b> because they're common across a ton of industries; Manufacturing, Automotive, Aerospace, Engineering, Architectural Metalwork, and DIY enthusiasts to name a few...</p>
            </div>
          </div>
          <h4 className="worksStep_head">Step 2. Configure</h4>
          <div className="HowITWorksteps_box mb-3">
            <Image className="StepIcon_img" src={icon2} alt="" />
            <div className="Worksteps_cont">
              <h4>Configure your parts in four easy steps:</h4>
              <p>1.Select your units (mm or inch)</p>
              <p>2.Select your material type</p>
              <p>3.Select your material thickness</p>
              <p>4.Select any post-op finishing work</p>
              <h4>It’s That Easy!</h4>
              <p>For select materials we offer services like bending too! Bent parts are still uploaded as <b>DXF</b> files, but you’ll need to supply a <b>STEP</b> file for validation.</p>
            </div>
          </div>
          <h4 className="worksStep_head">Step 3. Checkout</h4>
          <div className="HowITWorksteps_box mb-3">
            <Image className="StepIcon_img" src={icon3} alt="" />
            <div className="Worksteps_cont">
              <h4>Browse Files or Drag & Drop.</h4>
              <p className="mb-3">Once you’re <b>Ready to Checkout Securely</b>, simply select your address from the dropdown and choose a shipping speed. We offer Ground shipping, 2nd Day Air, and Next Day Air. For large parts we can ship using LTL freight carriers.</p>
              <p>If you added a service that requires an RFQ you’ll be prompted with the same options. We take RFQ’s very seriously and get back to you as soon as possible on your request!</p>
            </div>
          </div>
          <h4 className="worksStep_head">Step 4. Done</h4>
          <div className="HowITWorksteps_box mb-3">
            <Image className="StepIcon_img" src={icon4} alt="" />
            <div className="Worksteps_cont">
              <h4>You’re DONE!</h4>
              <p className="mb-3">Now you just sit back and wait while we handle the hard stuff.</p>
              <p>Our process involves pulling your files, nesting your parts, cutting and inspection, post ops <i>(like finishing or bending)</i>, and finally packaging and shipping!</p>
            </div>
          </div>
          <div className="text-center">
            <Button className="btn btn-primary mb-2">Get Started Now! Upload Your DXF</Button>
            <span className="loginUploadInfo_text">You’ll need to login to upload</span>
          </div>
        </div>
      </Container>
    </section>
  )
};
export default BreakDownSteps;