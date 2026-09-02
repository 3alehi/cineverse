import type { Metadata } from "next";
import { WatchedContent } from "@/features/watched/components/watched-content";

export const metadata: Metadata = {
  title: "Watched",
  description: "Your movie and TV show watch history.",
};

export default function WatchedPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Watched</h1>
      <WatchedContent />
    </div>
  );
}
