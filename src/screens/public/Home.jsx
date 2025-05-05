import React,{useState} from "react";
import { Accordion, Row, Col, Container, Image, Button, Modal } from "react-bootstrap";
import bannerimg from "../../assets/img/bannerimg.png";
import reviewimg1 from "../../assets/img/reviewimg1.jpg";
import american from "../../assets/img/american.JPG";
import reviewuser1 from "../../assets/img/reviewuser1.JPG";
import reviewuser2 from "../../assets/img/reviewuser2.JPG";
import reviewimg2 from "../../assets/img/reviewimg-1.webp";
import reviewimg3 from "../../assets/img/reviewimg3.png";
import reviewimg4 from "../../assets/img/reviewimg-2.webp";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import BreakDownSteps from "../../components/BreakDownSteps";

export default function Home() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  return (
    <React.Fragment>
      <section className="banner-home">
        <Container>
          <div className="banner-content">
            <h1>Laser Cut Parts Delivered To Your Door.</h1>
            <p>Upload. Configure. Checkout. Done.</p>
            <Image src={bannerimg} className="img-fluid" alt="" />
            <Button className="mt-3 d-inline-flex align-items-center gap-2" as={Link}  to="/quotes/quotes-detail">
              Get Started Now! Upload Your DXF <Icon icon="tabler:upload" width={22} height={22} className="ms-0 me-0" />
            </Button>
            <p className="bannersubpara">You'll need to login to upload</p>
            <h4>Most Orders Ship in as Little as <b>3-days!</b></h4>
            <h4><b>Multiple Shipping Options</b> to Meet Your Deadlines.</h4>
            <h4><b>Instant Online Quotes</b> through our secure app.</h4>
          </div>
        </Container>
      </section>
      <section className="homereviews">
        <div class="heading mb-5 text-center">
          <h2>What Our Customers Have To Say</h2>
        </div>
        <Container>
          <div className="reviewslist mb-4">
            <Row>
              <Col lg={6} className="my-2">
                <div className="reviewsleftcontent text-center">
                  {/* <h3>Customer Since:2024</h3> */}
                  <div className="reviewuser">
                    <div>
                      <Image src={reviewuser2} className="img-fluid rounded-circle" alt="" />
                      <h5 className="mb-0" style={{textAlign:'left'}}>Jason Gill</h5>
                    </div>
                    <div className="reviewrate">
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                    </div>
                  </div>
                  <p>Lase Bros has been transformative for my small automotive manufacturing business! The parts that I have produced by Cort and the team exceed my expectations every time. They go the extra mile to make sure that my parts look great, even with bends - so I can ship mill finish parts that require  no additional coating or finishing to be customer ready. I can get prototypes turned around in just a couple days, and production runs that are ready to pack and ship - with competitive prices and American-made qualtiy. I culd not be happier with the results from Laser Bros and I recommended them to everyone in my industry!</p>
                </div>
              </Col>
              <Col lg={6} className="my-2">
                <div className="reviewsrightcontent text-center">
                  <h2>Their Part</h2>
                  <Image src={reviewimg3} className="img-fluid imgreviewhome" alt="" />
                  <div className="clearfix"></div>
                  <div className="d-inline-flex justify-content-center flex-column">
                    <div className="reviewbadge mb-1">
                      <h4 className="mb-0">Material:</h4>
                      <Link className="aluminiumbadge" to="/resources/aluminum">0.080 5052 Grade Aluminium <Icon icon="ix:layers" width={22} height={22} /></Link>
                    </div>
                    <div className="reviewbadge mt-1">
                      <h4 className="mb-0">Services:</h4>
                      <Link className="lasercuttingbadge" to="/laser-cutting">Laser Cutting</Link>
                      <Link className="lasercuttingbadge" to="/bending">CNC Bending</Link>
                      <Link className="lasercuttingbadge" to="/metalfinishing">Metal Finishing</Link>
                      {/* <div className="d-inline-block text-center">
                     <p className="mb-0"><Link to='/bending'>Learn About Bending</Link></p> 
                    </div> */}
                    </div>
                  </div>
                  {/* <div className="reviewbadge text-end mt-1">
                    <div className="d-inline-block text-center">
                      <span className="lasercuttingbadge">Lase Cutting</span>
                      <p className="mb-0"><Link to='/laser-cutting'>Learn About Laser Cutting</Link></p>
                    </div>
                  </div> */}
                </div>

              </Col>
            </Row>
          </div>
          <div className="reviewslist mb-4">
            <Row>
              <Col lg={6} className="my-2">
                <div className="reviewsleftcontent text-center">
                  {/* <h3>Customer Since:2022</h3> */}
                  <div className="reviewuser">
                    <div>
                      <Image src={reviewimg1} className="img-fluid rounded-circle" alt="" />
                      <h5 className="mb-0">Steven Carlin</h5>
                    </div>
                    <div className="reviewrate">
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                    </div>
                  </div>
                  <p>Quick turnaround and excellent customer service. If you need the right parts made fast, these are the guys to use.</p>
                </div>
              </Col>
              <Col lg={6} className="my-2">
                <div className="reviewsrightcontent text-center">
                  <h2>Their Part</h2>
                  <Image src={reviewimg2} className="img-fluid imgreviewhome" alt="" />
                  <div className="clearfix"></div>
                  <div className="d-inline-flex justify-content-center flex-column">
                    <div className="reviewbadge mb-1">
                      <h4 className="mb-0">Material:</h4>
                      <Link className="steelbadge" to="/resources/steel">12 gauge (0.100) HRPO Steel <Icon icon="ix:layers" width={22} height={22} /></Link>
                    </div>
                    <div className="reviewbadge mt-1">
                      <h4 className="mb-0">Services:</h4>
                      <Link className="lasercuttingbadge" to="/laser-cutting">Laser Cutting</Link>
                      <Link className="lasercuttingbadge" to="/metalfinishing">Metal Finishing</Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="reviewslist mb-4">
            <Row>
              <Col lg={6} className="my-2">
                <div className="reviewsleftcontent text-center">
                  {/* <h3>Customer Since:2022</h3> */}
                  <div className="reviewuser">
                    <div>
                      <Image src={reviewuser1} className="img-fluid rounded-circle" alt="" />
                      <div className="clearfix"></div>
                      <h5 className="mb-0">Kyle Malcolm</h5>
                    </div>
                    <div className="reviewrate">
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                    </div>
                  </div>
                  <p>Lase Bros is all around great to work with. They are able to produce my orders in just a few days and their prices are very reasonable even when I'm placing relatively small orders. Cort is always very responsive and willing to work with me to make even the smallest adjustments so I get exactly the produce I am looking for. I would definitrly recommend Laser Bros to anyone who needs laser cutting services.</p>
                </div>
              </Col>
              <Col lg={6} className="my-2">
                <div className="reviewsrightcontent text-center">
                  <h2>Their Part</h2>
                  <Image src={reviewimg4} className="img-fluid imgreviewhome mt-3" alt="" />
                  <div className="clearfix"></div>
                  <div className="d-inline-flex justify-content-center flex-column">
                    <div className="reviewbadge mb-1">
                      <h4 className="mb-0">Material:</h4>
                      <Link className="brassbadge" to="/resources/brass">0.093 Brass-260 <Icon icon="ix:layers" width={22} height={22} /></Link>
                    </div>
                    <div className="reviewbadge mt-1">
                      <h4 className="mb-0">Services:</h4>
                      <Link className="lasercuttingbadge" to="/laser-cutting">Laser Cutting</Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="text-center">
            <Button>
              See More Reviews
            </Button>
          </div>
        </Container>
      </section>
      <BreakDownSteps />
      <section className="faq-home">
        <Container>
          <div class="heading mb-4 text-center">
            <h2>FAQ</h2>
          </div>
          <h3 className="faqsubhead">Most Asked Questions</h3>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is your lead time?</Accordion.Header>
              <Accordion.Body>
                Our typical lead time on laser cut parts is 2-5 business days. If you add services like bending, this typically adds 1-3 business days to the lead time. Other factors like the number of parts will also impact the lead time of your parts.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Where are you located?</Accordion.Header>
              <Accordion.Body>
                We are located in Graham, North Carolina!
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                How do I add bending to my order?
              </Accordion.Header>
              <Accordion.Body>
                Bending is added by checking the bending services box. The pop-up will prompt you for the number of bends (this is the total number of bends on one part). You will need to upload a STEP file for the bent part too (this is for us to validate the bends). Alternatively, you can upload a PDF drawing, but this method will take longer to validate, and we cannot guarantee the accuracy of your part(s).
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Can I expedite my order?</Accordion.Header>
              <Accordion.Body>
                Yes! But this is dependent on the material type, quantity of parts, and what our schedule is already like. Give us a call or email if you need your order expedited! Don’t forget you can select Next Day Air for next-day delivery too.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </section>
      <section className="american-manufacturing">
        <Container>
          <div class="heading mb-4 text-center">
            <h2>We Believe in American Manufacturing!</h2>
          </div>
          <div className=" text-center ">
            <Image src={american} className="img-fluid mx-auto" alt="" />
            <h4 className="mt-3">Our Mission is to Support the American Innovator.</h4>
            <Button className="mt-3 d-inline-flex align-items-center" as={Link}  to="/about-us">Learn More About Us</Button>
          </div>
        </Container>
      </section>
      <Modal centered show={show} onHide={handleClose} className="promotion_modal modal-custom">
        <Button className="btn-close z-1" variant={null} onClick={handleClose}></Button>
        <Modal.Body>
       <h4>Save 15% on your first order!</h4>
       <h4>Use Code: SAVE15</h4>
       <Button className="mt-3 d-inline-flex align-items-center gap-2" as={Link}  to="/quotes/quotes-detail">
              Get Started Now! Upload Your DXF <Icon icon="tabler:upload" width={22} height={22} className="ms-0 me-0" />
            </Button>
            <p>You'll need to login to upload</p>
        </Modal.Body>
      </Modal>    
    </React.Fragment>
  );
}
