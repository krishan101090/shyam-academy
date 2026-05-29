import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/breadcrumb-schema";
import { L } from "@/lib/with-locale-links";
import { LeadFormNios } from "@/components/LeadFormNios";
import { hindiSeoKeywords } from "@/lib/seo-keywords";
import { contactHref } from "@/lib/contact-context";
import { absoluteLocaleUrl, indexablePageMetadata, siteUrl } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

const pageDescription =
  "NIOS admission support in Delhi for Secondary (10th) and Senior Secondary (12th): SDMIS steps, subject planning, exam coaching, and callbacks from Shri Shyam Academy in West Sagarpur, New Delhi.";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const isHi = raw === "hi";
  const pageUrl = absoluteLocaleUrl(raw, "/nios-admission-delhi");
  return {
  title: isHi ? "NIOS दाखिला दिल्ली | 10वीं 12वीं SDMIS और ट्यूशन" : "NIOS Admission Delhi | Class 10 & 12 Form Help, SDMIS & Coaching",
  description: isHi
    ? "दिल्ली में NIOS 10वीं और 12वीं दाखिला: SDMIS, विषय योजना और ट्यूशन — श्री श्याम एकेडमी, वेस्ट सागरपुर।"
    : pageDescription,
  keywords: [
    "NIOS admission Delhi",
    "NIOS admission 2026 Delhi",
    "NIOS 10th admission Delhi",
    "NIOS 12th admission Delhi",
    "NIOS SDMIS help",
    "NIOS coaching Delhi",
    "NIOS open school Delhi",
    "NIOS form help Delhi",
    "NIOS Sagarpur",
    "NIOS West Delhi",
    ...hindiSeoKeywords,
  ],
  ...indexablePageMetadata(raw, "/nios-admission-delhi"),
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "NIOS Admission Delhi | Shri Shyam Academy — 10th & 12th",
    description:
      "Get expert help with NIOS admission in Delhi: SDMIS, subject choices, and coaching for class 10th and 12th. Request a callback from Shri Shyam Academy.",
    locale: isHi ? "hi_IN" : "en_IN",
    images: [{ url: "/images/hero-coaching.webp", width: 1792, height: 1024, alt: "NIOS and school coaching in Delhi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIOS Admission Delhi | Shri Shyam Academy",
    description: "NIOS 10th & 12th admission help, SDMIS guidance, and coaching in West Sagarpur, New Delhi.",
    images: ["/images/hero-coaching.webp"],
  },
  };
}

const faqItems = [
  {
    q: "What is NIOS admission in Delhi?",
    a: "NIOS admission in Delhi means enrolling as a learner with the National Institute of Open Schooling (Ministry of Education, India), choosing subjects for Secondary (10th) or Senior Secondary (12th), and completing official steps on the SDMIS portal for your admission cycle.",
  },
  {
    q: "Where do I apply for NIOS admission online?",
    a: "Official learner admissions for NIOS are handled through the SDMIS portal at sdmis.nios.ac.in. Always confirm the latest dates, fees, and forms on the official NIOS website before paying or submitting documents.",
  },
  {
    q: "Can Shri Shyam Academy complete my NIOS admission for me?",
    a: "We provide academic coaching, subject planning, and clear guidance on what to prepare while you complete official NIOS steps yourself on SDMIS. We are not NIOS and cannot submit government forms on your behalf.",
  },
  {
    q: "Do you support NIOS class 10th and 12th in Delhi?",
    a: "Yes. We help Delhi learners plan for NIOS Secondary (10th) and Senior Secondary (12th), including study schedules, past paper practice, and subject support aligned to your chosen NIOS subjects.",
  },
  {
    q: "Is NIOS valid for further study and jobs?",
    a: "NIOS is a recognised open schooling board under the Government of India when you complete the required credits, assignments, and examinations according to current NIOS rules. Always verify specific institution or employer requirements.",
  },
  {
    q: "Where is Shri Shyam Academy located for NIOS students in Delhi?",
    a: "We are in West Sagarpur, New Delhi (near Shanker Park). Many learners visit for doubt classes, structured revision, and exam preparation alongside their NIOS study plan.",
  },
];

export default async function NiosAdmissionDelhiPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const pageUrl = `${siteUrl}${localePath(locale, "/nios-admission-delhi")}`;

  const breadcrumbLabel = locale === "hi" ? "NIOS दाखिला दिल्ली" : "NIOS admission Delhi";
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: breadcrumbLabel }];

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbListSchema(locale, siteUrl, breadcrumbItems, "/nios-admission-delhi"),
      {
        "@type": "WebPage",
        url: pageUrl,
        name: "NIOS Admission Delhi | Class 10 & 12 Help | Shri Shyam Academy",
        description: pageDescription,
        inLanguage: locale === "hi" ? "hi" : "en-IN",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }} />
      <Breadcrumbs locale={locale} items={breadcrumbItems} />

      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">NIOS admission · Delhi · 10th & 12th</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance dark:text-white sm:text-5xl">
              NIOS admission Delhi — 10th & 12th tuition and SDMIS help
            </h1>
            <p className="lead-summary mt-4 text-lg text-slate-600 dark:text-slate-300">
              If you want <strong className="font-semibold text-slate-800 dark:text-slate-100">NIOS admission in Delhi</strong> for{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">class 10th or 12th</strong>, Shri Shyam Academy helps you combine
              official <strong className="font-semibold text-slate-800 dark:text-slate-100">SDMIS</strong> processes with a realistic study plan,
              subject teaching, and exam practice — from our centre in <strong className="font-semibold text-slate-800 dark:text-slate-100">West Sagarpur</strong>.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <L
                locale={locale}
                href={contactHref("nios-admission")}
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
              >
                Enquire about admission
              </L>
              <a
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                href="tel:+918448537313"
              >
                Call +91 84485 37313
              </a>
              <L
                locale={locale}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                href="/updates"
              >
                NIOS Delhi updates
              </L>
              <L
                locale={locale}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                href="/nios"
              >
                Read NIOS guide
              </L>
            </div>

            <section className="mt-12" aria-labelledby="why-heading">
              <h2 id="why-heading" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                Why combine NIOS admission help with tuition
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                <li>Get the right subjects on SDMIS from the start — then study them with a fixed weekly plan.</li>
                <li>NIOS 10th and 12th tuition covers concepts, TMAs, and exam papers for your exact subject list.</li>
                <li>Local teachers in Delhi when self-study stalls on a unit or assignment.</li>
                <li>One centre for admission counselling and ongoing coaching in West Sagarpur.</li>
              </ul>
            </section>

            <section className="mt-12" aria-labelledby="process-heading">
              <h2 id="process-heading" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                A simple flow for NIOS learners in Delhi
              </h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-600 dark:text-slate-300">
                <li>Confirm your goal: NIOS Secondary (10th) or Senior Secondary (12th) and target exam cycle.</li>
                <li>Complete official admission steps on SDMIS when the window is open.</li>
                <li>Build a subject-wise study plan with assessments and doubt support at our academy.</li>
                <li>Stay aligned with NIOS assignments (such as TMAs) and exam preparation as per NIOS instructions.</li>
              </ol>
            </section>

            <section className="mt-12" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                Frequently asked questions
              </h2>
              <dl className="mt-6 space-y-6">
                {faqItems.map((item) => (
                  <div key={item.q}>
                    <dt className="font-semibold text-slate-900 dark:text-white">{item.q}</dt>
                    <dd className="mt-2 text-slate-600 dark:text-slate-300">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Request a free NIOS admission callback</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Share your details — we will contact you about <strong className="font-medium text-slate-800 dark:text-slate-200">NIOS admission in Delhi</strong>,{" "}
                <strong className="font-medium text-slate-800 dark:text-slate-200">class 10th or 12th</strong>, and coaching options.
              </p>
              <div className="mt-6">
                <LeadFormNios />
              </div>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
                By submitting, you agree we may contact you about NIOS-related coaching and admissions guidance. Official NIOS decisions and SDMIS records
                remain with NIOS.
              </p>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
