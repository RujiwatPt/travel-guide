# Security

These are the minimum repository rules for secrets and AI/API-related security hygiene.

## Secrets

- Do not commit `.env` files.
- Do not commit API keys, access tokens, passwords, or copied secret values.
- Use `.env.example` only for variable names, comments, and placeholder values.
- If a secret is exposed locally, rotate it outside Git; do not try to hide it with follow-up commits alone.

## AI and API features

- If AI or third-party API features are added, keep real credentials server-side only.
- Do not embed provider keys in frontend code, static files, screenshots, or documentation examples.
- Treat OpenRouter or any other API gateway as optional future implementation detail unless the repo adopts it explicitly.

## Review reminders

- Check staged files before commit for accidental secrets.
- Watch for copied terminal output, debug logs, or screenshots that may contain sensitive values.
- Keep personal prompts, private notes, and non-team strategy documents outside the repository.
- Use the platform's secret scanning features and repository security alerts when available.
