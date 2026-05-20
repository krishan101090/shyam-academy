import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageAlternates } from "@/lib/seo";
import { LocaleLink } from "@/components/LocaleLink";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const isHi = raw === "hi";
  return {
    title: isHi ? "NIOS गाइड दिल्ली | ट्यूशन और दाखिला" : "NIOS Guide Delhi | Tuition & 10th/12th Admission Help",
    description: isHi
      ? "दिल्ली में NIOS गाइड: 10वीं और 12वीं, SDMIS दाखिला और NIOS ट्यूशन।"
      : "NIOS guide for Delhi learners: Secondary (10th) and Senior Secondary (12th), SDMIS admission steps, and NIOS tuition.",
    alternates: pageAlternates(raw, "/nios"),
    robots: { index: true, follow: true },
  };
}

export default async function NiosPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale).nios;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-900/40 dark:bg-brand-950/30">
        <p className="text-sm font-semibold text-brand-900 dark:text-brand-100">{t.bannerTitle}</p>
        <p className="mt-2 text-sm text-brand-900/80 dark:text-brand-100/80">{t.bannerBody}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <LocaleLink
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            locale={locale}
            href="/nios-admission-delhi"
          >
            {t.bannerCta}
          </LocaleLink>
          <LocaleLink
            className="inline-flex items-center justify-center rounded-lg border border-brand-200 bg-white px-4 py-3 text-sm font-semibold text-brand-900 hover:bg-brand-100 dark:border-brand-900/50 dark:bg-slate-950 dark:text-brand-50 dark:hover:bg-slate-900"
            locale={locale}
            href="/contact"
          >
            {t.bannerContact}
          </LocaleLink>
        </div>
      </div>

      <h1 className="mt-10 font-display text-4xl font-semibold text-slate-900 dark:text-white">{t.title}</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t.intro}</p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">{t.whyTitle}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
        {t.whyItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">{t.levelsTitle}</h2>
      <p className="mt-4 text-slate-600 dark:text-slate-300">{t.levelsP1}</p>
      <p className="mt-4 text-slate-600 dark:text-slate-300">{t.levelsP2}</p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">{t.delhiTitle}</h2>
      <p className="mt-4 text-slate-600 dark:text-slate-300">{t.delhiP}</p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">{t.centreTitle}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
        {t.centreItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t.readyTitle}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t.readyP}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <LocaleLink
            className="inline-flex justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            locale={locale}
            href="/nios-admission-delhi"
          >
            {t.readyCta}
          </LocaleLink>
          <a
            className="inline-flex justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
            href="tel:+918448537313"
          >
            {t.readyCall}
          </a>
        </div>
      </div>
    </div>
  );
}
