"use client";

import { Plus, Check } from "lucide-react";
import { useWatchlist } from "@/features/watchlist/hooks/use-watchlist";
import { useToast } from "@/components/feedback/toast-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { MediaType } from "@/types/tmdb";

interface HeroWatchlistButtonProps {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
}

export function HeroWatchlistButton({
  id,
  mediaType,
  title,
  posterPath,
  releaseDate,
  voteAverage,
}: HeroWatchlistButtonProps) {
  const { isSaved, toggle } = useWatchlist();
  const { showToast } = useToast();
  const saved = isSaved(id, mediaType);

  const handleClick = () => {
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
        buttonVariants({ variant: "outline", size: "icon" }),
        "border-white/30 text-white hover:bg-white/10"
      )}
    >
      {saved ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
