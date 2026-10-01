import type { Metadata } from "next";
import { defaultLocale, getDictionary, hasLocale, t } from "@/lib/i18n";
import { searchTitles } from "@/lib/tmdb";
import { SearchBar } from "@/components/search-bar";
import { TitleGrid } from "@/components/title-grid";

export async function generateMetadata({
  searchParams,
}: PageProps<"/[lang]/search">): Promise<Metadata> {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  return {
    title: query ? `Søg: ${query}` : "Søg",
    robots: { index: false },
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: PageProps<"/[lang]/search">) {
  const { lang: langParam } = await params;
  const { q } = await searchParams;
  const lang = hasLocale(langParam) ? langParam : defaultLocale;
  const dict = getDictionary(lang);
  const query = (typeof q === "string" ? q : "").trim();

  const results = query ? await searchTitles(query, lang, 20) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl sm:hidden">
        <SearchBar size="lg" initialQuery={query} />
      </div>

      {query ? (
        <>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:mt-0">
            {t(dict, "search.resultsFor", { q: query })}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t(dict, "search.count", { n: results.length })}
          </p>
          {results.length > 0 ? (
            <div className="mt-6">
              <TitleGrid items={results} />
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
              <p className="font-medium text-foreground">
                {dict.search.noResults}
              </p>
              <p className="mt-1 text-sm text-muted">
                {dict.search.noResultsHint}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="mx-auto max-w-xl py-8">
          <SearchBar size="lg" autoFocus />
        </div>
      )}
    </div>
  );
}
