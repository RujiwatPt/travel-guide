import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav from '../components/KitBottomNav'
import { LOCAL_EXPERIENCES_SCREEN } from '../data/screenLookup'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_LOCAL_OVERRIDES: Overrides = {
  '↳ Time':                                                    { hideLayer: true },
  '↳ Indicators':                                              { hideLayer: true },
  // Wide photo card hero images — 3 instances of "image"
  'image#0':                                                   { imageSrc: NKP_PHOTOS.phoSawan },
  'image#1':                                                   { imageSrc: NKP_PHOTOS.riverVibes },
  'image#2':                                                   { imageSrc: NKP_PHOTOS.walkingStreet },
  ' Local Gems Around You':                                    { text: ' Local Gems in Nakhon Phanom' },
  "Feel the city's heartbeat through food & festivals.":       { text: "Feel the heartbeat through food & culture." },
  'Street Food':                                               { text: 'Street Food' },
  'Cultural Events':                                           { text: 'Cultural Sites' },
  'DIY Local Tours':                                           { text: 'OTOP Crafts' },
  'Hidden Gem':                                                { text: 'Hidden Gem' },
  'Takoyaki (たこ焼き)':                                        { text: 'Pho Sawan (เฝอสวรรค์)' },
  'Octopus balls with crispy...':                              { text: 'Vietnamese pho + nem nuong rolls' },
  'Found in Osaka':                                            { text: 'Mueang NKP' },
  '1.2k reviews':                                              { text: 'Local favourite' },
  'Tempura (天ぷら)':                                           { text: 'River Vibes (ริเวอร์ไวบส์)' },
  'Crispy deep-fried vegetables and shrimp.':                  { text: 'Rooftop café over the Mekong; specialty coffee.' },
  'Yanki Street':                                              { text: 'Mekong Riverfront' },
  '1.8k reviews':                                              { text: 'Quiet spot' },
  'Kushiyaki (串焼き)':                                         { text: 'Walking Street (ถนนคนเดิน)' },
  'Skewered meat grilled with tare sauce ...':                 { text: 'Fri-Sun night market: 120+ stalls.' },
}

export default function LocalExperiencesPage() {
  return (
    <div className="min-h-[100dvh] bg-white relative pb-20 grid place-items-start">
      <EditableFigmaScreenRenderer
        screen={LOCAL_EXPERIENCES_SCREEN}
        overrides={NKP_LOCAL_OVERRIDES}
        framed={false}
      />
      <KitBottomNav active="explore" />
    </div>
  )
}
