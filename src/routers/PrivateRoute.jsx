import React from "react";
import useAuth from "../hooks/useAuth/useAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log("location", location);
  if (user) {
    return children;
  }
  if (loading) {
    return <Loading></Loading>;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
