import { tmdbConfig } from "@/config/tmdb";

export class TMDBError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly statusText: string
  ) {
    super(message);
    this.name = "TMDBError";
  }
}

type QueryValue = string | number | boolean | undefined;
export type QueryParams = Record<string, QueryValue>;

interface RequestOptions {
  params?: QueryParams;
  /** Next.js revalidation window in seconds. Defaults to 1 hour for semi-static data. */
  revalidate?: number | false;
  tags?: string[];
}

function buildQueryString(params?: QueryParams): string {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

/**
 * Centralized TMDB request function. All TMDB calls in the app must go
 * through this — never fetch TMDB URLs directly from components.
 */
export async function tmdbFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, revalidate = 3600, tags } = options;
  const url = `${tmdbConfig.baseUrl}${path}${buildQueryString({
    language: "en-US",
    ...params,
  })}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${tmdbConfig.accessToken}`,
      accept: "application/json",
    },
    next: revalidate === false ? { tags } : { revalidate, tags },
  });

  if (!response.ok) {
    throw new TMDBError(
      `TMDB request failed for ${path}`,
      response.status,
      response.statusText
    );
  }

  return response.json() as Promise<T>;
}
