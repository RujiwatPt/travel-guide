Problem Statement
Tourists who arrive in Thailand's secondary cities (เมืองรอง) — like Nakhon Phanom — face two distinct problems. First, the practical one: Google Maps coverage is sparse, opening hours are stale, and content is fragmented across blog posts, Facebook pages, and TripAdvisor. Second, and harder: even when they find a tourism app, it doesn't tell them what makes the city distinctive. A list of pins reads the same whether the tourist is in Bangkok, Chiang Mai, or Nakhon Phanom. The เมืองรอง concept disappears in the generic UI.

A third problem surfaced after v2 shipped: even with Themes + Signatures + cultural depth in the data, the visual presentation still looked hand-built and minimal. The hackathon judges will see other teams with polished Figma-derived designs. Our differentiator (cultural specificity, two-sided network) deserves a visual presentation that matches its substance.

Solution
A mobile web app, accessed via QR code stickers placed at hotels, the airport, and partner shops in Nakhon Phanom. The app drops the user onto a curated city map and answers two questions in the first 5 seconds: "what makes this city different?" (via the City Theme strip) and "what should I not miss?" (via Signature entries — gold-haloed pins).

v3 redesign: All 5 production screens adopt the visual language of the Figma community kit — pastel sky-cream-yellow gradients, heavy bold typography, generous rounded corners (28-36px), soft pastel cards with elevated shadows. The content and behavior stay our own (NKP entries, our chatbot logic, our domain model); only the visual presentation changes. The kit's 9 reference screens remain available at /figma-9-screens as a design-system exhibit and "future vision" route.

Beneath the visual layer:

