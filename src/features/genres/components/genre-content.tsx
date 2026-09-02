import { tmdb } from "@/services/tmdb";
import { MediaGrid } from "@/components/ui/media-grid";
import { MediaTypeTabs } from "@/components/ui/media-type-tabs";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";
import type { MediaType } from "@/types/tmdb";
import type { GenreConfig } from "@/config/genres";

interface GenreContentProps {
  genre: GenreConfig;
  mediaType: MediaType;
  page: number;
}

export async function GenreContent({ genre, mediaType, page }: GenreContentProps) {
  const basePath = `/genres/${genre.slug}`;

  const result =
    mediaType === "movie"
      ? await tmdb.movies.discover({ with_genres: String(genre.id), page })
      : await tmdb.tv.discover({ with_genres: String(genre.id), page });

  return (
    <div className="space-y-6">
      <MediaTypeTabs
        basePath={basePath}
        paramKey="type"
        active={mediaType}
        options={[
          { label: "Movies", value: "movie" },
          { label: "TV Shows", value: "tv" },
        ]}
      />

      {result.results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={`No ${mediaType === "movie" ? "movies" : "TV shows"} found`}
          description={`We couldn't find any ${genre.name.toLowerCase()} titles right now.`}
        />
      ) : (
        <>
          <MediaGrid
            mediaType={mediaType}
            items={result.results.map((item) => ({
              id: item.id,
              title: mediaType === "movie" ? (item as { title: string }).title : (item as { name: string }).name,
              posterPath: item.poster_path,
              date:
                mediaType === "movie"
                  ? (item as { release_date: string }).release_date
                  : (item as { first_air_date: string }).first_air_date,
              voteAverage: item.vote_average,
            }))}
          />
          <Pagination page={result.page} totalPages={result.total_pages} basePath={basePath} />
        </>
      )}
    </div>
  );
}
