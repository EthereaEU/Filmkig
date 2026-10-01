"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "./i18n-provider";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = { da: "DA", en: "EN" };

export function LangToggle() {
  const { lang, t } = useI18n();
  const pathname = usePathname();

  function remember(locale: Locale) {
    document.cookie = `filmkig-lang=${locale};path=/;max-age=31536000;SameSite=Lax`;
  }

  return (
    <nav
      aria-label={t("lang.label")}
      className="flex items-center rounded-full border border-line bg-surface p-0.5 text-xs font-semibold"
    >
      {locales.map((locale) => {
        const href = `/${locale}${pathname.replace(/^\/(da|en)/, "") || ""}`;
        return (
          <Link
            key={locale}
            href={href}
            onClick={() => remember(locale)}
            aria-current={locale === lang ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              locale === lang
                ? "bg-accent text-accent-ink"
                : "text-muted hover:text-foreground"
            )}
          >
            {LABELS[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
