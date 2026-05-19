#!/usr/bin/env bash
set -euo pipefail

echo "=== Google Analytics MCP prerequisites ==="
echo ""

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew not found. Install pipx manually: https://pipx.pypa.io/"
else
  if ! command -v pipx >/dev/null 2>&1; then
    echo "Installing pipx..."
    brew install pipx
    pipx ensurepath
  fi
fi

if command -v pipx >/dev/null 2>&1; then
  echo "Installing analytics-mcp (one-time)..."
  pipx install analytics-mcp || true
fi

ADC="${HOME}/.config/gcloud/application_default_credentials.json"
if [[ ! -f "$ADC" ]]; then
  echo ""
  echo "Next: sign in to Google (browser will open)."
  echo "You need an OAuth client JSON from Google Cloud Console."
  echo ""
  echo "  gcloud auth application-default login \\"
  echo "    --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform \\"
  echo "    --client-id-file=YOUR_CLIENT.json"
  echo ""
else
  echo "Found credentials: $ADC"
fi

echo ""
echo "Enable these APIs in your GCP project:"
echo "  https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com"
echo "  https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com"
echo ""
echo "Restart Cursor after auth. MCP server name: google-analytics"
echo ""
echo "For the WEBSITE, set NEXT_PUBLIC_GA_MEASUREMENT_ID=G-... in .env.local"
echo "See docs/GOOGLE_ANALYTICS_SETUP.md"
