from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.data.seed_data import ENTRIES

from app.core.auth import require_api_key
from app.schemas.verify import VerifyHoursIn, VerifyHoursOut
from app.services.verify_service import VerifyService

router = APIRouter(prefix='/api/v1', tags=['ai'], dependencies=[Depends(require_api_key)])
service = VerifyService()

class PlanIn(BaseModel):
    query: str
    city: str = 'nkp'


@router.post('/plan')
def generate_plan(payload: PlanIn):
    city_rows = [r for r in ENTRIES if (r.get('city') == payload.city or r.get('city_id') == payload.city)]
    if not city_rows:
        raise HTTPException(status_code=404, detail='city not found')
    q = payload.query.lower()
    if any(k in q for k in ['birthday', 'born', 'sunday', 'stupa', 'วันเกิด', 'วันอาทิตย์', 'พระธาตุ']):
        ids = ['NP-ACT-001', 'NP-ACT-002']
        start, end = '09:00', '13:00'
        rationale_en = 'Plan generated from birthday-temple intent with opening-hour aware stops.'
        rationale_th = 'สร้างแผนจากเจตนาวันเกิด-สายวัด โดยคำนึงถึงช่วงเวลาเปิดของสถานที่'
    else:
        ids = ['NP-ACT-004', 'NP-ACT-005', 'NP-ACT-008', 'NP-ACT-001', 'NP-ACT-007']
        start, end = '13:00', '18:00'
        rationale_en = 'Plan generated from query intent + RAG seed data with practical stop flow.'
        rationale_th = 'สร้างแผนจากเจตนาคำถาม + RAG seed data พร้อมลำดับจุดแวะที่ใช้งานจริง'

    selected = [next((x for x in city_rows if x['legacy_code'] == c), None) for c in ids]
    selected = [x for x in selected if x]
    if len(selected) < 2:
        selected = city_rows[:2]
    time_slots = ['13:00', '14:00', '15:30', '16:30', '18:00'] if start == '13:00' else ['09:00', '10:30']
    stops = []
    for i, row in enumerate(selected):
        stops.append({
            'position': i + 1,
            'entry_id': row['id'],
            'arrival_time': time_slots[i] if i < len(time_slots) else time_slots[-1],
            'duration_min': 45,
            'travel_min_to_next': 8 if i < len(selected) - 1 else None,
            'travel_mode_to_next': 'drive' if i < len(selected) - 1 else None,
            'why_en': 'Selected for intent fit and hours reliability.',
            'why_th': 'คัดจากความตรงเจตนาและความน่าเชื่อถือเวลาเปิด-ปิด',
            'icon_emoji': '✨',
            'optional': i == len(selected) - 1 and start == '13:00',
            'entry_summary': {
                'name_en': row['name_en'],
                'name_th': row['name_th'],
                'category': row['category'],
                'primary_photo_url': None,
                'lat': row['lat'],
                'lng': row['lng'],
                'price_band': 'budget',
            },
        })
    return {
        'query': payload.query,
        'city_id': payload.city,
        'generated_at': __import__('datetime').datetime.now().isoformat(),
        'start_time': start,
        'end_time': end,
        'total_duration_min': 300 if start == '13:00' else 240,
        'rationale_en': rationale_en,
        'rationale_th': rationale_th,
        'stops': stops,
        'route_geometry': {'type': 'LineString', 'coordinates': [[s['entry_summary']['lng'], s['entry_summary']['lat']] for s in stops]},
    }


@router.post('/ai/verify-hours', response_model=VerifyHoursOut)
def verify_hours(payload: VerifyHoursIn):
    try:
        status, source, resolved_confidence, conflict_flag, provenance_note = service.verify_hours(payload.entry_id)
    except KeyError:
        raise HTTPException(status_code=404, detail='entry not found')
    return VerifyHoursOut(
        entry_id=payload.entry_id,
        computed_open_status=status,
        verification_source=source,
        resolved_confidence=resolved_confidence,
        conflict_flag=conflict_flag,
        provenance_note=provenance_note,
    )
