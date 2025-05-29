import React from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="maincontent_div">{children}</div>
      <Footer />
    </>
  );
};
export default Layout;
