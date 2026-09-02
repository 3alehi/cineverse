"use client";

import { UserRound, LogOut, Bookmark, Heart, CheckCircle2, Clapperboard, Tv } from "lucide-react";
import { useAuth } from "@/features/authentication/providers/auth-provider";
import { useWatchlist } from "@/features/watchlist/hooks/use-watchlist";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { useWatched } from "@/features/watched/hooks/use-watched";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/format";

export function ProfileContent() {
  const { user, logout } = useAuth();
  const { items: watchlist } = useWatchlist();
  const { items: favorites } = useFavorites();
  const { items: watched } = useWatched();

  if (!user) {
    return (
      <EmptyState
        icon={UserRound}
        title="Sign in to view your profile"
        description="Track your watchlist, favorites, and watch history across sessions."
        actionLabel="Sign In"
        actionHref="/login"
      />
    );
  }

  const moviesWatched = watched.filter((item) => item.mediaType === "movie").length;
  const tvWatched = watched.filter((item) => item.mediaType === "tv").length;

  const stats = [
    { label: "Movies Watched", value: moviesWatched, icon: Clapperboard },
    { label: "TV Shows Watched", value: tvWatched, icon: Tv },
    { label: "Watchlist", value: watchlist.length, icon: Bookmark },
    { label: "Favorites", value: favorites.length, icon: Heart },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent-muted text-2xl font-bold text-accent">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-xs text-subtle-foreground">Member since {formatDate(user.createdAt)}</p>
        </div>
        <Button variant="outline" size="sm" onClick={logout} className="sm:ml-auto">
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5"
          >
            <stat.icon className="h-5 w-5 text-accent" aria-hidden="true" />
            <span className="text-2xl font-bold text-foreground">{stat.value}</span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      {watched.length === 0 && watchlist.length === 0 && favorites.length === 0 && (
        <EmptyState
          icon={CheckCircle2}
          title="Start building your library"
          description="Browse movies and TV shows, then save or mark them as watched to see your stats grow."
          actionLabel="Browse movies"
          actionHref="/movies"
        />
      )}
    </div>
  );
}
