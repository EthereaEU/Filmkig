"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

function applyTheme() {
  try {
    const saved = localStorage.getItem("filmkig-theme");
    const dark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch {}
}

/**
 * Keeps the imperatively managed `dark` class on <html> in place. When the
 * [lang] layout re-renders on client navigation (e.g. switching language),
 * React reconciles <html> and drops the class. The layout effect restores it
 * before paint; the observer covers any later resets.
 */
export function ThemeSync() {
  const pathname = usePathname();
  useLayoutEffect(applyTheme, [pathname]);

  useEffect(() => {
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
