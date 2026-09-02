import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Clock, Star } from "lucide-react";
import { tmdb } from "@/services/tmdb";
import { tmdbImage } from "@/config/tmdb";
import { formatCurrency, formatDate, formatRating, formatRuntime, formatVoteCount } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { MediaActions } from "@/components/ui/media-actions";
import { TrailerButton } from "@/components/ui/trailer-button";
import { CastRail } from "@/components/ui/cast-rail";
import { MediaRail, MediaRailSkeleton } from "@/components/ui/media-rail";
import { TMDBError } from "@/services/tmdb/client";

export async function MovieDetails({ id }: { id: string }) {
  let movie;
  try {
    movie = await tmdb.movies.getDetails(id);
  } catch (err) {
    if (err instanceof TMDBError && err.status === 404) notFound();
    throw err;
  }

  const [credits, videos] = await Promise.all([
    tmdb.movies.getCredits(id),
    tmdb.movies.getVideos(id),
  ]);

  const trailer =
    videos.results.find((v) => v.type === "Trailer" && v.site === "YouTube" && v.official) ??
    videos.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ??
    null;

  const backdrop = tmdbImage(movie.backdrop_path, "w1280");
  const poster = tmdbImage(movie.poster_path, "w500");
  const director = credits.crew.find((c) => c.job === "Director");

  return (
    <div className="pb-16">
      <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden sm:h-[56vh]">
        {backdrop ? (
          <Image src={backdrop} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="h-full w-full bg-surface" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "var(--scrim-gradient)" }}
          aria-hidden="true"
        />
      </section>

      <div className="mx-auto -mt-24 max-w-[1600px] px-6 sm:-mt-32 lg:px-10">
        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="relative mx-auto -mt-4 aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-elevated)] sm:mx-0 sm:w-56">
            {poster ? (
              <Image src={poster} alt={movie.title} fill sizes="224px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-center text-sm text-subtle-foreground">
                {movie.title}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4 pt-2">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold text-foreground sm:text-4xl">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-sm italic text-muted-foreground">{movie.tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
                {formatRating(movie.vote_average)}
                <span className="font-normal text-subtle-foreground">
                  ({formatVoteCount(movie.vote_count)})
                </span>
              </span>
              <span>{formatDate(movie.release_date)}</span>
              {movie.runtime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatRuntime(movie.runtime)}
                </span>
              )}
            </div>

            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="outline">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            <p className="max-w-2xl text-sm leading-relaxed text-foreground sm:text-base">
              {movie.overview}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MediaActions
                id={movie.id}
                mediaType="movie"
                title={movie.title}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
                voteAverage={movie.vote_average}
              />
              <TrailerButton videoKey={trailer?.key ?? null} title={movie.title} variant="outline" />
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          <CastRail cast={credits.cast} />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Status" value={movie.status} />
            {director && <DetailItem label="Director" value={director.name} />}
            <DetailItem
              label="Original Language"
              value={movie.original_language.toUpperCase()}
            />
            {movie.budget > 0 && (
              <DetailItem label="Budget" value={formatCurrency(movie.budget)} />
            )}
            {movie.revenue > 0 && (
              <DetailItem label="Revenue" value={formatCurrency(movie.revenue)} />
            )}
            {movie.production_companies.length > 0 && (
              <DetailItem
                label="Production"
                value={movie.production_companies.map((c) => c.name).join(", ")}
              />
            )}
          </section>

          <Suspense fallback={<MediaRailSkeleton title="Similar Movies" />}>
            <SimilarMovies id={id} />
          </Suspense>

          <Suspense fallback={<MediaRailSkeleton title="Recommended" />}>
            <RecommendedMovies id={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-subtle-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}

async function SimilarMovies({ id }: { id: string }) {
  const similar = await tmdb.movies.getSimilar(id);
  return (
    <MediaRail
      title="Similar Movies"
      mediaType="movie"
      items={similar.results.map((m) => ({
        id: m.id,
        title: m.title,
        posterPath: m.poster_path,
        date: m.release_date,
        voteAverage: m.vote_average,
      }))}
    />
  );
}

async function RecommendedMovies({ id }: { id: string }) {
  const recommended = await tmdb.movies.getRecommendations(id);
  return (
    <MediaRail
      title="Recommended"
      mediaType="movie"
      items={recommended.results.map((m) => ({
        id: m.id,
        title: m.title,
        posterPath: m.poster_path,
        date: m.release_date,
        voteAverage: m.vote_average,
      }))}
    />
  );
}
