import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";
import type { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-products";

function isFirebaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
}

export async function fetchProducts(opts?: { category?: string; featured?: boolean }): Promise<Product[]> {
  if (!isFirebaseConfigured()) {
    let list = [...mockProducts];
    if (opts?.category) list = list.filter((p) => p.category === opts.category);
    if (opts?.featured) list = list.filter((p) => p.featured);
    return list;
  }
  try {
    const col = collection(db, "products");
    const q = opts?.category
      ? query(col, where("category", "==", opts.category), where("status", "==", "active"))
      : query(col, where("status", "==", "active"));
    const snap = await getDocs(q);
    const rows = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) }));
    return rows.length ? rows : mockProducts;
  } catch {
    return mockProducts;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!isFirebaseConfigured()) {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
  try {
    const col = collection(db, "products");
    const q = query(col, where("slug", "==", slug));
    const snap = await getDocs(q);
    if (snap.empty) return mockProducts.find((p) => p.slug === slug) ?? null;
    const d = snap.docs[0];
    return { id: d.id, ...(d.data() as Omit<Product, "id">) };
  } catch {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  if (!isFirebaseConfigured()) {
    return mockProducts.find((p) => p.id === id) ?? null;
  }
  try {
    const snap = await getDoc(doc(db, "products", id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<Product, "id">) };
  } catch {
    return mockProducts.find((p) => p.id === id) ?? null;
  }
}

export async function fetchCategories() {
  if (!isFirebaseConfigured()) {
    const { mockCategories } = await import("@/data/mock-products");
    return mockCategories;
  }
  try {
    const snap = await getDocs(collection(db, "categories"));
    const rows = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Record<string, unknown>) })) as Product[];
    if (!rows.length) {
      const { mockCategories } = await import("@/data/mock-products");
      return mockCategories;
    }
    return rows;
  } catch {
    const { mockCategories } = await import("@/data/mock-products");
    return mockCategories;
  }
}
