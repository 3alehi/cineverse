"use client";

import { Bookmark, Check, Heart, Share2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useWatchlist } from "@/features/watchlist/hooks/use-watchlist";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { useWatched } from "@/features/watched/hooks/use-watched";
import { useToast } from "@/components/feedback/toast-provider";
import { cn } from "@/lib/cn";
import type { MediaType } from "@/types/tmdb";

interface MediaActionsProps {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
}

export function MediaActions({
  id,
  mediaType,
  title,
  posterPath,
  releaseDate,
  voteAverage,
}: MediaActionsProps) {
  const { isSaved: inWatchlist, toggle: toggleWatchlist } = useWatchlist();
  const { isSaved: inFavorites, toggle: toggleFavorites } = useFavorites();
  const { isWatched, markWatched } = useWatched();
  const { showToast } = useToast();

  const item = {
    id,
    mediaType,
    title,
    posterPath,
    releaseDate,
    voteAverage,
  };

  const saved = inWatchlist(id, mediaType);
  const favorited = inFavorites(id, mediaType);
  const watched = isWatched(id, mediaType);

  const handleWatchlist = () => {
    toggleWatchlist(item);
    showToast(saved ? "Removed from watchlist" : "Added to watchlist");
  };

  const handleFavorite = () => {
    toggleFavorites(item);
    showToast(favorited ? "Removed from favorites" : "Added to favorites");
  };

  const handleWatched = () => {
    if (watched) return;
    markWatched(item);
    showToast("Marked as watched");
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard");
    } catch {
      // user cancelled the native share sheet — no feedback needed
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleWatchlist}
        aria-pressed={saved}
        className={cn(
          buttonVariants({ variant: saved ? "primary" : "secondary" })
        )}
      >
        <Bookmark className={cn("h-4 w-4", saved && "fill-current")} aria-hidden="true" />
        {saved ? "In Watchlist" : "Add to Watchlist"}
      </button>

      <button
        type="button"
        onClick={handleFavorite}
        aria-pressed={favorited}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <Heart className={cn("h-4 w-4", favorited && "fill-error text-error")} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={handleWatched}
        disabled={watched}
        aria-label={watched ? "Watched" : "Mark as watched"}
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <Check className={cn("h-4 w-4", watched && "text-success")} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={handleShare}
        aria-label="Share"
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <Share2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
