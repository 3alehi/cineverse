import { MediaCard } from "./media-card";
import { MediaCardSkeleton } from "./media-card-skeleton";
import type { MediaType } from "@/types/tmdb";

interface GridItem {
  id: number;
  title: string;
  posterPath: string | null;
  date: string | null;
  voteAverage: number;
}

interface MediaGridProps {
  items: GridItem[];
  mediaType: MediaType;
}

export function MediaGrid({ items, mediaType }: MediaGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item) => (
        <MediaCard
          key={item.id}
          id={item.id}
          mediaType={mediaType}
          title={item.title}
          posterPath={item.posterPath}
          date={item.date}
          voteAverage={item.voteAverage}
        />
      ))}
    </div>
  );
}

export function MediaGridSkeleton({ count = 18 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <MediaCardSkeleton key={i} />
      ))}
    </div>
  );
}
