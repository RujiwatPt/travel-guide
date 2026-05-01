import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import SplashOverlay from '../components/SplashOverlay'
import { HOME_SCREEN } from '../data/screenLookup'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import type { Overrides } from '../lib/figmaOverrides'

/**
 * HomePage — pixel-faithful from figmaEditableData.ts ("Home" screen).
 * Original kit layers preserved; Japanese text + Japanese photos are
 * both swapped for NKP equivalents via the overrides API.
 */

const NKP_HOME_OVERRIDES: Overrides = {
  // Status bar + decorative top-of-screen kit art. Home has no
  // "↳ Indicators" wrapper, so each piece is hidden individually.
  // Vector#0–#10 are status-bar SVG paths; Vector#11 is a deeper
  // decorative arrow we leave alone.
  '↳ Time':                        { hideLayer: true },
  'Bar':                           { hideLayer: true },
  'Vector 1':                      { hideLayer: true },
  'Vector 2':                      { hideLayer: true },
  'Vector#0':                      { hideLayer: true },
  'Vector#1':                      { hideLayer: true },
  'Vector#2':                      { hideLayer: true },
  'Vector#3':                      { hideLayer: true },
  'Vector#4':                      { hideLayer: true },
  'Vector#5':                      { hideLayer: true },
  'Vector#6':                      { hideLayer: true },
  'Vector#7':                      { hideLayer: true },
  'Vector#8':                      { hideLayer: true },
  'Vector#9':                      { hideLayer: true },
  'Vector#10':                     { hideLayer: true },
  'Border':                        { hideLayer: true },
  'Capacity':                      { hideLayer: true },
  'Wifi':                          { hideLayer: true },
  'Cellular Connection':           { hideLayer: true },

  // Hero text
  'Ready to Explore Tokyo!':       { text: 'Ready to Explore \nNakhon Phanom!' },
  'Find places, food, Trips..':    { text: 'Find places, food, trips…' },

  // AI Insights row
  'Tranding Destination':          { text: 'Birthday-Stupa\nRoute' },
  'Weather Friendly':              { text: 'Mekong\nSunset' },
  'Hidden Gem Place':              { text: 'OTOP\nTextiles' },

  // AI Insights icon images (small, in cards)
  'image 35':                      { imageSrc: NKP_PHOTOS.birthdayStupa },
  'image 31':                      { imageSrc: NKP_PHOTOS.mekongSunset },
  'image 37':                      { imageSrc: NKP_PHOTOS.otopTextile },

  // Destination card images — both layers share name "image"
  // Use #N indexed notation. #0 is the first encountered (Phra That),
  // #1 is the second (Phaya Sri).
  'image#0':                       { imageSrc: NKP_PHOTOS.phraThatPhanom },
  'image#1':                       { imageSrc: NKP_PHOTOS.nagaStatue },

  // Destination card text
  'Mount Fuji':                    { text: 'Phra That Phanom' },
  '富士信仰 (Fuji faith)':          { text: 'พระธาตุประจำวันอาทิตย์' },
  'Kiyomizu de':                   { text: 'Phaya Sri Sattanakharat' },
  '清水寺 (Water Temple':           { text: 'พญาศรีสัตตนาคราช' },
}

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-white relative pb-20 grid place-items-start">
      <SplashOverlay />
      <EditableFigmaScreenRenderer
        screen={HOME_SCREEN}
        overrides={NKP_HOME_OVERRIDES}
        framed={false}
      />
      <KitBottomNav active="home" />
    </div>
  )
}
