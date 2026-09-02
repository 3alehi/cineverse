import { Suspense } from "react";
import type { Metadata } from "next";
import { PopularContent } from "@/features/home/components/popular-content";
import { DualGridSkeleton } from "@/components/ui/dual-grid-skeleton";

export const metadata: Metadata = {
  title: "Popular",
  description: "Explore the most popular movies and TV shows right now.",
};

export const revalidate = 3600;

export default function PopularPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Popular</h1>
      <Suspense fallback={<DualGridSkeleton firstTitle="Popular Movies" secondTitle="Popular TV Shows" />}>
        <PopularContent />
      </Suspense>
    </div>
  );
}
