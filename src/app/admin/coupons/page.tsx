/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { fetchCoupons, saveCoupon, deleteCoupon } from "@/lib/firebase/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [code, setCode] = useState("");
  const [type, setType] = useState<"percent" | "fixed">("percent");
  const [value, setValue] = useState(0);

  const load = async () => setCoupons(await fetchCoupons());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleAdd = async () => {
    if (!code) return;
    await saveCoupon({ code, type, value, minOrder: 0, active: true, usedCount: 0 });
    setCode("");
    setValue(0);
    toast.success("Coupon saved");
    await load();
  };

  const handleDelete = async (id: string) => {
    await deleteCoupon(id);
    toast.success("Deleted");
    await load();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Coupons</h1>

      <Card className="mt-6">
        <CardContent className="grid gap-4 p-6 sm:grid-cols-4">
          <div>
            <Label>Code</Label>
            <Input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
          </div>
          <div>
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => v && setType(v as "percent" | "fixed")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="percent">Percent</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Value</Label>
            <Input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
          </div>
          <div className="flex items-end">
            <Button onClick={handleAdd} className="w-full">
              <Plus className="mr-2 size-4" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-3">
        {coupons.map((c) => (
          <Card key={c.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">{c.code}</p>
                <p className="text-sm text-muted-foreground">
                  {c.type === "percent" ? `${c.value}% off` : `$${c.value} off`} · used {c.usedCount ?? 0}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}>
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
