"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { TrackedAnchor } from "./TrackedAnchor";

type HeaderNavProps = {
  locale: Locale;
  dict: Dictionary;
};

type NavLink = { href: string; label: string };

type NavGroup = { label: string; items: NavLink[] };

function HamburgerButton({ open, onClick, label }: { open: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      aria-expanded={open}
      aria-controls="mobile-nav-drawer"
      aria-label={label}
      onClick={onClick}
    >
      <span className="relative block h-4 w-5">
        <span
          className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition duration-200 ${open ? "top-[7px] rotate-45" : ""}`}
        />
        <span
          className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition duration-200 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-current transition duration-200 ${open ? "top-[7px] -rotate-45" : ""}`}
        />
      </span>
    </button>
  );
}

function NavDropdown({ locale, label, items }: { locale: Locale; label: string; items: NavLink[] }) {
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

function MobileNavSection({
  locale,
  group,
  onNavigate,
}: {
  locale: Locale;
  group: NavGroup;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border-b border-slate-100 dark:border-slate-800">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        {group.label}
        <span className={`text-slate-400 transition ${expanded ? "rotate-180" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>
      {expanded ? (
        <div className="pb-2">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-brand-300"
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function HeaderNav({ locale, dict }: HeaderNavProps) {
  const [open, setOpen] = useState(false);
  const n = dict.nav;
  const contactHref = localePath(locale, "/contact#lead-form");

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

  const groups: NavGroup[] = [
    { label: n.menuNios, items: niosLinks },
    { label: n.menuClasses, items: classLinks },
    { label: n.menuCoaching, items: coachingLinks },
  ];

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Main">
        <Link
          href={localePath(locale)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {n.home}
        </Link>
        <NavDropdown locale={locale} label={n.menuNios} items={niosLinks} />
        <NavDropdown locale={locale} label={n.menuClasses} items={classLinks} />
        <NavDropdown locale={locale} label={n.menuCoaching} items={coachingLinks} />
        <Link
          href={contactHref}
          className="ml-2 inline-flex items-center justify-center rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          {n.contact}
        </Link>
      </nav>

      <div className="flex items-center gap-2 lg:hidden">
        <TrackedAnchor
          href="tel:+918448537313"
          eventName="contact_click"
          eventParams={{ contact_type: "phone", ui_section: "header_mobile" }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-brand-600 dark:border-slate-700 dark:text-brand-400"
          aria-label={n.callNow}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </TrackedAnchor>
        <HamburgerButton open={open} onClick={() => setOpen((v) => !v)} label={open ? n.closeMenu : n.openMenu} />
      </div>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 top-14 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          aria-label={n.closeMenu}
          onClick={closeMenu}
        />
      ) : null}

      <nav
        id="mobile-nav-drawer"
        aria-label="Main mobile"
        aria-hidden={!open}
        className={`fixed right-0 top-14 z-50 flex h-[calc(100dvh-3.5rem)] w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-950 lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          <Link
            href={localePath(locale)}
            className="block border-b border-slate-100 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:border-slate-800 dark:text-white"
            onClick={closeMenu}
            tabIndex={open ? 0 : -1}
          >
            {n.home}
          </Link>
          {groups.map((group) => (
            <MobileNavSection key={group.label} locale={locale} group={group} onNavigate={closeMenu} />
          ))}
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/80">
          <Link
            href={contactHref}
            className="flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            onClick={closeMenu}
            tabIndex={open ? 0 : -1}
          >
            {n.contact}
          </Link>
          <TrackedAnchor
            href="tel:+918448537313"
            eventName="contact_click"
            eventParams={{ contact_type: "phone", ui_section: "mobile_menu" }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            tabIndex={open ? 0 : -1}
          >
            <svg className="h-4 w-4 text-brand-600 dark:text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {n.callNow}
          </TrackedAnchor>
          <div className="mt-3 flex items-center justify-between gap-2">
            <LanguageSwitcher locale={locale} labels={dict.lang} />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
