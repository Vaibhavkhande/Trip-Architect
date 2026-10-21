/* ==========================================================================
   GLOBAL TRIP ARCHITECT — COUNTRY DATA & CATALOG
   ========================================================================== */

export const TAGS = [
  "mountains", "scenic", "cities", "nature", "snow",
  "food", "luxury", "instagram", "adventure", "relaxed"
];

/* ---- Switzerland keeps its hand-authored rail matrix (highest fidelity) ---- */
export const CH_LEGS: [string, string, number][] = [
  ["zurich","lucerne",0.75],["zurich","interlaken",2.0],["zurich","lauterbrunnen",2.5],
  ["zurich","grindelwald",2.75],["zurich","jungfrau",3.5],["zurich","zermatt",3.25],
  ["zurich","geneva",2.75],["zurich","montreux",2.75],["zurich","bern",1.0],["zurich","basel",0.9],
  ["lucerne","interlaken",2.0],["lucerne","lauterbrunnen",2.5],["lucerne","grindelwald",2.75],
  ["lucerne","jungfrau",3.5],["lucerne","zermatt",3.5],["lucerne","geneva",3.25],
  ["lucerne","montreux",3.25],["lucerne","bern",1.0],["lucerne","basel",1.2],
  ["interlaken","lauterbrunnen",0.35],["interlaken","grindelwald",0.55],["interlaken","jungfrau",1.5],
  ["interlaken","zermatt",2.25],["interlaken","geneva",2.75],["interlaken","montreux",3.0],
  ["interlaken","bern",0.9],["interlaken","basel",2.0],
  ["lauterbrunnen","grindelwald",0.75],["lauterbrunnen","jungfrau",1.2],["lauterbrunnen","zermatt",2.5],
  ["lauterbrunnen","geneva",3.25],["lauterbrunnen","montreux",3.25],["lauterbrunnen","bern",1.4],
  ["lauterbrunnen","basel",2.5],
  ["grindelwald","jungfrau",1.0],["grindelwald","zermatt",2.75],["grindelwald","geneva",3.5],
  ["grindelwald","montreux",3.5],["grindelwald","bern",1.5],["grindelwald","basel",2.6],
  ["jungfrau","zermatt",3.0],["jungfrau","geneva",4.0],["jungfrau","montreux",4.0],
  ["jungfrau","bern",2.6],["jungfrau","basel",3.7],
  ["zermatt","geneva",3.75],["zermatt","montreux",2.75],["zermatt","bern",2.2],["zermatt","basel",3.3],
  ["geneva","montreux",1.1],["geneva","bern",1.8],["geneva","basel",2.7],
  ["montreux","bern",1.6],["montreux","basel",2.6],
  ["bern","basel",1.0],
];

export const OVERRIDES: Record<string, [string, string, number, string][]> = {
  japan: [
    ["tokyo","kyoto",2.3,"rail"], ["tokyo","osaka",2.5,"rail"], ["kyoto","osaka",0.5,"rail"],
    ["tokyo","hiroshima",4.0,"rail"], ["kyoto","hiroshima",1.5,"rail"], ["osaka","hiroshima",1.3,"rail"],
    ["kyoto","nara",0.75,"rail"], ["osaka","nara",0.5,"rail"], ["tokyo","nara",2.8,"rail"],
    ["tokyo","hakone",1.6,"rail"], ["kyoto","hakone",3.0,"rail"], ["osaka","hakone",3.3,"rail"],
    ["nara","hiroshima",1.9,"rail"], ["tokyo","sapporo",1.8,"flight"], ["kyoto","sapporo",3.2,"flight"],
    ["osaka","sapporo",2.9,"flight"], ["hiroshima","sapporo",3.6,"flight"], ["nara","sapporo",3.3,"flight"],
    ["hakone","sapporo",3.5,"flight"], ["nara","hakone",3.0,"rail"],
  ],
  italy: [
    ["rome","florence",1.5,"rail"], ["rome","venice",3.5,"rail"], ["rome","milan",3.0,"rail"],
    ["florence","venice",2.0,"rail"], ["florence","milan",1.75,"rail"], ["milan","venice",2.5,"rail"],
    ["florence","cinqueterre",2.0,"rail"], ["milan","cinqueterre",3.0,"rail"], ["rome","cinqueterre",3.3,"rail"],
    ["rome","amalfi",3.0,"road"], ["florence","amalfi",4.5,"road"], ["milan","amalfi",6.5,"road"],
    ["venice","cinqueterre",4.0,"rail"], ["venice","amalfi",6.5,"road"],
  ],
  peru: [
    ["lima","cusco",1.3,"flight"], ["lima","arequipa",1.2,"flight"],
    ["lima","sacredvalley",2.6,"flight"], ["lima","machupicchu",5.5,"flight"],
    ["cusco","sacredvalley",1.3,"road"], ["cusco","machupicchu",4.0,"rail"],
    ["cusco","arequipa",1.3,"flight"], ["sacredvalley","machupicchu",2.5,"rail"],
    ["sacredvalley","arequipa",4.5,"flight"], ["machupicchu","arequipa",5.5,"flight"],
    ["lima","amazon",1.5,"flight"], ["cusco","amazon",1.3,"flight"], ["arequipa","amazon",2.6,"flight"],
    ["sacredvalley","amazon",2.2,"flight"], ["machupicchu","amazon",2.8,"flight"],
  ],
  thailand: [
    ["bangkok","chiangmai",1.2,"flight"], ["bangkok","phuket",1.3,"flight"],
    ["bangkok","krabi",1.3,"flight"], ["bangkok","kohsamui",1.3,"flight"],
    ["chiangmai","phuket",2.0,"flight"], ["chiangmai","krabi",2.0,"flight"],
    ["chiangmai","kohsamui",2.1,"flight"], ["phuket","krabi",2.2,"road"],
    ["krabi","kohsamui",4.0,"ferry"], ["phuket","kohsamui",5.0,"road"],
    ["bangkok","ayutthaya",1.3,"rail"],
  ],
  morocco: [
    ["marrakech","fes",1.3,"flight"], ["marrakech","chefchaouen",6.5,"road"],
    ["marrakech","sahara",9.0,"road"], ["fes","chefchaouen",4.0,"road"],
    ["fes","sahara",6.0,"road"], ["chefchaouen","sahara",9.5,"road"],
    ["marrakech","essaouira",2.7,"road"], ["fes","essaouira",8.5,"road"],
    ["chefchaouen","essaouira",8.0,"road"], ["sahara","essaouira",9.5,"road"],
    ["marrakech","atlas",1.2,"road"], ["fes","atlas",6.5,"road"], ["sahara","atlas",8.0,"road"],
    ["chefchaouen","atlas",7.0,"road"], ["essaouira","atlas",3.2,"road"],
  ],
};

