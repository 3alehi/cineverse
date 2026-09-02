import Image from "next/image";
import { UserRound } from "lucide-react";
import { tmdbImage } from "@/config/tmdb";
import type { CastMember } from "@/types/tmdb";

export function CastRail({ cast }: { cast: CastMember[] }) {
  const topCast = cast.slice(0, 12);
  if (topCast.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Cast</h2>
      <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-2">
        {topCast.map((member) => {
          const photo = tmdbImage(member.profile_path, "w185");
          return (
            <div key={member.id} className="w-[110px] shrink-0 space-y-2">
              <div className="relative aspect-square w-full overflow-hidden rounded-full bg-surface-elevated">
                {photo ? (
                  <Image
                    src={photo}
                    alt={member.name}
                    fill
                    sizes="110px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <UserRound className="h-8 w-8 text-subtle-foreground" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="line-clamp-1 text-xs font-medium text-foreground">{member.name}</p>
                <p className="line-clamp-1 text-xs text-subtle-foreground">{member.character}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
