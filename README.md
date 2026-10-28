# E-Commerce Template

A modern, white-label e-commerce template built with **Next.js 14 (App Router)**, **Tailwind CSS + shadcn/ui**, **Firebase**, and **Stripe**.

## Features
- Storefront: catalog, filters, search, product details, cart, checkout, accounts, orders
- Admin console: products, orders, customers, discounts, settings
- White-label: configure brand, theme, currency via `src/config/store.ts` + env vars
- Demo data when Firebase is not configured
- Dark/light mode, responsive, accessible

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Firebase (and optional Stripe) credentials. Leave blank to run in demo mode.
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Scripts
- `npm run dev` – development server
- `npm run build` – production build
- `npm run start` – start production server
- `npm run lint` – lint
- `npm run test` / `npm run test:run` – tests

## Firebase setup (free Spark plan)
This template uses **Firebase Auth + Firestore only** (both free on the Spark plan).
Images are stored as URLs (no Firebase Storage needed), so you avoid the Blaze-plan requirement.

Deploy Firestore rules:
```bash
firebase deploy --only firestore:rules
```

### Steps
1. Create a Firebase project at https://console.firebase.google.com (free).
2. **Authentication** → Sign-in method → enable **Email/Password**.
3. **Firestore Database** → Create database → start in **production mode**.
4. **Project settings** → Your apps → Web app → copy config into `.env.local`.
5. Deploy rules: `firebase deploy --only firestore:rules`
6. (Optional) Run the seed script / add products via the admin panel.

> Note: Firebase Storage now requires the Blaze (pay-as-you-go) plan. This template avoids Storage entirely by using image URLs.

## Customizing the brand
Edit `src/config/store.ts` and `src/app/globals.css` (CSS variables). Replace logo/favicon in `public/`.

## License
MIT
