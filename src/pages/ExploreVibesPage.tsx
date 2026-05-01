import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav2 from '../components/KitBottomNav2'
import { EXPLORE_VIBES_SCREEN } from '../data/screenLookup'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_EXPLORE_OVERRIDES: Overrides = {
  // Status bar + decorative top-of-screen kit art
  '↳ Time':                                 { hideLayer: true },
  'Bar#0':                                  { hideLayer: true },
  'Vector 1':                               { hideLayer: true },
  'Vector 2':                               { hideLayer: true },
  'Vector#0':                               { hideLayer: true },
  'Vector#1':                               { hideLayer: true },
  'Vector#2':                               { hideLayer: true },
  'Vector#3':                               { hideLayer: true },
  'Vector#4':                               { hideLayer: true },
  'Vector#5':                               { hideLayer: true },
  'Border':                                 { hideLayer: true },
  'Capacity':                               { hideLayer: true },
  'Wifi':                                   { hideLayer: true },
  'Cellular Connection':                    { hideLayer: true },
  // Bottom-right kit floating pill artifact
  'image 42':                               { hideLayer: true },
  'image 43':                               { hideLayer: true },
  'Rectangle 490':                          { hideLayer: true },
  'Vector#10':                              { hideLayer: true },
  // Hero card photo lives in 'Rec' layer (not 'image') — kit Mt Takao mountain
  'Rec':                                    { imageSrc: NKP_PHOTOS.mekongSunset },
  // Frame 7 icon — could be NKP themed
  'Frame 7':                                { imageSrc: NKP_PHOTOS.birthdayStupa },
  // image#0 has no backgroundImage in kit (decorative). Photo layers
  // start at image#1 (Must-See Today / Hidden Gems Nearby cards)
  'image#1':                                { imageSrc: NKP_PHOTOS.phraThatPhanom },
  'image#2':                                { imageSrc: NKP_PHOTOS.nagaStatue },
  'image#3':                                { imageSrc: NKP_PHOTOS.mekongSunset },
  'image#4':                                { imageSrc: NKP_PHOTOS.thamNakee },
  'image#5':                                { imageSrc: NKP_PHOTOS.hoChiMinhHouse },
  'Must-See ':                              { text: 'Must-See' },
  'Hidden Gem':                             { text: 'Hidden Gem' },
  'Food & Cafe':                            { text: 'Food & Cafe' },
  'Search  by vibe, place, tag..':          { text: 'Search by vibe, place, tag…' },
  // Layer names use spaces; layer text uses \n. Match by name.
  'Find me base camp nue of Mount Takao':   { text: 'Find me a sunset spot near\nthe Mekong' },
  'Base Camp':                              { text: 'AI\nPick' },
  'Must-See Today':                         { text: 'Must-See Today' },
  'AI Curated Route':                       { text: 'AI Curated' },
  'See All':                                { text: 'See All' },
  'Torii Gate':                             { text: 'Riverfront' },
  'Cherry Blossoms':                        { text: 'Phaya Sri Sattanakharat' },
  'Shizuoka Regoin':                        { text: 'That Phanom District' },
  'Mount Fuji':                             { text: 'Phra That Phanom' },
  'Hidden Gems Nearby':                     { text: 'Hidden Gems Nearby' },
  'Kansai Region':                          { text: 'Phu Langka NP' },
  'Summit Senority':                        { text: 'Tham Nakee Cave' },
  'Niseko Region':                          { text: 'Old Town NKP' },
  'Hiei Temple':                            { text: 'Street Art Walk' },
}

export default function ExploreVibesPage() {
  return (
    <div className="min-h-[100dvh] bg-white relative pb-20 grid place-items-start">
      <EditableFigmaScreenRenderer
        screen={EXPLORE_VIBES_SCREEN}
        overrides={NKP_EXPLORE_OVERRIDES}
        framed={false}
      />
      <KitBottomNav2 active="grid" />
    </div>
  )
}
