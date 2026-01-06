import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  toggleWishlistItem,
  fetchWishlistItems,
} from "./wishlistService";

// Toggle
export const toggleWishlistThunk = createAsyncThunk(
  "wishlist/toggle",
  async ({ uid, product }, { rejectWithValue }) => {
    try {
      return await toggleWishlistItem(uid, product);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch
export const fetchWishlistThunk = createAsyncThunk(
  "wishlist/fetch",
  async (uid, { rejectWithValue }) => {
    try {
      const items = await fetchWishlistItems(uid);
      console.log(items)
      return items;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);