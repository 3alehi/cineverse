import { tmdb } from "@/services/tmdb";
import { MediaGrid } from "@/components/ui/media-grid";

export async function TopRatedContent() {
  const [movies, tv] = await Promise.all([
    tmdb.movies.getTopRated(),
    tmdb.tv.getTopRated(),
  ]);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Top Rated Movies</h2>
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
        <h2 className="text-xl font-bold text-foreground">Top Rated TV Shows</h2>
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
