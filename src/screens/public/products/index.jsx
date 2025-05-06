import React, { useState } from "react";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import img1 from "../../../assets/img/products/1.webp";
import img1_1 from "../../../assets/img/products/1-1.webp";
import img2 from "../../../assets/img/products/2.webp";
import img2_2 from "../../../assets/img/products/2-2.webp";
import img3 from "../../../assets/img/products/3.webp";
import img3_3 from "../../../assets/img/products/3-3.webp";
import img4 from "../../../assets/img/products/4.webp";
import img4_4 from "../../../assets/img/products/4-4.webp";
import img5 from "../../../assets/img/products/5.webp";
import img5_5 from "../../../assets/img/products/5-5.webp";
import img6 from "../../../assets/img/products/6.png";
import img6_6 from "../../../assets/img/products/6-6.webp";
import img7 from "../../../assets/img/products/7.png";
import img7_7 from "../../../assets/img/products/7-7.webp";
import img8 from "../../../assets/img/products/8.webp";
import img8_8 from "../../../assets/img/products/8-8.webp";
import img9 from "../../../assets/img/products/9.webp";
import img9_9 from "../../../assets/img/products/9-9.webp";
import img10 from "../../../assets/img/products/10.webp";
import img10_10 from "../../../assets/img/products/10-10.webp";
import img11 from "../../../assets/img/products/11.webp";
import img11_11 from "../../../assets/img/products/11-11.webp";
import img12 from "../../../assets/img/products/12.webp";
import img12_12 from "../../../assets/img/products/12-12.webp";
import img13 from "../../../assets/img/products/13.webp";
import img13_13 from "../../../assets/img/products/13-13.webp";
import img14 from "../../../assets/img/products/14.webp";
import img14_14 from "../../../assets/img/products/14-14.webp";
import img15 from "../../../assets/img/products/15.webp";
import img15_15 from "../../../assets/img/products/15-15.webp";
import { Link } from "react-router-dom";
export default function Products() {
  const [show, setShow] = useState(false);
  const ProductToggle = () => setShow(!show);
  return (
    <React.Fragment>
      <section className="laserProduct_sec">
        <Container>
          <Row className="g-3">
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img1_1} alt="" />
                  <Image className="img_default" src={img1} alt="" />
                </div>
                <h4><Link>Ultimate Shop Cart</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img2_2} alt="" />
                  <Image className="img_default" src={img2} alt="" />
                </div>
                <h4><Link>DIY Vibratory Tumbler</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img3_3} alt="" />
                  <Image className="img_default" src={img3} alt="" />
                </div>
                <h4><Link>Cantilever Sheet Metal Racks</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img4_4} alt="" />
                  <Image className="img_default" src={img4} alt="" />
                </div>
                <h4><Link>PressBrake Tooling Cart Plans</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img5_5} alt="" />
                  <Image className="img_default" src={img5} alt="" />
                </div>
                <h4><Link>Shop Cart Drawers</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img6_6} alt="" />
                  <Image className="img_default" src={img6} alt="" />
                </div>
                <h4><Link>Shop Cart Lock-Bars</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img7_7} alt="" />
                  <Image className="img_default" src={img7} alt="" />
                </div>
                <h4><Link>Multi-Use Shop Hanger</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img8_8} alt="" />
                  <Image className="img_default" src={img8} alt="" />
                </div>
                <h4><Link>Multi-Use Shop Hanger</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img9_9} alt="" />
                  <Image className="img_default" src={img9} alt="" />
                </div>
                <h4><Link>Paper Towel Holder</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img10_10} alt="" />
                  <Image className="img_default" src={img10} alt="" />
                </div>
                <h4><Link>Glove Box Holder</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img11_11} alt="" />
                  <Image className="img_default" src={img11} alt="" />
                </div>
                <h4><Link>Label Holder</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img12_12} alt="" />
                  <Image className="img_default" src={img12} alt="" />
                </div>
                <h4><Link>Wire-Shelf Caps</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img13_13} alt="" />
                  <Image className="img_default" src={img13} alt="" />
                </div>
                <h4><Link>Heavy Duty Tool Cart</Link></h4>
                {/* <p>$0.00 USD</p> */}
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img14_14} alt="" />
                  <Image className="img_default" src={img14} alt="" />
                </div>
                <h4><Link>Collapsible Fire Pit</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={img15_15} alt="" />
                  <Image className="img_default" src={img15} alt="" />
                </div>
                <h4><Link>Box Perforator Tool</Link></h4>
                <p><Button onClick={ProductToggle}>Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ProductToggle} className="btn-sm">Learn More</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal centered show={show} onHide={ProductToggle} className="product_modal modal-custom max-width-574">
        <Button className="btn-close z-1" variant={null} onClick={ProductToggle}></Button>
        <Modal.Body>
          <h3 className="main_heading">Scrap Cart</h3>
          <p>Taken from the "shop-cart" design... The scrap cart allows you to keep a 32-44 gallon trash can & your "skeleton" drops from your plasma or laser in the vertical rack. </p>
          <p>Free digital download with all the files you'll need, plus URL links for the hardware you'll need (McMaster Carr).</p>
          <ul>
            <li>12 Gauge steel constructions (easy to laser cut or plasma cut) </li>
            <li>Simple bends (Press-brake or Pan-Break... if you're strong)</li>
            <li>Bolt together (no welding)</li>
            <li>Up to 1-TON capacity </li>
            <li>36" deep, 24" wide, & 36" tall</li>
          </ul>
          <Button className="mt-3">Download Free Files</Button>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
