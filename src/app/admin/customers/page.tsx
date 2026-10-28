/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { fetchUsers, toggleUserBan } from "@/lib/firebase/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AdminCustomersPage() {
  const [users, setUsers] = useState<any[]>([]);

  const load = async () => setUsers(await fetchUsers());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleBan = async (uid: string, banned: boolean) => {
    await toggleUserBan(uid, banned);
    toast.success(banned ? "User banned" : "User unbanned");
    await load();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
      <div className="mt-6 space-y-3">
        {users.map((u: any) => (
          <Card key={u.uid}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">{u.name || u.email}</p>
                <p className="text-sm text-muted-foreground">{u.email}</p>
              </div>
              <div className="flex items-center gap-3">
                {u.banned && <Badge variant="destructive">Banned</Badge>}
                <Button
                  variant={u.banned ? "outline" : "destructive"}
                  size="sm"
                  onClick={() => handleBan(u.uid, !u.banned)}
                >
                  {u.banned ? "Unban" : "Ban"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
