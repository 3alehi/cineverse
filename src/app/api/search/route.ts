import { NextResponse } from "next/server";
import { tmdb } from "@/services/tmdb";
import { TMDBError } from "@/services/tmdb/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  const page = Number(searchParams.get("page")) || 1;

  if (!query) {
    return NextResponse.json({ page: 1, results: [], total_pages: 0, total_results: 0 });
  }

  try {
    const results = await tmdb.search.multi(query, page);
    return NextResponse.json(results);
  } catch (err) {
    const status = err instanceof TMDBError ? err.status : 500;
    return NextResponse.json({ error: "Search failed" }, { status });
  }
}
