import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/nios-admission-delhi", label: "NIOS admission" },
  { href: "/nios", label: "NIOS guide" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/images/logo-site.png"
            width={53}
            height={53}
            className="h-10 w-10 shrink-0 rounded-lg object-cover shadow-sm ring-2 ring-brand-500/20"
            alt="Shri Shyam Academy"
          />
          <div className="leading-tight">
            <p className="font-display text-base font-semibold text-slate-900 dark:text-white">Shri Shyam Academy</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Learning today, leading tomorrow</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="tel:+918448537313"
            className="hidden rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:inline-flex"
          >
            Call now
          </a>
        </div>
      </div>
      <div className="border-t border-slate-100 px-4 pb-3 dark:border-slate-800 md:hidden">
        <nav className="flex flex-wrap gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
