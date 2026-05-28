import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getContactContent } from "@/i18n/pages/contact";
import { absoluteLocaleUrl, pageAlternates, siteUrl } from "@/lib/seo";
import { L } from "@/lib/with-locale-links";
import { ContactForm } from "@/components/ContactForm";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ need?: string; source?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const c = getContactContent(raw);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: pageAlternates(raw, "/contact"),
    robots: { index: true, follow: true },
  };
}

function AccordionItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-slate-900 marker:content-none dark:text-white [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2">
          {title}
          <span className="text-brand-600 transition group-open:rotate-180 dark:text-brand-400" aria-hidden="true">
            ▾
          </span>
        </span>
      </summary>
      <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">{children}</div>
    </details>
  );
}

export default async function ContactPage({ params, searchParams }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const query = await searchParams;
  const c = getContactContent(locale);
  const dict = getDictionary(locale);
  const pageUrl = `${siteUrl}${localePath(locale, "/contact")}`;

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        url: pageUrl,
        name: c.metaTitle,
        description: c.metaDescription,
        inLanguage: locale === "hi" ? "hi" : "en-IN",
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }} />
      <article>
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900/40 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl">
            <ol className="flex flex-wrap items-center gap-2 text-slate-600 dark:text-slate-400">
              <li>
                <L className="font-medium text-brand-700 dark:text-brand-400" locale={locale} href="/">
                  {c.home}
                </L>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-900 dark:text-slate-200">{c.breadcrumb}</li>
            </ol>
          </nav>
        </div>

        <section className="scroll-mt-20 border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-10 lg:py-8 lg:px-8">
            <header className="order-2 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">{c.eyebrow}</p>
              <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 text-balance dark:text-white sm:text-3xl lg:text-4xl">{c.title}</h1>
              <p className="lead-summary mt-3 text-sm text-slate-600 dark:text-slate-300 sm:text-base">{c.lead}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>{c.bullet1}</li>
                <li>{c.bullet2}</li>
              </ul>
              <a href="tel:+918448537313" className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300">
                {c.callOr}
              </a>
            </header>

            <aside className="order-1 scroll-mt-24 lg:order-2 lg:sticky lg:top-20" aria-label="NIOS enquiry form">
              <div className="rounded-2xl border-2 border-brand-300 bg-white p-4 shadow-lg ring-4 ring-brand-100/80 dark:border-brand-800 dark:bg-slate-900 dark:ring-brand-950/50 sm:p-5">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{c.formTitle}</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{c.formHint}</p>
                <div className="mt-4">
                  <ContactForm compact labels={dict.form} initialInterest={query.need} source={query.source} />
                </div>
              </div>
            </aside>
          </div>
        </section>

        <div className="mx-auto max-w-3xl space-y-3 px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{c.moreInfo}</p>

          <AccordionItem title={c.accordionEnquire}>
            <div className="grid gap-3 sm:grid-cols-2">
              <p>
                <strong className="text-slate-800 dark:text-slate-100">{c.enquireAdmission}</strong> {c.enquireAdmissionDesc}
              </p>
              <p>
                <strong className="text-slate-800 dark:text-slate-100">{c.enquireTuition}</strong> {c.enquireTuitionDesc}
              </p>
            </div>
            <p className="mt-3">
              <L className="font-semibold text-brand-700 dark:text-brand-300" locale={locale} href="/nios-admission-delhi">
                {c.linkAdmission}
              </L>
              {" · "}
              <L className="font-semibold text-brand-700 dark:text-brand-300" locale={locale} href="/services">
                {c.linkTuition}
              </L>
              {" · "}
              <L className="font-semibold text-brand-700 dark:text-brand-300" locale={locale} href="/career-counselling">
                {c.linkCareer}
              </L>
              {" · "}
              <L className="font-semibold text-brand-700 dark:text-brand-300" locale={locale} href="/entrance-exams">
                {c.linkEntrance}
              </L>
            </p>
          </AccordionItem>

          <AccordionItem title={c.accordionAfter}>
            <ol className="list-decimal space-y-2 pl-4">
              {c.steps.map((step) => (
                <li key={step.title}>
                  <strong className="text-slate-800 dark:text-slate-100">{step.title}</strong> — {step.body}
                </li>
              ))}
            </ol>
          </AccordionItem>

          <AccordionItem title={c.accordionVisit}>
            <div className="space-y-3">
              <div className="flex gap-3">
                <Image src="/images/wp/location_icon.png" width={18} height={18} className="mt-0.5 h-4 w-4 shrink-0" alt="" />
                <p>RZ 41 A, Shanker Park, West Sagar Pur, New Delhi 110046</p>
              </div>
              <div className="flex gap-3">
                <Image src="/images/wp/phone_icon.png" width={16} height={16} className="mt-0.5 h-4 w-4 shrink-0" alt="" />
                <a className="font-semibold text-brand-700 dark:text-brand-300" href="tel:+918448537313">
                  +91 84485 37313
                </a>
              </div>
              <div className="flex gap-3">
                <Image src="/images/wp/envelop_icon.png" width={16} height={16} className="mt-0.5 h-4 w-4 shrink-0" alt="" />
                <a href="mailto:contact@shrishyamacademy.com">contact@shrishyamacademy.com</a>
              </div>
            </div>
          </AccordionItem>

          {c.faqs.map((item) => (
            <AccordionItem key={item.q} title={item.q}>
              <p>{item.a}</p>
            </AccordionItem>
          ))}
        </div>
      </article>
    </>
  );
}
