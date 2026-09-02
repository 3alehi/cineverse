const requiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const tmdbConfig = {
  baseUrl: process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3",
  imageBaseUrl: process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p",
  get accessToken(): string {
    return requiredEnv("TMDB_API_READ_ACCESS_TOKEN");
  },
};

export type ImageSize =
  | "w92"
  | "w154"
  | "w185"
  | "w200"
  | "w300"
  | "w342"
  | "w400"
  | "w500"
  | "w780"
  | "w1280"
  | "original";

export function tmdbImage(
  path: string | null | undefined,
  size: ImageSize = "w500"
): string | null {
  if (!path) return null;
  return `${tmdbConfig.imageBaseUrl}/${size}${path}`;
}
