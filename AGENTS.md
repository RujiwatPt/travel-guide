## Agent skills

### Issue tracker

GitHub Issues at `RujiwatPt/travel-guide` via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical defaults (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.

## Shared AI-agent rules

- Before editing, check `git status`, the current branch, and `git rev-parse --short HEAD`.
- Do not work directly on `main`; create or switch to a task branch first.
- Keep one task per branch so review scope stays clear.
- Make minimal, reversible changes and avoid rewriting unrelated files.
- Preserve the existing issue-tracker, triage-label, and domain-doc rules in this file and `docs/agents/`.
- Read `CONTEXT.md` and relevant ADRs before editing docs or code tied to domain terms.
- Run the smallest relevant check before commit and report what you ran.
- New feature work must include tests, or a clear explanation of why tests do not apply; for this repo, normally run `npm.cmd test`, `npm.cmd run build`, and `git diff --check`.
- Prepare a short PR summary covering intent, changed files, checks, assumptions, and follow-up risks.
- Keep personal prompts, private notes, secrets, and API keys out of the repository.
- See `docs/TEAM_SOP.md`, `docs/AI_AGENT_WORKFLOW.md`, `docs/GIT_COLLABORATION.md`, and `docs/SECURITY.md` for the longer shared workflow.
