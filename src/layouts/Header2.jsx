import React, { useContext, useEffect, useState } from "react";
import { NavDropdown, Navbar, Nav, Container, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";
import logo from "../assets/img/logo.svg";
import User from "../assets/img/user-3.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/Themetoggle";
import ChangePassword from "../components/Changepassword";
import axiosInstance from "../axios/axiosInstance";
import { UserContext } from "../localstorage/UserProfileContext";

const Header = () => {
  const { name, image } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const handleToggle = () => setExpanded(!expanded);
  const closeNav = () => setExpanded(false);
  const [modalShow, setModalShow] = useState(false);
  // const [name, setName] = useState("");
  // useEffect(() => {
  //   var name = localStorage.getItem("full_name");
  //   setName(name);
  // }, []);
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/logout");
      localStorage.removeItem("authToken");
      localStorage.removeItem("full_name");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("email");
      navigate("/login");
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("full_name");
      localStorage.removeItem("email");
      navigate("/login");
      console.log("errr", error);
    }
  };
  // const handleShow = () => setModalShow(true);
  const handleShow = () => {
    setModalShow(true);
    setExpanded(false);
  };
  const handleClose = () => setModalShow(false);
  return (
    <>
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
                <Nav.Link as={NavLink} to="/quotes" onClick={closeNav}>
                  Quotes
                </Nav.Link>
                <Nav.Link as={NavLink} to="/rfqs" onClick={closeNav}>
                  RFQ’s
                </Nav.Link>
                <Nav.Link as={NavLink} to="/orders" onClick={closeNav}>
                  Orders
                </Nav.Link>
              </Nav>
              <Nav className="ms-auto align-items-lg-center right-menu">
                <ThemeToggle />
                <Nav.Link as={Link} className="px-3">
                  {" "}
                  <Icon icon="material-symbols:help-outline" /> Help
                </Nav.Link>
                {/* <Nav.Link as={Link} onClick={closeNav} className="btn btn-outline-primary min-width-148 d-inline-flex align-items-center justify-content-center">Login</Nav.Link>
                                <Nav.Link as={Link} onClick={closeNav} className="btn btn-primary min-width-148 d-inline-flex align-items-center justify-content-center ms-0 ms-lg-2">Sign Up</Nav.Link> */}
                <NavDropdown
                  title={
                    <span>
                      <Image
                        src={image}
                        roundedCircle
                        style={{
                          width: "36px",
                          height: "36px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      {name}
                      <Icon icon="ion:chevron-down" />
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to="/my-profile"
                    onClick={closeNav}
                  >
                    <Icon icon="mi:user" /> My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleShow}>
                    <Icon icon="solar:lock-outline" /> Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/my-addresses"
                    onClick={closeNav}
                  >
                    <Icon icon="akar-icons:location" /> My Addresses
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/payment-cards"
                    onClick={closeNav}
                  >
                    <Icon icon="solar:card-broken" /> Payment Cards
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    // to="/login"
                    onClick={handleLogout}
                  >
                    <Icon icon="mage:logout" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <ChangePassword
        show={modalShow}
        handleClose={handleClose}
        title="Change Password"
      />
    </>
  );
};
export default Header;
