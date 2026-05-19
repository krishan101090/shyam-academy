import Image from "next/image";
import Link from "next/link";

const highlights = [
  {
    title: "NIOS class 10th tuition",
    body: "Secondary-level teaching for your five NIOS subjects — concepts, TMA support, numericals, and board-style practice with regular doubt classes in Delhi.",
  },
  {
    title: "NIOS class 12th tuition",
    body: "Senior Secondary coaching aligned to your chosen subjects — humanities, commerce, science combinations, and Computer Science with Python where applicable.",
  },
  {
    title: "NIOS admission (10th & 12th)",
    body: "Step-by-step guidance for SDMIS registration, documents, subject selection, and exam-cycle planning so you complete official NIOS steps correctly.",
  },
  {
    title: "Exam & assignment support",
    body: "Structured revision, past papers, answer writing, and reminders for NIOS assignments and public exams — so open schooling stays on track.",
  },
];

const testimonials = [
  {
    name: "Parent — NIOS 10th learner",
    role: "West Sagarpur, Delhi",
    image: "/images/wp/StockCake-Kids-School-Lineup_1722500130.jpg",
    imageAlt: "Students studying at a coaching centre",
    quote:
      "After shifting to NIOS for class 10th, the weekly tuition here made the syllabus manageable. Manisha Madam explains clearly and keeps my child consistent with assignments.",
  },
  {
    name: "Student — NIOS 12th & Computer Science",
    role: "Senior Secondary",
    image: "/images/wp/StockCake-Students-Studying-Together_1722500015.jpg",
    imageAlt: "Students studying together",
    quote:
      "Krishan Sir helped me with English and Computer Science for NIOS 12th. Difficult topics became easier, and I knew what to focus on before the exams.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50 via-white to-white dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.35),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm dark:border-brand-900/40 dark:bg-slate-950/40 dark:text-brand-100">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                NIOS 10th & 12th · Admissions & tuition open
              </p>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-slate-900 text-balance dark:text-white sm:text-5xl">
                NIOS tuition and admissions for class 10th & 12th in Delhi
              </h1>
              <p className="mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
                Shri Shyam Academy in West Sagarpur specialises in NIOS learners — regular tuition for Secondary and Senior Secondary subjects, plus
                clear guidance for official 10th and 12th admission through SDMIS.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/nios-admission-delhi"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                >
                  NIOS admission — 10th & 12th
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                >
                  Book NIOS tuition
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Call</p>
                  <a className="hover:text-brand-600 dark:hover:text-brand-400" href="tel:+918448537313">
                    +91 84485 37313
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Centre</p>
                  <p>West Sagarpur, New Delhi</p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Image
                src="/images/hero-coaching.webp"
                width={1792}
                height={1024}
                className="max-h-[min(380px,52vh)] w-full border-b border-slate-100 object-cover object-right dark:border-slate-800"
                alt="NIOS tuition and admissions support at Shri Shyam Academy, Delhi"
                priority
              />
              <div className="p-6">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Why NIOS families choose us</p>
                <ul className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800 dark:bg-brand-950 dark:text-brand-200">
                      1
                    </span>
                    <span>Focused NIOS tuition — not generic school coaching — so your subject plan matches SDMIS.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800 dark:bg-brand-950 dark:text-brand-200">
                      2
                    </span>
                    <span>Admission guidance for NIOS 10th and 12th: documents, subjects, and realistic timelines.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800 dark:bg-brand-950 dark:text-brand-200">
                      3
                    </span>
                    <span>Local doubt classes, TMA help, and exam practice from experienced faculty in Delhi.</span>
                  </li>
                </ul>
                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                  <p className="font-semibold text-slate-900 dark:text-white">Official NIOS portal</p>
                  <p className="mt-1">
                    Learner admissions are completed on the official NIOS SDMIS portal. We coach and guide; NIOS holds the official record.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">NIOS programmes at a glance</h2>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
              Tuition for enrolled NIOS learners and admissions support for Secondary (10th) and Senior Secondary (12th) in Delhi.
            </p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300">
            View NIOS tuition details →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-1">
              <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">NIOS 10th & 12th admission help</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Starting NIOS? We explain eligibility, which subjects to pick, what to prepare for SDMIS, and how tuition fits your exam cycle — for
                both Secondary and Senior Secondary admissions in Delhi.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/nios-admission-delhi"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Start NIOS admission enquiry
                </Link>
                <Link
                  href="/nios"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-900"
                >
                  Read our NIOS guide
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">NIOS Secondary — class 10th</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Admission guidance plus tuition for five subjects, practicals where required, TMAs, and public exam preparation.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">NIOS Senior Secondary — class 12th</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Subject planning for 12th admission and regular coaching for your NIOS stream — arts, commerce, science, or vocational mix.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">What NIOS learners say</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Image src={t.image} width={400} height={400} className="aspect-[4/3] w-full object-cover" alt={t.imageAlt} />
              <div className="p-6">
                <blockquote className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{t.name}</figcaption>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 py-14 dark:border-slate-800 dark:from-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Book a free NIOS counselling call</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Whether you need NIOS 10th or 12th admission guidance or ongoing tuition, tell us your situation — we respond quickly.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a className="inline-flex rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700" href="tel:+918448537313">
              Call +91 84485 37313
            </a>
            <Link
              className="inline-flex rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              href="/nios-admission-delhi"
            >
              Request callback
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
