import React, { useEffect, useState } from "react";
import {
  Accordion,
  Row,
  Col,
  Container,
  Image,
  Button,
  Modal,
} from "react-bootstrap";
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
import { generalFAQ, OfferData } from "../../api/api";


// import eric from "../../assets/img/eric.png";
// import kyle_mac from "../../assets/img/kyle_mac.png";
// import stevan from "../../assets/img/stevan.png";
// import kyle from "../../assets/img/kyle.png";
// import tim from "../../assets/img/tim.png";
// import dustin_doss from "../../assets/img/dustin_doss.png";
// import dustin from "../../assets/img/dustin.png";
// import paul from "../../assets/img/paul.png";
// import kristi from "../../assets/img/kristi.png";
// import dan from "../../assets/img/dan.png";
// import kyle_mac_dan from "../../assets/img/kyle_mac_dan.png";
// import bake from "../../assets/img/bake.png";
import quote from "../../assets/img/quote.svg";
import serviceimg1 from "../../assets/img/services-img-1.webp";
import serviceimg2 from "../../assets/img/services-img-2.webp";
import eric from "../../assets/img/eric.png";
import kyle_mac from "../../assets/img/kyle_mac.png";
import stevan from "../../assets/img/stevan.png";
import kyle from "../../assets/img/kyle.png";
import tim from "../../assets/img/tim.png";
import dustin_doss from "../../assets/img/dustin_doss.png";
import dustin from "../../assets/img/dustin.png";
import paul from "../../assets/img/paul.png";
import kristi from "../../assets/img/kristi.png";
import Slider from "react-slick";

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [modalData, setModalData] = useState();
  const [faq, setFaq] = useState();
  const getFaq = async () => {
    const res = await generalFAQ();
    const filteredFaqs = res.data.filter(item => item.show_check === 1);
    setFaq(filteredFaqs);
  };
  const getBanner = async () => {
    try {
      const res = await OfferData("6811bf514569f2bcd19568e6");
      if (res.data) {
        if (res.data.check == 1) {
          setShow(true);
          setModalData(res.data);
        }
      }
    } catch (error) {
      
    }
 
  };
  useEffect(() => {
    getBanner();
    getFaq();
  }, []);

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

//   const reviewsData = [
//     {
//       name: "Jason Gill",
//       image: reviewuser2,
//       description: `Laser Bros has been transformative for my small automotive manufacturing business! The parts that I have produced by Cort and the team exceed my expectations every time. They go the extra mile to make sure that my parts look great, even with bends - so I can ship mill finish parts that require no additional coating or finishing to be customer ready. I can get prototypes turned around in just a couple days, and production runs that are ready to pack and ship - with competitive prices and American-made quality. I could not be happier with the results from Laser Bros and I recommend them to everyone in my industry!`,
//       partImage: reviewimg3,
//       material: {
//         name: "0.080 5052 Grade Aluminium",
//         link: "/resources/aluminum",
//         className: "aluminiumbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//         { name: "CNC Bending", link: "/bending" },
//         { name: "Metal Finishing", link: "/metalfinishing" },
//       ],
//     },
//     {
//       name: "Steven Carlin",
//       image: reviewimg1,
//       description: `Quick turnaround and excellent customer service. If you need the right parts made fast, these are the guys to use.`,
//       partImage: reviewimg2,
//       material: {
//         name: "12 gauge (0.100) HRPO Steel",
//         link: "/resources/steel",
//         className: "steelbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//         { name: "Metal Finishing", link: "/metalfinishing" },
//       ],
//     },
//     {
//       name: "Kyle Malcolm",
//       image: kyle_mac_dan,
//       description: `Laser Bros is all around great to work with. They are able to produce my orders in just a few days and their prices are very reasonable even when I'm placing relatively small orders. Cort is always very responsive and willing to work with me to make even the smallest adjustments so I get exactly the product I am looking for. I would definitely recommend Laser Bros to anyone who needs laser cutting services.`,
//       partImage: reviewimg4,
//       material: {
//         name: "0.093 Brass-260",
//         link: "/resources/brass",
//         className: "brassbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//       ],
//     },

//     {
//       name: "Dan Schaner",
//       image: dan,
//       description: `I've worked with several laser cutting shops over the years, and Laser Bros has consistently outperformed them all with customer service, cut quality, and overall part finish, all at a competitive price. And they just keep getting better at it every time! They really live up to their slogan of "supporting the American innovator", whether it's for a huge order or a custom one-off part.

