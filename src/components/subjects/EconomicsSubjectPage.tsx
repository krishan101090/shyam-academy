import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { contactHref } from "@/lib/contact-context";
import { siteUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

const highlights = [
  "Class 11th & 12th Economics specialist",
  "CBSE and ICSE board support",
  "Microeconomics, macroeconomics & statistics",
  "Graphs, numericals, and case-based questions",
  "Home tuition across West Delhi",
  "Revision and board paper practice",
];

const offerings = [
  "Class 11th — Statistics, Indian Economic Development, introductory microeconomics",
  "Class 12th — Microeconomics, macroeconomics, national income, money & banking",
  "Chapter tests, assignments, and full syllabus revision",
  "Board exam answer writing and time management",
  "Home tuition in Paschim Vihar, West Sagarpur, Janakpuri, Dwarka, and nearby areas",
];

const referenceBooks = [
  {
    classLabel: "Class 11th — CBSE & ICSE",
    books: [
      "NCERT — Indian Economic Development",
      "NCERT — Statistics for Economics",
      "NCERT — Introductory Microeconomics",
      "Sandeep Garg — Introductory Microeconomics (Class 11)",
      "T.R. Jain & V.K. Ohri — Statistics for Economics",
      "TR Jain & VK Ohri — Indian Economic Development",
    ],
  },
  {
    classLabel: "Class 12th — CBSE & ICSE",
    books: [
      "NCERT — Introductory Microeconomics",
      "NCERT — Introductory Macroeconomics",
      "Sandeep Garg — Microeconomics (Class 12)",
      "Sandeep Garg — Macroeconomics (Class 12)",
      "TR Jain & VK Ohri — Introductory Microeconomics & Macroeconomics",
      "CBSE sample papers and previous year board papers",
    ],
  },
];

const faq = [
  {
    q: "Do you provide Economics home tuition for Class 11th and 12th?",
    a: "Yes. We offer home tuition and centre-based support for Class 11th and 12th Economics for CBSE and ICSE students in West Delhi.",
  },
  {
    q: "Which Economics topics are covered?",
    a: "We cover the full school syllabus including microeconomics, macroeconomics, statistics (Class 11), national income, money and banking, and board-focused revision.",
  },
  {
    q: "Which Economics books do you teach from?",
    a: "We teach from NCERT and popular reference books such as Sandeep Garg and TR Jain & VK Ohri, based on your school curriculum.",
  },
];

type EconomicsSubjectPageProps = {
  locale: Locale;
};

export function EconomicsSubjectPage({ locale }: EconomicsSubjectPageProps) {
  const pagePath = "/subjects/economics";
  const pageUrl = `${siteUrl}${localePath(locale, pagePath)}`;
  const contactInterest = "Economics Tuition";
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Subjects", href: "/subjects" },
    { label: "Economics Tuition" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListSchema(locale, siteUrl, breadcrumbItems, pagePath),
      {
        "@type": "Course",
        name: "Class 11th & 12th Economics — CBSE & ICSE",
        provider: { "@type": "EducationalOrganization", name: "Shri Shyam Academy" },
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
      <Breadcrumbs locale={locale} items={breadcrumbItems} />
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white sm:text-5xl">
          Economics Home Tutor in West Delhi — Class 11th & 12th
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          Strong <strong className="font-semibold text-slate-800 dark:text-slate-100">Economics tuition</strong> for CBSE and ICSE students in West Delhi — concept clarity, numerical practice, diagrams, and board exam strategy for Class 11th and 12th.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <TrackedLocaleLink
            locale={locale}
            href={contactHref("economics-tuition")}
            eventName="cta_click"
            eventParams={{ cta_name: "economics_enquiry" }}
            className="inline-flex rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Enquire for Economics Tuition
          </TrackedLocaleLink>
          <TrackedAnchor
            href="tel:+918448537313"
            eventName="contact_click"
            eventParams={{ contact_type: "phone", ui_section: "economics_tuition" }}
            className="inline-flex rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            Call +91 84485 37313
          </TrackedAnchor>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Why choose us for Economics</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/50">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">What we teach</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {offerings.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Economics books we cover</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Teaching is aligned to your school syllabus — NCERT plus reference books commonly used in CBSE and ICSE schools.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {referenceBooks.map((group) => (
              <div
                key={group.classLabel}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{group.classLabel}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {group.books.map((book) => (
                    <li key={book}>• {book}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
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

        <section className="mt-12 flex flex-wrap gap-3 text-sm">
          <TrackedLocaleLink
            locale={locale}
            href="/subjects/accounts"
            eventName="cta_click"
            eventParams={{ cta_name: "economics_accounts" }}
            className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 font-medium text-brand-800 hover:border-brand-300 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-200"
          >
            Accounts Classes with Ajay Sir
          </TrackedLocaleLink>
          <TrackedLocaleLink
            locale={locale}
            href="/home-tuition/west-delhi"
            eventName="cta_click"
            eventParams={{ cta_name: "economics_west_delhi" }}
            className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300"
          >
            Home Tuition in West Delhi
          </TrackedLocaleLink>
          <TrackedLocaleLink
            locale={locale}
            href="/subjects"
            eventName="cta_click"
            eventParams={{ cta_name: "economics_all_subjects" }}
            className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300"
          >
            All Subjects
          </TrackedLocaleLink>
        </section>
      </article>
    </>
  );
}
