"use client";

import { useCallback, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";
import type { WatchedItem } from "@/types/app";
import type { MediaType } from "@/types/tmdb";

const WATCHED_STORAGE_KEY = "cineverse-watched";

export function useWatched() {
  const [items, setItems] = useState<WatchedItem[]>(() =>
    readStorage(WATCHED_STORAGE_KEY, [])
  );

  const persist = useCallback((next: WatchedItem[]) => {
    setItems(next);
    writeStorage(WATCHED_STORAGE_KEY, next);
  }, []);

  const isWatched = useCallback(
    (id: number, mediaType: MediaType) =>
      items.some((item) => item.id === id && item.mediaType === mediaType),
    [items]
  );

  const markWatched = useCallback(
    (item: Omit<WatchedItem, "addedAt" | "watchedAt" | "userRating">, userRating: number | null = null) => {
      if (isWatched(item.id, item.mediaType)) return;
      const now = new Date().toISOString();
      persist([
        { ...item, addedAt: now, watchedAt: now, userRating },
        ...items,
      ]);
    },
    [items, isWatched, persist]
  );

  const remove = useCallback(
    (id: number, mediaType: MediaType) => {
      persist(items.filter((item) => !(item.id === id && item.mediaType === mediaType)));
    },
    [items, persist]
  );

  return { items, isWatched, markWatched, remove };
}