// On top of being a really top-notch vendor to work with, they are an inspiration with their focus on quality, continuous improvement, and service. But don't take my word for it, go check them out on social media and see for yourself!`,
//       partImage: reviewimg3,
//       material: {
//         name: "0.080 5052 Grade Aluminium",
//         link: "/resources/aluminum",
//         className: "aluminiumbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//         { name: "CNC Bending", link: "/bending" },
//         { name: "Metal Finishing", link: "/metalfinishing" },
//       ],
//     },
//     {
//       name: "Blake Biskner",
//       image: bake,
//       description: `When I messaged LaserBros I was in a real bind. I had shipped sheet metal parts and many had been damaged. The parts were now across the country, broken, and needed for a project. I needed help and LaserBros was there. That same day they worked with me looking for the right material for my project, reviewing my design, and by the end of the day they were already getting ready for a production run. Not 24 hours later my new parts were cut, bent and overnighted. I cannot say enough about LaserBros helpfulness and expeditiousness.`,
//       partImage: reviewimg2,
//       material: {
//         name: "12 gauge (0.100) HRPO Steel",
//         link: "/resources/steel",
//         className: "steelbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//         { name: "Metal Finishing", link: "/metalfinishing" },
//       ],
//     },
//     {
//       name: "Kyle Mahon",
//       image: kyle_mac_dan,
//       description: `Fantastic company to do business with! Cort responds to any inquiry faster than anyone I have ever done business with, and is always willing to offer advise on how to improve a file, or will recommend small changes to make the parts we order easier to fabricate. If you've used an online service before to have laser cutting, you should give laser bros the opportunity to win your business. Just one order with them, and you will never want to use anyone else! Thanks for everything Cort!`,
//       partImage: reviewimg4,
//       material: {
//         name: "0.093 Brass-260",
//         link: "/resources/brass",
//         className: "brassbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//       ],
//     },




//     {
//       name: "Eric J.",
//       image: eric,
//       description: `The work that Cort and his crew put out is second to none. The attention to detail and excellent customer service will keep me coming back. I drive over 3 hours just to get parts because they are that good.`,
//       partImage: reviewimg3,
//       material: {
//         name: "0.080 5052 Grade Aluminium",
//         link: "/resources/aluminum",
//         className: "aluminiumbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//         { name: "CNC Bending", link: "/bending" },
//         { name: "Metal Finishing", link: "/metalfinishing" },
//       ],
//     },
//     {
//       name: "Kristi Moore",
//       image: kristi,
//       description: `We had an idea and reached out to Cort. Not only was he able to make our idea reality, his customer service, knowledge and willingness to help, allowed us to create a superior product.`,
//       partImage: reviewimg2,
//       material: {
//         name: "12 gauge (0.100) HRPO Steel",
//         link: "/resources/steel",
//         className: "steelbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//         { name: "Metal Finishing", link: "/metalfinishing" },
//       ],
//     },
//     {
//       name: "Tim Meschke",
//       image: tim,
//       description: `Laser Bros does fantastic work. They’re parts are high quality, well priced, and have quick turnaround. Highly recommended for laser cutting service.`,
//       partImage: reviewimg4,
//       material: {
//         name: "0.093 Brass-260",
//         link: "/resources/brass",
//         className: "brassbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//       ],
//     },


//     {
//       name: "Paul Larosa",
//       image: paul,
//       description: `Great company to work with ! Answers your question very quickly and will work with you on making your design and reality. 10/10 recommend them to everyone`,
//       partImage: reviewimg3,
//       material: {
//         name: "0.080 5052 Grade Aluminium",
//         link: "/resources/aluminum",
//         className: "aluminiumbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//         { name: "CNC Bending", link: "/bending" },
//         { name: "Metal Finishing", link: "/metalfinishing" },
//       ],
//     },
//     {
//       name: "Dustin H",
//       image: dustin,
//       description: `Great customer service and fast turn around. Could not ask for more! A++`,
//       partImage: reviewimg2,
//       material: {
//         name: "12 gauge (0.100) HRPO Steel",
//         link: "/resources/steel",
//         className: "steelbadge",
//       },
//       services: [
//         { name: "Laser Cutting", link: "/laser-cutting" },
//         { name: "Metal Finishing", link: "/metalfinishing" },
//       ],
//     },

