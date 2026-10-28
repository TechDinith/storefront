# Firebase Setup Guide (Free Spark Plan)

This guide connects the template to a free Firebase project. No billing required.

## 1. Create a Firebase project
1. Go to https://console.firebase.google.com → **Add project**.
2. Name it (e.g. `ecommerce-template`), disable Google Analytics (optional), **Create project**.
3. You're on the **Spark (free)** plan by default. Do not upgrade.

## 2. Register a Web App
1. In Project Overview, click the **</> Web** icon.
2. App nickname: `web`. (Skip Firebase Hosting setup for now.)
3. Copy the `firebaseConfig` object shown. You'll need these values.

## 3. Enable Authentication
1. Build → **Authentication** → Get started.
2. Sign-in method → **Email/Password** → Enable → Save.
3. (Optional) Enable Google, etc.

## 4. Create Firestore Database
1. Build → **Firestore Database** → Create database.
2. Choose **Start in production mode** (we ship rules).
3. Pick a region close to your users (e.g. `us-central`).
4. Create.

## 5. Enable Storage
1. Build → **Storage** → Get started.
2. Start in **production mode**.
3. Use the same region as Firestore.
4. Done.

## 6. Add config to the app
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in from the web app config:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=   # optional
   ```
3. Restart `npm run dev`.

## 7. Deploy security rules & indexes
Install Firebase CLI if needed:
```bash
npm install -g firebase-tools
firebase login
```
From the project root:
```bash
firebase use --add   # select your project
firebase deploy --only firestore:rules,storage:rules,firestore:indexes
```
This deploys `firestore.rules`, `storage.rules`, and `firestore.indexes.json`.

## 8. Create an admin user
Admin access is role-based via the `admins` collection.

Option A — via console:
1. Authentication → Users → Add user (email + password).
2. Copy the user's UID.
3. Firestore → `admins` collection → Add document with ID = UID:
   ```json
   { "email": "admin@example.com", "role": "superadmin", "name": "Admin" }
   ```

Option B — via the app's admin login flow (creates auth user on first login if the doc exists first). Recommended: create the Firestore doc first, then sign in at `/admin/login`.

## 9. Seed demo data (optional)
The app ships with mock data when Firebase is empty. To populate real Firestore:
1. Sign in as admin.
2. Use `/admin/products` to add products, or write a small script using the Firebase Admin SDK.
3. Categories can be added to the `categories` collection with `{ name, slug, active: true }`.

## 10. Verify
- `npm run dev` → open http://localhost:3000
- Sign up a customer account → check Firestore `users`.
- Add a product in admin → check `/products`.
- Place a test order (COD) → check Firestore `orders` and `/account/orders`.

## Free-tier limits to watch
- Firestore: 1 GB storage, 50k reads/day, 20k writes/day.
- Storage: 5 GB, 1 GB/day download.
- Auth: unlimited email/password users.
- Hosting via Firebase: 10 GB/month transfer (we use Vercel instead, also free).

If you exceed reads, add caching (React Query) and pagination (already in catalog).

## Troubleshooting
- **"Firebase: Error (auth/invalid-api-key)"** → check `.env.local` values and restart dev server.
- **Permission denied on Firestore** → rules not deployed; run step 7.
- **Images not loading** → Storage rules not deployed; check Storage bucket name matches `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`.
- **Admin login redirects to /admin/login** → no `admins/{uid}` doc; create it (step 8).
