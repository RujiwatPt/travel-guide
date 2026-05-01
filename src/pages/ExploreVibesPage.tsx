import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import { EXPLORE_VIBES_SCREEN } from '../data/screenLookup'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_EXPLORE_OVERRIDES: Overrides = {
  '↳ Time':                                 { hideLayer: true },
  '↳ Indicators':                           { hideLayer: true },
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
  'Find me base camp nue of\nMount Takao':  { text: 'Find me a sunset spot near\nthe Mekong' },
  'Base \nCamp':                            { text: 'AI\nPick' },
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
      <KitBottomNav active="explore" />
    </div>
  )
}
