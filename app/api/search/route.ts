import type { NextRequest } from "next/server";
import { searchTitles } from "@/lib/tmdb";
import { hasLocale } from "@/lib/i18n";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const langParam = request.nextUrl.searchParams.get("lang") ?? "da";
  const locale = hasLocale(langParam) ? langParam : "da";

  if (q.length < 2 || q.length > 100) {
    return Response.json({ results: [] });
  }

  const results = await searchTitles(q, locale);

  return Response.json(
    { results },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
