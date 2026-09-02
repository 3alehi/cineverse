import { MediaGridSkeleton } from "@/components/ui/media-grid";

export function DiscoverSkeleton() {
  return (
    <div className="space-y-6">
      <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="skeleton h-3 w-16 rounded" />
            <div className="skeleton h-11 w-full rounded-md" />
          </div>
        ))}
      </div>
      <div className="skeleton h-11 w-full rounded-md sm:hidden" />
      <MediaGridSkeleton />
    </div>
  );
}
