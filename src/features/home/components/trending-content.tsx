import { tmdb } from "@/services/tmdb";
import { MediaGrid } from "@/components/ui/media-grid";
import { MediaTypeTabs } from "@/components/ui/media-type-tabs";
import type { TimeWindow } from "@/types/tmdb";

export async function TrendingContent({ timeWindow }: { timeWindow: TimeWindow }) {
  const [movies, tv] = await Promise.all([
    tmdb.movies.getTrending(timeWindow),
    tmdb.tv.getTrending(timeWindow),
  ]);

  return (
    <div className="space-y-10">
      <MediaTypeTabs
        basePath="/trending"
        paramKey="window"
        active={timeWindow}
        options={[
          { label: "Today", value: "day" },
          { label: "This Week", value: "week" },
        ]}
      />

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Trending Movies</h2>
        <MediaGrid
          mediaType="movie"
          items={movies.results.map((m) => ({
            id: m.id,
            title: m.title,
            posterPath: m.poster_path,
            date: m.release_date,
            voteAverage: m.vote_average,
          }))}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Trending TV Shows</h2>
        <MediaGrid
          mediaType="tv"
          items={tv.results.map((show) => ({
            id: show.id,
            title: show.name,
            posterPath: show.poster_path,
            date: show.first_air_date,
            voteAverage: show.vote_average,
          }))}
        />
      </section>
    </div>
  );
}
