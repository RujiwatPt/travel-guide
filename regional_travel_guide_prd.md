# Regional Travel Guide AI — Hackathon PRD
# เอกสาร Product Requirements (PRD) สำหรับ Hackathon

## 0. Context Alignment (Canonical Terms) / การจัดคำให้ตรงกับ CONTEXT

This PRD follows `/CONTEXT.md` as canonical language:
- Use **Entry** as umbrella entity on map/search.
- Use **Activity** for owner-managed/commercial entries (`type='activity'`).
- Use **Place** for curated landmark/public entries (`type='place'`).
- Use **City** for deployment scope. MVP city is **Nakhon Phanom**.
- Storage normalization: food is `type='activity'` + `category='food'` (not a separate entity type).

## 1. Product Overview / ภาพรวมผลิตภัณฑ์

### English
Regional Travel Guide AI is a map-first travel assistant for one **unpopular/under-visited city** in Thailand (not Bangkok, not Chiang Mai). The product solves a specific traveler pain point:

- “I arrived in this city and have no idea where to go.”
- “I found places online but I do not trust opening/closing times.”

Core value:
- Help users discover where to go in an unfamiliar city.
- Reduce failed trips caused by wrong opening hours or closed landmarks.

### ภาษาไทย
Regional Travel Guide AI คือผู้ช่วยท่องเที่ยวแบบแผนที่สำหรับ **1 พื้นที่ที่ไม่ใช่เมืองยอดนิยม** ในประเทศไทย (ไม่ใช่กรุงเทพฯ และเชียงใหม่) โดยแก้ pain point หลัก:

- “มาถึงแล้วไม่รู้จะไปที่ไหน”
- “หาข้อมูลเจอแต่ไม่มั่นใจว่าเวลาเปิด-ปิดจริงหรือไม่”

คุณค่าหลัก:
- ช่วยแนะนำว่าควรไปที่ไหนในพื้นที่ที่ไม่คุ้นเคย
- ลดการเสียเที่ยวจากข้อมูลเวลาเปิด-ปิดที่ผิด

---

## 2. City Scope (Mandatory) / ขอบเขตเมือง (บังคับ)

### English
MVP must target exactly one under-visited city.

Allowed example cities/scopes:
- Nan Old Town & nearby districts
- Phatthalung (Thale Noi + local town landmarks)
- Nakhon Phanom riverside zone
- Loei (Chiang Khan + nearby local spots)
- Trat old community areas (non-island focus)

Not allowed for this MVP:
- Bangkok
- Chiang Mai
- Phuket central tourist zones
- Pattaya

### ภาษาไทย
MVP ต้องเลือกพื้นที่ที่ไม่แมสเพียง 1 พื้นที่เท่านั้น

ตัวอย่างที่เลือกได้:
- เมืองน่านและอำเภอใกล้เคียง
- พัทลุง (ทะเลน้อย + จุดเที่ยวในเมือง)
- โซนริมโขงนครพนม
- เลย (เชียงคาน + จุดท้องถิ่นใกล้เคียง)
- ย่านเมืองเก่าตราด (ไม่เน้นเกาะ)

พื้นที่ที่ไม่อยู่ใน scope:
- กรุงเทพฯ
- เชียงใหม่
- โซนท่องเที่ยวหลักภูเก็ต
- พัทยา

---

## 3. Problem Statement / ปัญหาที่ต้องการแก้

### English
For unpopular cities, travelers face:
1. No clear “starter list” of places worth visiting
2. Landmark/shop opening hours are inconsistent across sources
3. Some places only communicate via Facebook posts
4. Transport details are fragmented
5. Users cannot tell which info is verified vs uncertain

