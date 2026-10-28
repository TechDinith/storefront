"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/firebase/products";
import type { Product } from "@/types/product";
import { useRecentlyViewed } from "@/store/recently-viewed";
import { ProductCard } from "./product-card";

export function RecentlyViewed() {
  const ids = useRecentlyViewed((s) => s.ids);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (ids.length === 0) return;
    fetchProducts().then((all) => setProducts(all.filter((p) => ids.includes(p.id))));
  }, [ids]);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight">Recently viewed</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
