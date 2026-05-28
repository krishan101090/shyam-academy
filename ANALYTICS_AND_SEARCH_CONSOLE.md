# Analytics & Google Search Console — after `/en` and `/hi` launch

Use this checklist after deploying the bilingual site (`https://shrishyamacademy.com/en` and `/hi`).

---

## Google Analytics 4 (GA4)

**Measurement ID (unchanged):** `G-SMFQVYZTZ8`

The tag is already in the site (`GoogleAnalytics` component + build env). You usually **do not need a new GA4 property**.

### In GA4 (https://analytics.google.com)

1. **Confirm data after deploy**
   - Reports → Realtime → open `https://shrishyamacademy.com/en` in another tab.
   - You should see active users within a minute.

2. **Optional: segment by language**
   - Admin → Data display → Reports → add a comparison or exploration filtered by:
     - Page path contains `/en` (English)
     - Page path contains `/hi` (Hindi)

3. **Key events (leads)**
   - Admin → Events — confirm custom event `generate_lead` still fires when someone submits the contact form.
   - Mark `generate_lead` as a **conversion** if you use Google Ads.

4. **Vercel environment (if using Vercel)**
   - Project → Settings → Environment Variables
   - Ensure `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-SMFQVYZTZ8` (Production). Redeploy if you add or change it.

5. **Do not change**
   - Same domain `shrishyamacademy.com` — no new data stream required unless you use a separate test domain.

---

## Google Search Console

**Property:** https://shrishyamacademy.com (domain or URL-prefix — use the same one you already verified)

Site verification meta tag is in `src/app/layout.tsx` (`google-site-verification`).

### 1. Submit updated sitemap

1. Search Console → **Sitemaps**
2. Remove old sitemap entry only if it errors; otherwise add/update to:
   - `https://shrishyamacademy.com/sitemap.xml`
3. Submit. It should list **16 URLs** (8 pages × English + Hindi).

### 2. Request indexing for main URLs

Use **URL inspection** → **Request indexing** for:

| Priority | URL |
|----------|-----|
| High | `https://shrishyamacademy.com/en` |
| High | `https://shrishyamacademy.com/hi` |
| High | `https://shrishyamacademy.com/en/contact` |
| High | `https://shrishyamacademy.com/en/nios-admission-delhi` |
| Medium | `https://shrishyamacademy.com/hi/contact` |
| Medium | `https://shrishyamacademy.com/hi/nios-admission-delhi` |
| Medium | `https://shrishyamacademy.com/en/services` |
| Medium | `https://shrishyamacademy.com/hi/services` |

### 3. Old URLs (no action required if redirects work)

These redirect to `/en/...` via `vercel.json` and `public/_redirects`:

- `/contact` → `/en/contact`
- `/services` → `/en/services`
- `/nios-admission-delhi` → `/en/nios-admission-delhi`
- `/` → `/en`

In Search Console, old URLs may show as redirects over time — that is expected.

### 4. International targeting (hreflang)

The site sends **hreflang** via page metadata (`en`, `hi`, `en-IN`, `hi-IN`, `x-default`) and the sitemap includes language alternates.

- You do **not** need a separate Hindi property.
- Optional: Settings → International targeting — India if you target Delhi/NCR only (legacy setting; less critical with hreflang).

### 5. Monitor (first 2–4 weeks)

- **Performance** — queries for NIOS tuition / admission Delhi (English and Hindi).
- **Page indexing** — ensure `/en/*` and `/hi/*` move to “Indexed”, not “Crawled – currently not indexed”.
- **Core Web Vitals** — check after deploy.

---

## Quick post-deploy test

| Check | URL |
|-------|-----|
| English home | https://shrishyamacademy.com/en |
| Hindi home | https://shrishyamacademy.com/hi |
| Sitemap | https://shrishyamacademy.com/sitemap.xml |
| Redirect root | https://shrishyamacademy.com/ → should land on `/en` |
| GA Realtime | Open `/en` and see 1 active user |

---

## Summary

| Tool | What to update |
|------|----------------|
| **GA4** | Nothing required if `G-SMFQVYZTZ8` already works; verify Realtime + `generate_lead` conversion |
| **Search Console** | Resubmit `sitemap.xml`, request indexing for `/en` and `/hi` key pages |
| **Vercel** | Confirm env `NEXT_PUBLIC_GA_MEASUREMENT_ID`, redeploy from `main` |

No new Analytics property or Search Console property is needed for Hindi — same domain, new URL paths.
