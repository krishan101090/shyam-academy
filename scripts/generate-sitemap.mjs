import fs from "fs";
import path from "path";

const siteUrl = "https://shrishyamacademy.com";
const locales = ["en", "hi"];
const paths = [
  { path: "", changeFrequency: "weekly", priority: "1.0" },
  { path: "/nios-admission-delhi", changeFrequency: "weekly", priority: "0.98" },
  { path: "/nios", changeFrequency: "weekly", priority: "0.9" },
  { path: "/about", changeFrequency: "monthly", priority: "0.8" },
  { path: "/services", changeFrequency: "monthly", priority: "0.8" },
  { path: "/career-counselling", changeFrequency: "monthly", priority: "0.85" },
  { path: "/entrance-exams", changeFrequency: "monthly", priority: "0.88" },
  { path: "/contact", changeFrequency: "weekly", priority: "0.97" },
];

const lastmod = new Date().toISOString();

function absoluteUrl(locale, p) {
  const base = p ? `${siteUrl}/${locale}${p}` : `${siteUrl}/${locale}`;
  return base;
}

function hreflangLinks(p) {
  const en = absoluteUrl("en", p);
  const hi = absoluteUrl("hi", p);
  return [
    ['x-default', en],
    ['en', en],
    ['en-IN', en],
    ['hi', hi],
    ['hi-IN', hi],
  ]
    .map(
      ([lang, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`
    )
    .join("\n");
}

const urls = locales
  .flatMap((locale) =>
    paths.map(({ path, changeFrequency, priority }) => {
      const loc = absoluteUrl(locale, path);
      return `  <url>
    <loc>${loc}</loc>
${hreflangLinks(path)}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

const publicPath = path.join(process.cwd(), "public", "sitemap.xml");
const outPath = path.join(process.cwd(), "out", "sitemap.xml");

fs.writeFileSync(publicPath, xml, "utf8");
if (fs.existsSync(path.join(process.cwd(), "out"))) {
  fs.writeFileSync(outPath, xml, "utf8");
}

console.log("Wrote sitemap.xml to public/ and out/");
