import type { Metadata } from "next";
import { defaultLocale, getDictionary, hasLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = hasLocale(langParam) ? langParam : defaultLocale;
  return { title: getDictionary(lang).about.title };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang: langParam } = await params;
  const lang = hasLocale(langParam) ? langParam : defaultLocale;
  const dict = getDictionary(lang);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {dict.about.title}
      </h1>
      <div className="mt-6 space-y-4 leading-relaxed text-foreground/90">
        <p>{dict.about.p1}</p>
        <p>{dict.about.p2}</p>
        <p>{dict.about.p3}</p>
      </div>
    </div>
  );
}