A curated mix of Activity entries (locally-operated, live status) and Place entries (curated landmarks). 17 total: 8 birthday stupas, Mekong/Naga cluster, Vietnamese-Thai heritage cluster, 2 OTOP entries.
A chatbot with 2 canonical scripted queries: "I have one afternoon, I love food and history" (5-stop afternoon route) and "I was born on Sunday — what is my birthday temple?" (2-stop morning pilgrimage with cultural rationale).
Magic-link Owner edit — local shop owners receive a per-Entry token URL that opens directly to a quick-status edit screen. Tourist views update in sub-second via Zustand subscription.
User Stories
Tourist — entry & first impression
As a Tourist already in Nakhon Phanom, I want to scan a QR sticker and have the app open in my browser without installing anything, so that I can start exploring in seconds.
As a Tourist, I want a 1.5-second splash confirming I'm in Nakhon Phanom with a kit-styled gradient sky and bold marketing typography, so that the first impression feels designed, not minimal.
As a Tourist, I want the app to immediately tell me what is special about this city, so that the experience feels like discovering Nakhon Phanom — not browsing yet another generic travel app.
As a Tourist, I want to see 3-5 City Themes ("What is Nakhon Phanom?") at the top of the bottom sheet from the moment the map opens, so that the city's identity surfaces in the first 5 seconds.
As a Tourist, I want each Theme card to use the kit's elevated card pattern (pastel-tinted background gradients, generous corner radius, soft drop shadow), so that themes feel premium and tappable rather than flat.
Tourist — browsing the map (v3 visual updates)
As a Tourist, I want to see a kit-styled map screen — gradient sky overlay above the map, search-pill chatbot bar with the kit's .top-search styling — so that the entry feels polished from the first frame.
As a Tourist, I want pins to be color-coded by Live Status, with Signature pins (the iconic ones) lifted via a gold accent ring matching the kit's yellow accent.
As a Tourist, I want each card in the bottom sheet to use the kit's photo-card pattern (60×60 thumbnail, name + th, why-visit hook, trust-badge inline), so that the list reads like a magazine, not a CSV.
As a Tourist, I want the bottom sheet handle, status pills, and chip row to share the kit's visual vocabulary (rounded-22 backdrop-blur, yellow active states), so that everything in the sheet feels consistent.
Tourist — Theme-driven discovery
As a Tourist, I want to tap a Theme card and see the map filter to just that theme's entries, with a banner showing the active Theme, so that I can dive into a specific city-identity slice.
As a Tourist, I want the OTOP & Local Crafts theme to surface ผ้ามัดย้อม, mat-mi weaving, and civet coffee specifically, so that I learn what NKP is famous for making and selling.
Tourist — chip filters
As a Tourist, I want filter chips above the bottom sheet (🟢 Open now, 🍜 Food, 🐉 Iconic, 🌅 Sunset, etc.), so that I can narrow the map to my mood. Multi-select.
Tourist — chatbot wow
As a Tourist, I want to type a natural-language request into the chatbot at the top, so that I don't have to manually pick filters.
As a Tourist, I want the chatbot to return a kit-styled routed itinerary — Stops shown in elevated white cards with the kit's typography, gradient header per the "Plan A Trip" pattern — so that the AI plan presents as a polished travel artifact.
As a Tourist, I want the chatbot's route to draw on the map as a blue line connecting the Stops in order.
As a Tourist, I want a one-line rationale at the top of the Plan, so that I trust the AI considered real-world constraints.
Tourist — birthday-stupa cultural beat
As a Thai Tourist who knows the พระธาตุประจำวันเกิด tradition, I want to ask the chatbot which stupa matches my birth-day and receive a route honoring the cultural circuit.
As a Tourist (Thai or foreign), I want a chatbot reply that explains why Nakhon Phanom is special for birthday stupas, so that I learn cultural context, not just route logistics.
Tourist — entry detail (v3: kit Place Details Page pattern)
As a Tourist, I want to tap any pin or card to open the Entry Detail screen with the kit's "Place Details Page" pattern — full-bleed cover image with bottom-aligned dark overlay text, large typography for the place name + Thai subtitle, separate review/reactions section, and a CONTINUE-style CTA — so that the detail experience feels editorial.
As a Tourist viewing an Activity, I want to see "Updated 2h ago by Khun Somchai ✓" prominently, so that I trust the data is fresh.
As a Tourist viewing a Place, I want the trust badge to be hidden (because Places are curated), so that I don't see a meaningless "never updated" label.
Owner (v3: kit Plan A Trip form pattern)
As an Owner of an Activity, I want to receive a magic-link URL that opens directly to my edit screen with no login.
As an Owner, I want my edit screen to use the kit's "Plan A Trip" form pattern — gradient header, white-card sections, segmented controls, prominent bottom CTA — so that updating my venue feels like a designed product, not a data form.
As an Owner, I want a Live Status chip selector + note input + "Save & Notify Tourists" button, so that I can update in 5 seconds.
As an Owner managing multiple Activities, I want the same owner_id to govern all of them, with each Activity having its own magic-link edit token.
Live sync
As a Tourist, I want the tourist-facing view to reflect the Owner's most recent update within sub-second, so that I trust the data is genuinely live.
Hackathon judges (v3: visual polish requirements)
As a hackathon judge, I want a 4-minute English-narrated video with three clear wow moments — the QR-scan entry, the chatbot Plan choreography, and the Owner→Tourist live sync — that looks like a polished product thanks to the kit visual language adoption.
As a hackathon judge, I want one of the chatbot demos to feature culturally-specific intent (the birthday-stupa circuit), so that I see the app understands what makes Nakhon Phanom uniquely Thai.
As a hackathon judge, I want to see what makes this city different communicated visually within the first 5 seconds (via Themes), so that I understand the เมืองรอง wedge without needing the voiceover to explain it.
As a hackathon judge, I want a /figma-9-screens route showing the full kit as the "design system / future vision" exhibit, so that I see the team can scale the design language to features beyond MVP.
As a hackathon judge, I want a clear "future work" closing slide (real LLM, multi-city, real backend, OTOP marketplace, Profile/Booking/Trip Journal features previewed at /figma-9-screens), so that I understand the post-MVP roadmap.
Implementation Decisions
Domain model — unchanged from v2
/CONTEXT.md has the locked vocabulary (Entry, Activity, Place, Owner, Tourist, Plan, Stop, Live Status, City, Theme, Signature, tag dimensions, magic-link edit, two-sided network).

