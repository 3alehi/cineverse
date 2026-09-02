import type { MediaType } from "./tmdb";

/** Minimal shape stored locally for a saved title, enough to render a MediaCard without refetching. */
export interface SavedMediaItem {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
  addedAt: string;
}

export interface WatchedItem extends SavedMediaItem {
  watchedAt: string;
  userRating: number | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
}
