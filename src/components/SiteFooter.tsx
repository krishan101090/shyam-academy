import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-start gap-3">
              <Image
                src="/images/logo-site.png"
                width={48}
                height={48}
                className="mt-0.5 h-12 w-12 shrink-0 rounded-lg object-cover ring-2 ring-brand-500/15"
                alt=""
              />
              <div>
                <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">Shri Shyam Academy</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Coaching for classes 1st to 12th, competitive exams, and NIOS admissions support in Delhi.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href="/about">
                  About us
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href="/nios-admission-delhi">
                  NIOS admission Delhi
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href="/nios">
                  NIOS guide
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Visit</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              RZ 41 A, Shanker Park, Near Allahabad Dairy, West Sagar Pur Gandhi Market, New Delhi 110046
            </p>
            <p className="mt-2 text-sm">
              <a className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400" href="tel:+918448537313">
                +91 84485 37313
              </a>
            </p>
            <p className="mt-2 text-sm">
              <a
                className="text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-brand-600 dark:text-slate-400"
                href="mailto:krishan101090@gmail.com"
              >
                krishan101090@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-slate-100 pt-8 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Shri Shyam Academy. All rights reserved.</p>
          <p className="text-balance">NIOS is a programme of the Ministry of Education, Government of India.</p>
        </div>
      </div>
    </footer>
  );
}
