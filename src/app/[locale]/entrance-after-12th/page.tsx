import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { pageAlternates, siteUrl } from "@/lib/seo";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

type PageProps = { params: Promise<{ locale: string }> };

const tracks = [
  "CUET Preparation",
  "IPMAT",
  "CLAT",
  "NDA",
  "SSC Foundation",
  "Banking Foundation",
  "BBA/B.Com Entrance Coaching",
  "Spoken English & Interview Preparation",
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Entrance Exam Preparation After 12th in Delhi | CUET, IPMAT, CLAT, NDA",
    description:
      "Best entrance preparation classes in North Delhi and West Delhi for CUET, IPMAT, CLAT, NDA, SSC foundation, banking foundation, BBA/B.Com entrance and interview skills.",
    keywords: [
      "Entrance Coaching After 12th in Delhi",
      "CUET Coaching in North Delhi",
      "Home Tutor for Entrance Exams",
      "Best Entrance Preparation Classes in West Delhi",
    ],
    alternates: pageAlternates(locale, "/entrance-after-12th"),
    robots: { index: true, follow: true },
  };
}

export default async function EntranceAfter12thPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const activeLocale: Locale = locale;
  const pageUrl = `${siteUrl}${localePath(activeLocale, "/entrance-after-12th")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}${localePath(activeLocale, "/")}` },
          { "@type": "ListItem", position: 2, name: "Entrance After 12th", item: pageUrl },
        ],
      },
      {
        "@type": "Course",
        name: "Entrance Exam Preparation After 12th",
        provider: { "@type": "EducationalOrganization", name: "Shri Shyam Academy" },
        description:
          "Entrance Coaching After 12th in Delhi for CUET, IPMAT, CLAT, NDA, SSC and Banking foundation, BBA/B.Com entrance preparation and interview skills.",
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Which entrance exams after 12th are covered?",
            acceptedAnswer: { "@type": "Answer", text: "We cover CUET, IPMAT, CLAT, NDA, SSC and Banking foundation, BBA/B.Com entrance, and interview preparation." },
          },
          {
            "@type": "Question",
            name: "Do you provide entrance coaching support in North and West Delhi?",
            acceptedAnswer: { "@type": "Answer", text: "Yes, students across North Delhi and West Delhi can request coaching and callback support through our enquiry form." },
          },
        ],
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
            <li className="text-slate-900 dark:text-slate-200">Entrance After 12th</li>
          </ol>
        </nav>
        <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">
          Entrance Exam Preparation After 12th in Delhi
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          Strong preparation tracks for CUET, IPMAT, CLAT, NDA, SSC and Banking foundation, plus BBA/B.Com entrance
          coaching and spoken English with interview preparation.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <TrackedLocaleLink
            locale={activeLocale}
            href="/contact?need=CUET Coaching&source=entrance-after-12th"
            eventName="cta_click"
            eventParams={{ cta_name: "entrance_callback" }}
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Enquire for Entrance Coaching
          </TrackedLocaleLink>
          <TrackedAnchor
            href="tel:+918448537313"
            eventName="contact_click"
            eventParams={{ contact_type: "phone", page_type: "entrance_after_12th" }}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            Call +91 84485 37313
          </TrackedAnchor>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {tracks.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{item}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Structured syllabus coverage, chapter tests, mocks, doubt support, and performance feedback for {item}.
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">SEO Keywords Covered</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>• Entrance Coaching After 12th in Delhi</li>
            <li>• CUET Coaching in North Delhi</li>
            <li>• Home Tutor for Entrance Exams</li>
            <li>• Best Entrance Preparation Classes in West Delhi</li>
          </ul>
        </section>
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Popular Internal Links</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <TrackedLocaleLink locale={activeLocale} href="/home-tuition/north-delhi" eventName="cta_click" eventParams={{ cta_name: "internal_north_delhi_tuition" }} className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300">
              Home Tutor in North Delhi
            </TrackedLocaleLink>
            <TrackedLocaleLink locale={activeLocale} href="/home-tuition/west-delhi" eventName="cta_click" eventParams={{ cta_name: "internal_west_delhi_tuition" }} className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300">
              Home Tutor in West Delhi
            </TrackedLocaleLink>
            <TrackedLocaleLink locale={activeLocale} href="/subjects/economics-tuition" eventName="cta_click" eventParams={{ cta_name: "internal_economics" }} className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300">
              Economics Tuition
            </TrackedLocaleLink>
            <TrackedLocaleLink locale={activeLocale} href="/subjects/accounts-tuition" eventName="cta_click" eventParams={{ cta_name: "internal_accounts" }} className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300">
              Accounts Tuition
            </TrackedLocaleLink>
          </div>
        </section>
      </article>
    </>
  );
}
