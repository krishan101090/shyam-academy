import type { Locale } from "@/i18n/config";
import type { UpdateCategory, UpdateItem, UpdatesStore } from "@/lib/updates-types";
import seedStore from "@/data/updates.json";

export function getUpdatesStore(): UpdatesStore {
  return seedStore as UpdatesStore;
}

export function getAllUpdates(): { items: UpdateItem[]; syncedAt: string } {
  const store = getUpdatesStore();
  return { items: store.items, syncedAt: store.syncedAt };
}

export function getUpdateById(id: string) {
  return getUpdatesStore().items.find((item) => item.id === id);
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
