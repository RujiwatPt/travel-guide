import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav2 from '../components/KitBottomNav2'
import { BOOKING_HUB_SCREEN } from '../data/screenLookup'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_BOOKING_OVERRIDES: Overrides = {
  // Status bar + decorative top-of-screen kit art (this screen has no
  // "↳ Indicators" wrapper). Frame 21/22 appear deeper in cards too,
  // so use #0 indexing to hide only the top status-bar instance.
  '↳ Time':                                       { hideLayer: true },
  'Vector 1':                                     { hideLayer: true },
  'Vector 2':                                     { hideLayer: true },
  'Vector#0':                                     { hideLayer: true },
  'Vector#1':                                     { hideLayer: true },
  'Vector#2':                                     { hideLayer: true },
  'Vector#3':                                     { hideLayer: true },
  'Vector#4':                                     { hideLayer: true },
  'Vector#5':                                     { hideLayer: true },
  'Frame 21#0':                                   { hideLayer: true },
  'Frame 22#0':                                   { hideLayer: true },
  'Border':                                       { hideLayer: true },
  'Capacity':                                     { hideLayer: true },
  'Wifi':                                         { hideLayer: true },
  'Cellular Connection':                          { hideLayer: true },
  'Explore':                                      { hideLayer: true },
  // Bottom-right kit floating pill artifact
  'Rectangle 489':                                { hideLayer: true },
  'image 42':                                     { hideLayer: true },
  'image 43':                                     { hideLayer: true },
  'Vector#6':                                     { hideLayer: true },
  // Hero booking cards (kit shows Kyoto Zen twice — image#0 + image#2)
  'image#0':                                      { imageSrc: NKP_PHOTOS.renuTextiles },
  'image#2':                                      { imageSrc: NKP_PHOTOS.blueGoldCoffee },
  // Event row icons
  'image#4':                                      { imageSrc: NKP_PHOTOS.walkingStreet },
  'image#5':                                      { imageSrc: NKP_PHOTOS.nagaStatue },
  'image#6':                                      { imageSrc: NKP_PHOTOS.phraThatPhanom },
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
      <KitBottomNav2 active="grid" />
    </div>
  )
}
