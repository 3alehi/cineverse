import { tmdbFetch } from "./client";
import type { MovieSummary, PersonDetails, TVSummary } from "@/types/tmdb";

interface PersonMovieCredits {
  cast: (MovieSummary & { character: string })[];
  crew: (MovieSummary & { job: string })[];
}

interface PersonTVCredits {
  cast: (TVSummary & { character: string })[];
  crew: (TVSummary & { job: string })[];
}

export const people = {
  getDetails: (id: number | string) =>
    tmdbFetch<PersonDetails>(`/person/${id}`, { revalidate: 86400 }),

  getMovieCredits: (id: number | string) =>
    tmdbFetch<PersonMovieCredits>(`/person/${id}/movie_credits`, {
      revalidate: 86400,
    }),

  getTVCredits: (id: number | string) =>
    tmdbFetch<PersonTVCredits>(`/person/${id}/tv_credits`, {
      revalidate: 86400,
    }),
};
