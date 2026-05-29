import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getUpdatesContent } from "@/i18n/pages/updates";
import { contactHref } from "@/lib/contact-context";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { categoryLabels, formatUpdateDate, getAllUpdates, getUpdateById } from "@/lib/updates";

export const revalidate = 86400;

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const { items } = getAllUpdates();
  return (["en", "hi"] as const).flatMap((locale) => items.map((item) => ({ locale, slug: item.id })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const item = getUpdateById(slug);
  if (!item) return {};
  return {
    title: `${item.title} | Shri Shyam Academy`,
    description: item.summary,
    alternates: pageAlternates(raw, `/updates/${slug}`),
    robots: { index: true, follow: true },
  };
}

export default async function UpdateDetailPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const c = getUpdatesContent(locale);
  const item = getUpdateById(slug);
  if (!item) notFound();

  const labels = categoryLabels[locale];
  const pagePath = `/updates/${slug}`;
  const pageUrl = `${siteUrl}${localePath(locale, pagePath)}`;
  const breadcrumbItems = [
    { label: c.breadcrumb, href: "/updates" },
    { label: item.title.slice(0, 60) + (item.title.length > 60 ? "…" : "") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListSchema(locale, siteUrl, breadcrumbItems, pagePath),
      {
        "@type": "NewsArticle",
        headline: item.title,
        description: item.summary,
        datePublished: item.publishedAt,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        isBasedOn: item.url,
        publisher: { "@type": "Organization", name: "Shri Shyam Academy" },
        inLanguage: locale === "hi" ? "hi" : "en-IN",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs locale={locale} items={[{ label: "Home", href: "/" }, ...breadcrumbItems]} />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <TrackedLocaleLink
          locale={locale}
          href="/updates"
          eventName="cta_click"
          eventParams={{ cta_name: "updates_detail_back" }}
          className="text-sm font-medium text-brand-700 dark:text-brand-300"
        >
          {c.detailBack}
        </TrackedLocaleLink>

        <header className="mt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-brand-800 dark:bg-brand-950/60 dark:text-brand-200">
              {labels[item.category]}
            </span>
            <time dateTime={item.publishedAt} className="text-slate-500">
              {formatUpdateDate(item.publishedAt, locale)}
            </time>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold text-slate-900 dark:text-white">{item.title}</h1>
        </header>

        <dl className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/50 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-slate-700 dark:text-slate-300">{c.detailSource}</dt>
            <dd className="mt-1 text-slate-600 dark:text-slate-400">{item.source}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-700 dark:text-slate-300">{c.detailPublished}</dt>
            <dd className="mt-1 text-slate-600 dark:text-slate-400">{formatUpdateDate(item.publishedAt, locale)}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-semibold text-slate-700 dark:text-slate-300">{c.detailCategory}</dt>
            <dd className="mt-1 text-slate-600 dark:text-slate-400">{labels[item.category]}</dd>
          </div>
        </dl>

        <p className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">{item.summary}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <TrackedAnchor
            href={item.url}
            eventName="cta_click"
            eventParams={{ cta_name: "updates_detail_official", update_id: item.id }}
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {c.readOfficial} ↗
          </TrackedAnchor>
          <TrackedLocaleLink
            locale={locale}
            href={contactHref("nios-admission")}
            eventName="cta_click"
            eventParams={{ cta_name: "updates_detail_contact" }}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            {c.detailCta}
          </TrackedLocaleLink>
        </div>

        <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">{c.disclaimer}</p>
      </article>
    </>
  );
}
