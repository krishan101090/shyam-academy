import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { contactHref } from "@/lib/contact-context";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { zoneAreas, zoneLabels, type ZoneKey } from "@/lib/home-tuition-data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

type PageProps = { params: Promise<{ locale: string; zone: string }> };

export function generateStaticParams() {
  return (Object.keys(zoneLabels) as ZoneKey[]).map((zone) => ({ zone }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, zone } = await params;
  if (!isLocale(locale)) return {};
  if (!(zone in zoneLabels)) return {};
  const zoneKey = zone as ZoneKey;
  return {
    title: `Best Home Tuition in ${zoneLabels[zoneKey]} | Private Home Tutor by Area`,
    description: `Explore locality-wise home tutor pages in ${zoneLabels[zoneKey]} for Economics, Accounts, CBSE/ICSE tuition, and class 1st to 12th support.`,
    alternates: pageAlternates(locale, `/home-tuition/${zone}`),
    robots: { index: true, follow: true },
  };
}

export default async function ZonePage({ params }: PageProps) {
  const { locale, zone } = await params;
  if (!isLocale(locale)) notFound();
  if (!(zone in zoneLabels)) notFound();
  const activeLocale: Locale = locale;
  const zoneKey = zone as ZoneKey;
  const areas = zoneAreas[zoneKey];
  const pagePath = `/home-tuition/${zoneKey}`;
  const pageUrl = `${siteUrl}${localePath(activeLocale, pagePath)}`;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Home Tuition", href: "/home-tuition" },
    { label: zoneLabels[zoneKey] },
  ];

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
        Home Tuition in {zoneLabels[zoneKey]}
      </h1>
      <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
        Choose your locality to find the best home tutor in {zoneLabels[zoneKey]}. We provide private tutors for Economics,
        Accounts, CBSE/ICSE, and all major school subjects.
      </p>
      <TrackedLocaleLink
        locale={activeLocale}
        href={contactHref("home-tuition", { zone: zoneKey })}
        eventName="cta_click"
        eventParams={{ cta_name: "zone_home_tuition_contact", zone: zoneKey }}
        className="mt-6 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Enquire for home tuition in {zoneLabels[zoneKey]}
      </TrackedLocaleLink>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <TrackedLocaleLink
            key={area.slug}
            locale={activeLocale}
            href={`/home-tuition/${zoneKey}/${area.slug}`}
            eventName="cta_click"
            eventParams={{ cta_name: "view_area_home_tuition", zone: zoneKey, area: area.name }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          >
            Home Tutor in {area.name}
          </TrackedLocaleLink>
        ))}
      </div>
      </article>
    </>
  );
}
