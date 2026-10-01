import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/lib/i18n";

function preferredLocale(request: NextRequest): string {
  const cookie = request.cookies.get("filmkig-lang")?.value;
  if (cookie && hasLocale(cookie)) return cookie;

  const accept = request.headers.get("accept-language") ?? "";
  return accept.toLowerCase().includes("en") && !accept.toLowerCase().includes("da")
    ? "en"
    : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already localized: /da/... or /en/...
  const segment = pathname.split("/")[1];
  if (hasLocale(segment)) return NextResponse.next();

  // Missing locale -> prefix it
  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip API routes, Next internals, metadata files and static assets
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
