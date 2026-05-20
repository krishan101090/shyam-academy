export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  if (!normalized || normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}
