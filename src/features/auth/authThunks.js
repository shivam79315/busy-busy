import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../api/firebase";

// sign up thunk
export const createUserThunk = createAsyncThunk(
    "auth/signUp",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// login thunk
// login with user id and password
export const loginUserThunk = createAsyncThunk(
    "auth/logIn",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// login with google mail
export const googleLoginThunk = createAsyncThunk(
    "auth/googleLogin",
    async (_, { rejectWithValue }) => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
)

// logout thunk
export const logoutUserThunk = createAsyncThunk(
    "auth/logOut",
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            return;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);