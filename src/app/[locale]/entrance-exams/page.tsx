import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getEntranceContent } from "@/i18n/pages/entrance";
import { absoluteLocaleUrl, pageAlternates, siteUrl } from "@/lib/seo";
import { L } from "@/lib/with-locale-links";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const c = getEntranceContent(raw);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: pageAlternates(raw, "/entrance-exams"),
    robots: { index: true, follow: true },
  };
}

export default async function EntranceExamsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const c = getEntranceContent(locale);
  const pageUrl = `${siteUrl}${localePath(locale, "/entrance-exams")}`;

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", url: pageUrl, name: c.metaTitle, description: c.metaDescription, inLanguage: locale === "hi" ? "hi" : "en-IN" },
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
      <div className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
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
      </div>

      <article>
        <header className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">{c.eyebrow}</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance dark:text-white sm:text-5xl">{c.title}</h1>
            <p className="lead-summary mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">{c.lead}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <L locale={locale} href="/contact#lead-form" className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                {c.ctaForm}
              </L>
              <a href="tel:+918448537313" className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                {c.ctaCall}
              </a>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <section aria-labelledby="all-exams">
            <h2 id="all-exams" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
              {c.examsTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{c.examsIntro}</p>
            <div className="mt-8 space-y-8">
              {c.exams.map((exam) => (
                <section key={exam.id} id={exam.id} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{exam.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-700 dark:text-brand-400">{exam.audience}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {exam.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-12" aria-labelledby="why-us">
            <h2 id="why-us" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
              {c.whyTitle}
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {c.whyItems.map((item) => (
                <li key={item} className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              {c.whyBefore}{" "}
              <L className="font-semibold text-brand-700 dark:text-brand-300" locale={locale} href="/career-counselling">
                {c.whyCareer}
              </L>
              {c.whyMiddle}{" "}
              <L className="font-semibold text-brand-700 dark:text-brand-300" locale={locale} href="/services">
                {c.whyTuition}
              </L>
              {c.whyAfter}
            </p>
          </section>

          <section className="mt-12" aria-labelledby="entrance-faq">
            <h2 id="entrance-faq" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
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

          <nav className="mt-10 flex flex-wrap gap-2 text-sm" aria-label="Jump to exam">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{c.jumpLabel}</span>
            {c.exams.map((exam) => (
              <a
                key={exam.id}
                href={`#${exam.id}`}
                className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300"
              >
                {exam.id.toUpperCase()}
              </a>
            ))}
          </nav>

          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">{c.joinTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">{c.joinLead}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <L href="/contact#lead-form" locale={locale} className="inline-flex rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                {c.joinCta}
              </L>
              <L href="/contact" locale={locale} className="inline-flex rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                {c.joinOther}
              </L>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
