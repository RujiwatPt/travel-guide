-- Travel Guide for Thailand's Secondary Cities
-- MVP schema — Postgres / Supabase
--
-- See /CONTEXT.md for the domain language and design decisions.
-- See /docs/adr/0001-single-entries-table.md for the discriminator-vs-separate-tables rationale.

create extension if not exists "uuid-ossp";

----------------------------------------------------------------------
-- Enums (closed vocabularies)
----------------------------------------------------------------------

create type entry_type    as enum ('activity', 'place');

create type entry_category as enum (
  'food', 'cafe', 'landmark', 'market', 'museum',
  'temple', 'nature', 'workshop', 'shop'
);

create type entry_setting  as enum ('indoor', 'outdoor', 'mixed');

create type price_band     as enum ('free', 'budget', 'mid', 'premium');

create type live_status    as enum (
  'open', 'closing_soon', 'closed_today',
  'sold_out', 'temporarily_closed'
);

create type data_source    as enum ('owner_updated', 'curated', 'imported');

----------------------------------------------------------------------
-- cities — first-class scope; one row per app instance
----------------------------------------------------------------------

create table cities (
  id              text primary key,                    -- slug, e.g. 'nkp'
  name_en         text not null,
  name_th         text not null,
  region_en       text,                                -- 'Isan / Northeast Thailand'
  region_th       text,                                -- 'อีสาน'
  default_lat     double precision not null,
  default_lng     double precision not null,
  default_zoom    int  not null default 13,
  bounds          jsonb,                               -- [[sw_lat,sw_lng],[ne_lat,ne_lng]]
  hero_photo_url  text,
  tagline_en      text,
  tagline_th      text,
  created_at      timestamptz not null default now()
);

----------------------------------------------------------------------
-- owners — local people/orgs who manage Activities
----------------------------------------------------------------------

create table owners (
  id              uuid primary key default uuid_generate_v4(),
  display_name    text not null,                       -- shown to Tourists in "updated by" badge
  contact_phone   text,
  language_pref   text not null default 'th',          -- 'th' | 'en'
  verified        boolean not null default false,
  created_at      timestamptz not null default now()
);

----------------------------------------------------------------------
-- entries — single table for both Activities and Places
----------------------------------------------------------------------

create table entries (
  id                uuid primary key default uuid_generate_v4(),
  type              entry_type not null,
  city_id           text not null references cities(id),

  -- bilingual content
  name_en           text not null,
  name_th           text not null,
  description_en    text,
  description_th    text,
  why_visit_en      text,                              -- short hook for cards (≤140 chars ideal)
  why_visit_th      text,

  -- geometry
  lat               double precision not null,
  lng               double precision not null,

  -- typed tag dimensions
  category          entry_category not null,
  vibe_tags         text[] not null default '{}',      -- {'romantic','photo-spot'}
  cuisine_tags      text[] not null default '{}',      -- {'vietnamese'} (empty for non-food)
  time_tags         text[] not null default '{}',      -- {'sunset','evening'}
  setting           entry_setting,
  price_band        price_band,

  -- shared misc
  photos            text[] not null default '{}',      -- ordered URLs; [0] is primary
  hours_weekly      jsonb,                             -- shape in CONTEXT.md; null on always-on Places
  duration_min      int,                               -- typical visit length in minutes
  price_min_thb     int,                               -- nullable for free Places
  price_max_thb     int,

  -- Activity-only (nullable for Places)
  owner_id          uuid references owners(id),
  owner_edit_token  text unique,                       -- magic-link secret per Entry
  live_status       live_status,
  status_note       text,                              -- "Sold out today — back tomorrow"
  status_updated    timestamptz,

  -- provenance
  data_source       data_source not null,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  constraint places_have_no_owner check (
    type = 'activity' or owner_id is null
  ),
  constraint places_have_no_live_status check (
    type = 'activity' or live_status is null
  )
);

