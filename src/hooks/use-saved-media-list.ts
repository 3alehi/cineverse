"use client";

import { useCallback, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";
import type { SavedMediaItem } from "@/types/app";
import type { MediaType } from "@/types/tmdb";

/**
 * Shared local-storage-backed list for watchlist/favorites. Both features
 * store the same shape, just under different keys, so one hook covers both.
 *
 * These components are only ever rendered on client-only routes (behind
 * "use client" pages with no SSR content depending on this list), so lazily
 * reading localStorage during the initial render is safe here.
 */
export function useSavedMediaList(storageKey: string) {
  const [items, setItems] = useState<SavedMediaItem[]>(() =>
    readStorage(storageKey, [])
  );

  const persist = useCallback(
    (next: SavedMediaItem[]) => {
      setItems(next);
      writeStorage(storageKey, next);
    },
    [storageKey]
  );

  const isSaved = useCallback(
    (id: number, mediaType: MediaType) =>
      items.some((item) => item.id === id && item.mediaType === mediaType),
    [items]
  );

  const add = useCallback(
    (item: Omit<SavedMediaItem, "addedAt">) => {
      if (isSaved(item.id, item.mediaType)) return;
      persist([{ ...item, addedAt: new Date().toISOString() }, ...items]);
    },
    [items, isSaved, persist]
  );

  const remove = useCallback(
    (id: number, mediaType: MediaType) => {
      persist(items.filter((item) => !(item.id === id && item.mediaType === mediaType)));
    },
    [items, persist]
  );

  const toggle = useCallback(
    (item: Omit<SavedMediaItem, "addedAt">) => {
      if (isSaved(item.id, item.mediaType)) {
        remove(item.id, item.mediaType);
      } else {
        add(item);
      }
    },
    [isSaved, add, remove]
  );

  return { items, isSaved, add, remove, toggle };
}
