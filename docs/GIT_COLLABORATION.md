# Git Collaboration

This repo is shared by multiple humans and AI agents. Use these rules to keep changes reviewable and safe.

## Branch naming

- Use short, task-focused branch names.
- Recommended prefixes: `docs/`, `feat/`, `fix/`, `chore/`, `spike/`.
- Keep one task per branch.
- Never do active implementation work directly on `main`.

## Commit messages

- Prefer concise conventional-style subjects such as `docs: add team AI workflow guidance`.
- Keep the first line focused on the user-visible or reviewer-visible change.
- Split unrelated changes into separate commits instead of hiding them in one large commit.

## Pull request workflow

1. Sync from `origin/main` before starting work.
2. Create a task branch from the current `main`.
3. Make minimal, reversible changes.
4. Run the smallest relevant check and record the result.
5. Open a PR with scope, summary, checks, assumptions, and follow-up notes.
6. Address review comments on the same branch unless reviewers request a different approach.

## Review checklist

- Scope matches the issue or task.
- No unrelated files were rewritten.
- Domain terminology matches `CONTEXT.md`.
- Checks are appropriate for the change and results are reported.
- Docs stay aligned with behavior when the change affects workflow or product understanding.
- No secrets, private prompts, or personal notes were committed.

## Merge rules

- Merge only after required review is complete.
- Prefer a clean history that preserves task intent.
- Do not merge branches with unresolved conflicts or unexplained failing checks.
- If the PR changes shared workflow, ask for explicit team review.

## Conflict handling

- Stop and inspect if `git status` shows unexpected local changes.
- Fetch and compare with `origin` before doing risky sync operations.
- Resolve conflicts in the narrowest possible area and avoid rewriting teammate work.
- Summarize conflict resolution decisions in the PR when they affect behavior or docs.
