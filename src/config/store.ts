// Central brand/store configuration. Override via env vars or edit here.
// Everything brand-related should flow from this file so the template is white-label.

export const storeConfig = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || "Storefront",
  tagline: "Modern essentials for everyday life",
  description: "A modern e-commerce template built with Next.js, Tailwind, and Firebase.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  currency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || "USD",
  locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en-US",
  supportEmail: "support@example.com",
  // Brand colors (CSS variables are defined in globals.css; keep in sync)
  theme: {
    primary: "#2563eb", // blue-600
    accent: "#f97316", // orange-500
  },
  // Demo mode: show demo credentials banner in admin login
  demoMode: process.env.NODE_ENV !== "production",
  // Feature flags
  features: {
    wishlist: true,
    reviews: true,
    coupons: true,
    stripe: true,
    algolia: false,
  },
} as const;

export type StoreConfig = typeof storeConfig;
