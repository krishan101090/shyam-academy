import type { Metadata } from "next";
import { localePath, type Locale } from "@/i18n/config";

export const siteUrl = "https://shrishyamacademy.com";

const defaultOgImage = {
  url: "/images/hero-coaching.webp",
  width: 1792,
  height: 1024,
  alt: "NIOS tuition and coaching at Shri Shyam Academy, West Sagarpur, Delhi",
};

export const googleBotIndexable = {
  index: true,
  follow: true,
  "max-image-preview": "large" as const,
  "max-snippet": -1,
  "max-video-preview": -1,
};

export const googleBotNoindex = {
  index: false,
  follow: true,
};

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
    robots: { index: true, follow: true, googleBot: googleBotIndexable },
  };
}

/** Conversion or syndicated pages that should not compete with primary landing URLs in Google. */
export function noindexFollowMetadata(locale: Locale, canonicalPath: string): Pick<Metadata, "alternates" | "robots"> {
  return {
    alternates: pageAlternates(locale, canonicalPath),
    robots: { index: false, follow: true, googleBot: googleBotNoindex },
  };
}

export function isContactHomeTuitionMirrorPath(path: string): boolean {
  return path === "/contact/home-tuition" || path.startsWith("/contact/home-tuition/");
}

export function homeTuitionPathFromContactMirror(contactPath: string): string {
  return contactPath.replace(/^\/contact\//, "/");
}

type PageMetadataInput = {
  locale: Locale;
  path?: string;
  title: Metadata["title"];
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageAlt?: string;
  keywords?: string[];
  index?: boolean;
  canonicalPath?: string;
};

function metadataTitleString(title: Metadata["title"]): string | undefined {
  if (typeof title === "string") return title;
  if (title && typeof title === "object") {
    if ("absolute" in title && title.absolute) return title.absolute;
    if ("default" in title && title.default) return title.default;
  }
  return undefined;
}

/** Consistent Open Graph, Twitter, hreflang, and robots for indexable landing pages. */
export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  ogTitle,
  ogDescription,
  ogImageAlt,
  keywords,
  index = true,
  canonicalPath,
}: PageMetadataInput): Metadata {
  const pageUrl = absoluteLocaleUrl(locale, path);
  const socialTitle = ogTitle ?? metadataTitleString(title) ?? "Shri Shyam Academy";
  const seo = index
    ? indexablePageMetadata(locale, path)
    : noindexFollowMetadata(locale, canonicalPath ?? path);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    ...seo,
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "Shri Shyam Academy",
      title: socialTitle,
      description: ogDescription ?? description,
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [{ ...defaultOgImage, alt: ogImageAlt ?? defaultOgImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: ogDescription ?? description,
      images: [defaultOgImage.url],
    },
  };
}
