import { fetchProducts, fetchCategories } from "@/lib/firebase/products";
import { ProductCard } from "@/components/store/product-card";
import Link from "next/link";
import type { Category } from "@/types/product";
import { ProductFilters } from "@/components/store/product-filters";

export const metadata = { title: "Products" };

const PAGE_SIZE = 12;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : undefined;
  const q = typeof params.q === "string" ? params.q : undefined;
  const sort = typeof params.sort === "string" ? params.sort : "newest";
  const color = typeof params.color === "string" ? params.color : undefined;
  const size = typeof params.size === "string" ? params.size : undefined;
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const page = params.page ? Math.max(1, Number(params.page)) : 1;

  const [productsRaw, categoriesRaw] = await Promise.all([
    fetchProducts({ category }),
    fetchCategories(),
  ]);
  const categories = categoriesRaw as Category[];

  let filtered = productsRaw;
  if (q) {
    const needle = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.tags?.some((t) => t.includes(needle))
    );
  }
  if (color) filtered = filtered.filter((p) => p.variants.some((v) => v.color === color));
  if (size) filtered = filtered.filter((p) => p.variants.some((v) => v.size === size));
  if (minPrice !== undefined) filtered = filtered.filter((p) => p.price >= minPrice);
  if (maxPrice !== undefined) filtered = filtered.filter((p) => p.price <= maxPrice);

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  else filtered = [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const colors = Array.from(new Set(productsRaw.flatMap((p) => p.variants.map((v) => v.color).filter(Boolean)))) as string[];
  const sizes = Array.from(new Set(productsRaw.flatMap((p) => p.variants.map((v) => v.size).filter(Boolean)))) as string[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {category ? categories.find((c) => c.slug === category)?.name || "Products" : "Products"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <ProductFilters
          categories={categories}
          colors={colors}
          sizes={sizes}
          current={{ category, q, sort, color, size, minPrice, maxPrice }}
        />

        <div>
          {pageItems.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">No products found.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const sp = new URLSearchParams();
                if (category) sp.set("category", category);
                if (q) sp.set("q", q);
                if (sort) sp.set("sort", sort);
                if (color) sp.set("color", color);
                if (size) sp.set("size", size);
                if (minPrice !== undefined) sp.set("minPrice", String(minPrice));
                if (maxPrice !== undefined) sp.set("maxPrice", String(maxPrice));
                sp.set("page", String(p));
                return (
                  <Link
                    key={p}
                    href={`/products?${sp.toString()}`}
                    className={`rounded-lg border px-3 py-1.5 text-sm ${
                      p === currentPage
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {p}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
