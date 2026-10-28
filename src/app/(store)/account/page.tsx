"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, updateProfile, type User } from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push("/auth/login");
      else setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-16">Loading…</div>;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">My account</h1>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="mb-4">
            <ImageUpload
              label="Avatar"
              value={user.photoURL || ""}
              onChange={async (url) => {
                if (auth?.currentUser) {
                  await updateProfile(auth.currentUser, { photoURL: url });
                  await setDoc(doc(db, "users", auth.currentUser.uid), { avatarUrl: url }, { merge: true });
                }
                setUser({ ...user, photoURL: url } as User);
              }}
            />
          </div>
          <p><strong>Name:</strong> {user.displayName || "—"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <div className="pt-4 flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/account/orders">My orders</Link>
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                await signOut(auth);
                router.push("/");
              }}
            >
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
