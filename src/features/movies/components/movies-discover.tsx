import { tmdb } from "@/services/tmdb";
import { MediaGrid } from "@/components/ui/media-grid";
import { Pagination } from "@/components/ui/pagination";
import { DiscoverFilters } from "@/components/ui/discover-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";
import { toMovieDiscoverParams, type DiscoverSearchParams } from "@/lib/discover-query";

export async function MoviesDiscover({
  searchParams,
}: {
  searchParams: DiscoverSearchParams;
}) {
  const params = toMovieDiscoverParams(searchParams);
  const [result, genreList] = await Promise.all([
    tmdb.movies.discover(params),
    tmdb.genres.getMovieGenres(),
  ]);

  return (
    <div className="space-y-6">
      <DiscoverFilters basePath="/movies" genres={genreList.genres} />

      {result.results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No movies match these filters"
          description="Try adjusting or clearing your filters to see more results."
          actionLabel="Clear filters"
          actionHref="/movies"
        />
      ) : (
        <>
          <MediaGrid
            mediaType="movie"
            items={result.results.map((m) => ({
              id: m.id,
              title: m.title,
              posterPath: m.poster_path,
              date: m.release_date,
              voteAverage: m.vote_average,
            }))}
          />
          <Pagination page={result.page} totalPages={result.total_pages} basePath="/movies" />
        </>
      )}
    </div>
  );
}
