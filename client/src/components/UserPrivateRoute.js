// UserPrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../features/auth/authSlice";

const UserPrivateRoute = ({ children }) => {
  const role = useSelector(selectRole);

  // Check if the user role is user
  const isUser = role === "user";

  // If isUser is true, render the children
  // If not, navigate to the login page
  return isUser ? children : <Navigate to="/login" replace />;
};

export default UserPrivateRoute;
