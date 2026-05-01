# Travel Guide for Thailand's Secondary Cities

A mobile web app helping tourists already physically present in a Thai secondary city plan their day, using a curated mix of landmarks and locally-operated activities. Local shop owners maintain their own data through magic-link edit URLs, creating a two-sided network between fresh ground-truth data and the tourists who need it.

## Language

### Core entities

**Entry**:
The umbrella type for anything that appears as a pin on the map and a card in the bottom sheet. Discriminated by `type` into Activity or Place — see below.
_Avoid_: POI, place (overloaded), venue, location, spot.

**Activity**:
An Entry with `type='activity'`. Has a commercial Owner who keeps its data live — opening hours, sold-out status, special announcements. Restaurants, cafés, workshops, markets, bike rentals.
_Avoid_: business, vendor, shop (informal use only).

**Place**:
An Entry with `type='place'`. Curated by the team, no Owner, no live updates needed because it doesn't change — landmarks, statues, riverfronts, free public sites.
_Avoid_: POI, landmark (used as a `category` value, not the entity name).

**Owner**:
A local person or organization that manages one or more Activities. Authenticates via per-Entry magic-link tokens, never via passwords. Identified to Tourists by `display_name` ("Khun Somchai") and an optional `verified` badge.
_Avoid_: merchant, vendor, host, user, business owner.

**Tourist**:
An anonymous app user — someone visiting the city. No login. Identified only by browser session for the duration of one visit.
_Avoid_: visitor, guest, user (overloaded with Owner).

**Plan**:
An ephemeral itinerary returned by the chatbot — an ordered sequence of Stops with timing, route geometry, and rationale. Not persisted in the database; lives only in the chatbot's response payload and the rendering UI.
_Avoid_: itinerary, trip, route (the route is a sub-property of the Plan).

**Stop**:
A single position in a Plan. References one Entry plus arrival time, duration, travel-mode-to-next, and a one-line `why_en` for the card.
_Avoid_: step, leg, destination.

**Live Status**:
The Owner's manual override of the scheduled hours — `open` / `closing_soon` / `closed_today` / `sold_out` / `temporarily_closed`. Layered on top of `hours_weekly`; when set to anything other than `open`, it wins over the schedule.
_Avoid_: availability, state, status (use the full term).

