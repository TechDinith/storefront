import Link from "next/link";
import Image from "next/image";
import { fetchCategories } from "@/lib/firebase/products";
import type { Category } from "@/types/product";

export const metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const categories = (await fetchCategories()) as Category[];
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c: Category) => (
          <Link
            key={c.id}
            href={`/products?category=${c.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-border bg-muted"
          >
            <div className="relative aspect-[4/3]">
              {c.image && (
                <Image src={c.image} alt={c.name} fill sizes="(max-width:768px)100vw,33vw" className="object-cover transition-transform group-hover:scale-105" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-xl font-bold text-white">{c.name}</h2>
                {c.description && <p className="text-sm text-white/80">{c.description}</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
