"use client";

import { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "@/lib/firebase/orders";
import type { Order, OrderStatus } from "@/types/order";
import { formatCurrency, formatDate } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statuses: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchAllOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleStatus = async (id: string, status: OrderStatus) => {
    await updateOrderStatus(id, status);
    await load();
  };

  if (loading) return <div className="p-8">Loading…</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
      {orders.length === 0 ? (
        <p className="mt-6 text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <Card key={o.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{o.orderNumber}</CardTitle>
                <Badge>{o.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">{formatDate(o.createdAt)} · {o.items.length} items · {formatCurrency(o.total, o.currency)}</p>
                <p>{o.shippingAddress.firstName} {o.shippingAddress.lastName} — {o.shippingAddress.city}, {o.shippingAddress.country}</p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-muted-foreground">Update status:</span>
                  <Select
                    value={o.status}
                    onValueChange={(v) => v && handleStatus(o.id, v as OrderStatus)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
