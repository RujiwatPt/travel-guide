# Single `entries` table with `type` discriminator

We model both **Activities** (operator-owned, opening-hours updated by local users) and **Places** (curated landmarks with no operator) as rows in a single `entries` table, distinguished by a `type` enum (`'activity' | 'place'`). Activity-only fields (`owner_id`, `live_status`, `status_note`, `status_updated`, `owner_edit_token`) are nullable on Place rows; the constraint `places_have_no_owner` enforces the rule.

We chose this over (a) two separate tables `activities` and `places`, and (b) a polymorphic base + per-type extension tables, because:

1. Activities and Places share ~90% of their fields (location, name, photos, tag dimensions, hours).
2. The chatbot's core query — "give me a 5-stop route mixing food and history" — is a single-table `SELECT` instead of a `UNION ALL` + merge in app code.
3. Adding new entry types later (`accommodation`, `otop_shop`, `restaurant` as a sibling to `food`) is a one-line enum extension, not a new table + migration.
4. The chatbot's `Plan` morphism (`Plan.contains → Entry`) stays homogeneous; otherwise it becomes `Plan → either(Activity, Place)`, which most ORMs and TypeScript types handle awkwardly.

The cost is sparse columns on Place rows (Activity-only fields are NULL). We accept this and lean on the CHECK constraints to keep semantics tight.
