import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import { PROFILE_SCREEN } from '../data/screenLookup'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_PROFILE_OVERRIDES: Overrides = {
  '↳ Time':                            { hideLayer: true },
  '↳ Indicators':                      { hideLayer: true },
  'J. Snow (あなた)':                 { text: 'Khun Ploy (แขก)' },
  '17 Km from your location ':         { text: 'In Nakhon Phanom now' },
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
