# AI Agent Workflow

This guide explains how teammates should use AI coding agents safely in this repository.

## Prompting Codex safely

- State the goal, constraints, and files or areas that matter.
- Say whether the agent should inspect, edit, test, or only report.
- Name any files that must not be changed.
- Tell the agent to stop if it finds uncommitted local work, branch drift, or conflicts.
- Keep personal prompts, private notes, and unpublished strategy outside the repository.

## Preventing overwrite of teammate work

- Start by checking `git status`, the current branch, and the current commit.
- Do not edit on `main`.
- Work on one task branch at a time.
- Avoid broad formatting or repo-wide rewrites unless the team explicitly asked for them.
- If unexpected edits appear in the same files, stop and report the conflict instead of forcing a rewrite.

## What Codex should do before editing

1. Confirm the working tree is clean or summarize existing changes before proceeding.
2. Confirm the current branch and commit.
3. Read `AGENTS.md`, `CONTEXT.md`, and relevant docs for the task area.
4. Inspect only the files needed to complete the task.
5. State the planned change before editing files.

## What Codex should report after editing

- Which files changed.
- What was added, removed, or updated at a high level.
- Which check was run, or why no check was run.
- Any assumptions, open questions, or areas needing team approval.
- Confirmation that no unrelated files, private notes, or secrets were added.

## What must stay private

- Personal prompts and personal operating instructions.
- Draft strategy notes that are not meant for the team.
- API keys, tokens, passwords, and `.env` contents.
- Vendor credentials for future AI features.

## Future-safe API guidance

- If AI or API integrations are added later, keep provider secrets server-side only.
- Use `.env.example` only for variable names and placeholder values.
- Treat provider-specific setup, including OpenRouter or other gateways, as optional implementation detail unless the repo adopts it explicitly.
