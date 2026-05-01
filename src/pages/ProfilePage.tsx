import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import { PROFILE_SCREEN } from '../data/screenLookup'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_PROFILE_OVERRIDES: Overrides = {
  // Status bar + decorative top-of-screen kit art
  '↳ Time':                            { hideLayer: true },
  'Vector 1':                          { hideLayer: true },
  'Vector 2':                          { hideLayer: true },
  'Vector#0':                          { hideLayer: true },
  'Vector#1':                          { hideLayer: true },
  'Vector#2':                          { hideLayer: true },
  'Vector#3':                          { hideLayer: true },
  'Vector#4':                          { hideLayer: true },
  'Vector#5':                          { hideLayer: true },
  'Frame 21':                          { hideLayer: true },
  'Frame 22':                          { hideLayer: true },
  'Border':                            { hideLayer: true },
  'Capacity':                          { hideLayer: true },
  'Wifi':                              { hideLayer: true },
  'Cellular Connection':               { hideLayer: true },
  'Bar':                               { hideLayer: true },
  // Bottom-right kit floating pill artifact (decorative, not content)
  'Rectangle 489':                     { hideLayer: true },
  'image 42':                          { hideLayer: true },
  'image 43':                          { hideLayer: true },
  'Vector#6':                          { hideLayer: true },
  // Replace J. Snow avatar with an NKP-themed photo
  'Frame 1000002987':                  { imageSrc: NKP_PHOTOS.phraThatPhanom },
  'J. Snow (あなた)':                 { text: 'Khun Ploy (แขก)' },
  // Layer name has no trailing space (text does)
  '17 Km from your location':          { text: 'In Nakhon Phanom now' },
  ' Nomad':                            { text: ' สายมู' },
  'Explorer':                          { text: 'Foodie' },
  '30':                                { text: '8' },
  'Countries':                         { text: 'Stupas' },
  '93':                                { text: '4' },
  'Mountain':                          { text: 'Themes' },
  '69':                                { text: '17' },
  'Cities':                            { text: 'Entries' },
  'Foodie, Nomad, Explo...':           { text: 'สายมู, Foodie, Hidden-gem...' },
  '65 Destination Wanderlust ':        { text: '5 Signatures saved' },
  '8 Upcoming Trips':                  { text: 'Birthday-Stupa Pilgrimage' },
  'Trip Reminder, Golden ...':         { text: 'Owner updates, AI tips' },
  'English':                           { text: 'English / ไทย' },
  '2 days ago':                        { text: 'Today in NKP' },
}

export default function ProfilePage() {
  return (
    <div className="min-h-[100dvh] bg-white relative pb-20 grid place-items-start">
      <EditableFigmaScreenRenderer
        screen={PROFILE_SCREEN}
        overrides={NKP_PROFILE_OVERRIDES}
        framed={false}
      />
      <KitBottomNav active="profile" />
    </div>
  )
}
