"use client";

import Link from "next/link";
import { storeConfig } from "@/config/store";
import { useState } from "react";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "New arrivals", href: "/products?sort=newest" },
      { label: "Sale", href: "/products?sale=true" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  const [year] = useState(() => new Date().getFullYear());
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                {storeConfig.name.charAt(0)}
              </span>
              <span className="text-lg font-semibold tracking-tight">{storeConfig.name}</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{storeConfig.tagline}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {storeConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built as a portfolio template. Configure via <code className="rounded bg-muted px-1">config/store.ts</code>.
          </p>
        </div>
      </div>
    </footer>
  );
}
