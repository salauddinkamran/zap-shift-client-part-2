import React from "react";
import useAuth from "../hooks/useAuth/useAuth";
import { Navigate } from "react-router";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (user) {
    return children;
  }
  if (loading) {
    return <Loading></Loading>;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
