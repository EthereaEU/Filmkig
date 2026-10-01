"use client";

import Link from "next/link";
import { useI18n } from "./i18n-provider";
import { useWatchlist } from "@/lib/watchlist";
import { Poster } from "./poster";
import { titleSlug } from "@/lib/utils";

export function WatchlistGrid() {
  const { lang, t } = useI18n();
  const { items, hydrated, remove } = useWatchlist();

  if (!hydrated) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton aspect-[2/3] rounded-xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
        <p className="text-lg font-medium text-foreground">
          {t("watchlist.empty")}
        </p>
        <p className="mt-1 text-sm text-muted">{t("watchlist.emptyHint")}</p>
        <Link
          href={`/${lang}`}
          className="mt-5 inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
        >
          {t("watchlist.browse")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <div key={`${item.type}-${item.id}`} className="group relative">
          <Link
            href={`/${lang}/title/${item.type}/${titleSlug(item.id, item.title)}`}
            className="block"
          >
            <div className="transition-transform duration-200 group-hover:-translate-y-1">
              <Poster path={item.posterPath} title={item.title} />
            </div>
            <div className="mt-2">
              <h3 className="truncate text-sm font-medium text-foreground group-hover:text-accent">
                {item.title}
              </h3>
              <p className="text-xs text-muted">
                {t(`search.${item.type}`)}
                {item.year ? ` · ${item.year}` : ""}
              </p>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => remove(item.type, item.id)}
            aria-label={t("watchlist.remove")}
            className="absolute right-1.5 top-1.5 rounded-full bg-background/80 p-1.5 text-muted opacity-0 backdrop-blur transition-opacity hover:text-foreground focus:opacity-100 group-hover:opacity-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-3.5"
              aria-hidden
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
