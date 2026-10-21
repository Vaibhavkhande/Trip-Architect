/* ==========================================================================
   SCENERY CATALOG — Breathtaking photography for every destination & country
   ========================================================================== */

export interface SceneryItem {
  url: string;
  title: string;
  location: string;
}

export type SceneryInfo = SceneryItem;

export const COUNTRY_SCENERY: Record<string, SceneryItem> = {
  default: {
    url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80",
    title: "Global Wanderlust",
    location: "World Horizons",
  },
  switzerland: {
    url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=80",
    title: "Alpine Peaks & Glacial Lakes",
    location: "Swiss Alps, Switzerland",
  },
  japan: {
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80",
    title: "Mount Fuji & Pagoda Vista",
    location: "Honshu, Japan",
  },
  italy: {
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80",
    title: "Cliffside Riviera Coastline",
    location: "Amalfi Coast, Italy",
  },
  thailand: {
    url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1920&q=80",
    title: "Emerald Seas & Limestone Karsts",
    location: "Andaman Sea, Thailand",
  },
  iceland: {
    url: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1920&q=80",
    title: "Glaciers & Roaring Cascades",
    location: "South Iceland",
  },
  peru: {
    url: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1920&q=80",
    title: "Citadel in the Clouds",
    location: "Machu Picchu, Peru",
  },
  greece: {
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=80",
    title: "Caldera Blue Domes & Aegean Sun",
    location: "Santorini, Greece",
  },
  morocco: {
    url: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1920&q=80",
    title: "Golden Desert Dunes",
    location: "Sahara Desert, Morocco",
  },
};

