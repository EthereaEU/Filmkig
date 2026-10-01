const IMG_BASE = "https://image.tmdb.org/t/p";

export type TmdbImageSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "w1280"
  | "original";

/** Build a TMDB image URL. Client-safe — no secrets involved. */
export function tmdbImage(
  path: string | null,
  size: TmdbImageSize = "w342"
): string | null {
  return path ? `${IMG_BASE}/${size}${path}` : null;
}
