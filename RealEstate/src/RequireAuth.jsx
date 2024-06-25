import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const currentUser = localStorage.getItem("token");
  return currentUser ? children : <Navigate to="/" />;
}
