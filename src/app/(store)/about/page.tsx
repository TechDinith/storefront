import { storeConfig } from "@/config/store";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">About {storeConfig.name}</h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          {storeConfig.name} is a modern e-commerce template built with Next.js, Tailwind CSS, and Firebase.
          It ships with a complete storefront and admin console, ready to be rebranded for your business.
        </p>
        <p>
          This project is a portfolio template. Replace the brand, products, and content via the config and
          the admin panel to make it your own.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Our mission</h2>
        <p>
          To provide a clean, fast, and accessible shopping experience that works beautifully on every device.
        </p>
      </div>
    </div>
  );
}
