import { tmdbFetch } from "./client";
import type {
  Credits,
  DiscoverTVParams,
  PaginatedResponse,
  SeasonDetails,
  TimeWindow,
  TVDetails,
  TVSummary,
  VideosResponse,
} from "@/types/tmdb";

export const tv = {
  getPopular: (page = 1) =>
    tmdbFetch<PaginatedResponse<TVSummary>>("/tv/popular", {
      params: { page },
    }),

  getTopRated: (page = 1) =>
    tmdbFetch<PaginatedResponse<TVSummary>>("/tv/top_rated", {
      params: { page },
    }),

  getOnTheAir: (page = 1) =>
    tmdbFetch<PaginatedResponse<TVSummary>>("/tv/on_the_air", {
      params: { page },
    }),

  getAiringToday: (page = 1) =>
    tmdbFetch<PaginatedResponse<TVSummary>>("/tv/airing_today", {
      params: { page },
    }),

  getTrending: (timeWindow: TimeWindow = "day", page = 1) =>
    tmdbFetch<PaginatedResponse<TVSummary>>(`/trending/tv/${timeWindow}`, {
      params: { page },
      revalidate: 900,
    }),

  getDetails: (id: number | string) =>
    tmdbFetch<TVDetails>(`/tv/${id}`, { revalidate: 86400 }),

  getCredits: (id: number | string) =>
    tmdbFetch<Credits>(`/tv/${id}/credits`, { revalidate: 86400 }),

  getVideos: (id: number | string) =>
    tmdbFetch<VideosResponse>(`/tv/${id}/videos`, { revalidate: 86400 }),

  getSimilar: (id: number | string, page = 1) =>
    tmdbFetch<PaginatedResponse<TVSummary>>(`/tv/${id}/similar`, {
      params: { page },
    }),

  getRecommendations: (id: number | string, page = 1) =>
    tmdbFetch<PaginatedResponse<TVSummary>>(`/tv/${id}/recommendations`, {
      params: { page },
    }),

  getSeason: (id: number | string, seasonNumber: number) =>
    tmdbFetch<SeasonDetails>(`/tv/${id}/season/${seasonNumber}`, {
      revalidate: 86400,
    }),

  discover: (params: DiscoverTVParams = {}) =>
    tmdbFetch<PaginatedResponse<TVSummary>>("/discover/tv", {
      params: { sort_by: "popularity.desc", ...params },
      revalidate: 1800,
    }),
};