export const DESTINATION_SCENERY: Record<string, SceneryItem> = {
  // Switzerland
  zurich: {
    url: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1920&q=80",
    title: "Lake Zurich & Historic Niederdorf",
    location: "Zurich, Switzerland",
  },
  lucerne: {
    url: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1920&q=80",
    title: "Chapel Bridge & Mount Pilatus",
    location: "Lucerne, Switzerland",
  },
  interlaken: {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
    title: "Twin Lakes & Eiger Panorama",
    location: "Interlaken, Switzerland",
  },
  lauterbrunnen: {
    url: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?auto=format&fit=crop&w=1920&q=80",
    title: "Valley of 72 Waterfalls",
    location: "Lauterbrunnen, Switzerland",
  },
  grindelwald: {
    url: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1920&q=80",
    title: "First Cliff Walk & Eiger North Face",
    location: "Grindelwald, Switzerland",
  },
  jungfrau: {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    title: "Jungfraujoch Top of Europe",
    location: "Jungfrau Glacier, Switzerland",
  },
  zermatt: {
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1920&q=80",
    title: "The Iconic Matterhorn Peak",
    location: "Zermatt, Switzerland",
  },
  geneva: {
    url: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1920&q=80",
    title: "Jet d'Eau on Lake Geneva",
    location: "Geneva, Switzerland",
  },
  montreux: {
    url: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1920&q=80",
    title: "Château de Chillon on the Lake",
    location: "Montreux, Switzerland",
  },
  bern: {
    url: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1920&q=80",
    title: "Turquoise Aare River & Old Town",
    location: "Bern, Switzerland",
  },
  basel: {
    url: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1920&q=80",
    title: "Rhine River & Historic Bridges",
    location: "Basel, Switzerland",
  },

  // Japan
  tokyo: {
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=80",
    title: "Tokyo Tower & Metropolis Lights",
    location: "Tokyo, Japan",
  },
  kyoto: {
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80",
    title: "Arashiyama & Historic Pagodas",
    location: "Kyoto, Japan",
  },
  osaka: {
    url: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1920&q=80",
    title: "Osaka Castle & Vibrant Canals",
    location: "Osaka, Japan",
  },
  hakone: {
    url: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1920&q=80",
    title: "Torii Gate on Lake Ashi",
    location: "Hakone, Japan",
  },
  nara: {
    url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1920&q=80",
    title: "Free-Roaming Deer in Ancient Nara",
    location: "Nara Park, Japan",
  },
  hiroshima: {
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=80",
    title: "Floating Torii of Miyajima",
    location: "Miyajima, Hiroshima, Japan",
  },
  sapporo: {
    url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1920&q=80",
    title: "Powder Snow Peaks of Hokkaido",
    location: "Sapporo, Japan",
  },

  // Italy
  rome: {
    url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1920&q=80",
    title: "Eternal City & Roman Colosseum",
    location: "Rome, Italy",
  },
  florence: {
    url: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1920&q=80",
    title: "Duomo Terracotta Domes & Arno River",
    location: "Florence, Italy",
  },
  venice: {
    url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1920&q=80",
    title: "Gondolas on the Grand Canal",
    location: "Venice, Italy",
  },
  cinqueterre: {
    url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1920&q=80",
    title: "Pastel Cliffside Villages of Liguria",
    location: "Cinque Terre, Italy",
  },
  amalfi: {
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80",
    title: "Positano Clifftop Villas over Sapphire Sea",
    location: "Amalfi Coast, Italy",
  },
  milan: {
    url: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1920&q=80",
    title: "Gothic Spired Duomo di Milano",
    location: "Milan, Italy",
  },

  // Thailand
  bangkok: {
    url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1920&q=80",
    title: "Wat Arun Spires at Twilight",
    location: "Bangkok, Thailand",
  },
  chiangmai: {
    url: "https://images.unsplash.com/photo-1512553353614-82a7370096dc?auto=format&fit=crop&w=1920&q=80",
    title: "Golden Mountain Shrines of the North",
    location: "Chiang Mai, Thailand",
  },
  phuket: {
    url: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1920&q=80",
    title: "Tropical Headlands & Andaman Waters",
    location: "Phuket, Thailand",
  },
  krabi: {
    url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1920&q=80",
    title: "Railay Beach & Soaring Limestone Crags",
    location: "Krabi, Thailand",
  },
  kohsamui: {
    url: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=1920&q=80",
    title: "Tranquil Coconut Groves & Coral Bays",
    location: "Koh Samui, Thailand",
  },
  ayutthaya: {
    url: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1920&q=80",
    title: "Ancient Siam Kingdom Stupas",
    location: "Ayutthaya, Thailand",
  },

  // Iceland
  reykjavik: {
    url: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1920&q=80",
    title: "Hallgrímskirkja & Nordic Coastal Harbor",
    location: "Reykjavik, Iceland",
  },
  golden: {
    url: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1920&q=80",
    title: "Gullfoss Golden Waterfall & Geysers",
    location: "Golden Circle, Iceland",
  },
  southcoast: {
    url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80",
    title: "Reynisfjara Black Sand & Basalt Columns",
    location: "Vik, South Coast, Iceland",
  },
  jokulsarlon: {
    url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=80",
    title: "Crystal Icebergs Floating Out to Sea",
    location: "Jökulsárlón Glacier Lagoon, Iceland",
  },
  snaefellsnes: {
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
    title: "Kirkjufell Mountain & Icelandic Fjord",
    location: "Snæfellsnes Peninsula, Iceland",
  },
  myvatn: {
    url: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=1920&q=80",
    title: "Geothermal Springs & Volcanic Vents",
    location: "Lake Mývatn, Iceland",
  },

  // Peru
  lima: {
    url: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=1920&q=80",
    title: "Miraflores Cliffs overlooking Pacific Waves",
    location: "Lima, Peru",
  },
  cusco: {
    url: "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1920&q=80",
    title: "Imperial Inca Stonework & Andean Skyline",
    location: "Cusco, Peru",
  },
  sacredvalley: {
    url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1920&q=80",
    title: "Pisac Terraces in the Sacred Valley",
    location: "Urubamba Valley, Peru",
  },
  machupicchu: {
    url: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1920&q=80",
    title: "Ancient Sanctuary of Machu Picchu",
    location: "Machu Picchu, Peru",
  },
  arequipa: {
    url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1920&q=80",
    title: "White Sillar Architecture & Misti Volcano",
    location: "Arequipa, Peru",
  },
  amazon: {
    url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=80",
    title: "Winding Canopy Waters of the Amazon Basin",
    location: "Peruvian Amazon Rainforest",
  },

  // Greece
  athens: {
    url: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1920&q=80",
    title: "The Acropolis & Parthenon at Sunset",
    location: "Athens, Greece",
  },
  santorini: {
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=80",
    title: "Oia Whitewashed Caldera & Blue Domes",
    location: "Santorini, Greece",
  },
  mykonos: {
    url: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1920&q=80",
    title: "Little Venice & Aegean Windmills",
    location: "Mykonos, Greece",
  },
  crete: {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    title: "Balos Lagoon & Cretan Mountain Gorges",
    location: "Crete, Greece",
  },
  naxos: {
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80",
    title: "Portara Marble Gateway & Golden Coast",
    location: "Naxos, Greece",
  },
  rhodes: {
    url: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1920&q=80",
    title: "Medieval Palace of the Grand Master",
    location: "Rhodes, Greece",
  },

  // Morocco
  marrakech: {
    url: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1920&q=80",
    title: "Koutoubia Minaret & Riad Architecture",
    location: "Marrakech, Morocco",
  },
  fes: {
    url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=80",
    title: "Bab Boujeloud Blue Gate & Ancient Medina",
    location: "Fes, Morocco",
  },
  sahara: {
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
    title: "Erg Chebbi Sunset Sand Dunes",
    location: "Sahara Desert, Morocco",
  },
  chefchaouen: {
    url: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?auto=format&fit=crop&w=1920&q=80",
    title: "The Cobalt & Cerulean Mountain Lanes",
    location: "Chefchaouen, Morocco",
  },
  essaouira: {
    url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80",
    title: "Windblown Atlantic Sea Ramparts",
    location: "Essaouira, Morocco",
  },
  atlas: {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    title: "Mount Toubkal & Terraced Berber Valleys",
    location: "High Atlas Mountains, Morocco",
  },
};

