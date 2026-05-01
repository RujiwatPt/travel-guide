# Nakhon Phanom Activity Database Seed v0.1

**Created:** 2026-05-01  
**Purpose:** ฐานข้อมูลตั้งต้นสำหรับ Web app แบบ intent-based search/ranking ที่ค้นหา “Activity” ในจังหวัดนครพนม ไม่ใช่แค่ค้นหาชื่อสถานที่

> ใช้เป็น seed database สำหรับ MVP ก่อนขึ้น production ควรตรวจสอบพิกัด เวลาเปิด-ปิด เบอร์โทร ค่าใช้จ่าย สถานะเปิดให้บริการ และสิทธิ์การใช้รูปภาพอีกครั้ง

---

## 1. Recommended schema

| Field | Meaning |
|---|---|
| `id` | UUID (canonical primary key) |
| `legacy_code` | รหัสเดิมแบบอ่านง่าย เช่น NP-ACT-001, NP-FOOD-034 |
| `name_th` | ชื่อไทย |
| `name_en` | ชื่ออังกฤษ/ชื่อทางเลือก |
| `entity_type` | ประเภทข้อมูลสำหรับ intent result: activity, food, place |
| `category` | หมวดกิจกรรมหลัก |
| `area` | อำเภอ/พื้นที่ |
| `route_cluster` | กลุ่มเส้นทาง ใช้จัด itinerary |
| `default_priority` | priority ตั้งต้นสำหรับ ranking |
| `primary_activity` | activity หลักที่ผู้ใช้ควรทำ |
| `activity_list` | รายละเอียดกิจกรรมย่อย |
| `intent_tags` | tag สำหรับ intent search |
| `example_queries` | ตัวอย่างคำค้นแบบภาษาคน |
| `audience` | กลุ่มผู้ใช้ที่เหมาะ |
| `duration` | เวลาที่แนะนำ |
| `best_time` | ช่วงเวลาที่เหมาะ |
| `route_fit_tags` | tag สำหรับจัดเส้นทาง |
| `evidence_summary` | หลักฐาน/เหตุผลที่ใช้จัดหมวด |
| `source_urls` | URL อ้างอิง |
| `search_text_blob` | ข้อความรวมสำหรับ full-text search/embedding |
| `opening_hours_text` | เวลาเปิด-ปิดแบบข้อความ (nullable ใน seed) |
| `hours_confidence` | high/medium/low/unknown สำหรับความเชื่อมั่นเวลาเปิด-ปิด |
| `hours_source_type` | official/facebook/map_listing/community/unknown |
| `hours_last_checked_at` | วันเวลาที่ตรวจล่าสุด (nullable ใน seed) |

---

## 2. Ranking heuristic

```text
final_score =
  0.30 * intent_match_score
+ 0.20 * semantic_similarity_score
+ 0.15 * source_confidence_score
+ 0.15 * route_fit_score
+ 0.10 * default_priority_score
+ 0.05 * time_fit_score
+ 0.05 * season_or_weather_score
```

```yaml
priority_score:
  P1: 1.00
  P2: 0.75
  P3: 0.50

data_confidence:
  HIGH: มีแหล่งทางการ/ททท./จังหวัดรองรับโดยตรง
  MEDIUM: มีแหล่งท่องเที่ยวหลักรองรับ แต่ควรตรวจรายละเอียดเชิงปฏิบัติการเพิ่ม
  LOW_TO_MEDIUM: ใช้ได้เป็น seed แต่ควรลงพื้นที่หรือยืนยันจากแหล่งล่าสุดก่อน production
```

### Mandatory retrieval pipeline alignment (match PRD)
1. Intent gate first (rule + LLM grading)
2. Scoped retrieval from `entity_type`
3. Reject out-of-scope entities before final answer

`entity_scope` rules:
- `activity_only`: allow `activity` only
- `food_only`: allow `food` only
- `place_only`: allow `place` only
- `mixed`: allow all relevant types

---

## 3. Core intent groups

```yaml
fertility_blessing:
  th: ["ขอลูก", "ขอมีบุตร", "อยากมีลูก", "ขอพรเรื่องลูก"]
  recommended_first: ["NP-ACT-001"]

general_blessing:
  th: ["ขอพร", "ทำบุญ", "ไหว้พระ", "เสริมดวง", "สายมู"]
  recommended_first: ["NP-ACT-001", "NP-ACT-002", "NP-ACT-004"]

birthday_stupa:
  th: ["พระธาตุประจำวันเกิด", "เกิดวันอาทิตย์", "เกิดวันจันทร์", "เกิดวันอังคาร", "เกิดวันพุธ", "เกิดวันพฤหัส", "เกิดวันศุกร์", "เกิดวันเสาร์"]
  recommended_first: ["NP-ACT-001", "NP-ACT-004", "NP-ACT-005", "NP-ACT-006", "NP-ACT-007", "NP-ACT-008", "NP-ACT-009", "NP-ACT-010"]

riverside_evening:
  th: ["ริมโขง", "เย็นนี้ไปไหนดี", "เดินเล่น", "ถ่ายรูปกลางคืน", "พระอาทิตย์ตก"]
  recommended_first: ["NP-ACT-002", "NP-ACT-003", "NP-ACT-018", "NP-ACT-020"]

food_trip:
  th: ["ของกิน", "อาหารเวียดนาม", "อาหารเช้า", "ร้านดัง", "must eat", "ลาบเป็ด", "ปลาโพ"]
  recommended_first: ["NP-FOOD-034", "NP-FOOD-035", "NP-FOOD-036", "NP-FOOD-038"]

history_learning:
  th: ["ประวัติศาสตร์", "โฮจิมินห์", "เวียดนาม", "พิพิธภัณฑ์", "เรียนรู้"]
  recommended_first: ["NP-ACT-013", "NP-ACT-014", "NP-ACT-015"]

nature_adventure:
  th: ["ธรรมชาติ", "เดินป่า", "น้ำตก", "ถ้ำนาคี", "ภูลังกา", "unseen"]
  recommended_first: ["NP-ACT-024", "NP-ACT-025", "NP-ACT-026"]

photo_cafe:
  th: ["ถ่ายรูป", "คาเฟ่", "street art", "อาคารเก่า", "มุมสวย", "วิว"]
  recommended_first: ["NP-ACT-002", "NP-ACT-012", "NP-ACT-022", "NP-ACT-023", "NP-FOOD-041"]
```

---

## 4. Source index

- Tourism Authority of Thailand — Nakhon Phanom Province: https://www.tourismthailand.org/Destinations/Provinces/Nakhon-Phanom/579
- TAT Phra That Phanom: https://www.tourismthailand.org/Attraction/phra-that-phanom
- TAT Nakhon Phanom Walking Street: https://www.tourismthailand.org/Attraction/nakhon-phanom-walking-street
- TAT Phra That Renu: https://www.tourismthailand.org/Attraction/phra-that-renu
- TAT Phra That Tha Uthen: https://www.tourismthailand.org/Attraction/pra-that-tha-uthen-tha-uthen-s-relic-of-buddha
- TAT Wat Okat Si Bua Ban: https://www.tourismthailand.org/Attraction/wat-okat-si-bua-ban
- TAT Ho Chi Minh House: https://www.tourismthailand.org/Attraction/ho-chi-minh-s-house-ban-na-chok
- TAT Memorial President Ho Chi Minh: https://www.tourismthailand.org/Attraction/memorial-president-ho-chi-minh
- TAT Phu Langka National Park: https://www.tourismthailand.org/Attraction/phu-langka-national-park
- TAT Saint Anna Nong Saeng Catholic Church: https://www.tourismthailand.org/Attraction/saint-anna-nong-saeng-catholic-church
- TAT Thai Foodie Map 2.0: https://www.tourismthailand.org/Articles/explore-thai-taste-thai-foodie-map-2-0-en
- Nakhon Phanom Province Travel: https://www2.nakhonphanom.go.th/travel
- Nakhon Phanom Province Top Attractions: https://www2.nakhonphanom.go.th/travel_top
- Nakhon Phanom Province Food: https://www2.nakhonphanom.go.th/food
- Traveloka 25 Places in Nakhon Phanom: https://www.traveloka.com/th-th/explore/destination/25-places-to-travel-nakhonphanom/96674
- KTC 8 Birthday Stupas in Nakhon Phanom: https://www.ktc.co.th/article/travel-stories/thailand/th/phra-that-nakhon-phanom
- OpenStreetMap tourism tag: https://wiki.openstreetmap.org/wiki/Key:tourism
- OpenStreetMap amenity tag: https://wiki.openstreetmap.org/wiki/Key:amenity

---

## 5. Activity entries

### NP-ACT-001 — วัดพระธาตุพนมวรมหาวิหาร

- **English/alt name:** Wat Phra That Phanom Woramahawihan
- **Category:** `spiritual_landmark`
- **District/area:** อ.ธาตุพนม
- **Route cluster:** `south_spiritual_route`
- **Default priority:** `P1`
- **Primary activity:** ไหว้พระธาตุ / ขอพร / ทำบุญ / จุดหลักของทริปนครพนม
- **Activity list:** สักการะองค์พระธาตุพนม, ขอพรเรื่องครอบครัว ความเป็นสิริมงคล ความสำเร็จ, ถ่ายภาพสถาปัตยกรรมพระธาตุ, เรียนรู้ประวัติศาสตร์ศรัทธาไทย-ลาวริมโขง, เชื่อมต่อเส้นทางพระธาตุประจำวันเกิด
- **Intent tags:** ขอลูก, ขอมีบุตร, ขอพร, สายมู, ไหว้พระ, พระธาตุประจำวันเกิด, วันอาทิตย์, ปีวอก, แลนด์มาร์ก, มานครพนมครั้งแรก
- **Example user queries:** "อยากขอลูกที่นครพนมควรไปที่ไหน", "อยากขอพรเรื่องครอบครัว", "มานครพนมครั้งแรกต้องไปไหน", "ไหว้พระธาตุประจำวันเกิดวันอาทิตย์"
- **Recommended audience:** คู่รัก, ครอบครัว, สายบุญ, สายมู, ผู้สูงอายุ, นักท่องเที่ยวครั้งแรก
- **Suggested duration:** 60–120 นาที
- **Best time:** เช้าหรือเย็นก่อนแดดแรง
- **Route-fit tags:** ทริปครึ่งวัน, ทริป 1 วัน, ทริปสายมู, ทริปครอบครัว, จุดหลักต้องไม่พลาด
- **Evidence summary:** ททท. ระบุว่าพระธาตุพนมอยู่ห่างตัวเมืองนครพนมราว 50 กม. และเป็นพุทธสถานที่สำคัญที่สุดของจังหวัด; แหล่งเส้นทางพระธาตุประจำวันเกิดระบุบทบาทด้านวันอาทิตย์/ปีวอก
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Phra That Phanom, KTC 8 Birthday Stupas, Traveloka 25 Places
- **Search text blob:** พระธาตุพนม วัดพระธาตุพนมวรมหาวิหาร ขอพร ขอลูก ขอมีบุตร ไหว้พระธาตุ วันอาทิตย์ ปีวอก สิริมงคล ศรัทธา ไทย ลาว แลนด์มาร์กนครพนม
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-002 — พญาศรีสัตตนาคราช

