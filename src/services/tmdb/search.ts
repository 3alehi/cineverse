import { tmdbFetch } from "./client";
import type {
  MovieSummary,
  MultiSearchResult,
  PaginatedResponse,
  PersonSummary,
  TVSummary,
} from "@/types/tmdb";

export const search = {
  multi: (query: string, page = 1) =>
    tmdbFetch<PaginatedResponse<MultiSearchResult>>("/search/multi", {
      params: { query, page, include_adult: false },
      revalidate: false,
    }),

  movies: (query: string, page = 1) =>
    tmdbFetch<PaginatedResponse<MovieSummary>>("/search/movie", {
      params: { query, page, include_adult: false },
      revalidate: false,
    }),

  tv: (query: string, page = 1) =>
    tmdbFetch<PaginatedResponse<TVSummary>>("/search/tv", {
      params: { query, page, include_adult: false },
      revalidate: false,
    }),

  people: (query: string, page = 1) =>
    tmdbFetch<PaginatedResponse<PersonSummary>>("/search/person", {
      params: { query, page, include_adult: false },
      revalidate: false,
    }),
};
