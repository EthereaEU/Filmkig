"use client";

import { useI18n } from "./i18n-provider";
import { useWatchlist } from "@/lib/watchlist";
import { BookmarkIcon } from "./icons";
import { cn } from "@/lib/utils";
import type { MediaType } from "@/lib/types";

export function WatchlistButton({
  id,
  type,
  title,
  year,
  posterPath,
}: {
  id: number;
  type: MediaType;
  title: string;
  year: string | null;
  posterPath: string | null;
}) {
  const { t } = useI18n();
  const { hydrated, has, toggle } = useWatchlist();
  const onList = hydrated && has(type, id);

  return (
    <button
      type="button"
      onClick={() => toggle({ id, type, title, year, posterPath })}
      aria-pressed={onList}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        onList
          ? "border-accent bg-accent text-accent-ink"
          : "border-line bg-surface text-foreground hover:border-accent/50"
      )}
    >
      <BookmarkIcon filled={onList} className="size-4" />
      {onList ? t("detail.onList") : t("detail.addToList")}
    </button>
  );
}
