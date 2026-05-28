import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getCareerContent } from "@/i18n/pages/career";
import { contactHref } from "@/lib/contact-context";
import { absoluteLocaleUrl, pageAlternates, siteUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import { L } from "@/lib/with-locale-links";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const c = getCareerContent(raw);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: pageAlternates(raw, "/career-counselling"),
    robots: { index: true, follow: true },
  };
}

export default async function CareerCounsellingPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const c = getCareerContent(locale);
  const pageUrl = `${siteUrl}${localePath(locale, "/career-counselling")}`;

  const breadcrumbItems = [{ label: c.home, href: "/" }, { label: c.breadcrumb }];

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListSchema(locale, siteUrl, breadcrumbItems, "/career-counselling"),
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
      <Breadcrumbs locale={locale} items={breadcrumbItems} />

      <article>
        <header className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">{c.eyebrow}</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance dark:text-white sm:text-5xl">{c.title}</h1>
            <p className="lead-summary mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">{c.lead}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <L locale={locale} href={contactHref("career-counselling", { hash: "lead-form" })} className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                {c.ctaForm}
              </L>
              <a href="tel:+918448537313" className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                {c.ctaCall}
              </a>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <section aria-labelledby="what-we-cover">
            <h2 id="what-we-cover" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
              {c.coverTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{c.coverLead}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {c.topics.map((t) => (
                <div key={t.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{t.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-900/40 dark:bg-brand-950/30" aria-labelledby="counselling-process">
            <h2 id="counselling-process" className="font-display text-2xl font-semibold text-brand-950 dark:text-brand-50">
              {c.processTitle}
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-700 dark:text-slate-300">
              {c.processSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="mt-12" aria-labelledby="related-programmes">
            <h2 id="related-programmes" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
              {c.relatedTitle}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              <li>
                <L className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" locale={locale} href="/nios-admission-delhi">
                  {c.relatedNios}
                </L>
              </li>
              <li>
                <L className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" locale={locale} href="/services">
                  {c.relatedTuition}
                </L>
              </li>
              <li>
                <L className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" locale={locale} href="/entrance-exams">
                  {c.relatedEntrance}
                </L>
              </li>
            </ul>
          </section>

          <section className="mt-12" aria-labelledby="career-faq">
            <h2 id="career-faq" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
              {c.faqTitle}
            </h2>
            <dl className="mt-6 space-y-6">
              {c.faqs.map((item) => (
                <div key={item.q}>
                  <dt className="font-semibold text-slate-900 dark:text-white">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">{c.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">{c.ctaLead}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <L href={contactHref("career-counselling", { hash: "lead-form" })} locale={locale} className="inline-flex rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                {c.ctaEnquire}
              </L>
              <L href={contactHref("career-counselling")} locale={locale} className="inline-flex rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                {c.ctaFull}
              </L>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