### ภาษาไทย
สำหรับพื้นที่ที่ไม่ดัง นักท่องเที่ยวเจอปัญหา:
1. ไม่มีลิสต์เริ่มต้นว่าควรไปที่ไหน
2. เวลาเปิด-ปิดของสถานที่ไม่ตรงกันหลายแหล่ง
3. หลายร้านอัปเดตผ่าน Facebook เป็นหลัก
4. ข้อมูลการเดินทางกระจัดกระจาย
5. ไม่รู้ว่าข้อมูลไหนยืนยันแล้วหรือยังไม่ชัวร์

---

## 4. Goals / เป้าหมาย

### English
- Deliver a demo-ready MVP within 1-day hackathon
- Recommend where to go for first-time visitors in a non-popular city
- Show opening/closing time reliability clearly for each place
- Allow AI-assisted verification when hours are uncertain

### ภาษาไทย
- สร้าง MVP ที่เดโมได้จริงภายใน hackathon 1 วัน
- ช่วยแนะนำจุดเที่ยวสำหรับคนมาแรกครั้งในพื้นที่ไม่แมส
- แสดงความน่าเชื่อถือของเวลาเปิด-ปิดรายสถานที่อย่างชัดเจน
- ให้ AI ช่วยตรวจสอบข้อมูลเมื่อเวลายังไม่ชัวร์

---

## 5. Target Users / กลุ่มผู้ใช้เป้าหมาย

### English
- First-time domestic/international travelers to under-visited Thai cities
- Weekend travelers who need quick “where to go now” guidance
- Users who prioritize practical reliability over marketing content

### ภาษาไทย
- นักท่องเที่ยวไทย/ต่างชาติที่มาเที่ยวพื้นที่รองครั้งแรก
- นักท่องเที่ยวทริปสั้นที่ต้องการคำตอบเร็วว่า “ตอนนี้ไปไหนได้บ้าง”
- ผู้ใช้ที่เน้นข้อมูลเชื่อถือได้มากกว่าคอนเทนต์รีวิว

---

## 6. MVP Scope (Hackathon) / ขอบเขต MVP สำหรับ Hackathon

### In Scope (P0)
1. City Map + curated entry pins (20–40 entries max)
2. Entry detail with opening/closing time, last-verified timestamp, confidence badge
3. “Where should I go?” smart recommendations (rule-based + AI summary)
4. Open-now / opening-soon / uncertain filters
5. Intent-based activity search (for example: `อยากไปเที่ยวน้ำตก`, `อยากไปทำบุญที่วัด`)
6. AI Verify action per entry (structured result + source summary)
7. Lightweight transport hints for each entry

### Out of Scope (for hackathon)
- Multi-city support
- Full itinerary planner
- User accounts and social features
- Real-time traffic integration

---

## 7. Core User Stories / User Stories หลัก

### English
1. As a first-time traveler, I can see a short list of recommended places so I know where to start.
2. As a traveler, I can see opening/closing time and confidence before deciding to go.
3. As a traveler, I can filter places that are open now.
4. As a traveler, I can search by intent/activity in natural Thai language.
5. As a traveler, I can trigger AI verification when hours are uncertain.
6. As a traveler, I can see why a place is recommended (culture, food, view, local uniqueness).

### ภาษาไทย
1. ในฐานะนักท่องเที่ยวครั้งแรก ฉันเห็นลิสต์สถานที่แนะนำสั้นๆ เพื่อเริ่มทริปได้ทันที
2. ในฐานะนักท่องเที่ยว ฉันเห็นเวลาเปิด-ปิดและระดับความมั่นใจก่อนออกเดินทาง
3. ในฐานะนักท่องเที่ยว ฉันกรองเฉพาะสถานที่ที่เปิดตอนนี้ได้
4. ในฐานะนักท่องเที่ยว ฉันพิมพ์ความต้องการแบบภาษาคนได้ เช่น “อยากไปเที่ยวน้ำตก”
5. ในฐานะนักท่องเที่ยว ฉันกดให้ AI ช่วยตรวจสอบเมื่อข้อมูลยังไม่ชัวร์ได้
6. ในฐานะนักท่องเที่ยว ฉันเห็นเหตุผลว่าทำไมสถานที่นี้ถึงถูกแนะนำ

