import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import { NOTIFICATIONS_SCREEN } from '../data/screenLookup'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_NOTIFICATIONS_OVERRIDES: Overrides = {
  // Status bar + decorative top-of-screen kit art
  '↳ Time':                                          { hideLayer: true },
  'Vector 1':                                        { hideLayer: true },
  'Vector 2':                                        { hideLayer: true },
  'Vector#0':                                        { hideLayer: true },
  'Vector#1':                                        { hideLayer: true },
  'Vector#2':                                        { hideLayer: true },
  'Vector#3':                                        { hideLayer: true },
  'Vector#4':                                        { hideLayer: true },
  'Vector#5':                                        { hideLayer: true },
  'Frame 21':                                        { hideLayer: true },
  'Frame 22':                                        { hideLayer: true },
  'Border':                                          { hideLayer: true },
  'Capacity':                                        { hideLayer: true },
  'Wifi':                                            { hideLayer: true },
  'Cellular Connection':                             { hideLayer: true },
  'Bar':                                             { hideLayer: true },
  'Notification':                                    { text: 'Notifications' },
  // Bottom-right kit floating pill artifact
  'image 42':                                        { hideLayer: true },
  'image 43':                                        { hideLayer: true },
  'Rectangle 490':                                   { hideLayer: true },
  'Vector#6':                                        { hideLayer: true },
  // Hidden kit photo layers — replace Mount Daisen photos + Jhon Snow avatar
  'Rectangle 2173':                                  { imageSrc: NKP_PHOTOS.phraThatPhanom },
  'Ellipse 7':                                       { imageSrc: NKP_PHOTOS.nagaStatue },
  // Refresh timestamps for NKP context
  '12m':                                             { text: '2m' },
  '13h':                                             { text: '3h' },
  '15h':                                             { text: '6h' },
  '37m':                                             { text: '15m' },
  '2d':                                              { text: '1d' },
  '5d':                                              { text: '2d' },
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
  'Jhon Snow, you created a travel plan for the coming week..':
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
