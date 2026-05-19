import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NIOS tuition",
  description:
    "NIOS tuition in Delhi for class 10th and 12th: subject coaching, TMA support, exam practice, and admissions guidance at Shri Shyam Academy, West Sagarpur.",
  alternates: { canonical: "/services" },
};

const blocks = [
  {
    title: "NIOS Secondary (class 10th) tuition",
    items: [
      "Teaching for five NIOS subjects you register on SDMIS",
      "Concept clarity in Hindi, English, Maths, Science, and Social Science",
      "TMA guidance and submission reminders per NIOS rules",
      "Numericals, maps, and writing practice for public exams",
      "Weekly tests and revision plans before your exam cycle",
    ],
  },
  {
    title: "NIOS Senior Secondary (class 12th) tuition",
    items: [
      "Subject coaching for your chosen NIOS stream — arts, commerce, or science",
      "History, Geography, Economics, Political Science, and English depth",
      "Computer Science with Python and practical-oriented preparation",
      "Answer writing, case studies, and time management for board-style papers",
      "Past paper practice aligned to your Senior Secondary subject list",
    ],
  },
  {
    title: "NIOS admission support — 10th & 12th",
    items: [
      "Understanding Secondary vs Senior Secondary and which level fits you",
      "Document checklist and subject combination advice before SDMIS",
      "Walkthrough of official steps on sdmis.nios.ac.in (you submit; we guide)",
      "Linking admission timing with when tuition batches start",
      "Free callback via our NIOS admission Delhi page",
    ],
  },
  {
    title: "How tuition works at our centre",
    items: [
      "Small-batch doubt classes in West Sagarpur, New Delhi",
      "Flexible pacing for open-school learners who study at home",
      "Regular progress updates for parents",
      "Free counselling call to match subjects and batch timing",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">NIOS tuition & admissions</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Shri Shyam Academy focuses on NIOS learners in Delhi — regular tuition after you enrol, and admissions guidance for class 10th and 12th through
          the official SDMIS portal.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/nios-admission-delhi"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            NIOS 10th / 12th admission enquiry
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
          >
            Book tuition
          </Link>
        </div>
      </div>
      <div className="relative mt-10 h-48 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 sm:h-56">
        <Image
          src="/images/wp/pexels-photo-1516440-1516440.jpg"
          width={1280}
          height={848}
          className="h-full w-full object-cover"
          alt="NIOS students in tuition class"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/65 via-slate-900/25 to-transparent dark:from-slate-950/75" />
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {blocks.map((b) => (
          <section key={b.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{b.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {b.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Why choose us for NIOS in Delhi</h2>
        <ul className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
          <li className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            NIOS-only focus — tuition matched to your SDMIS subjects
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            Clear admission guidance for 10th and 12th without false promises
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            Local centre in West Sagarpur for doubts and revision
          </li>
          <li className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            Experienced faculty for Secondary and Senior Secondary learners
          </li>
        </ul>
      </section>
    </div>
  );
}
