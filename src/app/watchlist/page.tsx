import type { Metadata } from "next";
import { WatchlistContent } from "@/features/watchlist/components/watchlist-content";

export const metadata: Metadata = {
  title: "Watchlist",
  description: "Movies and TV shows you've saved to watch later.",
};

export default function WatchlistPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Watchlist</h1>
      <WatchlistContent />
    </div>
  );
}
