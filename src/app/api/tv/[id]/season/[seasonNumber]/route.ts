import { NextResponse } from "next/server";
import { tmdb } from "@/services/tmdb";
import { TMDBError } from "@/services/tmdb/client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; seasonNumber: string }> }
) {
  const { id, seasonNumber } = await params;
  try {
    const season = await tmdb.tv.getSeason(id, Number(seasonNumber));
    return NextResponse.json(season);
  } catch (err) {
    const status = err instanceof TMDBError ? err.status : 500;
    return NextResponse.json({ error: "Failed to load season" }, { status });
  }
}