- **English/alt name:** Phaya Sri Sattanakharat / Sri Satta Nakarat
- **Category:** `spiritual_riverside_landmark`
- **District/area:** อ.เมืองนครพนม ริมแม่น้ำโขง
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P1`
- **Primary activity:** ไหว้พญานาค / ขอพร / ถ่ายรูปแลนด์มาร์กริมโขง
- **Activity list:** สักการะพญาศรีสัตตนาคราช, ถ่ายภาพแลนด์มาร์กริมโขง, เดินเล่นลานริมแม่น้ำ, เชื่อมต่อถนนคนเดินและคาเฟ่ริมโขง, ชมไฟและบรรยากาศช่วงเย็น
- **Intent tags:** ขอพร, สายมู, พญานาค, โชคลาภ, ริมโขง, ถ่ายรูป, แลนด์มาร์ก, เดินเล่น, กลางคืน, ครอบครัว
- **Example user queries:** "อยากขอพรพญานาค", "อยากถ่ายรูปแลนด์มาร์กนครพนม", "ตอนเย็นไปไหนในตัวเมือง", "เที่ยวริมโขงใกล้ถนนคนเดิน"
- **Recommended audience:** คู่รัก, ครอบครัว, สายถ่ายรูป, สายมู, นักท่องเที่ยวทั่วไป
- **Suggested duration:** 30–90 นาที
- **Best time:** เย็นถึงค่ำ
- **Route-fit tags:** city_walk, walking_street_pairing, riverside_evening, low_effort
- **Evidence summary:** เว็บไซต์จังหวัดนครพนมระบุว่าเป็นแลนด์มาร์กแห่งศรัทธาของจังหวัด ตั้งอยู่ริมฝั่งแม่น้ำโขง; บทความท่องเที่ยวระบุรายละเอียดรูปหล่อทองเหลือง 7 เศียรและความนิยมสูง
- **Data confidence:** `HIGH`
- **Source URLs:** Nakhon Phanom Province Travel, Nakhon Phanom Province Top Attractions, Traveloka 25 Places
- **Search text blob:** พญาศรีสัตตนาคราช พญานาค 7 เศียร แลนด์มาร์กนครพนม ริมโขง ขอพร โชคลาภ สายมู ถ่ายรูป เดินเล่นกลางคืน
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-003 — ถนนคนเดินนครพนม

- **English/alt name:** Nakhon Phanom Walking Street
- **Category:** `market_food_riverside`
- **District/area:** อ.เมืองนครพนม ริมแม่น้ำโขง
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P1`
- **Primary activity:** เดินตลาดเย็น / กินอาหารท้องถิ่น / ซื้อของฝาก
- **Activity list:** เดินตลาดริมโขง, กิน street food และขนมท้องถิ่น, ซื้อของฝาก งานคราฟต์ สินค้า handmade, ชมวิวแม่น้ำโขงและบรรยากาศกลางคืน, เชื่อมต่อพญาศรีสัตตนาคราชและหอนาฬิกา
- **Intent tags:** อาหาร, street food, ของฝาก, เดินเล่น, กลางคืน, ตลาด, ครอบครัว, คู่รัก, ริมโขง
- **Example user queries:** "อยากเดินเล่นตอนกลางคืน", "อยากกินของอร่อยนครพนม", "ถนนคนเดินเปิดวันไหน", "ซื้อของฝากนครพนม"
- **Recommended audience:** ครอบครัว, คู่รัก, กลุ่มเพื่อน, นักท่องเที่ยวครั้งแรก, สายกิน
- **Suggested duration:** 60–180 นาที
- **Best time:** ศุกร์–อาทิตย์ 16:00–22:00 ตามข้อมูล ททท.
- **Route-fit tags:** evening_anchor, city_walk, food_cluster, low_effort
- **Evidence summary:** ททท. ระบุว่ามีสินค้า handmade ของฝาก อาหาร และขนม เปิดวันศุกร์ถึงอาทิตย์ 16:00–22:00 และอยู่ในเส้นทางริมโขงของตัวเมือง
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Walking Street, TAT Foodie Map, Traveloka 25 Places
- **Search text blob:** ถนนคนเดินนครพนม street food ของฝาก handmade ริมโขง ศุกร์ เสาร์ อาทิตย์ เย็น กลางคืน เดินเล่น ตลาด
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-004 — วัดพระธาตุเรณู

- **English/alt name:** Wat Phra That Renu / Phra That Renu
- **Category:** `spiritual_culture`
- **District/area:** อ.เรณูนคร
- **Route cluster:** `south_spiritual_route`
- **Default priority:** `P1`
- **Primary activity:** ไหว้พระธาตุประจำวันเกิดวันจันทร์ / ถ่ายภาพพระธาตุสีชมพู / ช้อป OTOP
- **Activity list:** สักการะพระธาตุเรณู, ถ่ายภาพพระธาตุสีชมพูพาสเทล, เชื่อมต่อเส้นทางพระธาตุพนม, ซื้อสินค้า OTOP/ของฝากชุมชน, เรียนรู้วัฒนธรรมเรณูนคร
- **Intent tags:** วันจันทร์, ไหว้พระธาตุ, สายบุญ, ถ่ายรูป, OTOP, เรณูนคร, พระธาตุสีชมพู
- **Example user queries:** "เกิดวันจันทร์ควรไหว้พระธาตุไหน", "อยากไปพระธาตุสีชมพู", "เที่ยวเรณูนคร", "ไปพระธาตุพนมแล้วต่อที่ไหนดี"
- **Recommended audience:** สายบุญ, ครอบครัว, คู่รัก, สายถ่ายรูป, นักท่องเที่ยววัฒนธรรม
- **Suggested duration:** 45–90 นาที
- **Best time:** เช้าหรือเย็น
- **Route-fit tags:** that_phanom_pairing, birthday_stupa_route, photo_stop
- **Evidence summary:** ททท. มีหน้าสถานที่พระธาตุเรณู และ Foodie Map แนะนำ Wat That Renu เป็น Must Seek attraction; แหล่งเส้นทางพระธาตุประจำวันเกิดระบุว่าเป็นพระธาตุประจำวันจันทร์
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Phra That Renu, TAT Foodie Map, KTC 8 Birthday Stupas, Traveloka 25 Places
- **Search text blob:** พระธาตุเรณู เรณูนคร วันจันทร์ พระธาตุสีชมพู ไหว้พระ ถ่ายรูป OTOP ของฝาก วัฒนธรรมผู้ไท
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-005 — วัดพระธาตุศรีคุณ

- **English/alt name:** Wat Phra That Si Khun / Phra That Sri Khun
- **Category:** `spiritual_birthday_stupa`
- **District/area:** อ.นาแก
- **Route cluster:** `south_spiritual_route`
- **Default priority:** `P2`
- **Primary activity:** ไหว้พระธาตุประจำวันเกิดวันอังคาร / ขอพรด้านเกียรติยศและความเข้มแข็ง
- **Activity list:** สักการะพระธาตุศรีคุณ, ทำบุญและถ่ายภาพพระธาตุ, เชื่อมต่อเส้นทาง 8 พระธาตุประจำวันเกิด, ใช้เป็นจุดแวะใน route นาแก-เรณูนคร-ธาตุพนม
- **Intent tags:** วันอังคาร, พระธาตุประจำวันเกิด, ไหว้พระ, ขอพร, เกียรติยศ, ความกล้าหาญ, สายบุญ
- **Example user queries:** "เกิดวันอังคารไหว้พระธาตุไหน", "อยากไหว้พระธาตุครบ 8 แห่ง", "เส้นทางสายบุญนครพนม"
- **Recommended audience:** สายบุญ, คนเกิดวันอังคาร, ผู้สูงอายุ, ครอบครัว
- **Suggested duration:** 30–60 นาที
- **Best time:** เช้าหรือบ่าย
- **Route-fit tags:** birthday_stupa_route, southern_loop
- **Evidence summary:** ททท. มีหน้าสถานที่ Phra That Sri Khun; แหล่งเส้นทางพระธาตุประจำวันเกิดระบุว่าเป็นพระธาตุของผู้เกิดวันอังคารในอำเภอนาแก
- **Data confidence:** `MEDIUM`
- **Source URLs:** TAT Province, KTC 8 Birthday Stupas
- **Search text blob:** พระธาตุศรีคุณ วัดพระธาตุศรีคุณ นาแก วันอังคาร พระธาตุประจำวันเกิด เกียรติยศ ศักดิ์ศรี นักสู้
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-006 — วัดพระธาตุมหาชัย

- **English/alt name:** Wat Phra That Mahachai
- **Category:** `spiritual_birthday_stupa`
- **District/area:** อ.ปลาปาก
- **Route cluster:** `central_spiritual_route`
- **Default priority:** `P2`
- **Primary activity:** ไหว้พระธาตุประจำวันเกิดวันพุธกลางวัน / ขอพรด้านชัยชนะและการงาน
- **Activity list:** สักการะพระธาตุมหาชัย, ทำบุญและขอพรเรื่องชัยชนะ ความสำเร็จ การเจรจา, ใช้เป็นจุดแวะใน route 8 พระธาตุ, ถ่ายภาพพระธาตุและวัด
- **Intent tags:** วันพุธกลางวัน, ชัยชนะ, งาน, ค้าขาย, เจรจา, พระธาตุประจำวันเกิด, สายบุญ
- **Example user queries:** "เกิดวันพุธกลางวันไหว้ที่ไหน", "อยากขอพรเรื่องงานและการค้าขาย", "อยากไหว้พระธาตุสายเสริมชัยชนะ"
- **Recommended audience:** สายบุญ, ผู้ประกอบการ, คนทำงาน, ครอบครัว
- **Suggested duration:** 30–60 นาที
- **Best time:** เช้าหรือบ่าย
- **Route-fit tags:** birthday_stupa_route, central_loop
- **Evidence summary:** ททท. มีหน้าสถานที่ Phra That Mahachai; แหล่งเส้นทาง 8 พระธาตุระบุว่าเป็นพระธาตุประจำผู้เกิดวันพุธกลางวันในเขต อ.ปลาปาก
- **Data confidence:** `MEDIUM`
- **Source URLs:** TAT Province, KTC 8 Birthday Stupas
- **Search text blob:** พระธาตุมหาชัย ปลาปาก วันพุธกลางวัน ชัยชนะ งาน ค้าขาย เจรจา พระธาตุประจำวันเกิด
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-007 — พระธาตุมรุกขนคร

- **English/alt name:** Phrathat Marukkha Nakhon
- **Category:** `spiritual_birthday_stupa`
- **District/area:** อ.ธาตุพนม
- **Route cluster:** `south_spiritual_route`
- **Default priority:** `P2`
- **Primary activity:** ไหว้พระธาตุประจำวันเกิดวันพุธกลางคืน / ขอพรความเจริญสุขสวัสดิ์
- **Activity list:** สักการะพระธาตุมรุกขนคร, เชื่อมต่อพระธาตุพนมใน route อ.ธาตุพนม, ถ่ายภาพพระธาตุรุ่นใหม่ในกลุ่มพระธาตุบริวาร, ทำบุญเสริมสิริมงคล
- **Intent tags:** วันพุธกลางคืน, ราหู, ไหว้พระ, สิริมงคล, พระธาตุบริวาร, ธาตุพนม
- **Example user queries:** "เกิดวันพุธกลางคืนควรไปไหน", "ไหว้พระธาตุใกล้พระธาตุพนม", "อยากขอพรความเจริญ"
- **Recommended audience:** สายบุญ, คนเกิดวันพุธกลางคืน, ครอบครัว
- **Suggested duration:** 30–60 นาที
- **Best time:** เช้าหรือเย็น
- **Route-fit tags:** that_phanom_pairing, birthday_stupa_route
- **Evidence summary:** ททท. มีหน้าสถานที่ Phrathat Marukkha Nakhon และแหล่งเส้นทางพระธาตุประจำวันเกิดระบุว่าเป็นพระธาตุประจำวันพุธกลางคืนในเขต อ.ธาตุพนม
- **Data confidence:** `MEDIUM`
- **Source URLs:** TAT Province, KTC 8 Birthday Stupas
- **Search text blob:** พระธาตุมรุกขนคร วันพุธกลางคืน ธาตุพนม พระธาตุบริวาร ราหู สิริมงคล เจริญสุข
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-008 — วัดพระธาตุประสิทธิ์

