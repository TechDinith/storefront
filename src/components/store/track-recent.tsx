"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/store/recently-viewed";

export function TrackRecent({ id }: { id: string }) {
  const add = useRecentlyViewed((s) => s.add);
  useEffect(() => {
    add(id);
  }, [id, add]);
  return null;
}
