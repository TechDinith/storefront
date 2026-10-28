"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { fetchOrdersByUser } from "@/lib/firebase/orders";
import type { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setLoading(false);
        return;
      }
      const data = await fetchOrdersByUser(u.uid);
      setOrders(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-16">Loading…</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">My orders</h1>
      {orders.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">No orders yet.</p>
          <Button className="mt-4" asChild>
            <Link href="/products">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => (
            <Card key={o.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="font-semibold">{o.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString()} · {o.items.length} item(s)
                  </p>
                  <p className="mt-1 font-medium">{formatCurrency(o.total, o.currency)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={o.status === "delivered" ? "default" : "secondary"}>{o.status}</Badge>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/account/orders/${o.id}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
