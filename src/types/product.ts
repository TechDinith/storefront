export interface ProductImage {
  url: string;
  alt?: string;
}

export interface ProductVariant {
  id: string;
  color?: string;
  size?: string;
  sku?: string;
  price?: number;
  stock: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategory?: string;
  brand?: string;
  tags?: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: ProductImage[];
  variants: ProductVariant[];
  stock: number;
  rating?: number;
  reviewCount?: number;
  status: "draft" | "active" | "archived";
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  active: boolean;
}
