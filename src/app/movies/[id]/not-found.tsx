import { Film } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function MovieNotFound() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10">
      <EmptyState
        icon={Film}
        title="Movie not found"
        description="This movie doesn't exist or may have been removed."
        actionLabel="Browse movies"
        actionHref="/movies"
      />
    </div>
  );
}
