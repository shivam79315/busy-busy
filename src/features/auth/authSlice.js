import { createSlice } from "@reduxjs/toolkit";
import { createUserThunk, loginUserThunk, googleLoginThunk, logoutUserThunk } from "./authThunks";

const initialState = {
    user: null,
    loading: true,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.loading = false;
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
        .addCase(googleLoginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })

        // log out
        .addCase(logoutUserThunk.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
        })
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;