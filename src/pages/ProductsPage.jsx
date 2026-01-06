// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../features/products/productsThunks";
import ProductList from "../components/products/ProductList";
import Loader from "../components/products/Loader";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    dispatch(fetchProductsByCategory());
  }, [dispatch]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="flex w-full h-auto lg:flex-row gap-6 p-4">
      {/* Scrollable product list container */}
      <div className="flex-1 overflow-y-auto p-6">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
