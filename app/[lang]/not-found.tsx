import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { defaultLocale, getDictionary, hasLocale } from "@/lib/i18n";

export default async function NotFound() {
  const param = await rootLang();
  const lang = hasLocale(param) ? param : defaultLocale;
  const dict = getDictionary(lang);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-bold tracking-tight text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
        {dict.errors.notFoundTitle}
      </h1>
      <p className="mt-2 text-muted">{dict.errors.notFoundHint}</p>
      <Link
        href={`/${lang}`}
        className="mt-8 inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
      >
        {dict.errors.backHome}
      </Link>
    </div>
  );
}
