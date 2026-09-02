"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { MultiSearchResult, PaginatedResponse } from "@/types/tmdb";

export function useSearchResults(query: string) {
  const debouncedQuery = useDebouncedValue(query.trim(), 350);

  const result = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async (): Promise<PaginatedResponse<MultiSearchResult>> => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    },
    enabled: debouncedQuery.length > 0,
    staleTime: 60 * 1000,
  });

  return { ...result, debouncedQuery };
}
