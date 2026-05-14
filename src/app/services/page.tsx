import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Coaching services at Shri Shyam Academy: classes 1–10, 11–12 humanities and CS, KVS, CUET, CTET, Python, DSA, free trial classes, and NIOS guidance.",
  alternates: { canonical: "/services" },
};

const blocks = [
  {
    title: "Classes 1st to 10th",
    items: [
      "Hindi: reading, writing, grammar, and expression",
      "English: comprehension, grammar, and composition",
      "Mathematics: concepts, problem solving, and exam practice",
      "Science: Physics, Chemistry, and Biology fundamentals",
      "Social Science: History, Geography, Civics, and Economics basics",
      "EVS: awareness, scientific temper, and age-appropriate projects",
    ],
  },
  {
    title: "Classes 11th and 12th (Career Maker)",
    items: [
      "History: board-focused depth with answer writing practice",
      "Geography: maps, concepts, and structured revision",
      "English: literature and language components",
      "Economics: micro and macro foundations with application",
      "Political Science: concepts, contemporary connections, and exam technique",
      "IP and Computer Science with Python: practicals, logic, and programming maturity",
      "Data Structures and Algorithms: patterns, implementation, and problem solving",
    ],
  },
  {
    title: "Entrance and teaching job preparation",
    items: [
      "KVS preparation with targeted practice and strategy",
      "CUET coaching aligned to exam sections and time management",
      "CTET preparation for aspiring teachers",
    ],
  },
  {
    title: "Special programmes",
    items: [
      "Free trial classes to experience teaching quality",
      "Personalised attention through structured doubt handling",
      "NIOS admissions guidance for 10th and 12th learners in Delhi (process clarity + study planning)",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">Our services</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Shri Shyam Academy offers a broad set of programmes—from foundational school support to senior secondary depth, competitive exam readiness,
          and flexible NIOS pathways.
        </p>
      </div>
      <div className="relative mt-10 h-48 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 sm:h-56">
        <Image
          src="/images/wp/pexels-photo-1516440-1516440.jpg"
          width={1280}
          height={848}
          className="h-full w-full object-cover"
          alt="Students in a classroom"
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
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Why families choose Shri Shyam Academy</h2>
        <ul className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
          <li className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">Experienced faculty with exam-aware teaching</li>
          <li className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">Engaging classes with regular assessments</li>
          <li className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">Clear communication on progress and next steps</li>
          <li className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">A supportive environment for consistent improvement</li>
        </ul>
      </section>
    </div>
  );
}
