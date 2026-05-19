import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Shri Shyam Academy in West Sagarpur, New Delhi — NIOS tuition and admissions guidance for Secondary (10th) and Senior Secondary (12th) learners.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">About Shri Shyam Academy</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
        Shri Shyam Academy is a Delhi centre dedicated to NIOS learners. We provide regular tuition for NIOS Secondary (class 10th) and Senior
        Secondary (class 12th) subjects, and practical admissions guidance so families can complete official steps on SDMIS with confidence.
      </p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
        <Image
          src="/images/wp/WhatsApp-Image-2024-04-19-at-11.14.50-AM-1.jpeg"
          width={1024}
          height={1024}
          className="aspect-[16/10] w-full object-cover sm:aspect-[2/1]"
          alt="NIOS tuition at Shri Shyam Academy, Delhi"
        />
      </div>
      <div className="mt-10 max-w-none">
        <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">What we do</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>
            <span className="font-semibold text-slate-900 dark:text-white">NIOS 10th tuition:</span> teaching for five Secondary subjects, TMA support,
            and exam-oriented practice.
          </li>
          <li>
            <span className="font-semibold text-slate-900 dark:text-white">NIOS 12th tuition:</span> Senior Secondary coaching across humanities,
            commerce, science, and Computer Science with Python.
          </li>
          <li>
            <span className="font-semibold text-slate-900 dark:text-white">NIOS admissions (10th & 12th):</span> eligibility checks, document lists,
            subject planning, and SDMIS walkthroughs — you complete official forms; we guide and coach.
          </li>
          <li>
            <span className="font-semibold text-slate-900 dark:text-white">Doubt classes in Delhi:</span> face-to-face support in West Sagarpur for
            learners who need structure alongside open schooling.
          </li>
        </ul>
        <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">Our approach</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          NIOS works best when study is steady and exam requirements are clear. We combine subject teaching with honest timelines — what to do on SDMIS,
          when to focus on TMAs, and how to revise before public exams.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">Our educators</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Manisha Madam supports NIOS Secondary learners with clear explanations, habit-building, and patient doubt handling for core subjects.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Krishan Sir leads Senior Secondary depth in English, Computer Science, Python, and structured exam practice for older NIOS students.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">Get started</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          For NIOS admission or tuition, call{" "}
          <a className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300" href="tel:+918448537313">
            +91 84485 37313
          </a>
          , use the{" "}
          <Link className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300" href="/nios-admission-delhi">
            NIOS admission form
          </Link>
          , or{" "}
          <Link className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300" href="/contact">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
