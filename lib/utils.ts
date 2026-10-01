export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** "Fight Club" -> "fight-club" — readable, ASCII-safe slugs for title URLs. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[æ]/g, "ae")
    .replace(/[ø]/g, "o")
    .replace(/[å]/g, "a")
    .replace(/[éè]/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleSlug(id: number, title: string): string {
  const slug = slugify(title);
  return slug ? `${id}-${slug}` : String(id);
}

/** Extract the numeric TMDB/demo id from an `[id]-[slug]` param. */
export function parseIdParam(param: string): number | null {
  const match = /^(\d+)/.exec(param);
  return match ? Number(match[1]) : null;
}

export function formatRating(rating: number | null): string | null {
  if (rating == null || rating <= 0) return null;
  return rating.toFixed(1).replace(".", ",");
}

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://filmkig.dk";
}
