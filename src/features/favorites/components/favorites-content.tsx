"use client";

import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/use-favorites";
import { SavedMediaGrid } from "@/components/ui/saved-media-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { SavedListToolbar, type SortValue } from "@/components/ui/saved-list-toolbar";
import { sortSavedItems, filterSavedItems } from "@/lib/saved-items";

export function FavoritesContent() {
  const { items, remove } = useFavorites();
  const [filter, setFilter] = useState<"all" | "movie" | "tv">("all");
  const [sort, setSort] = useState<SortValue>("added-desc");

  const visibleItems = useMemo(
    () => sortSavedItems(filterSavedItems(items, filter), sort),
    [items, filter, sort]
  );

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="No favorites yet"
        description="Mark movies and TV shows you love as favorites to find them here."
        actionLabel="Browse movies"
        actionHref="/movies"
      />
    );
  }

  return (
    <div className="space-y-6">
      <SavedListToolbar filter={filter} onFilterChange={setFilter} sort={sort} onSortChange={setSort} />
      <SavedMediaGrid items={visibleItems} onRemove={(item) => remove(item.id, item.mediaType)} />
    </div>
  );
}
