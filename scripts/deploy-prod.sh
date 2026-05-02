#!/bin/bash
# Deploy to Vercel production AND re-alias all 6 URLs to the new deployment.
# This is critical because the QR code in printed materials points at
# travel-guide-one-olive.vercel.app/app — that alias must always resolve
# to the latest production build.
#
# Usage:  npm run deploy:prod
# (or)    bash scripts/deploy-prod.sh

set -euo pipefail

# Make `vercel`, `npx`, `node` resolvable when run from npm/zsh sub-shells
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:${PATH:-}"

ALIASES=(
  "nakhon-phanom.vercel.app"
  "nkp-travel.vercel.app"
  "visit-nkp.vercel.app"
  "travel-guide-one-olive.vercel.app"
  "travel-guide-mingrath.vercel.app"
  "travel-guide-mingrath-mingrath.vercel.app"
)

echo "── deploying to vercel production ──"
DEPLOY_URL=$(vercel --prod --yes --force 2>&1 \
  | grep -oE 'https://travel-guide-[a-z0-9]+-mingrath\.vercel\.app' \
  | head -1)

if [[ -z "$DEPLOY_URL" ]]; then
  echo "❌ failed to capture deploy URL — aborting alias step"
  exit 1
fi
echo "✓ deployed: $DEPLOY_URL"

echo
echo "── re-aliasing 6 URLs to new deployment ──"
for alias in "${ALIASES[@]}"; do
  result=$(vercel alias set "$DEPLOY_URL" "$alias" 2>&1 | grep -E "Success|Error" | head -1 || true)
  echo "  $alias  →  ${result:-<no-output>}"
done

echo
echo "── verify all aliases serve same bundle ──"
for alias in "${ALIASES[@]}"; do
  bundle=$(curl -s --max-time 5 "https://${alias}/" 2>/dev/null | grep -oE 'index-[A-Za-z0-9]+\.js' | head -1)
  printf "  %-45s  %s\n" "$alias" "${bundle:-<NO RESPONSE>}"
done

echo
echo "✓ deploy complete. QR code (→ travel-guide-one-olive.vercel.app/app) stays valid."
