import { defaultLocale, getDictionary, hasLocale } from "@/lib/i18n";
import { getTrending, hasTmdb } from "@/lib/tmdb";
import { SearchBar } from "@/components/search-bar";
import { TitleGrid } from "@/components/title-grid";
import { ServiceChips } from "@/components/service-chips";

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang: langParam } = await params;
  const lang = hasLocale(langParam) ? langParam : defaultLocale;
  const dict = getDictionary(lang);

  const [movies, series] = await Promise.all([
    getTrending("movie", lang, 10),
    getTrending("tv", lang, 10),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,var(--accent-soft),transparent)] opacity-70"
        />
        <div className="relative mx-auto max-w-3xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {dict.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            {dict.hero.subtitle}
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar size="lg" />
          </div>
          {!hasTmdb && (
            <p className="mx-auto mt-4 inline-block rounded-full border border-line bg-surface px-4 py-1.5 text-xs text-muted">
              {dict.errors.apiMissing}
            </p>
          )}
        </div>
      </section>

      {/* Trending */}
      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-4 sm:px-6">
        <section>
          <SectionHeader
            title={`${dict.trending.title} - ${dict.trending.movies}`}
            subtitle={dict.trending.subtitle}
          />
          <TitleGrid items={movies} />
        </section>

        <section>
          <SectionHeader
            title={`${dict.trending.title} - ${dict.trending.series}`}
          />
          <TitleGrid items={series} />
        </section>

        <section>
          <SectionHeader
            title={dict.services.title}
            subtitle={dict.services.subtitle}
          />
          <ServiceChips />
        </section>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}
