import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from "../../api/firebase";

// sign up thunk
export const createUserThunk = createAsyncThunk(
    "auth/signUp",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            return { uid: userCredential.user.uid, email: userCredential.user.email, name };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// login thunk
export const loginUserThunk = createAsyncThunk(
    "auth/logIn",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { uid: userCredential.user.uid, email: userCredential.user.email, name: userCredential.user.displayName };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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