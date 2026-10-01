import Image from "next/image";
import { tmdbImage, type TmdbImageSize } from "@/lib/tmdb-image";
import { cn } from "@/lib/utils";

/**
 * Poster with a graceful placeholder: a soft gradient tile with the title
 * initial when no TMDB image exists (also used by the built-in demo data).
 */
export function Poster({
  path,
  title,
  size = "w342",
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px",
  priority = false,
  className,
}: {
  path: string | null;
  title: string;
  size?: TmdbImageSize;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const src = tmdbImage(path, size);
  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-surface-2",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-accent-soft via-surface-2 to-surface-2">
          <span className="select-none text-4xl font-bold text-accent/60">
            {title.slice(0, 1)}
          </span>
        </div>
      )}
    </div>
  );
}