**City**:
The geographic scope of one app instance. MVP = Nakhon Phanom only; roadmap = all 55 of Thailand's secondary cities. First-class entity from day one to make multi-city expansion a row insert, not a schema migration.
_Avoid_: region (Thailand's regions are larger administrative units), destination.

**Theme**:
A curated proposition about a City — *what this city is for*. A small set (3-5) of named identity statements per City: e.g. "Birthday-Stupa Pilgrimage", "Mekong & Naga Lore", "Vietnamese-Thai Heritage", "OTOP & Local Crafts". Each Theme has a name, a 1-line tagline, an icon, and a curated subset of Entries. Themes are the answer to *"why come to Nakhon Phanom specifically?"* — distinct from the per-Entry tag dimensions, which describe individual Entries rather than make claims about the City.
_Avoid_: category (overloaded with the Entry-level enum), wedge, hero, collection, route_cluster, intent_group (the latter two are valid synonyms in the teammate's research file but `Theme` is canonical here).

**Signature**:
A status applied to an individual Entry meaning *"don't miss this — it embodies what this City is famous for."* Distinct from regular Entries. Signatures get visual prominence in the UI (special pin styling, "Don't miss" pinned card section). For MVP, derived from `vibe_tags.includes('iconic')`; in production may become a first-class field. An Entry can be a Signature without belonging to any specific Theme, and vice versa.
_Avoid_: must-see (informal), featured, top pick, P1 (the teammate's `default_priority` value — that's a ranking score, not the same concept).

### Vocabulary concepts

**เมืองรอง / Secondary City**:
Thai government designation for the 55 cities outside the top tourist destinations (Bangkok, Chiang Mai, Phuket, etc.). The wedge of the entire product. The English subtitle is "secondary city"; Thai content uses เมืองรอง.
_Avoid_: small city, minor city, tier-2 city, lesser-known city.

**Tag dimension**:
A typed axis for filtering and recommendation: vibe, cuisine, time-of-day, setting, price, category. Each is its own column on `entries` (typed `text[]` or `enum`), not a free-text tag soup. The chatbot reasons across dimensions independently — e.g., "Vietnamese cuisine + romantic vibe + indoor setting + mid price".
_Avoid_: label, tag (use "tag dimension" or name the specific dimension), category (which is one specific dimension, not the umbrella).

**Magic-link edit**:
The Owner's authentication mechanism: each Entry has a `owner_edit_token`; the URL `/owner/edit?token=...` opens that Entry's edit form directly. No password, no login screen. Tokens are rotatable per-Entry.
_Avoid_: deep link, edit URL (these are too generic).

**Two-sided network**:
The product's strategic moat: Owners get free traffic, Tourists get fresh data. The `entry_status_log` table is the proof — frequent owner updates signal a healthy network.
_Avoid_: marketplace, platform (these imply transactions; we don't intermediate any).

## Relationships

- An **Owner** manages one or more **Activities** (n:1 from Entry to Owner)
- Every **Entry** belongs to exactly one **City** (n:1)
- An **Entry** has 0..n **Tag dimensions** populated; each dimension is a column, not a join
- An **Entry** with `type='place'` always has `owner_id IS NULL` and `live_status IS NULL` (enforced by CHECK constraint)
- A **Plan** contains an ordered list of **Stops** (1:n in JSON); not persisted to a table
- Each **Stop** denormalizes a snapshot of its **Entry** (`entry_summary`) so the UI renders without a second fetch
- An **Activity** has both `hours_weekly` (the standard schedule) and `live_status` (the live override); the override wins when set
- Every **Owner** edit appends one row to **`entry_status_log`** (append-only audit trail)
- A **City** has 3-5 **Themes** (1:n)
- A **Theme** groups n **Entries** (n:m); the same Entry may appear in multiple Themes (e.g., Phra That Phanom belongs to both "Birthday-Stupa Pilgrimage" and "Vietnamese-Thai Heritage" if it has both meanings)
- An **Entry** is a **Signature** if its `vibe_tags` includes `'iconic'` (MVP derivation); future: a dedicated field. Signature is orthogonal to Theme membership.

## Conventions

### Theme implementation (MVP)
- Themes are NOT stored in the database. They are a **hardcoded constant** per City in `src/data/themes.ts`.
- Each Theme is `{ id, city_id, name_en, name_th, tagline_en, tagline_th, emoji, entry_ids: string[] }`.
- A Theme without entries (e.g., "OTOP & Local Crafts" before we seed shop entries) renders an empty-state card.
- Future: Themes may become editable by city-level curators; the structure is stable across that move.

### Signature derivation (MVP)
- An Entry is a Signature iff `vibe_tags.includes('iconic')`. Single source.
- Helper: `isSignature(entry)` in `src/lib/signatures.ts`.
- Future: a dedicated `is_signature: boolean` column on Entry, but the application interface stays the same.

### PRD alignment notes (hackathon scope)
- API naming may expose `entries` as canonical endpoints, while `places` can remain backward-compatible aliases.
- Intent search may return mixed browse results, but storage remains normalized:
  - `type='activity' | 'place'` only
  - food rows are `type='activity'` with `category='food'`
- For activity-first intent queries, retrieval can exclude `category='food'` unless explicitly requested by Tourist.

### Languages
- All user-facing text is dual-stored: `name_en` + `name_th`, `description_en` + `description_th`, etc. No translations table.
- The MVP demo is in English; Thai exists as a UI toggle.
- The chatbot responds in the user's input language (auto-detect).

### Time
- Single time zone for MVP: `Asia/Bangkok`. Stored explicitly in `hours_weekly.tz` for forward compatibility.
- Times that cross midnight use 24h+ format: `[["18:00", "26:00"]]` means 6pm to 2am next day.

### Hours
- `hours_weekly` is JSONB: `{ tz, all_day, weekly: { mon, tue, ..., sun }, notes_en, notes_th }`
- `weekly[day] = null` means closed that day
- `weekly[day] = [["09:00","20:00"], ["17:00","22:00"]]` means split shift
- `all_day: true` means 24/7 (omit `weekly`)

### Open-now derivation
A single function `is_open_now(entry, now)` derives state by:
1. Check `live_status` first — overrides win
2. Check `hours_weekly.all_day` — short-circuit to OPEN
3. Look up today's day-of-week ranges in `weekly`
4. Return OPEN if `now` falls within any range, else CLOSED

Implemented client-side in TypeScript — no backend round-trip per pin.

## Tag vocabularies (locked for MVP)

**Closed (enums):**
- `category`: food | cafe | landmark | market | museum | temple | nature | workshop | shop
- `setting`: indoor | outdoor | mixed
- `price_band`: free | budget | mid | premium
- `live_status`: open | closing_soon | closed_today | sold_out | temporarily_closed
- `data_source`: owner_updated | curated | imported

**Open (text[] — grow over time):**
- `vibe_tags`: romantic, family, hipster, spiritual, photo-spot, lively, quiet, local-favourite, iconic, hidden-gem
- `cuisine_tags`: vietnamese, isan, thai, chinese, vegetarian, seafood, dessert, coffee
- `time_tags`: morning, afternoon, sunset, evening, late-night, weekend-only

## Example dialogue

> **Dev:** "When the chatbot returns a Plan, do we save it?"
> **Domain expert:** "No — Plans are ephemeral. The whole Plan lives in the chatbot response payload. If we ever add a 'share my plan' link, we'll persist them then. Until that's a real ask, treat them as JSON in flight."
>
> **Dev:** "What's the difference between an Activity and a Place again?"
> **Domain expert:** "Both are Entries on the map and both can show up in a Plan. An Activity has an Owner who updates it — opening hours, sold-out status. A Place is curated by us and doesn't need updates because it doesn't change — like a 16th-century stupa or a riverfront walkway. Tourist sees both as pins; only Activities show 'updated 2h ago by owner' badges."
>
> **Dev:** "Can a Tourist edit anything?"
> **Domain expert:** "No. Edits flow only through Owners via magic-link tokens. Tourists are anonymous and read-only. If we ever add 'suggest an edit', it would be a separate moderation queue — not in scope."
>
> **Dev:** "What if an Owner runs three restaurants — three accounts?"
> **Domain expert:** "One Owner row, three Entry rows pointing to the same `owner_id`. n:1. Each Entry has its own `owner_edit_token`, so the magic links land directly on the right edit form."
>
> **Dev:** "How is a Theme different from a category or a vibe tag?"
> **Domain expert:** "A Theme makes a claim about the City — 'Nakhon Phanom is for the birthday-stupa pilgrimage.' That's a marketing-level proposition that no individual Entry can carry. A category describes what an individual Entry IS (food, temple, museum). A vibe tag describes what an individual Entry FEELS like (romantic, lively, iconic). Themes group multiple Entries under a unifying claim about why someone would come here — they're the city's identity, made visible."
>
> **Dev:** "What's a Signature, and is it the same as 'iconic'?"
> **Domain expert:** "A Signature is an Entry that embodies what the City is famous for — 'don't miss this.' For MVP we derive Signature from the `'iconic'` vibe_tag, so functionally they're the same right now. But conceptually Signature is a *status* (curatorial decision: this is one of NKP's defining things) while `'iconic'` is a *vibe* (descriptive: it feels iconic). When we eventually add a real Signature column, the vibe_tag stays — the curatorial flag and the descriptive feel can diverge."

## Flagged ambiguities

- **"Place"** was overloaded — could mean any Entry, or specifically a curated landmark Entry. **Resolved**: Place = Entry where `type='place'` (curated, no Owner). Use **Entry** for the umbrella concept.
- **"User"** was overloaded — could mean Tourist or Owner. **Resolved**: keep these distinct. Use **Tourist** for the anonymous app visitor, **Owner** for the data-updating local. Never write "user" alone.
- **"Category"** vs **"tag"** — both used loosely for filtering. **Resolved**: `category` is one specific dimension (a single enum value per Entry — food, cafe, landmark...). The umbrella term for all filterable dimensions is **tag dimension**.
- **"Theme"** vs **"category"** vs **"tag"** — risk of confusion since all three group/filter Entries. **Resolved**: a **Theme** makes a city-level claim about identity ("NKP is for the birthday stupas") and is curated per City; a **category** is a per-Entry kind enum; a **tag dimension** is a per-Entry descriptive axis. Theme is a higher-level concept than the others.
- **"Signature"** vs **"iconic"** vibe_tag — currently identical (Signature is derived from the tag). **Resolved**: keep both terms but use them precisely. **Signature** = curatorial status ("this is one of NKP's defining things — don't miss it"). **`'iconic'` vibe_tag** = descriptive flag ("this feels iconic"). For MVP they coincide; future schema may separate them.
