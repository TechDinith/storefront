import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { status } from "../auth.interface";
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

export const getOrderByUid = async (id: string) => {
  try {
    // Create a reference to the cities collection
    const adminRef = collection(db, "orders");

    // Create a query against the collection.
    const q = query(adminRef, where("authId", "==", id));

    const querySnapshot = await getDocs(q);
    let user: any;
    querySnapshot.forEach((doc) => {
      user = doc.data();
    });

    return { status: status.success, data: user };
  } catch (err) {
    return { status: status.error, data: err };
  }
};

export const deleteOrder = async (id: string) => {
  try {
    deleteDoc(doc(db, "orders", id));
    return { message: "Order Deleted!", severity: "success" };
  } catch (err: any) {
    return { message: err.message, severity: "error" };
  }
};
