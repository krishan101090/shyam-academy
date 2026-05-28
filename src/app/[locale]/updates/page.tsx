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
import {
  categoryLabels,
  filterUpdates,
  formatUpdateDate,
  getAllUpdates,
} from "@/lib/updates";
import type { UpdateCategory } from "@/lib/updates-types";

export const revalidate = 86400;

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

const validCategories = new Set(["all", "admission", "exam", "notice", "news"]);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const c = getUpdatesContent(raw);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: pageAlternates(raw, "/updates"),
    robots: { index: true, follow: true },
  };
}

export default async function UpdatesPage({ params, searchParams }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const query = await searchParams;
  const category = validCategories.has(query.category ?? "") ? (query.category as UpdateCategory | "all") : "all";
  const c = getUpdatesContent(locale);
  const { items: allItems, syncedAt } = await getAllUpdates();
  const items = filterUpdates(allItems, category);
  const labels = categoryLabels[locale];
  const pagePath = category === "all" ? "/updates" : `/updates?category=${category}`;
  const pageUrl = `${siteUrl}${localePath(locale, pagePath)}`;
  const breadcrumbItems = [{ label: c.breadcrumb }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListSchema(locale, siteUrl, breadcrumbItems, "/updates"),
      {
        "@type": "CollectionPage",
        url: pageUrl,
        name: c.title,
        description: c.lead,
        inLanguage: locale === "hi" ? "hi" : "en-IN",
      },
    ],
  };

  const filters: (UpdateCategory | "all")[] = ["all", "admission", "exam", "notice", "news"];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs locale={locale} items={[{ label: "Home", href: "/" }, ...breadcrumbItems]} />
      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">{c.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-slate-900 dark:text-white">{c.title}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{c.lead}</p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {c.syncedLabel}: {formatUpdateDate(syncedAt.slice(0, 10), locale)}
          </p>
        </header>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((key) => (
            <TrackedLocaleLink
              key={key}
              locale={locale}
              href={key === "all" ? "/updates" : `/updates?category=${key}`}
              eventName="cta_click"
              eventParams={{ cta_name: "updates_filter", category: key }}
              className={
                category === key
                  ? "rounded-full border border-brand-300 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-900 dark:border-brand-700 dark:bg-brand-950/50 dark:text-brand-100"
                  : "rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }
            >
              {labels[key]}
            </TrackedLocaleLink>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300">
            {c.empty}
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {items.map((item) => (
              <li key={item.id} className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-brand-800 dark:bg-brand-950/60 dark:text-brand-200">
                    {labels[item.category]}
                  </span>
                  <time dateTime={item.publishedAt} className="text-slate-500 dark:text-slate-400">
                    {formatUpdateDate(item.publishedAt, locale)}
                  </time>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 dark:text-slate-400">{item.source}</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  <TrackedLocaleLink
                    locale={locale}
                    href={`/updates/${item.id}`}
                    eventName="cta_click"
                    eventParams={{ cta_name: "updates_item", update_id: item.id }}
                    className="hover:text-brand-700 dark:hover:text-brand-300"
                  >
                    {item.title}
                  </TrackedLocaleLink>
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.summary}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
                  <TrackedLocaleLink
                    locale={locale}
                    href={`/updates/${item.id}`}
                    eventName="cta_click"
                    eventParams={{ cta_name: "updates_summary", update_id: item.id }}
                    className="text-brand-700 dark:text-brand-300"
                  >
                    {c.viewDetails}
                  </TrackedLocaleLink>
                  <TrackedAnchor
                    href={item.url}
                    eventName="cta_click"
                    eventParams={{ cta_name: "updates_official", update_id: item.id }}
                    className="text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-brand-700 dark:text-slate-400"
                  >
                    {c.readOfficial} ↗
                  </TrackedAnchor>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white">NIOS Regional Centre Delhi / NCR:</strong> A-31, Institutional Area, NH-24,
          Sector-62, Noida, Uttar Pradesh · rcdelhi@nios.ac.in · 0120-2404914
        </p>
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{c.disclaimer}</p>

        <section className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-900/50 dark:bg-brand-950/30">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{c.helpTitle}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{c.helpLead}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <TrackedLocaleLink
              locale={locale}
              href={contactHref("nios-admission")}
              eventName="cta_click"
              eventParams={{ cta_name: "updates_nios_contact" }}
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {c.helpCta}
            </TrackedLocaleLink>
            <TrackedAnchor
              href="tel:+918448537313"
              eventName="contact_click"
              eventParams={{ contact_type: "phone", ui_section: "updates_help" }}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              {c.helpCall}
            </TrackedAnchor>
          </div>
        </section>
      </article>
    </>
  );
}
