import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import { BOOKING_HUB_SCREEN } from '../data/screenLookup'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_BOOKING_OVERRIDES: Overrides = {
  'Booking Hub':                                  { text: 'OTOP Hub' },
  'Personalized bookings for your Japan Journey': { text: 'OTOP & local crafts in Nakhon Phanom.' },
  'All':                                          { text: 'All' },
  'Hotel':                                        { text: 'Textiles' },
  'Ryokan':                                       { text: 'Coffee' },
  'Airbnb':                                       { text: 'Workshops' },
  'Kyoto Zen (あなた)':                            { text: 'Renu OTOP (เรณูนคร)' },
  'Gion District, Kyoto':                         { text: 'Phu Thai textile community' },
  'Book Now':                                     { text: 'View Details' },
  '$150.00':                                      { text: '฿200+' },
  '4.9':                                          { text: '4.9' },
  'Local Events':                                 { text: 'This Weekend' },
  'Ramen Night (ラナト)':                         { text: 'Walking Street (ถนนคนเดิน)' },
  'May 29 • 12:01 AM':                            { text: 'Fri 17:00 • Indochina Market' },
  'Get Ticket':                                   { text: 'Get Pass' },
  'Kanda Matsuri(ラト)':                          { text: 'BlueGold Coffee Tour' },
  'May 02 • 18:00 PM':                            { text: 'Sat 10:00 • Civet coffee farm' },
  'Gion Matsuri (祇園祭)':                        { text: 'Naga Sunset Walk' },
  'May 28 • 10:00 AM':                            { text: 'Daily 18:00 • Free' },
}

export default function BookingHubPage() {
  return (
    <div className="min-h-[100dvh] bg-white relative pb-20 grid place-items-start">
      <EditableFigmaScreenRenderer
        screen={BOOKING_HUB_SCREEN}
        overrides={NKP_BOOKING_OVERRIDES}
        framed={false}
      />
      <KitBottomNav active="explore" />
    </div>
  )
}
