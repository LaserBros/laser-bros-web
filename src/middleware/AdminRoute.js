import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("adminToken");
  return token ? (
    element
  ) : (
    <Navigate to="/login" /> // Redirect to login if no token is found
  );
};

export default AdminRoute;
