import { createSlice } from "@reduxjs/toolkit";
import {
  toggleWishlistThunk,
  fetchWishlistThunk,
} from "./wishlistThunks";

const initialState = {
  items: [],
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
      })
      .addCase(fetchWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // toggle
      .addCase(toggleWishlistThunk.fulfilled, (state, action) => {
        const { action: type, productId } = action.payload;

        if (type === "added") {
          state.items.push({ id: productId });
        } else {
          state.items = state.items.filter(
            (item) => item.id !== productId
          );
        }
      });
  },
});

export default wishlistSlice.reducer;