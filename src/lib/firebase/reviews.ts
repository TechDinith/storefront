import { collection, getDocs, addDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "./config";
import type { Review } from "@/types/review";

function isFirebaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
}

export async function fetchReviews(productId: string): Promise<Review[]> {
  if (!isFirebaseConfigured()) {
    return [
      { id: "r1", productId, userId: "u1", userName: "Alex", rating: 5, title: "Great", body: "Loved it!", approved: true, createdAt: new Date().toISOString() },
      { id: "r2", productId, userId: "u2", userName: "Sam", rating: 4, body: "Good value.", approved: true, createdAt: new Date().toISOString() },
    ];
  }
  try {
    const q = query(collection(db, "reviews"), where("productId", "==", productId), where("approved", "==", true), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Review, "id">) }));
  } catch {
    return [];
  }
}

export async function addReview(review: Omit<Review, "id" | "createdAt" | "approved">) {
  if (!isFirebaseConfigured()) {
    return { id: "demo-review", ...review, approved: true, createdAt: new Date().toISOString() };
  }
  const ref = await addDoc(collection(db, "reviews"), {
    ...review,
    approved: false,
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, ...review, approved: false, createdAt: new Date().toISOString() };
}
