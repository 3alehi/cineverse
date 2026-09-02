import { Suspense } from "react";
import type { Metadata } from "next";
import { TVDiscover } from "@/features/tv/components/tv-discover";
import { DiscoverSkeleton } from "@/components/ui/discover-skeleton";

export const metadata: Metadata = {
  title: "TV Shows",
  description: "Browse and filter TV shows by genre, year, and rating.",
};

export default async function TVPage({ searchParams }: PageProps<"/tv">) {
  const resolvedParams = await searchParams;

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">TV Shows</h1>
      <Suspense
        key={JSON.stringify(resolvedParams)}
        fallback={<DiscoverSkeleton />}
      >
        <TVDiscover searchParams={resolvedParams} />
      </Suspense>
    </div>
  );
}
