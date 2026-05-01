import EditableFigmaScreenRenderer from '../components/EditableFigmaScreenRenderer'
import KitBottomNav2 from '../components/KitBottomNav2'
import { LOCAL_EXPERIENCES_SCREEN } from '../data/screenLookup'
import { NKP_PHOTOS } from '../data/nkpPhotos'
import type { Overrides } from '../lib/figmaOverrides'

const NKP_LOCAL_OVERRIDES: Overrides = {
  // Status bar + decorative top-of-screen kit art (this screen has no
  // "↳ Indicators" wrapper, so each piece must be hidden individually)
  '↳ Time':                                                    { hideLayer: true },
  'Vector 1':                                                  { hideLayer: true },
  'Vector 2':                                                  { hideLayer: true },
  'Vector#0':                                                  { hideLayer: true },
  'Vector#1':                                                  { hideLayer: true },
  'Vector#2':                                                  { hideLayer: true },
  'Vector#3':                                                  { hideLayer: true },
  'Vector#4':                                                  { hideLayer: true },
  'Vector#5':                                                  { hideLayer: true },
  'Frame 21':                                                  { hideLayer: true },
  'Frame 22':                                                  { hideLayer: true },
  'Border':                                                    { hideLayer: true },
  'Capacity':                                                  { hideLayer: true },
  'Wifi':                                                      { hideLayer: true },
  'Cellular Connection':                                       { hideLayer: true },
  'Explore':                                                   { hideLayer: true },
  // Bottom-right kit floating pill artifact
  'Rectangle 489':                                             { hideLayer: true },
  'image 42':                                                  { hideLayer: true },
  'image 43':                                                  { hideLayer: true },
  'Vector#6':                                                  { hideLayer: true },
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
      <KitBottomNav2 active="grid" />
    </div>
  )
}