export function getScenery(countryKey: string | null, activeDestinationKey?: string | null): SceneryItem {
  if (activeDestinationKey && DESTINATION_SCENERY[activeDestinationKey]) {
    return DESTINATION_SCENERY[activeDestinationKey];
  }
  if (countryKey && COUNTRY_SCENERY[countryKey]) {
    return COUNTRY_SCENERY[countryKey];
  }
  return COUNTRY_SCENERY.default;
}

export interface LocationGalleryItem {
  url: string;
  label: string;
}

export interface DestinationDetail {
  key: string;
  title: string;
  location: string;
  countryKey: string;
  heroUrl: string;
  gallery: LocationGalleryItem[];
  bestPhotoSpot: string;
  dailyBudgetEst: string;
  highlights: string[];
  vibe: string;
  tips: string;
}

export const DESTINATION_DETAILS: Record<string, Partial<DestinationDetail>> = {
  zermatt: {
    title: "Zermatt & Matterhorn",
    location: "Valais Alps, Switzerland",
    bestPhotoSpot: "Kirchbrücke at 06:15 for golden sunrise Matterhorn reflection, or Riffelsee lake",
    dailyBudgetEst: "CHF 220 - 320 / day (Lodging: CHF 160, Dining: CHF 65, Cable cars: CHF 60)",
    highlights: ["Gornergrat Cogwheel Train", "Matterhorn Glacier Paradise", "Hinterdorf Old Wooden Chalets", "Chez Vrony Alpine Terrace"],
    vibe: "Car-free alpine sanctuary with breathtaking 4,000m summits and world-class fondue",
    tips: "Download the Matterhorn App early in the morning to verify summit visibility before taking the cable car.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80", label: "Matterhorn Peak" },
      { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", label: "Riffelsee Reflection" },
      { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", label: "Gornergrat Crest" },
      { url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80", label: "Findeln Hamlet" },
    ],
  },
  lucerne: {
    title: "Lucerne & Mount Pilatus",
    location: "Central Switzerland",
    bestPhotoSpot: "Chapel Bridge (Kapellbrücke) from Rathausquai promenade at golden hour",
    dailyBudgetEst: "CHF 190 - 270 / day (Lodging: CHF 140, Dining: CHF 55, Lake boat: CHF 35)",
    highlights: ["14th-century Chapel Bridge & Water Tower", "Lake Lucerne Steamboat Cruise", "Mount Pilatus Golden Roundtrip", "Lion Monument"],
    vibe: "Romantic lakeside city framed by snowcapped peaks, medieval towers and painted guildhalls",
    tips: "Take the historic paddle steamer to Alpnachstad for the world's steepest cogwheel railway up to Pilatus.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80", label: "Chapel Bridge" },
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", label: "Lake Lucerne" },
      { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80", label: "Old Town Squares" },
      { url: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80", label: "Mount Pilatus" },
    ],
  },
  interlaken: {
    title: "Interlaken & Bernese Oberland",
    location: "Bernese Alps, Switzerland",
    bestPhotoSpot: "Harder Kulm Two-Lakes Bridge at sunset overlooking Eiger, Mönch & Jungfrau",
    dailyBudgetEst: "CHF 180 - 260 / day (Lodging: CHF 135, Dining: CHF 50, Transit: CHF 30)",
    highlights: ["Harder Kulm Funicular", "Lake Brienz Turquoise Waters", "Lake Thun Castles", "Gateway to Jungfrau Valley"],
    vibe: "The adventure capital of Europe flanked between two pristine turquoise glacial lakes",
    tips: "A Swiss Travel Pass covers the boats on both Lake Thun and Lake Brienz completely free of extra charge.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", label: "Harder Kulm View" },
      { url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80", label: "Lake Brienz" },
      { url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80", label: "Aare River Walk" },
      { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", label: "Jungfrau Panorama" },
    ],
  },
  lauterbrunnen: {
    title: "Lauterbrunnen Valley",
    location: "Bernese Oberland, Switzerland",
    bestPhotoSpot: "Staubbach Falls viewpoint from the churchyard lane at mid-morning light",
    dailyBudgetEst: "CHF 170 - 240 / day (Lodging: CHF 130, Dining: CHF 50, Excursions: CHF 35)",
    highlights: ["Staubbach Waterfall", "Trümmelbach Underground Glacial Cascades", "Mürren Cliffside Village", "Wengen Cableway"],
    vibe: "Fairy-tale glacial trough flanked by 300-meter cliffs and 72 cascading waterfalls",
    tips: "Visit Trümmelbach Falls inside the mountain cavern; it carries up to 20,000 liters of melted glacier water per second.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?auto=format&fit=crop&w=1200&q=80", label: "Staubbach Cascade" },
      { url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80", label: "Valley Floor" },
      { url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80", label: "Alpine Pastures" },
      { url: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80", label: "Clifftop Chalets" },
    ],
  },
  grindelwald: {
    title: "Grindelwald & Eiger Glacier",
    location: "Bernese Oberland, Switzerland",
    bestPhotoSpot: "First Cliff Walk suspended walkway overlooking the dramatic Eiger North Wall",
    dailyBudgetEst: "CHF 190 - 280 / day (Lodging: CHF 140, Dining: CHF 55, First Gondola: CHF 45)",
    highlights: ["First Cliff Walk by Tissot", "Bachalpsee Alpine Lake Hike", "Eiger Express 3S Gondola", "Grosse Scheidegg Pass"],
    vibe: "Postcard chalet village clustered beneath the legendary 1,800m sheer vertical Eiger North Face",
    tips: "Hike to Bachalpsee lake early in the morning when the water is perfectly still to photograph the Schreckhorn mirror reflection.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80", label: "First Cliff Walk" },
      { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", label: "Bachalpsee Lake" },
      { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", label: "Eiger North Face" },
      { url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80", label: "Village Meadows" },
    ],
  },
  zurich: {
    title: "Zurich & Lake Limmat",
    location: "Zurich, Switzerland",
    bestPhotoSpot: "Lindenhof hill terrace at sunrise overlooking Grossmünster and the Limmat river",
    dailyBudgetEst: "CHF 200 - 300 / day (Lodging: CHF 150, Dining: CHF 65, Transit: CHF 20)",
    highlights: ["Old Town (Altstadt) & Niederdorf", "Lake Zurich Promenade", "Bahnhofstrasse Shopping", "Kunsthaus Fine Art Museum"],
    vibe: "Cosmopolitan lakeside metropolis balancing historic medieval charm with cutting-edge art and culinary scenes",
    tips: "Grab fresh Luxemburgerli macarons from Café Sprüngli at Paradeplatz and stroll the lakeside park.",
    gallery: [
      { url: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1200&q=80", label: "Limmat Waterfront" },
      { url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80", label: "Historic Altstadt" },
      { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80", label: "Lakeside Sunset" },
      { url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80", label: "Lindenhof Terrace" },
    ],
  },
};

export function getLocationDetail(countryKey: string | null, destKey: string): DestinationDetail {
  const scenery = getScenery(countryKey, destKey);
  const detail = DESTINATION_DETAILS[destKey] || {};

  const defaultGallery: LocationGalleryItem[] = [
    { url: scenery.url, label: "Panoramic Vista" },
    { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", label: "Historic Old Town" },
    { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", label: "Alpine Trail & Lakes" },
    { url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80", label: "Golden Hour Glow" },
  ];

  return {
    key: destKey,
    title: detail.title || scenery.title,
    location: detail.location || scenery.location,
    countryKey: countryKey || "switzerland",
    heroUrl: scenery.url,
    gallery: detail.gallery || defaultGallery,
    bestPhotoSpot: detail.bestPhotoSpot || "Old Town viewpoint or lakeside promenade at golden hour (sunrise / sunset).",
    dailyBudgetEst: detail.dailyBudgetEst || "≈ $180 - $260 / day (Lodging: $135, Dining: $55, Activities: $40)",
    highlights: detail.highlights || ["Historic Old Town & Cobblestones", "Panoramic Mountain/Water Cableway", "Local Culinary & Wine Tasting"],
    vibe: detail.vibe || "Scenic destination with rich culture, scenic walking paths, and memorable regional gastronomy.",
    tips: detail.tips || "Book morning entry tickets online to bypass queues and catch the best morning mountain light.",
  };
}