- **English/alt name:** Wat Phra That Prasit
- **Category:** `spiritual_birthday_stupa`
- **District/area:** อ.นาหว้า
- **Route cluster:** `northwest_spiritual_route`
- **Default priority:** `P2`
- **Primary activity:** ไหว้พระธาตุประจำวันเกิดวันพฤหัสบดี / ขอพรความสำเร็จในหน้าที่การงาน
- **Activity list:** สักการะพระธาตุประสิทธิ์, ขอพรเรื่องการงาน ความสำเร็จ ครูบาอาจารย์, ร่วมงานบุญเดือนสี่ของดีนาหว้าเมื่อถึงฤดูกาล, เชื่อมต่อ route นาหว้า-ท่าอุเทน-เมือง
- **Intent tags:** วันพฤหัสบดี, งาน, เรียน, ครู, สำเร็จ, พระธาตุประจำวันเกิด, สายบุญ
- **Example user queries:** "เกิดวันพฤหัสบดีไหว้พระธาตุไหน", "อยากขอพรเรื่องงาน", "อยากไหว้พระธาตุประจำวันเกิดนครพนม"
- **Recommended audience:** สายบุญ, นักเรียน, ข้าราชการ, คนทำงาน, ครอบครัว
- **Suggested duration:** 30–60 นาที
- **Best time:** เช้าหรือบ่าย
- **Route-fit tags:** birthday_stupa_route, festival_route
- **Evidence summary:** ททท. มีหน้าสถานที่ Prathat Prasit และแหล่งเส้นทางพระธาตุระบุว่าเป็นพระธาตุประจำวันพฤหัสบดีในเขต อ.นาหว้า; เว็บไซต์จังหวัดมีหน้าสถานที่วัดพระธาตุประสิทธิ์
- **Data confidence:** `MEDIUM`
- **Source URLs:** TAT Province, KTC 8 Birthday Stupas, Nakhon Phanom Province Travel, Traveloka 25 Places
- **Search text blob:** พระธาตุประสิทธิ์ นาหว้า วันพฤหัสบดี สำเร็จ การงาน เรียน ครู งานบุญเดือนสี่ ของดีนาหว้า
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-009 — วัดพระธาตุท่าอุเทน

- **English/alt name:** Wat Phra That Tha Uthen
- **Category:** `spiritual_riverside_birthday_stupa`
- **District/area:** อ.ท่าอุเทน ริมแม่น้ำโขง
- **Route cluster:** `north_riverside_spiritual_route`
- **Default priority:** `P2`
- **Primary activity:** ไหว้พระธาตุประจำวันเกิดวันศุกร์ / ชมวิวริมโขง
- **Activity list:** สักการะพระธาตุท่าอุเทน, ถ่ายภาพพระธาตุริมแม่น้ำโขง, ขอพรความรุ่งโรจน์ ความราบรื่นในชีวิต, เชื่อมต่อ route เมือง-ท่าอุเทน-นาหว้า
- **Intent tags:** วันศุกร์, พระธาตุริมโขง, รุ่งโรจน์, ไหว้พระ, ท่าอุเทน, ถ่ายรูป, วิวแม่น้ำ
- **Example user queries:** "เกิดวันศุกร์ไหว้พระธาตุไหน", "อยากไหว้พระธาตุริมโขง", "เที่ยวท่าอุเทนไปไหน"
- **Recommended audience:** สายบุญ, ครอบครัว, คนเกิดวันศุกร์, สายถ่ายรูป
- **Suggested duration:** 30–75 นาที
- **Best time:** เช้าหรือเย็น
- **Route-fit tags:** north_riverside_loop, birthday_stupa_route
- **Evidence summary:** ททท. ระบุว่าเป็นพระธาตุที่จำลองแบบจากพระธาตุพนม มีฐานกว้าง 13.5 เมตร สูง 66 เมตร; แหล่งเส้นทาง 8 พระธาตุระบุว่าเป็นพระธาตุประจำวันศุกร์
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Phra That Tha Uthen, KTC 8 Birthday Stupas, Traveloka 25 Places
- **Search text blob:** พระธาตุท่าอุเทน วันศุกร์ ริมโขง พระธาตุประจำวันเกิด ท่าอุเทน ขอพรรุ่งโรจน์ ถ่ายรูป
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-010 — วัดมหาธาตุ / พระธาตุนคร

- **English/alt name:** Wat Mahathat / Phra That Nakhon
- **Category:** `spiritual_city_riverside`
- **District/area:** อ.เมืองนครพนม ริมแม่น้ำโขง
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P2`
- **Primary activity:** ไหว้พระธาตุประจำวันเกิดวันเสาร์ / เดินต่อริมโขง
- **Activity list:** สักการะพระธาตุนคร, ถ่ายภาพวัดและพระธาตุในตัวเมือง, เดินต่อไปริมแม่น้ำโขงหรือถนนคนเดิน, ใช้เป็นจุดแวะใน city spiritual route
- **Intent tags:** วันเสาร์, พระธาตุประจำวันเกิด, ไหว้พระในเมือง, ริมโขง, เดินเล่น, บารมี
- **Example user queries:** "เกิดวันเสาร์ไหว้พระธาตุไหน", "อยากไหว้พระในตัวเมืองนครพนม", "วัดริมโขงใกล้ถนนคนเดิน"
- **Recommended audience:** สายบุญ, คนเกิดวันเสาร์, ผู้สูงอายุ, นักท่องเที่ยวในเมือง
- **Suggested duration:** 30–60 นาที
- **Best time:** บ่ายแก่หรือเย็น
- **Route-fit tags:** city_walk, birthday_stupa_route, walking_street_pairing
- **Evidence summary:** ททท. มีหน้าสถานที่ Wat Mahathat และแหล่งเส้นทาง 8 พระธาตุระบุว่าพระธาตุนครอยู่ในวัดมหาธาตุ อ.เมือง ริมแม่น้ำโขง เป็นพระธาตุประจำวันเสาร์
- **Data confidence:** `MEDIUM`
- **Source URLs:** TAT Province, KTC 8 Birthday Stupas, Traveloka 25 Places
- **Search text blob:** วัดมหาธาตุ พระธาตุนคร วันเสาร์ พระธาตุประจำวันเกิด ตัวเมือง ริมโขง ไหว้พระ บารมี
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-011 — วัดโอกาสศรีบัวบาน

- **English/alt name:** Wat Okat Si Bua Ban
- **Category:** `spiritual_old_temple`
- **District/area:** อ.เมืองนครพนม
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P2`
- **Primary activity:** ไหว้พระคู่บ้านคู่เมือง / ศึกษาวัดเก่า
- **Activity list:** ไหว้พระติ้วและพระเทียม, ชมวัดเก่าแก่ของจังหวัด, ทำบุญในตัวเมือง, เชื่อมต่อการเดินเมืองเก่าและริมโขง
- **Intent tags:** วัดเก่า, ไหว้พระ, พระติ้ว, พระเทียม, ตัวเมือง, สายบุญ, ประวัติศาสตร์
- **Example user queries:** "อยากไหว้วัดเก่าในเมืองนครพนม", "วัดศักดิ์สิทธิ์ในตัวเมืองมีที่ไหน", "เที่ยววัดใกล้ริมโขง"
- **Recommended audience:** สายบุญ, ผู้สูงอายุ, คนสนใจประวัติศาสตร์, นักท่องเที่ยวในเมือง
- **Suggested duration:** 30–60 นาที
- **Best time:** เช้าหรือบ่าย
- **Route-fit tags:** city_walk, spiritual_city_route, low_effort
- **Evidence summary:** ททท. ระบุว่าวัดโอกาสหรือวัดโอกาสศรีบัวบานเป็นวัดเก่าแก่ศักดิ์สิทธิ์ของนครพนม และประดิษฐานพระพุทธรูปสำคัญคือพระติ้วและพระเทียม
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Wat Okat, TAT Province
- **Search text blob:** วัดโอกาสศรีบัวบาน วัดเก่า นครพนม พระติ้ว พระเทียม ไหว้พระ ตัวเมือง ประวัติศาสตร์
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-012 — อาสนวิหารนักบุญอันนา หนองแสง

