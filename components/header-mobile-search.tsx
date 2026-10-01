"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "./i18n-provider";
import { SearchBar } from "./search-bar";

/**
 * Mobile search row shown below the header on every page except the
 * localized homepage, where the large hero search already exists.
 */
export function HeaderMobileSearch() {
  const { lang } = useI18n();
  const pathname = usePathname();

  if (!pathname || pathname === `/${lang}` || pathname === `/${lang}/`) {
    return null;
  }

  return (
    <div className="border-b border-line bg-background/80 px-4 pb-2 backdrop-blur-md sm:hidden">
      <SearchBar size="md" />
    </div>
  );
}
