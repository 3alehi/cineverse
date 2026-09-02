import Image from "next/image";
import { UserRound } from "lucide-react";
import { tmdbImage } from "@/config/tmdb";
import type { PersonSummary } from "@/types/tmdb";

export function PersonCard({ person }: { person: PersonSummary }) {
  const photo = tmdbImage(person.profile_path, "w185");

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative aspect-square w-full overflow-hidden rounded-full bg-surface-elevated">
        {photo ? (
          <Image src={photo} alt={person.name} fill sizes="180px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UserRound className="h-8 w-8 text-subtle-foreground" aria-hidden="true" />
          </div>
        )}
      </div>
      <div>
        <p className="line-clamp-1 text-sm font-medium text-foreground">{person.name}</p>
        <p className="line-clamp-1 text-xs text-subtle-foreground">
          {person.known_for_department}
        </p>
      </div>
    </div>
  );
}
