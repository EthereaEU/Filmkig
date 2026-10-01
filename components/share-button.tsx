"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "./i18n-provider";
import { CheckIcon, ShareIcon } from "./icons";

export function ShareButton({ title }: { title: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        return; // user dismissed
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50"
    >
      {copied ? (
        <CheckIcon className="size-4 text-accent" />
      ) : (
        <ShareIcon className="size-4" />
      )}
      {copied ? t("detail.copied") : t("detail.share")}
    </button>
  );
}
