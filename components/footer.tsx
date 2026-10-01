import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { getDictionary, hasLocale, defaultLocale } from "@/lib/i18n";

export async function Footer() {
  const param = await rootLang();
  const lang = hasLocale(param) ? param : defaultLocale;
  const dict = getDictionary(lang);

  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link
              href={`/${lang}`}
              className="text-lg font-bold tracking-tight text-foreground"
            >
              Filmkig<span className="text-accent">.</span>
            </Link>
            <p className="mt-2 text-sm text-muted">{dict.footer.tagline}</p>
          </div>
          <nav className="flex gap-8 text-sm">
            <Link
              href={`/${lang}/watchlist`}
              className="text-muted transition-colors hover:text-foreground"
            >
              {dict.nav.watchlist}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="text-muted transition-colors hover:text-foreground"
            >
              {dict.nav.about}
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-1 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {dict.footer.data}{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-2 hover:underline"
            >
              TMDB
            </a>{" "}
            · {dict.footer.availability}{" "}
            <a
              href="https://www.justwatch.com/dk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-2 hover:underline"
            >
              JustWatch
            </a>
          </p>
          <p>{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
