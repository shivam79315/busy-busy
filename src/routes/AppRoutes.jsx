// src/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
// import CartPage from "../pages/CartPage";
// import OrdersPage from "../pages/OrdersPage";
import NotFoundPage from "../pages/NotFoundPage";

// Optional Navbar import
// import Navbar from "../components/Navbar";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      {/* <Navbar /> */}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        {/* <Route path="/myorders" element={<OrdersPage />} /> */}
        {/* Fallback for invalid URLs */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;