---

## 8. Functional Requirements / ความต้องการเชิงฟังก์ชัน

1. System must support one selected under-visited city only.
2. System must display entries on map with status chips:
   - `open_now`
   - `closing_soon`
   - `closed`
   - `unknown`
3. System must show per-entry fields:
   - opening_hours_text
   - open_close_rules (structured)
   - timezone
   - last_verified_at
   - verification_confidence
4. System must provide “Where to go now” ranked list (top 5).
5. System must support AI verification endpoint returning strict JSON.
6. System must store verification logs and evidence summary.
7. System must allow filtering by open status, category, and budget.
8. System must support intent/activity search from Thai natural language query.
9. System must map query intent to structured tags/categories and return ranked entities.
10. System must run intent classification and entity-scope gating before retrieval/reranking.
11. System must support CONTEXT-compatible typing: `type='activity'|'place'`, where food is `type='activity'` + `category='food'`.

---

## 9. Opening Hours Reliability Model / โมเดลความน่าเชื่อถือเวลาเปิด-ปิด

### Required fields
- `hours_source_type`: official | facebook | map_listing | community | unknown
- `hours_last_checked_at`
- `hours_confidence`: high | medium | low
- `hours_note`

### Confidence logic (MVP)
- High: official source updated within 30 days
- Medium: indirect source or update older than 30 days
- Low: conflicting or missing source

### UI rules
- Show confidence badge beside opening hours
- If low confidence, show warning: “Hours may be outdated. Verify before travel.”
- If unknown, place appears in “Uncertain” filter group

---

## 10. Recommendation Logic (Where To Go) / ตรรกะแนะนำสถานที่

### MVP ranking signals
- Open status now (highest weight)
- Confidence of opening hours
- Distance from current center
- Category diversity (avoid top-5 all temples)
- Local uniqueness tag (`hidden_gem`, `local_food`, `culture`, `nature`)

### Output requirement
For each recommendation, show:
- why_recommended (1 sentence)
- open status + closing time (if known)
- confidence

---

## 10.1 Intent-Based Activity Search / ค้นหาแบบเจตนาและกิจกรรม

### Example user queries
- `อยากไปเที่ยวน้ำตก`
- `อยากไปทำบุญที่วัด`
- `อยากหาที่เดินชิลริมแม่น้ำ`
- `อยากหาคาเฟ่ท้องถิ่นเปิดเช้า`

### MVP intent mapping
- `เที่ยวน้ำตก` -> tags: `waterfall`, `nature`, category: `landmark_nature`
- `ทำบุญที่วัด` -> tags: `temple`, `merit`, category: `landmark_culture`
- `เดินชิล` -> tags: `walkable`, `scenic`, category: `community_area`
- `คาเฟ่เปิดเช้า` -> tags: `cafe`, `open_early`, category: `food_drink`

### Ranking for intent results
1. Intent/tag match score
2. Open status now
3. Opening-hours confidence
4. Distance
5. Local uniqueness

### Retrieval pipeline (mandatory)
1. Intent Gate (Rule-based + LLM grading)
2. Scoped Retrieval (RAG only on allowed entity set)
3. Post-retrieval grading and rejection

### Intent Gate output contract
- `detected_intent`
- `intent_confidence` (`high|medium|low`)
- `entity_scope` (`activity_only|food_only|place_only|mixed`)
- `hard_filters` (example: `open_now_only`, `low_effort`)
- `reason`

### Scoped Retrieval rules
- If query is activity-first (example: `อยากไปเที่ยวน้ำตก`, `อยากไปไหว้พระ`, `อยากไปเดินชมวิว`) set `entity_scope=activity_only` by default.
- Do not return food-category activities when `entity_scope=activity_only` unless user explicitly asks for food/cafe.
- If query contains mixed intent (example: `อยากไหว้พระแล้วหาร้านกินต่อ`) set `entity_scope=mixed`.

