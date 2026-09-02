"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, X } from "lucide-react";
import { tmdbImage } from "@/config/tmdb";
import { formatRating, formatYear } from "@/lib/format";
import type { SavedMediaItem } from "@/types/app";

interface SavedMediaGridProps {
  items: SavedMediaItem[];
  onRemove: (item: SavedMediaItem) => void;
}

export function SavedMediaGrid({ items, onRemove }: SavedMediaGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item) => {
        const href = `/${item.mediaType === "movie" ? "movies" : "tv"}/${item.id}`;
        const poster = tmdbImage(item.posterPath, "w342");

        return (
          <div key={`${item.mediaType}-${item.id}`} className="group relative w-full">
            <button
              type="button"
              onClick={() => onRemove(item)}
              aria-label={`Remove ${item.title}`}
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/85 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <Link
              href={href}
              className="block overflow-hidden rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-surface">
                {poster ? (
                  <Image
                    src={poster}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 24vw, 180px"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-subtle-foreground">
                    {item.title}
                  </div>
                )}

                {item.voteAverage > 0 && (
                  <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
                    {formatRating(item.voteAverage)}
                  </span>
                )}
              </div>

              <div className="mt-2 space-y-0.5">
                <h3 className="line-clamp-1 text-sm font-medium text-foreground">{item.title}</h3>
                <p className="text-xs text-subtle-foreground">{formatYear(item.releaseDate)}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
