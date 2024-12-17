import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const username = localStorage.getItem("username");

  if (!username) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
