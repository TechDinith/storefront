/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

function isFirebaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
}

export interface AdminUser {
  uid: string;
  email: string;
  role: "superadmin" | "admin" | "editor";
  name?: string;
}

export async function isAdmin(uid: string): Promise<boolean> {
  if (!isFirebaseConfigured()) return true; // demo mode
  try {
    const snap = await getDoc(doc(db, "admins", uid));
    return snap.exists();
  } catch {
    return false;
  }
}

export async function fetchAdmins(): Promise<AdminUser[]> {
  if (!isFirebaseConfigured()) {
    return [{ uid: "demo-admin", email: "admin@example.com", role: "superadmin", name: "Demo Admin" }];
  }
  try {
    const snap = await getDocs(collection(db, "admins"));
    return snap.docs.map((d) => ({ uid: d.id, ...(d.data() as Omit<AdminUser, "uid">) }));
  } catch {
    return [];
  }
}

export async function fetchUsers() {
  if (!isFirebaseConfigured()) {
    return [
      { uid: "u1", name: "Alice", email: "alice@example.com", role: "customer", banned: false },
      { uid: "u2", name: "Bob", email: "bob@example.com", role: "customer", banned: false },
    ];
  }
  try {
    const snap = await getDocs(collection(db, "users"));
    return snap.docs.map((d) => ({ uid: d.id, ...(d.data() as Record<string, unknown>) })) as any;
  } catch {
    return [];
  }
}

export async function toggleUserBan(uid: string, banned: boolean) {
  if (!isFirebaseConfigured()) return;
  await setDoc(doc(db, "users", uid), { banned }, { merge: true });
}

export async function fetchCoupons() {
  if (!isFirebaseConfigured()) {
    return [
      { id: "c1", code: "WELCOME10", type: "percent", value: 10, minOrder: 0, active: true, usedCount: 0 },
    ];
  }
  try {
    const snap = await getDocs(collection(db, "coupons"));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Record<string, unknown>) }));
  } catch {
    return [];
  }
}

export async function saveCoupon(coupon: any) {
  if (!isFirebaseConfigured()) return coupon;
  if (coupon.id) {
    await setDoc(doc(db, "coupons", coupon.id), coupon, { merge: true });
    return coupon;
  }
  const ref = await (await import("firebase/firestore")).addDoc(collection(db, "coupons"), coupon);
  return { ...coupon, id: ref.id };
}

export async function deleteCoupon(id: string) {
  if (!isFirebaseConfigured()) return;
  await deleteDoc(doc(db, "coupons", id));
}

export async function fetchAnnouncement(): Promise<string> {
  if (!isFirebaseConfigured()) return "Welcome to our store! Free shipping on orders over $50.";
  try {
    const snap = await getDoc(doc(db, "announcements", "main"));
    return snap.exists() ? (snap.data().text as string) : "";
  } catch {
    return "";
  }
}

export async function saveAnnouncement(text: string) {
  if (!isFirebaseConfigured()) return;
  await setDoc(doc(db, "announcements", "main"), { text }, { merge: true });
}
