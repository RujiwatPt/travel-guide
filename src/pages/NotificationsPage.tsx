import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import { NOTIFICATIONS_SCREEN } from '../data/screenLookup'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_NOTIFICATIONS_OVERRIDES: Overrides = {
  'Trip Reminders':                                  { text: 'Owner Updates' },
  'AI Travel Tips':                                  { text: 'AI Tips for NKP' },
  'Weather & Safety Alerts':                         { text: 'Weather & Safety' },
  'Price Drop Alerts':                               { text: 'Theme Alerts' },
  'Kyoto Zen (あなた) Hotel Check-in ':              { text: 'Pho Sawan — open now ✓' },
  'Check-in to your hotel in Osaka.':                { text: 'Khun Somchai updated 2h ago.' },
  "Explore Kyoto's Secret Gardens":                  { text: 'Walk to Indochina Market tonight' },
  'Discover hidden gems and local favorites.':       { text: 'Friday — live music after 19:00.' },
  'Okinawa Typhoon Alert':                           { text: 'Light rain forecast 16:00–19:00' },
  'Typhoon warning for Okinawa. Stay indoors.':      { text: 'Indoor museums recommended.' },
  'Sapporo Flight Prices':                           { text: 'Birthday-Stupa Theme refreshed' },
  'Flights to Sapporo have decreased by 15%.':       { text: '8 stupas now mapped — your Sunday is Phra That Phanom.' },
  'Golden Hour in Kyoto is at 5:42 PM today':        { text: 'Sunset at Naga Statue at 18:18 today' },
  'Head to Arashiyama Bamboo..':                     { text: 'Best Mekong photo spot in NKP.' },
  'Mount Daisen(いせ)':                               { text: 'Phra That Phanom Pilgrimage' },
  'May 14-17':                                       { text: 'Sunday morning' },
  'Jhon Snow, you created a travel\nplan for the coming week..':
                                                     { text: 'AI created your half-day Sunday plan' },
}

export default function NotificationsPage() {
  return (
    <div className="min-h-[100dvh] bg-white relative pb-20 grid place-items-start">
      <EditableFigmaScreenRenderer
        screen={NOTIFICATIONS_SCREEN}
        overrides={NKP_NOTIFICATIONS_OVERRIDES}
        framed={false}
      />
      <KitBottomNav active="profile" />
    </div>
  )
}
