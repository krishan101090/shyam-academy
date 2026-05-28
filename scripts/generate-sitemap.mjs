import fs from "fs";
import path from "path";

const siteUrl = "https://shrishyamacademy.com";
const locales = ["en", "hi"];
const paths = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/nios-admission-delhi", changeFrequency: "weekly", priority: 0.98 },
  { path: "/nios", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/career-counselling", changeFrequency: "monthly", priority: 0.85 },
  { path: "/entrance-exams", changeFrequency: "monthly", priority: 0.88 },
  { path: "/entrance-after-12th", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "weekly", priority: 0.97 },
  { path: "/home-tuition", changeFrequency: "weekly", priority: 0.95 },
  { path: "/home-tuition/north-delhi", changeFrequency: "weekly", priority: 0.92 },
  { path: "/home-tuition/west-delhi", changeFrequency: "weekly", priority: 0.92 },
  { path: "/subjects/economics-tuition", changeFrequency: "weekly", priority: 0.9 },
  { path: "/subjects/accounts-tuition", changeFrequency: "weekly", priority: 0.9 },
  { path: "/subjects/cbse-icse-home-tuition", changeFrequency: "weekly", priority: 0.88 },
];

const areaPaths = [
  "north-delhi/rohini",
  "north-delhi/pitampura",
  "north-delhi/shalimar-bagh",
  "north-delhi/ashok-vihar",
  "north-delhi/model-town",
  "north-delhi/civil-lines",
  "north-delhi/kamla-nagar",
  "north-delhi/mukherjee-nagar",
  "north-delhi/burari",
  "north-delhi/hudson-lane",
  "north-delhi/gtb-nagar",
  "north-delhi/wazirabad",
  "north-delhi/narela",
  "north-delhi/alipur",
  "north-delhi/majnu-ka-tila",
  "west-delhi/janakpuri",
  "west-delhi/rajouri-garden",
  "west-delhi/punjabi-bagh",
  "west-delhi/paschim-vihar",
  "west-delhi/vikaspuri",
  "west-delhi/uttam-nagar",
  "west-delhi/tilak-nagar",
  "west-delhi/dwarka",
  "west-delhi/kirti-nagar",
  "west-delhi/patel-nagar",
  "west-delhi/subhash-nagar",
  "west-delhi/tagore-garden",
  "west-delhi/nangloi",
  "west-delhi/peeragarhi",
  "west-delhi/moti-nagar",
].map((slug) => ({ path: `/home-tuition/${slug}`, changeFrequency: "weekly", priority: 0.86 }));

const lastModified = new Date().toISOString();

function absoluteUrl(locale, p) {
  return p ? `${siteUrl}/${locale}${p}` : `${siteUrl}/${locale}`;
}

const entries = locales.flatMap((locale) =>
  [...paths, ...areaPaths].map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(locale, path),
    lastModified,
    changeFrequency,
    priority,
  }))
);

const sitemapTs = `import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ${JSON.stringify(entries, null, 2)};
}
`;

const robotsTxt = `User-Agent: *
Allow: /

User-Agent: Googlebot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const root = process.cwd();
fs.writeFileSync(path.join(root, "src", "app", "sitemap.ts"), sitemapTs, "utf8");
fs.writeFileSync(path.join(root, "public", "robots.txt"), robotsTxt, "utf8");

try {
  fs.unlinkSync(path.join(root, "public", "urls.xml"));
} catch {}

console.log("Wrote src/app/sitemap.ts and public/robots.txt");
