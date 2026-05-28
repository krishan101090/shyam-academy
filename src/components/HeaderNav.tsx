"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type HeaderNavProps = {
  locale: Locale;
  dict: Dictionary;
};

type NavLink = { href: string; label: string };

function NavDropdown({
  locale,
  label,
  items,
}: {
  locale: Locale;
  label: string;
  items: NavLink[];
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        aria-haspopup="true"
      >
        {label}
        <span className="text-[10px] text-slate-400 transition group-hover:rotate-180" aria-hidden="true">
          ▾
        </span>
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-[12rem] pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {items.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-brand-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavGroup({ locale, label, items }: { locale: Locale; label: string; items: NavLink[] }) {
  return (
    <div className="border-b border-slate-100 py-2 last:border-0 dark:border-slate-800">
      <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      {items.map((item) => (
        <Link
          key={item.href}
          href={localePath(locale, item.href)}
          className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function HeaderNav({ locale, dict }: HeaderNavProps) {
  const [open, setOpen] = useState(false);
  const n = dict.nav;

  const niosLinks: NavLink[] = [
    { href: "/nios-admission-delhi", label: n.niosAdmission },
    { href: "/updates", label: n.niosUpdates },
    { href: "/nios", label: n.niosGuide },
  ];

  const classLinks: NavLink[] = [
    { href: "/subjects", label: n.subjects },
    { href: "/home-tuition", label: n.homeTuition },
    { href: "/services", label: n.tuition },
  ];

  const coachingLinks: NavLink[] = [
    { href: "/career-counselling", label: n.career },
    { href: "/entrance-exams", label: n.entranceExams },
    { href: "/entrance-after-12th", label: n.entranceAfter12 },
  ];

  const contactHref = localePath(locale, "/contact#lead-form");

  return (
    <div className="flex flex-1 items-center justify-end gap-2 lg:justify-center">
      <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
        <Link
          href={localePath(locale)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {n.home}
        </Link>
        <NavDropdown locale={locale} label={n.menuNios} items={niosLinks} />
        <NavDropdown locale={locale} label={n.menuClasses} items={classLinks} />
        <NavDropdown locale={locale} label={n.menuCoaching} items={coachingLinks} />
      </nav>

      <Link
        href={contactHref}
        className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 lg:ml-2"
      >
        {n.contact}
      </Link>

      <button
        type="button"
        className="inline-flex shrink-0 items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? n.closeMenu : n.openMenu}
      </button>

      <nav
        id="mobile-nav"
        aria-label="Main mobile"
        aria-hidden={!open}
        className={`absolute left-0 right-0 top-full overflow-hidden border-b border-slate-200 bg-white px-4 shadow-md transition-[max-height,opacity] duration-200 lg:hidden dark:border-slate-800 dark:bg-slate-950 ${
          open ? "max-h-[80vh] overflow-y-auto py-3 opacity-100" : "pointer-events-none max-h-0 border-b-0 py-0 opacity-0"
        }`}
      >
        <Link
          href={localePath(locale)}
          className="mb-2 block rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          {n.home}
        </Link>
        <MobileNavGroup locale={locale} label={n.menuNios} items={niosLinks} />
        <MobileNavGroup locale={locale} label={n.menuClasses} items={classLinks} />
        <MobileNavGroup locale={locale} label={n.menuCoaching} items={coachingLinks} />
      </nav>
    </div>
  );
}
