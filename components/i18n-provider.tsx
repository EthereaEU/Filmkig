"use client";

import { createContext, useContext, type ReactNode } from "react";
import { t as translate, type Locale } from "@/lib/i18n";

type Dict = ReturnType<typeof import("@/lib/i18n").getDictionary>;

interface I18nContextValue {
  lang: Locale;
  dict: Dict;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Dict;
  children: ReactNode;
}) {
  const value: I18nContextValue = {
    lang,
    dict,
    t: (key, vars) => translate(dict, key, vars),
  };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
