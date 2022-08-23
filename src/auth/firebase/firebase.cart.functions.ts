import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { iCart } from "../../components/templates/product-details/interface.productdetails";
import { status } from "../auth.interface";
import { auth, db } from "./firebase.config";

export const addCartItem = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "cart"), data);

    return { status: "success", data: docRef };
  } catch (e: any) {
    return { status: "error", data: e.message };
  }
};

export const updateCart = async (refId: string, data: any) => {
  try {
    const docRef = doc(db, "cart", refId);

    const prod = await updateDoc(docRef, data);

    return { status: "success", data: prod };
  } catch (e: any) {
    return { status: "error", data: e.message };
  }
};

export const getCart = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "cart"));

    return { status: "success", data: querySnapshot };
  } catch (err: any) {
    return { status: "error", data: err.message };
  }
};

export const getCartById = async (refId: string) => {
  try {
    const docRef = doc(db, "cart", refId);
    const docSnap = await getDoc(docRef);

    return { status: "success", data: docSnap };
  } catch (err: any) {
    return { status: "error", data: err.message };
  }
};

export const deleteCartItem = async (authId: string, id: string) => {
  try {
    // Create a reference to the cart collection
    const adminRef = collection(db, "cart");

    // Create a query against the collection.
    const q = query(adminRef, where("authId", "==", authId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docs) => {
      if (docs.data().id === id) {
        deleteDoc(doc(db, "cart", id));
      }
    });

    setTimeout(() => {
      window.location.reload();
    }, 100);
    return { message: "Cart Item Deleted!", severity: "success" };
  } catch (err: any) {
    return { message: err.message, severity: "error" };
  }
};

export const deleteCartItemForAuthPages = async (
  authId: string,
  id: string
) => {
  try {
    // Create a reference to the cart collection
    const adminRef = collection(db, "cart");

    // Create a query against the collection.
    const q = query(adminRef, where("authId", "==", authId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docs) => {
      if (docs.data().id === id) {
        deleteDoc(doc(db, "cart", id));
      }
    });

    return { message: "Cart Item Deleted!", severity: "success" };
  } catch (err: any) {
    return { message: err.message, severity: "error" };
  }
};

export const deleteCartItemsByUid = async (authId: string) => {
  try {
    // Create a reference to the cart collection
    const adminRef = collection(db, "cart");

    // Create a query against the collection.
    const q = query(adminRef, where("authId", "==", authId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docs) => {
      deleteDoc(doc(db, "cart", docs.id));
    });

    return { message: "Cart Item Deleted!", severity: "success" };
  } catch (err: any) {
    return { message: err.message, severity: "error" };
  }
};

export const processCart = async (data: iCart[]) => {
  try {
    data.map((item) => {
      item["authId"] = auth.currentUser?.uid;
      setDoc(doc(db, "cart", item.id), item, { merge: true });
      return false;
    });
    return { status: status.success };
  } catch (err) {
    return { status: status.error, data: err };
  }
};
