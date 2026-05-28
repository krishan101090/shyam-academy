import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "src/data/updates.json");
const MAX_ITEMS = 40;
const USER_AGENT = "ShriShyamAcademy-UpdatesBot/1.0 (+https://shrishyamacademy.com)";

const SOURCES = [
  {
    id: "nios-delhi",
    label: "NIOS Regional Centre Delhi / NCR",
    url: "https://rcdelhi.nios.ac.in/",
    base: "https://rcdelhi.nios.ac.in/",
    match: (href) =>
      href.includes("rcdelhi.nios.ac.in") &&
      (/notification|notice|post\/|circular|admission|events|exam|datesheet|sdmis|tma|stream/i.test(href) ||
        /\.(pdf|html)$/i.test(href)),
  },
  {
    id: "nios-delhi",
    label: "NIOS Regional Centre Delhi / NCR",
    url: "https://rcdelhi.nios.ac.in/regional-office.html",
    base: "https://rcdelhi.nios.ac.in/",
    match: (href) =>
      href.includes("rcdelhi.nios.ac.in") &&
      (/notification|notice|post\/|circular|admission|exam|datesheet/i.test(href) || /\.(pdf|html)$/i.test(href)),
  },
  {
    id: "nios-national",
    label: "NIOS India (for Delhi admission & exams)",
    url: "https://www.nios.ac.in/",
    base: "https://www.nios.ac.in/",
    match: (href) => /notification|admission|media\/documents\/notification/i.test(href),
  },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function parseDateFromTitle(title) {
  const iso = title.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const dmy = title.match(/(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})/);
  if (dmy) {
    const d = dmy[1].padStart(2, "0");
    const m = dmy[2].padStart(2, "0");
    return `${dmy[3]}-${m}-${d}`;
  }
  const named = title.match(/(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})/i);
  if (named) {
    const months = {
      january: "01",
      february: "02",
      march: "03",
      april: "04",
      may: "05",
      june: "06",
      july: "07",
      august: "08",
      september: "09",
      october: "10",
      november: "11",
      december: "12",
    };
    const m = months[named[2].toLowerCase()];
    if (m) return `${named[3]}-${m}-${named[1].padStart(2, "0")}`;
  }
  return new Date().toISOString().slice(0, 10);
}

function classify(title) {
  const t = title.toLowerCase();
  if (/admission|enrol|enroll|stream-\d|stream \d|block-\d|block \d|sdmis/i.test(t)) return "admission";
  if (/exam|datesheet|date sheet|examination|ode|public exam|exam fee|theory|practical|tma/i.test(t)) return "exam";
  if (/vacancy|tender|recruitment|empanelment/i.test(t)) return "notice";
  return "news";
}

function summarize(title) {
  const clean = title.replace(/\s+/g, " ").trim();
  if (clean.length <= 160) return clean;
  return `${clean.slice(0, 157)}…`;
}

function resolveUrl(href, base) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

function extractLinks(html, base, matchFn) {
  const items = [];
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1].trim();
    const text = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!text || text.length < 12) continue;
    if (/^(home|back|read more|click here|pdf file|know more)$/i.test(text)) continue;
    const url = resolveUrl(href, base);
    if (!url || !url.startsWith("http")) continue;
    if (!matchFn(url)) continue;
    items.push({ title: text, url });
  }
  return items;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function mergeItems(existing, incoming) {
  const byId = new Map();
  for (const item of existing) byId.set(item.id, item);
  for (const item of incoming) byId.set(item.id, item);
  return [...byId.values()]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, MAX_ITEMS);
}

function toUpdateItem(raw, source) {
  const title = raw.title.replace(/\s+/g, " ").trim();
  const baseId = slugify(title) || slugify(raw.url);
  return {
    id: `${source.id}-${baseId}`.slice(0, 80),
    title,
    summary: summarize(title),
    url: raw.url,
    source: source.label,
    sourceId: source.id,
    category: classify(title),
    publishedAt: parseDateFromTitle(title),
  };
}

async function crawlAll() {
  const collected = [];
  for (const source of SOURCES) {
    try {
      const html = await fetchHtml(source.url);
      const links = extractLinks(html, source.base, (href) => source.match(href));
      for (const link of links) {
        collected.push(toUpdateItem(link, source));
      }
      console.log(`[updates] ${source.url}: ${links.length} links`);
    } catch (err) {
      console.warn(`[updates] ${source.url} failed:`, err.message);
    }
  }
  return collected;
}

function loadExisting() {
  if (!fs.existsSync(OUT)) return { syncedAt: "", items: [] };
  return JSON.parse(fs.readFileSync(OUT, "utf8"));
}

async function main() {
  const existing = loadExisting();
  const crawled = await crawlAll();
  const delhiOnly = crawled.filter((item) => item.sourceId === "nios-delhi" || item.sourceId === "nios-national");
  const items = mergeItems(existing.items.filter((i) => i.sourceId !== "nios-bhopal" && i.sourceId !== "nios-hyderabad"), delhiOnly);
  const store = { syncedAt: new Date().toISOString(), items };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(store, null, 2)}\n`);
  console.log(`[updates] wrote ${items.length} Delhi-focused items to ${OUT}`);
}

main().catch((err) => {
  console.error("[updates] fatal:", err);
  process.exit(1);
});
