# Regional Travel Guide AI — Hackathon PRD
# เอกสาร Product Requirements (PRD) สำหรับ Hackathon

## 0. Context Alignment / การจัดคำให้ตรงกับ CONTEXT

### English
This PRD follows `/CONTEXT.md` as canonical language:
- **Entry** is the umbrella entity.
- **Activity** is `type='activity'` (owner-managed, live status capable).
- **Place** is `type='place'` (curated, no owner updates).
- **City** is the product scope. MVP city is **Nakhon Phanom**.
- Food is normalized as `type='activity' + category='food'`.

### ภาษาไทย
เอกสารนี้ยึด `/CONTEXT.md` เป็นคำหลักมาตรฐาน:
- **Entry** คือหน่วยข้อมูลหลักบนแผนที่และการค้นหา
- **Activity** คือ `type='activity'` (มีเจ้าของดูแลและอัปเดตสถานะสด)
- **Place** คือ `type='place'` (ข้อมูล curated ไม่มีเจ้าของอัปเดตสด)
- **City** คือขอบเขตระบบ โดย MVP ใช้ **นครพนม**
- ข้อมูลอาหารต้อง normalize เป็น `type='activity' + category='food'`

---

## 1. Product Overview / ภาพรวมผลิตภัณฑ์

### English
Regional Travel Guide AI is a map-first assistant for one under-visited Thai city. It solves:
1. “I arrived and don’t know where to go.”
2. “I found places online but don’t trust opening hours.”

Core value:
- Clear city identity (not generic travel list)
- Practical decisions with reliability signals

### ภาษาไทย
Regional Travel Guide AI คือผู้ช่วยท่องเที่ยวแบบแผนที่สำหรับเมืองรอง 1 เมือง แก้ปัญหา:
1. “มาถึงแล้วไม่รู้จะไปไหนดี”
2. “เจอข้อมูลแล้วแต่ไม่มั่นใจเวลาเปิด-ปิด”

คุณค่าหลัก:
- สื่อเอกลักษณ์เมืองให้ชัด (ไม่ใช่ลิสต์ที่เที่ยวทั่วไป)
- ช่วยตัดสินใจจากข้อมูลที่มีสัญญาณความน่าเชื่อถือ

---

## 2. City Scope / ขอบเขตเมือง

### English
MVP supports exactly one city: **Nakhon Phanom (`nkp`)**.

Allowed future cities (not MVP):
- Nan, Phatthalung, Loei, Trat

Not in MVP:
- Bangkok, Chiang Mai, Phuket core zones, Pattaya

### ภาษาไทย
MVP รองรับเพียง 1 เมือง: **นครพนม (`nkp`)**

เมืองที่อาจขยายในอนาคต (ยังไม่ใช่ MVP):
- น่าน, พัทลุง, เลย, ตราด

ไม่นับใน MVP:
- กรุงเทพฯ, เชียงใหม่, โซนหลักภูเก็ต, พัทยา

---

## 3. Problem Statement / ปัญหาที่ต้องการแก้

### English
Tourists in secondary cities face:
1. Unclear “where to start”
2. Fragmented opening-hour/contact information
3. Weak city identity in generic map apps
4. Low confidence in what is verified vs uncertain

### ภาษาไทย
นักท่องเที่ยวในเมืองรองเจอปัญหา:
1. ไม่รู้จะเริ่มเที่ยวจากจุดไหน
2. เวลาเปิด-ปิดและช่องทางติดต่อกระจัดกระจาย
3. แอปทั่วไปไม่สื่อความเป็นเอกลักษณ์ของเมือง
4. ไม่รู้ว่าข้อมูลไหนยืนยันแล้วหรือยังไม่ชัด

---

## 4. Goals / เป้าหมาย

### English
- Deliver a demo-ready MVP within hackathon time
- Show city-specific discovery (Themes + Signatures)
- Enforce intent-correct search results
- Show opening-hour confidence and verification flow

