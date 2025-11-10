// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
// import CartPage from "../pages/CartPage";
import ProductsPage from "../pages/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage";

// Optional Navbar import
// import Navbar from "../components/Navbar";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/products" element={<ProductsPage />} />
        
        {/* <Route path="/cart" element={<CartPage />} /> */}
        {/* <Route path="/myorders" element={<OrdersPage />} /> */}
        {/* Fallback for invalid URLs */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;