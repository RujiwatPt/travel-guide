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
  // Hide kit's hardcoded "9:54" status bar (iOS provides its own)
  '↳ Time':                        { hideLayer: true },
  '↳ Indicators':                  { hideLayer: true },

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
