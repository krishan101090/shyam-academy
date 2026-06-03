/** Stable GA4 `cta_name` from an internal site path (no locale prefix). */
export function ctaNameFromPath(path: string, prefix = "nav"): string {
  const clean = path.split("#")[0].replace(/^\//, "") || "home";
  const slug = clean.replace(/\//g, "_").replace(/-/g, "_");
  return `${prefix}_${slug}`;
}
