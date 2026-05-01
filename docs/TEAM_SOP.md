# Team SOP

This document describes the shared workflow for humans and AI coding agents working in this repository. It is team-facing guidance only; personal prompts and private notes stay outside the repo.

## Roles

- Humans define priorities, confirm scope, approve tradeoffs, and own final merge decisions.
- LLM planning assistants help with planning, drafting, explanation, and review support when asked.
- AI coding agents perform repository work such as inspection, implementation, targeted checks, and documentation updates inside the working tree.
- Reviewers verify correctness, scope, safety, and clarity before changes merge.

## Standard workflow

1. Start from a clean local copy that is up to date with `origin/main`.
2. Review the issue, PRD, `CONTEXT.md`, and relevant ADRs before editing.
3. Create one branch per task and keep the branch focused on that scope.
4. Implement the smallest useful change set without rewriting unrelated files.
5. Run the smallest relevant check for the change, then record the result.
6. Prepare a PR summary that explains intent, changed files, checks, assumptions, and follow-up work.
7. Request review, address feedback on the same branch, and merge only after approval.

## Definition of done

- The scoped issue or task is addressed.
- The working tree includes only intentional changes for that task.
- The smallest relevant check has been run, or any skipped check is explained.
- Documentation stays aligned with the current behavior when the change affects team understanding.
- The PR summary is clear enough for a teammate to review without guessing what changed.

## Conflict handling

- If `git status` is not clean before work starts, stop and review the local changes first.
- If the branch is behind `main`, update it before editing when it is safe to do so.
- If merge conflicts appear, pause broad edits and resolve conflicts in the smallest possible area.
- If an AI agent encounters unexpected teammate changes, it should stop rewriting that area and report the conflict clearly.
- Re-run the smallest relevant check after conflicts are resolved.

## Transparency for AI-assisted work

- Keep AI-assisted changes visible in normal commits, PR descriptions, and review discussion.
- Summaries should explain what the agent changed, what it verified, and what still needs human judgment.
- Do not commit raw personal prompts, private planning notes, or hidden side instructions used by one contributor.
- If AI-generated content is uncertain, label the assumption and request review instead of presenting it as settled fact.
