import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { Order, OrderStatus } from "@/types/order";

function isFirebaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
}

function makeOrderNumber() {
  return "ORD-" + Date.now().toString(36).toUpperCase();
}

export async function createOrder(
  data: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">
): Promise<Order> {
  const now = new Date().toISOString();
  const order: Order = {
    ...data,
    id: "",
    orderNumber: makeOrderNumber(),
    createdAt: now,
    updatedAt: now,
  };

  if (!isFirebaseConfigured()) {
    order.id = "demo-" + Math.random().toString(36).slice(2, 9);
    return order;
  }

  const ref = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  order.id = ref.id;
  return order;
}

export async function fetchOrdersByUser(userId: string): Promise<Order[]> {
  if (!isFirebaseConfigured()) return [];
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }));
  } catch {
    return [];
  }
}

export async function fetchOrderById(id: string): Promise<Order | null> {
  if (!isFirebaseConfigured()) return null;
  try {
    const snap = await getDoc(doc(db, "orders", id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<Order, "id">) };
  } catch {
    return null;
  }
}

export async function fetchAllOrders(): Promise<Order[]> {
  if (!isFirebaseConfigured()) return [];
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }));
  } catch {
    return [];
  }
}

export async function updateOrderStatus(id: string, status: OrderStatus, note?: string) {
  if (!isFirebaseConfigured()) return;
  const order = await fetchOrderById(id);
  if (!order) return;
  const timeline = [...order.timeline, { status, at: new Date().toISOString(), note }];
  await updateDoc(doc(db, "orders", id), {
    status,
    timeline,
    updatedAt: new Date().toISOString(),
  });
}
