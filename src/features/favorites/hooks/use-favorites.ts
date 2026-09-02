"use client";

import { useSavedMediaList } from "@/hooks/use-saved-media-list";

const FAVORITES_STORAGE_KEY = "cineverse-favorites";

export function useFavorites() {
  return useSavedMediaList(FAVORITES_STORAGE_KEY);
}
