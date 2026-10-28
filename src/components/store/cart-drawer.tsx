"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/format";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const count = useCart((s) => s.count());
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart((s) => s.subtotal());

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button variant="ghost" size="icon" aria-label="Cart" className="relative" onClick={() => setOpen(true)}>
        <ShoppingBag className="size-5" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {count}
          </span>
        )}
      </Button>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Cart ({count})</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/products">Shop now</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId ?? ""}`} className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {item.image && <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Remove"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    {(item.color || item.size) && (
                      <p className="text-xs text-muted-foreground">{[item.color, item.size].filter(Boolean).join(" · ")}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded border border-border">
                        <button className="px-2 py-0.5" onClick={() => updateQty(item.productId, item.variantId, item.quantity - 1)}>
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-xs">{item.quantity}</span>
                        <button className="px-2 py-0.5" onClick={() => updateQty(item.productId, item.variantId, item.quantity + 1)}>
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatCurrency(item.price * item.quantity, item.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-3 pt-4">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <Button className="w-full" asChild onClick={() => setOpen(false)}>
                <Link href="/cart">View cart</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild onClick={() => setOpen(false)}>
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
