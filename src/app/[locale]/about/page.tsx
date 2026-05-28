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
    title: isHi ? "श्री श्याम एकेडमी | NIOS ट्यूशन दिल्ली" : "About Shri Shyam Academy | NIOS Tuition Delhi",
    description: isHi
      ? "श्री श्याम एकेडमी — वेस्ट सागरपुर, दिल्ली में NIOS ट्यूशन और 10वीं/12वीं दाखिला मार्गदर्शन।"
      : "About Shri Shyam Academy — NIOS tuition and 10th/12th admission guidance in West Sagarpur, Delhi.",
    alternates: pageAlternates(raw, "/about"),
    robots: { index: true, follow: true },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale).about;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">{t.title}</h1>
      <p className="mt-2 text-base font-medium text-brand-800 dark:text-brand-200">{t.subtitle}</p>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t.intro}</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
        <Image src="/images/wp/WhatsApp-Image-2024-04-19-at-11.14.50-AM-1.jpeg" width={1024} height={1024} className="aspect-[16/10] w-full object-cover sm:aspect-[2/1]" alt={t.imageAlt} />
      </div>
      <div className="mt-10 max-w-none">
        <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">{t.whatWeDo}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          {t.items.map((item) => (
            <li key={item.label}>
              <span className="font-semibold text-slate-900 dark:text-white">{item.label}</span> {item.text}
            </li>
          ))}
        </ul>
        <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">{t.approachTitle}</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">{t.approach}</p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">{t.educatorsTitle}</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">{t.educator1}</p>
        <p className="mt-4 text-slate-600 dark:text-slate-300">{t.educator2}</p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">{t.startedTitle}</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          {t.startedBefore}{" "}
          <a className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300" href="tel:+918448537313">
            +91 84485 37313
          </a>
          , <LocaleLink className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300" locale={locale} href="/nios-admission-delhi">
            {t.startedAdmission}
          </LocaleLink>
          {t.startedOr}{" "}
          <LocaleLink className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300" locale={locale} href="/contact">
            {t.startedContact}
          </LocaleLink>
          {t.startedAfter}
        </p>
      </div>
    </div>
  );
}
