// src/routes/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/products/Loader";
import { toast } from "sonner";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

   useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to access this page!");
    }
  }, [loading, user]);

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