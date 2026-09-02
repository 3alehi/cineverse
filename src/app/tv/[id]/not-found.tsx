import { Tv } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function TVNotFound() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10">
      <EmptyState
        icon={Tv}
        title="TV show not found"
        description="This series doesn't exist or may have been removed."
        actionLabel="Browse TV shows"
        actionHref="/tv"
      />
    </div>
  );
}