### ภาษาไทย
- ส่งมอบ MVP ที่เดโมได้จริงในเวลาฮัคกาธอน
- แสดงการค้นหาแบบมีเอกลักษณ์เมือง (Themes + Signatures)
- บังคับให้ผลค้นหาตรงเจตนาผู้ใช้
- แสดงระดับความเชื่อมั่นเวลาเปิด-ปิดและ flow การตรวจสอบ

---

## 5. Target Users / กลุ่มผู้ใช้เป้าหมาย

### English
- First-time visitors already in Nakhon Phanom
- Weekend travelers needing fast decisions
- Users who value practical reliability over marketing fluff

### ภาษาไทย
- ผู้มาเที่ยวนครพนมครั้งแรก (อยู่ในพื้นที่แล้ว)
- นักท่องเที่ยวทริปสั้นที่ต้องตัดสินใจเร็ว
- ผู้ใช้ที่เน้นข้อมูลใช้งานจริงมากกว่าคอนเทนต์โฆษณา

---

## 6. Product Experience Direction (from Devlog) / ทิศทางประสบการณ์ผลิตภัณฑ์ (จาก Devlog)

### English
The experience must answer in first 5 seconds:
1. What makes this city different?
2. What should I not miss?

Required UX ideas:
- Theme strip for city identity
- Signature entries (iconic highlights)
- Map-first interaction with quick filter chips
- Concept FE can be design-heavy, but behavior must stay domain-correct

### ภาษาไทย
ประสบการณ์ใช้งานต้องตอบให้ได้ใน 5 วินาทีแรก:
1. เมืองนี้ต่างจากเมืองอื่นอย่างไร
2. อะไรคือสิ่งที่ห้ามพลาด

แนวทาง UX ที่ต้องมี:
- Theme strip เพื่อเล่าเอกลักษณ์เมือง
- Signature entries สำหรับจุดเด่นสำคัญ
- แผนที่เป็นศูนย์กลาง พร้อม chip กรองเร็ว
- ฝั่ง FE เป็น concept ได้ แต่พฤติกรรมต้องถูกต้องตามโดเมน

---

## 7. MVP Scope (Hackathon) / ขอบเขต MVP สำหรับ Hackathon

### English
P0 In scope:
1. City map + 20–40 curated entries
2. Entry detail with open/close + confidence + source notes
3. Intent-based search (`activity_only|food_only|place_only|mixed`)
4. Open-now / closing-soon / uncertain filters
5. AI verify-hours endpoint with strict JSON
6. Verification log retrieval

Out of scope:
- Multi-city
- Full itinerary persistence
- Real-time web crawling
- Full auth/account system

### ภาษาไทย
P0 ที่อยู่ในขอบเขต:
1. แผนที่เมือง + entries curated จำนวน 20–40 จุด
2. หน้า Entry detail ที่มีเวลาเปิด-ปิด + confidence + source notes
3. ค้นหาตามเจตนา (`activity_only|food_only|place_only|mixed`)
4. ตัวกรอง open-now / closing-soon / uncertain
5. endpoint `verify-hours` ที่คืน JSON ตามสัญญา
6. endpoint ดู verification logs

นอกขอบเขต:
- หลายเมือง
- บันทึก itinerary แบบถาวร
- ดึงข้อมูลเว็บสดแบบ real-time
- ระบบบัญชีผู้ใช้เต็มรูปแบบ

---

## 8. Functional Requirements / ความต้องการเชิงฟังก์ชัน

### English
1. System must use `Entry` model with `type='activity'|'place'`.
2. Food must be `activity + category='food'`.
3. System must run intent classification before retrieval.
4. System must enforce scope gates before ranking.
5. System must return strict typed JSON for all APIs.
6. System must provide status chips: `open_now|closing_soon|closed|unknown`.
7. System must persist verification logs.

