import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import shape1 from "../../../assets/img/line-shape-1.svg";
import { Icon } from "@iconify/react";
import img1 from "../../../assets/img/service-img-1.jpg";
import Materials2 from "../../../components/Materials2";
import BreakDownSteps from "../../../components/BreakDownSteps";
import { Link } from "react-router-dom";
export default function Lasercutting() {
  return (
    <React.Fragment>
      <section className="banner-services banner-home">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="banner-content">
                <h1 className="text-start">
                  <span>
                    Laser Cutting
                    <img src={shape1} className="img-fluid w-100" alt="" />
                  </span>{" "}
                  Services.
                </h1>
                <p className="text-start"><b>Why Fiber Laser?</b> Fiber lasers offer a great balance of cutting speed, accuracy, and quality. Compared to other cutting processes, lasers will outperform plasma cutting with accuracy, and water jet with speed. Obviously these other processes have their place, but lasers offer the best of both worlds for a very wide range of metals.</p>
                <p className="text-start"><b>P.S.</b> With fiber laser cutting we can only process metals (no wood, plastic, or composite materials).</p>
                <div className="bannerservice_btns mt-4 d-flex flex-wrap gap-2">
                <div>
                  <Button className="d-inline-flex align-items-center my-1" as={Link}  to="/quotes/quotes-detail">Get Started Now! Upload Your DXF</Button>
                  <span className="loginUploadInfo_text">You'll need to login to upload</span>
                  </div>
                  <Button className="d-inline-flex align-items-center  my-1" variant="outline-primary" as={Link} to="/resources/laser-cutting">
                    <Icon icon="ph:books-light" width={24} height={24}/> Laser Cutting Guidelines
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
        <div className="laserCuttingInfo_div">
                <h3>How the laser cutting process works (put simply):</h3>
                <h4>How the Laser Cuts:</h4>
                <ul>
                  <li>The process starts with a laser source that generates a very intense beam of light.</li>
                  <li>This light travels through a fiber optic cable - a thin, flexible glass wire that guides the laser with high precision.</li>
                  <li>The laser beam is then focused into a tiny, powerful spot using special lenses.</li>
                  <li>That concentrated beam becomes hot enough to melt or vaporize metal along its path.</li>
                  <li>As the laser moves across the metal sheet, it cuts shapes or patterns exactly as programmed.</li>
                    </ul>
                    <p> Along with the laser beam, a stream of gas is blown at the cutting area. This is called assist gas, and it helps in several important ways:</p>
                    <ul className="listcustom">
                      <li>It blows away molten metal from the cut, preventing it from re-solidifying along the edges.</li>
                      <li>It can speed up the cutting process.</li>
                      <li>It improves cut quality by reducing roughness or oxidation.</li>
                    </ul>
                    <p> The two most common assist gases are oxygen and nitrogen, and each serves a different purpose:</p>
                    <p><b>Oxygen:</b></p>
                    <ul className="listcustom">
                      <li>Used mainly for mild steel.</li>
                      <li>Helps the laser cut faster by supporting a chemical reaction (combustion) that adds extra heat.</li>
                      <li>It’s efficient for thicker materials, but can leave oxidized or dark edges.</li>
                    </ul>
                    <p><b>Nitrogen:</b></p>
                    <ul className="listcustom">
                      <li>Used for stainless steel, aluminum, and other non-ferrous metals.</li>
                      <li>It doesn’t react with the metal — it simply blows away melted material.</li>
                      <li>Results in clean, shiny cuts with no oxidation, which is ideal for parts where appearance matters.</li>
                      <li>Requires higher pressure and can be slower, but gives a high-quality finish.</li>
                    </ul>
                    <p>In summary, fiber laser cutting uses focused light to slice through metal with high precision. The addition of assist gases like oxygen and nitrogen helps make the process faster, cleaner, and more effective - depending on the material and the desired outcome.</p>
                  
                
              </div>
        </Container>
      </section>
      <div className="lasercuttingmaterial">
         <Materials2/>
      </div>
      <div className="lasercuttingbreakdown">
      <BreakDownSteps/>
        </div>
    </React.Fragment>
  );
}
