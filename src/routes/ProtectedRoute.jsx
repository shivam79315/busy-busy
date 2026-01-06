// src/routes/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/products/Loader";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  // If not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If logged in, render child routes
  return <Outlet />;
};

export default ProtectedRoute;