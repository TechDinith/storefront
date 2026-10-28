# E-Commerce Template — Full Upgrade Plan

> **Status:** Planning document. No code changes have been made yet.
> **Repo:** `C:\my_projects\pedros` (Create React App + Firebase, dark MUI theme)
> **Goal:** Turn the current storefront into a **generalized, reusable e-commerce template** (portfolio-ready) with best-in-class UI/UX — configurable brand, theme, currency, and catalog, with demo seed data. No hardcoded "Pedros" branding in the final template.

---

## 1. Current State Audit

### 1.1 Stack
| Area | Current |
|---|---|
| Build tool | Create React App 5 (`react-scripts`) |
| Language | TypeScript 4.4 (strict, but heavy `any`) |
| UI | MUI 5.8 + antd 4.21 (two competing design systems) |
| Routing | react-router-dom 6 |
| Backend | Firebase 9 (Auth, Firestore, Storage) |
| Forms | react-hook-form 7 + yup |
| State | Local component state + `localStorage` + Firestore |
| Styling | MUI `sx` + SCSS |
| Deploy | Firebase Hosting (implied) |

### 1.2 What already works
- Email/password auth (signup, signin, reset password)
- Product catalog with color variants + image upload to Firebase Storage
- Cart persisted in `localStorage` and synced to Firestore for logged-in users
- Checkout flow (address → payment → review) with email notification via HeroTofu
- Orders stored in Firestore; admin can view orders
- Admin dashboard: products CRUD, users, admins, orders (MUI DataGrid)
- Search (client-side), announcement banner, categories (men/women/accessories)
- Responsive navbar with mobile drawer

### 1.3 Critical gaps / defects found in code
1. **Firebase config is empty** (`firebase.config.ts`) — app cannot run as-is.
2. **Admin auth is insecure** — shared hardcoded password `Pedros@2022`, email prompt to confirm identity, no roles/permissions, no security rules.
3. **Cart is fragile** — relies on `localStorage`, `setTimeout(...reload)`, page reloads, duplicated delete logic; race conditions.
4. **No real payments** — only "Cash on delivery"; no Stripe/PayPal, no tax/shipping.
5. **No inventory/stock** — products have no stock counts; overselling possible.
6. **No order lifecycle** — no statuses (pending/processing/shipped/delivered/cancelled/refunded), no tracking.
7. **No product detail route** — details shown in dialogs; no shareable URLs, no SEO.
8. **Hardcoded categories** — men/women/accessories baked into routes and UI.
9. **Image handling is async-in-render** — `handleImageUrl` called inside `map`/render; broken images likely.
10. **No loading/error/empty states** in most views; no error boundaries.
11. **No tests** at all.
12. **Mixed UI libs** (MUI + antd) increase bundle and visual inconsistency.
13. **CRA is deprecated** (no longer maintained) — should migrate.
14. **No SEO** — no meta tags, sitemap, structured data.
15. **No accessibility audit** — keyboard nav, ARIA, contrast unverified.
16. **Currency/region hardcoded** (Rs.); no locale/i18n.
17. **No wishlist, reviews, coupons, shipping rules, returns policy flow.**

---

## 2. Target Product Vision

A modern, fast, mobile-first storefront + admin console comparable to Shopify-lite:
- **Storefront:** discovery (search, filters, categories), rich product pages, cart drawer, frictionless checkout, account area, order tracking.
- **Admin:** catalog, inventory, orders, customers, discounts, content, analytics, settings.
- **Trust & compliance:** secure auth, privacy/terms, returns, contact, transactional emails.
- **Performance:** Lighthouse 90+ on mobile, <2s LCP, image optimization, code splitting.
- **SEO:** indexable product/category pages, structured data, sitemap.
- **Accessibility:** WCAG 2.1 AA.

---

## 2.1 Generalization / Template Requirements (NEW)

The final deliverable is a **portfolio template**, not a single brand. Therefore:

