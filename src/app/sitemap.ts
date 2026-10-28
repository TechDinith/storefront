import { MetadataRoute } from "next";
import { fetchProducts } from "@/lib/firebase/products";
import { storeConfig } from "@/config/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = storeConfig.url;
  const products = await fetchProducts();
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/products`, lastModified: new Date() },
    { url: `${base}/categories`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(p.updatedAt),
    })),
  ];
}
