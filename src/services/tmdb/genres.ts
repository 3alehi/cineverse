import { tmdbFetch } from "./client";
import type { Genre } from "@/types/tmdb";

interface GenreListResponse {
  genres: Genre[];
}

export const genres = {
  getMovieGenres: () =>
    tmdbFetch<GenreListResponse>("/genre/movie/list", { revalidate: 604800 }),

  getTVGenres: () =>
    tmdbFetch<GenreListResponse>("/genre/tv/list", { revalidate: 604800 }),
};