- **No hardcoded brand:** store name, logo, favicon, colors, fonts, currency, locale, contact info, and policies must come from a `settings` config (env + Firestore `settings/store`), not from source code.
- **Configurable theme:** brand color palette, logo URL, and typography selectable via a single config file (`config/store.ts`) + admin settings UI.
- **Dynamic categories:** categories are data-driven (Firestore `categories`), not hardcoded routes; navigation and filters render from data.
- **Demo seed data:** a seed script populates sample products/categories/users/orders so the template looks alive out of the box.
- **Demo mode:** optional read-only/demo auth (e.g., demo admin credentials) for portfolio reviewers, clearly labeled.
- **Multi-currency ready:** prices stored as numbers + currency code; formatting via `Intl.NumberFormat`.
- **i18n-ready:** UI strings extracted to a dictionary (at least `en`), easy to add locales.
- **White-label assets:** placeholder logo, favicon, and OG image shipped; replaced by config.
- **Documentation:** setup guide, env template, seed instructions, deployment guide, and a "customize this template" section.
- **No real customer data:** use faker/seed data; no Pedros-specific images/text in final (keep as optional demo seed).

## 3. Recommended Tech Stack (defaults — adjustable)

| Layer | Recommendation | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** + TypeScript | SSR/SSG for SEO, image optimization, API routes, file-based routing, great DX |
| Styling/UI | **Tailwind CSS + shadcn/ui (Radix)** | Modern, accessible primitives, small bundle, easy theming; replaces MUI+antd |
| State | **Zustand** (cart/UI) + **TanStack Query** (server state) | Predictable, cache-aware, no prop drilling |
| Forms | **react-hook-form + zod** | Type-safe validation |
| Backend/Auth/DB/Storage | **Firebase** (Auth, Firestore, Storage) + **Cloud Functions** | Reuse existing data & infra; add security rules |
| Payments | **Stripe** (primary) + COD fallback | PCI-compliant, global; webhooks via Cloud Functions |
| Email | **Resend / SendGrid** (transactional) | Reliable templates vs HeroTofu |
| Search | **Algolia** or Firestore + client filters (phase 1) | Full-text + facets |
| Analytics | **GA4 + Vercel Analytics** | Traffic + Core Web Vitals |
| Errors | **Sentry** | Production monitoring |
| Testing | **Vitest + RTL + Playwright** | Unit/component/E2E |
| CI/CD | **GitHub Actions → Vercel** (or Firebase Hosting) | Preview deploys per PR |
| Package mgr | **pnpm** | Faster, stricter |

> **Decision point A:** Keep Firebase vs migrate DB to Supabase (Postgres). Recommendation: keep Firebase for v1 (lower risk, reuse data), revisit if relational queries become a bottleneck.

> **Decision point B:** Next.js vs staying on Vite+React Router. Recommendation: Next.js for SEO-critical e-commerce.

> **Decision point C:** Tailwind/shadcn vs upgrading MUI to v6. Recommendation: Tailwind/shadcn for a fresh modern look; keep MUI only if team prefers it.

---

## 4. Information Architecture & Routes

### Storefront
- `/` Home
- `/products` Catalog (filters, sort, search)
- `/products/[slug]` Product detail
- `/categories/[slug]` Category landing
- `/search?q=` Search results
- `/cart` Cart
- `/checkout` Checkout (multi-step)
- `/checkout/success` & `/checkout/cancel`
- `/account` (protected) — profile, addresses, wishlist
- `/account/orders`, `/account/orders/[id]` (tracking)
- `/wishlist`
- `/about`, `/contact`, `/faq`, `/shipping`, `/returns`, `/privacy`, `/terms`
- `/auth/login`, `/auth/signup`, `/auth/reset`, `/auth/verify`
- `/404`, `/500`

### Admin (`/admin/*`, role-gated)
- `/admin` Dashboard (KPIs + charts)
- `/admin/products`, `/admin/products/new`, `/admin/products/[id]`
- `/admin/orders`, `/admin/orders/[id]`
- `/admin/customers`, `/admin/customers/[id]`
- `/admin/discounts`
- `/admin/content` (announcements, pages)
- `/admin/settings` (store, payments, shipping, taxes, users/roles)
- `/admin/login`

---

## 5. Data Model (Firestore)