- **English/alt name:** Saint Anna Nong Saeng Catholic Church
- **Category:** `religion_architecture_photo`
- **District/area:** อ.เมืองนครพนม ถนนสุนทรวิจิตร
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P2`
- **Primary activity:** ชมสถาปัตยกรรมคริสต์ / ถ่ายรูป / เรียนรู้ชุมชนคาทอลิกริมโขง
- **Activity list:** ถ่ายภาพอาสนวิหารหอคอยคู่, เรียนรู้ความหลากหลายทางศาสนาและชาติพันธุ์, เดินต่อริมโขง, ใช้เป็น stop ใน route สถาปัตยกรรมเมืองเก่า
- **Intent tags:** โบสถ์คริสต์, สถาปัตยกรรม, ถ่ายรูป, ประวัติศาสตร์, เวียดนาม, ครอบครัว, คู่รัก
- **Example user queries:** "อยากถ่ายรูปโบสถ์สวยๆ", "นครพนมมีโบสถ์คริสต์ไหม", "เที่ยวสถาปัตยกรรมในเมือง"
- **Recommended audience:** คู่รัก, สายถ่ายรูป, คนสนใจประวัติศาสตร์, ครอบครัว
- **Suggested duration:** 30–60 นาที
- **Best time:** เช้าหรือเย็น
- **Route-fit tags:** city_architecture_route, riverside_walk, photo_stop
- **Evidence summary:** ททท. มีหน้าสถานที่ Saint Anna Nong Saeng Catholic Church และระบุที่ตั้งบนถนนสุนทรวิจิตร อ.เมืองนครพนม; แหล่งท่องเที่ยวระบุว่าเป็นโบสถ์เก่าแก่และมีหอคอยคู่โดดเด่น
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Saint Anna, Traveloka 25 Places
- **Search text blob:** อาสนวิหารนักบุญอันนา หนองแสง โบสถ์คริสต์ นครพนม คาทอลิก หอคอยคู่ ถ่ายรูป สถาปัตยกรรม
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-013 — บ้านโฮจิมินห์ บ้านนาจอก

- **English/alt name:** Ho Chi Minh's House Ban Na Chok / Uncle Ho's House
- **Category:** `history_vietnamese_heritage`
- **District/area:** บ้านนาจอก อ.เมืองนครพนม
- **Route cluster:** `vietnamese_history_route`
- **Default priority:** `P1`
- **Primary activity:** ชมบ้านประวัติศาสตร์ / เรียนรู้ความสัมพันธ์ไทย-เวียดนาม
- **Activity list:** เยี่ยมชมบ้านประวัติศาสตร์ลุงโฮ, เรียนรู้ประวัติศาสตร์ชาวเวียดนามในนครพนม, ถ่ายภาพพื้นที่ชุมชน, เชื่อมต่ออนุสรณ์สถานประธานโฮจิมินห์
- **Intent tags:** ประวัติศาสตร์, โฮจิมินห์, เวียดนาม, บ้านนาจอก, เรียนรู้, ครอบครัว, ต่างชาติ
- **Example user queries:** "อยากเที่ยวประวัติศาสตร์เวียดนามในนครพนม", "บ้านลุงโฮอยู่ที่ไหน", "พาลูกเรียนรู้ประวัติศาสตร์"
- **Recommended audience:** นักเรียน, ครอบครัว, คนสนใจประวัติศาสตร์, นักท่องเที่ยวเวียดนาม
- **Suggested duration:** 45–90 นาที
- **Best time:** เช้าหรือบ่าย
- **Route-fit tags:** vietnamese_history_route, education_route
- **Evidence summary:** ททท. มีหน้าสถานที่ Ho Chi Minh's House Ban Na Chok และระบุชื่อเรียกอีกชื่อว่า Uncle Ho's house ในเขต อ.เมืองนครพนม
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Ho Chi Minh House, Traveloka 25 Places
- **Search text blob:** บ้านโฮจิมินห์ บ้านนาจอก ลุงโฮ ประวัติศาสตร์ เวียดนาม ชุมชนไทยเวียดนาม นครพนม
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-014 — อนุสรณ์สถานประธานโฮจิมินห์

- **English/alt name:** Memorial President Ho Chi Minh
- **Category:** `history_vietnamese_heritage_museum`
- **District/area:** อ.เมืองนครพนม
- **Route cluster:** `vietnamese_history_route`
- **Default priority:** `P2`
- **Primary activity:** ชมพิพิธภัณฑ์/อนุสรณ์สถาน / เรียนรู้ประวัติศาสตร์เวียดนาม
- **Activity list:** ชมภาพและนิทรรศการเกี่ยวกับโฮจิมินห์, เรียนรู้ความสัมพันธ์ไทย-เวียดนามในพื้นที่นครพนม, ถ่ายภาพสถาปัตยกรรมและสวน, จับคู่กับบ้านโฮจิมินห์บ้านนาจอก
- **Intent tags:** ประวัติศาสตร์, โฮจิมินห์, พิพิธภัณฑ์, เวียดนาม, ศึกษา, ต่างชาติ
- **Example user queries:** "อยากไปพิพิธภัณฑ์โฮจิมินห์", "เส้นทางประวัติศาสตร์เวียดนามในนครพนม", "เที่ยวเชิงความรู้"
- **Recommended audience:** นักเรียน, ครอบครัว, คนสนใจประวัติศาสตร์, นักท่องเที่ยวต่างชาติ
- **Suggested duration:** 45–90 นาที
- **Best time:** เช้าหรือบ่าย
- **Route-fit tags:** vietnamese_history_route, education_route
- **Evidence summary:** ททท. มีหน้าสถานที่ Memorial President Ho Chi Minh และระบุว่าเป็นพิพิธภัณฑ์/อนุสรณ์ในเขต อ.เมืองนครพนม โดยมีภาพและเรื่องราวของโฮจิมินห์เป็นไฮไลต์
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Ho Chi Minh Memorial, Traveloka 25 Places
- **Search text blob:** อนุสรณ์สถานประธานโฮจิมินห์ พิพิธภัณฑ์โฮจิมินห์ เวียดนาม นครพนม ประวัติศาสตร์ เรียนรู้
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-015 — พิพิธภัณฑ์จวนผู้ว่าราชการจังหวัดนครพนม

- **English/alt name:** Former Governor's Residence Museum
- **Category:** `museum_architecture_history`
- **District/area:** อ.เมืองนครพนม
- **Route cluster:** `city_architecture_route`
- **Default priority:** `P2`
- **Primary activity:** ชมพิพิธภัณฑ์ / ถ่ายภาพอาคารโคโลเนียล / เรียนรู้ประวัติศาสตร์จังหวัด
- **Activity list:** ชมอาคารสถาปัตยกรรมแบบโคโลเนียล, เรียนรู้ข้อมูลประวัติศาสตร์จังหวัด, ถ่ายภาพอาคารเก่าสีเหลือง, เชื่อมต่อหอสมุดแห่งชาติและ street art
- **Intent tags:** พิพิธภัณฑ์, ประวัติศาสตร์, อาคารเก่า, โคโลเนียล, ถ่ายรูป, เมืองเก่า
- **Example user queries:** "อยากเที่ยวพิพิธภัณฑ์ในตัวเมือง", "อยากถ่ายรูปอาคารเก่า", "เส้นทางเมืองเก่านครพนม"
- **Recommended audience:** สายประวัติศาสตร์, สายถ่ายรูป, นักเรียน, ครอบครัว
- **Suggested duration:** 45–75 นาที
- **Best time:** เช้าหรือบ่าย
- **Route-fit tags:** city_architecture_route, photo_stop, education_route
- **Evidence summary:** บทความท่องเที่ยวระบุว่าเป็นพิพิธภัณฑ์รวบรวมข้อมูลประวัติศาสตร์จังหวัดในอาคารโคโลเนียลสีเหลือง และอยู่ในกลุ่มจุดท่องเที่ยวตัวเมือง
- **Data confidence:** `MEDIUM`
- **Source URLs:** Nakhon Phanom Province Travel, Traveloka 25 Places
- **Search text blob:** พิพิธภัณฑ์จวนผู้ว่าราชการจังหวัดนครพนม อาคารโคโลเนียล สีเหลือง ประวัติศาสตร์ ถ่ายรูป เมืองเก่า
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-016 — หอนาฬิกาเวียดนามอนุสรณ์

- **English/alt name:** Vietnamese Memorial Clock Tower
- **Category:** `landmark_history_photo`
- **District/area:** อ.เมืองนครพนม
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P2`
- **Primary activity:** ถ่ายภาพแลนด์มาร์ก / เริ่มหรือจบทริปถนนคนเดิน
- **Activity list:** ถ่ายรูปหอนาฬิกา, ใช้เป็นจุดนัดพบหรือจุดเริ่มเดินเมือง, เรียนรู้สัญลักษณ์ความสัมพันธ์ไทย-เวียดนาม, เชื่อมต่อถนนคนเดินและย่านเมืองเก่า
- **Intent tags:** หอนาฬิกา, เวียดนาม, ถ่ายรูป, แลนด์มาร์ก, เดินเล่น, เมืองเก่า
- **Example user queries:** "หอนาฬิกานครพนมอยู่ไหน", "จุดถ่ายรูปในตัวเมือง", "เดินเมืองเก่านครพนมเริ่มตรงไหน"
- **Recommended audience:** นักท่องเที่ยวครั้งแรก, สายถ่ายรูป, คู่รัก, กลุ่มเพื่อน
- **Suggested duration:** 15–30 นาที
- **Best time:** เย็นหรือกลางคืน
- **Route-fit tags:** city_walk, walking_street_pairing, photo_stop
- **Evidence summary:** ททท. ระบุเส้นทางถนนคนเดินเริ่มจากหอนาฬิกาอนุสรณ์เวียดนามถึงลานพญาศรีสัตตนาคราช; บทความท่องเที่ยวระบุว่าเป็นแลนด์มาร์กสัมพันธ์ไทย-เวียดนาม
- **Data confidence:** `MEDIUM`
- **Source URLs:** TAT Walking Street, Traveloka 25 Places
- **Search text blob:** หอนาฬิกาเวียดนามอนุสรณ์ หอนาฬิกานครพนม เวียดนาม ถ่ายรูป เมืองเก่า ถนนคนเดิน จุดนัดพบ
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-017 — สะพานมิตรภาพไทย–ลาว แห่งที่ 3

- **English/alt name:** Third Thai–Lao Friendship Bridge
- **Category:** `border_landmark_viewpoint`
- **District/area:** อ.เมืองนครพนม / เชื่อมแขวงคำม่วน สปป.ลาว
- **Route cluster:** `border_mekong_route`
- **Default priority:** `P2`
- **Primary activity:** ชมวิวสะพานข้ามโขง / ถ่ายภาพ / เชื่อมโยงทริปชายแดน
- **Activity list:** ถ่ายภาพสะพานและวิวแม่น้ำโขง, ชมภูเขาฝั่งลาว, เรียนรู้บทบาทนครพนมในฐานะประตูสู่อาเซียน, ใช้เป็นจุดเชื่อมต่อแผนทริปท่าแขกเมื่อมีเอกสารพร้อม
- **Intent tags:** สะพาน, ชายแดน, ลาว, วิวโขง, ถ่ายรูป, ท่าแขก, ASEAN
- **Example user queries:** "อยากถ่ายรูปสะพานมิตรภาพ", "จุดชมวิวแม่น้ำโขง", "นครพนมไปลาวได้ไหม", "เที่ยวชายแดน"
- **Recommended audience:** ครอบครัว, สายถ่ายรูป, นักท่องเที่ยวขับรถ, คนสนใจชายแดน
- **Suggested duration:** 30–60 นาที
- **Best time:** เช้าหรือเย็น
- **Route-fit tags:** border_route, mekong_viewpoint, car_trip
- **Evidence summary:** Foodie Map ของ ททท. ระบุ Third Thai–Lao Friendship Bridge เป็นหนึ่งใน Must Seek attractions ของนครพนม; บทความท่องเที่ยวระบุว่าเชื่อมจังหวัดนครพนมกับแขวงคำม่วนและมีวิวแม่น้ำโขง
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Foodie Map, Traveloka 25 Places
- **Search text blob:** สะพานมิตรภาพไทยลาวแห่งที่ 3 นครพนม คำม่วน ท่าแขก ชายแดน แม่น้ำโขง ถ่ายรูป จุดชมวิว
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-018 — เส้นทางจักรยานริมแม่น้ำโขง

- **English/alt name:** Nakhon Phanom Mekong Riverside Cycling Route
- **Category:** `outdoor_cycling_riverside`
- **District/area:** ตัวเมืองนครพนมและแนวริมโขง
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P1`
- **Primary activity:** ปั่นจักรยานชมวิวแม่น้ำโขง / แวะหลายจุดในตัวเมือง
- **Activity list:** ปั่นจักรยานเลียบแม่น้ำโขง, ชมวิวฝั่งลาว, แวะพญาศรีสัตตนาคราช ถนนคนเดิน อุโมงค์นาคราช และคาเฟ่, ออกกำลังเบา ๆ ช่วงเช้าหรือเย็น
- **Intent tags:** ปั่นจักรยาน, ออกกำลังกาย, ริมโขง, วิว, ครอบครัว, คู่รัก, low cost
- **Example user queries:** "อยากปั่นจักรยานริมโขง", "กิจกรรมเช้าในนครพนม", "เที่ยวแบบไม่เข้าวัด", "อยากเดินเล่นออกกำลังกาย"
- **Recommended audience:** คู่รัก, กลุ่มเพื่อน, ครอบครัว, สายสุขภาพ, นักท่องเที่ยว solo
- **Suggested duration:** 60–180 นาที
- **Best time:** เช้าตรู่หรือเย็น
- **Route-fit tags:** riverside_route, city_walk, outdoor_activity
- **Evidence summary:** บทความท่องเที่ยวระบุว่าเส้นทางจักรยานในตัวเมืองเหมาะกับการปั่นเลียบแม่น้ำโขงและสามารถแวะหลายจุดท่องเที่ยวใกล้เส้นทาง
- **Data confidence:** `MEDIUM`
- **Source URLs:** Traveloka 25 Places
- **Search text blob:** ปั่นจักรยานริมโขง เส้นทางจักรยานนครพนม วิวลาว ออกกำลังกาย เช้า เย็น low cost city activity
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-019 — อุโมงค์นาคราช

- **English/alt name:** Nakarat Tunnel / Naga Tunnel
- **Category:** `cycling_photo_unseen`
- **District/area:** แนวเส้นทางจักรยานริมโขง
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P2`
- **Primary activity:** แวะถ่ายรูปบนเส้นทางจักรยาน / จุด unseen ริมโขง
- **Activity list:** ปั่นจักรยานผ่านอุโมงค์, ถ่ายภาพจุดเช็กอินรูปทรงอุโมงค์, เชื่อม route ริมโขงกับกิจกรรมออกกำลังกาย, หยุดพักระหว่างปั่น
- **Intent tags:** จักรยาน, อุโมงค์, unseen, ถ่ายรูป, ริมโขง, วัยรุ่น, กิจกรรมเบา
- **Example user queries:** "อุโมงค์นาคราชอยู่ไหน", "จุดถ่ายรูปสายปั่น", "ปั่นจักรยานนครพนมต้องแวะไหน"
- **Recommended audience:** กลุ่มเพื่อน, คู่รัก, สายปั่น, สายถ่ายรูป
- **Suggested duration:** 15–30 นาที
- **Best time:** เช้าหรือเย็น
- **Route-fit tags:** cycling_route, photo_stop
- **Evidence summary:** บทความท่องเที่ยวระบุว่าอุโมงค์นาคราชเป็นไฮไลต์ของเส้นทางปั่นจักรยานเลียบริมฝั่งโขง มีความยาว 307 เมตร
- **Data confidence:** `MEDIUM`
- **Source URLs:** Traveloka 25 Places
- **Search text blob:** อุโมงค์นาคราช นครพนม เส้นทางจักรยาน ริมโขง ถ่ายรูป unseen อุโมงค์
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-020 — ล่องเรือชมแม่น้ำโขง

