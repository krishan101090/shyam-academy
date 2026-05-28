import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/config";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { TrackedAnchor } from "./TrackedAnchor";
import { HeaderNav } from "./HeaderNav";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={localePath(locale)} className="group flex shrink-0 items-center gap-2">
          <Image
            src="/images/logo-site.png"
            width={53}
            height={53}
            className="h-10 w-10 shrink-0 rounded-lg object-cover shadow-sm ring-2 ring-brand-500/20"
            alt="Shri Shyam Academy"
          />
          <div className="hidden leading-tight sm:block">
            <p className="font-display text-base font-semibold text-slate-900 dark:text-white">Shri Shyam Academy</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{dict.header.tagline}</p>
          </div>
        </Link>
        <HeaderNav locale={locale} dict={dict} />
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher locale={locale} labels={dict.lang} />
          <ThemeToggle />
          <TrackedAnchor
            href="tel:+918448537313"
            eventName="contact_click"
            eventParams={{ contact_type: "phone", ui_section: "header" }}
            className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 sm:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            <svg className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {dict.nav.callNow}
          </TrackedAnchor>
        </div>
      </div>
    </header>
  );
}
