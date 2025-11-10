// src/features/products/productsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
