import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  image?: string;
  price: number;
  currency: string;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variantId?: string, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQty: (productId: string, variantId: string | undefined, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variantId, quantity = 1) => {
        const variant = variantId ? product.variants.find((v) => v.id === variantId) : undefined;
        const price = variant?.price ?? product.price;
        const color = variant?.color;
        const size = variant?.size;
        const image = variant?.image ?? product.images[0]?.url;
        set((state) => {
          const idx = state.items.findIndex(
            (i) => i.productId === product.id && i.variantId === variantId
          );
          if (idx >= 0) {
            const next = [...state.items];
            next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
            return { items: next };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                variantId,
                name: product.name,
                image,
                price,
                currency: product.currency,
                quantity,
                color,
                size,
              },
            ],
          };
        });
      },
      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        })),
      updateQty: (productId, variantId, qty) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId && i.variantId === variantId
                ? { ...i, quantity: Math.max(1, qty) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((a, b) => a + b.quantity, 0),
      subtotal: () => get().items.reduce((a, b) => a + b.price * b.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);
