import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import shape1 from "../../assets/img/line-shape-1.svg";
import history1 from "../../assets/img/history-1.jpg";
import history2 from "../../assets/img/history-2.jpg";
import history3 from "../../assets/img/history-3.jpg";
import history4 from "../../assets/img/history-4.jpg";

import image1 from "../../assets/img/2017.jpg";
import image2 from "../../assets/img/2019.jpg";
import image3 from "../../assets/img/2020.jpg";
import image4 from "../../assets/img/2021.jpg";
import image5 from "../../assets/img/2023.jpg";
import image6 from "../../assets/img/Early2022.JPEG";
import image7 from "../../assets/img/Early2024.jpg";
import image8 from "../../assets/img/Future.jpg";
import image9 from "../../assets/img/Late2023.jpg";
import image10 from "../../assets/img/Mid2022.jpg";
import image11 from "../../assets/img/Mission2.png";

import img1 from "../../assets/img/img3.jpg";
import { Icon } from "@iconify/react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Aboutus() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <React.Fragment>
      
      <section className="banner-about banner-home">
        <Container>
          <div className="banner-content">
            <h1>
              About{" "}
              <span>
                Laser Bros.
                <img src={shape1} className="img-fluid w-100" alt="" />
              </span>
            </h1>
          </div>
        </Container>
      </section>
      <section className="our-mission">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="mission-img">
                <img src={image11} className="img-fluid mission_img_width" alt="" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mission-content">
                <div className="heading mb-3">
                  <h2>Our Mission</h2>
                </div>
                <h4>To Support the American Innovator.</h4>
                <p>
                  This is why we do what we do. The American innovator can be
                  anyone; an entrepreneur launching their product from their
                  garage, a group of dudes building a project car, or a company
                  building something that’ll get launched into space.{" "}
                </p>
                <p>
                  They’re all innovating in their own way. We want to be a means
                  to that innovation, a resource to remove limitations around
                  what can be built.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="our-history">
        <Container>
          <div className="heading mb-5 text-center">
            <h2>History</h2>
          </div>
          <Slider {...settings}>
            <div className="history-grid">
              <h3>2017</h3>
              <img src={image1} className="img-fluid" alt="" />
              <p>
                Cort starts Van Welder LLC. Running a welding and fabrication
                business, mostly doing mobile work off of my truck and out of my
                small garage behind my house. In these early years I did
                literally anything & everything.
              </p>
            </div>
            <div className="history-grid">
              <h3>2019</h3>
              <img src={image2} className="img-fluid" alt="" />
              <p>
                Van Welder moves into their first “official” space! A 40’ x 100’
                shop that looked very empty for the first year or so. But, that
                space allowed me to take on even bigger jobs that were
                impossible before.
              </p>
            </div>
            <div className="history-grid">
              <h3>2020</h3>
              <img src={image3} className="img-fluid" alt="" />
              <p>
                Long story short. A customer of mine showed me how to import a
                fiber laser. This was one of the scariest things I had done to
                date.
              </p>
            </div>
            <div className="history-grid">
              <h3>2021</h3>
              <img src={image4} className="img-fluid" alt="" />
              <p>
                Our 3kw fiber laser arrives! One sea container, a shop full of
                parts, and no instructions (insert * LOL *). It took me about
                60-hours to assemble everything, and about 1-year to completely
                dial in material settings. But we were in business!
              </p>
            </div>
            <div className="history-grid">
              <h3>Early 2022</h3>
              <img src={image6} className="img-fluid" alt="" />
              <p>
                Burnout. That’s what I was facing with Van Welder at this point.
                I was tired of welding and wanted a change. So, I decided to go
                all-in on laser cutting. No big plans, just focused on helping
                people the best I could.
              </p>
            </div>
            <div className="history-grid">
              <h3>Mid 2022</h3>
              <img src={image10} className="img-fluid" alt="" />
              <p>
                Laser Bros was formed! I quickly found a new sense of
                fulfillment in this line of work. I felt like I could help more
                people with laser cutting services compared to welding. Things
                quickly started to pick up with Laser Bros just through word of
                mouth (on social media mostly).
              </p>
            </div>
            <div className="history-grid">
              <h3>2023</h3>
              <img src={image5} className="img-fluid" alt="" />
              <p>
                The mission and the vision continue to grow and form! We’re
                growing too… Both in the number of employees and the vision for
                where we want to go. It was at this point we established our
                mission of “Supporting the American Innovator”.
              </p>
            </div>
            <div className="history-grid">
              <h3>Late 2023 </h3>
              <img src={image9} className="img-fluid" alt="" />
              <p>
                We add our second laser! Mind you we’re still in our 40’ x 100’
                shop… So, space is tight, but we’re making it work and
                maximizing the space we have! We also start implementing Lean
                manufacturing practices into our daily workflow, doing our
                morning meetings, 3S, & kaizen events… All as a team (which is
                where the magic happens).
              </p>
            </div>
            <div className="history-grid">
              <h3>Early 2024</h3>
              <img src={image7} className="img-fluid" alt="" />
              <p>
                Growth continues! We now feel the pressure of our processes and
                start the process of developing our own online quoting platform
                & internal workflow process.
              </p>
            </div>
            <div className="history-grid">
              <h3>Future</h3>
              <img src={image8} className="img-fluid" alt="" />
              <p>We have big plans… You’ll have to wait and see!</p>
            </div>
          </Slider>
        </Container>
      </section>
    
      <section className="core-values">
        <Container>
          <div className="heading mb-5 text-center">
            <h2>Core Values</h2>
          </div>
          <Row className="justify-content-center">
            <Col md={6} lg={4} className="mb-4">
              <div className="values-grid">
                <div className="single-item-thumbs">
                  <Icon icon="ion:rocket-sharp" />
                </div>
                <h3>Continuous Improvement</h3>
                <p>
                  This is a mindset, and it applies to many areas, not just work
                  and workflow. Ask yourself, “what bugs me?” This is usually
                  the best place to start. Small Improvements over a long period
                  of time add up!
                </p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="values-grid">
                <div className="single-item-thumbs">
                  <Icon icon="ph:clock-fill" />
                </div>
                <h3>Hold High Standards</h3>
                <p>
                  Nobody is going to hold you to a higher standard than
                  yourself. In business this means high quality standards, NOT
                  being wasteful with your time, always putting the customer and
                  other people first.
                </p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="values-grid">
                <div className="single-item-thumbs">
                  <Icon icon="mdi:stars" />
                </div>
                <h3>The Golden Rule</h3>
                <p>
                  Do to others as you would have them do to you. Put yourself in
                  the other person's shoes. Ask yourself, “how does this make
                  them feel?”
                </p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="values-grid">
                <div className="single-item-thumbs">
                  <Icon icon="ph:hand-fill" />
                </div>
                <h3>Lead By Example</h3>
                <p>
                  Your energy and attitude are contagious. How we lead impacts
                  the people all around us; whether you’re a shop assistant or
                  the CEO you’re leading. What you do and how you do it is
                  impacting the people around you. Don’t just talk about it, be
                  about it!
                </p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="values-grid">
                <div className="single-item-thumbs">
                  <Icon icon="lets-icons:clock-fill" />
                </div>
                <h3>Operate With Urgency</h3>
                <p>
                  Time is a valuable resource. If we don’t operate with an
                  urgency mindset what opportunities might we miss?
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