----------------------------------------------------------------------
-- entry_status_log — append-only audit trail of Owner edits
----------------------------------------------------------------------

create table entry_status_log (
  id          uuid primary key default uuid_generate_v4(),
  entry_id    uuid not null references entries(id) on delete cascade,
  owner_id    uuid not null references owners(id),
  field       text not null,                           -- 'live_status' | 'hours_weekly' | 'status_note' | 'photos' | etc.
  old_value   jsonb,
  new_value   jsonb,
  updated_at  timestamptz not null default now()
);

----------------------------------------------------------------------
-- Indexes — query patterns for the demo
----------------------------------------------------------------------

create index entries_city            on entries (city_id);
create index entries_type            on entries (type);
create index entries_category        on entries (category);
create index entries_vibe_gin        on entries using gin (vibe_tags);
create index entries_cuisine_gin     on entries using gin (cuisine_tags);
create index entries_time_gin        on entries using gin (time_tags);
create index entries_owner           on entries (owner_id) where owner_id is not null;
create index entries_status_updated  on entries (status_updated desc nulls last);

create index status_log_entry_recent on entry_status_log (entry_id, updated_at desc);
create index status_log_owner        on entry_status_log (owner_id);

----------------------------------------------------------------------
-- Seed: City + Owners + 5 demo Entries (+ 1 day-trip Place)
-- Edit photo URLs once assets are uploaded.
----------------------------------------------------------------------

insert into cities (id, name_en, name_th, region_en, region_th, default_lat, default_lng, default_zoom, tagline_en, tagline_th)
values (
  'nkp', 'Nakhon Phanom', 'นครพนม',
  'Isan / Northeast Thailand', 'อีสาน',
  17.4083, 104.7795, 13,
  'Where Thailand meets Laos and Vietnam',
  'จุดบรรจบของไทย ลาว และเวียดนาม'
);

insert into owners (id, display_name, contact_phone, language_pref, verified)
values
  ('11111111-1111-1111-1111-111111111111', 'Khun Somchai',                       '081-234-5678', 'th', true),
  ('22222222-2222-2222-2222-222222222222', 'Walking Street Vendors Association', '082-345-6789', 'th', true);

-- Pho Sawan (Activity, owner: Khun Somchai)
insert into entries (
  id, type, city_id, name_en, name_th, description_en, why_visit_en,
  lat, lng, category, vibe_tags, cuisine_tags, time_tags, setting, price_band,
  photos, hours_weekly, duration_min, price_min_thb, price_max_thb,
  owner_id, owner_edit_token, live_status, status_updated, data_source
) values (
  'aaaa0001-0000-0000-0000-000000000001', 'activity', 'nkp',
  'Pho Sawan', 'เฝอสวรรค์',
  'Family-run Vietnamese kitchen, third generation. Pho broth simmered 18 hours. Nem Nuong (grilled pork rolls wrapped in rice paper with herbs) is the must-order — locals queue at lunch.',
  'The most famous Vietnamese food in town. Cheap, fast, authentic.',
  17.4080, 104.7790, 'food',
  '{local-favourite}', '{vietnamese}', '{morning,afternoon,evening}',
  'indoor', 'budget',
  '{}',
  '{"tz":"Asia/Bangkok","all_day":false,"weekly":{"mon":[["09:00","20:00"]],"tue":[["09:00","20:00"]],"wed":[["09:00","20:00"]],"thu":[["09:00","20:00"]],"fri":[["09:00","20:00"]],"sat":[["09:00","20:00"]],"sun":[["09:00","20:00"]]},"notes_en":"Last lunch order at 14:00","notes_th":"สั่งอาหารกลางวันก่อน 14:00"}'::jsonb,
  45, 60, 120,
  '11111111-1111-1111-1111-111111111111', 'pho-sawan-7x3k2', 'open', now() - interval '2 hours', 'owner_updated'
);

