import React, { useEffect, useState } from "react";
import Header from "./layouts/Header2";
import Header_WithoutLogin from "./layouts/Header";
const Layout = ({ children }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setToken(token);
    }
  }, []);
  return (
    <>
      {token != "" && token != null && token != undefined ? (
        <Header />
      ) : (
        <Header_WithoutLogin />
      )}
      <div className="maincontent_div">{children}</div>
    </>
  );
};
export default Layout;
