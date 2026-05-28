import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { hindiSeoKeywords } from "@/lib/seo-keywords";
import { contactHref } from "@/lib/contact-context";
import { absoluteLocaleUrl, pageAlternates, siteUrl } from "@/lib/seo";
import { LocaleLink } from "@/components/LocaleLink";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const isHi = raw === "hi";
  return {
    title: {
      absolute: isHi
        ? "NIOS ट्यूशन दिल्ली | 10वीं 12वीं कोचिंग और दाखिला | श्री श्याम एकेडमी"
        : "NIOS Tuition Delhi | Class 10 & 12 Coaching & Admission | Shri Shyam Academy",
    },
    description: isHi
      ? "श्री श्याम एकेडमी — वेस्ट सागरपुर, दिल्ली में NIOS ट्यूशन और 10वीं/12वीं दाखिला। विषय कोचिंग, TMA, SDMIS मार्गदर्शन।"
      : "Shri Shyam Academy — NIOS tuition and 10th/12th admission in West Sagarpur, Delhi. Subject coaching, TMA help, SDMIS guidance, career counselling, KVS CUET CTET.",
    keywords: isHi
      ? ["NIOS ट्यूशन दिल्ली", "NIOS कोचिंग दिल्ली", "NIOS दाखिला", ...hindiSeoKeywords]
      : [
          "Shri Shyam Academy",
          "NIOS tuition Delhi",
          "NIOS coaching Delhi",
          "NIOS 10th tuition",
          "NIOS 12th tuition",
          "NIOS admission Delhi",
        ],
    alternates: pageAlternates(raw),
    openGraph: {
      type: "website",
      url: absoluteLocaleUrl(raw),
      siteName: "Shri Shyam Academy",
      title: isHi ? "NIOS ट्यूशन और दाखिला दिल्ली" : "NIOS Tuition & Admission Delhi",
      description: isHi
        ? "वेस्ट सागरपुर, दिल्ली में NIOS ट्यूशन और 10वीं/12वीं दाखिला।"
        : "NIOS tuition and 10th/12th admission in West Sagarpur, Delhi.",
      locale: isHi ? "hi_IN" : "en_IN",
      images: [{ url: "/images/hero-coaching.webp", width: 1792, height: 1024, alt: "Shri Shyam Academy Delhi" }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale).home;
  const c = getDictionary(locale).common;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        url: siteUrl,
        name: "Shri Shyam Academy",
        inLanguage: locale === "hi" ? "hi" : "en-IN",
      },
      {
        "@type": "EducationalOrganization",
        name: "Shri Shyam Academy",
        url: siteUrl,
        telephone: "+91-8448537313",
        email: "contact@shrishyamacademy.com",
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50 via-white to-white dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.35),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm dark:border-brand-900/40 dark:bg-slate-950/40 dark:text-brand-100">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {t.badge}
              </p>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance dark:text-white sm:text-5xl">{t.title}</h1>
              <p className="mt-3 text-base font-medium text-brand-800 dark:text-brand-200">{t.subtitle}</p>
              <p className="mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">{t.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <LocaleLink
                  locale={locale}
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                >
                  {t.ctaTuition}
                </LocaleLink>
                <LocaleLink
                  locale={locale}
                  href="/nios-admission-delhi"
                  className="inline-flex items-center justify-center rounded-lg border border-brand-300 bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950/50 dark:text-brand-100"
                >
                  {t.ctaAdmission}
                </LocaleLink>
                <LocaleLink
                  locale={locale}
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  {t.ctaCallback}
                </LocaleLink>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{c.phone}</p>
                  <a className="hover:text-brand-600 dark:hover:text-brand-400" href="tel:+918448537313">
                    {c.callNumber}
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{c.centre}</p>
                  <p>{c.centreLocation}</p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Image
                src="/images/hero-coaching.webp"
                width={1792}
                height={1024}
                className="max-h-[min(380px,52vh)] w-full border-b border-slate-100 object-cover object-right dark:border-slate-800"
                alt={t.heroImageAlt}
                priority
              />
              <div className="p-6">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.whyTitle}</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {t.features.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-brand-600 dark:text-brand-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-200 bg-brand-50 dark:border-brand-900/40 dark:bg-brand-950/25">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">{t.tuitionEyebrow}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-slate-900 dark:text-white">{t.tuitionTitle}</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{t.tuitionLead}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-200 bg-white p-4 dark:border-brand-900/50 dark:bg-slate-900">
                <p className="font-semibold text-slate-900 dark:text-white">{t.tuition10Title}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.tuition10Desc}</p>
              </div>
              <div className="rounded-xl border border-brand-200 bg-white p-4 dark:border-brand-900/50 dark:bg-slate-900">
                <p className="font-semibold text-slate-900 dark:text-white">{t.tuition12Title}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.tuition12Desc}</p>
              </div>
              <LocaleLink
                locale={locale}
                href="/services"
                className="sm:col-span-2 inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                {t.tuitionDetails}
              </LocaleLink>
              <LocaleLink
                locale={locale}
                href={contactHref("home-tuition")}
                className="sm:col-span-2 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                {t.tuitionEnquiry}
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">
            Pioneers in Accounts Classes — West Delhi
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
            Class 11th & 12th Accounts specialist with Ajay Sir — 20+ years experience, best teacher in Paschim Vihar.
            Home tuition and classroom batches at West Sagarpur, Gandhi Market. Plus home tutors across West Delhi for
            Economics, CBSE/ICSE, and classes 1st to 12th.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrackedLocaleLink
              locale={locale}
              href="/subjects/accounts"
              eventName="cta_click"
              eventParams={{ cta_name: "home_accounts_classes" }}
              className="rounded-lg border border-brand-300 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-900 hover:bg-brand-100 dark:border-brand-700 dark:bg-brand-950/50 dark:text-brand-100"
            >
              Accounts Classes with Ajay Sir
            </TrackedLocaleLink>
            <TrackedLocaleLink
              locale={locale}
              href="/home-tuition/west-delhi"
              eventName="cta_click"
              eventParams={{ cta_name: "home_west_delhi" }}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              Home Tutor in West Delhi
            </TrackedLocaleLink>
            <TrackedLocaleLink
              locale={locale}
              href="/subjects/economics"
              eventName="cta_click"
              eventParams={{ cta_name: "home_economics_tuition" }}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              Economics Tuition
            </TrackedLocaleLink>
            <TrackedLocaleLink
              locale={locale}
              href="/home-tuition/west-delhi/paschim-vihar"
              eventName="cta_click"
              eventParams={{ cta_name: "home_paschim_vihar" }}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              Home Tuition in Paschim Vihar
            </TrackedLocaleLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">{t.programmesTitle}</h2>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">{t.programmesLead}</p>
          </div>
          <LocaleLink locale={locale} href="/services" className="text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300">
            {t.programmesLink} →
          </LocaleLink>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {t.highlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">{t.careerTitle}</h2>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">{t.careerLead}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t.careerCardTitle}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t.careerCardBody}</p>
              <LocaleLink locale={locale} href="/career-counselling" className="mt-4 inline-flex text-sm font-semibold text-brand-700 dark:text-brand-300">
                {t.careerLink} →
              </LocaleLink>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t.entranceCardTitle}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t.entranceCardBody}</p>
              <LocaleLink locale={locale} href="/entrance-exams" className="mt-4 inline-flex text-sm font-semibold text-brand-700 dark:text-brand-300">
                {t.entranceLink} →
              </LocaleLink>
              <TrackedLocaleLink
                locale={locale}
                href="/entrance-after-12th"
                eventName="cta_click"
                eventParams={{ cta_name: "home_entrance_after_12th" }}
                className="mt-2 inline-flex text-sm font-semibold text-slate-800 hover:text-brand-700 dark:text-slate-200 dark:hover:text-brand-300"
              >
                Entrance Preparation After 12th →
              </TrackedLocaleLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 dark:border-slate-800 dark:from-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-1">
              <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">{t.admissionTitle}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">{t.admissionLead}</p>
              <div className="mt-6 flex flex-col gap-3">
                <LocaleLink
                  locale={locale}
                  href="/nios-admission-delhi"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  {t.admissionCta}
                </LocaleLink>
                <LocaleLink
                  locale={locale}
                  href="/nios"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:text-white"
                >
                  {t.admissionGuide}
                </LocaleLink>
              </div>
            </div>
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.admission10}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t.admission10Desc}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.admission12}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t.admission12Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">{t.testimonialsTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {t.testimonials.map((item, i) => (
            <figure key={item.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Image
                src={i === 0 ? "/images/wp/StockCake-Kids-School-Lineup_1722500130.jpg" : "/images/wp/StockCake-Students-Studying-Together_1722500015.jpg"}
                width={400}
                height={400}
                className="aspect-[4/3] w-full object-cover"
                alt={i === 0 ? t.testimonialImageAlt : t.testimonialImageAlt2}
              />
              <div className="p-6">
                <blockquote className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">“{item.quote}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{item.name}</figcaption>
                <p className="text-xs text-slate-500">{item.role}</p>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 py-14 dark:border-slate-800 dark:from-slate-950">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">{t.ctaSectionTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{t.ctaSectionLead}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a className="inline-flex rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700" href="tel:+918448537313">
              {t.ctaCall}
            </a>
            <LocaleLink
              className="inline-flex rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              locale={locale}
              href="/contact"
            >
              {t.ctaForm}
            </LocaleLink>
          </div>
        </div>
      </section>
    </div>
  );
}
