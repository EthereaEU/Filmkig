import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { defaultLocale, getDictionary, hasLocale } from "@/lib/i18n";
import { formatRating, titleSlug } from "@/lib/utils";
import { Poster } from "./poster";
import { StarIcon } from "./icons";
import type { TitleCardData } from "@/lib/types";

export async function TitleCard({ item }: { item: TitleCardData }) {
  const param = await rootLang();
  const lang = hasLocale(param) ? param : defaultLocale;
  const dict = getDictionary(lang);
  const rating = formatRating(item.rating);

  return (
    <Link
      href={`/${lang}/title/${item.type}/${titleSlug(item.id, item.title)}`}
      className="group block"
    >
      <div className="transition-transform duration-200 group-hover:-translate-y-1">
        <Poster path={item.posterPath} title={item.title} />
      </div>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-foreground group-hover:text-accent">
            {item.title}
          </h3>
          <p className="text-xs text-muted">
            {item.type === "movie" ? dict.search.movie : dict.search.tv}
            {item.year ? ` · ${item.year}` : ""}
          </p>
        </div>
        {rating && (
          <span className="mt-0.5 flex shrink-0 items-center gap-0.5 text-xs font-semibold text-star">
            <StarIcon /> {rating}
          </span>
        )}
      </div>
    </Link>
  );
}