//     // Add more reviews here if needed
//   ];
  
    const [visibleReviews, setVisibleReviews] = useState(3);
  
    const handleSeeMore = () => {
      setVisibleReviews((prev) => prev + 3); // show 2 more on each click
    };

  return (
    <React.Fragment>
      <section className="banner-home">
        <Container>
          <div className="banner-content">
            <h1>Laser Cut Parts Delivered To Your Door.</h1>
            <p>Upload. Configure. Checkout. Done.</p>
            <Image src={bannerimg} className="img-fluid" alt="" />
            <Button
              className="mt-3 d-inline-flex align-items-center gap-2"
              as={Link}
              to="/quotes/quotes-detail"
            >
              Get Started Now! Upload Your DXF{" "}
              <Icon
                icon="tabler:upload"
                width={22}
                height={22}
                className="ms-0 me-0"
              />
            </Button>
            <p className="bannersubpara">You'll need to login to upload</p>
            <h4>
              Most Orders Ship in as Little as <b>3-days!</b>
            </h4>
            <h4>
              <b>Multiple Shipping Options</b> to Meet Your Deadlines.
            </h4>
            <h4>
              <b>Instant Online Quotes</b> through our secure app.
            </h4>
          </div>
        </Container>
      </section>
      <section className="homereviews our-testimonials position-relative">
        <div className="heading mb-5 text-center">
          <h2>What Our Customers Have To Say</h2> 
        </div>
        <Container>
        <Container>
          <div className="heading mb-5 text-center">
            {/* <h2>Customer Reviews</h2> */}
          </div>
          <Slider {...settings}>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={kristi}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Kristi Moore</h3>
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
                  We had an idea and reached out to Cort. Not only was he able
                  to make our idea reality, his customer service, knowledge and
                  willingness to help, allowed us to create a superior product.
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={paul}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Paul Larosa</h3>
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
                  Great company to work with ! Answers your question very
                  quickly and will work with you on making your design and
                  reality. 10/10 recommend them to everyone
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={dustin}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Dustin H</h3>
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
                  Great customer service and fast turn around. Could not ask for
                  more! A++
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={dustin_doss}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Dustin Doss</h3>
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
                  Nice setup here! Great products, customer service and
                  competitive prices! Lots of metal in stock
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={tim}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Tim Meschke</h3>
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
                  Laser Bros does fantastic work. They’re parts are high
                  quality, well priced, and have quick turnaround. Highly
                  recommended for laser cutting service.
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={kyle}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Kyle Mahon</h3>
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
                  Fantastic company to do business with! Cort responds to any
                  inquiry faster than anyone I have ever done business with, and
                  is always willing to offer advise on how to improve a file, or
                  will recommend small changes to make the parts we order easier
                  to fabricate. If you've used an online service before to have
                  laser cutting, you should give laser bros the opportunity to
                  win your business. Just one order with them, and you will
                  never want to use anyone else! Thanks for everything Cort!
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={stevan}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Steven Carlin</h3>
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
                  Quick turnaround and excellent customer service. If you need
                  the right parts made fast, these are the guys to use.
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={kyle_mac}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Kyle Malcolm</h3>
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
                  Laser Bros is all around great to work with. They are able to
                  produce my orders in just a few days and their prices are very
                  reasonable even when I'm placing relatively small orders. Cort
                  is always very responsive and willing to work with me to make
                  even the smallest adjustments so I get exactly the product I
                  am looking for. I would definitely recommend Laser Bros to
                  anyone who needs laser cutting services.
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
            <div className="testimonials-grid">
              <div className="userinfo">
                <img
                  src={eric}
                  className="rounded-circle img-fluid mx-auto"
                  alt=""
                />
                <h3>Eric J.</h3>
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
                  The work that Cort and his crew put out is second to none. The
                  attention to detail and excellent customer service will keep
                  me coming back. I drive over 3 hours just to get parts because
                  they are that good.
                </p>
              </div>
              <span className="testimonial-quote">
                <img src={quote} className="img-fluid mx-auto" alt="" />
              </span>
            </div>
          </Slider>
        </Container>
        </Container>
      </section>
      <BreakDownSteps />
      {faq?.length > 0 && 
      <section className="faq-home">
        <Container>
          <div className="heading mb-4 text-center">
            <h2>FAQ</h2>
          </div>
          <h3 className="faqsubhead">Most Asked Questions</h3>
          <Accordion>
            {faq?.map((faqData, index) => (
              <>
                
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>{faqData.question}</Accordion.Header>
                    <Accordion.Body>
                      {faqData.answer}
                    </Accordion.Body>
                  </Accordion.Item>
              
              </>
            ))}
          </Accordion>
        </Container>
      </section>
      }
      <section className="american-manufacturing">
        <Container>
          <div class="heading mb-4 text-center">
            <h2>We Believe in American Manufacturing!</h2>
          </div>
          <div className=" text-center ">
            <Image src={american} className="img-fluid mx-auto" alt="" />
            <h4 className="mt-3">
              Our Mission is to Support the American Innovator.
            </h4>
            <Button
              className="mt-3 d-inline-flex align-items-center"
              as={Link}
              to="/about-us"
            >
              Learn More About Us
            </Button>
          </div>
        </Container>
      </section>
      {modalData && (
        <Modal
          centered
          show={show}
          onHide={handleClose}
          className="promotion_modal modal-custom"
        >
          <Button
            className="btn-close z-1"
            variant={null}
            onClick={handleClose}
          ></Button>
          <Modal.Body>
            <h4>{modalData.offer_description}</h4>
            <h4>{modalData.offer_text}</h4>
            <Button
              className="mt-3 d-inline-flex align-items-center gap-2"
              as={Link}
              to={modalData.button_link}
            >
              {modalData.button_text}{" "}
              <Icon
                icon="tabler:upload"
                width={22}
                height={22}
                className="ms-0 me-0"
              />
            </Button>
            <p>{modalData.button_description}</p>
          </Modal.Body>
        </Modal>
      )}
    </React.Fragment>
  );
}
