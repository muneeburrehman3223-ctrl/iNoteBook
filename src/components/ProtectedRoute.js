// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  // 🔒 Agar token nahi hai to login par redirect karo
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Agar token hai to element ko as JSX return karo
  return <>{element}</>;
};

export default ProtectedRoute;
