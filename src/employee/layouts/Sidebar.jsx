import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import { Icon } from "@iconify/react";
import axiosInstance from "../axios/axiosInstanse";
const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/logout");
      localStorage.removeItem("employeeToken");
      localStorage.removeItem("full_name");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("email");
      navigate("/login");
    } catch (error) {
      // console.log(error);
      localStorage.removeItem("employeeToken");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("full_name");
      localStorage.removeItem("email");
      navigate("/login");
      console.log("errr", error);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  // const location = useLocation();
  useEffect(() => {
    document.body.classList.toggle("no-scroll", sidebarOpen);
  }, [sidebarOpen]);

  const handleNavLinkClick = () => {
    setSidebarOpen(false);
  };

  const pages = [
    {
      id: "Dashboard",
      title: "Dashboard",
      link: "/dashboard",
      icon: "fluent:grid-16-regular",
    },
    {
      id: "quotes",
      title: "Quotes",
      link: "/quotes",
      icon: "mage:file-3",
    },
    {
      id: "rfqs",
      title: "RFQ's",
      link: "/rfqs",
      icon: "hugeicons:file-edit",
    },
    {
      id: "orders",
      title: "Orders",
      link: "/orders",
      icon: "mage:box-3d-check",
    },
    {
      id: "queue",
      title: "Queue",
      link: "/queue",
      icon: "hugeicons:queue-02",
    },
    {
      id: "cut",
      title: "Cut",
      link: "/cut",
      icon: "fluent:laser-tool-20-regular",
    },
    {
      id: "payment-history",
      title: "Payment History",
      link: "/payment-history",
      icon: "material-symbols:attach-money-rounded",
    },
    {
      id: "edit-profile",
      title: "Profile Settings",
      link: "/edit-profile",
      icon: "basil:user-outline",
    },
    {
      id: "logout",
      title: "Logout",
      link: "/",
      icon: "hugeicons:logout-04",
    },
  ];
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="btnopen"
        style={{ display: "none" }}
      >
        <Icon icon="solar:hamburger-menu-broken"></Icon>
      </button>
      <button
        className={
          sidebarOpen ? "btnclose sidebarbg-open" : "btnclose sidebarbg-closed"
        }
        style={{ display: "none" }}
        onClick={toggleSidebar}
      ></button>

      <div
        className={
          sidebarOpen ? "sidebar sidebar-open" : "sidebar sidebar-closed"
        }
      >
        <div className="sidebarlogo_div">
          <Link to="/Dashboard">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="sidebarouter">
          {pages.map((page) =>
            page.title == "Logout" ? (
              <NavLink
                key={page.id}
                // to={page.link}
                className="navitem"
                onClick={handleLogout} // Pass the event and page info
                // Optionally, manage active state if needed
                // isActive={() => location.pathname.startsWith(page.link)}
              >
                <Icon icon={page.icon} />
                {page.title}
              </NavLink>
            ) : (
              <>
                <NavLink
                  key={page.id}
                  to={page.link}
                  className="navitem"
                  onClick={handleNavLinkClick}
                  // isActive={() => {
                  //   return location.pathname.startsWith(page.link);
                  // }}
                >
                  <Icon icon={page.icon} />
                  {page.title}
                </NavLink>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
