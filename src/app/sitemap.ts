import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/config";
import { absoluteLocaleUrl } from "@/lib/seo";

export const dynamic = "force-static";

const paths = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/nios-admission-delhi", changeFrequency: "weekly" as const, priority: 0.98 },
  { path: "/nios", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/career-counselling", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/entrance-exams", changeFrequency: "monthly" as const, priority: 0.88 },
  { path: "/contact", changeFrequency: "weekly" as const, priority: 0.97 },
] as const;

function languageAlternates(path: string) {
  const languages: Record<string, string> = { "x-default": absoluteLocaleUrl("en", path) };
  for (const locale of locales) {
    const url = absoluteLocaleUrl(locale, path);
    languages[locale] = url;
    languages[locale === "hi" ? "hi-IN" : "en-IN"] = url;
  }
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const { path, changeFrequency, priority } of paths) {
      entries.push({
        url: absoluteLocaleUrl(locale, path),
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: languageAlternates(path),
        },
      });
    }
  }

  return entries;
}
