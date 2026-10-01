import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { defaultLocale, getDictionary, hasLocale } from "@/lib/i18n";
import { getProviders } from "@/lib/tmdb";
import { ProviderMark } from "./provider-mark";

/** Popular DK streaming services as linkable chips. */
export async function ServiceChips({ limit = 12 }: { limit?: number }) {
  const param = await rootLang();
  const lang = hasLocale(param) ? param : defaultLocale;
  const providers = (await getProviders(lang)).slice(0, limit);

  if (providers.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {providers.map((p) => (
        <Link
          key={p.id}
          href={`/${lang}/services/${p.id}`}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:shadow-sm"
        >
          <ProviderMark provider={p} size="sm" className="size-6 rounded-md text-xs" />
          {p.name}
        </Link>
      ))}
    </div>
  );
}
