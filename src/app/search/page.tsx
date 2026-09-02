import type { Metadata } from "next";
import { SearchExperience } from "@/features/search/components/search-experience";

export const metadata: Metadata = {
  title: "Search",
  description: "Search movies, TV shows, and people on CineVerse.",
};

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const initialQuery = typeof q === "string" ? q : "";

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
      <SearchExperience initialQuery={initialQuery} />
    </div>
  );
}
