import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { contactHref } from "@/lib/contact-context";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import { subjects } from "@/lib/subjects-data";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Subjects — Accounts & Economics | Class 11th & 12th | West Delhi",
    description:
      "Subject-wise tuition in West Delhi: Accounts classes with Ajay Sir (11th & 12th specialist) and Economics home tuition for CBSE and ICSE.",
    alternates: pageAlternates(locale, "/subjects"),
    robots: { index: true, follow: true },
  };
}

export default async function SubjectsHubPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const activeLocale: Locale = locale;
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Subjects" }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListSchema(activeLocale, siteUrl, breadcrumbItems, "/subjects"),
      {
    "@type": "ItemList",
    name: "Subjects at Shri Shyam Academy",
    itemListElement: subjects.map((subject, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: subject.title,
      url: `${siteUrl}${localePath(activeLocale, `/subjects/${subject.slug}`)}`,
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
          Subjects — Accounts & Economics
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          Choose a subject for detailed information, books covered, and enquiry. More subjects can be added here as we expand our programmes.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {subjects.map((subject) => (
            <div
              key={subject.slug}
              className={`rounded-2xl border p-6 ${
                subject.featured
                  ? "border-brand-200 bg-brand-50/50 dark:border-brand-800 dark:bg-brand-950/30"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              {subject.badge ? (
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">{subject.badge}</p>
              ) : null}
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{subject.title}</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{subject.hubDescription}</p>
              <TrackedLocaleLink
                locale={activeLocale}
                href={`/subjects/${subject.slug}`}
                eventName="cta_click"
                eventParams={{ cta_name: "subjects_hub_card", subject: subject.slug }}
                className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                View {subject.shortTitle}
              </TrackedLocaleLink>
            </div>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Also explore</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <TrackedLocaleLink
              locale={activeLocale}
              href="/home-tuition/west-delhi"
              eventName="cta_click"
              eventParams={{ cta_name: "subjects_hub_home_tuition" }}
              className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:text-slate-300"
            >
              Home Tuition in West Delhi
            </TrackedLocaleLink>
            <TrackedLocaleLink
              locale={activeLocale}
              href={contactHref("subjects")}
              eventName="cta_click"
              eventParams={{ cta_name: "subjects_hub_contact" }}
              className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:text-slate-300"
            >
              Request a Callback
            </TrackedLocaleLink>
          </div>
        </section>
      </article>
    </>
  );
}
