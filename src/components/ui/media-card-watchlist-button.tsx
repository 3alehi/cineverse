"use client";

import { Check, Plus } from "lucide-react";
import { useWatchlist } from "@/features/watchlist/hooks/use-watchlist";
import { useToast } from "@/components/feedback/toast-provider";
import { cn } from "@/lib/cn";
import type { MediaType } from "@/types/tmdb";

interface MediaCardWatchlistButtonProps {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
}

/** Quick-action overlay button on media cards — adds/removes without leaving the grid. */
export function MediaCardWatchlistButton({
  id,
  mediaType,
  title,
  posterPath,
  releaseDate,
  voteAverage,
}: MediaCardWatchlistButtonProps) {
  const { isSaved, toggle } = useWatchlist();
  const { showToast } = useToast();
  const saved = isSaved(id, mediaType);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({ id, mediaType, title, posterPath, releaseDate, voteAverage });
    showToast(saved ? "Removed from watchlist" : "Added to watchlist");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from Watchlist" : "Add to Watchlist"}
      className={cn(
        "absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-opacity hover:bg-black/85",
        "opacity-0 focus-visible:opacity-100 group-hover:opacity-100"
      )}
    >
      {saved ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
    </button>
  );
}
