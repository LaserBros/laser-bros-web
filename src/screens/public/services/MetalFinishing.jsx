import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import shape1 from "../../../assets/img/line-shape-1.svg";
import { Icon } from "@iconify/react";
import img1 from "../../../assets/img/metalimg1.webp";
import img2 from "../../../assets/img/metalimg2.jpg";
import img3 from "../../../assets/img/metalimg3.webp";
import img4 from "../../../assets/img/metalimg4.webp";
import img5 from "../../../assets/img/metalimg5.webp";
import img6 from "../../../assets/img/metalimg6.webp";
import img7 from "../../../assets/img/metalimg7.jpg";
import img8 from "../../../assets/img/metalimg8.webp";
import img9 from "../../../assets/img/metalimg9.jpg";
import img10 from "../../../assets/img/metalimg10.jpg";
import img11 from "../../../assets/img/metalimg11.webp";
import img12 from "../../../assets/img/metalimg12.jpg";
import img13 from "../../../assets/img/metalimg13.webp";
import img14 from "../../../assets/img/metalimg14.webp";
import MaterialsBending from "../../../components/MaterialsBending";
export default function MetalFinishing() {
  return (
    <React.Fragment>
      <section className="metalFinish_banner">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="banner-content">
                <h1><span>Metal Finishing<img src={shape1} className="img-fluid w-100" alt="" /></span> Options</h1>
                <p>Metal finishing refers to the post-processing steps we take after laser cutting. While we don’t currently offer services like powder coating, zinc plating, or other chemical finishes, our finishing options are great for preparing your parts for whatever comes next.</p>
                <p>Here are some of the finishes we offer:</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="metalfinish_sec">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="metalfinish_div">
                <h4><Icon icon="oui:dot" width="10" height="10" className="me-1" />No Finish</h4>
                <p>This means raw, laser-cut parts. The edges may have oxidation (oxide) and burrs (rough or sharp bits) from the cutting process.</p>
                <Row className="g-3">
                  <Col lg={4}>
                    <div className="metalfinish_box steelColor">
                      <Image src={img1} alt="" />
                      <h5>Steel - No Finish</h5>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="metalfinish_box stainlessColor">
                      <Image src={img2} alt="" />
                      <h5>Stainless Steel - No Finish</h5>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="metalfinish_box aluminumColor">
                      <Image src={img3} alt="" />
                      <h5>Aluminum - No Finish</h5>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="metalfinish_div">
                <h4><Icon icon="oui:dot" width="10" height="10" className="me-1" />Orbital Sanding</h4>
                <p>We use an air-powered random orbital sander with 80-grit sandpaper to remove surface burrs. This creates a scuffed texture, which is excellent for prepping parts for paint or powder coating.</p>
                <Row className="g-3">
                  <Col lg={4}>
                    <div className="metalfinish_box steelColor">
                      <Image src={img4} alt="" />
                      <h5>Steel - Orbital Sanded</h5>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="metalfinish_box stainlessColor">
                      <Image src={img5} alt="" />
                      <h5>Stainless Steel - Orbital Sanded</h5>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="metalfinish_box aluminumColor">
                      <Image src={img6} alt="" />
                      <h5>Aluminum - Orbital Sanded</h5>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="metalfinish_div">
                <h4><Icon icon="oui:dot" width="10" height="10" className="me-1" />Linear Sanding</h4>
                <p>This finish is done using our wide belt sander, which creates a clean, linear grain across the surface of the part.</p>
                <ul>
                  <li>Note: Edges may still have slight burrs or sharpness.</li>
                  <li>Size limits: Max width is 36 inches, and minimum length is 7 inches.</li>
                </ul>
                <Row className="g-3">
                  <Col lg={4}>
                    <div className="metalfinish_box stainlessColor">
                      <Image src={img7} alt="" />
                      <h5>Stainless Steel - Linear Sanded</h5>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="metalfinish_box aluminumColor">
                      <Image src={img8} alt="" />
                      <h5>Aluminum - Linear Sanded</h5>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="metalfinish_div">
                <h4><Icon icon="oui:dot" width="10" height="10" className="me-1" />Tumble Finish</h4>
                <p>Tumbling uses ceramic or resin media in a vibrating tub to smooth sharp edges and remove burrs. It’s a slower process but leaves a consistent, soft finish.</p>
                <ul>
                  <li>Size limits: Max part size is 3" x 24" or 72 square inches total.</li>
                </ul>
                <Row className="g-3">
                  <Col lg={4}>
                    <div className="metalfinish_box steelColor">
                      <Image src={img9} alt="" />
                      <h5>Steel - Tumble Finish</h5>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="metalfinish_box stainlessColor">
                      <Image src={img10} alt="" />
                      <h5>Stainless Steel - Tumble Finish</h5>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="metalfinish_box aluminumColor">
                      <Image src={img11} alt="" />
                      <h5>Aluminum - Tumble Finish</h5>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="metalfinish_div">
                <h4><Icon icon="oui:dot" width="10" height="10" className="me-1" />Pristine Finish</h4>
                <p>This finish is ideal for automotive applications where the raw, mill finish of aluminum needs to look clean and presentable — perfect for surge tanks, radiator caps, and other visible components. <br />We take extra care to select the best-quality sheets before cutting, making sure the top surface stays as flawless as possible.</p>
                <ul>
                  <li>Note: The underside of the sheet may still show some blemishes from the laser process, but we do everything we can to keep the face looking pristine.</li>
                </ul>
                <Row className="g-3">
                  <Col lg={4}>
                    <div className="metalfinish_box aluminumColor">
                      <Image src={img12} alt="" />
                      <h5>Aluminum - Pristine Finish</h5>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="metalfinish_div">
                <h4><Icon icon="oui:dot" width="10" height="10" className="me-1" />#4 Stainless Steel</h4>
                <p>#4 Stainless Steel is typically used in sanitary environments. The surface finish is sanded to a very fine “grain”. This surface finish is protected with a PVC/Laser guard film from the metal supplier. We leave this film in place to protect the finish of the parts.</p>
                <Row className="g-3">
                  <Col lg={4}>
                    <div className="metalfinish_box stainlessColor">
                      <Image src={img13} alt="" />
                      <h5>#4 Stainless with Film in Place</h5>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="metalfinish_box stainlessColor">
                      <Image src={img14} alt="" />
                      <h5>#4 Stainless with Film Removed</h5>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="metalfinish_div">
                <h4><Icon icon="oui:dot" width="10" height="10" className="me-1" />Custom Finishes</h4>
                <p>Need something different? We can often accommodate custom requests like manual edge deburring services, polished surfaces, or any other unique finishing ideas you may have.</p>
              </div>
              <div className="text-center mt-5">
                <Button className="btn btn-primary mb-2">Get Started Now! Upload Your DXF</Button>
                <span className="loginUploadInfo_text">You’ll need to login to upload</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
