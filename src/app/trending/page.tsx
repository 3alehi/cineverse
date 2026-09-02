import { Suspense } from "react";
import type { Metadata } from "next";
import { TrendingContent } from "@/features/home/components/trending-content";
import { DualGridSkeleton } from "@/components/ui/dual-grid-skeleton";
import type { TimeWindow } from "@/types/tmdb";

export const metadata: Metadata = {
  title: "Trending",
  description: "See what's trending in movies and TV shows today and this week.",
};

export default async function TrendingPage({ searchParams }: PageProps<"/trending">) {
  const { window: windowParam } = await searchParams;
  const timeWindow: TimeWindow = windowParam === "week" ? "week" : "day";

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Trending</h1>
      <Suspense
        key={timeWindow}
        fallback={<DualGridSkeleton firstTitle="Trending Movies" secondTitle="Trending TV Shows" />}
      >
        <TrendingContent timeWindow={timeWindow} />
      </Suspense>
    </div>
  );
}