### ภาษาไทย
1. ระบบต้องใช้โมเดล `Entry` โดย `type='activity'|'place'`
2. ข้อมูลอาหารต้องเป็น `activity + category='food'`
3. ระบบต้องจำแนก intent ก่อนทำ retrieval
4. ระบบต้องบังคับกฎ scope ก่อนทำ ranking
5. ทุก API ต้องคืนค่า JSON ตามสัญญาแบบชัดเจน
6. ต้องแสดงสถานะ `open_now|closing_soon|closed|unknown`
7. ต้องบันทึก verification logs ได้

---

## 9. Opening-Hour Reliability Model / โมเดลความน่าเชื่อถือเวลาเปิด-ปิด

### English
Required fields per entry:
- `opening_hours_text`
- `hours_confidence` (`high|medium|low|unknown`)
- `hours_source_type` (`official|facebook|map_listing|community|unknown`)
- `hours_last_checked_at`

Confidence policy:
- High: official and recent
- Medium: indirect or older
- Low/Unknown: conflicting or missing

### ภาษาไทย
ฟิลด์ที่ต้องมีต่อ entry:
- `opening_hours_text`
- `hours_confidence` (`high|medium|low|unknown`)
- `hours_source_type` (`official|facebook|map_listing|community|unknown`)
- `hours_last_checked_at`

นโยบายความเชื่อมั่น:
- High: แหล่งทางการและอัปเดตใหม่
- Medium: แหล่งรองหรือข้อมูลเก่ากว่า
- Low/Unknown: ข้อมูลขัดแย้งหรือไม่มีข้อมูล

---

## 10. Intent Pipeline (Mandatory) / ท่อประมวลผลเจตนา (บังคับ)

### English
Pipeline order:
1. Intent Gate (rule-based deterministic first)
2. Scoped Retrieval
3. Post-retrieval Grading + Rejection

Intent Gate output:
- `detected_intent`
- `intent_confidence`
- `entity_scope`
- `hard_filters`
- `reason`

Critical rule:
- Activity-first query must exclude food-category activities unless explicitly requested.

### ภาษาไทย
ลำดับ pipeline:
1. Intent Gate (เริ่มจากกฎ deterministic)
2. Scoped Retrieval
3. Post-retrieval Grading + Rejection

ผลลัพธ์จาก Intent Gate:
- `detected_intent`
- `intent_confidence`
- `entity_scope`
- `hard_filters`
- `reason`

กฎสำคัญ:
- คำถามสายกิจกรรมต้องไม่หลุดผลหมวดอาหาร ยกเว้นผู้ใช้ระบุอาหารโดยตรง

---

## 11. Ranking Logic / ตรรกะการจัดอันดับ

### English
Deterministic scoring (fast demo path):
- 0.40 intent match
- 0.20 open status
- 0.15 hours confidence
- 0.15 distance
- 0.10 default priority

Return both:
- `results[]`
- `excluded_candidates[]` with `reject_reason`

### ภาษาไทย
คะแนนแบบ deterministic (เหมาะกับเดโม):
- 0.40 intent match
- 0.20 open status
- 0.15 hours confidence
- 0.15 distance
- 0.10 default priority

ต้องคืนทั้ง:
- `results[]`
- `excluded_candidates[]` พร้อม `reject_reason`

---

## 12. API Contract / สัญญา API

### English
Canonical endpoints:
1. `GET /api/v1/entries?city=&open_status=&category=&limit=`
2. `GET /api/v1/entries/{id}`
3. `GET /api/v1/search-intent?city=&q=&open_now_only=&top_k=`
4. `POST /api/v1/ai/verify-hours`
5. `GET /api/v1/verification-logs/{entry_id}`
6. `GET /health`
7. `GET /ready`

Backward-compatible aliases:
- `GET /api/v1/places`
- `GET /api/v1/places/{id}`

### ภาษาไทย
endpoint มาตรฐาน:
1. `GET /api/v1/entries?city=&open_status=&category=&limit=`
2. `GET /api/v1/entries/{id}`
3. `GET /api/v1/search-intent?city=&q=&open_now_only=&top_k=`
4. `POST /api/v1/ai/verify-hours`
5. `GET /api/v1/verification-logs/{entry_id}`
6. `GET /health`
7. `GET /ready`