```
users/{uid}
  profile: { name, email, phone, avatarUrl, role, createdAt, banned }
  addresses/{addressId}
  wishlist/{productId}
  reviews/{reviewId}

products/{productId}
  name, slug, description, shortDescription
  category, subcategory, brand, tags[]
  price, compareAtPrice, currency
  images: [{ url, alt, order }]
  variants: [{ id, color, size, sku, price, stock, image }]
  stock (aggregate), lowStockThreshold
  rating, reviewCount
  status: draft|active|archived
  seo: { title, description }
  createdAt, updatedAt

categories/{id}: name, slug, parentId, image, order, active
carts/{uid}: items[], updatedAt  (or users/{uid}/cart)
orders/{orderId}
  orderNumber, userId, guestEmail
  items: [{ productId, variantId, name, image, price, qty }]
  shippingAddress, billingAddress
  shippingMethod, shippingCost
  subtotal, tax, discount, total, currency
  payment: { provider, status, transactionId }
  status, timeline: [{ status, at, note }]
  createdAt, updatedAt
reviews/{id}: productId, userId, rating, title, body, approved, createdAt
coupons/{id}: code, type(percent|fixed), value, minOrder, maxUses, usedCount, expiresAt, active
announcements/{id}, settings/{id}, admins/{uid}: role, permissions
auditLogs/{id}: actor, action, target, at
```

Key rules: products public read; writes admin only. Orders readable by owner or admin. Carts owner only. Storage rules by path + auth.

---

## 6. Feature Roadmap (Phased)

### Phase 0 — Stabilize & Discover (1 week)
- Restore Firebase config via env vars (`.env.local`), document setup.
- Add Firestore/Storage security rules (baseline) and indexes.
- Freeze `master`; create `upgrade/main` branch + worktree.
- Set up linting (ESLint strict), Prettier, Husky pre-commit.
- Add README with run instructions; remove CRA boilerplate.

### Phase 1 — Foundation & Tooling (1–2 weeks)
- Scaffold Next.js 14 project (new `apps/web` or replace `src`).
- Migrate Firebase SDK into typed service layer (`lib/firebase/*`).
- Design system: Tailwind config, shadcn/ui, theme tokens (colors, typography, spacing), dark/light mode.
- Layout shell: header, footer, mobile nav, cart drawer, toast, modal, skeleton.
- Auth flows (login/signup/reset/verify) with protected routes & middleware.
- CI: GitHub Actions (lint, typecheck, build, tests), Vercel preview.

### Phase 2 — Storefront Core (2–3 weeks)
- Home (hero slider, featured, categories, latest, testimonials, newsletter).
- Catalog with filters (category, price, color, size), sort, pagination.
- Search results (Algolia or client).
- Product detail (gallery, variants, stock, description, related).
- Cart (page + drawer) with quantity edit, remove, coupon.
- Account basics (profile, addresses).
- Content pages (about, contact, terms, privacy, faq, shipping, returns).

### Phase 3 — Checkout & Orders (2 weeks)
- Multi-step checkout with address book + shipping methods.
- Stripe Checkout + webhooks (Cloud Function) + COD fallback.
- Order confirmation page + transactional email.
- Order history & tracking in account.
- Admin order management (status updates, notes, refund).

### Phase 4 — Admin Console (2 weeks)
- Secure admin auth with roles/permissions (replace shared password).
- Dashboard KPIs + charts (recharts).
- Product CRUD with variants, stock, image upload, categories.
- Customer management (view, ban/unban).
- Discounts/coupons CRUD.
- Announcements & content management.
- Settings (store info, shipping rates, taxes).

### Phase 5 — Growth & Polish (1–2 weeks)
- Wishlist + recently viewed.
- Reviews & ratings (submit, moderate).
- SEO: metadata, sitemap, robots, JSON-LD Product schema.
- Accessibility audit & fixes.
- Performance: image optimization, caching, bundle analysis, Lighthouse targets.
- PWA (optional): manifest, offline cart, install prompt.

