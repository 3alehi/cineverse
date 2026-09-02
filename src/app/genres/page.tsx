import Link from "next/link";
import type { Metadata } from "next";
import { genreCatalog } from "@/config/genres";

export const metadata: Metadata = {
  title: "Genres",
  description: "Browse movies and TV shows by genre.",
};

export default function GenresPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Genres</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {genreCatalog.map((genre) => (
          <Link
            key={genre.id}
            href={`/genres/${genre.slug}`}
            className="group flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-6 transition-colors hover:border-border-strong hover:bg-surface-hover"
          >
            <span className="text-base font-semibold text-foreground">{genre.name}</span>
            <span
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