export const OVERRIDE_MAP: Record<string, Record<string, { h: number; mode: string }>> = {};
Object.entries(OVERRIDES).forEach(([country, legs]) => {
  OVERRIDE_MAP[country] = {};
  legs.forEach(([a, b, h, mode]) => {
    OVERRIDE_MAP[country][a < b ? a + "|" + b : b + "|" + a] = { h, mode };
  });
});

export interface Destination {
  lat: number;
  lon: number;
  base: number;
  tags: string[];
  line: string;
  acts: string[];
  hub?: boolean;
  secondary?: boolean;
  excursion?: boolean;
}

export interface CountryConfig {
  key: string;
  name: string;
  flag: string;
  currency: string;
  costTier: number;
  accent: string;
  accent2: string;
  terrain: string;
  tagline: string;
  transitMode: string;
  speedKmh: number;
  overhead: number;
  legs?: [string, string, number][];
  season: (m: number) => { tone: "ok" | "good" | "warn"; text: string };
  dest: Record<string, Destination>;
}

export const COUNTRIES: Record<string, CountryConfig> = {
  switzerland: {
    key: "switzerland", name: "Switzerland", flag: "🇨🇭", currency: "CHF", costTier: 1.35,
    accent: "#0284C7", accent2: "#0D9488", terrain: "alpine",
    tagline: "Lakes, glaciers, and trains that run on time.",
    transitMode: "rail", speedKmh: 68, overhead: 0.25,
    legs: CH_LEGS,
    season: (m) => {
      if (m <= 1 || m === 11) return { tone: "warn", text: "Deep winter. High-altitude lifts run, but valley trails and lake boats are shut." };
      if (m === 2) return { tone: "ok", text: "Late ski season, valleys thawing." };
      if (m === 3 || m === 4) return { tone: "warn", text: "Shoulder season — some mountain railways close for spring maintenance." };
      if (m >= 5 && m <= 7) return { tone: "ok", text: "Peak season. Everything open, everything full — book ahead." };
      if (m === 8 || m === 9) return { tone: "good", text: "Best value window — clear air, thinner crowds." };
      return { tone: "warn", text: "Lowest season. Many mountain railways close for November maintenance." };
    },
    dest: {
      zurich: { lat: 47.377, lon: 8.542, base: 6, tags: ["cities","food","luxury","instagram"], hub: true,
        line: "Lakeside banking capital with a scruffy, likeable old town.",
        acts: ["Old Town walk through Niederdorf", "Lake Zurich promenade and boat", "Bahnhofstrasse shopping mile", "Lindt Home of Chocolate", "Uetliberg viewpoint hike"] },
      lucerne: { lat: 47.050, lon: 8.309, base: 8, tags: ["cities","nature","scenic","instagram","food"],
        line: "Medieval waterfront with two big mountains on its doorstep.",
        acts: ["Chapel Bridge and Water Tower", "Lake Lucerne boat cruise", "Mount Pilatus golden round trip", "Mount Rigi cogwheel railway", "Musegg Wall towers walk"] },
      interlaken: { lat: 46.686, lon: 7.863, base: 9, tags: ["nature","adventure","mountains","scenic"],
        line: "The hinge between two lakes and the whole Jungfrau region.",
        acts: ["Harder Kulm funicular at sunset", "Lake Thun and Brienz cruise", "Paragliding over the valley", "St. Beatus Caves", "Iseltwald lakeside village"] },
      lauterbrunnen: { lat: 46.593, lon: 7.909, base: 8, tags: ["nature","mountains","instagram","relaxed","adventure"],
        line: "Seventy-two waterfalls down a vertical valley.",
        acts: ["Staubbach Falls valley floor walk", "Trümmelbach Falls", "Mürren and Schilthorn cable car", "Wengen village", "Grütschalp panorama walk"] },
      grindelwald: { lat: 46.624, lon: 8.034, base: 8, tags: ["mountains","snow","adventure","nature","instagram"],
        line: "Sits directly under the Eiger north face.",
        acts: ["First Cliff Walk and zipline", "Bachalpsee lake hike", "Pfingstegg toboggan run", "Glacier Canyon walk", "Eiger north face viewpoint"] },
      jungfrau: { lat: 46.547, lon: 7.985, base: 9, excursion: true, tags: ["mountains","snow","scenic","instagram"],
        line: "Jungfraujoch, 3,454 m — an excursion, not a place to sleep.",
        acts: ["Jungfraujoch Top of Europe railway", "Sphinx Observatory deck", "Aletsch Glacier viewpoint", "Ice Palace tunnels", "Kleine Scheidegg walk"] },
      zermatt: { lat: 46.021, lon: 7.749, base: 9, tags: ["mountains","snow","luxury","instagram","adventure","scenic"],
        line: "Car-free, and the only place you see the Matterhorn properly.",
        acts: ["Gornergrat railway Matterhorn view", "Matterhorn Glacier Paradise", "Sunnegga Five Lakes walk", "Car-free village centre", "Riffelsee reflection point"] },
      geneva: { lat: 46.204, lon: 6.143, base: 6, tags: ["cities","luxury","food","relaxed"], hub: true,
        line: "International, expensive, and a long way from the mountains.",
        acts: ["Jet d'Eau fountain", "Old Town and St. Pierre Cathedral", "Lake Geneva promenade", "CERN visitor centre", "Patek Philippe Museum"] },
      montreux: { lat: 46.431, lon: 6.911, base: 7, tags: ["relaxed","scenic","food","nature","luxury"],
        line: "Vineyard terraces, a lake castle, a gentler climate.",
        acts: ["Chillon Castle", "Lavaux vineyard terrace walk", "Lakeside promenade", "Rochers-de-Naye cog railway", "Vevey old town"] },
      bern: { lat: 46.948, lon: 7.447, base: 7, secondary: true, tags: ["cities","food","instagram","relaxed"], hub: true,
        line: "UNESCO old town sitting on the main line to everywhere.",
        acts: ["Old Town and Zytglogge clock", "Bear Park on the Aare bend", "Rosengarten viewpoint", "Einstein House", "Aare river swim in summer"] },
      basel: { lat: 47.560, lon: 7.589, base: 6, secondary: true, tags: ["cities","food"], hub: true,
        line: "Art museums and the Rhine, on the German-French corner.",
        acts: ["Kunstmuseum Basel", "Old Town and Marktplatz", "Rhine ferry and river swim", "Fondation Beyeler", "Basel Minster terrace"] },
    },
  },

  japan: {
    key: "japan", name: "Japan", flag: "🇯🇵", currency: "JPY→USD est.", costTier: 1.1,
    accent: "#4F46E5", accent2: "#0284C7", terrain: "temple-neon",
    tagline: "Bullet trains, ancient shrines, and cities that never quite sleep.",
    transitMode: "rail", speedKmh: 78, overhead: 0.35,
    season: (m) => {
      if (m === 2 || m === 3) return { tone: "good", text: "Cherry blossom season in late March to early April — glorious, and booked out months ahead." };
      if (m >= 5 && m <= 8) return { tone: "warn", text: "Hot, humid summer with a rainy season in June. Typhoon risk builds from August." };
      if (m === 9 || m === 10) return { tone: "good", text: "Autumn foliage season from mid-October — comfortable and clear." };
      if (m === 11 || m === 0) return { tone: "ok", text: "Cool and dry, good visibility, thinner crowds outside New Year." };
      return { tone: "ok", text: "Cold in the north, mild in the south — ski season in Hokkaido and the Alps." };
    },
    dest: {
      tokyo: { lat: 35.68, lon: 139.77, base: 9, tags: ["cities","food","luxury","instagram"], hub: true,
        line: "Neon, shrines, and the best train network on earth, all layered together.",
        acts: ["Shibuya Crossing and Shibuya Sky", "Senso-ji Temple in Asakusa", "Tsukiji Outer Market food crawl", "teamLab digital art museum", "Shinjuku Golden Gai at night"] },
      kyoto: { lat: 35.01, lon: 135.77, base: 9, tags: ["cities","cities","instagram","food","relaxed"],
        line: "A thousand years of temples, still standing.",
        acts: ["Fushimi Inari torii gate trail", "Arashiyama bamboo grove", "Gion district at dusk", "Kinkaku-ji golden pavilion", "Kaiseki dinner in a machiya house"] },
      osaka: { lat: 34.69, lon: 135.50, base: 7, tags: ["cities","food"],
        line: "Japan's kitchen, and the loudest fun in the country.",
        acts: ["Dotonbori street food crawl", "Osaka Castle grounds", "Kuromon Ichiba Market", "Universal Studios Japan", "Umeda Sky Building at sunset"] },
      hakone: { lat: 35.23, lon: 139.03, base: 8, tags: ["nature","mountains","relaxed","scenic"],
        line: "Onsen towns with Mount Fuji on a clear day.",
        acts: ["Hakone ropeway over the volcanic valley", "Lake Ashi pirate boat cruise", "Traditional ryokan onsen soak", "Hakone Open-Air Museum", "Mount Fuji viewpoint on a clear morning"] },
      nara: { lat: 34.69, lon: 135.83, base: 6, tags: ["cities","nature","instagram"],
        line: "Free-roaming deer and one of the oldest wooden buildings alive.",
        acts: ["Nara Park deer feeding", "Todai-ji Great Buddha hall", "Kasuga Taisha lantern paths", "Naramachi old merchant district"] },
      hiroshima: { lat: 34.40, lon: 132.46, base: 7, tags: ["cities","relaxed"],
        line: "A hard history, and one of the country's most peaceful cities today.",
        acts: ["Peace Memorial Park and Museum", "Itsukushima Shrine floating torii on Miyajima", "Okonomimura food building", "Shukkei-en garden"] },
      sapporo: { lat: 43.06, lon: 141.35, base: 7, tags: ["snow","adventure","food"],
        line: "Hokkaido's gateway — powder snow and cold-weather food done right.",
        acts: ["Niseko or Furano ski slopes", "Sapporo Snow Festival (Feb)", "Ramen alley crawl", "Otaru canal town day trip"] },
    },
  },

  italy: {
    key: "italy", name: "Italy", flag: "🇮🇹", currency: "EUR→USD est.", costTier: 1.05,
    accent: "#0284C7", accent2: "#0F766E", terrain: "renaissance-coast",
    tagline: "Renaissance cities, coastline, and food worth planning a day around.",
    transitMode: "rail", speedKmh: 72, overhead: 0.3,
    season: (m) => {
      if (m >= 5 && m <= 7) return { tone: "warn", text: "Peak heat and peak crowds, especially on the coast. Book coastal towns months ahead." };
      if (m === 3 || m === 4 || m === 8 || m === 9) return { tone: "good", text: "The sweet spot — warm, walkable, and the crowds have thinned." };
      if (m === 11 || m === 0) return { tone: "ok", text: "Quiet and cool. Coastal towns wind down; cities keep going." };
      return { tone: "ok", text: "Mild in the south, cold and foggy in the Po valley." };
    },
    dest: {
      rome: { lat: 41.90, lon: 12.50, base: 9, tags: ["cities","food","luxury","instagram"], hub: true,
        line: "Three thousand years of history stacked on top of itself.",
        acts: ["Colosseum and Roman Forum", "Vatican Museums and Sistine Chapel", "Trastevere evening food crawl", "Trevi Fountain at dawn", "Borghese Gallery gardens"] },
      florence: { lat: 43.77, lon: 11.26, base: 8, tags: ["cities","food","luxury","instagram"],
        line: "The Renaissance, compact enough to walk in a day.",
        acts: ["Uffizi Gallery", "Duomo dome climb", "Ponte Vecchio at golden hour", "Boboli Gardens", "Bistecca alla Fiorentina dinner"] },
      venice: { lat: 45.44, lon: 12.32, base: 9, tags: ["cities","instagram","luxury","relaxed"],
        line: "A city built on water, best seen by getting a little lost in it.",
        acts: ["St. Mark's Square and Basilica", "Grand Canal vaporetto ride", "Burano's colored houses", "Rialto Market morning walk", "Gondola ride at sunset"] },
      cinqueterre: { lat: 44.10, lon: 9.71, base: 8, tags: ["nature","scenic","relaxed","instagram"],
        line: "Five cliffside villages, one coastal footpath.",
        acts: ["Sentiero Azzurro coastal trail", "Vernazza harbour swim", "Monterosso beach", "Focaccia and pesto tasting", "Manarola sunset viewpoint"] },
      amalfi: { lat: 40.63, lon: 14.60, base: 9, tags: ["luxury","scenic","relaxed","instagram","nature"],
        line: "Cliffside towns and the most photographed coast road in Europe.",
        acts: ["Positano cliffside town", "Path of the Gods hike", "Ravello garden villas", "Amalfi Cathedral", "Boat trip to Capri"] },
      milan: { lat: 45.46, lon: 9.19, base: 6, tags: ["cities","luxury","food"], hub: true,
        line: "Fashion, finance, and a cathedral that took six centuries to finish.",
        acts: ["Duomo rooftop terraces", "Galleria Vittorio Emanuele II", "Navigli canal district", "The Last Supper viewing", "Quadrilatero della Moda shopping"] },
    },
  },

  thailand: {
    key: "thailand", name: "Thailand", flag: "🇹🇭", currency: "THB→USD est.", costTier: 0.55,
    accent: "#0D9488", accent2: "#0284C7", terrain: "tropical-islands",
    tagline: "Temples, jungle, and islands that live up to the postcards.",
    transitMode: "mixed", speedKmh: 52, overhead: 0.75,
    season: (m) => {
      if (m >= 10 || m <= 1) return { tone: "good", text: "Cool, dry season — the best time to visit almost anywhere in the country." };
      if (m >= 2 && m <= 4) return { tone: "warn", text: "Hot season. Cities are punishing at midday; islands are still good." };
      return { tone: "warn", text: "Southwest monsoon. Andaman coast (Phuket, Krabi) gets wet; Gulf coast (Koh Samui) stays drier." };
    },
    dest: {
      bangkok: { lat: 13.76, lon: 100.50, base: 8, tags: ["cities","food","instagram"], hub: true,
        line: "Golden temples, street food, and organized chaos.",
        acts: ["Grand Palace and Wat Phra Kaew", "Chatuchak Weekend Market", "Chao Phraya river boat", "Street food crawl in Chinatown", "Rooftop bar at sunset"] },
      chiangmai: { lat: 18.79, lon: 98.99, base: 7, tags: ["nature","relaxed","food","instagram"],
        line: "Mountain temples and a slower northern pace.",
        acts: ["Doi Suthep temple", "Old City moat walk", "Ethical elephant sanctuary visit", "Sunday Walking Street market", "Cooking class in a local kitchen"] },
      phuket: { lat: 7.89, lon: 98.40, base: 7, tags: ["relaxed","luxury","nature"],
        line: "The big beach base, with day trips to smaller islands.",
        acts: ["Patong beach and nightlife", "Phi Phi Islands day trip", "Big Buddha viewpoint", "Old Town Sino-Portuguese streets"] },
      krabi: { lat: 8.09, lon: 98.91, base: 8, tags: ["nature","adventure","instagram","relaxed"],
        line: "Limestone cliffs rising straight out of turquoise water.",
        acts: ["Railay Beach and climbing cliffs", "Four Islands longtail boat tour", "Emerald Pool and hot springs", "Tiger Cave Temple stair climb"] },
      kohsamui: { lat: 9.51, lon: 100.01, base: 7, tags: ["relaxed","luxury","instagram"],
        line: "Palm-lined beaches on the calmer Gulf side.",
        acts: ["Chaweng Beach", "Ang Thong Marine Park boat trip", "Fisherman's Village night market", "Big Buddha Temple"] },
      ayutthaya: { lat: 14.35, lon: 100.58, base: 6, tags: ["cities","instagram"],
        line: "The old capital, now a field of temple ruins.",
        acts: ["Wat Mahathat's tree-root Buddha head", "Bicycle tour of the ruins", "Wat Chaiwatthanaram at sunset"] },
    },
  },

  iceland: {
    key: "iceland", name: "Iceland", flag: "🇮🇸", currency: "ISK→USD est.", costTier: 1.5,
    accent: "#38BDF8", accent2: "#6366F1", terrain: "glacier-volcanic",
    tagline: "Waterfalls, glaciers, and a road that circles the whole country.",
    transitMode: "road", speedKmh: 62, overhead: 0.2,
    season: (m) => {
      if (m >= 5 && m <= 7) return { tone: "good", text: "Midnight sun and the full Ring Road open — peak season for a reason." };
      if (m === 3 || m === 4 || m === 8 || m === 9) return { tone: "ok", text: "Shoulder season — good light, thinner crowds, some highland roads still closed." };
      return { tone: "warn", text: "Short days and possible road closures, but this is aurora season." };
    },
    dest: {
      reykjavik: { lat: 64.15, lon: -21.94, base: 7, tags: ["cities","food","relaxed"], hub: true,
        line: "The world's northernmost capital, small enough to walk across.",
        acts: ["Hallgrímskirkja church tower", "Old Harbour whale watching", "Sun Voyager sculpture walk", "Blue Lagoon geothermal spa"] },
      golden: { lat: 64.31, lon: -20.12, base: 8, tags: ["nature","instagram","scenic"],
        line: "The Golden Circle — three headline sights in one loop.",
        acts: ["Gullfoss waterfall", "Geysir geothermal field", "Þingvellir National Park rift walk", "Kerið volcanic crater"] },
      southcoast: { lat: 63.63, lon: -19.06, base: 9, tags: ["nature","adventure","instagram"],
        line: "Waterfalls, black beaches, and glacier tongues along one road.",
        acts: ["Seljalandsfoss waterfall you can walk behind", "Reynisfjara black sand beach", "Sólheimajökull glacier hike", "Skógafoss waterfall stairs"] },
      jokulsarlon: { lat: 64.05, lon: -16.18, base: 9, tags: ["nature","instagram","adventure"],
        line: "A glacier lagoon full of icebergs drifting out to sea.",
        acts: ["Jökulsárlón iceberg lagoon boat tour", "Diamond Beach ice on black sand", "Vatnajökull glacier hike"] },
      snaefellsnes: { lat: 64.87, lon: -23.77, base: 7, tags: ["nature","relaxed","instagram"],
        line: "Iceland in miniature — one peninsula, every landscape.",
        acts: ["Kirkjufell mountain viewpoint", "Snæfellsjökull glacier volcano", "Djúpalónssandur black pebble beach"] },
      myvatn: { lat: 65.61, lon: -16.98, base: 8, tags: ["nature","relaxed","adventure"],
        line: "The volcanic north, with its own geothermal bathing spot.",
        acts: ["Mývatn Nature Baths", "Dimmuborgir lava formations", "Hverir geothermal mud pools", "Goðafoss waterfall"] },
    },
  },

  peru: {
    key: "peru", name: "Peru", flag: "🇵🇪", currency: "PEN→USD est.", costTier: 0.65,
    accent: "#2563EB", accent2: "#0891B2", terrain: "andes-amazon",
    tagline: "Andean peaks, colonial cities, and one very famous ruin.",
    transitMode: "road", speedKmh: 42, overhead: 0.4,
    season: (m) => {
      if (m >= 4 && m <= 8) return { tone: "good", text: "Dry season in the highlands — the best window for Machu Picchu and the Inca Trail." };
      if (m >= 11 || m <= 2) return { tone: "warn", text: "Wet season in the Andes; trails get muddy and some close in February." };
      return { tone: "ok", text: "Shoulder season — fewer crowds, some rain." };
    },
    dest: {
      lima: { lat: -12.05, lon: -77.04, base: 6, tags: ["cities","food","luxury"], hub: true,
        line: "One of the world's great food cities, on a desert coastline.",
        acts: ["Miraflores clifftop boardwalk", "Barranco street art district", "Ceviche and pisco sour tasting", "Larco Museum pre-Columbian art"] },
      cusco: { lat: -13.53, lon: -71.97, base: 8, tags: ["cities","mountains","instagram"],
        line: "The old Inca capital, at an altitude that takes a day to adjust to.",
        acts: ["Plaza de Armas and cathedral", "Sacsayhuamán ruins above the city", "San Pedro Market", "Coca tea acclimatization day"] },
      sacredvalley: { lat: -13.32, lon: -72.11, base: 8, tags: ["nature","cities","instagram","relaxed"],
        line: "Terraced Inca farmland, lower and warmer than Cusco.",
        acts: ["Pisac ruins and market", "Ollantaytambo fortress", "Maras salt pans", "Moray agricultural terraces"] },
      machupicchu: { lat: -13.16, lon: -72.55, base: 9, excursion: true, tags: ["mountains","instagram","adventure"],
        line: "The reason most people came to Peru in the first place.",
        acts: ["Machu Picchu citadel at sunrise", "Huayna Picchu peak climb (permit required)", "Aguas Calientes hot springs", "Inca Bridge trail"] },
      arequipa: { lat: -16.40, lon: -71.54, base: 6, tags: ["cities","mountains","relaxed"],
        line: "The White City, framed by three volcanoes.",
        acts: ["Santa Catalina Monastery", "Colca Canyon condor viewpoint", "Plaza de Armas volcanic-stone architecture"] },
      amazon: { lat: -12.60, lon: -69.18, base: 8, tags: ["nature","adventure"],
        line: "Rainforest lodges reachable only by river.",
        acts: ["Amazon river canoe trip", "Night jungle walk for wildlife", "Canopy walkway above the treeline", "Local community river visit"] },
    },
  },

  greece: {
    key: "greece", name: "Greece", flag: "🇬🇷", currency: "EUR→USD est.", costTier: 0.85,
    accent: "#0284C7", accent2: "#38BDF8", terrain: "aegean-islands",
    tagline: "Whitewashed islands, ancient ruins, and the Aegean in between.",
    transitMode: "ferry", speedKmh: 48, overhead: 0.9,
    season: (m) => {
      if (m >= 5 && m <= 8) return { tone: "warn", text: "Peak heat and peak ferry crowds. Book island accommodation early." };
      if (m === 3 || m === 4 || m === 8 || m === 9) return { tone: "good", text: "Warm sea, thinner crowds, full ferry schedules." };
      return { tone: "warn", text: "Many island ferries and hotels reduce service or close for the winter." };
    },
    dest: {
      athens: { lat: 37.98, lon: 23.73, base: 7, tags: ["cities","food","instagram"], hub: true,
        line: "The Acropolis, and a genuinely good food scene underneath it.",
        acts: ["Acropolis and Parthenon", "Plaka old town streets", "National Archaeological Museum", "Rooftop dinner facing the Acropolis"] },
      santorini: { lat: 36.39, lon: 25.46, base: 9, tags: ["luxury","instagram","relaxed","scenic"],
        line: "Blue domes over a volcanic caldera. Yes, it looks like the photos.",
        acts: ["Oia sunset walk", "Fira caldera-edge trail", "Volcano and hot springs boat tour", "Red Beach"] },
      mykonos: { lat: 37.45, lon: 25.33, base: 7, tags: ["luxury","relaxed","instagram"],
        line: "Windmills, whitewashed lanes, and the liveliest beach scene in Greece.",
        acts: ["Little Venice at sunset", "Windmills of Mykonos", "Paradise Beach", "Old Town winding-lane walk"] },
      crete: { lat: 35.24, lon: 24.81, base: 8, tags: ["nature","food","relaxed","adventure"],
        line: "The biggest island — mountains, gorges, and its own cuisine.",
        acts: ["Samaria Gorge hike", "Knossos Minoan palace ruins", "Elafonissi pink sand beach", "Chania Old Town harbour"] },
      naxos: { lat: 37.10, lon: 25.38, base: 6, tags: ["relaxed","nature","food"],
        line: "Bigger, greener, and far less crowded than its famous neighbours.",
        acts: ["Portara ancient gate at sunset", "Naxos Town castle quarter", "Local cheese and wine tasting", "Plaka Beach"] },
      rhodes: { lat: 36.43, lon: 28.22, base: 7, tags: ["cities","instagram","relaxed"],
        line: "A walled medieval old town, on an island with real beaches too.",
        acts: ["Rhodes Old Town cobbled streets", "Palace of the Grand Master", "Lindos Acropolis climb", "Anthony Quinn Bay swim"] },
    },
  },

  morocco: {
    key: "morocco", name: "Morocco", flag: "🇲🇦", currency: "MAD→USD est.", costTier: 0.6,
    accent: "#2563EB", accent2: "#0D9488", terrain: "desert-medina",
    tagline: "Desert dunes, mountain kasbahs, and medinas built to get lost in.",
    transitMode: "road", speedKmh: 55, overhead: 0.3,
    season: (m) => {
      if (m >= 2 && m <= 4) return { tone: "good", text: "Spring — warm days, cool desert nights, everything open." };
      if (m >= 5 && m <= 8) return { tone: "warn", text: "Very hot inland and in the desert; the coast stays more bearable." };
      if (m === 9 || m === 10) return { tone: "good", text: "Autumn — similar to spring, and the harvest season in wine country." };
      return { tone: "ok", text: "Mild days, cold desert nights — pack layers for the Sahara." };
    },
    dest: {
      marrakech: { lat: 31.63, lon: -7.99, base: 9, tags: ["cities","food","instagram","luxury"], hub: true,
        line: "The medina everyone means when they say 'lost in the souks'.",
        acts: ["Jemaa el-Fnaa square at dusk", "Souk shopping and haggling", "Bahia Palace", "Majorelle Garden", "Rooftop tagine dinner"] },
      fes: { lat: 34.03, lon: -5.00, base: 8, tags: ["cities","instagram","food"],
        line: "The oldest and least touristed of the imperial cities.",
        acts: ["Fes el-Bali medina walk", "Chouara Tannery viewpoint", "Al-Attarine Madrasa", "Blue Gate (Bab Boujeloud)"] },
      sahara: { lat: 31.10, lon: -3.98, base: 9, excursion: true, tags: ["adventure","nature","instagram"],
        line: "Camel treks and a night under more stars than you've seen before.",
        acts: ["Camel trek into the Erg Chebbi dunes", "Overnight desert camp", "Sunrise over the dunes", "Berber village visit"] },
      chefchaouen: { lat: 35.17, lon: -5.27, base: 8, tags: ["instagram","relaxed","nature"],
        line: "An entire mountain town painted in shades of blue.",
        acts: ["Blue medina wandering", "Spanish Mosque viewpoint hike", "Ras El Maa waterfall", "Rooftop mint tea"] },
      essaouira: { lat: 31.51, lon: -9.77, base: 7, tags: ["relaxed","food","nature"],
        line: "A windswept fishing port with the calmest pace in the country.",
        acts: ["Medina ramparts walk", "Fresh seafood grill at the port", "Essaouira beach", "Skala de la Ville sea walls"] },
      atlas: { lat: 31.06, lon: -7.91, base: 7, tags: ["mountains","nature","adventure"],
        line: "Berber villages an hour from Marrakech, with real hiking trails.",
        acts: ["Toubkal foothills day hike", "Berber village and mule trail", "Ourika Valley waterfalls", "Local argan oil cooperative visit"] },
    },
  },
};

