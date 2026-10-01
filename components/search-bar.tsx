"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useI18n } from "./i18n-provider";
import { cn, titleSlug } from "@/lib/utils";
import { tmdbImage } from "@/lib/tmdb-image";
import type { MediaType } from "@/lib/types";

interface Suggestion {
  id: number;
  type: MediaType;
  title: string;
  year: string | null;
  posterPath: string | null;
  rating: number | null;
}

export function SearchBar({
  size = "md",
  autoFocus = false,
  initialQuery = "",
}: {
  size?: "md" | "lg";
  autoFocus?: boolean;
  initialQuery?: string;
}) {
  const { lang, t } = useI18n();
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);

  const goToTitle = useCallback(
    (s: Suggestion) => {
      setOpen(false);
      setQuery(s.title);
      router.push(`/${lang}/title/${s.type}/${titleSlug(s.id, s.title)}`);
    },
    [lang, router]
  );

  const goToSearch = useCallback(
    (q: string) => {
      if (!q.trim()) return;
      setOpen(false);
      router.push(`/${lang}/search?q=${encodeURIComponent(q.trim())}`);
    },
    [lang, router]
  );

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const handle = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&lang=${lang}`,
          { signal: controller.signal }
        );
        const data = (await res.json()) as { results: Suggestion[] };
        setResults(data.results ?? []);
        setActive(-1);
        setOpen(true);
      } catch {
        /* aborted or failed - keep stale state */
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(handle);
  }, [query, lang]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open && results.length) {
        setOpen(true);
        return;
      }
      const dir = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + dir + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && active >= 0 && results[active]) {
        goToTitle(results[active]);
      } else {
        goToSearch(query);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  const showDropdown = open && query.trim().length >= 2;

  return (
    <div ref={rootRef} className="relative w-full">
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-line bg-surface shadow-sm transition-shadow focus-within:shadow-md focus-within:border-accent",
          size === "lg" ? "px-5 py-3.5 text-base" : "px-3.5 py-2 text-sm"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={cn("shrink-0 text-muted", size === "lg" ? "size-5" : "size-4")}
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listId}
          aria-activedescendant={
            active >= 0 ? `${listId}-${active}` : undefined
          }
          aria-label={t("search.ariaLabel")}
          autoFocus={autoFocus}
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            if (results.length) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder={t("search.placeholder")}
          className="w-full bg-transparent text-foreground placeholder:text-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {loading && (
          <span
            className="size-4 shrink-0 animate-spin rounded-full border-2 border-line border-t-accent"
            aria-label={t("search.searching")}
          />
        )}
      </div>

      {showDropdown && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-line bg-surface shadow-xl">
          {results.length > 0 ? (
            <ul id={listId} role="listbox" className="max-h-[70vh] overflow-y-auto scrollbar-thin py-1.5">
              {results.map((s, i) => (
                <li key={`${s.type}-${s.id}`} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    id={`${listId}-${i}`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => goToTitle(s)}
                    className={cn(
                      "flex w-full items-center gap-3 px-3 py-2 text-left transition-colors",
                      i === active ? "bg-surface-2" : "bg-transparent"
                    )}
                  >
                    <span className="relative block size-9 shrink-0 overflow-hidden rounded-md bg-surface-2">
                      {s.posterPath ? (
                        <Image
                          src={tmdbImage(s.posterPath, "w92")!}
                          alt=""
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex size-full items-center justify-center text-xs font-bold text-muted">
                          {s.title.slice(0, 1)}
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {s.title}
                      </span>
                      <span className="block text-xs text-muted">
                        {t(`search.${s.type}`)}
                        {s.year ? ` · ${s.year}` : ""}
                        {s.rating ? ` · ★ ${s.rating.toFixed(1)}` : ""}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            !loading && (
              <div className="px-4 py-6 text-center">
                <p className="text-sm font-medium text-foreground">
                  {t("search.noResults")}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {t("search.noResultsHint")}
                </p>
              </div>
            )
          )}
          {query.trim() && (
            <button
              type="button"
              onClick={() => goToSearch(query)}
              className="block w-full border-t border-line px-4 py-2.5 text-left text-xs font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {t("search.resultsFor", { q: query.trim() })} →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
