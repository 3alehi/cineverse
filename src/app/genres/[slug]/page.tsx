import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGenreBySlug } from "@/config/genres";
import { GenreContent } from "@/features/genres/components/genre-content";
import { MediaGridSkeleton } from "@/components/ui/media-grid";
import type { MediaType } from "@/types/tmdb";

export async function generateMetadata({
  params,
}: PageProps<"/genres/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const genre = getGenreBySlug(slug);
  if (!genre) return { title: "Genre" };
  return {
    title: genre.name,
    description: `Browse ${genre.name.toLowerCase()} movies and TV shows.`,
  };
}

export default async function GenrePage({
  params,
  searchParams,
}: PageProps<"/genres/[slug]">) {
  const { slug } = await params;
  const { type, page: pageParam } = await searchParams;

  const genre = getGenreBySlug(slug);
  if (!genre) notFound();

  const mediaType: MediaType = type === "tv" ? "tv" : "movie";
  const page = Number(pageParam) || 1;

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{genre.name}</h1>
      <Suspense
        key={`${mediaType}-${page}`}
        fallback={
          <div className="space-y-6">
            <div className="skeleton h-9 w-48 rounded-full" />
            <MediaGridSkeleton />
          </div>
        }
      >
        <GenreContent genre={genre} mediaType={mediaType} page={page} />
      </Suspense>
    </div>
  );
}