- **English/alt name:** Mekong River Cruise / Sunset Cruise
- **Category:** `river_cruise_sunset`
- **District/area:** ท่าเรือ/ริมโขงตัวเมืองนครพนม
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P2`
- **Primary activity:** ล่องเรือชมวิวโขง / ดูพระอาทิตย์ตก / ถ่ายภาพ
- **Activity list:** ล่องเรือ 1–2 ชั่วโมง, ชมวิวฝั่งไทยและลาว, ถ่ายภาพพระอาทิตย์ตก, ใช้เป็นกิจกรรมคู่รักหรือครอบครัวช่วงเย็น, จับคู่กับอาหารริมโขงหลังล่องเรือ
- **Intent tags:** ล่องเรือ, พระอาทิตย์ตก, โรแมนติก, ริมโขง, คู่รัก, ครอบครัว, ชิลล์
- **Example user queries:** "อยากล่องเรือแม่น้ำโขง", "กิจกรรมโรแมนติกนครพนม", "เย็นนี้ไปไหนดี", "พาแฟนเที่ยวริมโขง"
- **Recommended audience:** คู่รัก, ครอบครัว, กลุ่มเพื่อน, สายถ่ายรูป
- **Suggested duration:** 60–120 นาที
- **Best time:** เย็นก่อนพระอาทิตย์ตก
- **Route-fit tags:** evening_anchor, romantic_route, riverside_route
- **Evidence summary:** บทความท่องเที่ยวระบุว่าการล่องเรือชมแม่น้ำโขงช่วงเย็นใช้เวลาประมาณ 1–2 ชั่วโมงและเห็นวิวสองฝั่งไทย-ลาว
- **Data confidence:** `MEDIUM`
- **Source URLs:** Traveloka 25 Places
- **Search text blob:** ล่องเรือแม่น้ำโขง นครพนม sunset พระอาทิตย์ตก คู่รัก โรแมนติก วิวลาว ท่าเรือ
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-021 — หาดทรายศรีโคตรบูร

- **English/alt name:** Si Khotrabun Sandbar / Mekong Sand Beach
- **Category:** `seasonal_nature_river`
- **District/area:** ริมแม่น้ำโขง อ.เมืองนครพนม
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P2`
- **Primary activity:** ชมสันทรายกลางแม่น้ำโขงตามฤดูกาล / ถ่ายภาพธรรมชาติ
- **Activity list:** เดินเล่นและถ่ายภาพหาดทราย, ชมปรากฏการณ์น้ำโขงลดระดับ, พักผ่อนริมแม่น้ำ, จัดเป็น seasonal activity ในระบบ search
- **Intent tags:** หาดทราย, ธรรมชาติ, ริมโขง, seasonal, กุมภาพันธ์, มีนาคม, เมษายน, พฤษภาคม, ถ่ายรูป
- **Example user queries:** "อยากเห็นหาดทรายกลางโขง", "เที่ยวธรรมชาติในเมืองนครพนม", "เดือนเมษายนเที่ยวไหน"
- **Recommended audience:** ครอบครัว, คู่รัก, สายถ่ายรูป, คนชอบธรรมชาติ
- **Suggested duration:** 30–90 นาที
- **Best time:** ก.พ.–พ.ค. และช่วงเช้าหรือเย็น
- **Route-fit tags:** seasonal_route, riverside_route, photo_stop
- **Evidence summary:** บทความท่องเที่ยวระบุว่าหาดทรายศรีโคตรบูรเห็นได้เฉพาะช่วงประมาณกุมภาพันธ์ถึงพฤษภาคมเมื่อระดับน้ำโขงลดลง
- **Data confidence:** `MEDIUM`
- **Source URLs:** Traveloka 25 Places
- **Search text blob:** หาดทรายศรีโคตรบูร หาดทรายกลางโขง กุมภาพันธ์ มีนาคม เมษายน พฤษภาคม seasonal ธรรมชาติ ถ่ายรูป
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-022 — Street Art ย่านเมืองเก่า

- **English/alt name:** Nakhon Phanom Street Art / Old Town Murals
- **Category:** `photo_oldtown_cafe`
- **District/area:** อ.เมืองนครพนม ย่านเมืองเก่าและริมโขง
- **Route cluster:** `city_architecture_route`
- **Default priority:** `P2`
- **Primary activity:** เดินถ่ายภาพสตรีทอาร์ต / แวะคาเฟ่ / ชมตึกเก่า
- **Activity list:** เดินหา mural และกำแพงศิลปะ, ถ่ายภาพกับอาคารเก่า, แวะคาเฟ่/ร้านท้องถิ่น, เชื่อมต่อหอนาฬิกาและถนนคนเดิน
- **Intent tags:** street art, ถ่ายรูป, คาเฟ่, วัยรุ่น, เมืองเก่า, เดินเล่น, คู่รัก
- **Example user queries:** "อยากถ่ายรูปชิคๆ ในนครพนม", "มี street art ไหม", "เดินเมืองเก่ากับคาเฟ่"
- **Recommended audience:** วัยรุ่น, คู่รัก, กลุ่มเพื่อน, สายคาเฟ่, สายถ่ายรูป
- **Suggested duration:** 60–120 นาที
- **Best time:** เช้าหรือบ่ายแก่
- **Route-fit tags:** city_architecture_route, cafe_hopping, photo_walk
- **Evidence summary:** บทความท่องเที่ยวระบุว่าเป็นถนนสายอาร์ตและจุดถ่ายรูปกับตึกรามบ้านช่องเก่าริมแม่น้ำโขง มีคาเฟ่หลายแห่งในแนวเส้นทาง
- **Data confidence:** `LOW_TO_MEDIUM`
- **Source URLs:** Traveloka 25 Places
- **Search text blob:** street art นครพนม เมืองเก่า ถ่ายรูป กำแพงศิลปะ คาเฟ่ ริมโขง วัยรุ่น
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-023 — หอสมุดแห่งชาตินครพนม

- **English/alt name:** Nakhon Phanom National Library
- **Category:** `library_architecture_photo_learning`
- **District/area:** อ.เมืองนครพนม
- **Route cluster:** `city_architecture_route`
- **Default priority:** `P3`
- **Primary activity:** ถ่ายภาพอาคารเก่า / อ่านหนังสือ / จุดพักเงียบในเมือง
- **Activity list:** ถ่ายภาพอาคารสีเหลืองสไตล์เก่า, อ่านหนังสือหรือค้นคว้าข้อมูลท้องถิ่น, ใช้เป็นจุดพักในทริปเมืองเก่า, เชื่อมต่อพิพิธภัณฑ์จวนผู้ว่าฯ
- **Intent tags:** หอสมุด, อ่านหนังสือ, ถ่ายรูป, อาคารเก่า, เมืองเก่า, เงียบ, เรียนรู้
- **Example user queries:** "อยากหาที่เงียบๆ ในตัวเมือง", "จุดถ่ายรูปอาคารเก่า", "หอสมุดนครพนม"
- **Recommended audience:** นักเรียน, สายอ่าน, สายถ่ายรูป, คนชอบเมืองเก่า
- **Suggested duration:** 30–90 นาที
- **Best time:** กลางวัน
- **Route-fit tags:** city_architecture_route, quiet_activity
- **Evidence summary:** บทความท่องเที่ยวระบุว่าเป็นอาคารเก่าสไตล์เรอเนสซองส์สีเหลืองและเก็บสิ่งพิมพ์โบราณ/หนังสือหลายประเภท
- **Data confidence:** `LOW_TO_MEDIUM`
- **Source URLs:** Traveloka 25 Places
- **Search text blob:** หอสมุดแห่งชาตินครพนม หอสมุด ถ่ายรูป อาคารเก่า สีเหลือง อ่านหนังสือ เมืองเก่า
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-024 — อุทยานแห่งชาติภูลังกา

- **English/alt name:** Phu Langka National Park
- **Category:** `national_park_nature_trekking`
- **District/area:** อ.บ้านแพง / แนวพื้นที่ภูลังกา
- **Route cluster:** `north_nature_route`
- **Default priority:** `P1`
- **Primary activity:** เดินป่า / ศึกษาธรรมชาติ / ชมน้ำตก / ไหว้พระธาตุภูลังกา
- **Activity list:** เดินศึกษาธรรมชาติระยะสั้นหรือระยะยาว, ชมน้ำตกและพืชพรรณ, ขึ้นจุดชมวิวเมื่อสภาพอากาศเหมาะสม, ไหว้พระธาตุ/เจดีย์บนยอดเขาตาม route ที่เปิด, เชื่อมต่อถ้ำนาคีและน้ำตกตาดโพธิ์
- **Intent tags:** เดินป่า, ธรรมชาติ, น้ำตก, ภูเขา, แอดเวนเจอร์, สายมู, ภูลังกา, ถ้ำนาคี
- **Example user queries:** "อยากเที่ยวธรรมชาตินครพนม", "อยากเดินป่า", "มีน้ำตกไหม", "ไปถ้ำนาคีต้องไปอุทยานไหน"
- **Recommended audience:** สายธรรมชาติ, กลุ่มเพื่อน, สายแอดเวนเจอร์, คนแข็งแรง
- **Suggested duration:** ครึ่งวัน–เต็มวัน
- **Best time:** เช้า; ตรวจประกาศอุทยานก่อนเดินทาง
- **Route-fit tags:** nature_route, hiking_route, requires_planning
- **Evidence summary:** ททท. ระบุว่า Phu Langka National Park อยู่ใน อ.บ้านแพง นครพนม มีพืชพรรณหลากหลายและอากาศเย็นตลอดปี; บทความท่องเที่ยวระบุว่ามีเส้นทางธรรมชาติ น้ำตก และพระธาตุภูลังกา
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Phu Langka, TAT Province, Traveloka 25 Places
- **Search text blob:** อุทยานแห่งชาติภูลังกา บ้านแพง เดินป่า ธรรมชาติ น้ำตก ถ้ำนาคี ภูเขา พระธาตุภูลังกา adventure
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-025 — ถ้ำนาคี

- **English/alt name:** Nakee Cave / Tham Nakee
- **Category:** `nature_unseen_spiritual_hiking`
- **District/area:** พื้นที่อุทยานแห่งชาติภูลังกา
- **Route cluster:** `north_nature_route`
- **Default priority:** `P1`
- **Primary activity:** เดินชมปรากฏการณ์หินคล้ายเกล็ดพญานาค / สายธรรมชาติและสายมู
- **Activity list:** เดินเส้นทางธรรมชาติไปถ้ำนาคี, ถ่ายภาพลวดลายหินคล้ายเกล็ดพญานาค, เรียนรู้ปรากฏการณ์หินและมอสส์ในพื้นที่, ใช้เป็นกิจกรรมสายมูธรรมชาติ
- **Intent tags:** ถ้ำนาคี, พญานาค, เดินป่า, ธรรมชาติ, unseen, สายมู, ถ่ายรูป
- **Example user queries:** "อยากไปถ้ำนาคี", "ที่เที่ยว unseen นครพนม", "สายมูธรรมชาติไปไหน", "เดินป่าพญานาค"
- **Recommended audience:** สายธรรมชาติ, สายมู, กลุ่มเพื่อน, คนสุขภาพพร้อม
- **Suggested duration:** ครึ่งวัน–เต็มวัน
- **Best time:** เช้า; ตรวจข้อกำหนดอุทยานและสภาพอากาศ
- **Route-fit tags:** nature_route, requires_booking_or_rules_check, hiking_route
- **Evidence summary:** เว็บไซต์จังหวัดมีหมวดกิจกรรม/วัฒนธรรมที่กล่าวถึงถ้ำนาคี และบทความท่องเที่ยวระบุว่าอยู่ในพื้นที่อุทยานแห่งชาติภูลังกา มีลวดลายหินจากปรากฏการณ์ธรรมชาติคล้ายเกล็ดพญานาค
- **Data confidence:** `MEDIUM`
- **Source URLs:** Nakhon Phanom Province Travel, Traveloka 25 Places
- **Search text blob:** ถ้ำนาคี นครพนม ภูลังกา เกล็ดพญานาค หิน มอสส์ เดินป่า unseen สายมู ธรรมชาติ
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-026 — น้ำตกตาดโพธิ์

