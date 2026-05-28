import type { UpdateItem } from "@/lib/updates-types";
import { unstable_cache } from "next/cache";

const USER_AGENT = "ShriShyamAcademy-UpdatesBot/1.0 (+https://shrishyamacademy.com)";

const SOURCES = [
  {
    id: "nios-delhi",
    label: "NIOS Regional Centre Delhi / NCR",
    url: "https://rcdelhi.nios.ac.in/",
    base: "https://rcdelhi.nios.ac.in/",
    match: (href: string) =>
      href.includes("rcdelhi.nios.ac.in") &&
      (/notification|notice|post\/|circular|admission|events|exam|datesheet|sdmis|tma|stream/i.test(href) ||
        /\.(pdf|html)$/i.test(href)),
  },
  {
    id: "nios-delhi",
    label: "NIOS Regional Centre Delhi / NCR",
    url: "https://rcdelhi.nios.ac.in/regional-office.html",
    base: "https://rcdelhi.nios.ac.in/",
    match: (href: string) =>
      href.includes("rcdelhi.nios.ac.in") &&
      (/notification|notice|post\/|circular|admission|exam|datesheet/i.test(href) || /\.(pdf|html)$/i.test(href)),
  },
  {
    id: "nios-national",
    label: "NIOS India (for Delhi admission & exams)",
    url: "https://www.nios.ac.in/",
    base: "https://www.nios.ac.in/",
    match: (href: string) => /notification|admission|media\/documents\/notification/i.test(href),
  },
] as const;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function parseDateFromTitle(title: string) {
  const iso = title.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const dmy = title.match(/(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})/);
  if (dmy) {
    const d = dmy[1].padStart(2, "0");
    const m = dmy[2].padStart(2, "0");
    return `${dmy[3]}-${m}-${d}`;
  }
  return new Date().toISOString().slice(0, 10);
}

function classify(title: string): UpdateItem["category"] {
  const t = title.toLowerCase();
  if (/admission|enrol|enroll|stream-\d|stream \d|block-\d|block \d|sdmis/i.test(t)) return "admission";
  if (/exam|datesheet|date sheet|examination|ode|public exam|exam fee|theory|practical|tma/i.test(t)) return "exam";
  if (/vacancy|tender|recruitment|empanelment/i.test(t)) return "notice";
  return "news";
}

function summarize(title: string) {
  const clean = title.replace(/\s+/g, " ").trim();
  if (clean.length <= 160) return clean;
  return `${clean.slice(0, 157)}…`;
}

function extractLinks(html: string, base: string, matchFn: (href: string) => boolean) {
  const items: { title: string; url: string }[] = [];
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const href = m[1].trim();
    const text = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!text || text.length < 12) continue;
    if (/^(home|back|read more|click here|pdf file|know more)$/i.test(text)) continue;
    let url: string;
    try {
      url = new URL(href, base).href;
    } catch {
      continue;
    }
    if (!matchFn(url)) continue;
    items.push({ title: text, url });
  }
  return items;
}

async function fetchSource(source: (typeof SOURCES)[number]): Promise<UpdateItem[]> {
  const res = await fetch(source.url, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
    next: { revalidate: 86400 },
  });
  if (!res.ok) return [];
  const html = await res.text();
  const links = extractLinks(html, source.base, source.match);
  return links.map((link) => {
    const title = link.title.replace(/\s+/g, " ").trim();
    const baseId = slugify(title) || slugify(link.url);
    return {
      id: `${source.id}-${baseId}`.slice(0, 80),
      title,
      summary: summarize(title),
      url: link.url,
      source: source.label,
      sourceId: source.id,
      category: classify(title),
      publishedAt: parseDateFromTitle(title),
    };
  });
}

async function fetchAllSources(): Promise<UpdateItem[]> {
  const batches = await Promise.all(SOURCES.map((s) => fetchSource(s)));
  const map = new Map<string, UpdateItem>();
  for (const batch of batches) {
    for (const item of batch) {
      if (item.sourceId === "nios-delhi" || item.sourceId === "nios-national") {
        map.set(item.id, item);
      }
    }
  }
  return [...map.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 40);
}

export const getLiveNiosUpdates = unstable_cache(fetchAllSources, ["nios-delhi-updates"], {
  revalidate: 86400,
});
