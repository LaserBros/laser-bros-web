import React, { useEffect, useState } from "react";
import { Accordion, Row, Col, Container, Image, Button } from "react-bootstrap";
import bannerimg from "../../assets/img/bannerimg.png";
import reviewimg1 from "../../assets/img/reviewimg1.jpg";
import american from "../../assets/img/american.JPG";
import reviewuser1 from "../../assets/img/reviewuser1.JPG";
import reviewuser2 from "../../assets/img/reviewuser2.JPG";
import reviewimg2 from "../../assets/img/reviewimg-1.webp";
import reviewimg3 from "../../assets/img/reviewimg3.png";
import reviewimg4 from "../../assets/img/reviewimg-2.webp";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import BreakDownSteps from "../../components/BreakDownSteps";
import axiosInstance from "../../axios/axiosInstance";

export default function Home() {
   const navigate = useNavigate();
   const [faqDetail,setFaq] = useState([]);
   const [showMore, setShowMore] = useState(false);

   const FetchFaq = async () => {
    try {
      const response = await axiosInstance.get(`/users/generalFAQ`);
      setFaq(response.data.data);      
    } catch (error) {
      setFaq([]);
    }
   }
   
   useEffect( () => {
    FetchFaq();
   },[])
  return (
    <React.Fragment>
      <section className="banner-home">
        <Container>
          <div className="banner-content">
            <h1>Laser Cut Parts Delivered To Your Door.</h1>
            <p>Upload. Configure. Checkout. Done.</p>
            <Image src={bannerimg} className="img-fluid" alt="" />
            <Button className="mt-3 d-inline-flex align-items-center gap-2" onClick={() => navigate('/quotes/quotes-detail')}>
              Get Started Now! Upload Your DXF <Icon icon="tabler:upload" width={22} height={22} className="ms-0 me-0" />
            </Button>
            <p className="bannersubpara">You'll need to login to upload</p>
            <h4>Most Orders Ship in as Little as <b>3-days!</b></h4>
            <h4><b>Multiple Shipping Options</b> to Meet Your Deadlines.</h4>
          </div>
        </Container>
      </section>
      <section className="homereviews">
      {/* <Container>
          <div className="reviewslist mb-4">
            <Row>
              <Col md={6}>
                <div className="reviewsleftcontent text-center">
                  <h3>Customer Since:2022</h3>
                  <div className="reviewuser">
                    <Image src={reviewimg1} className="img-fluid rounded-circle" alt="" />
                    <h5 className="mb-0">Steven Carlin</h5>
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
              <Col md={6}>
                <div className="reviewsrightcontent text-center">
                  <div className="reviewbadge text-center">
                    <span className="steelbadge">12 gauge (0.100) HRPO Steel <Icon icon="ix:layers" width={22} height={22} /></span>
                    <p className="mb-0"><Link>See More Materials We Offer</Link></p>
                  </div>
                  <div className="reviewbadge text-start mt-1">
                    <div className="d-inline-block text-center">
                      <span className="lasercuttingbadge">Laser Cutting</span>
                      <p className="mb-0"><Link to='/laser-cutting'>Learn About Laser Cutting</Link></p>
                    </div>
                  </div>
                  <Image src={reviewimg2} className="img-fluid imgreviewhome" alt="" />
                  <div className="reviewbadge text-end mt-1">
                    <div className="d-inline-block text-center">
                      <span className="lasercuttingbadge">Metal Finishing</span>
                      <p className="mb-0"><Link to='/metalfinishing'>Learn About Sheet Metal Finishing</Link></p>
                    </div>
                  </div>
                </div>

              </Col>
            </Row>
          </div>
          <div className="reviewslist mb-4">
            <Row>
              <Col md={6}>
                <div className="reviewsleftcontent text-center">
                  <h3>Customer Since:2024</h3>
                  <div className="reviewuser">
                    <Image src={reviewuser2} className="img-fluid rounded-circle" alt="" />
                    <h5 className="mb-0">Jason Gill</h5>
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
              <Col md={6}>
                <div className="reviewsrightcontent text-center">
                  <div className="reviewbadge text-center">
                    <span className="aluminiumbadge">0.080 5052 Aluminium <Icon icon="ix:layers" width={22} height={22} /></span>
                    <p className="mb-0"><Link>See More Materials We Offer</Link></p>
                  </div>
                  <div className="reviewbadge text-start mt-1">
                    <div className="d-inline-block text-center">
                      <span className="lasercuttingbadge">CNC Bending</span>
                      <p className="mb-0"><Link to='/bending'>Learn About Bending</Link></p>
                    </div>
                  </div>
                  <Image src={reviewimg3} className="img-fluid imgreviewhome" alt="" />
                  <div className="reviewbadge text-end mt-1">
                    <div className="d-inline-block text-center">
                      <span className="lasercuttingbadge">Lase Cutting</span>
                      <p className="mb-0"><Link to='/laser-cutting'>Learn About Laser Cutting</Link></p>
                    </div>
                  </div>
                </div>

              </Col>
            </Row>
          </div>
          <div className="reviewslist mb-4">
            <Row>
              <Col md={6}>
                <div className="reviewsleftcontent text-center">
                  <h3>Customer Since:2022</h3>
                  <div className="reviewuser">
                    <Image src={reviewuser1} className="img-fluid rounded-circle" alt="" />
                    <h5 className="mb-0">Kle Malcolm</h5>
                    <div className="reviewrate">
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                    </div>
                  </div>
                  <p>Lase Bros ia ll around great to work with. They are able to produce my orders in just a few days and their prices are very reasonable even when I'm placing relatively small orders. Cort is always very responsive and willing to work with me to make even the smallest adjustments so I get exactly the produce I am looking for. I would definitrly recommend Laser Bros to anyone who needs laser cutting services.</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="reviewsrightcontent text-center">
                  <div className="reviewbadge text-center">
                    <span className="brassbadge">0.093 Brass-260 <Icon icon="ix:layers" width={22} height={22} /></span>
                    <p className="mb-0"><Link>See More Materials We Offer</Link></p>
                  </div>

                  <Image src={reviewimg4} className="img-fluid imgreviewhome my-4" alt="" />
                  <div className="reviewbadge text-center mt-1">
                    <span className="lasercuttingbadge">Laser Cutting</span>
                    <p className="mb-0"><Link to='/laser-cutting'>Learn About Laser Cutting</Link></p>
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
        </Container> */}
        <Container>
      {/* First Review */}
      <div className="reviewslist mb-4">
        <Row>
          <Col md={6}>
            <div className="reviewsleftcontent text-center">
              <h3>Customer Since:2022</h3>
              <div className="reviewuser">
                <Image src={reviewimg1} className="img-fluid rounded-circle" alt="" />
                <h5 className="mb-0">Steven Carlin</h5>
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
          <Col md={6}>
            <div className="reviewsrightcontent text-center">
              <div className="reviewbadge text-center">
                <span className="steelbadge">
                  12 gauge (0.100) HRPO Steel <Icon icon="ix:layers" width={22} height={22} />
                </span>
                <p className="mb-0"><Link>See More Materials We Offer</Link></p>
              </div>
              <div className="reviewbadge text-start mt-1">
                <div className="d-inline-block text-center">
                  <span className="lasercuttingbadge">Laser Cutting</span>
                  <p className="mb-0"><Link to="/laser-cutting">Learn About Laser Cutting</Link></p>
                </div>
              </div>
              <Image src={reviewimg2} className="img-fluid imgreviewhome" alt="" />
              <div className="reviewbadge text-end mt-1">
                <div className="d-inline-block text-center">
                  <span className="lasercuttingbadge">Metal Finishing</span>
                  <p className="mb-0"><Link to="/metalfinishing">Learn About Sheet Metal Finishing</Link></p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="reviewslist mb-4">
            <Row>
              <Col md={6}>
                <div className="reviewsleftcontent text-center">
                  <h3>Customer Since:2024</h3>
                  <div className="reviewuser">
                    <Image src={reviewuser2} className="img-fluid rounded-circle" alt="" />
                    <h5 className="mb-0">Jason Gill</h5>
                    <div className="reviewrate">
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                    </div>
                  </div>
                  <p>Lase Bros has been transformative for my small automotive manufacturing business! The parts that I have produced by Cort and the team exceed my expectations every time. They go the extra mile to make sure that my parts look great, even with bends - so I can ship mill finish parts that require no additional coating or finishing to be customer ready. I can get prototypes turned around in just a couple days, and production runs that are ready to pack and ship - with competitive prices and American-made qualtiy. I culd not be happier with the results from Laser Bros and I recommended them to everyone in my industry!</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="reviewsrightcontent text-center">
                  <div className="reviewbadge text-center">
                    <span className="aluminiumbadge">0.080 5052 Aluminium <Icon icon="ix:layers" width={22} height={22} /></span>
                    <p className="mb-0"><Link>See More Materials We Offer</Link></p>
                  </div>
                  <div className="reviewbadge text-start mt-1">
                    <div className="d-inline-block text-center">
                      <span className="lasercuttingbadge">CNC Bending</span>
                      <p className="mb-0"><Link to="/bending">Learn About Bending</Link></p>
                    </div>
                  </div>
                  <Image src={reviewimg3} className="img-fluid imgreviewhome" alt="" />
                  <div className="reviewbadge text-end mt-1">
                    <div className="d-inline-block text-center">
                      <span className="lasercuttingbadge">Lase Cutting</span>
                      <p className="mb-0"><Link to="/laser-cutting">Learn About Laser Cutting</Link></p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Third Review */}
          <div className="reviewslist mb-4">
            <Row>
              <Col md={6}>
                <div className="reviewsleftcontent text-center">
                  <h3>Customer Since:2022</h3>
                  <div className="reviewuser">
                    <Image src={reviewuser1} className="img-fluid rounded-circle" alt="" />
                    <h5 className="mb-0">Kle Malcolm</h5>
                    <div className="reviewrate">
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                    </div>
                  </div>
                  <p>Lase Bros ia ll around great to work with. They are able to produce my orders in just a few days and their prices are very reasonable even when I'm placing relatively small orders. Cort is always very responsive and willing to work with me to make even the smallest adjustments so I get exactly the produce I am looking for. I would definitrly recommend Laser Bros to anyone who needs laser cutting services.</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="reviewsrightcontent text-center">
                  <div className="reviewbadge text-center">
                    <span className="brassbadge">0.093 Brass-260 <Icon icon="ix:layers" width={22} height={22} /></span>
                    <p className="mb-0"><Link>See More Materials We Offer</Link></p>
                  </div>
                  <Image src={reviewimg4} className="img-fluid imgreviewhome my-4" alt="" />
                  <div className="reviewbadge text-center mt-1">
                    <span className="lasercuttingbadge">Laser Cutting</span>
                    <p className="mb-0"><Link to="/laser-cutting">Learn About Laser Cutting</Link></p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

      {/* Other Reviews Hidden by Default */}
      {showMore && (
        <>
          {/* Second Review */}
          <div className="reviewslist mb-4">
            <Row>
              <Col md={6}>
                <div className="reviewsleftcontent text-center">
                  <h3>Customer Since:2024</h3>
                  <div className="reviewuser">
                    <Image src={reviewuser2} className="img-fluid rounded-circle" alt="" />
                    <h5 className="mb-0">Jason Gill</h5>
                    <div className="reviewrate">
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                    </div>
                  </div>
                  <p>Lase Bros has been transformative for my small automotive manufacturing business! The parts that I have produced by Cort and the team exceed my expectations every time. They go the extra mile to make sure that my parts look great, even with bends - so I can ship mill finish parts that require no additional coating or finishing to be customer ready. I can get prototypes turned around in just a couple days, and production runs that are ready to pack and ship - with competitive prices and American-made qualtiy. I culd not be happier with the results from Laser Bros and I recommended them to everyone in my industry!</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="reviewsrightcontent text-center">
                  <div className="reviewbadge text-center">
                    <span className="aluminiumbadge">0.080 5052 Aluminium <Icon icon="ix:layers" width={22} height={22} /></span>
                    <p className="mb-0"><Link>See More Materials We Offer</Link></p>
                  </div>
                  <div className="reviewbadge text-start mt-1">
                    <div className="d-inline-block text-center">
                      <span className="lasercuttingbadge">CNC Bending</span>
                      <p className="mb-0"><Link to="/bending">Learn About Bending</Link></p>
                    </div>
                  </div>
                  <Image src={reviewimg3} className="img-fluid imgreviewhome" alt="" />
                  <div className="reviewbadge text-end mt-1">
                    <div className="d-inline-block text-center">
                      <span className="lasercuttingbadge">Lase Cutting</span>
                      <p className="mb-0"><Link to="/laser-cutting">Learn About Laser Cutting</Link></p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Third Review */}
          <div className="reviewslist mb-4">
            <Row>
              <Col md={6}>
                <div className="reviewsleftcontent text-center">
                  <h3>Customer Since:2022</h3>
                  <div className="reviewuser">
                    <Image src={reviewuser1} className="img-fluid rounded-circle" alt="" />
                    <h5 className="mb-0">Kle Malcolm</h5>
                    <div className="reviewrate">
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                      <Icon icon="material-symbols:star" />
                    </div>
                  </div>
                  <p>Lase Bros ia ll around great to work with. They are able to produce my orders in just a few days and their prices are very reasonable even when I'm placing relatively small orders. Cort is always very responsive and willing to work with me to make even the smallest adjustments so I get exactly the produce I am looking for. I would definitrly recommend Laser Bros to anyone who needs laser cutting services.</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="reviewsrightcontent text-center">
                  <div className="reviewbadge text-center">
                    <span className="brassbadge">0.093 Brass-260 <Icon icon="ix:layers" width={22} height={22} /></span>
                    <p className="mb-0"><Link>See More Materials We Offer</Link></p>
                  </div>
                  <Image src={reviewimg4} className="img-fluid imgreviewhome my-4" alt="" />
                  <div className="reviewbadge text-center mt-1">
                    <span className="lasercuttingbadge">Laser Cutting</span>
                    <p className="mb-0"><Link to="/laser-cutting">Learn About Laser Cutting</Link></p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}

      {/* See More Button */}
      <div className="text-center">
        <Button onClick={() => setShowMore(!showMore)}>
          {showMore ? "Hide Reviews" : "See More Reviews"}
        </Button>
      </div>
    </Container>

  
      </section>
      <BreakDownSteps />
      {faqDetail.length > 0 &&
      <section className="faq-home">
        <Container>
          <div class="heading mb-3 text-center">
            <h2>FAQ</h2>
          </div>
          <h3 className="faqsubhead">Most Asked Questions</h3>
          <Accordion>
            {faqDetail.map((faqDetail,index) => {
              return (
            <Accordion.Item eventKey={{index}}>
              <Accordion.Header>{faqDetail.question}</Accordion.Header>
              <Accordion.Body>
              {faqDetail.answer}
              </Accordion.Body>
            </Accordion.Item>
              )
            })}
          </Accordion>
        </Container>
      </section>
      }
      <section className="american-manufacturing">
        <Container>
          <div class="heading mb-3 text-center ">
            <h2>We Believe in American Manufacturing!</h2>
          </div>
          <div className=" text-center ">
          <Image src={american} className="img-fluid mx-auto" alt=""/>
          <h4 className="mt-3">Our Mission is to Support the American Innovator.</h4>
          <Button className="mt-3" onClick={() => navigate('/about-us')}>Learn More About Us</Button>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
}
