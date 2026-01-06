import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../api/firebase";

export const addToCart = async (uid, product) => {
  const cartRef = doc(db, "users", uid, "cart", product.id);
  const snap = await getDoc(cartRef);

  if (snap.exists()) {
    await updateDoc(cartRef, {
      quantity: snap.data().quantity + 1,
    });
    return { action: "incremented", productId: product.id };
  } else {
    await setDoc(cartRef, {
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      inStock: product.inStock,
      quantity: 1,
      addedAt: serverTimestamp(),
    });
    return { action: "added", productId: product.id };
  }
};

export const fetchCartItems = async (uid) => {
  const cartRef = collection(db, "users", uid, "cart");
  const snapshot = await getDocs(cartRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const decrementCartItem = async (uid, productId) => {
  const cartRef = doc(db, "users", uid, "cart", productId);
  const snap = await getDoc(cartRef);

  if (!snap.exists()) return;

  const currentQty = snap.data().quantity;

  if (currentQty > 1) {
    await updateDoc(cartRef, {
      quantity: currentQty - 1,
    });
    return { action: "decremented", productId };
  } else {
    await deleteDoc(cartRef);
    return { action: "removed", productId };
  }
};

export const removeFromCart = async (uid, productId) => {
  const ref = doc(db, "users", uid, "cart", productId);
  await deleteDoc(ref);
};