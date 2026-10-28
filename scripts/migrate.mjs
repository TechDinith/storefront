// Data migration script: transforms legacy Pedros schema to new template schema.
// Usage: node scripts/migrate.mjs --input legacy.json --output new.json
// This is a dry-run transformer; review output before importing to Firestore.

import fs from "node:fs";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith("--")) acc.push([cur.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const inputPath = args.input || "legacy.json";
const outputPath = args.output || "migrated.json";

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const legacy = JSON.parse(fs.readFileSync(inputPath, "utf8"));

function slugify(s) {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const migrated = {
  products: (legacy.products || []).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug || slugify(p.name),
    description: p.desc || p.description || "",
    category: p.category || "uncategorized",
    price: Number(p.price) || 0,
    currency: "USD",
    images: p.image ? [{ url: p.image }] : [],
    variants: Array.isArray(p.colors)
      ? p.colors.map((c, i) => ({ id: `${p.id}-${i}`, color: c, stock: 10 }))
      : [{ id: `${p.id}-0`, stock: 10 }],
    stock: 10,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  users: (legacy.users || []).map((u) => ({
    uid: u.authId || u.id,
    name: u.name || "",
    email: u.email,
    role: "customer",
    createdAt: new Date().toISOString(),
  })),
};

fs.writeFileSync(outputPath, JSON.stringify(migrated, null, 2));
console.log(`Migrated ${migrated.products.length} products, ${migrated.users.length} users -> ${outputPath}`);
