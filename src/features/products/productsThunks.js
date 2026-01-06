// src/features/products/productsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../api/firebase";

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const productsRef = collection(db, "products");

      const q = category
        ? query(productsRef, where("category", "==", category))
        : productsRef;

      const snapshot = await getDocs(q);

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toMillis() : null,
        };
      });

      return products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);