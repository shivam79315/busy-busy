import { createSlice } from "@reduxjs/toolkit";
import { createUserThunk, loginUserThunk, logoutUserThunk } from "./authThunks";

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        // sign up
        .addCase(createUserThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(createUserThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // log in
        .addCase(loginUserThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // log out
        .addCase(logoutUserThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutUserThunk.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
        })
        .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;