import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { getDictionary, hasLocale, defaultLocale } from "@/lib/i18n";
import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { LangToggle } from "./lang-toggle";
import { HeaderMobileSearch } from "./header-mobile-search";
import { BookmarkIcon } from "./icons";

export async function Header() {
  const param = await rootLang();
  const lang = hasLocale(param) ? param : defaultLocale;
  const dict = getDictionary(lang);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Link
          href={`/${lang}`}
          className="flex shrink-0 items-baseline gap-0.5 text-xl font-bold tracking-tight text-foreground"
        >
          Filmkig
          <span className="text-accent">.</span>
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center sm:flex sm:max-w-md sm:mx-auto">
          <SearchBar size="md" />
        </div>

        <nav className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href={`/${lang}/watchlist`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <BookmarkIcon />
            <span className="hidden md:inline">{dict.nav.watchlist}</span>
          </Link>
          <ThemeToggle />
          <LangToggle />
        </nav>
      </div>
      <HeaderMobileSearch />
    </header>
  );
}
