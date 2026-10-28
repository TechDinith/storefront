import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/store/product-card";
import { RecentlyViewed } from "@/components/store/recently-viewed";
import { fetchProducts } from "@/lib/firebase/products";
import { storeConfig } from "@/config/store";

const features = [
  { icon: Truck, title: "Free shipping", desc: "On orders over $50" },
  { icon: ShieldCheck, title: "Secure checkout", desc: "Stripe-powered payments" },
  { icon: RotateCcw, title: "Easy returns", desc: "30-day return policy" },
];

export default async function HomePage() {
  const featured = (await fetchProducts({ featured: true })).slice(0, 4);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                New collection · Spring 2026
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {storeConfig.tagline}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Discover thoughtfully designed products for everyday life. Built as a
                white-label template — rebrand in minutes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Shop now <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
                alt="Fashion model"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured placeholder */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured products</h2>
            <p className="mt-1 text-sm text-muted-foreground">Hand-picked for you</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/products">View all</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight">Loved by customers</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { name: "Alex M.", text: "Great quality and fast shipping. Highly recommend!" },
              { name: "Sarah L.", text: "Beautiful design and easy checkout experience." },
              { name: "James K.", text: "Customer support was fantastic. Will buy again." },
            ].map((t) => (
              <Card key={t.name}>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">“{t.text}”</p>
                  <p className="mt-4 font-semibold">{t.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
            <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
              <Mail className="size-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Stay in the loop</h3>
              <p className="text-sm text-muted-foreground">Get updates on new arrivals and exclusive offers.</p>
            </div>
            <form className="flex w-full gap-2 sm:w-auto">
              <Input type="email" placeholder="you@example.com" className="sm:w-64" />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <RecentlyViewed />
    </div>
  );
}
