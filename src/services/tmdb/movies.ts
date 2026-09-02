import { tmdbFetch } from "./client";
import type {
  Credits,
  DiscoverMovieParams,
  MovieDetails,
  MovieSummary,
  PaginatedResponse,
  TimeWindow,
  VideosResponse,
} from "@/types/tmdb";

export const movies = {
  getPopular: (page = 1) =>
    tmdbFetch<PaginatedResponse<MovieSummary>>("/movie/popular", {
      params: { page },
    }),

  getTopRated: (page = 1) =>
    tmdbFetch<PaginatedResponse<MovieSummary>>("/movie/top_rated", {
      params: { page },
    }),

  getNowPlaying: (page = 1) =>
    tmdbFetch<PaginatedResponse<MovieSummary>>("/movie/now_playing", {
      params: { page },
    }),

  getUpcoming: (page = 1) =>
    tmdbFetch<PaginatedResponse<MovieSummary>>("/movie/upcoming", {
      params: { page },
    }),

  getTrending: (timeWindow: TimeWindow = "day", page = 1) =>
    tmdbFetch<PaginatedResponse<MovieSummary>>(
      `/trending/movie/${timeWindow}`,
      { params: { page }, revalidate: 900 }
    ),

  getDetails: (id: number | string) =>
    tmdbFetch<MovieDetails>(`/movie/${id}`, { revalidate: 86400 }),

  getCredits: (id: number | string) =>
    tmdbFetch<Credits>(`/movie/${id}/credits`, { revalidate: 86400 }),

  getVideos: (id: number | string) =>
    tmdbFetch<VideosResponse>(`/movie/${id}/videos`, { revalidate: 86400 }),

  getSimilar: (id: number | string, page = 1) =>
    tmdbFetch<PaginatedResponse<MovieSummary>>(`/movie/${id}/similar`, {
      params: { page },
    }),

  getRecommendations: (id: number | string, page = 1) =>
    tmdbFetch<PaginatedResponse<MovieSummary>>(
      `/movie/${id}/recommendations`,
      { params: { page } }
    ),

  discover: (params: DiscoverMovieParams = {}) =>
    tmdbFetch<PaginatedResponse<MovieSummary>>("/discover/movie", {
      params: { sort_by: "popularity.desc", ...params },
      revalidate: 1800,
    }),
};
