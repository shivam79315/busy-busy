// src/routes/AppRoutes.jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Pages
const HomePage = lazy(() => import("../pages/HomePage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));

import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/products/Loader";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <ProtectedRoute />
            </Suspense>
          }
        >
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* Fallback for invalid URLs */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
