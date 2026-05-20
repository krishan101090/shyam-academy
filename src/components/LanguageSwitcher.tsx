"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type LanguageSwitcherProps = {
  locale: Locale;
  labels: Dictionary["lang"];
};

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";

  function hrefFor(target: Locale) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    return `/${segments.join("/")}`;
  }

  return (
    <div
      className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-900"
      role="group"
      aria-label={labels.label}
    >
      {locales.map((code) => (
        <Link
          key={code}
          href={hrefFor(code)}
          className={`rounded-md px-2.5 py-1.5 transition ${
            locale === code
              ? "bg-white text-brand-700 shadow-sm dark:bg-slate-800 dark:text-brand-300"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
          hrefLang={code === "hi" ? "hi" : "en"}
        >
          {code === "en" ? labels.en : labels.hi}
        </Link>
      ))}
    </div>
  );
}
