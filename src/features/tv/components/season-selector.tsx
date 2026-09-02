"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { tmdbImage } from "@/config/tmdb";
import { formatDate, formatRuntime } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { SeasonDetails, SeasonSummary } from "@/types/tmdb";

interface SeasonSelectorProps {
  tvId: number;
  seasons: SeasonSummary[];
}

export function SeasonSelector({ tvId, seasons }: SeasonSelectorProps) {
  const validSeasons = seasons.filter((s) => s.season_number > 0 || seasons.length === 1);
  const [activeSeason, setActiveSeason] = useState(
    validSeasons[0]?.season_number ?? 1
  );
  const [details, setDetails] = useState<SeasonDetails | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    startTransition(() => {
      fetch(`/api/tv/${tvId}/season/${activeSeason}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data: SeasonDetails | null) => {
          if (!cancelled) setDetails(data);
        })
        .catch(() => {
          if (!cancelled) setDetails(null);
        });
    });
    return () => {
      cancelled = true;
    };
  }, [tvId, activeSeason]);

  if (validSeasons.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Seasons</h2>

      <div className="scrollbar-thin flex gap-2 overflow-x-auto pb-1">
        {validSeasons.map((season) => (
          <button
            key={season.id}
            type="button"
            onClick={() => setActiveSeason(season.season_number)}
            aria-pressed={activeSeason === season.season_number}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeSeason === season.season_number
                ? "border-accent bg-accent-muted text-accent"
                : "border-border-strong text-muted-foreground hover:text-foreground"
            )}
          >
            {season.name}
          </button>
        ))}
      </div>

      <div className={cn("space-y-3 transition-opacity", isPending && "opacity-60")}>
        {details?.episodes.length ? (
          details.episodes.map((episode) => {
            const still = tmdbImage(episode.still_path, "w300");
            return (
              <div
                key={episode.id}
                className="flex gap-4 rounded-lg border border-border bg-surface p-3"
              >
                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md bg-surface-elevated sm:w-40">
                  {still ? (
                    <Image src={still} alt={episode.name} fill sizes="160px" className="object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-xs font-medium text-subtle-foreground">
                      E{episode.episode_number}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">{episode.name}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-subtle-foreground">
                    <span>{formatDate(episode.air_date)}</span>
                    {episode.runtime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {formatRuntime(episode.runtime)}
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                    {episode.overview || "No overview available."}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground">Loading episodes…</p>
        )}
      </div>
    </section>
  );
}
