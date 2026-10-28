"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchOrderById } from "@/lib/firebase/orders";
import type { Order } from "@/types/order";
import { formatCurrency, formatDate } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    fetchOrderById(params.id).then((o) => {
      setOrder(o);
      setLoading(false);
    });
  }, [params?.id]);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-16">Loading…</div>;
  if (!order) return <div className="mx-auto max-w-3xl px-4 py-16">Order not found.</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Order {order.orderNumber}</h1>
      <p className="mt-1 text-muted-foreground">{formatDate(order.createdAt)}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {order.items.map((i, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>
                  {i.name} × {i.quantity}
                  {(i.color || i.size) && (
                    <span className="text-muted-foreground"> ({[i.color, i.size].filter(Boolean).join(", ")})</span>
                  )}
                </span>
                <span>{formatCurrency(i.price * i.quantity, i.currency)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatCurrency(order.total, order.currency)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
            <p>{order.shippingAddress.country}</p>
            <p className="mt-2">{order.shippingAddress.email} · {order.shippingAddress.phone}</p>
            <p className="mt-3"><strong className="text-foreground">Status:</strong> <Badge>{order.status}</Badge></p>
            <p><strong className="text-foreground">Payment:</strong> {order.payment.provider} ({order.payment.status})</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {order.timeline.map((t, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="font-medium capitalize">{t.status}</p>
                  <p className="text-muted-foreground">{formatDate(t.at)}{t.note ? ` — ${t.note}` : ""}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
