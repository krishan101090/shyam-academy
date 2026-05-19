# Google Analytics setup (you must sign in once)

The agent **cannot** log into your Google account. Follow these steps in your browser (about 10 minutes).

## A. GA4 for the website (required)

1. Open **https://analytics.google.com/** and sign in with **krishan101090@gmail.com** (or your GA account).
2. **Admin** (gear) → **Create** → **Property**  
   - Name: `Shri Shyam Academy`  
   - Time zone: India  
   - Currency: INR  
3. **Create stream** → **Web**  
   - URL: `https://shrishyamacademy.com`  
   - Stream name: `Shri Shyam Academy website`  
4. Copy **Measurement ID** (`G-XXXXXXXXXX`).
5. Optional: add to `.env.local` (the site defaults to `G-SMFQVYZTZ8` if unset):
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
6. Push to `main` (Vercel redeploys automatically) or redeploy from your host dashboard.
7. In GA4: **Admin** → **Data display** → **Events** → find `generate_lead` after a test form submit → **Mark as key event**.
8. **Search Console**: link property (Admin → Product links → Search Console).

## B. Cursor MCP (optional — query GA in chat)

1. Install pipx: `brew install pipx && pipx ensurepath`
2. Enable APIs in Google Cloud (same Google account):  
   - https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com  
   - https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com  
3. Create OAuth client (Desktop app) if needed: Cloud Console → APIs & Services → Credentials.
4. Run in Terminal:
   ```bash
   gcloud auth application-default login \
     --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform \
     --client-id-file=PATH_TO_OAUTH_CLIENT.json
   ```
5. Optional: set `GOOGLE_PROJECT_ID` in `~/.cursor/mcp.json` under `google-analytics` → `env`.
6. **Restart Cursor**. Ask: “List my Google Analytics properties.”

## C. Verify the live site

After deploy + env var:

- View page source on https://shrishyamacademy.com — search for `google-site-verification` and `gtag/js?id=G-`.
- GA4 → **Reports** → **Realtime** — open your site in another tab; you should see 1 active user.