### Post-retrieval grading rules
- Reject candidate if `entity_type` is outside `entity_scope`.
- Reject candidate if `intent_match_score` below threshold.
- Include `reject_reason` in debug logs.

### Output requirement
- `matched_intent`
- `matched_tags`
- `why_matched` (1 sentence)
- `entity_type` (`activity|place`)
- `category` (example: `food`, `temple`, `nature`)
- `open_status`
- `hours_confidence`

---

## 11. Data Model (Simplified) / โครงสร้างข้อมูลแบบย่อ

### entries
- id (UUID)
- type (`activity|place`)
- name
- category
- city
- latitude
- longitude
- description
- opening_hours_text
- open_close_rules_json
- timezone
- hours_source_type
- hours_last_checked_at
- hours_confidence
- hours_note
- recommended_duration_minutes
- price_level
- tags[]
- activity_intents[] (example: `waterfall_trip`, `temple_merit`, `local_food_walk`)

### discovery_entities (for intent search result pool)
- id (UUID)
- legacy_code (example: `NP-ACT-001`, `NP-FOOD-034`)
- entity_type (`activity|place`)
- name_th
- name_en
- name
- category
- city
- tags[]
- activity_intents[]
- route_cluster
- default_priority
- data_confidence
- search_text_blob
- hours_confidence

### verification_logs
- id (UUID)
- entry_id (UUID)
- checked_at
- computed_open_status
- confidence
- source_summary
- raw_json

### transport_hints
- id (UUID)
- entry_id (UUID)
- access_note
- nearest_stop
- walking_minutes
- caution_note

---

## 12. API (Hackathon Contract) / สัญญา API สำหรับ Hackathon

1. `GET /api/v1/entries?city=&open_status=&category=`
2. `GET /api/v1/entries/{id}`
3. `GET /api/v1/recommendations?city=&top_k=5`
4. `GET /api/v1/search-intent?city=&q=&open_now_only=&top_k=10`
5. `POST /api/v1/ai/verify-hours`
6. `GET /api/v1/verification-logs/{entry_id}`

Backward-compatible alias:
- `GET /api/v1/places` -> alias of `GET /api/v1/entries`
- `GET /api/v1/places/{id}` -> alias of `GET /api/v1/entries/{id}`

### Intent search response (example)
```json
{
  "query": "อยากไปทำบุญที่วัด",
  "matched_intent": "temple_merit",
  "intent_confidence": "high",
  "entity_scope": "activity_only",
  "results": [
    {
      "entity_id": "550e8400-e29b-41d4-a716-446655440000",
      "legacy_code": "NP-ACT-001",
      "entity_type": "activity",
      "category": "temple",
      "name": "Wat ...",
      "matched_tags": ["temple", "merit"],
      "why_matched": "ตรงกับเจตนาไปทำบุญและเปิดอยู่ช่วงเช้า",
      "open_status": "open_now",
      "hours_confidence": "medium"
    }
  ],
  "excluded_candidates": [
    {
      "legacy_code": "NP-FOOD-034",
      "reject_reason": "food_category_not_allowed_for_activity_only_scope"
    }
  ]
}
```

### Mixed-intent response example
```json
{
  "query": "อยากไหว้พระแล้วหาร้านกินต่อ",
  "matched_intent": "temple_then_food",
  "intent_confidence": "medium",
  "entity_scope": "mixed",
  "results": [
    {
      "entity_id": "550e8400-e29b-41d4-a716-446655440000",
      "legacy_code": "NP-ACT-001",
      "entity_type": "activity",
      "category": "temple",
      "name": "Wat ...",
      "open_status": "open_now",
      "hours_confidence": "medium"
    },
    {
      "entity_id": "550e8400-e29b-41d4-a716-446655440001",
      "legacy_code": "NP-FOOD-034",
      "entity_type": "activity",
      "category": "food",
      "name": "ร้านปากหม้อ...",
      "open_status": "open_now",
      "hours_confidence": "low"
    }
  ]
}
```

