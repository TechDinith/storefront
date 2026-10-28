import { test, expect } from "@playwright/test";

test("home loads and shows products", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Storefront/);
  await expect(page.getByRole("link", { name: /Shop now/i })).toBeVisible();
});

test("catalog and product detail", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByText("Products")).toBeVisible();
  const first = page.locator("a[href^='/products/']").first();
  await first.click();
  await expect(page.getByRole("button", { name: /Add to cart/i })).toBeVisible();
});

test("cart flow", async ({ page }) => {
  await page.goto("/products");
  await page.getByRole("button", { name: /Add to cart/i }).first().click();
  await page.goto("/cart");
  await expect(page.getByText("Cart")).toBeVisible();
});
