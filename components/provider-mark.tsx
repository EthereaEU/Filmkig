import Image from "next/image";
import { tmdbImage } from "@/lib/tmdb-image";
import { cn } from "@/lib/utils";
import type { Provider } from "@/lib/types";

/** Provider logo, or a colored initial tile when no logo exists (demo data). */
export function ProviderMark({
  provider,
  size = "md",
  className,
}: {
  provider: Provider;
  size?: "sm" | "md";
  className?: string;
}) {
  const px = size === "md" ? "size-10" : "size-8";
  const src = tmdbImage(provider.logoPath, "w185");

  if (src) {
    return (
      <Image
        src={src}
        alt={provider.name}
        width={size === "md" ? 40 : 32}
        height={size === "md" ? 40 : 32}
        className={cn("shrink-0 rounded-lg bg-surface-2 object-cover", px, className)}
      />
    );
  }
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg bg-accent-soft text-sm font-bold text-accent",
        px,
        className
      )}
      aria-hidden
    >
      {provider.name.slice(0, 1)}
    </span>
  );
}
