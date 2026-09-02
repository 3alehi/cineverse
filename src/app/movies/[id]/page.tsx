import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tmdb } from "@/services/tmdb";
import { tmdbImage } from "@/config/tmdb";
import { TMDBError } from "@/services/tmdb/client";
import { MovieDetails } from "@/features/movies/components/movie-details";
import { MovieDetailsSkeleton } from "@/features/movies/components/movie-details-skeleton";

export async function generateMetadata({
  params,
}: PageProps<"/movies/[id]">): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await tmdb.movies.getDetails(id);
    const backdrop = tmdbImage(movie.backdrop_path, "w1280");
    return {
      title: movie.title,
      description: movie.overview || `Details, cast, and trailer for ${movie.title}.`,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: backdrop ? [{ url: backdrop }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: movie.title,
        description: movie.overview,
      },
    };
  } catch {
    return { title: "Movie" };
  }
}

export default async function MoviePage({ params }: PageProps<"/movies/[id]">) {
  const { id } = await params;

  try {
    await tmdb.movies.getDetails(id);
  } catch (err) {
    if (err instanceof TMDBError && err.status === 404) notFound();
    throw err;
  }

  return (
    <Suspense fallback={<MovieDetailsSkeleton />}>
      <MovieDetails id={id} />
    </Suspense>
  );
}
