import type { Metadata } from "next";
import { defaultLocale, getDictionary, hasLocale } from "@/lib/i18n";
import { WatchlistGrid } from "@/components/watchlist-grid";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/watchlist">): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = hasLocale(langParam) ? langParam : defaultLocale;
  const dict = getDictionary(lang);
  return { title: dict.watchlist.title, robots: { index: false } };
}

export default async function WatchlistPage({
  params,
}: PageProps<"/[lang]/watchlist">) {
  const { lang: langParam } = await params;
  const lang = hasLocale(langParam) ? langParam : defaultLocale;
  const dict = getDictionary(lang);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {dict.watchlist.title}
      </h1>
      <p className="mt-1 text-sm text-muted">{dict.watchlist.subtitle}</p>
      <div className="mt-8">
        <WatchlistGrid />
      </div>
    </div>
  );
}
