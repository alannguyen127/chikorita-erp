import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import LoadingScreen from "../components/LoadingScreen";
import { useAuth } from "../context/AuthContext";

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  // if (!isInitialized) {
  //   return <LoadingScreen />;
  // }

  // if (!currentUser) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return children;
}

export default AuthRequire;
