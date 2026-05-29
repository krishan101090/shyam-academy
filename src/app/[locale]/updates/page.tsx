import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getUpdatesContent } from "@/i18n/pages/updates";
import { contactHref } from "@/lib/contact-context";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { UpdatesFeed } from "@/components/UpdatesFeed";
import { getAllUpdates } from "@/lib/updates";

export const revalidate = 86400;

type PageProps = { params: Promise<{ locale: string }> };

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

export default async function UpdatesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const c = getUpdatesContent(locale);
  const { items, syncedAt } = getAllUpdates();
  const pageUrl = `${siteUrl}${localePath(locale, "/updates")}`;
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs locale={locale} items={[{ label: "Home", href: "/" }, ...breadcrumbItems]} />
      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">{c.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-slate-900 dark:text-white">{c.title}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{c.lead}</p>
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">{c.syncedLabel}</p>
        </header>

        <Suspense
          fallback={
            <div className="mt-8 animate-pulse space-y-4">
              <div className="h-9 w-full max-w-md rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>
          }
        >
          <UpdatesFeed
            locale={locale}
            items={items}
            syncedAt={syncedAt}
            empty={c.empty}
            viewDetails={c.viewDetails}
            readOfficial={c.readOfficial}
          />
        </Suspense>

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