### Verify request (example)
```json
{
  "entry_id": "uuid",
  "name": "Wat ...",
  "city": "Nakhon Phanom",
  "existing_hours": "08:00-17:00",
  "existing_source_type": "map_listing"
}
```

### Verify response (strict JSON)
```json
{
  "entry_id": "uuid",
  "computed_open_status": "open_now|closing_soon|closed|unknown",
  "opening_hours_text": "08:00-17:00",
  "confidence": "high|medium|low",
  "hours_source_type": "official|facebook|map_listing|community|unknown",
  "needs_manual_check": true,
  "source_summary": "...",
  "reason": "..."
}
```

---

## 13. Hackathon Delivery Plan (1 Day) / แผนส่งมอบใน 1 วัน

### Timeline
1. Hour 1–2: pick city scope, seed 20–40 entries, define categories
2. Hour 3–4: build places API + map UI + place detail
3. Hour 5–6: add open-status computation + filters + recommendation endpoint
4. Hour 7: add intent-search endpoint + Thai intent mapping table
5. Hour 8: integrate AI verify-hours endpoint + logs and polish

### Team split (if 3 people)
1. Frontend: map, filters, detail UI, badges
2. Backend: APIs, open-status logic, intent-search logic, data model
3. AI/Data: verification prompt, intent dictionary, seed data curation, demo script

---

## 14. Demo Script (2 Minutes) / สคริปต์เดโม 2 นาที

1. Open app in selected under-visited city
2. Show “Where to go now” top 5
3. Click one landmark and inspect opening/closing time + confidence
4. Apply `open_now` filter
5. Search with intent query: `อยากไปเที่ยวน้ำตก`
6. Pick low-confidence place and run “Verify Hours with AI”
7. Show updated verification result and source summary

---

## 15. Success Criteria / เกณฑ์ความสำเร็จ

MVP is successful when:
1. Users can find 3–5 suitable places in under 30 seconds
2. Every displayed place shows opening-hour confidence label
3. AI verification returns valid structured JSON in under 8 seconds (demo target)
4. Demo completes end-to-end in under 2 minutes
5. Scope clearly avoids popular-city positioning

---

## 16. Risks & Mitigations / ความเสี่ยงและวิธีลดความเสี่ยง

1. Incomplete data for unpopular city
   - Mitigation: preload curated seed dataset and confidence labels
2. AI hallucination on hours
   - Mitigation: strict JSON schema + “unknown” fallback + no-guess rule
3. Time overrun in hackathon
   - Mitigation: lock P0 scope early, skip checklist/itinerary features
4. API latency during demo
   - Mitigation: cache seeded responses and keep one-click retry

---

## 17. Product Positioning / การวางตำแหน่งผลิตภัณฑ์

### English
Position as:
**AI-Assisted Local Discovery + Opening-Hours Reliability for Under-Visited Regions**

Pitch:
“Instead of showing generic tourist spots, we help travelers discover where to go in overlooked cities and avoid wasted trips with clearer opening-time confidence.”

### ภาษาไทย
วางตำแหน่งเป็น:
**ผู้ช่วยค้นหาจุดเที่ยวท้องถิ่น + ตรวจความน่าเชื่อถือเวลาเปิด-ปิด สำหรับพื้นที่ที่คนยังไปไม่เยอะ**

Pitch:
“เราไม่ได้แค่แนะนำที่เที่ยวทั่วไป แต่ช่วยให้ผู้ใช้รู้ว่าจะไปไหนในพื้นที่รอง และลดการเสียเที่ยวด้วยข้อมูลเวลาเปิด-ปิดที่มีระดับความมั่นใจชัดเจน”
