import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { TrackedAnchor } from "./TrackedAnchor";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const f = dict.footer;
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
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.tagline}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{f.explore}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/about")}>
                  {f.about}
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/services")}>
                  {f.tuition}
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/career-counselling")}>
                  {f.career}
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/entrance-exams")}>
                  {f.entrance}
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/subjects")}>
                  {f.subjects}
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/home-tuition")}>
                  {dict.nav.homeTuition}
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/entrance-after-12th")}>
                  {dict.nav.entranceAfter12}
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/nios-admission-delhi")}>
                  {f.niosAdmission}
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/updates")}>
                  {f.niosUpdates}
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/nios")}>
                  {f.niosGuide}
                </Link>
              </li>
              <li>
                <Link className="hover:text-brand-600 dark:hover:text-brand-400" href={localePath(locale, "/contact")}>
                  {f.callback}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{f.visit}</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{f.address}</p>
            <p className="mt-2 text-sm">
              <TrackedAnchor
                className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                href="tel:+918448537313"
                eventName="contact_click"
                eventParams={{ contact_type: "phone", ui_section: "footer" }}
              >
                +91 84485 37313
              </TrackedAnchor>
            </p>
            <p className="mt-2 text-sm">
              <TrackedAnchor
                className="text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-brand-600 dark:text-slate-400"
                href="mailto:contact@shrishyamacademy.com"
                eventName="contact_click"
                eventParams={{ contact_type: "email", ui_section: "footer" }}
              >
                contact@shrishyamacademy.com
              </TrackedAnchor>
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-slate-100 pt-8 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Shri Shyam Academy. {f.rights}
          </p>
          <p className="text-balance">{f.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
