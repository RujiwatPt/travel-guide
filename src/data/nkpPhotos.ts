// Curated NKP photos sourced from Wikimedia Commons (public domain / CC).
// Used by v4 pixel-faithful pages to swap kit's Japanese photos via
// `imageSrc` overrides on the layer-by-name (or by index) match, and
// by composed pages for AI-insight icons + hero decorations.
//
// All URLs HEAD-verified 200; Wikimedia's URLs are stable so won't
// 404 like expired Unsplash cache IDs.

export const NKP_PHOTOS = {
  phraThatPhanom:    'https://upload.wikimedia.org/wikipedia/commons/6/62/Wat_Phra_That_Phanom.jpg',
  nagaStatue:        'https://upload.wikimedia.org/wikipedia/commons/c/cb/Phaya_Naga.jpg',
  phoSawan:          'https://upload.wikimedia.org/wikipedia/commons/9/96/Pho-Beef-Noodle-Soup-2008.jpg',
  riverVibes:        'https://upload.wikimedia.org/wikipedia/commons/8/82/Mekong_River_View_SkyWalk.jpg',
  walkingStreet:     'https://upload.wikimedia.org/wikipedia/commons/9/9b/DZ6_1772_Twilight_market_bustle_lanterns_glow_above_a_lively_street_filled_with_food_stalls_shoppers_and_evening_chatter.jpg',
  hoChiMinhHouse:    'https://upload.wikimedia.org/wikipedia/commons/b/b4/House_HoChiMinh_stayed%40NakhonPhanom.jpg',
  blueGoldCoffee:    'https://upload.wikimedia.org/wikipedia/commons/4/4b/Bali_003_-_Ubud_-_famous_lukaw_coffee.jpg',
  renuTextiles:      'https://upload.wikimedia.org/wikipedia/commons/4/4a/Thai_Silk_Weaving_1_-_Ban_Tha_Sawang.jpg',
  thamNakee:         'https://upload.wikimedia.org/wikipedia/commons/5/5d/D85_4998_Sunset_from_Phu_Langka_National_Park%2C_Thailand.jpg',
  // AI insight icons / decorative slots
  mekongSunset:      'https://upload.wikimedia.org/wikipedia/commons/8/82/Mekong_River_View_SkyWalk.jpg',
  birthdayStupa:     'https://upload.wikimedia.org/wikipedia/commons/6/62/Wat_Phra_That_Phanom.jpg',
  otopTextile:       'https://upload.wikimedia.org/wikipedia/commons/4/4a/Thai_Silk_Weaving_1_-_Ban_Tha_Sawang.jpg',
} as const