- **English/alt name:** Tat Pho Waterfall
- **Category:** `waterfall_nature`
- **District/area:** พื้นที่ภูลังกา/อ.บ้านแพง
- **Route cluster:** `north_nature_route`
- **Default priority:** `P2`
- **Primary activity:** ชมน้ำตก / เดินศึกษาธรรมชาติ / ถ่ายภาพป่าฤดูฝน
- **Activity list:** ชมน้ำตกหลายชั้น, เดินเล่นและถ่ายภาพธรรมชาติ, พักผ่อนในพื้นที่ป่า, จัดเป็น seasonal nature activity ในช่วงน้ำมาก
- **Intent tags:** น้ำตก, ฤดูฝน, ธรรมชาติ, ถ่ายรูป, ป่า, ครอบครัว, แอดเวนเจอร์
- **Example user queries:** "นครพนมมีน้ำตกไหม", "เที่ยวธรรมชาติหน้าฝน", "น้ำตกใกล้ภูลังกา"
- **Recommended audience:** สายธรรมชาติ, ครอบครัว, กลุ่มเพื่อน, สายถ่ายรูป
- **Suggested duration:** 60–180 นาที
- **Best time:** ฤดูฝน–ต้นฤดูหนาว; เช้า
- **Route-fit tags:** nature_route, seasonal_route, requires_weather_check
- **Evidence summary:** บทความท่องเที่ยวระบุว่าน้ำตกตาดโพธิ์มีต้นน้ำจากห้วยลังกา แบ่งเป็น 4 ชั้น และช่วงฤดูฝนน้ำมากสวยที่สุด
- **Data confidence:** `MEDIUM`
- **Source URLs:** Traveloka 25 Places
- **Search text blob:** น้ำตกตาดโพธิ์ ภูลังกา บ้านแพง น้ำตก 4 ชั้น ฤดูฝน ธรรมชาติ ถ่ายรูป
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-027 — พระมหาธาตุเจดีย์โฆสปัญโญศรีพนม

- **English/alt name:** Phra Maha That Chedi Khosapanyo Sri Phanom
- **Category:** `spiritual_new_landmark`
- **District/area:** วัดโฆสมังคลาราม
- **Route cluster:** `city_or_suburban_spiritual_route`
- **Default priority:** `P3`
- **Primary activity:** ชมเจดีย์ขนาดใหญ่ / ถ่ายภาพ / ปฏิบัติธรรม
- **Activity list:** ชมเจดีย์ขนาดใหญ่, ถ่ายภาพสถาปัตยกรรมศาสนา, ทำบุญหรือปฏิบัติธรรมตามโอกาส, ใช้เป็นจุดเพิ่มในทริปสายบุญเมื่อมีเวลา
- **Intent tags:** เจดีย์ใหญ่, วัดใหม่, ปฏิบัติธรรม, ถ่ายรูป, สายบุญ, แลนด์มาร์กใหม่
- **Example user queries:** "อยากดูเจดีย์ใหญ่ในนครพนม", "สายบุญมีที่ใหม่ไหม", "วัดถ่ายรูปสวย"
- **Recommended audience:** สายบุญ, สายถ่ายรูป, ครอบครัว
- **Suggested duration:** 30–75 นาที
- **Best time:** เช้าหรือเย็น
- **Route-fit tags:** optional_spiritual_stop, photo_stop
- **Evidence summary:** บทความท่องเที่ยวระบุว่าเจดีย์ตั้งอยู่ในวัดโฆสมังคลาราม มีขนาดใหญ่และใช้เป็นสถานที่ปฏิบัติธรรม/พิพิธภัณฑ์ทางศาสนา
- **Data confidence:** `LOW_TO_MEDIUM`
- **Source URLs:** Traveloka 25 Places
- **Search text blob:** พระมหาธาตุเจดีย์โฆสปัญโญศรีพนม วัดโฆสมังคลาราม เจดีย์ใหญ่ ถ่ายรูป ปฏิบัติธรรม สายบุญ
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-028 — พระบางวัดไตรภูมิ

- **English/alt name:** Pra Bang Wat Trai Poom
- **Category:** `spiritual_buddha_image`
- **District/area:** อ.ท่าอุเทน
- **Route cluster:** `north_riverside_spiritual_route`
- **Default priority:** `P3`
- **Primary activity:** ไหว้พระบาง / วัดสำคัญในท่าอุเทน
- **Activity list:** สักการะพระบาง, แวะวัดใน route ท่าอุเทน, เรียนรู้พระพุทธรูปและศิลปะท้องถิ่น, เชื่อมต่อพระธาตุท่าอุเทน
- **Intent tags:** พระบาง, ท่าอุเทน, ไหว้พระ, วัด, พระพุทธรูป, สายบุญ
- **Example user queries:** "เที่ยวท่าอุเทนไหว้วัดไหนดี", "พระบางนครพนมอยู่ไหน", "เส้นทางวัดท่าอุเทน"
- **Recommended audience:** สายบุญ, ครอบครัว, ผู้สูงอายุ
- **Suggested duration:** 20–45 นาที
- **Best time:** เช้าหรือบ่าย
- **Route-fit tags:** tha_uthen_pairing, spiritual_stop
- **Evidence summary:** ททท. มีหน้าสถานที่ Pra Bang Wat Trai Poom และระบุว่าอยู่ในอำเภอท่าอุเทน จังหวัดนครพนม
- **Data confidence:** `MEDIUM`
- **Source URLs:** TAT Province
- **Search text blob:** พระบาง วัดไตรภูมิ ท่าอุเทน ไหว้พระ พระพุทธรูป วัดนครพนม
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-029 — วัดดอนนางหงส์ / พระธาตุดอนนางหงส์

- **English/alt name:** Wat Don Nang Hong
- **Category:** `spiritual_local_stupa`
- **District/area:** พื้นที่บ้านดอนนางหงส์
- **Route cluster:** `south_spiritual_route`
- **Default priority:** `P3`
- **Primary activity:** ไหว้พระธาตุท้องถิ่น / แวะในเส้นทางพระธาตุบริวาร
- **Activity list:** สักการะพระธาตุดอนนางหงส์, เรียนรู้วัดท้องถิ่นในกลุ่มพระธาตุ, ถ่ายภาพเจดีย์, ใช้เป็น stop เสริมเมื่อทำ route สายพระธาตุแบบละเอียด
- **Intent tags:** พระธาตุ, วัดท้องถิ่น, ดอนนางหงส์, สายบุญ, พระธาตุบริวาร
- **Example user queries:** "อยากไหว้พระธาตุเพิ่มเติมนอกจาก 8 แห่ง", "วัดดอนนางหงส์มีอะไร", "เส้นทางพระธาตุนครพนมแบบลึก"
- **Recommended audience:** สายบุญจริงจัง, นักท่องเที่ยวเชิงวัฒนธรรม, ผู้สูงอายุ
- **Suggested duration:** 20–45 นาที
- **Best time:** เช้าหรือบ่าย
- **Route-fit tags:** advanced_spiritual_route, local_stop
- **Evidence summary:** ททท. มีหน้าสถานที่ Wat Don Nanghong และระบุว่ามีพระบรมธาตุเจดีย์สูง 32 เมตร
- **Data confidence:** `LOW_TO_MEDIUM`
- **Source URLs:** TAT Province
- **Search text blob:** วัดดอนนางหงส์ พระธาตุดอนนางหงส์ พระบรมธาตุเจดีย์ พระธาตุบริวาร ไหว้พระ
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-030 — Mekong River Eye

- **English/alt name:** Mekong River Eye Ferris Wheel
- **Category:** `new_landmark_viewpoint`
- **District/area:** ตัวเมืองนครพนม ริมแม่น้ำโขง
- **Route cluster:** `city_riverside_core`
- **Default priority:** `P3`
- **Primary activity:** ขึ้นชิงช้าสวรรค์ชมวิวโขง / ถ่ายภาพมุมสูง
- **Activity list:** ชมวิวแม่น้ำโขงจากมุมสูง, ถ่ายภาพแลนด์มาร์กใหม่, ใช้เป็นกิจกรรมครอบครัว/คู่รักตอนเย็น, เชื่อมต่อถนนคนเดินและลานริมโขง
- **Intent tags:** ชิงช้าสวรรค์, วิวสูง, ริมโขง, ครอบครัว, คู่รัก, กลางคืน, แลนด์มาร์กใหม่
- **Example user queries:** "อยากชมวิวโขงมุมสูง", "นครพนมมีกิจกรรมกลางคืนอะไรใหม่", "พาเด็กขึ้นชิงช้าสวรรค์"
- **Recommended audience:** ครอบครัว, คู่รัก, เด็ก, สายถ่ายรูป
- **Suggested duration:** 30–60 นาที
- **Best time:** เย็นถึงค่ำ
- **Route-fit tags:** evening_anchor, family_activity, photo_stop
- **Evidence summary:** เว็บไซต์จังหวัดนครพนมมี snippet กล่าวถึง Mekong River Eye เป็นชิงช้าสวรรค์แลนด์มาร์กใหม่สำหรับชมทัศนียภาพแม่น้ำโขงจากมุมสูง; ต้องตรวจสอบสถานะเปิดให้บริการล่าสุดก่อนนำขึ้น production
- **Data confidence:** `LOW_TO_MEDIUM`
- **Source URLs:** Nakhon Phanom Province Travel
- **Search text blob:** Mekong River Eye ชิงช้าสวรรค์ นครพนม ริมโขง วิวมุมสูง แลนด์มาร์กใหม่ ครอบครัว คู่รัก กลางคืน
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-031 — ชุมชนบ้านนาจอก / ชุมชนไทย-เวียดนาม

- **English/alt name:** Ban Na Chok Thai–Vietnamese Community
- **Category:** `community_culture_food_history`
- **District/area:** บ้านนาจอก อ.เมืองนครพนม
- **Route cluster:** `vietnamese_history_route`
- **Default priority:** `P2`
- **Primary activity:** เดินชุมชน / เรียนรู้วัฒนธรรมไทย-เวียดนาม / กินอาหารเวียดนาม
- **Activity list:** เดินชุมชนบ้านนาจอก, เรียนรู้วัฒนธรรมไทย-เวียดนาม, เชื่อมกับบ้านโฮจิมินห์, กินอาหาร/ของว่างเวียดนามในพื้นที่, เหมาะสำหรับ community-based tourism
- **Intent tags:** ชุมชน, เวียดนาม, อาหารเวียดนาม, ประวัติศาสตร์, บ้านนาจอก, ครอบครัว, เรียนรู้
- **Example user queries:** "อยากเที่ยวชุมชนเวียดนาม", "บ้านนาจอกมีอะไร", "เที่ยวแบบเรียนรู้วัฒนธรรม"
- **Recommended audience:** ครอบครัว, นักเรียน, นักท่องเที่ยวต่างชาติ, คนสนใจชุมชน
- **Suggested duration:** 60–150 นาที
- **Best time:** เช้าหรือบ่าย
- **Route-fit tags:** vietnamese_history_route, community_route
- **Evidence summary:** บ้านนาจอกเป็นพื้นที่ของบ้านโฮจิมินห์ตามข้อมูล ททท.; สามารถต่อยอดเป็น activity ชุมชนไทย-เวียดนามโดยอิงแหล่งประวัติศาสตร์และอาหารเวียดนามในนครพนม
- **Data confidence:** `MEDIUM`
- **Source URLs:** TAT Ho Chi Minh House, Traveloka 25 Places
- **Search text blob:** บ้านนาจอก ชุมชนไทยเวียดนาม ลุงโฮ โฮจิมินห์ อาหารเวียดนาม วัฒนธรรม ประวัติศาสตร์
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-032 — ชุมชนเรณูนคร / สินค้า OTOP และวัฒนธรรมผู้ไท

- **English/alt name:** Renu Nakhon Cultural & OTOP Stop
- **Category:** `community_culture_otop`
- **District/area:** อ.เรณูนคร
- **Route cluster:** `south_spiritual_route`
- **Default priority:** `P2`
- **Primary activity:** ซื้อสินค้า OTOP / เรียนรู้วัฒนธรรมชุมชน / ต่อจากพระธาตุเรณู
- **Activity list:** แวะซื้อสินค้า OTOP รอบพระธาตุเรณู, เรียนรู้วัฒนธรรมผู้ไท/เรณูนคร, ถ่ายภาพชุมชน, กินอาหารหรือของฝากท้องถิ่น
- **Intent tags:** OTOP, ของฝาก, เรณูนคร, ผู้ไท, วัฒนธรรม, ครอบครัว, ชุมชน
- **Example user queries:** "ไปพระธาตุเรณูแล้วทำอะไรต่อ", "ซื้อของฝากเรณูนคร", "อยากเที่ยววัฒนธรรมผู้ไท"
- **Recommended audience:** ครอบครัว, ผู้สูงอายุ, สายของฝาก, นักท่องเที่ยววัฒนธรรม
- **Suggested duration:** 30–90 นาที
- **Best time:** กลางวัน
- **Route-fit tags:** that_renu_pairing, community_route, shopping_stop
- **Evidence summary:** บทความท่องเที่ยวระบุว่ารอบพระธาตุเรณูมีร้าน OTOP ให้แวะซื้อของฝาก; ควรเพิ่มข้อมูลร้าน/ชุมชนจริงจากภาคสนามก่อน production
- **Data confidence:** `LOW_TO_MEDIUM`
- **Source URLs:** Traveloka 25 Places
- **Search text blob:** เรณูนคร OTOP ผู้ไท วัฒนธรรม ของฝาก พระธาตุเรณู ชุมชน
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-ACT-033 — BlueGold Coffee / กาแฟขี้ชะมด

