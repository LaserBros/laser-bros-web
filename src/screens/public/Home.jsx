import React, { useCallback, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import shape1 from "../../assets/img/line-shape-1.svg";
import shape5 from "../../assets/img/shape-5.svg";
import serviceimg1 from "../../assets/img/services-img-1.webp";
import serviceimg2 from "../../assets/img/services-img-2.webp";
import img1 from "../../assets/img/img1.jpg";
import img2 from "../../assets/img/img2.jpg";
import icon1 from "../../assets/img/icon-1.svg";
import icon2 from "../../assets/img/icon-2.svg";
import icon3 from "../../assets/img/icon-3.svg";
import quote from "../../assets/img/quote.svg";
import frame from "../../assets/img/frame1.jpg";
import user1 from "../../assets/img/user-1.jpg";
import user2 from "../../assets/img/user-2.jpg";
import dots from "../../assets/img/dots.svg";
import Slider from "react-slick";
import Materials from "../../components/Materials";
import CTA from "../../components/cta";
// Import css files
import { useDropzone } from "react-dropzone";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FileUpload from "../../components/FileUpload";

export default function Home() {
  const [hovered, setHovered] = useState(null);
  const handleFileDrop = (acceptedFiles) => {
    console.log("Files dropped:", acceptedFiles);
    // Add any additional logic for handling the files
  };

  const services = [
    {
      id: 1,
      title: "Laser Cutting",
      leadTime: "Typical lead time 2-5 days",
      icon: icon1,
      img: serviceimg1,
      link: "/laser-cutting",
    },
    {
      id: 2,
      title: "Bending",
      leadTime: "Typical lead time +2-3 days",
      icon: icon2,
      img: serviceimg2,
      link: "/bending",
    },
    // Add more services as needed
  ];
  const getCurrentImage = () => {
    if (hovered !== null) {
      return services.find((service) => service.id === hovered).img;
    }
    return serviceimg1; // Default image if none is hovered
  };

  var settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <React.Fragment>
      <section className="banner-home">
        <Container>
          <div className="banner-content">
            <h1>
              Here to Support The{" "}
              <span>
                American <img src={shape1} className="img-fluid" alt="" />
              </span>{" "}
              Innovator
            </h1>
            <p>
              On Demand Sheet Metal Services. Old-school customer service
              combined with new-school technology.
            </p>
            <ul className="list-unstyled">
              <li>
                <Icon icon="streamline:dollar-coin" /> Instant Pricing
              </li>
              <li>
                <Icon icon="hugeicons:truck-delivery" /> Ships In Days
              </li>
              <li>
                <Icon icon="ph:handshake" /> Support When You Need It
              </li>
            </ul>
            <p className="banner-sm-text">
              So what makes Laser Bros any different from these other on demand
              laser cutting services? Mission:{" "}
              <b>To Support the American Innovator.</b> This is why we do what
              we do. The American innovator can be anyone; an entrepreneur
              launching their product from their garage, a group of dudes
              building a project car, or a company building something that’ll
              get launched into space. They’re all innovating in their own way.
              We want to be a means to that innovation, a resource to remove
              limitations around what can be built.
            </p>
            <FileUpload
              accept=".step"
              // label="Upload Your STEP File"
              instructions="We accept STEP files for instant quotes"
              onFileDrop={handleFileDrop}
            />
          </div>
        </Container>
      </section>
      <section className="our-services">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="services-img">
                {/* <img src={img1} className="img-fluid rounded-circle" alt="" /> */}
                <img
                  src={getCurrentImage()}
                  className="img-fluid rounded-circle"
                  alt="Service"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="services-content">
                <div className="heading mb-5">
                  <h2>Our Services</h2>
                  <p className="max-width-470">
                    Some of the services we offer.
                  </p>
                </div>
                <Row>
                  {services.map((service) => (
                    <Col md={6}>
                      <Link
                        key={service.id}
                        className="services-grid"
                        to={service.link}
                        onMouseEnter={() => setHovered(service.id)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div className="single-item-thumbs">
                          <img
                            src={service.icon}
                            className="img-fluid"
                            alt={service.title}
                          />
                        </div>
                        <h2>{service.title}</h2>
                        <p>{service.leadTime}</p>
                      </Link>
                    </Col>
                  ))}

                  {/* <Col md={6}>
                    <Link className="services-grid" to="/bending">
                      <div className="single-item-thumbs">
                        <img src={icon2} className="img-fluid" alt="" />
                      </div>
                      <h2>Bending</h2>
                      <p>Typical lead time +2-3 days</p>
                    </Link>
                  </Col> */}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Materials />
      <section className="get-instant-quote">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="get-quote-img">
                <div className="portal-inner">
                  <div className="top-portal">
                    <img src={dots} className="img-fluid" alt="" />
                  </div>
                  <img src={frame} className="img-fluid bottom-img" alt="" />
                </div>
              </div>
            </Col>
            <Col lg={6} className="ps-lg-4">
              <div className="get-quote-content">
                <div className="heading mb-4">
                  <h2>Get an Instant Quote.</h2>
                  <p>
                    Upload your DXF(s) for an instant quote. You don’t even have
                    to create an account to try it out!
                  </p>
                </div>
                <div className="features-content-box">
                  <div className="feature-icon">
                    <Icon icon="icon-park-outline:upload-web" />
                  </div>
                  <div className="content">
                    <h3>Upload Your DXF file</h3>
                    <p>Upload 1 or more DXF files to get started</p>
                  </div>
                </div>
                <div className="features-content-box">
                  <div className="feature-icon">
                    <Icon icon="ic:outline-settings" />
                  </div>
                  <div className="content">
                    <h3>Configure Your Parts</h3>
                    <p>Select your material and any additional services</p>
                  </div>
                </div>
                <div className="features-content-box">
                  <div className="feature-icon">
                    <Icon icon="ic:baseline-shopping-cart-checkout" />
                  </div>
                  <div className="content">
                    <h3>Checkout & Pay</h3>
                    <p>
                      Pay for your parts directly on the platform. No hidden
                      fees, and no waiting.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="get-instant-quote get-parts">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="get-quote-content">
                <div className="heading mb-4">
                  <h2>Get Your Parts In Days.</h2>
                  <p>
                    Don’t wait weeks for your parts. We work hard to make sure
                    your parts get to you as fast as possible!
                  </p>
                </div>
                <div className="features-content-box">
                  <div className="feature-icon">
                    <Icon icon="la:shipping-fast" />
                  </div>
                  <div className="content">
                    <h3>Shipping calculated at checkout</h3>
                    <p>
                      We do this to be completely transparent with our pricing.
                      No baked in shipping costs disguised as “Free-shipping”.
                    </p>
                  </div>
                </div>
                <div className="features-content-box">
                  <div className="feature-icon">
                    <img src={icon3} className="img-fluid" alt="" />
                  </div>
                  <div className="content">
                    <h3>Overnight Shipping Options</h3>
                    <p>
                      We offer overnight shipping options for orders that
                      require extra fast delivery!
                    </p>
                  </div>
                </div>
                <div className="features-content-box">
                  <div className="feature-icon">
                    <Icon icon="f7:shippingbox" />
                  </div>
                  <div className="content">
                    <h3>Free Local Pickup</h3>
                    <p>
                      You’re more than welcome to pick up your parts in person
                      at our Graham, NC facility!.
                    </p>
                  </div>
                </div>
                {/* <div className="features-content-box">
                  <div className="feature-icon">
                    <Icon icon="mingcute:location-line" />
                  </div>
                  <div className="content">
                    <h3>Delivery Estimates</h3>
                    <p>See the estimated delivery time based on your selected material and our current workload.</p>
                  </div>
                </div> */}
              </div>
            </Col>
            <Col lg={6}>
              <div className="get-parts-img">
                <img src={img2} className="img-fluid rounded-circle" alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="our-testimonials position-relative">
        <div className="testimonial-shape text-center">
          <img src={shape5} className="img-fluid" alt="" />
        </div>
        <Container>
          <div className="heading mb-5 text-center">
            <h2>Customer Reviews</h2>
          </div>
          <Slider {...settings}>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={user1}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Alberta Infantio</h3>
                <p>April 6, 2024</p>
                <div className="testimonial-rating">
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                </div>
              </div>
              <div className="testimonials-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam,
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={user1}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Steve James</h3>
                <p>April 6, 2024</p>
                <div className="testimonial-rating">
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                </div>
              </div>
              <div className="testimonials-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam,
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={user2}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Donald Jones</h3>
                <p>April 6, 2024</p>
                <div className="testimonial-rating">
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                </div>
              </div>
              <div className="testimonials-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam,
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={user1}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Alberta Infantio</h3>
                <p>April 6, 2024</p>
                <div className="testimonial-rating">
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                </div>
              </div>
              <div className="testimonials-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam,
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={user1}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Steve James</h3>
                <p>April 6, 2024</p>
                <div className="testimonial-rating">
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                </div>
              </div>
              <div className="testimonials-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam,
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={user2}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Donald Jones</h3>
                <p>April 6, 2024</p>
                <div className="testimonial-rating">
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                  <Icon icon="ic:round-star" />
                </div>
              </div>
              <div className="testimonials-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam,
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
          </Slider>
        </Container>
      </section>
      <CTA />
    </React.Fragment>
  );
}