Data — unchanged from v2
17 entries, 4 Themes (Birthday-Stupa Pilgrimage / Mekong & Naga Lore / Vietnamese-Thai Heritage / OTOP & Local Crafts), Signature derivation via vibe_tags = 'iconic'. All in-memory in src/data/seed.ts.

Modules — unchanged from v2 (deep + tested)
isOpenNow, applyFilters, getPlan + dispatchPlan, isValidPlan, isSignature, distanceKm, relativeTime, theme + seed lookups, useAppStore mutations. 71 tests across 9 files, all preserved through the v3 redesign because the redesign changes UI only.
v3 redesign — visual language only
Decision: Adopt the kit's visual vocabulary across 5 production screens. Drop 4 orphan kit screens (Profile, Booking Hub, Notifications, Trip Journal) — they don't fit the product domain.

Screen mapping (kit → ours):

Our screen Kit blueprint Effort
Splash Refresh with kit's gradient sky pattern (already partial) ~15 min
Map (browse mode) Lifted from kit's "Home" + "Explore new Vibes" — gradient sky overlay, search-pill chatbot bar, photo-card list pattern ~1.5h
Entry Detail Kit's "Place Details Page" — closest 1:1 match in the whole kit (full-bleed cover + dark text overlay) ~45 min
Owner Edit Lifted from kit's "Plan A Trip" form — gradient header, white-card sections, segmented controls, bottom-fixed CTA ~1h
Chatbot Result Lifted from kit's "Plan A Trip" timeline + "Trip Journal" elevated card style ~1.5h
Total estimated: ~4-5 hours.

Design tokens
The kit's visual primitives lift into Tailwind config + a kit-tokens module:

