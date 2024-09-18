import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const EmployeRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("employeeToken");
  return token ? (
    element
  ) : (
    <Navigate to="/login" /> // Redirect to login if no token is found
  );
};

export default EmployeRoute;
