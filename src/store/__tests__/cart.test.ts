import { describe, it, expect, beforeEach } from "vitest";
import { useCart } from "../cart";
import type { Product } from "@/types/product";

const product: Product = {
  id: "p1",
  name: "Test Product",
  slug: "test-product",
  description: "desc",
  category: "men",
  price: 10,
  currency: "USD",
  images: [{ url: "https://example.com/img.jpg" }],
  variants: [{ id: "v1", color: "Red", size: "M", stock: 5 }],
  stock: 5,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("cart store", () => {
  beforeEach(() => {
    useCart.getState().clear();
  });

  it("adds an item", () => {
    useCart.getState().addItem(product, "v1", 2);
    const items = useCart.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
    expect(items[0].price).toBe(10);
  });

  it("increments quantity for same variant", () => {
    useCart.getState().addItem(product, "v1", 1);
    useCart.getState().addItem(product, "v1", 1);
    expect(useCart.getState().items[0].quantity).toBe(2);
  });

  it("removes an item", () => {
    useCart.getState().addItem(product, "v1", 1);
    useCart.getState().removeItem("p1", "v1");
    expect(useCart.getState().items).toHaveLength(0);
  });

  it("computes subtotal", () => {
    useCart.getState().addItem(product, "v1", 3);
    expect(useCart.getState().subtotal()).toBe(30);
  });
});
