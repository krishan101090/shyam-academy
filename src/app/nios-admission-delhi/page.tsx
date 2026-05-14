import type { Metadata } from "next";
import Link from "next/link";
import { LeadFormNios } from "@/components/LeadFormNios";

const siteUrl = "https://shrishyamacademy.com";
const pagePath = "/nios-admission-delhi";
const pageUrl = `${siteUrl}${pagePath}`;

const pageDescription =
  "NIOS admission support in Delhi for Secondary (10th) and Senior Secondary (12th): SDMIS steps, subject planning, exam coaching, and callbacks from Shri Shyam Academy in West Sagarpur, New Delhi. दिल्ली में NIOS दसवीं व बारहवीं प्रवेश, SDMIS, विषय योजना व कोचिंग — पश्चिम सागरपुर, नई दिल्ली।";

export const metadata: Metadata = {
  title: "NIOS Admission Delhi | दिल्ली में NIOS प्रवेश | Class 10 & 12",
  description: pageDescription,
  keywords: [
    "NIOS admission Delhi",
    "NIOS admission 2026 Delhi",
    "NIOS 10th admission Delhi",
    "NIOS 12th admission Delhi",
    "NIOS SDMIS help",
    "NIOS coaching Delhi",
    "दिल्ली में NIOS प्रवेश",
    "NIOS दसवीं दिल्ली",
    "NIOS बारहवीं दिल्ली",
    "NIOS Sagarpur",
    "NIOS West Delhi",
  ],
  alternates: { canonical: pagePath },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "NIOS Admission Delhi | Shri Shyam Academy — 10th & 12th",
    description:
      "Get expert help with NIOS admission in Delhi: SDMIS, subject choices, and coaching for class 10th and 12th. दिल्ली में NIOS प्रवेश व कोचिंग — श्री श्याम अकादमी से कॉलबैक लें।",
    locale: "en_IN",
    images: [{ url: "/images/hero-coaching.webp", width: 1792, height: 1024, alt: "NIOS and school coaching in Delhi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIOS Admission Delhi | Shri Shyam Academy",
    description: "NIOS 10th & 12th admission help, SDMIS guidance, and coaching in West Sagarpur, New Delhi.",
    images: ["/images/hero-coaching.webp"],
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  {
    qEn: "What is NIOS admission in Delhi?",
    qHi: "दिल्ली में NIOS प्रवेश क्या है?",
    aEn:
      "NIOS admission in Delhi means enrolling as a learner with the National Institute of Open Schooling (Ministry of Education, India), choosing subjects for Secondary (10th) or Senior Secondary (12th), and completing official steps on the SDMIS portal for your admission cycle.",
    aHi:
      "दिल्ली में NIOS प्रवेश का अर्थ है राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान में शिक्षार्थी के रूप में नामांकन, 10वीं या 12वीं के लिए विषय चुनना, और SDMIS पोर्टल पर आधिकारिक चरण पूरे करना।",
  },
  {
    qEn: "Where do I apply for NIOS admission online?",
    qHi: "मैं NIOS प्रवेश के लिए ऑनलाइन कहाँ आवेदन करूँ?",
    aEn:
      "Official learner admissions for NIOS are handled through the SDMIS portal at sdmis.nios.ac.in. Always confirm the latest dates, fees, and forms on the official NIOS website before paying or submitting documents.",
    aHi:
      "NIOS के आधिकारिक प्रवेश SDMIS पोर्टल sdmis.nios.ac.in पर होते हैं। भुगतान से पहले आधिकारिक वेबसाइट पर तिथियाँ व शुल्क पुष्टि करें।",
  },
  {
    qEn: "Can Shri Shyam Academy complete my NIOS admission for me?",
    qHi: "क्या श्री श्याम अकादमी मेरा NIOS प्रवेश स्वयं पूरा कर सकती है?",
    aEn:
      "We provide academic coaching, subject planning, and clear guidance on what to prepare while you complete official NIOS steps yourself on SDMIS. We are not NIOS and cannot submit government forms on your behalf.",
    aHi:
      "हम कोचिंग व मार्गदर्शन देते हैं; SDMIS पर आधिकारिक चरण आप स्वयं पूरा करेंगे। हम आपकी ओर से सरकारी फॉर्म जमा नहीं कर सकते।",
  },
  {
    qEn: "Do you support NIOS class 10th and 12th in Delhi?",
    qHi: "क्या आप दिल्ली में NIOS 10वीं और 12वीं का सहयोग करते हैं?",
    aEn:
      "Yes. We help Delhi learners plan for NIOS Secondary (10th) and Senior Secondary (12th), including study schedules, past paper practice, and subject support aligned to your chosen NIOS subjects.",
    aHi:
      "हाँ। दिल्ली में 10वीं व 12वीं NIOS के लिए अध्ययन कार्यक्रम, पुराने प्रश्नपत्र व विषय सहायता मिलती है।",
  },
  {
    qEn: "Is NIOS valid for further study and jobs?",
    qHi: "क्या NIOS आगे की पढ़ाई और नौकरियों के लिए मान्य है?",
    aEn:
      "NIOS is a recognised open schooling board under the Government of India when you complete the required credits, assignments, and examinations according to current NIOS rules. Always verify specific institution or employer requirements.",
    aHi:
      "NIOS नियमों के अनुसार क्रेडिट व परीक्षाएँ पूरी करने पर बोर्ड मान्य है; संस्थान-विशिष्ट शर्तें जाँचें।",
  },
  {
    qEn: "Where is Shri Shyam Academy located for NIOS students in Delhi?",
    qHi: "दिल्ली में NIOS छात्रों के लिए श्री श्याम अकादमी कहाँ है?",
    aEn:
      "We are in West Sagarpur, New Delhi (near Shanker Park). Many learners visit for doubt classes, structured revision, and exam preparation alongside their NIOS study plan.",
    aHi:
      "नई दिल्ली पश्चिम सागरपुर (शंकर पार्क के पास) — संदेह कक्षा व परीक्षा तैयारी के लिए।",
  },
];

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "NIOS Admission Delhi | Class 10 & 12 Help | Shri Shyam Academy",
      description: pageDescription,
      isPartOf: { "@type": "WebSite", url: siteUrl, name: "Shri Shyam Academy" },
      about: { "@type": "Thing", name: "NIOS Secondary and Senior Secondary admissions in Delhi" },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}/images/hero-coaching.webp` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".lead-summary"],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "NIOS admission Delhi", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: `${item.qEn} ${item.qHi}`,
        acceptedAnswer: { "@type": "Answer", text: `${item.aEn} ${item.aHi}` },
      })),
    },
  ],
};

export default function NiosAdmissionDelhiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }} />
      <div className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-600 dark:text-slate-400 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="font-medium text-brand-700 hover:text-brand-800 dark:text-brand-400" href="/">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-900 dark:text-slate-200">
                <span className="block">NIOS admission Delhi</span>
                <span lang="hi" className="mt-0.5 block text-slate-600 dark:text-slate-400">
                  दिल्ली में NIOS प्रवेश
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8" lang="en">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">
              NIOS admission · Delhi · 10th & 12th
            </p>
            <p lang="hi" className="mt-1 text-sm font-semibold text-brand-700 dark:text-brand-400">
              एनआईओएस प्रवेश · दिल्ली · दसवीं व बारहवीं
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance dark:text-white sm:text-5xl">
              <span className="block">NIOS admission in Delhi — coaching and clear next steps</span>
              <span lang="hi" className="mt-3 block text-3xl font-semibold sm:text-4xl">
                दिल्ली में NIOS प्रवेश — कोचिंग और स्पष्ट अगले कदम
              </span>
            </h1>
            <p className="lead-summary mt-4 text-lg text-slate-600 dark:text-slate-300">
              If you want <strong className="font-semibold text-slate-800 dark:text-slate-100">NIOS admission in Delhi</strong> for{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">class 10th or 12th</strong>, Shri Shyam Academy helps you combine
              official <strong className="font-semibold text-slate-800 dark:text-slate-100">SDMIS</strong> processes with a realistic study plan,
              subject teaching, and exam practice — from our centre in{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">West Sagarpur</strong>. You complete official NIOS steps online;
              we support the academic side with structure and feedback.
            </p>
            <p lang="hi" className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              यदि आप <strong className="font-semibold text-slate-800 dark:text-slate-100">दिल्ली में NIOS प्रवेश</strong> (
              <strong className="font-semibold text-slate-800 dark:text-slate-100">10वीं या 12वीं</strong>) चाहते हैं, तो श्री श्याम अकादमी आधिकारिक{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">SDMIS</strong> के साथ अध्ययन योजना व कोचिंग जोड़ती है — केंद्र{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">पश्चिम सागरपुर</strong> में।
            </p>

            <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
                href="https://sdmis.nios.ac.in/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-center">
                  <span className="block">Open SDMIS (NIOS)</span>
                  <span lang="hi" className="mt-0.5 block text-xs font-medium text-brand-100">
                    SDMIS (NIOS) खोलें
                  </span>
                </span>
              </a>
              <a
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                href="tel:+918448537313"
              >
                <span className="text-center">
                  <span className="block">Call +91 84485 37313</span>
                  <span lang="hi" className="mt-0.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    कॉल करें +91 84485 37313
                  </span>
                </span>
              </a>
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                href="/nios"
              >
                <span className="text-center">
                  <span className="block">Read NIOS guide</span>
                  <span lang="hi" className="mt-0.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    NIOS गाइड पढ़ें
                  </span>
                </span>
              </Link>
            </div>

            <section className="mt-12" aria-labelledby="why-heading">
              <h2 id="why-heading" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                <span className="block">Why families start with a coaching centre for NIOS</span>
                <span lang="hi" className="mt-2 block text-xl font-semibold sm:text-2xl">
                  परिवार NIOS के लिए कोचिंग केंद्र से क्यों शुरुआत करते हैं
                </span>
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-slate-600 dark:text-slate-300">
                <li>
                  <span className="block">Structured weekly learning so open schooling does not drift.</span>
                  <span lang="hi" className="mt-1 block text-slate-600 dark:text-slate-400">
                    संरचित साप्ताहिक पढ़ाई ताकि मुक्त विद्यालयी पढ़ाई बिखरे नहीं।
                  </span>
                </li>
                <li>
                  <span className="block">Answer writing, numerical practice, and revision mapped to your NIOS subjects.</span>
                  <span lang="hi" className="mt-1 block text-slate-600 dark:text-slate-400">
                    उत्तर लेखन, संख्यात्मक अभ्यास और NIOS विषयों के अनुरूप संशोधन।
                  </span>
                </li>
                <li>
                  <span className="block">Local support in Delhi when you are stuck on a chapter or exam format.</span>
                  <span lang="hi" className="mt-1 block text-slate-600 dark:text-slate-400">
                    दिल्ली में अध्याय या परीक्षा प्रारूप पर स्थानीय सहायता।
                  </span>
                </li>
                <li>
                  <span className="block">Guidance on subject combinations that match your next goal (competitive exams, boards, skills).</span>
                  <span lang="hi" className="mt-1 block text-slate-600 dark:text-slate-400">
                    अगले लक्ष्य के अनुरूप विषय संयोजन पर मार्गदर्शन।
                  </span>
                </li>
              </ul>
            </section>

            <section className="mt-12" aria-labelledby="process-heading">
              <h2 id="process-heading" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                <span className="block">A simple flow for NIOS learners in Delhi</span>
                <span lang="hi" className="mt-2 block text-xl font-semibold sm:text-2xl">
                  दिल्ली में NIOS शिक्षार्थियों के लिए सरल क्रम
                </span>
              </h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-600 dark:text-slate-300">
                <li>
                  <span className="block">Confirm your goal: NIOS Secondary (10th) or Senior Secondary (12th) and target exam cycle.</span>
                  <span lang="hi" className="mt-1 block text-slate-600 dark:text-slate-400">
                    लक्ष्य: NIOS 10वीं या 12वीं और लक्ष्य परीक्षा चक्र तय करें।
                  </span>
                </li>
                <li>
                  <span className="block">Complete official admission steps on SDMIS when the window is open.</span>
                  <span lang="hi" className="mt-1 block text-slate-600 dark:text-slate-400">
                    विंडो खुलने पर SDMIS पर आधिकारिक प्रवेश चरण पूरे करें।
                  </span>
                </li>
                <li>
                  <span className="block">Build a subject-wise study plan with assessments and doubt support at our academy.</span>
                  <span lang="hi" className="mt-1 block text-slate-600 dark:text-slate-400">
                    अकादमी में विषयवार योजना, मूल्यांकन व संदेह सहायता।
                  </span>
                </li>
                <li>
                  <span className="block">Stay aligned with NIOS assignments (such as TMAs) and exam preparation as per NIOS instructions.</span>
                  <span lang="hi" className="mt-1 block text-slate-600 dark:text-slate-400">
                    NIOS असाइनमेंट (जैसे TMA) व परीक्षा तैयारी के साथ तालमेल।
                  </span>
                </li>
              </ol>
            </section>

            <section className="mt-12" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
                <span className="block">Frequently asked questions</span>
                <span lang="hi" className="mt-2 block text-xl font-semibold sm:text-2xl">
                  अक्सर पूछे जाने वाले प्रश्न
                </span>
              </h2>
              <dl className="mt-6 space-y-6">
                {faqItems.map((item) => (
                  <div key={item.qEn}>
                    <dt className="font-semibold text-slate-900 dark:text-white">
                      <span className="block">{item.qEn}</span>
                      <span lang="hi" className="mt-1 block font-semibold text-slate-700 dark:text-slate-300">
                        {item.qHi}
                      </span>
                    </dt>
                    <dd className="mt-2 text-slate-600 dark:text-slate-300">
                      <span className="block">{item.aEn}</span>
                      <span lang="hi" className="mt-2 block text-slate-600 dark:text-slate-400">
                        {item.aHi}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                <span className="block">Request a free NIOS admission callback</span>
                <span lang="hi" className="mt-1 block text-base font-semibold text-slate-700 dark:text-slate-300">
                  मुफ़्त NIOS प्रवेश कॉलबैक का अनुरोध करें
                </span>
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Share your details — we will contact you about{" "}
                <strong className="font-medium text-slate-800 dark:text-slate-200">NIOS admission in Delhi</strong>,{" "}
                <strong className="font-medium text-slate-800 dark:text-slate-200">class 10th or 12th</strong>, and coaching options.
              </p>
              <p lang="hi" className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                विवरण भेजें — हम <strong className="font-medium text-slate-800 dark:text-slate-200">दिल्ली में NIOS प्रवेश</strong>,{" "}
                <strong className="font-medium text-slate-800 dark:text-slate-200">10वीं या 12वीं</strong>, और कोचिंग पर संपर्क करेंगे।
              </p>
              <div className="mt-6">
                <LeadFormNios />
              </div>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
                By submitting, you agree we may contact you about NIOS-related coaching and admissions guidance. Official NIOS decisions and SDMIS
                records remain with NIOS.
              </p>
              <p lang="hi" className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                जमा करने पर NIOS संबंधी कोचिंग पर संपर्क संभव है। आधिकारिक निर्णय व SDMIS रिकॉर्ड NIOS के पास।
              </p>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
