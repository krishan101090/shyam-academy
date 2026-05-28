import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { zoneAreas, zoneLabels, type ZoneKey } from "@/lib/home-tuition-data";
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}${localePath(activeLocale, "/")}` },
          { "@type": "ListItem", position: 2, name: "Home Tuition", item: `${siteUrl}${localePath(activeLocale, "/home-tuition")}` },
          { "@type": "ListItem", position: 3, name: zoneLabels[zoneKey], item: pageUrl },
        ],
      },
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
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600 dark:text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <TrackedLocaleLink locale={activeLocale} href="/" eventName="cta_click" eventParams={{ cta_name: "breadcrumb_home" }} className="font-medium text-brand-700 dark:text-brand-400">
                Home
              </TrackedLocaleLink>
            </li>
            <li>/</li>
            <li>
              <TrackedLocaleLink
                locale={activeLocale}
                href="/home-tuition"
                eventName="cta_click"
                eventParams={{ cta_name: "breadcrumb_home_tuition" }}
                className="font-medium text-brand-700 dark:text-brand-400"
              >
                Home Tuition
              </TrackedLocaleLink>
            </li>
            <li>/</li>
            <li className="text-slate-900 dark:text-slate-200">{zoneLabels[zoneKey]}</li>
          </ol>
        </nav>
      <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">
        Home Tuition in {zoneLabels[zoneKey]}
      </h1>
      <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
        Choose your locality to find the best home tutor in {zoneLabels[zoneKey]}. We provide private tutors for Economics,
        Accounts, CBSE/ICSE, and all major school subjects.
      </p>
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