export function startOptions(country: CountryConfig): string[] {
  return Object.keys(country.dest);
}

export const DISPLAY_NAMES: Record<string, string> = {
  zurich:"Zurich", lucerne:"Lucerne", interlaken:"Interlaken", lauterbrunnen:"Lauterbrunnen",
  grindelwald:"Grindelwald", jungfrau:"Jungfrau Region", zermatt:"Zermatt", geneva:"Geneva",
  montreux:"Montreux", bern:"Bern", basel:"Basel",
  tokyo:"Tokyo", kyoto:"Kyoto", osaka:"Osaka", hakone:"Hakone", nara:"Nara", hiroshima:"Hiroshima", sapporo:"Sapporo",
  rome:"Rome", florence:"Florence", venice:"Venice", cinqueterre:"Cinque Terre", amalfi:"Amalfi Coast", milan:"Milan",
  bangkok:"Bangkok", chiangmai:"Chiang Mai", phuket:"Phuket", krabi:"Krabi", kohsamui:"Koh Samui", ayutthaya:"Ayutthaya",
  reykjavik:"Reykjavik", golden:"Golden Circle", southcoast:"South Coast", jokulsarlon:"Jökulsárlón", snaefellsnes:"Snæfellsnes", myvatn:"Lake Mývatn",
  lima:"Lima", cusco:"Cusco", sacredvalley:"Sacred Valley", machupicchu:"Machu Picchu", arequipa:"Arequipa", amazon:"Amazon Rainforest",
  athens:"Athens", santorini:"Santorini", mykonos:"Mykonos", crete:"Crete", naxos:"Naxos", rhodes:"Rhodes",
  marrakech:"Marrakech", fes:"Fes", sahara:"Sahara Desert", chefchaouen:"Chefchaouen", essaouira:"Essaouira", atlas:"Atlas Mountains",
};

