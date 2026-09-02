import type { DiscoverMovieParams, DiscoverTVParams, SortOption } from "@/types/tmdb";

export interface DiscoverSearchParams {
  page?: string;
  genre?: string;
  year?: string;
  rating?: string;
  sort?: string;
}

const SORT_MAP: Record<string, SortOption> = {
  "popularity.desc": "popularity.desc",
  "vote_average.desc": "vote_average.desc",
  "date.desc": "primary_release_date.desc",
  "date.asc": "primary_release_date.asc",
};

const TV_SORT_MAP: Record<string, SortOption> = {
  "popularity.desc": "popularity.desc",
  "vote_average.desc": "vote_average.desc",
  "date.desc": "first_air_date.desc",
  "date.asc": "first_air_date.asc",
};

export function toMovieDiscoverParams(
  searchParams: DiscoverSearchParams
): DiscoverMovieParams {
  const page = Number(searchParams.page) || 1;
  return {
    page,
    with_genres: searchParams.genre || undefined,
    primary_release_year: searchParams.year ? Number(searchParams.year) : undefined,
    "vote_average.gte": searchParams.rating ? Number(searchParams.rating) : undefined,
    sort_by: SORT_MAP[searchParams.sort ?? ""] ?? "popularity.desc",
  };
}

export function toTVDiscoverParams(
  searchParams: DiscoverSearchParams
): DiscoverTVParams {
  const page = Number(searchParams.page) || 1;
  return {
    page,
    with_genres: searchParams.genre || undefined,
    first_air_date_year: searchParams.year ? Number(searchParams.year) : undefined,
    "vote_average.gte": searchParams.rating ? Number(searchParams.rating) : undefined,
    sort_by: TV_SORT_MAP[searchParams.sort ?? ""] ?? "popularity.desc",
  };
}
