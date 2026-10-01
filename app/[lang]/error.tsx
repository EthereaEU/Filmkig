"use client";

import { useEffect } from "react";
import { useI18n } from "@/components/i18n-provider";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        {t("errors.errorTitle")}
      </h1>
      <p className="mt-2 text-muted">{t("errors.errorHint")}</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-8 inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
      >
        {t("errors.tryAgain")}
      </button>
    </div>
  );
}
