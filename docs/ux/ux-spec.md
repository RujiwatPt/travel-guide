# UX Spec — Travel Guide MVP

Single source of truth for tonight's UI build. Cross-reference: `/CONTEXT.md` (domain), `/docs/schema/schema.sql` (data), `/docs/adr/0001-single-entries-table.md` (architecture).

---

## 1. Design tokens

### Colors (lifted from kit, locked)

```css
--ink:          #061c22;   /* primary text, dark UI */
--muted:        #6b7188;   /* secondary text */
--blue:         #88c7f4;   /* soft accent, gradient stop */
--blue-strong:  #1e8df0;   /* primary action, route polyline, calendar selected */
--yellow:       #ffc20d;   /* selected chip, trust accent, primary highlight */
--cream:        #fff6dc;   /* hero gradient stop */
--panel:        #f8fbff;   /* surface */
--line:         rgba(7, 27, 48, 0.1);   /* divider */
--shadow:       0 24px 60px rgba(25, 73, 120, 0.22);

/* Status colors (open-now signaling) */
--status-open:           #2ea84a;   /* green pin + dot */
--status-closing-soon:   #ffc20d;   /* yellow */
--status-closed:         #9ca3af;   /* grey */
--status-temp-closed:    #b16060;   /* muted red */
```

### Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

```css
font-family: "Plus Jakarta Sans", "IBM Plex Sans Thai", ui-sans-serif, system-ui, sans-serif;
```

- Plus Jakarta Sans handles Latin, IBM Plex Sans Thai handles Thai glyphs automatically (browsers fall through the stack per glyph).
- Always render `name_th` directly under `name_en` on Entry Detail; lower opacity (~60%) for visual hierarchy.

### Spacing & shape