### Phase 6 — Quality, Security, Launch (1–2 weeks)
- Unit/component tests (Vitest/RTL) for services & UI.
- E2E tests (Playwright) for critical paths: signup, browse, cart, checkout, admin.
- Security review: rules, validation, headers (CSP), rate limiting.
- Data migration scripts (old schema → new) + backup/rollback plan.
- Staging deploy + UAT + production cutover.
- Monitoring (Sentry, analytics, uptime).

**Estimated total: 10–14 weeks** for one developer; compress with parallel work.

---

## 7. UI/UX Enhancement Guidelines

- **Design language:** clean, modern, generous whitespace, strong typography (Inter/Plus Jakarta), brand accent color, subtle motion.
- **Motion:** Framer Motion for page transitions, hover lifts, cart drawer; respect `prefers-reduced-motion`.
- **Feedback:** skeletons for loading, toasts for actions, inline validation, empty states with CTAs.
- **Images:** `next/image` with blur placeholders, responsive sizes, WebP/AVIF.
- **Mobile-first:** bottom nav / sticky add-to-cart on PDP, large tap targets, swipeable galleries.
- **Dark/light mode** toggle with persisted preference.
- **Micro-interactions:** add-to-cart animation, quantity steppers, price updates.
- **Trust signals:** reviews, secure checkout badge, shipping/returns info, contact.
- **Admin UX:** dense data tables with filters, bulk actions, keyboard shortcuts, confirmation dialogs, undo where possible.

---

## 8. Security & Compliance

- Firestore/Storage security rules (owner/admin scoped); no client-side trust.
- Admin roles stored in Firestore + custom claims (Firebase Auth) for server-side checks.
- Input validation with zod on client and Cloud Functions.
- Sanitize user content; CSP headers; HSTS.
- Rate limiting on auth & checkout endpoints.
- Secrets only in server env (never `NEXT_PUBLIC_` for private keys).
- GDPR/privacy: cookie consent, data export/delete, privacy policy.
- Payment data never stored (Stripe handles PCI).

---

## 9. Testing Strategy

- **Unit:** services, utils, hooks (Vitest).
- **Component:** forms, product card, cart (RTL).
- **E2E (Playwright):** signup → browse → add to cart → checkout (COD) → order visible in account & admin; admin product CRUD.
- **Visual regression (optional):** Chromatic/Percy.
- **Performance:** Lighthouse CI in PRs.
- **Coverage target:** 70%+ on services/utils.

---

## 10. Migration & Cutover Plan

1. Export existing Firestore data (backup).
2. Write idempotent migration scripts: normalize products (add slug, stock, status), users, orders.
3. Run migration on staging; verify counts & spot-check.
4. Parallel run: new app reads old data via compatibility layer if needed.
5. DNS cutover to new app; keep old app read-only for 2 weeks.
6. Post-cutover: monitor errors, performance, conversion; rollback plan (repoint DNS).

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Big-bang rewrite delays | Phased delivery; ship storefront first, admin second |
| Data loss during migration | Backups + dry-run + rollback |
| SEO regression | Preserve URLs/slugs; 301 redirects; sitemap |
| Payment compliance | Use Stripe Checkout (hosted) |
| Scope creep | MoSCoW prioritization; "nice-to-have" backlog |
| Team unfamiliarity with Next.js | Pair programming, docs, start with Phase 1 scaffold |

---

## 12. Decisions Needed Before Starting

1. **Framework:** Next.js 14 (recommended) vs Vite+React Router?
2. **UI system:** Tailwind + shadcn (recommended) vs MUI v6?
3. **Payments:** Stripe (recommended) vs PayPal vs COD-only for v1?
4. **Hosting:** Vercel (recommended) vs Firebase Hosting?
5. **Database:** Keep Firebase (recommended) vs Supabase?
6. **Brand:** Generalized template (decided) — configurable via settings; ships with neutral demo brand "Storefront".

---

## 13. Immediate Next Steps (if approved)

1. Answer decision questions (§12).
2. Phase 0: restore Firebase env config, add security rules, create `upgrade/main` branch.
3. Scaffold Next.js app + design system (Phase 1).
4. Begin storefront migration (Phase 2).

---

*Prepared for planning discussion. Reply with decisions/adjustments and I'll start Phase 0.*
