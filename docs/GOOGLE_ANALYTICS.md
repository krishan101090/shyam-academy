# Google Analytics — website + Cursor MCP

Two parts: **GA4 on the live site** (visitor tracking) and **Google Analytics MCP** in Cursor (reports and property data for you in chat).

## 1. GA4 on shrishyamacademy.com

### Create a GA4 property

1. Open [Google Analytics](https://analytics.google.com/) → **Admin** → **Create property**.
2. Add a **Web** data stream for `https://shrishyamacademy.com`.
3. Copy the **Measurement ID** (format `G-XXXXXXXXXX`).

### Environment variables

In `.env.local` (local) and your host (Vercel / Netlify → Environment variables):

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Redeploy after setting this on production.

### What the site tracks

- Page views (initial load + client navigations)
- `generate_lead` when contact or NIOS lead forms submit successfully
  - `form_name`: `contact` | `nios_admission_delhi`
  - `nios_level` on NIOS form when selected

### Verify

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) or use **Admin → DebugView** in GA4.
2. Visit the site and submit a test lead (use a test email).
3. In GA4: **Reports → Engagement → Events** — look for `page_view` and `generate_lead`.

Mark `generate_lead` as a **conversion** in GA4: **Admin → Events → Mark as key event**.

---

## 2. Google Analytics MCP (Cursor)

Official server: [googleanalytics/google-analytics-mcp](https://github.com/googleanalytics/google-analytics-mcp)

Lets the agent query your GA accounts, run reports, realtime data, etc. (read-only).

### Prerequisites

- Python 3.10+
- [pipx](https://pipx.pypa.io/stable/installation/)
- Google Cloud project with APIs enabled:
  - [Google Analytics Admin API](https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com)
  - [Google Analytics Data API](https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com)
- OAuth credentials with scope: `https://www.googleapis.com/auth/analytics.readonly`

### Authenticate (one-time)

```bash
gcloud auth application-default login \
  --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform \
  --client-id-file=YOUR_OAUTH_CLIENT_JSON.json
```

Note the path printed: `Credentials saved to file: ...` (usually `~/.config/gcloud/application_default_credentials.json`).

### Cursor MCP config

Merge into `~/.cursor/mcp.json` under `mcpServers` (see `docs/mcp.google-analytics.example.json` in this repo).

Set:

- `GOOGLE_APPLICATION_CREDENTIALS` — path from `gcloud` above
- `GOOGLE_PROJECT_ID` — your Google Cloud project ID

Restart Cursor. In chat, MCP tools such as `get_account_summaries`, `run_report`, and `run_realtime_report` should appear.

Example prompts:

- “What were the top pages on shrishyamacademy.com in the last 30 days?”
- “How many users visited yesterday?”
- “List custom dimensions for my GA4 property.”

---

## Search Console

Site verification meta tag is already in `src/app/layout.tsx` (`verification.google`). After deploy, verify in [Search Console](https://search.google.com/search-console) using the **HTML tag** method.

Sitemap: **https://shrishyamacademy.com/sitemap.xml**
