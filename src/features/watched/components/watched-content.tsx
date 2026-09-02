"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Trash2 } from "lucide-react";
import { useWatched } from "../hooks/use-watched";
import { EmptyState } from "@/components/ui/empty-state";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { tmdbImage } from "@/config/tmdb";
import { formatDate, formatYear } from "@/lib/format";

export function WatchedContent() {
  const { items, remove } = useWatched();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle2}
        title="Nothing watched yet"
        description="Mark movies and TV shows as watched from their details page to build your history here."
        actionLabel="Browse movies"
        actionHref="/movies"
      />
    );
  }

  return (
    <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
      {items.map((item) => {
        const href = `/${item.mediaType === "movie" ? "movies" : "tv"}/${item.id}`;
        const poster = tmdbImage(item.posterPath, "w185");

        return (
          <li key={`${item.mediaType}-${item.id}`} className="flex items-center gap-4 p-4">
            <Link href={href} className="relative aspect-[2/3] w-12 shrink-0 overflow-hidden rounded-md bg-surface-elevated sm:w-14">
              {poster ? (
                <Image src={poster} alt={item.title} fill sizes="56px" className="object-cover" />
              ) : null}
            </Link>

            <div className="min-w-0 flex-1 space-y-1">
              <Link href={href} className="line-clamp-1 text-sm font-medium text-foreground hover:text-accent">
                {item.title}
              </Link>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-subtle-foreground">
                <Badge variant="outline">{item.mediaType === "movie" ? "Movie" : "TV Show"}</Badge>
                <span>{formatYear(item.releaseDate)}</span>
                <span>Watched {formatDate(item.watchedAt)}</span>
              </div>
            </div>

            <Rating value={item.userRating ?? item.voteAverage} size="sm" className="shrink-0" />

            <button
              type="button"
              onClick={() => remove(item.id, item.mediaType)}
              aria-label={`Remove ${item.title} from watched`}
              className="shrink-0 rounded-md p-2 text-subtle-foreground hover:bg-surface-hover hover:text-error"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
