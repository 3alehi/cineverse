import type { SavedMediaItem } from "@/types/app";
import type { SortValue } from "@/components/ui/saved-list-toolbar";

export function filterSavedItems<T extends SavedMediaItem>(
  items: T[],
  filter: "all" | "movie" | "tv"
): T[] {
  if (filter === "all") return items;
  return items.filter((item) => item.mediaType === filter);
}

export function sortSavedItems<T extends SavedMediaItem>(items: T[], sort: SortValue): T[] {
  const sorted = [...items];
  switch (sort) {
    case "added-asc":
      return sorted.sort((a, b) => a.addedAt.localeCompare(b.addedAt));
    case "rating-desc":
      return sorted.sort((a, b) => b.voteAverage - a.voteAverage);
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "added-desc":
    default:
      return sorted.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  }
}
