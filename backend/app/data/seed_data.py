from datetime import datetime
from uuid import NAMESPACE_DNS, uuid5


CHECKED_AT = datetime.now().isoformat(timespec='seconds')


def _id(code: str) -> str:
    return str(uuid5(NAMESPACE_DNS, f'travel-guide/{code}'))


def _blob(parts: list[str]) -> str:
    return ' '.join(p for p in parts if p).lower()


def _e(
    code: str,
    category: str,
    name_en: str,
    name_th: str,
    tags: list[str],
    lat: float,
    lng: float,
    hours: str = '09:00-17:00',
    p: float = 0.6,
    hours_conf: str = 'medium',
    source_type: str = 'map_listing',
    phone: str | None = None,
    fb: str | None = None,
    entry_type: str = 'activity',
):
    blob = _blob([name_en, name_th, category, ' '.join(tags)])
    return {
        'id': _id(code),
        'legacy_code': code,
        'city': 'nkp',
        'city_id': 'nkp',
        'type': entry_type,
        'category': category,
        'name_en': name_en,
        'name_th': name_th,
        'lat': lat,
        'lng': lng,
        'opening_hours_text': hours,
        'hours_confidence': hours_conf,
        'hours_source_type': source_type,
        'hours_last_checked_at': CHECKED_AT,
        'contact_phone': phone or '08-0000-0000',
        'facebook_url': fb,
        'intent_tags': tags,
        'search_text_blob': blob,
        'default_priority': p,
    }


ENTRIES = [
    _e('NP-ACT-001', 'landmark', 'Phaya Sri Sattanakharat', 'พญาศรีสัตตนาคราช', ['ริมโขง', 'แลนด์มาร์ก', 'ถ่ายรูป', 'sunset'], 17.4083, 104.7805, '00:00-23:59', 0.9, 'high', 'official', '08-1234-0001', None, entry_type='place'),
    _e('NP-ACT-002', 'temple', 'Wat Phra That Phanom', 'วัดพระธาตุพนม', ['ไหว้พระ', 'ทำบุญ', 'พระธาตุ'], 16.9437, 104.7239, '06:00-18:00', 0.95, 'high', 'official', '08-1234-0002', 'https://facebook.com/watphrathatphanom'),
    _e('NP-ACT-003', 'food', 'Somtum Rim Khong', 'ส้มตำริมโขง', ['ส้มตำ', 'อาหารอีสาน', 'ริมโขง', 'กิน', 'ร้านส้มตำ'], 17.4090, 104.7811, '10:00-20:00', 0.88, 'medium', 'facebook', '08-1234-0003', 'https://facebook.com/somtumrimkhong'),
    _e('NP-ACT-004', 'food', 'Pho Sawan', 'เฝอสวรรค์', ['เฝอ', 'เวียดนาม', 'อาหาร', 'กิน'], 17.4080, 104.7790, '09:00-15:00', 0.82, 'medium', 'facebook', '08-1234-0004', 'https://facebook.com/phosawan'),
    _e('NP-ACT-005', 'museum', "Ho Chi Minh's House Memorial", 'บ้านลุงโฮ', ['ประวัติศาสตร์', 'พิพิธภัณฑ์'], 17.4192, 104.7530, '08:00-17:00', 0.7, 'medium', 'map_listing', '08-1234-0005', 'https://facebook.com/hcmhouse.nkp', entry_type='place'),
    _e('NP-ACT-006', 'nature', 'Tham Nakee', 'ถ้ำนาคี', ['ธรรมชาติ', 'เดินป่า', 'ถ้ำ'], 17.9590, 104.0780, '07:00-16:00', 0.8, 'low', 'community', '08-1234-0006'),
    _e('NP-ACT-007', 'market', 'Indochina Walking Street', 'ถนนคนเดินอินโดจีน', ['ตลาด', 'ของกิน', 'ช้อปปิ้ง'], 17.4078, 104.7795, '17:00-22:00', 0.75, 'medium', 'map_listing', '08-1234-0007'),
    _e('NP-ACT-008', 'cafe', 'River Vibes Cafe', 'ริเวอร์ไวบส์คาเฟ่', ['คาเฟ่', 'กาแฟ', 'ริมโขง'], 17.4085, 104.7800, '08:00-19:00', 0.68, 'medium', 'facebook', '08-1234-0008', 'https://facebook.com/rivervibescafe'),
    _e('NP-ACT-009', 'temple', 'Wat Okat', 'วัดโอกาส', ['ไหว้พระ', 'ทำบุญ'], 17.4140, 104.7832, '06:00-18:00', 0.62, 'medium', 'official', '08-1234-0009', None, entry_type='place'),
    _e('NP-ACT-010', 'nature', 'Nam Tok Tad Kham', 'น้ำตกตาดขาม', ['น้ำตก', 'ธรรมชาติ', 'เที่ยว'], 17.5120, 104.6210, '08:00-17:00', 0.72, 'low', 'community', '08-1234-0010'),
]

base_lat = 17.40
base_lng = 104.77
for i in range(11, 42):
    code = f'NP-ACT-{i:03d}'
    lat = base_lat + (i % 7) * 0.006
    lng = base_lng + (i % 9) * 0.005
    if i % 5 == 0:
        ENTRIES.append(_e(code, 'food', f'Local Food Spot {i}', f'ร้านอาหารท้องถิ่น {i}', ['อาหาร', 'ของกิน', 'ร้าน', 'กิน'], lat, lng, '10:00-21:00', 0.45, 'medium', 'facebook', f'08-1234-{i:04d}', f'https://facebook.com/nkpfood{i}'))
    elif i % 5 == 1:
        ENTRIES.append(_e(code, 'temple', f'Local Temple {i}', f'วัดท้องถิ่น {i}', ['ไหว้พระ', 'ทำบุญ'], lat, lng, '06:00-18:00', 0.43, 'medium', 'official', f'08-1234-{i:04d}'))
    elif i % 5 == 2:
        ENTRIES.append(_e(code, 'nature', f'Nature Spot {i}', f'แหล่งธรรมชาติ {i}', ['ธรรมชาติ', 'เที่ยว'], lat, lng, '08:00-17:00', 0.41, 'low', 'community', f'08-1234-{i:04d}'))
    elif i % 5 == 3:
        ENTRIES.append(_e(code, 'museum', f'Culture House {i}', f'บ้านวัฒนธรรม {i}', ['ประวัติศาสตร์', 'พิพิธภัณฑ์'], lat, lng, '09:00-17:00', 0.39, 'medium', 'map_listing', f'08-1234-{i:04d}', f'https://facebook.com/nkpculture{i}' if i % 2 == 1 else None))
    else:
        ENTRIES.append(_e(code, 'landmark', f'City Landmark {i}', f'จุดแลนด์มาร์ก {i}', ['แลนด์มาร์ก', 'ถ่ายรูป'], lat, lng, '00:00-23:59', 0.37, 'medium', 'map_listing', f'08-1234-{i:04d}'))
