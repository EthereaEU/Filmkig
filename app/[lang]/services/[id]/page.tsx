import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { defaultLocale, getDictionary, hasLocale, locales, t } from "@/lib/i18n";
import { discoverByProvider, getProvider } from "@/lib/tmdb";
import { parseIdParam } from "@/lib/utils";
import { ProviderMark } from "@/components/provider-mark";
import { TitleGrid } from "@/components/title-grid";

async function resolve(providerIdParam: string, langParam: string) {
  const id = parseIdParam(providerIdParam);
  if (id == null) return null;
  const lang = hasLocale(langParam) ? langParam : defaultLocale;
  const provider = await getProvider(id, lang);
  return provider ? { id, lang, provider } : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services/[id]">): Promise<Metadata> {
  const { lang: langParam, id } = await params;
  const resolved = await resolve(id, langParam);
  if (!resolved) return {};
  return {
    title: resolved.provider.name,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/services/${resolved.id}`])
      ),
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/[lang]/services/[id]">) {
  const { lang: langParam, id: idParam } = await params;
  const resolved = await resolve(idParam, langParam);
  if (!resolved) notFound();
  const { lang, provider } = resolved;
  const dict = getDictionary(lang);

  const [movies, series] = await Promise.all([
    discoverByProvider(provider.id, "movie", lang),
    discoverByProvider(provider.id, "tv", lang),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="flex items-center gap-4">
        <ProviderMark provider={provider} className="size-14 rounded-2xl text-xl" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {provider.name}
          </h1>
          <p className="mt-0.5 text-sm text-muted">{dict.services.poweredBy}</p>
        </div>
      </header>

      {movies.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">
            {t(dict, "services.moviesOn", { name: provider.name })}
          </h2>
          <TitleGrid items={movies} />
        </section>
      )}

      {series.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">
            {t(dict, "services.seriesOn", { name: provider.name })}
          </h2>
          <TitleGrid items={series} />
        </section>
      )}

      {movies.length === 0 && series.length === 0 && (
        <p className="mt-10 text-muted">{dict.search.noResults}</p>
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
  );
}
