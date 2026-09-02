import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tmdb } from "@/services/tmdb";
import { tmdbImage } from "@/config/tmdb";
import { TMDBError } from "@/services/tmdb/client";
import { TVDetails } from "@/features/tv/components/tv-details";
import { MovieDetailsSkeleton } from "@/features/movies/components/movie-details-skeleton";

export async function generateMetadata({
  params,
}: PageProps<"/tv/[id]">): Promise<Metadata> {
  const { id } = await params;
  try {
    const show = await tmdb.tv.getDetails(id);
    const backdrop = tmdbImage(show.backdrop_path, "w1280");
    return {
      title: show.name,
      description: show.overview || `Details, cast, and trailer for ${show.name}.`,
      openGraph: {
        title: show.name,
        description: show.overview,
        images: backdrop ? [{ url: backdrop }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: show.name,
        description: show.overview,
      },
    };
  } catch {
    return { title: "TV Show" };
  }
}

export default async function TVShowPage({ params }: PageProps<"/tv/[id]">) {
  const { id } = await params;

  try {
    await tmdb.tv.getDetails(id);
  } catch (err) {
    if (err instanceof TMDBError && err.status === 404) notFound();
    throw err;
  }

  return (
    <Suspense fallback={<MovieDetailsSkeleton />}>
      <TVDetails id={id} />
    </Suspense>
  );
}
