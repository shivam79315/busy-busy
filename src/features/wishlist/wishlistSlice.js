import { createSlice } from "@reduxjs/toolkit";
import {
  toggleWishlistThunk,
  fetchWishlistThunk,
} from "./wishlistThunks";

const initialState = {
  items: [],
  ids: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchWishlistThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.ids = action.payload.map((item) => item.id);
      })
      .addCase(fetchWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // toggle
      .addCase(toggleWishlistThunk.fulfilled, (state, action) => {
        const { action: type, productId } = action.payload;

        if (type === "added") {
          if (!state.ids.includes(productId)) {
            state.items.push({ id: productId });
            state.ids.push(productId);
          }
        } else {
          state.items = state.items.filter(
            (item) => item.id !== productId
          );
          state.ids = state.ids.filter(
            (id) => id !== productId
          );
        }
      });
  },
});

export default wishlistSlice.reducer;