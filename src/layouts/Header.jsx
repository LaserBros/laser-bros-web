import React, { useState, useRef, useEffect } from "react";
import { NavDropdown, Navbar, Nav, Container, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import logo from "../assets/img/logo.svg";
import bending from "../assets/img/bending.svg";
import lasercutting from "../assets/img/lasercutting.svg";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "../components/Themetoggle";
const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const searchRef = useRef(null);

  const handleExpand = () => {
    const search = document.querySelector(".header-search");
    search.classList.toggle("search-expanded");
  };

  const handleToggle = () => setExpanded(!expanded);
  const closeNav = () => setExpanded(false);
  const handleRemove = () => {
    localStorage.removeItem("setItemelementData");
    localStorage.removeItem("setItempartsDBdata");
  };
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      const search = document.querySelector(".header-search");
      if (search.classList.contains("search-expanded")) {
        search.classList.remove("search-expanded");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="header">
      <Navbar expanded={expanded} expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} className="img-fluid " alt="" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/about-us" onClick={closeNav}>
                About Us
              </Nav.Link>
              <NavDropdown
                title={
                  <>
                    <span>Services</span> <Icon icon="tabler:chevron-down" />
                  </>
                }
                id="services-nav-dropdown"
              >
                <NavDropdown.Item
                  as={NavLink}
                  to="/laser-cutting"
                  onClick={closeNav}
                >
                  <img src={lasercutting} className="img-fluid" alt="" /> Laser
                  Cutting
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/bending" onClick={closeNav}>
                  <img src={bending} className="img-fluid" alt="" /> Bending
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <>
                    <span>Resources</span> <Icon icon="tabler:chevron-down" />
                  </>
                }
                id="resources-nav-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="/resources/laser-cutting">
                  <Icon icon="material-symbols:library-books-outline-rounded" />
                  Guidelines
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/resources/steel">
                  <Icon icon="heroicons:squares-2x2" />
                  Materials
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/resources/faq">
                  <Icon icon="ph:question" />
                  FAQ
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/resources/shipping">
                  <Icon icon="la:shipping-fast" />
                  Shipping
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto align-items-lg-center right-menu">
              <ThemeToggle />
              {/* <Nav.Link
                as={Link}
                className="ps-4 pe-2 header-search"
                ref={searchRef}
              >
                {" "}
                <Icon
                  icon="flowbite:search-solid"
                  onClick={handleExpand}
                />{" "}
                <Form.Control type="text" placeholder="Search" />
              </Nav.Link> */}
              <Nav.Link as={Link} to="/login" className="pe-4">
                {" "}
                <Icon icon="mingcute:user-4-fill" />
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/quotes/quotes-detail"
                onClick={handleRemove}
                className="btn btn-primary btn-get-quote"
              >
                {" "}
                <Icon icon="icon-park-outline:add" /> Get a Quote
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
