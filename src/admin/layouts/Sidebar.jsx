import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import { Icon } from "@iconify/react";
import axiosAdminInstance from "../axios/axiosadminInstanse";
const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // const response = await axiosAdminInstance.get("/logout");
      await new Promise((resolve) => setTimeout(resolve, 100));
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
      link: "/admin/dashboard",
      icon: "fluent:grid-16-regular",
    },
    {
      id: "employes",
      title: "Employees",
      link: "/admin/employes",
      icon: "solar:user-linear",
    },
    {
      id: "quotes",
      title: "Quotes",
      link: "/admin/quotes",
      icon: "mage:file-3",
    },
    {
      id: "rfqs",
      title: "RFQ's",
      link: "/admin/rfqs",
      icon: "hugeicons:file-edit",
    },
    {
      id: "orders",
      title: "Orders",
      link: "/admin/orders",
      icon: "mage:box-3d-check",
    },
    {
      id: "queue",
      title: "Queue",
      link: "/admin/queue",
      icon: "hugeicons:queue-02",
      subMenu: [
        {
          id: "archive",
          title: "Archive",
          link: "/admin/archive",
          icon: "fluent:laser-tool-20-regular",
        },
      ],
    },
    // {
    //   id: "cut",
    //   title: "Archive",
    //   link: "/admin/archive",
    //   icon: "fluent:laser-tool-20-regular",
    // },
    {
      id: "complete-orders",
      title: "Complete Orders",
      link: "/admin/complete-orders",
      icon: "carbon:task-complete",
    },
    {
      id: "payment-history",
      title: "Payment History",
      link: "/admin/payment-history",
      icon: "material-symbols:attach-money-rounded",
    },
    {
      id: "edit-profile",
      title: "Profile Settings",
      link: "/admin/edit-profile",
      icon: "basil:user-outline",
    },
    {
      id: "logout",
      title: "Logout",
      link: "/admin/logout",
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
            page.title === "Logout" ? (
              <NavLink
                to={page.link}
                className="navitem inactive"
                onClick={handleLogout}
              >
                <Icon icon={page.icon} />
                {page.title}
              </NavLink>
            ) : (
              <div key={page.id}>
                <NavLink
                  to={page.link}
                  className="navitem"
                  onClick={handleNavLinkClick}
                >
                  <Icon icon={page.icon} />
                  {page.title}
                </NavLink>
                {page.subMenu && (
                  <div className="submenu">
                    {page.subMenu.map((subPage) => (
                      <NavLink
                        key={subPage.id}
                        to={subPage.link}
                        className="navitem submenu-item"
                        onClick={handleNavLinkClick}
                      >
                        <Icon icon={subPage.icon} />
                        {subPage.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
