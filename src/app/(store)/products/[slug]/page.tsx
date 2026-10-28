import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchProductBySlug, fetchProducts } from "@/lib/firebase/products";
import { AddToCart } from "@/components/store/add-to-cart";
import { formatCurrency } from "@/lib/format";
import { ProductCard } from "@/components/store/product-card";
import { Reviews } from "@/components/store/reviews";
import { TrackRecent } from "@/components/store/track-recent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: product.images.map((i) => i.url),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const related = (await fetchProducts({ category: product.category })).filter((p) => p.id !== product.id).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => i.url),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: product.rating
      ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount || 0 }
      : undefined,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrackRecent id={product.id} />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <Image
              src={product.images[0]?.url || "/placeholder.png"}
              alt={product.images[0]?.alt || product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image src={img.url} alt={img.alt || product.name} fill sizes="120px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
          {product.rating && (
            <p className="mt-2 text-sm text-muted-foreground">
              ★ {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </p>
          )}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatCurrency(product.price, product.currency)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice, product.currency)}
              </span>
            )}
          </div>
          <p className="mt-6 text-muted-foreground">{product.description}</p>

          <AddToCart product={product} />

          <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Stock:</strong> {product.stock > 0 ? `${product.stock} available` : "Out of stock"}</p>
            {product.brand && <p className="mt-1"><strong className="text-foreground">Brand:</strong> {product.brand}</p>}
            {product.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">#{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Reviews productId={product.id} />

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">You may also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
