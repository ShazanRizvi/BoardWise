import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  const location = useLocation();

  // Check if token exists
  if (!token) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  try {
    // Decode the token and check expiration
    const decodedToken =jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      // Token has expired
      localStorage.removeItem("access_token"); // Clear the expired token
      return (
        <Navigate to="/login" state={{ from: location }} replace />
      );
    }
  } catch (error) {
    console.error("Token validation error:", error);
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  // Token is valid, render the children
  return children;
};

export default ProtectedRoute;
