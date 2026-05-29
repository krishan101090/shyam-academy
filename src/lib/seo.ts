import type { Metadata } from "next";
import { localePath, type Locale } from "@/i18n/config";

export const siteUrl = "https://shrishyamacademy.com";

export function absoluteLocaleUrl(locale: Locale, path = ""): string {
  return `${siteUrl}${localePath(locale, path)}`;
}

export function pageAlternates(locale: Locale, path = ""): NonNullable<Metadata["alternates"]> {
  const en = absoluteLocaleUrl("en", path);
  const hi = absoluteLocaleUrl("hi", path);
  const canonical = absoluteLocaleUrl(locale, path);
  return {
    canonical,
    languages: {
      en,
      hi,
      "en-IN": en,
      "hi-IN": hi,
      "x-default": en,
    },
  };
}

export function indexablePageMetadata(locale: Locale, path = ""): Pick<Metadata, "alternates" | "robots"> {
  return {
    alternates: pageAlternates(locale, path),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
