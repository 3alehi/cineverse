import { tmdb } from "@/services/tmdb";
import { MediaGrid } from "@/components/ui/media-grid";
import { Pagination } from "@/components/ui/pagination";
import { DiscoverFilters } from "@/components/ui/discover-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";
import { toTVDiscoverParams, type DiscoverSearchParams } from "@/lib/discover-query";

export async function TVDiscover({
  searchParams,
}: {
  searchParams: DiscoverSearchParams;
}) {
  const params = toTVDiscoverParams(searchParams);
  const [result, genreList] = await Promise.all([
    tmdb.tv.discover(params),
    tmdb.genres.getTVGenres(),
  ]);

  return (
    <div className="space-y-6">
      <DiscoverFilters basePath="/tv" genres={genreList.genres} />

      {result.results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No TV shows match these filters"
          description="Try adjusting or clearing your filters to see more results."
          actionLabel="Clear filters"
          actionHref="/tv"
        />
      ) : (
        <>
          <MediaGrid
            mediaType="tv"
            items={result.results.map((show) => ({
              id: show.id,
              title: show.name,
              posterPath: show.poster_path,
              date: show.first_air_date,
              voteAverage: show.vote_average,
            }))}
          />
          <Pagination page={result.page} totalPages={result.total_pages} basePath="/tv" />
        </>
      )}
    </div>
  );
}
