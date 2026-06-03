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

/** Conversion or syndicated pages that should not compete with primary landing URLs in Google. */
export function noindexFollowMetadata(locale: Locale, canonicalPath: string): Pick<Metadata, "alternates" | "robots"> {
  return {
    alternates: pageAlternates(locale, canonicalPath),
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export function isContactHomeTuitionMirrorPath(path: string): boolean {
  return path === "/contact/home-tuition" || path.startsWith("/contact/home-tuition/");
}

export function homeTuitionPathFromContactMirror(contactPath: string): string {
  return contactPath.replace(/^\/contact\//, "/");
}
