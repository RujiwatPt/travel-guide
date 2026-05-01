import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import { TRIP_JOURNAL_SCREEN } from '../data/screenLookup'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_JOURNAL_OVERRIDES: Overrides = {
  'Trip Journal':                  { text: 'Birthday-Stupa Pilgrimage' },
  'Timeline':                      { text: 'Timeline' },
  'Storymode':                     { text: 'Storymode' },
  '+10':                           { text: '+8' },
  'Daisen (いせん)':                { text: 'Phra That Phanom (พระธาตุพนม)' },
  'Tottori Prefecture':            { text: 'That Phanom District • Sunday' },
  '17 Km from your location ':     { text: '50 km south of Mueang NKP' },
  'Mountain':                      { text: 'Spiritual' },
  'Spiritual':                     { text: 'Iconic' },
  'Ukai (鵜飼)':                    { text: 'Phra That Renu (พระธาตุเรณู)' },
  'Nagara River':                  { text: 'Renu Nakhon • Monday' },
  '60 Km from your location ':     { text: '30 km west of Mueang NKP' },
  'Cultural':                      { text: 'Phu Thai' },
  'Fishing':                       { text: 'Pink Stupa' },
}

export default function TripJournalPage() {
  return (
    <div className="min-h-[100dvh] bg-white relative pb-20 grid place-items-start">
      <EditableFigmaScreenRenderer
        screen={TRIP_JOURNAL_SCREEN}
        overrides={NKP_JOURNAL_OVERRIDES}
        framed={false}
      />
      <KitBottomNav active="journal" />
    </div>
  )
}