alias เพื่อรองรับระบบเดิม:
- `GET /api/v1/places`
- `GET /api/v1/places/{id}`

---

## 13. Data Model (Backend MVP) / โครงสร้างข้อมูล (Backend MVP)

### English
Core entities:
- `entries`
- `verification_logs`
- `transport_hints`

`entries` required fields:
- `id`, `legacy_code`, `type`, `category`, `city_id`
- `name_th`, `name_en`, `lat`, `lng`
- `intent_tags`, `search_text_blob`, `default_priority`
- opening-hour reliability fields (Section 9)

### ภาษาไทย
เอนทิตีหลัก:
- `entries`
- `verification_logs`
- `transport_hints`

ฟิลด์ที่จำเป็นใน `entries`:
- `id`, `legacy_code`, `type`, `category`, `city_id`
- `name_th`, `name_en`, `lat`, `lng`
- `intent_tags`, `search_text_blob`, `default_priority`
- ฟิลด์ความน่าเชื่อถือเวลาเปิด-ปิด (Section 9)

---

## 14. FastAPI Architecture / สถาปัตยกรรม FastAPI

### English
Reliability-first implementation:
- Request validation by Pydantic
- In-memory seed for entries
- SQLite (or Postgres) for verification logs
- Optional LLM grader with strict timeout and fallback

Suggested structure:
- `routers/entries.py`, `routers/search.py`, `routers/ai.py`, `routers/logs.py`
- `services/intent_gate.py`, `services/retrieval.py`, `services/status_engine.py`
- `repositories/entry_repo.py`, `repositories/log_repo.py`

### ภาษาไทย
แนวทางที่เน้นความเสถียร:
- ตรวจ schema ด้วย Pydantic
- ใช้ seed ใน memory สำหรับ entries
- ใช้ SQLite (หรือ Postgres) สำหรับ verification logs
- LLM เป็นตัวช่วยเสริมและต้องมี timeout + fallback

โครงสร้างที่แนะนำ:
- `routers/entries.py`, `routers/search.py`, `routers/ai.py`, `routers/logs.py`
- `services/intent_gate.py`, `services/retrieval.py`, `services/status_engine.py`
- `repositories/entry_repo.py`, `repositories/log_repo.py`

---

## 15. Demo Reliability Rules / กฎความเสถียรสำหรับเดโม

### English
Non-negotiable:
1. Deterministic path works offline
2. LLM failure must not fail endpoint
3. Strict JSON response always
4. Scope enforcement before ranking always

### ภาษาไทย
ข้อบังคับที่ต้องทำ:
1. เส้นทาง deterministic ต้องทำงานได้แม้ไม่พึ่งเน็ต
2. LLM ล้มเหลวแล้ว endpoint ต้องยังตอบได้
3. ต้องคืน JSON ตามสัญญาเสมอ
4. ต้องบังคับ scope ก่อนทำ ranking ทุกครั้ง

---

## 16. Delivery Timeline (12–18h) / ไทม์ไลน์ส่งมอบ (12–18 ชั่วโมง)

### English
- Phase A (2h): scaffold + schemas + health + seed loader
- Phase B (4h): intent gate + scoped retrieval + search endpoint
- Phase C (2h): entries endpoints + aliases
- Phase D (3h): verify-hours + log persistence
- Phase E (3–7h): tests + hardening + demo prep

### ภาษาไทย
- Phase A (2 ชม.): ตั้งโครง backend + schema + health + seed loader
- Phase B (4 ชม.): intent gate + scoped retrieval + endpoint ค้นหา
- Phase C (2 ชม.): endpoints entries + aliases
- Phase D (3 ชม.): verify-hours + บันทึก logs
- Phase E (3–7 ชม.): ทดสอบ + hardening + เตรียมเดโม

---

## 17. Test Plan / แผนทดสอบ

### English
Contract tests:
- All endpoints schema-valid
- Required fields always present

