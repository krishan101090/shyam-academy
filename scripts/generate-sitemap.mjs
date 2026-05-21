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
  { path: "/contact", changeFrequency: "weekly", priority: 0.97 },
];

const lastModified = new Date().toISOString();

function absoluteUrl(locale, p) {
  return p ? `${siteUrl}/${locale}${p}` : `${siteUrl}/${locale}`;
}

const entries = locales.flatMap((locale) =>
  paths.map(({ path, changeFrequency, priority }) => ({
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