export function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const nm = (k: string): string => DISPLAY_NAMES[k] || cap(k);

export function money(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}

export const INTERESTS = [
  { id: "mountains", label: "Mountains" }, { id: "scenic", label: "Scenic routes" },
  { id: "cities", label: "Cities" }, { id: "nature", label: "Nature" }, { id: "snow", label: "Snow" },
  { id: "food", label: "Food" }, { id: "luxury", label: "Luxury" }, { id: "instagram", label: "Photo spots" },
  { id: "adventure", label: "Adventure" }, { id: "relaxed", label: "Slow travel" },
];

export const INT_LABEL: Record<string, string> = Object.fromEntries(INTERESTS.map((i) => [i.id, i.label]));

export const PROFILES = [
  { id: "firsttime", label: "First-timer", note: "Cover the headline sights without overreaching." },
  { id: "family", label: "Family, young kids", note: "Shorter transfers, no pre-dawn starts." },
  { id: "seniors", label: "With parents / seniors", note: "Fewer bases, step-free where possible." },
  { id: "honeymoon", label: "Honeymoon", note: "Fewer, better — more nights per base." },
  { id: "friends", label: "Friends group", note: "Room for a faster pace and nightlife." },
  { id: "solo", label: "Solo", note: "Flexible, budget stretches further alone." },
];

export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export const BUDGET_TIERS: Record<string, { label: string; perDay: number }> = {
  budget: { label: "Backpacker", perDay: 65 },
  mid: { label: "Mid-range", perDay: 150 },
  premium: { label: "Premium", perDay: 310 },
};

export const DEFAULTS = {
  pace: "balanced",
  interests: ["nature", "scenic"],
  must: [] as string[],
  budget: "mid",
  month: 6,
  lambda: 2.5,
  capBonus: 0,
  oneWay: false,
};

export const EXPERIENCE_ICONS: Record<string, string> = {
  nature:"🏔️", scenic:"🌄", food:"🍴", adventure:"🥾", cities:"🏙️",
  culture:"🏛️", relaxed:"🧘", instagram:"📸", luxury:"✨", snow:"❄️"
};
