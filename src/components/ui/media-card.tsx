import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { tmdbImage } from "@/config/tmdb";
import { formatRating, formatYear } from "@/lib/format";
import type { MediaType } from "@/types/tmdb";
import { cn } from "@/lib/cn";
import { MediaCardWatchlistButton } from "./media-card-watchlist-button";

export interface MediaCardProps {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  date: string | null;
  voteAverage: number;
  priority?: boolean;
  className?: string;
}

export function MediaCard({
  id,
  mediaType,
  title,
  posterPath,
  date,
  voteAverage,
  priority = false,
  className,
}: MediaCardProps) {
  const href = `/${mediaType === "movie" ? "movies" : "tv"}/${id}`;
  const poster = tmdbImage(posterPath, "w342");

  return (
    <Link
      href={href}
      className={cn(
        "group block w-full overflow-hidden rounded-lg outline-none",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        className
      )}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-surface">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 24vw, 180px"
            priority={priority}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-subtle-foreground">
            {title}
          </div>
        )}

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden="true"
        />

        <MediaCardWatchlistButton
          id={id}
          mediaType={mediaType}
          title={title}
          posterPath={posterPath}
          releaseDate={date}
          voteAverage={voteAverage}
        />

        {voteAverage > 0 && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
            {formatRating(voteAverage)}
          </span>
        )}
      </div>

      <div className="mt-2 space-y-0.5">
        <h3 className="line-clamp-1 text-sm font-medium text-foreground">
          {title}
        </h3>
        <p className="text-xs text-subtle-foreground">{formatYear(date)}</p>
      </div>
    </Link>
  );
}
