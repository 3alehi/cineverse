import { tmdb } from "@/services/tmdb";
import { Hero } from "./hero";
import { MediaRail } from "@/components/ui/media-rail";
import type { MovieSummary, TVSummary } from "@/types/tmdb";
import { genres as genreService } from "@/services/tmdb/genres";

function toRailItems(items: (MovieSummary | TVSummary)[], mediaType: "movie" | "tv") {
  return items.map((item) => ({
    id: item.id,
    title: mediaType === "movie" ? (item as MovieSummary).title : (item as TVSummary).name,
    posterPath: item.poster_path,
    date: mediaType === "movie" ? (item as MovieSummary).release_date : (item as TVSummary).first_air_date,
    voteAverage: item.vote_average,
  }));
}

export async function HomeContent() {
  const [
    trendingMovies,
    popularMovies,
    popularTV,
    topRatedMovies,
    movieGenres,
  ] = await Promise.all([
    tmdb.movies.getTrending("day"),
    tmdb.movies.getPopular(),
    tmdb.tv.getPopular(),
    tmdb.movies.getTopRated(),
    genreService.getMovieGenres(),
  ]);

  const featured = trendingMovies.results[0];
  const featuredGenres = movieGenres.genres.filter((g) =>
    featured?.genre_ids.includes(g.id)
  );

  return (
    <div className="space-y-12 pb-16">
      {featured && (
        <Hero
          id={featured.id}
          mediaType="movie"
          title={featured.title}
          overview={featured.overview}
          backdropPath={featured.backdrop_path}
          posterPath={featured.poster_path}
          voteAverage={featured.vote_average}
          date={featured.release_date}
          genres={featuredGenres}
        />
      )}

      <div className="mx-auto max-w-[1600px] space-y-12 px-6 lg:px-10">
        <MediaRail
          title="Trending Today"
          items={toRailItems(trendingMovies.results, "movie")}
          mediaType="movie"
          viewAllHref="/trending"
        />
        <MediaRail
          title="Popular Movies"
          items={toRailItems(popularMovies.results, "movie")}
          mediaType="movie"
          viewAllHref="/movies"
        />
        <MediaRail
          title="Popular TV Shows"
          items={toRailItems(popularTV.results, "tv")}
          mediaType="tv"
          viewAllHref="/tv"
        />
        <MediaRail
          title="Top Rated Movies"
          items={toRailItems(topRatedMovies.results, "movie")}
          mediaType="movie"
          viewAllHref="/top-rated"
        />
      </div>
    </div>
  );
}
