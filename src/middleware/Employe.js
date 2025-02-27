import React from "react";
import { Navigate } from "react-router-dom";
import { hasPermission } from "../employee/utils/permissions";

const EmployeRoute = ({ element, permissionKey }) => {
  const token = localStorage.getItem("employeeToken");
  const permissions = JSON.parse(localStorage.getItem("employeePermision")) || {};
  // console.log("permissions",permissions,permissionKey)
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If permissionKey is provided and the user doesn't have permission, redirect to a fallback page
  if (permissionKey && !hasPermission(permissions, permissionKey)) {
    return <Navigate to="/employee/not-authorized" replace />; // Redirect to "Not Authorized" page
  }

  // If the user has permission (or no permissionKey is provided), render the element
  return element;
};

export default EmployeRoute;