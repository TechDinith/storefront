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

export const addOrder = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), data);

    return { status: "success", data: docRef };
  } catch (e: any) {
    return { status: "error", data: e.message };
  }
};

export const updateOrder = async (refId: string, data: any) => {
  try {
    const docRef = doc(db, "orders", refId);

    const prod = await updateDoc(docRef, data);

    return { status: "success", data: prod };
  } catch (e: any) {
    return { status: "error", data: e.message };
  }
};

export const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));

    return { status: "success", data: querySnapshot };
  } catch (err: any) {
    return { status: "error", data: err.message };
  }
};

//   export const getProductById = async (refId: string) => {
//     try {
//       const docRef = doc(db, "products", refId);
//       const docSnap = await getDoc(docRef);

//       return { status: "success", data: docSnap };
//     } catch (err: any) {
//       return { status: "error", data: err.message };
//     }
//   };

export const deleteOrder = async (id: string) => {
  try {
    deleteDoc(doc(db, "orders", id));
    return { message: "Order Deleted!", severity: "success" };
  } catch (err: any) {
    return { message: err.message, severity: "error" };
  }
};
