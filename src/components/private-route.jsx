import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
