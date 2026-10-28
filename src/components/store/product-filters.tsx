"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category } from "@/types/product";

interface Props {
  categories: Category[];
  colors: string[];
  sizes: string[];
  current: {
    category?: string;
    q?: string;
    sort?: string;
    color?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

export function ProductFilters({ categories, colors, sizes, current }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const update = (key: string, value: string | undefined) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`/products?${next.toString()}`);
  };

  const reset = () => router.push("/products");

  return (
    <aside className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Category</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={!current.category ? "default" : "outline"}
            onClick={() => update("category", undefined)}
          >
            All
          </Button>
          {categories.map((c) => (
            <Button
              key={c.id}
              size="sm"
              variant={current.category === c.slug ? "default" : "outline"}
              onClick={() => update("category", c.slug)}
            >
              {c.name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold">Sort</h3>
        <Select value={current.sort || "newest"} onValueChange={(v) => update("sort", v ?? undefined)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name">Name A–Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {colors.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold">Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={current.color === c ? "default" : "outline"}
                onClick={() => update("color", current.color === c ? undefined : c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <Button
                key={s}
                size="sm"
                variant={current.size === s ? "default" : "outline"}
                onClick={() => update("size", current.size === s ? undefined : s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-2 text-sm font-semibold">Price range</h3>
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-xs">Min</Label>
            <Input
              type="number"
              defaultValue={current.minPrice ?? ""}
              onBlur={(e) => update("minPrice", e.target.value || undefined)}
            />
          </div>
          <div className="flex-1">
            <Label className="text-xs">Max</Label>
            <Input
              type="number"
              defaultValue={current.maxPrice ?? ""}
              onBlur={(e) => update("maxPrice", e.target.value || undefined)}
            />
          </div>
        </div>
      </div>

      <Button variant="ghost" className="w-full" onClick={reset}>
        Reset filters
      </Button>
    </aside>
  );
}
