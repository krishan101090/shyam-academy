import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { zoneLabels, zoneAreas, type ZoneKey } from "@/lib/home-tuition-data";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Home Tuition in North Delhi & West Delhi | Economics, Accounts, CBSE/ICSE",
    description:
      "Find best home tutor in North Delhi and West Delhi. Economics and Accounts focused tuition, Class 1-12 support, CBSE/ICSE coaching, and private tutors by locality.",
    alternates: pageAlternates(locale, "/home-tuition"),
    robots: { index: true, follow: true },
  };
}

export default async function HomeTuitionLandingPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const zoneKeys = Object.keys(zoneLabels) as ZoneKey[];
  const activeLocale: Locale = locale;
  const pagePath = "/home-tuition";
  const pageUrl = `${siteUrl}${localePath(activeLocale, pagePath)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}${localePath(activeLocale, "/")}` },
          { "@type": "ListItem", position: 2, name: "Home Tuition", item: pageUrl },
        ],
      },
      {
        "@type": "ItemList",
        name: "Home Tuition Zones",
        itemListElement: zoneKeys.map((zone, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: zoneLabels[zone],
          url: `${siteUrl}${localePath(activeLocale, `/home-tuition/${zone}`)}`,
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
              <TrackedLocaleLink
                locale={activeLocale}
                href="/"
                eventName="cta_click"
                eventParams={{ cta_name: "breadcrumb_home" }}
                className="font-medium text-brand-700 dark:text-brand-400"
              >
                Home
              </TrackedLocaleLink>
            </li>
            <li>/</li>
            <li className="text-slate-900 dark:text-slate-200">Home Tuition</li>
          </ol>
        </nav>
      <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">
        Home Tutor in North Delhi and West Delhi
      </h1>
      <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
        Get the best home tuition in Delhi with strong focus on Economics and Accounts, plus complete support for Class
        1st to 12th, CBSE and ICSE boards, and private tutoring by locality.
      </p>
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {zoneKeys.map((zone) => (
          <div key={zone} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{zoneLabels[zone]}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Dedicated local pages for {zoneAreas[zone].length} major areas.
            </p>
            <TrackedLocaleLink
              locale={activeLocale}
              href={`/home-tuition/${zone}`}
              eventName="cta_click"
              eventParams={{ cta_name: "view_zone_home_tuition", zone }}
              className="mt-4 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              View {zoneLabels[zone]} Areas
            </TrackedLocaleLink>
          </div>
        ))}
      </section>
      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Popular Searches</h2>
        <ul className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
          <li>Home Tutor in Rohini</li>
          <li>Best Home Tuition in Janakpuri</li>
          <li>Private Tutor in Pitampura</li>
          <li>CBSE/ICSE Tuition in Rajouri Garden</li>
          <li>Economics Home Tutor in West Delhi</li>
          <li>Accounts Tuition in North Delhi</li>
        </ul>
      </section>
      </article>
    </>
  );
}
