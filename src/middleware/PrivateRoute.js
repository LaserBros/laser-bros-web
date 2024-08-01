import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("authToken"); // Replace with your method of getting the token
  return token ? (
    element
  ) : (
    <Navigate to="/login" /> // Redirect to login if no token is found
  );
};

export default PrivateRoute;
