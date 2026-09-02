import Image from "next/image";
import Link from "next/link";
import { Info, Play } from "lucide-react";
import { tmdbImage } from "@/config/tmdb";
import { Rating } from "@/components/ui/rating";
import { buttonVariants } from "@/components/ui/button";
import { formatYear } from "@/lib/format";
import { HeroWatchlistButton } from "./hero-watchlist-button";
import type { Genre } from "@/types/tmdb";

interface HeroProps {
  id: number;
  mediaType: "movie" | "tv";
  title: string;
  overview: string;
  backdropPath: string | null;
  posterPath: string | null;
  voteAverage: number;
  date: string | null;
  genres: Genre[];
  runtimeLabel?: string;
}

export function Hero({
  id,
  mediaType,
  title,
  overview,
  backdropPath,
  posterPath,
  voteAverage,
  date,
  genres,
  runtimeLabel,
}: HeroProps) {
  const backdrop = tmdbImage(backdropPath, "w1280");
  const detailsHref = `/${mediaType === "movie" ? "movies" : "tv"}/${id}`;

  return (
    <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden sm:h-[68vh]">
      {backdrop ? (
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="h-full w-full bg-surface" />
      )}

      <div
        className="absolute inset-0"
        style={{ background: "var(--scrim-gradient)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[var(--overlay-strong)] via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex h-full max-w-[1600px] flex-col justify-end px-6 pb-10 sm:pb-14 lg:px-10">
        <div className="max-w-xl space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
            <Rating value={voteAverage} size="sm" />
            <span aria-hidden="true">•</span>
            <span>{formatYear(date)}</span>
            {runtimeLabel && (
              <>
                <span aria-hidden="true">•</span>
                <span>{runtimeLabel}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
            {title}
          </h1>

          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {genres.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white/90"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="line-clamp-3 text-sm text-white/80 sm:text-base">
            {overview}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={detailsHref} className={buttonVariants({ size: "lg" })}>
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Watch Now
            </Link>
            <Link
              href={detailsHref}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              <Info className="h-4 w-4" aria-hidden="true" />
              More Details
            </Link>
            <HeroWatchlistButton
              id={id}
              mediaType={mediaType}
              title={title}
              posterPath={posterPath}
              releaseDate={date}
              voteAverage={voteAverage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
