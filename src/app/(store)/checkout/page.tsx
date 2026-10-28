"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/format";
import { storeConfig } from "@/config/store";
import { CheckCircle2 } from "lucide-react";
import { createOrder } from "@/lib/firebase/orders";
import { auth } from "@/lib/firebase/config";

type Step = "address" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const [step, setStep] = useState<Step>("address");
  const [placed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "US",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");

  if (items.length === 0 && !placed) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Nothing to checkout</h1>
        <Button className="mt-6" asChild>
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto size-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold">Thank you for your order!</h1>
        <p className="mt-2 text-muted-foreground">
          Your order has been placed. A confirmation email will be sent shortly.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/products">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handlePlaceOrder = async () => {
    const orderItems = items.map((i) => ({
      productId: i.productId,
      variantId: i.variantId,
      name: i.name,
      image: i.image,
      price: i.price,
      currency: i.currency,
      quantity: i.quantity,
      color: i.color,
      size: i.size,
    }));

    const order = await createOrder({
      userId: auth?.currentUser?.uid ?? null,
      guestEmail: auth?.currentUser ? undefined : form.email,
      items: orderItems,
      shippingAddress: form,
      shippingMethod: "standard",
      shippingCost: 0,
      subtotal,
      tax: 0,
      discount: 0,
      total: subtotal,
      currency: storeConfig.currency,
      payment: {
        provider: paymentMethod === "card" ? "stripe" : "cod",
        status: paymentMethod === "cod" ? "pending" : "pending",
      },
      status: "pending",
      timeline: [{ status: "pending", at: new Date().toISOString(), note: "Order placed" }],
    });

    clear();
    router.push(`/checkout/success?order=${order.orderNumber}`);
  };

  const steps: { key: Step; label: string }[] = [
    { key: "address", label: "Delivery address" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      <div className="mt-6 flex gap-2">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`flex size-8 items-center justify-center rounded-full text-sm font-medium ${
                step === s.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span className="hidden text-sm sm:inline">{s.label}</span>
            {i < steps.length - 1 && <div className="h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {step === "address" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>First name</Label>
                    <Input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
                    {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label>Last name</Label>
                    <Input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
                    {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Email</Label>
                    <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Phone</Label>
                    <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Address</Label>
                    <Input value={form.address} onChange={(e) => update("address", e.target.value)} />
                    {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
                    {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
                  </div>
                  <div>
                    <Label>ZIP</Label>
                    <Input value={form.zip} onChange={(e) => update("zip", e.target.value)} />
                    {errors.zip && <p className="mt-1 text-xs text-destructive">{errors.zip}</p>}
                  </div>
                  <div className="sm:col-span-2 flex justify-end">
                    <Button
                      onClick={() => {
                        const e: Record<string, string> = {};
                        if (!form.firstName) e.firstName = "First name is required";
                        if (!form.lastName) e.lastName = "Last name is required";
                        if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Valid email is required";
                        if (!form.phone) e.phone = "Phone is required";
                        if (!form.address) e.address = "Address is required";
                        if (!form.city) e.city = "City is required";
                        if (!form.zip) e.zip = "ZIP is required";
                        setErrors(e);
                        if (Object.keys(e).length === 0) setStep("payment");
                      }}
                    >
                      Continue to payment
                    </Button>
                  </div>
                </div>
              )}

              {step === "payment" && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Choose a payment method.</p>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4">
                    <input
                      type="radio"
                      name="pm"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <span className="font-medium">Credit / Debit card (Stripe)</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4">
                    <input
                      type="radio"
                      name="pm"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span className="font-medium">Cash on delivery</span>
                  </label>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep("address")}>Back</Button>
                    <Button onClick={() => setStep("review")}>Review order</Button>
                  </div>
                </div>
              )}

              {step === "review" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      {form.firstName} {form.lastName} · {form.address}, {form.city} {form.zip}, {form.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      {paymentMethod === "card" ? "Credit / Debit card (Stripe)" : "Cash on delivery"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep("payment")}>Back</Button>
                    <Button onClick={handlePlaceOrder}>Place order</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-semibold">Order summary</h2>
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatCurrency(item.price * item.quantity, item.currency)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(subtotal, storeConfig.currency)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
