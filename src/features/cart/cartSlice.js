import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartThunk,
  fetchCartThunk,
  decrementCartThunk,
  removeFromCartThunk,
} from "./cartThunks";

const initialState = {
  items: [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        const { productId, product } = action.payload;
        const existing = state.items.find((i) => i.id === productId);
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push({
            id: productId,
            ...product,
            quantity: 1,
          })
        }
      })
      .addCase(decrementCartThunk.fulfilled, (state, action) => {
        const { action: type, productId } = action.payload;

        if (type === "decremented") {
          const item = state.items.find((i) => i.id === productId);
          if (item) item.quantity -= 1;
        }

        if (type === "removed") {
          state.items = state.items.filter((i) => i.id !== productId);
        }
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
