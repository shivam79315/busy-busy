import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, fetchCartItems, decrementCartItem, removeFromCart } from "./cartService";

export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async ({ uid, product }, { rejectWithValue }) => {
    try {
      return await addToCart(uid, product);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCartThunk = createAsyncThunk(
  "cart/fetch",
  async (uid, { rejectWithValue }) => {
    try {
      return await fetchCartItems(uid);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeFromCartThunk = createAsyncThunk(
  "cart/remove",
  async ({ uid, productId }, { rejectWithValue }) => {
    try {
      await removeFromCart(uid, productId);
      return productId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const decrementCartThunk = createAsyncThunk(
  "cart/decrement",
  async ({ uid, productId }, { rejectWithValue }) => {
    try {
      return await decrementCartItem(uid, productId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
