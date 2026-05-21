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
  return p ? `${siteUrl}/${locale}${p}` : `${siteUrl}/${locale}`;
}

function hreflangLinks(p) {
  const en = absoluteUrl("en", p);
  const hi = absoluteUrl("hi", p);
  return [
    ["x-default", en],
    ["en", en],
    ["en-IN", en],
    ["hi", hi],
    ["hi-IN", hi],
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

const robotsTxt = `User-Agent: *
Allow: /

User-Agent: Googlebot
Allow: /

Sitemap: ${siteUrl}/site-urls
`;

const root = process.cwd();
const publicDir = path.join(root, "public");

const generatedDir = path.join(root, "src", "generated");

fs.mkdirSync(generatedDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "urls.xml"), xml, "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
fs.writeFileSync(
  path.join(generatedDir, "sitemap-xml.ts"),
  `export const sitemapXml = ${JSON.stringify(xml)};\n`,
  "utf8"
);

const sitemapTs = path.join(root, "src", "app", "sitemap.ts");
if (fs.existsSync(sitemapTs)) fs.unlinkSync(sitemapTs);

console.log("Wrote public/urls.xml, public/robots.txt, src/generated/sitemap-xml.ts");
