import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

export const addProduct = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "products"), data);

    return { status: "success", data: docRef };
  } catch (e: any) {
    return { status: "error", data: e.message };
  }
};

export const updateProduct = async (refId: string, data: any) => {
  try {
    const docRef = doc(db, "products", refId);

    const prod = await updateDoc(docRef, data);

    return { status: "success", data: prod };
  } catch (e: any) {
    return { status: "error", data: e.message };
  }
};

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    return { status: "success", data: querySnapshot };
  } catch (err: any) {
    return { status: "error", data: err.message };
  }
};

export const getProductById = async (refId: string) => {
  try {
    const docRef = doc(db, "products", refId);
    const docSnap = await getDoc(docRef);

    return { status: "success", data: docSnap };
  } catch (err: any) {
    return { status: "error", data: err.message };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    deleteDoc(doc(db, "products", id));
    return { message: "Product Deleted!", severity: "success" };
  } catch (err: any) {
    return { message: err.message, severity: "error" };
  }
};
