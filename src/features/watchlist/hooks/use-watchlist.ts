"use client";

import { useSavedMediaList } from "@/hooks/use-saved-media-list";

const WATCHLIST_STORAGE_KEY = "cineverse-watchlist";

export function useWatchlist() {
  return useSavedMediaList(WATCHLIST_STORAGE_KEY);
}
