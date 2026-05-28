import type { Locale } from "@/i18n/config";
import type { UpdateCategory, UpdateItem, UpdatesStore } from "@/lib/updates-types";
import seedStore from "@/data/updates.json";
import { getLiveNiosUpdates } from "@/lib/fetch-nios-updates";

function mergeById(a: UpdateItem[], b: UpdateItem[]) {
  const map = new Map<string, UpdateItem>();
  for (const item of [...a, ...b]) map.set(item.id, item);
  return [...map.values()].sort((x, y) => y.publishedAt.localeCompare(x.publishedAt));
}

export function getUpdatesStore(): UpdatesStore {
  return seedStore as UpdatesStore;
}

export async function getAllUpdates(): Promise<{ items: UpdateItem[]; syncedAt: string }> {
  const store = getUpdatesStore();
  try {
    const live = await getLiveNiosUpdates();
    if (live.length > 0) {
      return {
        items: mergeById(store.items, live),
        syncedAt: new Date().toISOString(),
      };
    }
  } catch {
    /* use seed when crawl unavailable */
  }
  return { items: store.items, syncedAt: store.syncedAt };
}

export function getUpdateById(items: UpdateItem[], id: string) {
  return items.find((item) => item.id === id);
}

export function filterUpdates(items: UpdateItem[], category?: UpdateCategory | "all") {
  if (!category || category === "all") return items;
  return items.filter((item) => item.category === category);
}

export function formatUpdateDate(iso: string, locale: Locale) {
  try {
    return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export const categoryLabels: Record<Locale, Record<UpdateCategory | "all", string>> = {
  en: {
    all: "All updates",
    admission: "Admission",
    exam: "Exams & datesheets",
    notice: "Notices",
    news: "News",
  },
  hi: {
    all: "सभी अपडेट",
    admission: "दाखिला",
    exam: "परीक्षा और डेटशीट",
    notice: "सूचनाएँ",
    news: "समाचार",
  },
};
