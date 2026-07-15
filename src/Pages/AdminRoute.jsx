import React from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../Components/Loading.jsx";

export default function AdminRoute({ children, isAuthenticated, isCheckingAuth, userRoles }) {
  if (isCheckingAuth) {
    return (
      <Loading
        loading
        message="Checking access"
        detail="We’re confirming your admin permissions before opening this page."
      />
    );
  }

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (userRoles !== "admin") return <Navigate to="/" replace />;

  return children;
}
