import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import SplashOverlay from '../components/SplashOverlay'
import { HOME_SCREEN } from '../data/screenLookup'
import type { Overrides } from '../lib/figmaOverrides'

/**
 * HomePage — pixel-faithful from figmaEditableData.ts ("Home" screen).
 * Original kit layers preserved; only Japanese text strings are
 * swapped for NKP equivalents via the overrides API.
 */

const NKP_HOME_OVERRIDES: Overrides = {
  'Ready to Explore Tokyo!':       { text: 'Ready to Explore \nNakhon Phanom!' },
  'Find places, food, Trips..':    { text: 'Find places, food, trips…' },
  'Tranding Destination':          { text: 'Birthday-Stupa\nRoute' },
  'Weather Friendly':              { text: 'Mekong\nSunset' },
  'Hidden Gem Place':              { text: 'OTOP\nTextiles' },
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
