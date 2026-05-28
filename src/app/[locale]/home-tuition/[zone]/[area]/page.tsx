import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { contactHref } from "@/lib/contact-context";
import { additionalCourses, allAreaParams, coreSubjects, getArea, schoolCoverage, zoneLabels, type ZoneKey } from "@/lib/home-tuition-data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

type PageProps = { params: Promise<{ locale: string; zone: string; area: string }> };

export function generateStaticParams() {
  return allAreaParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, zone, area } = await params;
  if (!isLocale(locale)) return {};
  if (!(zone in zoneLabels)) return {};
  const zoneKey = zone as ZoneKey;
  const areaItem = getArea(zoneKey, area);
  if (!areaItem) return {};

  return {
    title: `Home Tutor in ${areaItem.name} | Best Home Tuition & Private Tutor`,
    description: `Best Home Tuition in ${areaItem.name}, ${zoneLabels[zoneKey]}. Private Tutor for Economics, Accounts, CBSE/ICSE, Class 1st to 12th and entrance foundation support.`,
    alternates: pageAlternates(locale, `/home-tuition/${zone}/${area}`),
    robots: { index: true, follow: true },
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { locale, zone, area } = await params;
  if (!isLocale(locale)) notFound();
  if (!(zone in zoneLabels)) notFound();
  const zoneKey = zone as ZoneKey;
  const areaItem = getArea(zoneKey, area);
  if (!areaItem) notFound();

  const activeLocale: Locale = locale;
  const pagePath = `/home-tuition/${zone}/${area}`;
  const pageUrl = `${siteUrl}${localePath(activeLocale, pagePath)}`;
  const faq = [
    {
      q: `Do you provide home tutor in ${areaItem.name} for Economics and Accounts?`,
      a: `Yes. We provide experienced home tutors in ${areaItem.name} with strong focus on Economics and Accounts for school and board exam preparation.`,
    },
    {
      q: `Which boards and classes are covered in ${areaItem.name}?`,
      a: `We cover CBSE and ICSE for Class 1st to 10th all subjects, and Class 11th and 12th for Economics, Accounts, Political Science, Hindi, English, and Computer Science.`,
    },
    {
      q: `Can I request a callback for home tuition in ${areaItem.name}?`,
      a: `Yes. Submit callback request and we will call you to discuss schedule, tutor matching, and subject requirements.`,
    },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Home Tuition", href: "/home-tuition" },
    { label: zoneLabels[zoneKey], href: `/home-tuition/${zoneKey}` },
    { label: areaItem.name },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListSchema(activeLocale, siteUrl, breadcrumbItems, pagePath),
      {
        "@type": "Service",
        name: `Home Tuition in ${areaItem.name}`,
        areaServed: areaItem.name,
        provider: { "@type": "EducationalOrganization", name: "Shri Shyam Academy" },
        serviceType: "Home Tuition",
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
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
          Best Home Tuition in {areaItem.name}, {zoneLabels[zoneKey]}
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          Looking for a Home Tutor in {areaItem.name}? Shri Shyam Academy provides private tutors with strong result-focused
          support in Economics and Accounts, plus complete school tuition for CBSE/ICSE students.
        </p>

        {(areaItem.slug === "paschim-vihar" || areaItem.slug === "west-sagarpur") && (
          <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/70 p-5 dark:border-brand-800 dark:bg-brand-950/40">
            <p className="text-sm font-semibold text-brand-900 dark:text-brand-100">
              Pioneers in Accounts — Ajay Sir · 20+ years · Class 11th & 12th specialist
            </p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              Home tuition and classroom Accounts batches at West Sagarpur, Gandhi Market. Known as one of the best Accounts teachers in Paschim Vihar.
            </p>
            <TrackedLocaleLink
              locale={activeLocale}
              href="/subjects/accounts"
              eventName="cta_click"
              eventParams={{ cta_name: "area_accounts_classes", area: areaItem.slug }}
              className="mt-4 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              View Accounts Classes with Ajay Sir
            </TrackedLocaleLink>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <TrackedLocaleLink
            locale={activeLocale}
            href={contactHref("home-tuition", { zone: zoneKey, area: areaItem.slug })}
            eventName="cta_click"
            eventParams={{ cta_name: "area_callback", area: areaItem.name }}
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Request Home Tuition Callback
          </TrackedLocaleLink>
          <TrackedAnchor
            href="tel:+918448537313"
            eventName="contact_click"
            eventParams={{ contact_type: "phone", page_type: "area", area: areaItem.name }}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            Call +91 84485 37313
          </TrackedAnchor>
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Subjects We Cover in {areaItem.name}</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {coreSubjects.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Classes, Boards, and Courses</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {schoolCoverage.map((item) => (
                <li key={item}>• {item}</li>
              ))}
              {additionalCourses.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Popular Searches in {areaItem.name}</h2>
          <div className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
            <p>Home Tutor in {areaItem.name}</p>
            <p>Best Home Tuition in {areaItem.name}</p>
            <p>Private Tutor in {areaItem.name}</p>
            <p>CBSE/ICSE Tuition in {areaItem.name}</p>
            <p>Economics Home Tutor in {areaItem.name}</p>
            <p>Accounts Tuition in {areaItem.name}</p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Popular Internal Links</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <TrackedLocaleLink locale={activeLocale} href="/subjects/economics" eventName="cta_click" eventParams={{ cta_name: "internal_economics", area: areaItem.name }} className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300">
              Economics Tuition
            </TrackedLocaleLink>
            <TrackedLocaleLink locale={activeLocale} href="/subjects/accounts" eventName="cta_click" eventParams={{ cta_name: "internal_accounts_classes", area: areaItem.name }} className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300">
              Accounts Classes (Ajay Sir)
            </TrackedLocaleLink>
            <TrackedLocaleLink locale={activeLocale} href="/subjects" eventName="cta_click" eventParams={{ cta_name: "internal_subjects", area: areaItem.name }} className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300">
              All Subjects
            </TrackedLocaleLink>
            <TrackedLocaleLink locale={activeLocale} href="/entrance-after-12th" eventName="cta_click" eventParams={{ cta_name: "internal_entrance", area: areaItem.name }} className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300">
              Entrance Coaching After 12th
            </TrackedLocaleLink>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">FAQs</h2>
          <div className="mt-4 space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">{item.q}</summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
