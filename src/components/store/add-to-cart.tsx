"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import type { Product } from "@/types/product";

export function AddToCart({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);
  const selected = product.variants.find((v) => v.id === variantId);

  const colors = Array.from(new Set(product.variants.map((v) => v.color).filter(Boolean)));
  const sizes = Array.from(new Set(product.variants.map((v) => v.size).filter(Boolean)));

  return (
    <div className="mt-6 space-y-4">
      {colors.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium">Color</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => {
              const v = product.variants.find((x) => x.color === c);
              return (
                <button
                  key={c}
                  onClick={() => v && setVariantId(v.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    selected?.color === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {sizes.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
              const v = product.variants.find((x) => x.size === s && (!selected?.color || x.color === selected?.color));
              const available = (v?.stock ?? 0) > 0;
              return (
                <button
                  key={s}
                  disabled={!available}
                  onClick={() => v && setVariantId(v.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    selected?.size === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-muted"
                  } ${!available ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-border">
          <button
            className="px-3 py-2 text-lg leading-none hover:bg-muted"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center">{qty}</span>
          <button
            className="px-3 py-2 text-lg leading-none hover:bg-muted"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <Button
          className="flex-1"
          size="lg"
          disabled={!product.stock || product.stock <= 0}
          onClick={() => addItem(product, variantId, qty)}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
