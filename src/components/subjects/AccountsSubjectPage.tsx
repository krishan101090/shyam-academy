import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { contactHref } from "@/lib/contact-context";
import { siteUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

const centreAddress =
  "RZ 41 A, Shanker Park, Near Allahabad Dairy, West Sagarpur Gandhi Market, New Delhi 110046";

const highlights = [
  "Pioneers in Accounts classes in West Delhi",
  "20+ years of teaching experience",
  "11th & 12th Accounts specialist (CBSE & ICSE)",
  "Concept clarity, journal entries, financial statements & board exam strategy",
  "Small batches and personal attention",
  "Home tuition and classroom batches",
];

const offerings = [
  "Class 11th Accounts — fundamentals, ledger, trial balance, depreciation",
  "Class 12th Accounts — partnership, company accounts, cash flow, ratios, board papers",
  "Revision batches before pre-boards and finals",
  "Doubt-solving sessions and test series",
  "Home tuition in Paschim Vihar, West Sagarpur, and nearby West Delhi areas",
];

const referenceBooks = [
  {
    classLabel: "Class 11th — CBSE & ICSE",
    books: [
      "NCERT Accountancy (Financial Accounting Part I)",
      "DK Goel — Accountancy (Class 11)",
      "T.S. Grewal — Double Entry Book Keeping (Class 11)",
      "Sandeep Garg — Accountancy (Class 11)",
      "P.C. Tulsian — Financial Accounting (Class 11)",
    ],
  },
  {
    classLabel: "Class 12th — CBSE & ICSE",
    books: [
      "NCERT Accountancy Part I & Part II",
      "DK Goel — Analysis of Financial Statements (Class 12)",
      "T.S. Grewal — Analysis of Financial Statements (Vol. I & II)",
      "Sandeep Garg — Accountancy (Class 12)",
      "P.C. Tulsian — Accountancy (Class 12)",
      "D.K. Goel — Computerised Accounting (where applicable)",
    ],
  },
];

const faq = [
  {
    q: "Who teaches Accounts at Shri Shyam Academy?",
    a: "Ajay Sir leads Accounts classes with 20+ years of experience and is known as one of the best Accounts teachers in Paschim Vihar and West Delhi for Class 11th and 12th.",
  },
  {
    q: "Do you offer both home tuition and classroom Accounts classes?",
    a: "Yes. We provide home tuition for Accounts and regular classroom batches at our centre in West Sagarpur, Gandhi Market.",
  },
  {
    q: "Which boards do you cover for Accounts?",
    a: "We specialize in CBSE and ICSE Accounts for Class 11th and 12th with board-focused notes, assignments, and exam practice.",
  },
  {
    q: "Where is the Accounts coaching centre located?",
    a: `Our centre is at ${centreAddress}. Families from Paschim Vihar, Sagarpur, Palam, and West Delhi visit for Accounts classes.`,
  },
  {
    q: "Which Accounts books do you teach from?",
    a: "We cover NCERT, DK Goel, T.S. Grewal, Sandeep Garg, and P.C. Tulsian for Class 11th and 12th — aligned to your school syllabus and board paper pattern.",
  },
];

type AccountsSubjectPageProps = {
  locale: Locale;
};

export function AccountsSubjectPage({ locale }: AccountsSubjectPageProps) {
  const dict = getDictionary(locale);
  const pagePath = "/subjects/accounts";
  const pageUrl = `${siteUrl}${localePath(locale, pagePath)}`;
  const contactInterest = "Accounts Classes (11th & 12th)";
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Subjects", href: "/subjects" },
    { label: "Accounts Classes" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListSchema(locale, siteUrl, breadcrumbItems, pagePath),
      {
        "@type": "Course",
        name: "Class 11th & 12th Accounts — CBSE & ICSE",
        description:
          "Accounts classes and home tuition with Ajay Sir, 20+ years experience, specialist for Class 11th and 12th in West Delhi.",
        provider: {
          "@type": "EducationalOrganization",
          name: "Shri Shyam Academy",
          address: {
            "@type": "PostalAddress",
            streetAddress: centreAddress,
            addressLocality: "West Sagarpur",
            addressRegion: "Delhi",
            postalCode: "110046",
            addressCountry: "IN",
          },
        },
        instructor: {
          "@type": "Person",
          name: "Ajay Sir",
          jobTitle: "Accounts Teacher",
          description: "20+ years experience. Best Accounts teacher in Paschim Vihar. Class 11th & 12th Accounts specialist.",
        },
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
        <p className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-800 dark:bg-brand-900/40 dark:text-brand-200">
          Pioneers in Accounts · 20+ Years Experience
        </p>

        <h1 className="mt-4 font-display text-4xl font-semibold text-slate-900 dark:text-white sm:text-5xl">
          Best Accounts Classes in Paschim Vihar & West Sagarpur — Ajay Sir
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          Shri Shyam Academy is a trusted name for <strong className="font-semibold text-slate-800 dark:text-slate-100">Class 11th & 12th Accounts</strong> in West Delhi.
          Learn from <strong className="font-semibold text-slate-800 dark:text-slate-100">Ajay Sir</strong> — with more than 20 years of experience and a strong reputation as one of the best Accounts teachers in Paschim Vihar.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <TrackedLocaleLink
            locale={locale}
            href={contactHref("accounts-classes")}
            eventName="cta_click"
            eventParams={{ cta_name: "accounts_enquiry" }}
            className="inline-flex rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Enquire for Accounts Classes
          </TrackedLocaleLink>
          <TrackedAnchor
            href="tel:+918448537313"
            eventName="contact_click"
            eventParams={{ contact_type: "phone", ui_section: "accounts_classes" }}
            className="inline-flex rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            Call +91 84485 37313
          </TrackedAnchor>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-6 dark:border-brand-800 dark:bg-brand-950/30">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Ajay Sir — Accounts Specialist</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>• 20+ years teaching Accounts</li>
              <li>• Known as one of the best Accounts teachers in Paschim Vihar</li>
              <li>• Specialist for Class 11th & 12th (CBSE & ICSE)</li>
              <li>• Strong track record in board results and concept building</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Home Tuition + Classroom Classes</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Choose what works for your child — private home tuition for Accounts or join our classroom batches at our West Delhi centre.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-800 dark:text-slate-200">{dict.footer.address}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Why families choose us for Accounts</h2>
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
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Accounts books we cover</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Ajay Sir teaches chapter-wise from the books your school follows — NCERT plus popular reference books used in CBSE and ICSE schools across West Delhi.
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

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Popular searches</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
            <li>Best Accounts classes in Paschim Vihar</li>
            <li>Accounts home tuition West Sagarpur</li>
            <li>11th Accounts tuition West Delhi</li>
            <li>12th Accounts classes Gandhi Market</li>
            <li>CBSE Accounts teacher Paschim Vihar</li>
            <li>ICSE Accounts coaching West Delhi</li>
          </ul>
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
            href="/subjects/economics"
            eventName="cta_click"
            eventParams={{ cta_name: "accounts_economics" }}
            className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300"
          >
            Economics Tuition
          </TrackedLocaleLink>
          <TrackedLocaleLink
            locale={locale}
            href="/home-tuition/west-delhi/paschim-vihar"
            eventName="cta_click"
            eventParams={{ cta_name: "accounts_paschim_vihar" }}
            className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300"
          >
            Home Tuition in Paschim Vihar
          </TrackedLocaleLink>
          <TrackedLocaleLink
            locale={locale}
            href="/subjects"
            eventName="cta_click"
            eventParams={{ cta_name: "accounts_all_subjects" }}
            className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300"
          >
            All Subjects
          </TrackedLocaleLink>
        </section>
      </article>
    </>
  );
}
