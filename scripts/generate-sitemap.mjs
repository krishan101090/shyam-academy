import fs from "fs";

import path from "path";



const siteUrl = "https://shrishyamacademy.com";

const locales = ["en", "hi"];

const paths = [

  { path: "", changeFrequency: "weekly", priority: 1 },

  { path: "/nios-admission-delhi", changeFrequency: "weekly", priority: 0.98 },
  { path: "/updates", changeFrequency: "daily", priority: 0.93 },

  { path: "/nios", changeFrequency: "weekly", priority: 0.9 },

  { path: "/about", changeFrequency: "monthly", priority: 0.8 },

  { path: "/services", changeFrequency: "monthly", priority: 0.8 },

  { path: "/career-counselling", changeFrequency: "monthly", priority: 0.85 },

  { path: "/entrance-exams", changeFrequency: "monthly", priority: 0.88 },

  { path: "/entrance-after-12th", changeFrequency: "weekly", priority: 0.9 },

  { path: "/contact", changeFrequency: "weekly", priority: 0.97 },
  { path: "/contact/accounts-classes", changeFrequency: "weekly", priority: 0.96 },
  { path: "/contact/economics-tuition", changeFrequency: "weekly", priority: 0.92 },
  { path: "/contact/home-tuition", changeFrequency: "weekly", priority: 0.94 },
  { path: "/contact/home-tuition/west-delhi", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact/nios-admission", changeFrequency: "weekly", priority: 0.95 },
  { path: "/contact/career-counselling", changeFrequency: "weekly", priority: 0.88 },
  { path: "/contact/entrance-after-12th", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact/entrance-exams", changeFrequency: "weekly", priority: 0.88 },
  { path: "/contact/subjects", changeFrequency: "weekly", priority: 0.9 },

  { path: "/subjects", changeFrequency: "weekly", priority: 0.94 },

  { path: "/subjects/accounts", changeFrequency: "weekly", priority: 0.98 },

  { path: "/subjects/economics", changeFrequency: "weekly", priority: 0.9 },

  { path: "/home-tuition", changeFrequency: "weekly", priority: 0.95 },

  { path: "/home-tuition/west-delhi", changeFrequency: "weekly", priority: 0.92 },

];



const areaPaths = [

  "west-delhi/west-sagarpur",

  "west-delhi/paschim-vihar",

  "west-delhi/janakpuri",

  "west-delhi/rajouri-garden",

  "west-delhi/punjabi-bagh",

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

const contactAreaPaths = areaPaths.map(({ path }) => ({
  path: path.replace("/home-tuition/", "/contact/home-tuition/"),
  changeFrequency: "weekly",
  priority: 0.84,
}));

const updatesJsonPath = path.join(process.cwd(), "src/data/updates.json");
let updateDetailPaths = [];
try {
  const updatesStore = JSON.parse(fs.readFileSync(updatesJsonPath, "utf8"));
  updateDetailPaths = (updatesStore.items ?? []).map((item) => ({
    path: `/updates/${item.id}`,
    changeFrequency: "daily",
    priority: 0.85,
  }));
} catch {
  updateDetailPaths = [];
}



const lastModified = new Date().toISOString();



function absoluteUrl(locale, p) {

  return p ? `${siteUrl}/${locale}${p}` : `${siteUrl}/${locale}`;

}



const entries = locales.flatMap((locale) =>

  [...paths, ...areaPaths, ...contactAreaPaths, ...updateDetailPaths].map(({ path, changeFrequency, priority }) => ({

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

