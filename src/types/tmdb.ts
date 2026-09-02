/**
 * Core TMDB API response types.
 * Shapes follow https://developer.themoviedb.org/reference
 */

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// ---------- Movies ----------

export interface MovieSummary {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  adult: boolean;
  video: boolean;
}

export interface MovieDetails extends Omit<MovieSummary, "genre_ids"> {
  genres: Genre[];
  runtime: number | null;
  tagline: string | null;
  status: string;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
}

// ---------- TV ----------

export interface TVSummary {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  origin_country: string[];
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  air_date: string | null;
  runtime: number | null;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface SeasonSummary {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episode_count: number;
  air_date: string | null;
  poster_path: string | null;
  vote_average: number;
}

export interface SeasonDetails extends SeasonSummary {
  episodes: Episode[];
}

export interface CreatedBy {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface TVDetails extends Omit<TVSummary, "genre_ids"> {
  genres: Genre[];
  tagline: string | null;
  status: string;
  homepage: string | null;
  in_production: boolean;
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number[];
  seasons: SeasonSummary[];
  created_by: CreatedBy[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  networks: ProductionCompany[];
  last_air_date: string | null;
}

// ---------- People / Credits ----------

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface PersonSummary {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  known_for: (MovieSummary | TVSummary)[];
}

export interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  also_known_as: string[];
  homepage: string | null;
}

// ---------- Videos ----------

export interface Video {
  id: string;
  key: string;
  name: string;
  site: "YouTube" | "Vimeo" | string;
  type: "Trailer" | "Teaser" | "Clip" | "Featurette" | string;
  official: boolean;
  size: number;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

// ---------- Search ----------

export type MultiSearchResult =
  | (MovieSummary & { media_type: "movie" })
  | (TVSummary & { media_type: "tv" })
  | (PersonSummary & { media_type: "person" });

// ---------- Discover params ----------

export type SortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "release_date.desc"
  | "release_date.asc"
  | "primary_release_date.desc"
  | "primary_release_date.asc"
  | "first_air_date.desc"
  | "first_air_date.asc";

export interface DiscoverMovieParams {
  page?: number;
  with_genres?: string;
  primary_release_year?: number;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  sort_by?: SortOption;
  with_original_language?: string;
}

export interface DiscoverTVParams {
  page?: number;
  with_genres?: string;
  first_air_date_year?: number;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  sort_by?: SortOption;
  with_original_language?: string;
}

export type TimeWindow = "day" | "week";
export type MediaType = "movie" | "tv";
