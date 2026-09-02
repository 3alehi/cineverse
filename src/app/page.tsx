import { Suspense } from "react";
import { HomeContent } from "@/features/home/components/home-content";
import { HomeSkeleton } from "@/features/home/components/home-skeleton";

export const revalidate = 900;

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
