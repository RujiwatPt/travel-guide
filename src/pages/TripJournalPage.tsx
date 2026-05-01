import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import { TRIP_JOURNAL_SCREEN } from '../data/screenLookup'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_JOURNAL_OVERRIDES: Overrides = {
  // Status bar + decorative top-of-screen kit art
  '↳ Time':                        { hideLayer: true },
  'Bar#0':                         { hideLayer: true },
  'Vector 1':                      { hideLayer: true },
  'Vector 2':                      { hideLayer: true },
  'Vector#0':                      { hideLayer: true },
  'Vector#1':                      { hideLayer: true },
  'Vector#2':                      { hideLayer: true },
  'Vector#3':                      { hideLayer: true },
  'Vector#4':                      { hideLayer: true },
  'Vector#5':                      { hideLayer: true },
  'Frame 21#0':                    { hideLayer: true },
  'Frame 22':                      { hideLayer: true },
  'Border':                        { hideLayer: true },
  'Capacity':                      { hideLayer: true },
  'Wifi':                          { hideLayer: true },
  'Cellular Connection':           { hideLayer: true },
  // Bottom-right kit floating pill artifact
  'Rectangle 489':                 { hideLayer: true },
  'image 42':                      { hideLayer: true },
  'image 43':                      { hideLayer: true },
  'Vector#8':                      { hideLayer: true },
  // Journal card photos — only some "image" layers have backgroundImage
  'image#0':                       { imageSrc: NKP_PHOTOS.phraThatPhanom },
  'image#2':                       { imageSrc: NKP_PHOTOS.birthdayStupa },
  'image#3':                       { imageSrc: NKP_PHOTOS.nagaStatue },
  'image#4':                       { imageSrc: NKP_PHOTOS.mekongSunset },
  'image#6':                       { imageSrc: NKP_PHOTOS.thamNakee },
  'image#8':                       { imageSrc: NKP_PHOTOS.hoChiMinhHouse },
  'image#9':                       { imageSrc: NKP_PHOTOS.phoSawan },
  'image#10':                      { imageSrc: NKP_PHOTOS.riverVibes },
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
