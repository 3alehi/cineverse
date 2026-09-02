"use client";

import { useMemo, useState } from "react";
import { Bookmark } from "lucide-react";
import { useWatchlist } from "../hooks/use-watchlist";
import { SavedMediaGrid } from "@/components/ui/saved-media-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { SavedListToolbar, type SortValue } from "@/components/ui/saved-list-toolbar";
import { sortSavedItems, filterSavedItems } from "@/lib/saved-items";

export function WatchlistContent() {
  const { items, remove } = useWatchlist();
  const [filter, setFilter] = useState<"all" | "movie" | "tv">("all");
  const [sort, setSort] = useState<SortValue>("added-desc");

  const visibleItems = useMemo(
    () => sortSavedItems(filterSavedItems(items, filter), sort),
    [items, filter, sort]
  );

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No titles here yet"
        description="Save movies and TV shows you want to watch later — they'll show up here."
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
