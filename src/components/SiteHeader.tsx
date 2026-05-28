import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/config";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { TrackedAnchor } from "./TrackedAnchor";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const nav = [
    { href: "/", label: dict.nav.home },
    { href: "/nios-admission-delhi", label: dict.nav.nios },
    { href: "/services", label: dict.nav.tuition },
    { href: "/career-counselling", label: dict.nav.career },
    { href: "/entrance-exams", label: dict.nav.entrance },
    { href: "/contact", label: dict.nav.callback },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={localePath(locale)} className="group flex items-center gap-2">
          <Image
            src="/images/logo-site.png"
            width={53}
            height={53}
            className="h-10 w-10 shrink-0 rounded-lg object-cover shadow-sm ring-2 ring-brand-500/20"
            alt="Shri Shyam Academy"
          />
          <div className="leading-tight">
            <p className="font-display text-base font-semibold text-slate-900 dark:text-white">Shri Shyam Academy</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{dict.header.tagline}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} labels={dict.lang} />
          <ThemeToggle />
          <TrackedAnchor
            href="tel:+918448537313"
            eventName="contact_click"
            eventParams={{ contact_type: "phone", ui_section: "header" }}
            className="hidden rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:inline-flex"
          >
            {dict.nav.callNow}
          </TrackedAnchor>
        </div>
      </div>
      <div className="border-t border-slate-100 px-4 pb-3 dark:border-slate-800 md:hidden">
        <nav className="flex flex-wrap gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
