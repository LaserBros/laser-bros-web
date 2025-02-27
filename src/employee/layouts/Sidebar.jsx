import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import { Icon } from "@iconify/react";
import axiosEmployeeInstance from "../axios/axiosemployeeInstanse";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [permissions, setPermissions] = useState({
    dashboard_permission: 1,
    employee_permission: 0,
    quotes_permission: 0,
    rfq_permission: 0,
    orders_permission: 0,
    queue_permission: 0,
    shipping_order_permission: 0,
    complete_order_permission: 0,
    archive_permission: 0,
    customer_permission: 0,
    payment_permission: 0,
    database_permission: 0,
  });

  // Fetch permissions from API or local storage
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axiosEmployeeInstance.get("/fetchParticularEmployee");
        setPermissions(response.data.data.employee_permissions);
        localStorage.setItem("employeePermision", JSON.stringify(response.data.data.employee_permissions));
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchPermissions();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      localStorage.removeItem("employeeToken");
      localStorage.removeItem("full_name");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("email");
      localStorage.removeItem("employeePermision");
      navigate("/login");
    } catch (error) {
      localStorage.removeItem("employeeToken");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("full_name");
      localStorage.removeItem("email");
      localStorage.removeItem("employeePermision");
      navigate("/login");
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
      link: "/employee/dashboard",
      icon: "fluent:grid-16-regular",
      permissionKey: "dashboard_permission",
    },
    {
      id: "quotes",
      title: "Quotes",
      link: "/employee/quotes",
      icon: "mage:file-3",
      permissionKey: "quotes_permission",
    },
    {
      id: "rfqs",
      title: "RFQ's",
      link: "/employee/rfqs",
      icon: "hugeicons:file-edit",
      permissionKey: "rfq_permission",
    },
    {
      id: "orders",
      title: "Orders",
      link: "/employee/orders",
      icon: "mage:box-3d-check",
      permissionKey: "orders_permission",
    },
    {
      id: "queue",
      title: "Queue",
      link: "/employee/queue",
      icon: "hugeicons:queue-02",
      permissionKey: "queue_permission",
      subMenu: [
        {
          id: "archive",
          title: "Archive",
          link: "/employee/archive",
          permissionKey: "archive_permission",
          icon: "fluent:laser-tool-20-regular",
        },
      ],
    },
    {
      id: "shipping",
      title: "Shipping Orders",
      link: "/employee/shipping-orders",
      icon: "gridicons:shipping",
      permissionKey: "shipping_order_permission",
    },
    {
      id: "complete-orders",
      title: "Complete Orders",
      link: "/employee/complete-orders",
      icon: "carbon:task-complete",
      permissionKey: "complete_order_permission",
    },
    {
      id: "customers",
      title: "Customers",
      link: "/employee/customers",
      icon: "raphael:customer",
      permissionKey: "customer_permission",
    },
    {
      id: "payment-history",
      title: "Payment History",
      link: "/employee/payment-history",
      icon: "material-symbols:attach-money-rounded",
      permissionKey: "payment_permission",
    },
    {
      id: "database",
      title: "Database",
      link: "/employee/database",
      icon: "material-symbols:database",
      permissionKey: "database_permission",
    },
    {
      id: "edit-profile",
      title: "Profile Settings",
      link: "/employee/edit-profile",
      icon: "basil:user-outline",
    },
    {
      id: "logout",
      title: "Logout",
      link: "/employee/logout",
      icon: "hugeicons:logout-04",
    },
  ];

  // Filter pages based on permissions
  const filteredPages = pages.filter((page) => {
    if (page.permissionKey) {
      return permissions[page.permissionKey] === 1;
    }
    return true; // Always show pages without a permissionKey (e.g., logout)
  });

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
          <Link to="/employee/dashboard">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="sidebarouter">
          {filteredPages.map((page) =>
            page.title === "Logout" ? (
              <NavLink
                to={page.link}
                className="navitem inactive"
                onClick={handleLogout}
                key={page.id}
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
                    {page.subMenu
                      .filter((subPage) => {
                        if (subPage.permissionKey) {
                          return permissions[subPage.permissionKey] === 1;
                        }
                        return true; // Always show subpages without a permissionKey
                      })
                      .map((subPage) => (
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