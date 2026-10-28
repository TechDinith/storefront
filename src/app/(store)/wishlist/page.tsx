"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/firebase/products";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/store/product-card";
import { useWishlist } from "@/store/wishlist";

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then((all) => setProducts(all.filter((p) => ids.includes(p.id))));
  }, [ids]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
      {products.length === 0 ? (
        <p className="mt-8 text-muted-foreground">Your wishlist is empty.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