-- River Vibes Café (Activity, owner: Khun Somchai)
insert into entries (
  id, type, city_id, name_en, name_th, description_en, why_visit_en,
  lat, lng, category, vibe_tags, cuisine_tags, time_tags, setting, price_band,
  photos, hours_weekly, duration_min, price_min_thb, price_max_thb,
  owner_id, owner_edit_token, live_status, status_updated, data_source
) values (
  'aaaa0002-0000-0000-0000-000000000002', 'activity', 'nkp',
  'River Vibes Café', 'ริเวอร์ไวบส์',
  'Two-storey café with rooftop seating directly overlooking the Mekong and Laos on the far bank. Specialty coffee, Thai iced tea, simple cakes. Best afternoon stop before walking down to the Naga Statue for sunset.',
  'Air-con downstairs, breeze upstairs, perfect view. Locals'' work-from-café spot.',
  17.4085, 104.7800, 'cafe',
  '{photo-spot,quiet,hipster}', '{coffee}', '{afternoon,sunset}',
  'mixed', 'mid',
  '{}',
  '{"tz":"Asia/Bangkok","all_day":false,"weekly":{"mon":[["09:00","22:00"]],"tue":[["09:00","22:00"]],"wed":[["09:00","22:00"]],"thu":[["09:00","22:00"]],"fri":[["09:00","22:00"]],"sat":[["09:00","22:00"]],"sun":[["09:00","22:00"]]},"notes_en":null,"notes_th":null}'::jsonb,
  30, 80, 150,
  '11111111-1111-1111-1111-111111111111', 'river-vibes-9k2x4', 'open', now() - interval '20 minutes', 'owner_updated'
);

-- Indochina Walking Street (Activity, owner: Vendors Association)
insert into entries (
  id, type, city_id, name_en, name_th, description_en, why_visit_en,
  lat, lng, category, vibe_tags, cuisine_tags, time_tags, setting, price_band,
  photos, hours_weekly, duration_min, price_min_thb, price_max_thb,
  owner_id, owner_edit_token, live_status, status_updated, data_source
) values (
  'aaaa0003-0000-0000-0000-000000000003', 'activity', 'nkp',
  'Indochina Walking Street', 'ถนนคนเดินอินโดจีน',
  'Fri–Sun evening market along the Mekong. ~120 stalls: Isan grilled meats, Vietnamese sweets, OTOP textiles, handmade silver. Live music at the south end after 19:00.',
  'Where the whole town goes on weekend nights. Best dinner option.',
  17.4078, 104.7795, 'market',
  '{lively,family,local-favourite}', '{isan,vietnamese,thai}', '{evening,weekend-only}',
  'outdoor', 'budget',
  '{}',
  '{"tz":"Asia/Bangkok","all_day":false,"weekly":{"mon":null,"tue":null,"wed":null,"thu":null,"fri":[["17:00","22:00"]],"sat":[["17:00","22:00"]],"sun":[["17:00","22:00"]]},"notes_en":"Live music after 19:00 at south end","notes_th":"ดนตรีสดหลัง 19:00 ปลายตลาดทิศใต้"}'::jsonb,
  90, 30, 200,
  '22222222-2222-2222-2222-222222222222', 'walking-street-3w8m1', 'closed_today', now() - interval '8 hours', 'owner_updated'
);

-- Phaya Sri Sattanakharat (Place, curated)
insert into entries (
  id, type, city_id, name_en, name_th, description_en, why_visit_en,
  lat, lng, category, vibe_tags, time_tags, setting, price_band,
  photos, hours_weekly, duration_min, data_source
) values (
  'bbbb0001-0000-0000-0000-000000000001', 'place', 'nkp',
  'Phaya Sri Sattanakharat', 'พญาศรีสัตตนาคราช',
  'The seven-headed Naga serpent statue on the Mekong River — the symbol of Nakhon Phanom. Made of bronze, weighing 9 tonnes. Locals come at sunset to make merit and watch the sun set over Laos across the river.',
  'The single most photographed spot in NKP. Free. Sunset is magic.',
  17.4083, 104.7805, 'landmark',
  '{iconic,photo-spot,spiritual}', '{sunset,evening}',
  'outdoor', 'free',
  '{}',
  '{"tz":"Asia/Bangkok","all_day":true,"notes_en":"Best at sunset (~18:18)","notes_th":"วิวสวยที่สุดช่วงพระอาทิตย์ตก"}'::jsonb,
  30, 'curated'
);

