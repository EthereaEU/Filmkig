"use client";

import { useMemo, useState } from "react";
import { useI18n } from "./i18n-provider";
import { ProviderMark } from "./provider-mark";
import { ExternalIcon } from "./icons";
import { cn } from "@/lib/utils";
import type { Availability, Offer, OfferKind } from "@/lib/types";

type GroupKey = "stream" | "free" | "rent" | "buy";

const GROUP_ORDER: GroupKey[] = ["stream", "free", "rent", "buy"];

const KIND_TO_GROUP: Record<OfferKind, GroupKey> = {
  flatrate: "stream",
  ads: "free",
  free: "free",
  rent: "rent",
  buy: "buy",
};

/** Availability list with "All / Subscription / Free / Rent / Buy" filters. */
export function ProvidersSection({ availability }: { availability: Availability }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<GroupKey | "all">("all");

  const groups = useMemo(() => {
    const map = new Map<GroupKey, Offer[]>();
    for (const offer of availability.offers) {
      const key = KIND_TO_GROUP[offer.kind];
      const list = map.get(key) ?? [];
      list.push(offer);
      map.set(key, list);
    }
    return map;
  }, [availability.offers]);

  const visibleGroups = GROUP_ORDER.filter(
    (g) => groups.has(g) && (filter === "all" || filter === g)
  );

  const watchHref = availability.link ?? "https://www.justwatch.com/dk";

  const chips: Array<{ key: GroupKey | "all"; label: string }> = [
    { key: "all", label: t("providers.all") },
    ...(groups.has("stream")
      ? [{ key: "stream" as const, label: t("providers.flatrate") }]
      : []),
    ...(groups.has("free")
      ? [{ key: "free" as const, label: t("providers.free") }]
      : []),
    ...(groups.has("rent")
      ? [{ key: "rent" as const, label: t("providers.rent") }]
      : []),
    ...(groups.has("buy")
      ? [{ key: "buy" as const, label: t("providers.buy") }]
      : []),
  ];

  if (availability.offers.length === 0) {
    return (
      <section aria-labelledby="providers-heading">
        <SectionHeading />
        <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-10 text-center">
          <p className="font-medium text-foreground">{t("providers.unavailable")}</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            {t("providers.unavailableHint")}
          </p>
          <a
            href={watchHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            {t("providers.allOptions")} <ExternalIcon />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="providers-heading">
      <SectionHeading />

      <div
        role="group"
        aria-label={t("providers.filterLabel")}
        className="mb-5 flex flex-wrap gap-2"
      >
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => setFilter(chip.key)}
            aria-pressed={filter === chip.key}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === chip.key
                ? "border-accent bg-accent text-accent-ink"
                : "border-line bg-surface text-muted hover:border-accent/40 hover:text-foreground"
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {visibleGroups.map((group) => (
          <div key={group}>
            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
              {t(`providers.${group === "free" ? "freeSection" : group === "stream" ? "stream" : group}`)}
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {groups.get(group)!.map((offer) => (
                <li key={`${offer.kind}-${offer.provider.id}`}>
                  <a
                    href={watchHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3 transition-all hover:border-accent/50 hover:shadow-sm"
                  >
                    <ProviderMark provider={offer.provider} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {offer.provider.name}
                      </span>
                      <span className="block text-xs text-muted">
                        {offer.kind === "flatrate" && t("providers.flatrate")}
                        {offer.kind === "rent" && t("providers.rent")}
                        {offer.kind === "buy" && t("providers.buy")}
                        {offer.kind === "free" && t("providers.free")}
                        {offer.kind === "ads" && t("providers.ads")}
                      </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                      {t("providers.watchNow")} <ExternalIcon className="size-3" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-muted">
        {t("providers.updatedDaily")} ·{" "}
        <a
          href={watchHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          {t("providers.allOptions")}
        </a>
      </p>
    </section>
  );

  function SectionHeading() {
    return (
      <div className="mb-5">
        <h2
          id="providers-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          {t("providers.heading")}
        </h2>
        <p className="mt-0.5 text-sm text-muted">{t("providers.subheading")}</p>
      </div>
    );
  }
}
