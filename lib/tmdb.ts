import {
  demoByProvider,
  demoProvider,
  demoProviders,
  demoRecommendations,
  demoSearch,
  demoTitle,
  demoTrending,
} from "./demo";
import { tmdbLanguage, type Locale } from "./i18n";
import type {
  Availability,
  CastMember,
  MediaType,
  Offer,
  OfferKind,
  ProviderInfo,
  TitleCardData,
  TitleDetails,
} from "./types";

import { tmdbImage } from "./tmdb-image";

const API_BASE = "https://api.themoviedb.org/3";

const TOKEN = process.env.TMDB_API_READ_ACCESS_TOKEN;
const API_KEY = process.env.TMDB_API_KEY;

/** True when real TMDB credentials are configured. */
export const hasTmdb = Boolean(TOKEN || API_KEY);

export { tmdbImage };

// ---------- low-level fetch with Next.js data cache ----------

async function tmdbFetch<T>(
  path: string,
  params: Record<string, string> = {},
  revalidate: number
): Promise<T | null> {
  if (!hasTmdb) return null;

  const url = new URL(`${API_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  if (!TOKEN && API_KEY) url.searchParams.set("api_key", API_KEY);

  try {
    const res = await fetch(url, {
      headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ---------- raw TMDB response shapes (minimal) ----------

interface TmdbResult {
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  origin_country?: string[];
  original_language?: string;
}

interface TmdbProvider {
  provider_id: number;
  provider_name: string;
  logo_path?: string | null;
  display_priority?: number;
}

interface TmdbRegionProviders {
  link?: string;
  flatrate?: TmdbProvider[];
  flatrate_and_buy?: TmdbProvider[];
  ads?: TmdbProvider[];
  free?: TmdbProvider[];
  rent?: TmdbProvider[];
  buy?: TmdbProvider[];
}

interface TmdbDetails extends TmdbResult {
  tagline?: string;
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  genres?: Array<{ id: number; name: string }>;
}

// ---------- normalizers ----------

/** True when a title originates from Denmark (TMDB origin_country = DK). */
function isDanish(raw: TmdbResult): boolean {
  return raw.origin_country?.includes("DK") ?? raw.original_language === "da";
}

function toCard(raw: TmdbResult, type: MediaType): TitleCardData | null {
  const title = type === "movie" ? raw.title : raw.name;
  if (!title) return null;
  const date = type === "movie" ? raw.release_date : raw.first_air_date;
  return {
    id: raw.id,
    type,
    title,
    year: date ? date.slice(0, 4) : null,
    posterPath: raw.poster_path ?? null,
    backdropPath: raw.backdrop_path ?? null,
    rating: raw.vote_average && raw.vote_average > 0 ? raw.vote_average : null,
  };
}

function toAvailability(region: TmdbRegionProviders | undefined): Availability {
  const offers: Offer[] = [];
  const seen = new Set<string>();
  if (region) {
    const groups: Array<[TmdbProvider[] | undefined, OfferKind]> = [
      [region.flatrate, "flatrate"],
      [region.flatrate_and_buy, "flatrate"],
      [region.ads, "ads"],
      [region.free, "free"],
      [region.rent, "rent"],
      [region.buy, "buy"],
    ];
    for (const [list, kind] of groups) {
      for (const p of list ?? []) {
        const dedupeKey = `${kind}:${p.provider_id}`;
        if (seen.has(dedupeKey)) continue;
        seen.add(dedupeKey);
        offers.push({
          kind,
          provider: {
            id: p.provider_id,
            name: p.provider_name,
            logoPath: p.logo_path ?? null,
          },
        });
      }
    }
  }
  return { link: region?.link ?? null, offers };
}

// ---------- public API ----------

export async function searchTitles(
  query: string,
  locale: Locale,
  limit = 12
): Promise<TitleCardData[]> {
  const q = query.trim();
  if (!q) return [];
  if (!hasTmdb) return demoSearch(q).slice(0, limit);

  const data = await tmdbFetch<{ results?: TmdbResult[] }>(
    "/search/multi",
    {
      query: q,
      language: tmdbLanguage[locale],
      region: "DK",
      include_adult: "false",
      page: "1",
    },
    3600
  );

  return (data?.results ?? [])
    .filter((r): r is TmdbResult & { media_type: MediaType } =>
      ["movie", "tv"].includes(r.media_type ?? "")
    )
    .filter(isDanish)
    .map((r) => toCard(r, r.media_type))
    .filter((r): r is TitleCardData => r !== null)
    .slice(0, limit);
}

export async function getTrending(
  type: MediaType,
  locale: Locale,
  limit = 10
): Promise<TitleCardData[]> {
  if (!hasTmdb) return demoTrending(type, limit);

  const data = await tmdbFetch<{ results?: TmdbResult[] }>(
    `/discover/${type}`,
    {
      language: tmdbLanguage[locale],
      with_origin_country: "DK",
      sort_by: "popularity.desc",
    },
    3600
  );

  return (data?.results ?? [])
    .map((r) => toCard(r, type))
    .filter((r): r is TitleCardData => r !== null)
    .slice(0, limit);
}

export async function getTitleDetails(
  type: MediaType,
  id: number,
  locale: Locale
): Promise<TitleDetails | null> {
  if (!hasTmdb) return demoTitle(type, id, locale);

  const [details, providers, credits] = await Promise.all([
    tmdbFetch<TmdbDetails>(
      `/${type}/${id}`,
      { language: tmdbLanguage[locale] },
      86400
    ),
    tmdbFetch<{ results?: Record<string, TmdbRegionProviders> }>(
      `/${type}/${id}/watch/providers`,
      {},
      21600
    ),
    tmdbFetch<{ cast?: Array<{ name: string; character?: string; profile_path?: string | null }> }>(
      `/${type}/${id}/credits`,
      { language: tmdbLanguage[locale] },
      86400
    ),
  ]);

  if (!details) return null;

  const card = toCard(details, type);
  if (!card) return null;

  const cast: CastMember[] = (credits?.cast ?? [])
    .slice(0, 8)
    .map((c) => ({
      name: c.name,
      character: c.character ?? null,
      profilePath: c.profile_path ?? null,
    }));

  return {
    ...card,
    originalTitle:
      (type === "movie" ? details.original_title : details.original_name) ??
      null,
    tagline: details.tagline || null,
    overview: details.overview || null,
    genres: (details.genres ?? []).map((g) => g.name),
    runtimeMinutes:
      type === "movie"
        ? (details.runtime ?? null)
        : (details.episode_run_time?.[0] ?? null),
    seasons: details.number_of_seasons ?? null,
    episodes: details.number_of_episodes ?? null,
    voteCount: details.vote_count ?? null,
    cast,
    availability: toAvailability(providers?.results?.DK),
  };
}

export async function getProviders(locale: Locale): Promise<ProviderInfo[]> {
  if (!hasTmdb) return demoProviders;

  const [movies, tv] = await Promise.all([
    tmdbFetch<{ results?: TmdbProvider[] }>(
      "/watch/providers/movie",
      { language: tmdbLanguage[locale], watch_region: "DK" },
      604800
    ),
    tmdbFetch<{ results?: TmdbProvider[] }>(
      "/watch/providers/tv",
      { language: tmdbLanguage[locale], watch_region: "DK" },
      604800
    ),
  ]);

  const byId = new Map<number, ProviderInfo>();
  for (const p of [...(movies?.results ?? []), ...(tv?.results ?? [])]) {
    const existing = byId.get(p.provider_id);
    if (!existing || (p.display_priority ?? 99) < existing.displayPriority) {
      byId.set(p.provider_id, {
        id: p.provider_id,
        name: p.provider_name,
        logoPath: p.logo_path ?? null,
        displayPriority: p.display_priority ?? 99,
      });
    }
  }
  return [...byId.values()].sort((a, b) => a.displayPriority - b.displayPriority);
}

export async function getProvider(
  providerId: number,
  locale: Locale
): Promise<ProviderInfo | null> {
  if (!hasTmdb) return demoProvider(providerId);
  const providers = await getProviders(locale);
  return providers.find((p) => p.id === providerId) ?? null;
}

export async function discoverByProvider(
  providerId: number,
  type: MediaType,
  locale: Locale,
  limit = 18
): Promise<TitleCardData[]> {
  if (!hasTmdb) return demoByProvider(providerId, type);

  const data = await tmdbFetch<{ results?: TmdbResult[] }>(
    `/discover/${type}`,
    {
      language: tmdbLanguage[locale],
      watch_region: "DK",
      with_watch_providers: String(providerId),
      with_origin_country: "DK",
      sort_by: "popularity.desc",
      "vote_count.gte": "20",
    },
    21600
  );

  return (data?.results ?? [])
    .map((r) => toCard(r, type))
    .filter((r): r is TitleCardData => r !== null)
    .slice(0, limit);
}

export async function getRecommendations(
  type: MediaType,
  id: number,
  locale: Locale,
  limit = 8
): Promise<TitleCardData[]> {
  if (!hasTmdb) return demoRecommendations(id).slice(0, limit);

  const data = await tmdbFetch<{ results?: TmdbResult[] }>(
    `/${type}/${id}/recommendations`,
    { language: tmdbLanguage[locale], page: "1" },
    86400
  );

  return (data?.results ?? [])
    .filter(isDanish)
    .map((r) => toCard(r, type))
    .filter((r): r is TitleCardData => r !== null)
    .slice(0, limit);
}
