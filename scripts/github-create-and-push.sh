#!/usr/bin/env bash
set -euo pipefail
OWNER="${GITHUB_OWNER:-krishan101090}"
REPO="${GITHUB_REPO:-shyam-academy}"
if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "GITHUB_TOKEN is not set."
  echo "Create a classic PAT with the 'repo' scope: https://github.com/settings/tokens"
  echo "Then run: export GITHUB_TOKEN=ghp_... && npm run github:push"
  echo "Or create an empty repo in the browser (no README): https://github.com/new?name=${REPO}"
  exit 1
fi
STATUS=$(curl -sS -o /tmp/gh-repo-create.json -w "%{http_code}" -X POST "https://api.github.com/user/repos" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -d "{\"name\":\"${REPO}\",\"private\":false,\"auto_init\":false}")
if [[ "$STATUS" == "201" ]]; then
  echo "Created https://github.com/${OWNER}/${REPO}"
elif [[ "$STATUS" == "422" ]]; then
  echo "Repo create returned 422 (often already exists). Continuing."
else
  echo "GitHub API HTTP ${STATUS}"
  cat /tmp/gh-repo-create.json
  exit 1
fi
git remote set-url origin "https://github.com/${OWNER}/${REPO}.git"
git -c "http.extraHeader=Authorization: Bearer ${GITHUB_TOKEN}" push -u origin main
echo "Pushed main to https://github.com/${OWNER}/${REPO}"