- **English/alt name:** BlueGold Coffee
- **Category:** `cafe_agrotourism`
- **District/area:** นครพนม
- **Route cluster:** `special_interest_route`
- **Default priority:** `P3`
- **Primary activity:** ชิมกาแฟ / คาเฟ่ / เรียนรู้ผลิตภัณฑ์กาแฟขี้ชะมด
- **Activity list:** ชิมกาแฟ, ถ่ายภาพคาเฟ่, เรียนรู้เรื่องกาแฟขี้ชะมดและการเลี้ยงชะมด, ใช้เป็น stop สำหรับสายคาเฟ่และของฝากเฉพาะทาง
- **Intent tags:** กาแฟ, คาเฟ่, กาแฟขี้ชะมด, ของฝาก, ถ่ายรูป, specialty coffee
- **Example user queries:** "อยากไปคาเฟ่แปลกๆ", "กาแฟขี้ชะมดนครพนมอยู่ไหน", "ของฝาก premium"
- **Recommended audience:** สายคาเฟ่, คู่รัก, กลุ่มเพื่อน, ผู้ใหญ่
- **Suggested duration:** 45–90 นาที
- **Best time:** สายถึงบ่าย
- **Route-fit tags:** cafe_hopping, special_interest_stop
- **Evidence summary:** บทความท่องเที่ยวระบุว่า BlueGold Coffee เป็นทั้งสถานที่ท่องเที่ยวและคาเฟ่เกี่ยวกับกาแฟขี้ชะมด; ต้องตรวจสอบเวลาเปิด-ปิดก่อนใช้งานจริง
- **Data confidence:** `LOW_TO_MEDIUM`
- **Source URLs:** Traveloka 25 Places
- **Search text blob:** BlueGold Coffee กาแฟขี้ชะมด คาเฟ่ นครพนม specialty coffee ของฝาก ถ่ายรูป
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-FOOD-034 — ข้าวเกรียบปากหม้อศรีเทพ

- **English/alt name:** Sri Thep Pak Mor / Sri Thep Vietnamese Dumplings
- **Category:** `food_vietnamese_breakfast`
- **District/area:** อ.เมืองนครพนม ถนนศรีเทพ
- **Route cluster:** `city_food_route`
- **Default priority:** `P1`
- **Primary activity:** กินปากหม้อเวียดนาม / อาหารเช้า / ของกินขึ้นชื่อ
- **Activity list:** กินปากหม้อไส้หมู, กินปากหม้องาดำ, เรียนรู้รสชาติอาหารเวียดนามนครพนม, จัดเป็น breakfast activity ก่อนเที่ยวเมือง
- **Intent tags:** อาหารเวียดนาม, ปากหม้อ, อาหารเช้า, ศรีเทพ, must eat, ของกินดัง
- **Example user queries:** "อยากกินปากหม้อศรีเทพ", "อาหารเช้านครพนมกินอะไร", "ร้านเวียดนามดังในนครพนม"
- **Recommended audience:** สายกิน, ครอบครัว, นักท่องเที่ยวครั้งแรก
- **Suggested duration:** 30–60 นาที
- **Best time:** เช้า; ททท. ระบุเวลาหลัก 06:30–13:00 และรอบบ่ายบางวัน
- **Route-fit tags:** breakfast_anchor, city_food_route, before_city_walk
- **Evidence summary:** Foodie Map ของ ททท. ระบุ Sri Thep Vietnamese Dumplings เป็นร้าน 30 ปี ได้อิทธิพลอาหารเวียดนาม จุดเด่นคือแป้งทำมือและน้ำจิ้มรสจัด เมนูแนะนำคือปากหม้อและปากหม้องาดำ; เว็บไซต์จังหวัดมีข้อมูลตำแหน่งและเวลาเปิด-ปิด
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Foodie Map, Nakhon Phanom Province Food
- **Search text blob:** ศรีเทพปากหม้อ ข้าวเกรียบปากหม้อศรีเทพ อาหารเวียดนาม ปากหม้อ งาดำ อาหารเช้า นครพนม must eat
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-FOOD-035 — ก๋วยเตี๋ยวหมูปลาโพธิ์ลูกโซ่

- **English/alt name:** Kuay Teow Moo Pla Pho Luk Song
- **Category:** `food_local_fish_noodle`
- **District/area:** นครพนม
- **Route cluster:** `city_food_route`
- **Default priority:** `P1`
- **Primary activity:** กินก๋วยเตี๋ยวปลาโพ / อาหารปลาแม่น้ำโขง
- **Activity list:** กินก๋วยเตี๋ยวปลาโพ, กินปลาโพต้มจิ้มน้ำจิ้ม, เรียนรู้วัตถุดิบปลาน้ำจืดจากวิถีริมโขง, ใช้เป็นมื้อเช้าถึงเที่ยง
- **Intent tags:** ก๋วยเตี๋ยว, ปลาโพ, อาหารท้องถิ่น, แม่น้ำโขง, must eat, มื้อเช้า
- **Example user queries:** "อยากกินปลาแม่น้ำโขง", "ร้านก๋วยเตี๋ยวดังนครพนม", "อาหารท้องถิ่นที่ไม่ใช่เวียดนาม"
- **Recommended audience:** สายกิน, ครอบครัว, ผู้ใหญ่, นักท่องเที่ยวเชิงอาหาร
- **Suggested duration:** 30–60 นาที
- **Best time:** เช้าถึงเที่ยง; ททท. ระบุเปิด 08:00–12:00
- **Route-fit tags:** breakfast_or_lunch, foodie_route
- **Evidence summary:** Foodie Map ของ ททท. ระบุว่าร้านนี้ได้รับแรงบันดาลใจจากวิถีริมโขงและใช้ปลาโพเป็นเมนูเด่น; เมนูแนะนำคือก๋วยเตี๋ยวปลาโพและปลาโพต้มจิ้มน้ำจิ้ม
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Foodie Map
- **Search text blob:** ก๋วยเตี๋ยวหมูปลาโพธิ์ลูกโซ่ ปลาโพ ก๋วยเตี๋ยวปลา น้ำจืด แม่น้ำโขง อาหารท้องถิ่น must eat
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-FOOD-036 — ครัวเวียดนาม นครพนม

- **English/alt name:** Vietnamese Kitchen Nakhon Phanom
- **Category:** `food_vietnamese_family`
- **District/area:** อ.เมืองนครพนม ถนนบำรุงเมือง
- **Route cluster:** `city_food_route`
- **Default priority:** `P1`
- **Primary activity:** กินอาหารเวียดนามแบบครอบครัว / มื้อกลางวันหรือเย็น
- **Activity list:** กินแหนมเนือง เปาะเปี๊ยะ กวยจั๊บญวนหรือเมนูเวียดนาม, จัดเป็นมื้อหลักของทริป, เหมาะกับกลุ่มครอบครัว, เชื่อมกับ route ประวัติศาสตร์เวียดนาม
- **Intent tags:** อาหารเวียดนาม, แหนมเนือง, ครอบครัว, มื้อเย็น, must eat, เวียดนาม
- **Example user queries:** "อยากกินอาหารเวียดนามนครพนม", "พาครอบครัวกินร้านไหนดี", "ร้านดังตัวเมืองนครพนม"
- **Recommended audience:** ครอบครัว, กลุ่มเพื่อน, ผู้ใหญ่, นักท่องเที่ยวครั้งแรก
- **Suggested duration:** 60–90 นาที
- **Best time:** กลางวันหรือเย็น
- **Route-fit tags:** lunch_dinner_anchor, vietnamese_history_route, city_food_route
- **Evidence summary:** Foodie Map ของ ททท. ระบุ Vietnamese Kitchen เป็นหนึ่งใน Must Eat restaurants ของนครพนม; เว็บไซต์จังหวัดระบุที่ตั้งถนนบำรุงเมืองและเวลาเปิด-ปิด 10:00–23:00
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Foodie Map, Nakhon Phanom Province Food
- **Search text blob:** ครัวเวียดนาม นครพนม Vietnamese Kitchen แหนมเนือง เปาะเปี๊ยะ กวยจั๊บญวน ครอบครัว must eat
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-FOOD-037 — ขนมจีนพิศมัย

- **English/alt name:** Khanom Jeen Pisamai
- **Category:** `food_local_noodle_renu`
- **District/area:** อ.เรณูนคร
- **Route cluster:** `south_food_spiritual_route`
- **Default priority:** `P2`
- **Primary activity:** กินขนมจีน/น้ำปลาร้าเรณูนคร / จับคู่พระธาตุเรณู
- **Activity list:** กินขนมจีนน้ำกะปิปลาร้า, แวะมื้อกลางวันในเส้นทางเรณูนคร, สัมผัสอาหารท้องถิ่นเรณูนคร, เชื่อมกับพระธาตุเรณูและ OTOP
- **Intent tags:** ขนมจีน, ปลาร้า, เรณูนคร, อาหารท้องถิ่น, มื้อกลางวัน, must eat
- **Example user queries:** "ไปเรณูนครกินอะไร", "ขนมจีนพิศมัยอยู่ไหน", "กินอาหารท้องถิ่นหลังไหว้พระธาตุเรณู"
- **Recommended audience:** สายกิน, ครอบครัว, ผู้ใหญ่, นักท่องเที่ยวสายท้องถิ่น
- **Suggested duration:** 30–60 นาที
- **Best time:** เช้าถึงเย็น; ททท. ระบุเปิด 08:00–19:00
- **Route-fit tags:** that_renu_pairing, lunch_stop, foodie_route
- **Evidence summary:** Foodie Map ของ ททท. ระบุว่าขนมจีนพิศมัยเปิดตั้งแต่ปี 1998 และเชี่ยวชาญเมนูขนมจีนน้ำปลาร้าในอำเภอเรณูนคร; เมนูแนะนำคือขนมจีนน้ำกะปิปลาร้า
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Foodie Map
- **Search text blob:** ขนมจีนพิศมัย เรณูนคร ขนมจีน น้ำปลาร้า น้ำกะปิปลาร้า อาหารท้องถิ่น พระธาตุเรณู
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-FOOD-038 — ยัดลาบเป็ด

- **English/alt name:** Yat Larb Ped
- **Category:** `food_isan_duck_larb`
- **District/area:** นครพนม
- **Route cluster:** `city_food_route`
- **Default priority:** `P2`
- **Primary activity:** กินลาบเป็ดและอาหารอีสาน / มื้อเย็นจริงจัง
- **Activity list:** กินลาบเป็ดสูตรร้าน, กินอ่อมหรืออาหารอีสาน, จัดเป็น dinner activity หลังเที่ยวริมโขง, เหมาะกับกลุ่มผู้ใหญ่หรือสายอาหารรสจัด
- **Intent tags:** ลาบเป็ด, อาหารอีสาน, มื้อเย็น, รสจัด, must eat, กับข้าว
- **Example user queries:** "อยากกินลาบเป็ดนครพนม", "ร้านอาหารอีสานดัง", "มื้อเย็นกับผู้ใหญ่ไปไหนดี"
- **Recommended audience:** ผู้ใหญ่, กลุ่มเพื่อน, สายกินอีสาน, ครอบครัว
- **Suggested duration:** 60–90 นาที
- **Best time:** กลางวันถึงค่ำ; ททท. ระบุเปิด 10:00–21:30
- **Route-fit tags:** dinner_anchor, foodie_route
- **Evidence summary:** Foodie Map ของ ททท. ระบุ Yat Larb Ped เป็น Must Eat restaurant ใช้วัตถุดิบสดจากเกษตรกรท้องถิ่นและมีเมนูแนะนำลาบเป็ดขาวกับอ่อมกระบอกหมู
- **Data confidence:** `HIGH`
- **Source URLs:** TAT Foodie Map
- **Search text blob:** ยัดลาบเป็ด ลาบเป็ด อาหารอีสาน นครพนม มื้อเย็น รสจัด must eat
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-FOOD-039 — โอไฮโอ้

