"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon, SearchX } from "lucide-react";
import { useSearchResults } from "../hooks/use-search-results";
import { MediaCard } from "@/components/ui/media-card";
import { MediaCardSkeleton } from "@/components/ui/media-card-skeleton";
import { PersonCard } from "./person-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import type { MovieSummary, TVSummary, PersonSummary } from "@/types/tmdb";

type Tab = "all" | "movie" | "tv" | "person";

const TABS: { value: Tab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Shows" },
  { value: "person", label: "People" },
];

export function SearchExperience({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [tab, setTab] = useState<Tab>("all");
  const { data, isLoading, isError, refetch, debouncedQuery } = useSearchResults(query);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (tab === "all") return data.results;
    return data.results.filter((r) => r.media_type === tab);
  }, [data, tab]);

  const counts = useMemo(() => {
    const base = { all: 0, movie: 0, tv: 0, person: 0 };
    if (!data) return base;
    for (const result of data.results) {
      base.all += 1;
      base[result.media_type] += 1;
    }
    return base;
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <SearchIcon
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, TV shows, and people..."
          aria-label="Search movies, TV shows, and people"
          className="h-12 pl-10 text-base"
          autoFocus
        />
      </div>

      {debouncedQuery && (
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                tab === t.value
                  ? "bg-accent-muted text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
              {data && <span className="ml-1.5 text-xs opacity-70">{counts[t.value]}</span>}
            </button>
          ))}
        </div>
      )}

      {!debouncedQuery && (
        <EmptyState
          icon={SearchIcon}
          title="Search CineVerse"
          description="Find your next favorite movie, TV show, or discover new actors and directors."
        />
      )}

      {debouncedQuery && isError && (
        <ErrorState
          title="Search failed"
          description="We couldn't complete your search. Please try again."
          onRetry={() => refetch()}
        />
      )}

      {debouncedQuery && isLoading && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <MediaCardSkeleton key={i} />
          ))}
        </div>
      )}

      {debouncedQuery && !isLoading && !isError && (
        <>
          <p className="text-sm text-muted-foreground">
            {filtered.length} result{filtered.length === 1 ? "" : "s"} for &ldquo;{debouncedQuery}&rdquo;
          </p>

          {filtered.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No results found"
              description="Try a different search term or check your spelling."
            />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filtered.map((result) => {
                if (result.media_type === "person") {
                  return <PersonCard key={`person-${result.id}`} person={result as PersonSummary} />;
                }
                if (result.media_type === "movie") {
                  const movie = result as MovieSummary;
                  return (
                    <MediaCard
                      key={`movie-${movie.id}`}
                      id={movie.id}
                      mediaType="movie"
                      title={movie.title}
                      posterPath={movie.poster_path}
                      date={movie.release_date}
                      voteAverage={movie.vote_average}
                    />
                  );
                }
                const show = result as TVSummary;
                return (
                  <MediaCard
                    key={`tv-${show.id}`}
                    id={show.id}
                    mediaType="tv"
                    title={show.name}
                    posterPath={show.poster_path}
                    date={show.first_air_date}
                    voteAverage={show.vote_average}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
