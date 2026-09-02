/** Static TMDB movie genre catalog with URL-friendly slugs, used for genre landing pages. */
export interface GenreConfig {
  id: number;
  name: string;
  slug: string;
}

export const genreCatalog: GenreConfig[] = [
  { id: 28, name: "Action", slug: "action" },
  { id: 12, name: "Adventure", slug: "adventure" },
  { id: 16, name: "Animation", slug: "animation" },
  { id: 35, name: "Comedy", slug: "comedy" },
  { id: 80, name: "Crime", slug: "crime" },
  { id: 99, name: "Documentary", slug: "documentary" },
  { id: 18, name: "Drama", slug: "drama" },
  { id: 14, name: "Fantasy", slug: "fantasy" },
  { id: 27, name: "Horror", slug: "horror" },
  { id: 9648, name: "Mystery", slug: "mystery" },
  { id: 10749, name: "Romance", slug: "romance" },
  { id: 878, name: "Science Fiction", slug: "science-fiction" },
  { id: 53, name: "Thriller", slug: "thriller" },
  { id: 10752, name: "War", slug: "war" },
  { id: 37, name: "Western", slug: "western" },
];

export function getGenreBySlug(slug: string): GenreConfig | undefined {
  return genreCatalog.find((genre) => genre.slug === slug);
}