- **English/alt name:** The OHIO Restaurant
- **Category:** `food_night_restaurant`
- **District/area:** อ.เมืองนครพนม สี่แยกธนาคารออมสิน
- **Route cluster:** `city_food_route`
- **Default priority:** `P3`
- **Primary activity:** กินอาหารกลางคืน / ร้านเปิดดึก
- **Activity list:** กินอาหารไทย/อีสานช่วงกลางคืน, ใช้เป็น fallback หลังถนนคนเดินหรือเที่ยวเย็น, เหมาะกับกลุ่มเพื่อนและผู้ใหญ่ที่ต้องการร้านเปิดดึก
- **Intent tags:** เปิดดึก, มื้อดึก, อาหารไทย, อาหารอีสาน, ตัวเมือง, กลุ่มเพื่อน
- **Example user queries:** "นครพนมมีร้านเปิดดึกไหม", "หลังถนนคนเดินกินต่อที่ไหนดี", "ร้านอาหารกลางคืนในเมือง"
- **Recommended audience:** กลุ่มเพื่อน, ผู้ใหญ่, คนเที่ยวกลางคืน
- **Suggested duration:** 60–90 นาที
- **Best time:** เย็นถึงดึก
- **Route-fit tags:** late_night_food, walking_street_pairing
- **Evidence summary:** เว็บไซต์จังหวัดนครพนมมีหน้าร้านโอไฮโอ้ ระบุที่ตั้งและเวลาเปิดให้บริการทุกวัน 17:30–04:00
- **Data confidence:** `MEDIUM`
- **Source URLs:** Nakhon Phanom Province Food
- **Search text blob:** โอไฮโอ้ The OHIO นครพนม ร้านอาหารเปิดดึก มื้อดึก อาหารอีสาน ตัวเมือง
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-FOOD-040 — สบายดี@นครพนม

- **English/alt name:** Sabaidee @ Nakhon Phanom
- **Category:** `food_riverside_local`
- **District/area:** อ.เมืองนครพนม ถนนสุนทรวิจิตร
- **Route cluster:** `city_food_route`
- **Default priority:** `P3`
- **Primary activity:** กินอาหารริมโขง / ร้านในตัวเมือง
- **Activity list:** กินอาหารไทย/ท้องถิ่น, ใช้เป็นร้านสำหรับครอบครัวในตัวเมือง, ต่อจากกิจกรรมริมโขง, เหมาะกับผู้ใช้ที่ค้นหาอาหารใกล้ที่พักหรือใกล้ลานริมโขง
- **Intent tags:** ร้านอาหาร, ริมโขง, ครอบครัว, ตัวเมือง, อาหารไทย, มื้อเย็น
- **Example user queries:** "ร้านอาหารริมโขงใกล้ตัวเมือง", "พาครอบครัวกินข้าวนครพนม", "ร้านอาหารถนนสุนทรวิจิตร"
- **Recommended audience:** ครอบครัว, ผู้ใหญ่, กลุ่มเพื่อน
- **Suggested duration:** 60–90 นาที
- **Best time:** กลางวันหรือเย็น
- **Route-fit tags:** riverside_food, city_food_route
- **Evidence summary:** เว็บไซต์จังหวัดนครพนมมีหน้าร้านสบายดี@นครพนม ระบุที่ตั้งถนนสุนทรวิจิตรและเวลาเปิด-ปิด 10:00–22:00
- **Data confidence:** `MEDIUM`
- **Source URLs:** Nakhon Phanom Province Food
- **Search text blob:** สบายดี@นครพนม ร้านอาหารริมโขง ถนนสุนทรวิจิตร ครอบครัว มื้อเย็น อาหารไทย
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง

### NP-FOOD-041 — The Tree cafe' and restaurant

- **English/alt name:** The Tree Cafe and Restaurant
- **Category:** `food_cafe_riverside`
- **District/area:** นครพนม ริมแม่น้ำโขง
- **Route cluster:** `city_food_route`
- **Default priority:** `P3`
- **Primary activity:** กินอาหารไทย/อีสานริมโขง / คาเฟ่ / ถ่ายรูป
- **Activity list:** กินอาหารไทยและอีสาน, นั่งคาเฟ่ริมโขง, ถ่ายภาพร้านและวิว, ใช้เป็น stop สำหรับผู้ใช้ที่ค้นหาอาหาร+วิว
- **Intent tags:** คาเฟ่, ร้านอาหาร, ริมโขง, ถ่ายรูป, อาหารไทย, อาหารอีสาน
- **Example user queries:** "คาเฟ่ริมโขงนครพนม", "ร้านอาหารวิวดี", "อยากกินข้าวพร้อมถ่ายรูป"
- **Recommended audience:** คู่รัก, ครอบครัว, กลุ่มเพื่อน, สายคาเฟ่
- **Suggested duration:** 60–120 นาที
- **Best time:** บ่ายถึงเย็น
- **Route-fit tags:** cafe_hopping, riverside_food, photo_stop
- **Evidence summary:** เว็บไซต์จังหวัดนครพนมมีหน้าร้าน The Tree cafe' and restaurant ระบุว่าเป็นร้านอาหารไทย/อีสานริมแม่น้ำโขง เปิดทุกวัน 10:00–23:00
- **Data confidence:** `MEDIUM`
- **Source URLs:** Nakhon Phanom Province Food
- **Search text blob:** The Tree cafe restaurant นครพนม คาเฟ่ ร้านอาหารไทย อีสาน ริมโขง ถ่ายรูป วิวดี
- **Implementation notes:** ใช้เป็น searchable activity card และปรับคะแนนตาม intent/context ของผู้ใช้ เช่น เวลาเดินทาง ระยะทาง สภาพอากาศ จำนวนคนร่วมทริป และข้อจำกัดการเดินทาง



---

## 6. Example query-to-result mapping

### Query: "อยากขอลูก"

```yaml
detected_intent: fertility_blessing
must_include_terms: ["ขอลูก", "ขอมีบุตร", "ขอพร"]
recommended_result_order:
  - NP-ACT-001  # วัดพระธาตุพนมวรมหาวิหาร
  - NP-ACT-002  # พญาศรีสัตตนาคราช
  - NP-ACT-004  # วัดพระธาตุเรณู
  - NP-ACT-003  # ถนนคนเดินนครพนม ถ้าเป็นทริปเย็น/ค้างคืน
explanation_template: "ระบบแนะนำ {place} เป็นอันดับแรก เพราะตรงกับ intent '{intent}' และมี source confidence สูง เหมาะกับกิจกรรม {primary_activity}"
safety_note: "ข้อมูลนี้เป็นคำแนะนำตามความเชื่อและการท่องเที่ยว ไม่ใช่คำรับรองผลทางการแพทย์"
```

### Query: "พาแฟนไปถ่ายรูปริมโขงตอนเย็น"

```yaml
detected_intent: riverside_evening + photo_cafe + romantic
recommended_result_order:
  - NP-ACT-002  # พญาศรีสัตตนาคราช
  - NP-ACT-020  # ล่องเรือชมแม่น้ำโขง
  - NP-ACT-003  # ถนนคนเดินนครพนม
  - NP-FOOD-041 # The Tree cafe' and restaurant
```

### Query: "อยากกินอาหารเวียดนาม"

```yaml
detected_intent: food_trip + vietnamese_food
recommended_result_order:
  - NP-FOOD-034 # ข้าวเกรียบปากหม้อศรีเทพ
  - NP-FOOD-036 # ครัวเวียดนาม นครพนม
  - NP-ACT-013  # บ้านโฮจิมินห์ บ้านนาจอก
  - NP-ACT-031  # ชุมชนบ้านนาจอก
```

### Query: "ไปกับพ่อแม่ ไม่อยากเดินเยอะ"

```yaml
detected_intent: family + elderly + low_effort
recommended_result_order:
  - NP-ACT-001
  - NP-ACT-002
  - NP-ACT-003
  - NP-FOOD-036
filters:
  avoid:
    - hiking_route
    - requires_weather_check
```

### Query: "อยากเที่ยวธรรมชาติแบบ unseen"

```yaml
detected_intent: nature_adventure + unseen
recommended_result_order:
  - NP-ACT-025
  - NP-ACT-024
  - NP-ACT-026
  - NP-ACT-021
filters:
  require:
    - weather_check
    - opening_or_rule_check
```

---

## 7. Suggested SQL seed table columns

```sql
CREATE TABLE activity_seed (
  id UUID PRIMARY KEY,
  legacy_code TEXT UNIQUE NOT NULL,
  entity_type TEXT NOT NULL, -- activity | food | place
  name_th TEXT NOT NULL,
  name_en TEXT,
  category TEXT,
  district_area TEXT,
  route_cluster TEXT,
  default_priority TEXT,
  primary_activity TEXT,
  activity_list TEXT[],
  intent_tags TEXT[],
  example_user_queries TEXT[],
  recommended_audience TEXT[],
  suggested_duration TEXT,
  best_time TEXT,
  route_fit_tags TEXT[],
  evidence_summary TEXT,
  data_confidence TEXT,
  source_urls TEXT[],
  search_text_blob TEXT,
  opening_hours_text TEXT,
  hours_confidence TEXT, -- high | medium | low | unknown
  hours_source_type TEXT, -- official | facebook | map_listing | community | unknown
  hours_last_checked_at TIMESTAMP,
  implementation_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 8. Suggested JSON structure for API

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "legacy_code": "NP-ACT-001",
  "entity_type": "activity",
  "name_th": "วัดพระธาตุพนมวรมหาวิหาร",
  "category": "spiritual_landmark",
  "intent_tags": ["ขอลูก", "ขอพร", "สายมู", "ไหว้พระ"],
  "route_cluster": "south_spiritual_route",
  "default_priority": "P1",
  "data_confidence": "HIGH",
  "search_text_blob": "พระธาตุพนม ขอพร ขอลูก ไหว้พระธาตุ...",
  "opening_hours_text": null,
  "hours_confidence": "unknown",
  "hours_source_type": "unknown",
  "hours_last_checked_at": null
}
```

> Migration note: keep existing `NP-ACT-*` / `NP-FOOD-*` labels in markdown section titles for readability, but store them in `legacy_code` and use UUID in all API/database joins.
> Gate note: if query intent is activity-first, filter `entity_type=activity` before ranking to prevent food leakage.

---

## 9. Next-step checklist ก่อนขึ้น production

- [ ] ยืนยันพิกัด lat/lng ของทุก activity
- [ ] ยืนยันเวลาเปิด-ปิดล่าสุด
- [ ] เพิ่มค่าใช้จ่าย/ค่าเข้าชม/ค่าบริการ
- [ ] เพิ่มรูปภาพที่ใช้ได้ตามสิทธิ์
- [ ] เพิ่ม `accessibility_score` เช่น เดินน้อย/รถเข็น/ผู้สูงอายุ
- [ ] เพิ่ม `weather_sensitivity` เช่น ฝนตกแล้วไม่ควรไป
- [ ] เพิ่ม `seasonality` เช่น หาดทรายศรีโคตรบูรเหมาะ ก.พ.–พ.ค.
- [ ] เพิ่ม `parking_available`
- [ ] เพิ่ม `family_friendly_score`
- [ ] เพิ่ม `elderly_friendly_score`
- [ ] สร้าง embedding จาก `search_text_blob`
- [ ] ทดสอบ query ภาษาไทยแบบกำกวม เช่น "อยากไปที่ศักดิ์สิทธิ์", "พาแฟนไปมู", "พาแม่เที่ยว", "ขอลูก"