-- Ho Chi Minh's House Memorial (Place, curated)
insert into entries (
  id, type, city_id, name_en, name_th, description_en, why_visit_en,
  lat, lng, category, vibe_tags, time_tags, setting, price_band,
  photos, hours_weekly, duration_min, price_min_thb, price_max_thb, data_source
) values (
  'bbbb0002-0000-0000-0000-000000000002', 'place', 'nkp',
  'Ho Chi Minh''s House Memorial', 'บ้านลุงโฮ',
  'The wooden house where Ho Chi Minh lived from 1928–1929 while exiled from French Indochina. He recruited Vietnamese refugees here. Now a preserved memorial showing original furniture, photographs, and the garden he tended.',
  'One of two surviving Ho Chi Minh residences outside Vietnam. Quiet, unique, deep-cut history.',
  17.4192, 104.7530, 'museum',
  '{quiet,hidden-gem}', '{morning,afternoon}',
  'mixed', 'budget',
  '{}',
  '{"tz":"Asia/Bangkok","all_day":false,"weekly":{"mon":[["08:00","17:00"]],"tue":[["08:00","17:00"]],"wed":[["08:00","17:00"]],"thu":[["08:00","17:00"]],"fri":[["08:00","17:00"]],"sat":[["08:00","17:00"]],"sun":[["08:00","17:00"]]},"notes_en":null,"notes_th":null}'::jsonb,
  45, 20, 20, 'curated'
);

-- Wat Phra That Phanom (Place, curated — day-trip option, not on the demo afternoon route)
insert into entries (
  id, type, city_id, name_en, name_th, description_en, why_visit_en,
  lat, lng, category, vibe_tags, time_tags, setting, price_band,
  photos, hours_weekly, duration_min, data_source
) values (
  'bbbb0003-0000-0000-0000-000000000003', 'place', 'nkp',
  'Wat Phra That Phanom', 'วัดพระธาตุพนม',
  'The most sacred Buddhist stupa in Isan, dating to the early Buddhist era. 53m tall, gold-tipped. Pilgrims come from across Thailand and Laos. Located in That Phanom district, ~50km south of Mueang Nakhon Phanom — better as a half-day trip.',
  'The headline landmark of Nakhon Phanom province. Plan a half-day for it.',
  16.9437, 104.7239, 'temple',
  '{iconic,spiritual}', '{morning,afternoon}',
  'mixed', 'free',
  '{}',
  '{"tz":"Asia/Bangkok","all_day":false,"weekly":{"mon":[["06:00","18:00"]],"tue":[["06:00","18:00"]],"wed":[["06:00","18:00"]],"thu":[["06:00","18:00"]],"fri":[["06:00","18:00"]],"sat":[["06:00","18:00"]],"sun":[["06:00","18:00"]]},"notes_en":"Allow ~1h drive each way from Mueang district","notes_th":"ใช้เวลาเดินทาง ~1 ชม. จากตัวเมือง"}'::jsonb,
  120, 'curated'
);

-- Seed one prior owner edit so the "Updated 2h ago by Khun Somchai" badge has data on day zero
insert into entry_status_log (entry_id, owner_id, field, old_value, new_value, updated_at)
values (
  'aaaa0001-0000-0000-0000-000000000001',
  '11111111-1111-1111-1111-111111111111',
  'live_status',
  '"closed_today"'::jsonb,
  '"open"'::jsonb,
  now() - interval '2 hours'
);
