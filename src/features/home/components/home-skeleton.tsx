import { HeroSkeleton } from "./hero-skeleton";
import { MediaRailSkeleton } from "@/components/ui/media-rail";

export function HomeSkeleton() {
  return (
    <div className="space-y-12 pb-16">
      <HeroSkeleton />
      <div className="mx-auto max-w-[1600px] space-y-12 px-6 lg:px-10">
        <MediaRailSkeleton title="Trending Today" />
        <MediaRailSkeleton title="Popular Movies" />
        <MediaRailSkeleton title="Popular TV Shows" />
        <MediaRailSkeleton title="Top Rated Movies" />
      </div>
    </div>
  );
}
