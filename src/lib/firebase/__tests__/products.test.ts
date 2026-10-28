import { describe, it, expect } from "vitest";
import { fetchProducts, fetchProductBySlug } from "../products";

describe("products service (demo mode)", () => {
  it("returns products", async () => {
    const list = await fetchProducts();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
  });

  it("filters by category", async () => {
    const list = await fetchProducts({ category: "men" });
    expect(list.every((p) => p.category === "men")).toBe(true);
  });

  it("fetches by slug", async () => {
    const p = await fetchProductBySlug("classic-oxford-shirt");
    expect(p).not.toBeNull();
    expect(p?.name).toBe("Classic Oxford Shirt");
  });
});
