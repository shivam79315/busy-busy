// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import searchReducer from '../features/search/searchSlice';
import cartReducer from '../features/cart/cartSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        search: searchReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
    },
});

export default store;