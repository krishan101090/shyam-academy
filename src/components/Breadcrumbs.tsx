import { Fragment } from "react";
import type { Locale } from "@/i18n/config";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

type BreadcrumbsProps = {
  locale: Locale;
  items: BreadcrumbItem[];
  bar?: boolean;
  className?: string;
};

export function Breadcrumbs({ locale, items, bar = true, className }: BreadcrumbsProps) {
  const nav = (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        {items.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 ? (
              <li aria-hidden="true" className="select-none text-slate-400 dark:text-slate-500">
                /
              </li>
            ) : null}
            <li>
              {item.href ? (
                <TrackedLocaleLink
                  locale={locale}
                  href={item.href}
                  eventName="cta_click"
                  eventParams={{ cta_name: "breadcrumb_nav", breadcrumb_label: item.label, ...item.eventParams }}
                  className="font-medium text-brand-700 transition hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  {item.label}
                </TrackedLocaleLink>
              ) : (
                <span className="font-medium text-slate-900 dark:text-slate-200" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );

  if (!bar) return nav;

  return (
    <div className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">{nav}</div>
    </div>
  );
}
