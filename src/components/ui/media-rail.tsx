import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MediaCard } from "./media-card";
import { MediaCardSkeleton } from "./media-card-skeleton";
import type { MediaType } from "@/types/tmdb";

interface RailItem {
  id: number;
  title: string;
  posterPath: string | null;
  date: string | null;
  voteAverage: number;
}

interface MediaRailProps {
  title: string;
  items: RailItem[];
  mediaType: MediaType;
  viewAllHref?: string;
}

export function MediaRail({ title, items, mediaType, viewAllHref }: MediaRailProps) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>

      <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <div key={item.id} className="w-[42vw] shrink-0 sm:w-[180px]">
            <MediaCard
              id={item.id}
              mediaType={mediaType}
              title={item.title}
              posterPath={item.posterPath}
              date={item.date}
              voteAverage={item.voteAverage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function MediaRailSkeleton({ title }: { title: string }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="flex gap-4 overflow-hidden pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-[42vw] shrink-0 sm:w-[180px]">
            <MediaCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
