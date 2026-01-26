// src/features/auth/authListener.js
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../api/firebase";
import { setUser } from "./authSlice";
import { syncUserToFirestore } from "./syncUserToFirestore";
import { fetchWishlistThunk } from "../wishlist/wishlistThunks";
import { clearCart } from "../cart/cartSlice";
import { fetchCartThunk } from "../cart/cartThunks";

export const startAuthListener = (dispatch) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      
      syncUserToFirestore(user);

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          profileImg: user.photoURL,
          provider: user.providerData[0]?.providerId || "password",
          emailVerified: user.emailVerified,
          createdAt: user.metadata.creationTime,
          lastLoginAt: user.metadata.lastSignInTime,
        })
      );

      dispatch(fetchWishlistThunk(user.uid));
      dispatch(fetchCartThunk(user.uid));
    } else {
      dispatch(setUser(null));
      dispatch(clearCart());
    }
  });
};