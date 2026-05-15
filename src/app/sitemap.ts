import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://shrishyamacademy.com";

const routes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/nios-admission-delhi", changeFrequency: "weekly" as const, priority: 0.98 },
  { path: "/nios", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.75 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path === "" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
