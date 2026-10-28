"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const isWishlisted = useWishlist((s) => s.has(product.id));
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0]?.url || "/placeholder.png"}
            alt={product.images[0]?.alt || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {onSale && (
            <Badge className="absolute left-3 top-3" variant="destructive">
              Sale
            </Badge>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
            aria-label="Toggle wishlist"
          >
            <Heart className={`size-4 ${isWishlisted ? "fill-destructive text-destructive" : ""}`} />
          </button>
        </div>
      </Link>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <Link href={`/products/${product.slug}`} className="mt-1 block">
          <h3 className="font-semibold leading-tight line-clamp-2">{product.name}</h3>
        </Link>
        {product.rating && (
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-accent text-accent" />
            <span>{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold">{formatCurrency(product.price, product.currency)}</span>
          {onSale && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.compareAtPrice!, product.currency)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => addItem(product)}
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? "Out of stock" : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