- Phone frame: 375 × 812 (iPhone X reference; matches kit)
- Card radius: `28px` (kit's `.place-card`, `.hero-card`)
- Pill / chip radius: `999px`
- Button radius: `18px` (kit's `.generate`)
- Default gap between elements: `14–18px`
- Bottom-sheet handle: `134 × 5px` rounded `999px`, color `--ink`

---

## 2. Screen 1 — Map (the landing screen)

**Pattern:** full-screen map, 3-state drag-up bottom sheet, floating chatbot bar at top.

### States of the bottom sheet

| State | Sheet height | What's visible | Triggered by |
|---|---|---|---|
| `peek` | ~90 px | Handle + filter chips row only | Default on landing; tap map background |
| `half` | ~40% screen | Handle + chips + ~3 cards | Tap a chip; drag handle up; chatbot returns no plan |
| `full` | ~90% screen | Handle + chips + scrollable card list | Drag handle up to top; chatbot returns a Plan |

### Layout (peek state — the video's first frame)

```
┌────────────────────────────────┐
│ ◐ status bar                   │
├────────────────────────────────┤
│ ┌──────────────────────────┐   │
│ │ ⌕ Ask about Nakhon Pha…  │   │  ← floating chatbot bar
│ └──────────────────────────┘   │     (kit .top-search style + glow)
│                                │
│       [ MAP — NKP ]            │
│                                │
│           ⊙ 🍜                 │  ← Activity pin (green/grey/yellow)
│                                │
│         ⊙ 🐉  ⊙ ☕              │  ← Place pin + Activity pin
│                                │
│                          ⊕     │  ← locate-me FAB
├════════════════════════════════┤  ← bottom sheet handle
│ ▬                              │
│ [🟢 Open] [🍜 Food] [🐉 Iconic]│  ← filter chips (always visible)
│                          →     │
└────────────────────────────────┘
```

### Pin design

| Element | Activity | Place |
|---|---|---|
| Shape | Circle, white border, soft shadow | Same |
| Center icon | Category emoji (🍜 / ☕ / 🛍️ / 🛕) | Same (🐉 / 🏛️ / 🌅) |
| Color halo | `--status-open` / `--status-closed` / `--status-closing-soon` | Always `--status-open` if `all_day: true`, else derived |
| Size | 36 px default; 1.4× when in active route | Same |
| Numbered badge | None in browse; 1–5 in chatbot result mode | Same |
| Hover/press | Subtle bounce + label tooltip | Same |

### Filter chips (locked vocabulary)

Visible row (left → right), horizontal scroll for overflow:

```
🟢 Open now    🍜 Food    ☕ Cafe    🐉 Iconic    🌅 Sunset
🏛️ History    🛍️ Market   🌿 Nature   🛕 Temple   ✨ Spiritual   📸 Photo-spot
```

- **Multi-select** — chips stack ("Food" + "Open now" intersect)
- Active chip: `--yellow` background, `--ink` text
- Inactive: white background, grey border, `--muted` text
- "🟢 Open now" is **derived** (hours_weekly + live_status), not a tag column
- Tapping any chip auto-promotes sheet from `peek` → `half`

### Chatbot bar

- Position: top of screen, floating over map, 16 px below status bar
- Shape: pill (radius 999), white at 78% opacity + backdrop blur
- Placeholder: `Ask about Nakhon Phanom…` (i18n: `ถามเกี่ยวกับนครพนม…`)
- Right side: small `◉` send icon
- Tap: input expands, keyboard appears
- For MVP placeholder behavior: typing falls back to keyword search → activates filter chips

---

## 3. Screen 2 — Chatbot Result (the wow moment)

**Same screen as Map.** The bottom sheet auto-promotes to `full`, route draws on the map, pins highlight, non-route pins fade.

### The 6-second choreography (script for video)

```
t=0.0s  User types: "I have one afternoon, I love food and history"
t=1.2s  User taps send (or presses enter)
t=1.4s  Chatbot bar shows three animated dots
t=2.0s  Bottom sheet snaps from peek → full state (300 ms ease-out)
t=2.3s  Top of sheet: rationale_en text typewriters in (~1.5 s)
t=3.8s  First Stop card slides up + fades in (200 ms)
t=3.9s  Map: pin 1 enlarges 1.4×, numbered badge "1" appears, glow
t=4.0s  Map: route segment from initial center to pin 1 draws (300 ms, dashed → solid)
t=4.2s  Second Stop card slides up
t=4.3s  Pin 2 enlarges + numbered "2"; route segment 1→2 draws
... (repeat for stops 3, 4, 5 at 200 ms intervals)
t=5.5s  All non-route pins fade to opacity 0.3
t=5.8s  Final state — route fully drawn, all 5 cards visible
```

### Layout (final state)

```
┌────────────────────────────────┐
│ ◐ status bar                   │
├────────────────────────────────┤
│ ┌──────────────────────────┐   │
│ │ ⌕ I have one afternoon…  │   │  ← chatbot bar shows query
│ └──────────────────────────┘   │
│                                │
│   ① ──── ② (10min drive)       │  ← numbered, glowing pins
│       ╲╱                       │     dashed → solid blue route
│        ③ ── ④ (1min walk)      │     (--blue-strong, 4 px wide)
│             ╲                  │
│              ⑤ (optional)      │
│                                │
│  (other pins greyed to 0.3)    │
├════════════════════════════════┤
│ ▬                          ✕   │
│ ✨ Pho Sawan's last lunch      │  ← rationale_en (italic)
│   order is 14:00, Ho Chi…      │
│                                │
│ ┌──────────────────────────┐   │
│ │ ① 🍜 1:00 PM              │   │  ← Stop card
│ │ Pho Sawan          [img]  │   │
│ │ Lunch — pho + nem nuong   │   │
│ │ 45 min · ₿60–120          │   │
│ └──────────────────────────┘   │
│        → 8 min drive            │  ← connector pill
│ ┌──────────────────────────┐   │
│ │ ② 🏛️ 2:00 PM              │   │
│ │ Ho Chi Minh's House [img] │   │
│ │ Walk through 1928 house   │   │
│ │ 45 min · ₿20              │   │
│ └──────────────────────────┘   │
│   ... (3 more cards)           │
│                                │
│ ┌──────────────────────────┐   │
│ │ ⑤ 🌙 6:00 PM   OPTIONAL   │   │  ← dashed border + label
│ │ Indochina Walking Street  │   │
│ │ Friday night market       │   │
│ │                  [+ ADD]  │   │
│ └──────────────────────────┘   │
│                                │
│ ╭──────────────────────╮       │  ← sticky re-prompt pill
│ │ Not quite right? Ask…│       │
│ ╰──────────────────────╯       │
└────────────────────────────────┘
```

### Stop card (vs browse-mode card)

Same component, three additions when used in chatbot result:
1. Numbered badge in top-left (① ② ③)
2. Arrival time prefix (`1:00 PM`)
3. Connector pill below (`→ 8 min drive` / `→ 3 min walk`)

Optional stops: dashed border, `OPTIONAL` label top-right, `+ ADD` ghost button.

### Map state during result

- Map pan/zoom **locked** while plan is shown (avoids accidental dismiss)
- Tap map background → tap-pan disabled; tap on a pin → opens Entry Detail
- ✕ button top-right of sheet → clears plan, resets to default map + filter chips
- Re-prompt pill → re-focuses chatbot bar

---

## 4. Screen 3 — Owner Edit (the second wow moment)

**Pattern:** quick-status primary, single screen, sticky save button.

### Layout

```
┌────────────────────────────────┐
│ ◐ status bar                   │
├────────────────────────────────┤
│ ‹ Pho Sawan                  ⋯ │  ← entry name in header
├────────────────────────────────┤
│  ┌─────────────────────────┐   │
│  │ 👤 Khun Somchai  ✓     │   │  ← identity strip
│  │ Owner of 2 places       │   │
│  └─────────────────────────┘   │
│                                │
│  Status right now              │
│  ┌──────────────────────────┐  │
│  │  🟢 Open                 │  │
│  │  🟡 Closing Soon         │  │  ← chip column
│  │  ⚫ Sold Out         ←   │  │     (selected: yellow bg)
│  │  ⚫ Closed Today         │  │
│  │  🔴 Temporarily Closed   │  │
│  └──────────────────────────┘  │
│                                │
│  Note for tourists (optional)  │
│  ┌──────────────────────────┐  │
│  │ Back tomorrow 9 AM       │  │
│  └──────────────────────────┘  │
│                                │
│  Today's hours                 │
│  Mon · 09:00–20:00         ›   │  ← collapsed; tap → "Edit weekly hours" stub
│                                │
│  ─────────                     │
│                                │
│  Recent updates                │
│  • 2h ago — set Open           │  ← from entry_status_log
│  • Yesterday — set Open        │
│                                │
├────────────────────────────────┤
│ ┌──────────────────────────┐   │
│ │  Save & Notify Tourists  │   │  ← sticky bottom button
│ └──────────────────────────┘   │
└────────────────────────────────┘
```

### Components

| Element | Spec |
|---|---|
| Identity strip | Avatar (36 px circle) + `display_name` + verified ✓ + small "Owner of N places" line |
| Status chip | Kit's `.chips` styling. Selected: `--yellow` bg. Color dot matches map pin colors (continuity) |
| Note input | Single-line text, 80 char max, optional. Saves to `status_note` |
| Today's hours | Read-only summary; tap → "Edit weekly hours" stub screen (placeholder OK for MVP) |
| Recent updates | Last 3 rows from `entry_status_log` — read-only |
| Save button copy | **"Save & Notify Tourists"** — the value framing for owner |
| After-save toast | `✓ Updated. 3 tourists viewing this now.` (fake count for demo punch) |
| Multi-entry switcher | Top-right `⋯` → "Switch place" (visible, not used in demo) |

### The 5-second demo beat (script for video)

```
t=0.0s  Cut to owner phone — Pho Sawan edit, current status: Open (🟢 selected)
t=0.5s  Voiceover begins
t=1.5s  Finger taps "Sold Out" chip → animates from outline → filled-yellow
t=2.5s  Finger taps "Save & Notify Tourists"
t=3.0s  Toast: "✓ Updated. 3 tourists viewing this now."
t=4.0s  Cut to tourist phone (hard cut, no transition)
t=4.2s  Pho Sawan pin fades green → grey on map
t=4.5s  Bottom sheet card slides in: "Sold out today — back tomorrow 9 AM"
t=5.0s  Voiceover: "That's the live network. Locals update. Tourists trust."
```

---

## 5. Screen 4 — Entry Detail (Activity OR Place)

**Pattern:** kit-style hero (full-bleed photo + dark text overlay), then scroll into white card. Same layout for both Entry types; Activity-only fields hidden on Place.

### Layout

```
┌────────────────────────────────┐
│ ◐ status bar                   │
├────────────────────────────────┤
│  ‹                       ♡  ⋯  │  ← floating buttons over photo
│                                │
│   [ Hero photo / carousel ]    │  ← full-bleed, ~50% screen
│                                │     gradient overlay at bottom
│            ╔════════╗          │  ← floating live-status pill
│            ║ ● OPEN ║          │     (Activity only)
│            ╚════════╝          │
│                                │
│  Vietnamese                    │  ← category eyebrow (small, white)
│  Pho Sawan                     │  ← name_en (large, white)
│  เฝอสวรรค์                     │  ← name_th (smaller, 70% opacity)
├────────────────────────────────┤  ← white card slides up here
│                                │
│  ┌──────────────────────────┐  │
│  │ 👤 Updated 2h ago by     │  │  ← TRUST BADGE
│  │    Khun Somchai ✓        │  │     pill, soft yellow bg
│  └──────────────────────────┘  │     (Activity only)
│                                │
│  ✨ The most famous Vietnamese │  ← why_visit_en (italic, accent)
│     food in town. Cheap, fast, │
│     authentic.                 │
│                                │
│  ─────                         │
│                                │
│  🕐 Today · 09:00 – 20:00      │  ← derived from hours_weekly
│  ⓘ  Last lunch order at 14:00  │  ← from notes_en
│  See full week ›               │
│                                │
│  ─────                         │
│                                │
│  About                         │
│  Family-run Vietnamese kitchen,│  ← description_en
│  third generation. Pho broth   │
│  simmered 18 hours...          │
│                                │
│  ─────                         │
│                                │
│  [vietnamese] [local-favourite]│  ← tag chips
│  [budget] [indoor]             │
│                                │
│  ─────                         │
│                                │
│  ┌──────────────────────────┐  │
│  │ 📍 Sunthon Vichit Rd     │  │  ← location card
│  │    [mini map with pin]   │  │
│  │    1.2 km away · 4 min   │  │
│  └──────────────────────────┘  │
│                                │
├────────────────────────────────┤
│ ┌──────────────────────────┐   │
│ │   Get Directions          │   │  ← sticky bottom CTA
│ └──────────────────────────┘   │
└────────────────────────────────┘
```

### Activity vs Place differences

Visually almost identical to tourist:

| Element | Activity | Place |
|---|---|---|
| Hero, name, why_visit | Same | Same |
| Live status pill | ● OPEN / SOLD OUT / etc. | Hidden (or "Always open" if `all_day: true`) |
| Trust badge | "Updated 2h ago by Khun Somchai ✓" | Hidden |
| Today's hours | Real hours | "Open all day" or actual hours (e.g., Ho Chi Minh House 08:00–17:00) |
| Description, tags, location, CTA | Same | Same |

### Trust badge (Activity only)

- Position: directly below `name_th`, above `why_visit_en` — first thing in white card
- Style: soft yellow (`--cream`) background, dark ink text, avatar circle (24 px)
- Tap → modal showing last 5 rows from `entry_status_log` ("Recent updates from Khun Somchai")
- Reinforces ongoing trust without being aggressive

---

## 6. Screen 5 — QR Landing Splash (1.5 s)

```
┌────────────────────────────────┐
│                                │
│                                │
│         [APP LOGO]             │
│                                │
│      Nakhon Phanom             │
│      นครพนม                    │
│                                │
│  Where Thailand meets          │
│  Laos and Vietnam              │  ← city.tagline_en
│                                │
│         (loading dots)         │
│                                │
└────────────────────────────────┘
```

- Background: linear gradient using kit palette (`#96cdf5 → #fef5df → #ffda59`)
- Hold 1.5 s, then crossfade to Map screen
- For real users post-first-scan: skip splash, go directly to Map

---

## 7. Components (reusable patterns)

### Card (browse mode and chatbot result)

```
┌─────────────────────────────────────┐
│ [① if route] Pho Sawan              │  ← optional numbered badge top-left
│ ┌───┐ เฝอสวรรค์                     │  ← name_en + name_th
│ │ 🍜 │ The most famous Vietnamese... │  ← why_visit_en
│ │img│ ● OPEN · ₿ · 1.2 km           │  ← status dot + price band + distance
│ └───┘ • Updated 2h ago ✓            │  ← trust badge inline (Activity only)
└─────────────────────────────────────┘
```

- Photo thumbnail: 60 × 60, radius 12 px
- Status dot color: `--status-*` palette
- Trust badge: small text, `--muted` color, ✓ in `--blue-strong`
- Tap → Entry Detail
- In chatbot result: prepend numbered badge, time pill (`1:00 PM`), connector pill below

### Chip (filter, status)

- Pill, radius 999, padding `10px 16px`
- Inactive: white bg, `--line` border, `--ink` text
- Active: `--yellow` bg, `--ink` text
- Multi-select OK; selected count shown nowhere (chips themselves are the indicator)

### Two-phone shot (video composition)

- Side-by-side, **owner LEFT**, tourist RIGHT
- Both phones at ~60% screen-fill (some intimate overlap acceptable)
- Owner's hand visible tapping; tourist phone passive
- Filmed in one continuous take — no cuts mid-action
- Hard cut transitions before/after this shot
- Optional post-production: subtle glowing arc connecting the two phones at the sync moment

---

## 8. What's NOT in MVP (explicitly deferred)

### Screens deferred
- ❌ Bottom nav (single-screen app for MVP)
- ❌ Profile / account / settings
- ❌ Bookmarks / saved places
- ❌ Trip Journal
- ❌ Booking / reservation
- ❌ Notifications
- ❌ Weekly hours editor (stub only — placeholder screen acceptable)
- ❌ Photo upload (use seeded photos)
- ❌ Reviews / ratings
- ❌ Search bar (chatbot bar replaces it; placeholder behavior = keyword filter)

### Behaviors deferred
- ❌ Real chatbot (placeholder: typed query → scripted reply for demo / keyword filter for casual interaction)
- ❌ Real auth (magic link is implicit; demo phone has the URL pre-loaded)
- ❌ Real-time sync (poll every 2 s for demo; production = Supabase Realtime)
- ❌ Saving / sharing Plans (ephemeral per CONTEXT.md)
- ❌ Multi-day plans (single afternoon for demo)
- ❌ Editing individual stops (use re-prompt pill)
- ❌ Multi-language UI toggle (English-primary for demo, Thai content rendered alongside)

### Visual polish deferred
- ❌ Custom map style (use Mapbox default light or OpenStreetMap)
- ❌ Photo upload pipeline (use static asset URLs)
- ❌ Loading skeletons (single-tenant demo, no real fetches)
- ❌ Empty states (no-results, no-network, etc.)
- ❌ Onboarding tour

---

## 9. Build order tonight

Recommended sequence — front-load the wow shots:

1. **Map screen (peek state)** — landing visible in 4 demo beats
2. **Chatbot result animation** — the headline wow; pre-render route polyline
3. **Owner edit screen** — second wow; small, fast to build
4. **Entry detail screen** — supports any pin tap; needed for video
5. **QR landing splash** — 30 min job, do last
6. **Filter chip behavior + bottom-sheet states** — interactive polish if time permits

Cross-reference `/docs/agents/issue-tracker.md` for how to break this into GitHub issues.
