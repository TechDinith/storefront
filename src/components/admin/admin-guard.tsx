"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { isAdmin } from "@/lib/firebase/admin";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        // demo mode: allow if no firebase config
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
          setAllowed(true);
          return;
        }
        router.push("/admin/login");
        return;
      }
      const ok = await isAdmin(u.uid);
      if (!ok) router.push("/admin/login");
      else setAllowed(true);
    });
    // demo mode without auth
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAllowed(true);
    }
    return () => unsub();
  }, [router]);

  if (allowed === null) return <div className="p-8">Loading…</div>;
  if (!allowed) return null;
  return <>{children}</>;
}
