import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { subjectLanding } from "@/lib/home-tuition-data";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

type PageProps = { params: Promise<{ locale: string; subject: string }> };

export function generateStaticParams() {
  return subjectLanding.map((item) => ({ subject: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, subject } = await params;
  if (!isLocale(locale)) return {};
  const subjectItem = subjectLanding.find((item) => item.slug === subject);
  if (!subjectItem) return {};
  return {
    title: `${subjectItem.title} in Delhi | Private Tutor & Home Tuition`,
    description: `Best ${subjectItem.title} in Delhi with experienced private tutors for school and board exams.`,
    alternates: pageAlternates(locale, `/subjects/${subject}`),
    robots: { index: true, follow: true },
  };
}

export default async function SubjectPage({ params }: PageProps) {
  const { locale, subject } = await params;
  if (!isLocale(locale)) notFound();
  const subjectItem = subjectLanding.find((item) => item.slug === subject);
  if (!subjectItem) notFound();
  const activeLocale: Locale = locale;
  const pagePath = `/subjects/${subjectItem.slug}`;
  const pageUrl = `${siteUrl}${localePath(activeLocale, pagePath)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}${localePath(activeLocale, "/")}` },
          { "@type": "ListItem", position: 2, name: "Subjects", item: `${siteUrl}${localePath(activeLocale, "/home-tuition")}` },
          { "@type": "ListItem", position: 3, name: subjectItem.title, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        name: `${subjectItem.title} in Delhi`,
        serviceType: subjectItem.title,
        provider: { "@type": "EducationalOrganization", name: "Shri Shyam Academy" },
        url: pageUrl,
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
              <TrackedLocaleLink locale={activeLocale} href="/home-tuition" eventName="cta_click" eventParams={{ cta_name: "breadcrumb_home_tuition" }} className="font-medium text-brand-700 dark:text-brand-400">
                Home Tuition
              </TrackedLocaleLink>
            </li>
            <li>/</li>
            <li className="text-slate-900 dark:text-slate-200">{subjectItem.title}</li>
          </ol>
        </nav>
      <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">{subjectItem.h1}</h1>
      <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
        Result-focused private tutor and home tuition support in Delhi for {subjectItem.title}, including CBSE/ICSE
        prep, concept clarity, revision plans, and exam strategy.
      </p>
      <TrackedLocaleLink
        locale={activeLocale}
        href={`/contact?need=${encodeURIComponent(subjectItem.title)}&source=${encodeURIComponent(`subject:${subjectItem.slug}`)}`}
        eventName="cta_click"
        eventParams={{ cta_name: "subject_callback", subject: subjectItem.title }}
        className="mt-6 inline-flex rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Request {subjectItem.title} Callback
      </TrackedLocaleLink>
      </article>
    </>
  );
}
