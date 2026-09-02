import { Suspense } from "react";
import type { Metadata } from "next";
import { MoviesDiscover } from "@/features/movies/components/movies-discover";
import { DiscoverSkeleton } from "@/components/ui/discover-skeleton";

export const metadata: Metadata = {
  title: "Movies",
  description: "Browse and filter thousands of movies by genre, year, and rating.",
};

export default async function MoviesPage({
  searchParams,
}: PageProps<"/movies">) {
  const resolvedParams = await searchParams;

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Movies</h1>
      <Suspense
        key={JSON.stringify(resolvedParams)}
        fallback={<DiscoverSkeleton />}
      >
        <MoviesDiscover searchParams={resolvedParams} />
      </Suspense>
    </div>
  );
}
