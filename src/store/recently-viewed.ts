import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedState {
  ids: string[];
  add: (id: string) => void;
  clear: () => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) => {
        const next = [id, ...get().ids.filter((x) => x !== id)].slice(0, 8);
        set({ ids: next });
      },
      clear: () => set({ ids: [] }),
    }),
    { name: "recently-viewed" }
  )
);
