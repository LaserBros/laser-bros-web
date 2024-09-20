import React, { useContext } from "react";
import { NavDropdown, Breadcrumb, Row, Col, Image } from "react-bootstrap";
import Avatar from "../assets/img/Avatar.jpg";
import ThemeToggle from "../../components/Themetoggle";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axiosAdminInstance from "../axios/axiosadminInstanse";
import { UserContext } from "../../localstorage/UserProfileContext";
const Header = ({ title }) => {
  const navigate = useNavigate();
  const { name, image } = useContext(UserContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosAdminInstance.get("/logout");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("full_name");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("email");
      navigate("/login");
    } catch (error) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("full_name");
      localStorage.removeItem("email");
      navigate("/login");
      console.log("errr", error);
    }
  };
  return (
    <header className="header">
      <Row>
        <Col sm={6} xs={3}>
          <div className="mainbreadcrumb d-none d-md-block">
            <Breadcrumb>
              <Breadcrumb.Item href="#">Pages</Breadcrumb.Item>
              <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <h1>{title}</h1>
          </div>
        </Col>
        <Col sm={6} xs={9} className="text-end">
          <div
            className="headerright"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <ThemeToggle />
            <NavDropdown
              title={
                <span>
                  <Image
                    src={image}
                    roundedCircle
                    style={{
                      width: "41px",
                      height: "41px",
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
              <NavDropdown.Item as={NavLink} to="/admin/edit-profile">
                <Icon icon="mi:user" />
                Profile Settings
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/login" onClick={handleLogout}>
                <Icon icon="mage:logout" /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
