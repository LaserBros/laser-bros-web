import React, { useState } from "react";
import { Accordion, Form } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import icon1 from "../assets/img/sidebar-icon-1.svg";
import icon1_1 from "../assets/img/sidebar-icon-1-1.svg";
import icon2 from "../assets/img/sidebar-icon-2.svg";
import icon2_1 from "../assets/img/sidebar-icon-2-1.svg";
import icon3 from "../assets/img/sidebar-icon-3.svg";
import icon3_1 from "../assets/img/sidebar-icon-3-1.svg";
import icon4 from "../assets/img/sidebar-icon-4.svg";
import icon4_1 from "../assets/img/sidebar-icon-4-1.svg";
import icon5 from "../assets/img/sidebar-icon-5.svg";
import icon5_1 from "../assets/img/sidebar-icon-5-1.svg";
const Sidebar = () => {
  const [openItems, setOpenItems] = useState({
    item1: true,
    item2: true,
    item3: true,
  });

  const toggleItem = (item) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };
  return (
    <>
      <Form.Group className="mb-3 form-group resources-search-field">
        <div className=" position-relative">
          <Icon icon="flowbite:search-solid"/>
          <Form.Control type="text" placeholder="Search" />
        </div>
      </Form.Group>
      <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={() => toggleItem('item1')}>
            <span className="accordion-icon"><Icon icon="material-symbols:library-books-outline-rounded" /></span> Guidelines
          </Accordion.Header>
          <Accordion.Body>
            <NavLink to="/resources/laser-cutting">
              <img src={icon1_1} className="img-fluid defaulticon" alt="" />
              <img src={icon1} className="img-fluid d-none activeicon" alt="" />
              Laser Cutting</NavLink>
            <NavLink to="/resources/bending">
              <img src={icon2_1} className="img-fluid defaulticon" alt="" />
              <img src={icon2} className="img-fluid d-none activeicon" alt="" />
              Bending</NavLink>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={() => toggleItem('item2')}>
            <span className="accordion-icon"><Icon icon="heroicons:squares-2x2" /></span> Materials
          </Accordion.Header>
          <Accordion.Body>
            <NavLink to="/resources/steel">
              {/* <img src={icon3_1} className="img-fluid defaulticon" alt="" />
              <img src={icon3} className="img-fluid d-none activeicon" alt="" /> */}
                 <span className="maticon bgdanger"></span>
              Steel</NavLink>
            <NavLink to="/resources/aluminum">
              {/* <img src={icon4_1} className="img-fluid defaulticon" alt="" />
              <img src={icon4} className="img-fluid d-none activeicon" alt="" /> */}
              <span className="maticon bgprimary"></span>
              Aluminum</NavLink>
            <NavLink to="/resources/stainless-steel">  
            {/* <img src={icon3_1} className="img-fluid defaulticon" alt="" />
              <img src={icon3} className="img-fluid d-none activeicon" alt="" /> */}
              <span className="maticon bgsuccess"></span>
              Stainless Steel</NavLink>
            <NavLink to="/resources/brass">  
            {/* <img src={icon5_1} className="img-fluid defaulticon" alt="" />
              <img src={icon5} className="img-fluid d-none activeicon" alt="" /> */}
                 <span className="maticon bgyellow"></span>
              Brass</NavLink>
            <NavLink to="/resources/specialty">  
            {/* <img src={icon4_1} className="img-fluid defaulticon" alt="" />
              <img src={icon4} className="img-fluid d-none activeicon" alt="" /> */}
               <span className="maticon bgpurple"></span>
              Specialty</NavLink>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={() => toggleItem('item3')}>
            <span className="accordion-icon"><Icon icon="pepicons-pop:info" /></span>  General
          </Accordion.Header>
          <Accordion.Body>
            <NavLink to="/resources/faq"><Icon icon="ph:question" />FAQ</NavLink>
            <NavLink to="/resources/shipping"><Icon icon="la:shipping-fast" />Shipping</NavLink>
            <NavLink to="/resources/payment-terms"><Icon icon="fluent:payment-24-regular" />Payment Terms</NavLink>
            <NavLink to="/resources/privacy-policy"><Icon icon="iconoir:privacy-policy" />Privacy Policy</NavLink>
            <NavLink to="/resources/refund-policy"><Icon icon="tabler:receipt-refund" />Refund Policy</NavLink>
            <NavLink to="/resources/terms-service"><Icon icon="akar-icons:file" />Terms of Service</NavLink>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
export default Sidebar;