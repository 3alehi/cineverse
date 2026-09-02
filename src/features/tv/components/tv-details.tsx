import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Layers, Star } from "lucide-react";
import { tmdb } from "@/services/tmdb";
import { tmdbImage } from "@/config/tmdb";
import { formatDate, formatRating, formatRuntime, formatVoteCount } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { MediaActions } from "@/components/ui/media-actions";
import { TrailerButton } from "@/components/ui/trailer-button";
import { CastRail } from "@/components/ui/cast-rail";
import { MediaRail, MediaRailSkeleton } from "@/components/ui/media-rail";
import { SeasonSelector } from "./season-selector";
import { TMDBError } from "@/services/tmdb/client";

export async function TVDetails({ id }: { id: string }) {
  let show;
  try {
    show = await tmdb.tv.getDetails(id);
  } catch (err) {
    if (err instanceof TMDBError && err.status === 404) notFound();
    throw err;
  }

  const [credits, videos] = await Promise.all([
    tmdb.tv.getCredits(id),
    tmdb.tv.getVideos(id),
  ]);

  const trailer =
    videos.results.find((v) => v.type === "Trailer" && v.site === "YouTube" && v.official) ??
    videos.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ??
    null;

  const backdrop = tmdbImage(show.backdrop_path, "w1280");
  const poster = tmdbImage(show.poster_path, "w500");
  const episodeRuntime = show.episode_run_time[0];

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
              <Image src={poster} alt={show.name} fill sizes="224px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-center text-sm text-subtle-foreground">
                {show.name}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4 pt-2">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold text-foreground sm:text-4xl">{show.name}</h1>
              {show.tagline && (
                <p className="text-sm italic text-muted-foreground">{show.tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
                {formatRating(show.vote_average)}
                <span className="font-normal text-subtle-foreground">
                  ({formatVoteCount(show.vote_count)})
                </span>
              </span>
              <span>{formatDate(show.first_air_date)}</span>
              <span className="flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                {show.number_of_seasons} season{show.number_of_seasons === 1 ? "" : "s"} ·{" "}
                {show.number_of_episodes} episodes
              </span>
              {episodeRuntime && <span>{formatRuntime(episodeRuntime)} / ep</span>}
            </div>

            {show.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {show.genres.map((genre) => (
                  <Badge key={genre.id} variant="outline">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            <p className="max-w-2xl text-sm leading-relaxed text-foreground sm:text-base">
              {show.overview}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MediaActions
                id={show.id}
                mediaType="tv"
                title={show.name}
                posterPath={show.poster_path}
                releaseDate={show.first_air_date}
                voteAverage={show.vote_average}
              />
              <TrailerButton videoKey={trailer?.key ?? null} title={show.name} variant="outline" />
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          <CastRail cast={credits.cast} />

          <SeasonSelector tvId={show.id} seasons={show.seasons} />

          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Status" value={show.status} />
            {show.created_by.length > 0 && (
              <DetailItem
                label="Created By"
                value={show.created_by.map((c) => c.name).join(", ")}
              />
            )}
            <DetailItem label="Original Language" value={show.original_language.toUpperCase()} />
            {show.networks.length > 0 && (
              <DetailItem label="Network" value={show.networks.map((n) => n.name).join(", ")} />
            )}
          </section>

          <Suspense fallback={<MediaRailSkeleton title="Similar Shows" />}>
            <SimilarTV id={id} />
          </Suspense>

          <Suspense fallback={<MediaRailSkeleton title="Recommended" />}>
            <RecommendedTV id={id} />
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

async function SimilarTV({ id }: { id: string }) {
  const similar = await tmdb.tv.getSimilar(id);
  return (
    <MediaRail
      title="Similar Shows"
      mediaType="tv"
      items={similar.results.map((show) => ({
        id: show.id,
        title: show.name,
        posterPath: show.poster_path,
        date: show.first_air_date,
        voteAverage: show.vote_average,
      }))}
    />
  );
}

async function RecommendedTV({ id }: { id: string }) {
  const recommended = await tmdb.tv.getRecommendations(id);
  return (
    <MediaRail
      title="Recommended"
      mediaType="tv"
      items={recommended.results.map((show) => ({
        id: show.id,
        title: show.name,
        posterPath: show.poster_path,
        date: show.first_air_date,
        voteAverage: show.vote_average,
      }))}
    />
  );
}
