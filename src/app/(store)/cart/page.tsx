"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/format";
import { storeConfig } from "@/config/store";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);
  const subtotal = useCart((s) => s.subtotal());
  const count = useCart((s) => s.count());

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="mx-auto size-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven&apos;t added anything yet.</p>
        <Button className="mt-6" asChild>
          <Link href="/products">Start shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.productId}-${item.variantId ?? ""}`}>
              <CardContent className="flex gap-4 p-4">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      {(item.color || item.size) && (
                        <p className="text-sm text-muted-foreground">
                          {[item.color, item.size].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Remove item"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        className="px-2 py-1 hover:bg-muted"
                        onClick={() => updateQty(item.productId, item.variantId, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        className="px-2 py-1 hover:bg-muted"
                        onClick={() => updateQty(item.productId, item.variantId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(item.price * item.quantity, item.currency)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="ghost" onClick={clear} className="text-destructive">
            Clear cart
          </Button>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({count} items)</span>
                <span>{formatCurrency(subtotal, storeConfig.currency)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(subtotal, storeConfig.currency)}</span>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">Proceed to checkout</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/products">Continue shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
