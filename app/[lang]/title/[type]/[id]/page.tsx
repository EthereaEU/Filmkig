import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { defaultLocale, getDictionary, hasLocale, locales } from "@/lib/i18n";
import { getRecommendations, getTitleDetails, hasTmdb } from "@/lib/tmdb";
import { tmdbImage } from "@/lib/tmdb-image";
import { formatRating, parseIdParam, siteUrl, titleSlug } from "@/lib/utils";
import { Poster } from "@/components/poster";
import { ProvidersSection } from "@/components/providers-section";
import { TitleGrid } from "@/components/title-grid";
import { WatchlistButton } from "@/components/watchlist-button";
import { ShareButton } from "@/components/share-button";
import { StarIcon } from "@/components/icons";
import type { MediaType } from "@/lib/types";

function parseParams(type: string, idParam: string) {
  if (type !== "movie" && type !== "tv") return null;
  const id = parseIdParam(idParam);
  if (id == null) return null;
  return { type: type as MediaType, id };
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/title/[type]/[id]">): Promise<Metadata> {
  const { lang: langParam, type, id: idParam } = await params;
  const lang = hasLocale(langParam) ? langParam : defaultLocale;
  const parsed = parseParams(type, idParam);
  if (!parsed) return {};

  const title = await getTitleDetails(parsed.type, parsed.id, lang);
  if (!title) return {};

  const dict = getDictionary(lang);
  const typeLabel = parsed.type === "movie" ? dict.detail.movie : dict.detail.series;
  const canonical = `/${lang}/title/${parsed.type}/${titleSlug(parsed.id, title.title)}`;
  const ogImage = tmdbImage(title.backdropPath ?? title.posterPath, "w1280");

  return {
    title: `${title.title}${title.year ? ` (${title.year})` : ""} — ${typeLabel}`,
    description: title.overview ?? dict.hero.subtitle,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/title/${parsed.type}/${titleSlug(parsed.id, title.title)}`])
      ),
    },
    openGraph: {
      title: `${title.title} | Filmkig`,
      description: title.overview ?? dict.hero.subtitle,
      url: `${siteUrl()}${canonical}`,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function TitlePage({
  params,
}: PageProps<"/[lang]/title/[type]/[id]">) {
  const { lang: langParam, type, id: idParam } = await params;
  const lang = hasLocale(langParam) ? langParam : defaultLocale;
  const dict = getDictionary(lang);

  const parsed = parseParams(type, idParam);
  if (!parsed) notFound();

  const [title, recommendations] = await Promise.all([
    getTitleDetails(parsed.type, parsed.id, lang),
    getRecommendations(parsed.type, parsed.id, lang),
  ]);
  if (!title) notFound();

  const rating = formatRating(title.rating);
  const backdrop = tmdbImage(title.backdropPath, "w1280");
  const typeLabel = parsed.type === "movie" ? dict.detail.movie : dict.detail.series;
  const titleUrl = `${siteUrl()}/${lang}/title/${parsed.type}/${titleSlug(parsed.id, title.title)}`;

  const facts: string[] = [];
  if (title.year) facts.push(title.year);
  if (title.runtimeMinutes)
    facts.push(dict.detail.runtime.replace("{n}", String(title.runtimeMinutes)));
  if (title.seasons)
    facts.push(
      title.seasons === 1
        ? dict.detail.seasonOne
        : dict.detail.seasons.replace("{n}", String(title.seasons))
    );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": parsed.type === "movie" ? "Movie" : "TVSeries",
    name: title.title,
    image: tmdbImage(title.posterPath, "w500") ?? undefined,
    description: title.overview ?? undefined,
    datePublished: title.year ?? undefined,
    aggregateRating:
      title.rating && title.voteCount
        ? {
            "@type": "AggregateRating",
            ratingValue: title.rating,
            bestRating: 10,
            ratingCount: title.voteCount,
          }
        : undefined,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Backdrop */}
      <div className="relative h-44 overflow-hidden sm:h-64 lg:h-80">
        {backdrop ? (
          <>
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent-soft via-background to-background" />
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
          {/* Poster */}
          <div className="-mt-20 w-36 shrink-0 sm:-mt-24 sm:w-52 lg:w-60">
            <Poster
              path={title.posterPath}
              title={title.title}
              size="w500"
              sizes="(max-width: 640px) 144px, 240px"
              priority
              className="shadow-xl ring-1 ring-line"
            />
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1 pt-1 sm:pt-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              {typeLabel}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title.title}
            </h1>
            {title.originalTitle && title.originalTitle !== title.title && (
              <p className="mt-1 text-sm text-muted">
                {dict.detail.originalTitle}: {title.originalTitle}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted">
              {rating && (
                <span className="inline-flex items-center gap-1 font-semibold text-star">
                  <StarIcon className="size-3.5" /> {rating}
                  {title.voteCount ? (
                    <span className="font-normal text-muted">
                      ({dict.detail.minRating.replace("{n}", String(title.voteCount))})
                    </span>
                  ) : null}
                </span>
              )}
              {facts.map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>

            {title.genres.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {title.genres.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            {title.tagline && (
              <p className="mt-4 text-sm italic text-muted">{title.tagline}</p>
            )}
            {title.overview && (
              <p className="mt-3 max-w-2xl leading-relaxed text-foreground/90">
                {title.overview}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2.5">
              <WatchlistButton
                id={title.id}
                type={parsed.type}
                title={title.title}
                year={title.year}
                posterPath={title.posterPath}
              />
              <ShareButton title={title.title} />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-12">
          <ProvidersSection availability={title.availability} />
        </div>

        {/* Cast */}
        {title.cast.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
              {dict.detail.cast}
            </h2>
            <ul className="flex gap-4 overflow-x-auto scrollbar-thin pb-2">
              {title.cast.map((c) => (
                <li key={c.name} className="w-24 shrink-0">
                  <div className="relative aspect-square overflow-hidden rounded-full bg-surface-2">
                    {c.profilePath ? (
                      <Image
                        src={tmdbImage(c.profilePath, "w185")!}
                        alt={c.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex size-full items-center justify-center text-xl font-bold text-accent/50">
                        {c.name.slice(0, 1)}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 truncate text-center text-xs font-medium text-foreground">
                    {c.name}
                  </p>
                  {c.character && (
                    <p className="truncate text-center text-xs text-muted">
                      {c.character}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
              {dict.detail.moreLike}
            </h2>
            <TitleGrid items={recommendations} />
          </section>
        )}

        <p className="mt-10">
          <Link
            href={`/${lang}`}
            className="text-sm font-medium text-accent hover:underline"
          >
            ← {dict.errors.backHome}
          </Link>
        </p>
      </div>
    </article>
  );
}
