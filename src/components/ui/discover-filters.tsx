"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Select, type SelectOption } from "@/components/ui/select";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import type { Genre } from "@/types/tmdb";

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS: SelectOption[] = [
  { label: "All years", value: "" },
  ...Array.from({ length: 40 }, (_, i) => {
    const year = CURRENT_YEAR - i;
    return { label: String(year), value: String(year) };
  }),
];

const RATING_OPTIONS: SelectOption[] = [
  { label: "Any rating", value: "" },
  { label: "9+", value: "9" },
  { label: "8+", value: "8" },
  { label: "7+", value: "7" },
  { label: "6+", value: "6" },
  { label: "5+", value: "5" },
];

const SORT_OPTIONS: SelectOption[] = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Rating", value: "vote_average.desc" },
  { label: "Newest", value: "date.desc" },
  { label: "Oldest", value: "date.asc" },
];

interface DiscoverFiltersProps {
  basePath: string;
  genres: Genre[];
}

export function DiscoverFilters({ basePath, genres }: DiscoverFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const genreOptions: SelectOption[] = [
    { label: "All genres", value: "" },
    ...genres.map((g) => ({ label: g.name, value: String(g.id) })),
  ];

  const current = {
    genre: searchParams.get("genre") ?? "",
    year: searchParams.get("year") ?? "",
    rating: searchParams.get("rating") ?? "",
    sort: searchParams.get("sort") ?? "popularity.desc",
  };

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${basePath}?${params.toString()}`);
  };

  const fields = (
    <>
      <Select
        label="Genre"
        options={genreOptions}
        value={current.genre}
        onChange={(e) => updateParam("genre", e.target.value)}
      />
      <Select
        label="Year"
        options={YEAR_OPTIONS}
        value={current.year}
        onChange={(e) => updateParam("year", e.target.value)}
      />
      <Select
        label="Rating"
        options={RATING_OPTIONS}
        value={current.rating}
        onChange={(e) => updateParam("rating", e.target.value)}
      />
      <Select
        label="Sort by"
        options={SORT_OPTIONS}
        value={current.sort}
        onChange={(e) => updateParam("sort", e.target.value)}
      />
    </>
  );

  return (
    <>
      <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">{fields}</div>

      <div className="sm:hidden">
        <Button variant="secondary" onClick={() => setMobileOpen(true)} className="w-full">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
        </Button>
      </div>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} title="Filters">
        <div className="flex flex-col gap-4">{fields}</div>
      </Drawer>
    </>
  );
}
