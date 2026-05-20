import Image from "next/image";
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
    title: isHi ? "NIOS ट्यूशन दिल्ली | 10वीं 12वीं" : "NIOS Tuition Delhi | Class 10 & 12 Coaching",
    description: isHi
      ? "दिल्ली में 10वीं और 12वीं के लिए NIOS ट्यूशन — विषय कोचिंग, TMA, साप्ताहिक टेस्ट।"
      : "NIOS tuition in Delhi for class 10th and 12th: subject coaching, TMA support, weekly tests, and admission guidance.",
    alternates: pageAlternates(raw, "/services"),
    robots: { index: true, follow: true },
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale).services;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">{t.title}</h1>
        <p className="mt-2 text-base font-medium text-brand-800 dark:text-brand-200">{t.subtitle}</p>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t.intro}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <LocaleLink
            locale={locale}
            href="/nios-admission-delhi"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {t.ctaAdmission}
          </LocaleLink>
          <LocaleLink
            locale={locale}
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
          >
            {t.ctaTuition}
          </LocaleLink>
        </div>
      </div>
      <div className="relative mt-10 h-48 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 sm:h-56">
        <Image src="/images/wp/pexels-photo-1516440-1516440.jpg" width={1280} height={848} className="h-full w-full object-cover" alt={t.imageAlt} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/65 via-slate-900/25 to-transparent dark:from-slate-950/75" />
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {t.blocks.map((b) => (
          <section key={b.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{b.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {b.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t.whyTitle}</h2>
        <ul className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
          {t.whyItems.map((item) => (
            <li key={item} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
