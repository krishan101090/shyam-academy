import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Learn about Shri Shyam Academy in West Sagarpur, New Delhi—our mission, faculty, and programmes from class 1 to 12 plus competitive exam coaching.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-white">About Shri Shyam Academy</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
        Shri Shyam Academy is an education centre in Sagar Pur, New Delhi focused on empowering learners from class 1 to class 12 through structured
        teaching, mentorship, and exam readiness.
      </p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-slate-800">
        <Image
          src="/images/wp/WhatsApp-Image-2024-04-19-at-11.14.50-AM-1.jpeg"
          width={1024}
          height={1024}
          className="aspect-[16/10] w-full object-cover sm:aspect-[2/1]"
          alt="Shri Shyam Academy learners and classroom"
        />
      </div>
      <div className="mt-10 max-w-none">
        <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">What we offer</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
          <li>
            <span className="font-semibold text-slate-900 dark:text-white">Classes 1–10:</span> Hindi, English, Mathematics, Science, Social Science,
            and Environmental Studies (EVS).
          </li>
          <li>
            <span className="font-semibold text-slate-900 dark:text-white">Classes 11–12:</span> History, Geography, English, Economics, Political
            Science, and advanced Computer Science including Python and Information Practices.
          </li>
          <li>
            <span className="font-semibold text-slate-900 dark:text-white">Competitive exams:</span> KVS, CUET, and CTET preparation.
          </li>
          <li>
            <span className="font-semibold text-slate-900 dark:text-white">Computer Science depth:</span> Data Structures and Algorithms alongside
            programming fundamentals.
          </li>
          <li>
            <span className="font-semibold text-slate-900 dark:text-white">NIOS pathway:</span> Guidance for learners pursuing NIOS Secondary and
            Senior Secondary admissions in Delhi, aligned with official requirements.
          </li>
        </ul>
        <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">Our mission</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          We aim to provide a nurturing and engaging learning environment that supports academic excellence, confidence, and lifelong curiosity. We
          believe every student can improve with the right guidance, consistent practice, and honest feedback.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">Our educators</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Manisha Madam brings strong experience across foundational years and connects exceptionally well with younger learners—building habits,
          curiosity, and clarity in core subjects.
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Krishan Sir leads advanced teaching in English, Computer Science, Python, and Data Structures & Algorithms—helping students build depth for
          board exams and future study.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-slate-900 dark:text-white">Join us</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          For admissions, batch timings, and programme fit, call{" "}
          <a className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300" href="tel:+918448537313">
            +91 84485 37313
          </a>{" "}
          or use the contact form.
        </p>
      </div>
    </div>
  );
}