Golden queries:
- `อยากไปเที่ยวน้ำตก` -> no food leakage
- `อยากไปทำบุญที่วัด` -> temple-focused
- `อยากไหว้พระแล้วหาร้านกินต่อ` -> mixed works
- `ของกินเวียดนาม` -> food-only scope
- `พาแม่ไปแบบไม่เดินเยอะ` -> low-effort oriented

Failure tests:
- unknown city => 4xx
- missing query => 422
- LLM timeout => deterministic success

### ภาษาไทย
Contract tests:
- ทุก endpoint ต้องผ่าน schema
- ฟิลด์ที่บังคับต้องมีครบ

Golden queries:
- `อยากไปเที่ยวน้ำตก` -> ต้องไม่หลุดผลอาหาร
- `อยากไปทำบุญที่วัด` -> เน้นผลวัด
- `อยากไหว้พระแล้วหาร้านกินต่อ` -> mixed ต้องทำงาน
- `ของกินเวียดนาม` -> food-only ตาม scope
- `พาแม่ไปแบบไม่เดินเยอะ` -> เน้นตัวเลือก low-effort

Failure tests:
- city ไม่ถูกต้อง => 4xx
- query หาย => 422
- LLM timeout => ยังต้องตอบ deterministic ได้

---

## 18. Demo Script (4 Minutes) / สคริปต์เดโม (4 นาที)

### English
1. Show city identity quickly (theme strip + signature entries)
2. Run activity-first query and show food exclusion behavior
3. Run mixed-intent query and show valid mixed results
4. Open entry detail and show confidence/source metadata
5. Trigger verify-hours and retrieve verification log
6. (Optional) show owner status update flow and live reflection

### ภาษาไทย
1. เปิดด้วยเอกลักษณ์เมืองทันที (theme strip + signature entries)
2. ยิงคำถามสายกิจกรรมและแสดงการกันผลอาหาร
3. ยิงคำถาม mixed intent และแสดงผลผสมที่ถูกต้อง
4. เปิด entry detail แล้วชี้ confidence/source metadata
5. เรียก verify-hours และดึง verification log
6. (ถ้ามีเวลา) แสดง owner update แล้วฝั่งผู้ใช้สะท้อนผลทันที

---

## 19. Success Criteria / เกณฑ์ความสำเร็จ

### English
MVP is successful when:
1. User gets 3–5 relevant entries within 30 seconds
2. Intent-scope errors are visibly prevented
3. Every shown entry has open/close confidence signal
4. API remains stable under demo conditions

### ภาษาไทย
MVP ถือว่าสำเร็จเมื่อ:
1. ผู้ใช้ได้รายการที่เกี่ยวข้อง 3–5 จุดภายใน 30 วินาที
2. ระบบป้องกันผลค้นหาผิดเจตนาได้ชัดเจน
3. ทุก entry ที่แสดงมีสัญญาณความเชื่อมั่นเวลาเปิด-ปิด
4. API เสถียรตลอดสถานการณ์เดโม

---

## 20. Risks and Mitigations / ความเสี่ยงและแนวทางลดความเสี่ยง

### English
1. Data incompleteness
- Mitigation: freeze curated seed + mark unknown confidence

2. LLM instability
- Mitigation: deterministic-first + 3s timeout + fallback

3. Demo latency spikes
- Mitigation: warm endpoints + preloaded seed in memory

4. Scope creep
- Mitigation: lock P0 APIs and cut non-essential features

### ภาษาไทย
1. ข้อมูลไม่ครบ
- วิธีลดความเสี่ยง: ใช้ seed ที่ curated แล้วและติดป้าย confidence ชัดเจน

2. LLM ไม่เสถียร
- วิธีลดความเสี่ยง: deterministic-first + timeout 3 วินาที + fallback

3. latency ช่วงเดโม
- วิธีลดความเสี่ยง: warm endpoints ล่วงหน้า + preload seed ใน memory

4. scope บานปลาย
- วิธีลดความเสี่ยง: ล็อก P0 APIs และตัดฟีเจอร์ที่ไม่จำเป็น
