"use client";

import { useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { TrackedLocaleLink } from "@/components/TrackedLocaleLink";
import { categoryLabels, filterUpdates, formatUpdateDate } from "@/lib/updates";
import type { UpdateCategory, UpdateItem } from "@/lib/updates-types";

type UpdatesFeedProps = {
  locale: Locale;
  items: UpdateItem[];
  syncedAt: string;
  empty: string;
  viewDetails: string;
  readOfficial: string;
};

const validCategories = new Set(["all", "admission", "exam", "notice", "news"]);
const filters: (UpdateCategory | "all")[] = ["all", "admission", "exam", "notice", "news"];

export function UpdatesFeed({ locale, items, syncedAt, empty, viewDetails, readOfficial }: UpdatesFeedProps) {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get("category") ?? "all";
  const category = validCategories.has(rawCategory) ? (rawCategory as UpdateCategory | "all") : "all";
  const filtered = filterUpdates(items, category);
  const labels = categoryLabels[locale];

  return (
    <>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {formatUpdateDate(syncedAt.slice(0, 10), locale)}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((key) => (
          <TrackedLocaleLink
            key={key}
            locale={locale}
            href={key === "all" ? "/updates" : `/updates?category=${key}`}
            eventName="cta_click"
            eventParams={{ cta_name: "updates_filter", category: key }}
            className={
              category === key
                ? "rounded-full border border-brand-300 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-900 dark:border-brand-700 dark:bg-brand-950/50 dark:text-brand-100"
                : "rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            }
          >
            {labels[key]}
          </TrackedLocaleLink>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300">
          {empty}
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {filtered.map((item) => (
            <li key={item.id} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-brand-800 dark:bg-brand-950/60 dark:text-brand-200">
                  {labels[item.category]}
                </span>
                <time dateTime={item.publishedAt} className="text-slate-500 dark:text-slate-400">
                  {formatUpdateDate(item.publishedAt, locale)}
                </time>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 dark:text-slate-400">{item.source}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                <TrackedLocaleLink
                  locale={locale}
                  href={`/updates/${item.id}`}
                  eventName="cta_click"
                  eventParams={{ cta_name: "updates_item", update_id: item.id }}
                  className="hover:text-brand-700 dark:hover:text-brand-300"
                >
                  {item.title}
                </TrackedLocaleLink>
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.summary}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
                <TrackedLocaleLink
                  locale={locale}
                  href={`/updates/${item.id}`}
                  eventName="cta_click"
                  eventParams={{ cta_name: "updates_summary", update_id: item.id }}
                  className="text-brand-700 dark:text-brand-300"
                >
                  {viewDetails}
                </TrackedLocaleLink>
                <TrackedAnchor
                  href={item.url}
                  eventName="cta_click"
                  eventParams={{ cta_name: "updates_official", update_id: item.id }}
                  className="text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-brand-700 dark:text-slate-400"
                >
                  {readOfficial} ↗
                </TrackedAnchor>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
