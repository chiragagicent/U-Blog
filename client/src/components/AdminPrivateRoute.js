// AdminPrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../features/auth/authSlice";

const AdminPrivateRoute = ({ children }) => {
  const role = useSelector(selectRole);

  // Check if the user role is admin
  const isAdmin = role === "admin";

  // If isAdmin is true, render the children
  // If not, navigate to the login page
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default AdminPrivateRoute;