Gradient palette: pastel sky-blue → cream → yellow (linear-gradient(135deg, #d7efff 0%, #fff7dd 46%, #ffd85b 100%) and variants)
Phone frame: 36px corner radius, soft elevated shadow
Card radius: 24-28px
Eyebrow text: small uppercase, letter-spacing 0.22em, font-weight 800
Headers: heavy black weight (font-weight 800-900)
Color palette: ink #061c22, muted #6b7188, blue-strong #1e8df0, yellow accent #ffc20d, cream #fff6dc, sky #88c7f4 (already in tailwind.config.js, extending where needed)
What stays (no behavior change)
Single entries table with type discriminator (ADR 0001)
Bottom sheet 3-state drag-snap primitive
Theme strip with 4 NKP themes
Filter chips with 11 ChipDef predicates
Magic-link /owner/edit?token=... routing
Zustand store + live-sync via subscription
6-second chatbot choreography (sheet snap → typewriter rationale → card cascade → polyline draw → numbered/glowing pins → fade non-route pins)
5-second owner→tourist sync
All 71 tests
What's explicitly not in the v3 redesign
The orphan kit screens (Profile / Booking Hub / Notifications / Trip Journal) — preserved at /figma-9-screens as design-system reference, NOT built as production screens.
Pixel-faithful reproduction of kit screens — we adopt the language, not the layout. Our screens stay responsive and behavior-preserving.
Image swap from the kit's 41 Japan-themed assets — those stay only in /figma-9-screens. Production screens use existing Unsplash placeholders for entry photos.
Japanese text translation — none of the kit text strings appear in production screens; they're only at /figma-9-screens as the design-vision exhibit.
Testing Decisions
A good test in this codebase tests external behavior, not implementation details. We test pure functions and contract shapes — not UI rendering.

Test count: 71 tests across 9 files — preserved unchanged through the v3 redesign because the redesign is purely visual.

Module Tests
isOpenNow 11
applyFilters 7
Plan shape contract 5
dispatchPlan keyword routing 7
relativeTime 6
distanceKm 4
isSignature 4
Theme helpers 7
Seed lookups 8
useAppStore.updateEntryStatus 8
Total 67 listed + 4 latent = 71
UI components (Map, Theme strip, Bottom sheet, Plan result choreography, Entry Detail, Owner Edit) are eyeball-verified — they don't merit unit tests because behavioral assertions on visual rendering couple tightly to implementation.

Discipline forward (v3)
Any new pure function gets a test FIRST (TDD). UI components stay eyeball-verified.
During the v3 redesign, if any new pure helper is extracted (e.g., a style-derivation function with branching logic, a layout helper), it gets TDD'd before being used.
Run the existing 71-test suite after each screen redesign to verify no regressions.
Out of Scope
Real LLM chatbot. MVP uses keyword dispatch.
Real authentication. Magic link is the entire auth surface.
Real-time backend. No Supabase deployment. In-memory + Zustand.
Cities other than Nakhon Phanom. Schema supports it; MVP doesn't.
Entry types beyond Activity / Place. No accommodation, bookings, OTOP marketplace transactions.
Theme curation UI. Themes are hardcoded.
Editing flows beyond Live Status. Weekly hours editor is a stub. No photo upload.
Tourist-side accounts. No login, no saved places, no plan history, no plan sharing.
Reviews, ratings, payments. Not in scope.
Multilingual UI toggle. English-primary; Thai content rendered alongside.
Push notifications. Not in scope.
First-class Signature column in schema. Derived from vibe_tags = 'iconic'.
The 4 orphan kit screens (Profile, Booking Hub, Notifications, Trip Journal) — they don't fit the product domain. Preserved at /figma-9-screens as design-vision reference only.
Pixel-faithful kit reproduction. v3 adopts the kit's visual language (gradients, typography, card shapes), not its absolute-positioned 375×812 layouts.
Japan content swap. No translation of Japanese strings or replacement of Japan-themed images. Both stay only at /figma-9-screens.
Further Notes
Deliverable is a video, not a deployment. Tonight's build target is a clickable web app screen-recorded into a 4-minute English-narrated video. Engineering reliability is traded against video polish.
Two non-negotiable wow shots in the video: the chatbot Plan choreography and the Owner→Tourist live sync. The Theme strip is a third wow shot worth featuring (~30 seconds in the video script). The kit-styled visual polish (v3) is the fourth differentiator vs. competing teams.
/figma-9-screens route is now a deliberate design-vision exhibit — judges who explore beyond the main app see all 9 kit screens as fully editable React/CSS layers. Demonstrates technical depth.
The QR sticker is a real production artifact. Print at least one for the video.
Time math for v3 redesign: ~4-5 hours of refactor + the existing video production (3-4h) + sleep (8h minimum) = ~16h on top of the v3 decision time. Tight but feasible.
Changelog
v3 (this revision)
DECISION: Adopt kit visual language across 5 production screens. Orphan 4 kit screens preserved only at /figma-9-screens.
Added: editable Figma export at /figma-9-screens (7,754 lines of layer data + 41 small image assets + asset-hash map)
Replaced: previous 9-PNG static reference with 9-React-layer editable reference
Added: design-tokens lift into Tailwind config (planned)
New user stories 5, 7, 8, 9, 14, 19, 23, 27, 30 specifically calling out the kit visual treatment
v2
Added Theme + Signature as core domain concepts (in CONTEXT.md, in code, in UI)
Added birthday-stupa chatbot beat (second canonical query)
Expanded seed from 6 → 17 entries
4 City Themes for NKP
Bottom sheet peek height bumped 110 → 240px
Signature pin gold-halo styling
TDD backfill: 25 → 71 tests
relativeTime extracted from 3 duplicated copies
New reference route /figma-9-screens
v1 (original)
10 vertical slices for the MVP build (Slice 1: scaffold, Slice 5: bottom sheet, Slice 7: owner edit, Slice 6: splash, Slice 3: status computation, Slice 9: filter engine, Slice 5: entry detail, Slice 6: chatbot wow, Slice 8: live sync, Slice 10: seed reconciliation)
6 entries, 1 chatbot canonical query
25 tests across 3 files
