"use client";

import { useCallback, useEffect, useState } from "react";
import type { MediaType } from "./types";

export interface WatchlistItem {
  id: number;
  type: MediaType;
  title: string;
  year: string | null;
  posterPath: string | null;
}

const KEY = "filmkig-watchlist";
const EVENT = "filmkig-watchlist-changed";

export function readWatchlist(): WatchlistItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeWatchlist(items: WatchlistItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function useWatchlist() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readWatchlist());
    setHydrated(true);
    const onChange = () => setItems(readWatchlist());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const has = useCallback(
    (type: MediaType, id: number) =>
      items.some((i) => i.type === type && i.id === id),
    [items]
  );

  const toggle = useCallback((item: WatchlistItem) => {
    const current = readWatchlist();
    const exists = current.some(
      (i) => i.type === item.type && i.id === item.id
    );
    writeWatchlist(
      exists
        ? current.filter((i) => !(i.type === item.type && i.id === item.id))
        : [item, ...current]
    );
  }, []);

  const remove = useCallback((type: MediaType, id: number) => {
    writeWatchlist(
      readWatchlist().filter((i) => !(i.type === type && i.id === id))
    );
  }, []);

  return { items, hydrated, has, toggle, remove };
}
