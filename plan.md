# 🇹🇭 Regional Travel Guide AI (Thailand)

# แอปแนะนำการท่องเที่ยวแบบ AI สำหรับพื้นที่เฉพาะในประเทศไทย

---

## 🌍 Concept (แนวคิด)

**EN:**
A map-based travel guide for a single region in Thailand that combines:

- Landmark & local shop discovery (Google Maps-style)
- Activity recommendations
- Transportation guidance
- AI (LLM) verification for real-world data (opening hours, contacts)

**TH:**
แอปแนะนำการท่องเที่ยวใน “1 พื้นที่” ของประเทศไทย ที่รวม:

- แผนที่สถานที่ (คล้าย Google Maps)
- ร้านค้า / สถานที่สำคัญ
- กิจกรรมในพื้นที่
- คำแนะนำการเดินทาง
- AI สำหรับตรวจสอบข้อมูลจริง (เวลาเปิด-ปิด / ช่องทางติดต่อ)

> 🎯 Focus: Prevent tourist mistakes (ลดความผิดพลาดของนักท่องเที่ยว)

---

## 🧠 Problem (ปัญหา)

**EN:**

- Outdated opening hours
- Missing or incorrect contact info
- Confusing transportation
- Poor itinerary planning
- Information overload

**TH:**

- เวลาเปิด-ปิดไม่อัปเดต
- หาเบอร์ / Facebook ไม่เจอ
- ระบบขนส่งสับสน
- วางแผนผิดพลาด
- ข้อมูลเยอะเกินไป

---

## 🗺️ Core Features (ฟีเจอร์หลัก)

### 1. Map View (แผนที่)

**EN:**

- Display landmarks, shops, activities
- Show name, category, open status, distance

**TH:**

- แสดงหมุดสถานที่ ร้านค้า และกิจกรรม
- แสดงชื่อ ประเภท สถานะเปิด/ปิด และระยะทาง

---

### 2. Place Detail (หน้ารายละเอียดสถานที่)

**EN:**

- Name, description, location
- Opening hours + status
- Phone, Facebook, website
- Price range, visit duration
- Tags (indoor, food, photo spot)

**TH:**

- ชื่อ รายละเอียด ที่ตั้ง
- เวลาเปิด-ปิด + สถานะวันนี้
- เบอร์โทร Facebook เว็บไซต์
- ราคาโดยประมาณ เวลาเที่ยว
- tag เช่น indoor / food / ถ่ายรูป

---

## 🎯 3. Activity Guide (กิจกรรม)

**EN:**
Types:

- Food walk
- Cultural tour
- Workshop
- Cycling route
- Market exploration

Includes:

- Duration
- Price
- Best time
- Indoor/outdoor
- Related places
- Checklist

**TH:**
ประเภทกิจกรรม:

- เดินกิน (food walk)
- ทัวร์วัฒนธรรม
- workshop
- ปั่นจักรยาน
- เดินตลาด

ข้อมูล:

- ระยะเวลา
- ราคา
- เวลาที่เหมาะสม
- indoor / outdoor
- สถานที่ที่เกี่ยวข้อง
- checklist

---

## 🚆 4. Transportation Guide (การเดินทาง)

**EN:**

- Nearest MRT/BTS/pier
- Recommended transport modes
- Walking distance
- Taxi/Grab notes
- Traffic warnings
- Parking info

**TH:**

- MRT/BTS/ท่าเรือใกล้สุด
- วิธีเดินทางที่แนะนำ
- ระยะเดิน
- หมายเหตุ taxi/Grab
- เตือนรถติด
- ข้อมูลที่จอดรถ

---

## 🤖 5. AI Verification Assistant (AI ตรวจสอบข้อมูล)

**EN:**
User can ask:

- Is this place open today?
- What is the phone number?
- Is this the official Facebook?

Returns structured result:

- open status
- contact info
- confidence level

**TH:**
ผู้ใช้สามารถถาม:

- วันนี้เปิดไหม?
- เบอร์โทรคืออะไร?
- Facebook นี้ใช่ของจริงไหม?

AI จะตอบ:

- สถานะเปิด/ปิด
- ข้อมูลติดต่อ
- ระดับความมั่นใจ

Example:

{
"open_status": "likely_open",
"confidence": "medium",
"contact": {
"phone": "...",
"facebook": "..."
},
"needs_check": true
}

---

## 🟡 6. Verification Status (ความน่าเชื่อถือ)

**EN:**

- Verified
- Likely correct
- Needs check
- Unknown

**TH:**

- ยืนยันแล้ว
- น่าจะถูกต้อง
- ควรตรวจสอบ
- ไม่ทราบ

---

## 🔍 7. Search & Filter (ค้นหา)

**EN:**
Search:

- Name, category, tag

Filter:

- Open now
- Budget
- Indoor
- Walking distance
- Hidden gems

**TH:**
ค้นหา:

- ชื่อ ประเภท tag

Filter:

- เปิดตอนนี้
- ราคาถูก
- indoor
- เดินได้
- ร้าน local

---

## 📋 8. Checklist Generator (รายการเตรียมตัว)

**EN:**

- Bring cash
- Dress properly
- Bring umbrella
- Avoid peak hours

**TH:**

- เตรียมเงินสด
- แต่งกายเหมาะสม
- พกร่ม
- เลี่ยงช่วงคนเยอะ

---

## ⚙️ Tech Stack (เทคโนโลยี)

Frontend:

- React / Next.js
- Mapbox / Leaflet

Backend:

- Supabase (Postgres)

AI:

- OpenAI / Gemini / Typhoon

---

## 🗃️ Database Schema (โครงสร้างข้อมูล)

### places

- id, name, category, region
- description, address, lat, lng
- opening_hours, price_range
- tags, image_url, duration_minutes

### contact_points

- place_id
- phone, facebook_url, website_url

### activities

- id, name, type, region
- duration, price
- best_time, indoor_outdoor
- related_places
- checklist

### transportation_guides

- place_id, region
- nearest transit
- recommended modes
- walking time
- warnings

### verification_logs

- place_id
- open_status, confidence
- notes

---

## 🧪 Demo Flow (การ Demo)

**EN:**

1. Open app
2. View map
3. Select place
4. See "Needs check"
5. Click "Ask AI"
6. Get verified info

**TH:**

1. เปิดแอป
2. ดูแผนที่
3. เลือกสถานที่
4. เห็น "ควรตรวจสอบ"
5. กด "Ask AI"
6. ได้ข้อมูลที่ตรวจสอบแล้ว

---

## 🏆 Positioning (การวางตำแหน่ง)

❌ AI Travel Guide

✅ AI-powered Travel Verification System

**EN:**
"We help tourists verify real-world information before they waste time."

**TH:**
"เราช่วยให้นักท่องเที่ยวตรวจสอบข้อมูลจริงก่อนเสียเวลาไปสถานที่ผิด"
