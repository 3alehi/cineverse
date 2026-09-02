import { Suspense } from "react";
import type { Metadata } from "next";
import { TopRatedContent } from "@/features/home/components/top-rated-content";
import { DualGridSkeleton } from "@/components/ui/dual-grid-skeleton";

export const metadata: Metadata = {
  title: "Top Rated",
  description: "The highest rated movies and TV shows of all time.",
};

export const revalidate = 3600;

export default function TopRatedPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Top Rated</h1>
      <Suspense fallback={<DualGridSkeleton firstTitle="Top Rated Movies" secondTitle="Top Rated TV Shows" />}>
        <TopRatedContent />
      </Suspense>
    </div>
  );
}
