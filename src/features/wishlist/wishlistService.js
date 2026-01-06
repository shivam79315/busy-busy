import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../api/firebase";

// Toggle wishlist item
export const toggleWishlistItem = async (uid, product) => {
  const ref = doc(db, "users", uid, "wishlist", product.id);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    await deleteDoc(ref);
    return { action: "removed", productId: product.id };
  } else {
    await setDoc(ref, {
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      addedAt: serverTimestamp(),
    });
    return { action: "added", productId: product.id };
  }
};

// Fetch wishlist
export const fetchWishlistItems = async (uid) => {
  const wishlistRef = collection(db, "users", uid, "wishlist");
  const snapshot = await getDocs(wishlistRef);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: data.productId,
      ...data,
      addedAt: data.addedAt ? data.addedAt.toMillis() : null,
    };
  });
};
