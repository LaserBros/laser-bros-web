import React from "react";
import Header from "./layouts/Header";
import Sidebar from "../employee/layouts/Sidebar";
import { Breadcrumb } from "react-bootstrap";
const Layout = ({ children, title }) => {
  return (
    <>
      <div className="wrapper">
        <Header title={title} />
        <Sidebar />
        {/* <div className='mb-3 maincontent_div'> */}
        <div className="maincontent_div">
          <div className="mainbreadcrumb d-block d-md-none mb-3">
            <Breadcrumb>
              <Breadcrumb.Item href="#">Pages</Breadcrumb.Item>
              <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <h1>{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
