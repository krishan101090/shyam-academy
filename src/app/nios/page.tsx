import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NIOS guide — tuition & 10th/12th admissions Delhi",
  description:
    "Learn how NIOS Secondary (10th) and Senior Secondary (12th) work in Delhi, SDMIS admissions, and how Shri Shyam Academy provides NIOS tuition and admission guidance.",
  keywords: ["NIOS Delhi", "NIOS guide", "SDMIS NIOS", "NIOS 10th", "NIOS 12th", "open school Delhi", "NIOS admission help"],
  alternates: { canonical: "/nios" },
};

export default function NiosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-900/40 dark:bg-brand-950/30">
        <p className="text-sm font-semibold text-brand-900 dark:text-brand-100">NIOS admission in Delhi</p>
        <p className="mt-2 text-sm text-brand-900/80 dark:text-brand-100/80">
          Start on the dedicated lead page for <strong className="font-semibold">NIOS admission Delhi</strong> (10th & 12th): callback form, FAQs, and SDMIS guidance.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            href="/nios-admission-delhi"
          >
            NIOS admission — apply / callback
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-lg border border-brand-200 bg-white px-4 py-3 text-sm font-semibold text-brand-900 hover:bg-brand-100 dark:border-brand-900/50 dark:bg-slate-950 dark:text-brand-50 dark:hover:bg-slate-900"
            href="/contact"
          >
            Contact us
          </Link>
        </div>
      </div>

      <h1 className="mt-10 font-display text-4xl font-semibold text-slate-900 dark:text-white">Your guide to NIOS in Delhi</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
        The National Institute of Open Schooling (NIOS) is India&apos;s open school board under the Ministry of Education. Shri Shyam Academy helps Delhi
        learners with <strong className="font-semibold text-slate-800 dark:text-slate-100">NIOS tuition</strong> and{" "}
        <strong className="font-semibold text-slate-800 dark:text-slate-100">admissions for class 10th and 12th</strong> — alongside official SDMIS
        steps you complete yourself.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">Why families consider NIOS</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
        <li>Flexibility for learners who need a different schedule, relocation resilience, or personalised pacing.</li>
        <li>Well-structured public examinations and credible certification when requirements are completed.</li>
        <li>Useful for learners returning to formal study, supplementing school learning, or aligning academics with training and talent development.</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">Secondary (10th) and Senior Secondary (12th)</h2>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        At Secondary level, learners typically take five subjects including languages and core areas, with practical components where applicable. At
        Senior Secondary level, learners choose subject groups aligned to their goals—humanities, science, commerce, and vocational combinations
        depending on eligibility and NIOS rules in force at the time of admission.
      </p>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        Examination cycles and assignment components (like TMAs) are defined by NIOS. Your final subject mix, eligibility, and documentation must
        match official NIOS criteria—rules can change by notification, so the SDMIS portal remains the source of truth.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">Delhi learners: practical notes</h2>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        If you are based in Delhi, you will select examination centres and follow the admission window announced by NIOS. Shri Shyam Academy helps you
        plan academics—study routines, subject understanding, past paper practice, and revision—while you complete official steps on SDMIS.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">Tuition & admissions at Shri Shyam Academy</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
        <li>NIOS 10th and 12th admission guidance: eligibility, documents, subjects, and SDMIS steps.</li>
        <li>Regular tuition for your registered NIOS subjects — Secondary and Senior Secondary.</li>
        <li>TMA support, revision plans, and public exam practice.</li>
        <li>Face-to-face doubt classes in West Sagarpur, New Delhi.</li>
      </ul>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Ready to begin?</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          If you want help planning subjects and study schedules for NIOS 10th or 12th in Delhi, message us or call—we will guide you based on your
          background and goals.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            className="inline-flex justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            href="/nios-admission-delhi"
          >
            Enquire now
          </Link>
          <a className="inline-flex justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800" href="tel:+918448537313">
            Call +91 84485 37313
          </a>
        </div>
      </div>
    </div>
  );
}
