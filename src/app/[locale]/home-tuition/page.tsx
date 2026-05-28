import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { contactHref } from "@/lib/contact-context";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { zoneLabels, zoneAreas, type ZoneKey } from "@/lib/home-tuition-data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Home Tuition in West Delhi | Economics, Accounts, CBSE/ICSE",
    description:
      "Find best home tutor in West Delhi — Paschim Vihar, West Sagarpur, Janakpuri, Dwarka and more. Economics and Accounts focused tuition, Class 1-12, CBSE/ICSE coaching.",
    alternates: pageAlternates(locale, "/home-tuition"),
    robots: { index: true, follow: true },
  };
}

export default async function HomeTuitionLandingPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const zoneKey: ZoneKey = "west-delhi";
  const areas = zoneAreas[zoneKey];
  const activeLocale: Locale = locale;
  const pagePath = "/home-tuition";
  const pageUrl = `${siteUrl}${localePath(activeLocale, pagePath)}`;
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Home Tuition" }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListSchema(activeLocale, siteUrl, breadcrumbItems, pagePath),
      {
        "@type": "ItemList",
        name: `Home Tuition Areas in ${zoneLabels[zoneKey]}`,
        itemListElement: areas.map((area, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: area.name,
          url: `${siteUrl}${localePath(activeLocale, `/home-tuition/${zoneKey}/${area.slug}`)}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs locale={activeLocale} items={breadcrumbItems} />
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">
          Home Tutor in West Delhi
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          Get the best home tuition in West Delhi with strong focus on Economics and Accounts, plus complete support for
          Class 1st to 12th, CBSE and ICSE boards, and private tutoring by locality.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <TrackedLocaleLink
            locale={activeLocale}
            href="/subjects/accounts"
            eventName="cta_click"
            eventParams={{ cta_name: "home_tuition_accounts_classes" }}
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Accounts Classes with Ajay Sir (11th & 12th)
          </TrackedLocaleLink>
          <TrackedLocaleLink
            locale={activeLocale}
            href={contactHref("home-tuition")}
            eventName="cta_click"
            eventParams={{ cta_name: "home_tuition_contact" }}
            className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            Request home tuition callback
          </TrackedLocaleLink>
        </div>
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{zoneLabels[zoneKey]} areas</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <TrackedLocaleLink
                key={area.slug}
                locale={activeLocale}
                href={`/home-tuition/${zoneKey}/${area.slug}`}
                eventName="cta_click"
                eventParams={{ cta_name: "area_home_tuition", area: area.name }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                Home Tutor in {area.name}
              </TrackedLocaleLink>
            ))}
          </div>
        </section>
        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Popular Searches</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
            <li>Home Tutor in Paschim Vihar</li>
            <li>Best Home Tuition in West Sagarpur</li>
            <li>Private Tutor in Janakpuri</li>
            <li>CBSE/ICSE Tuition in Rajouri Garden</li>
            <li>Accounts Classes in Gandhi Market</li>
            <li>Economics Home Tutor in West Delhi</li>
          </ul>
        </section>
      </article>
    </>
  );
}
