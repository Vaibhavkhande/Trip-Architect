/* ==========================================================================
   REEL & VIRAL VIDEO IDEAS CATALOG
   Curated hooks, shot lists, camera angles, and viral concepts for places
   ========================================================================== */

export interface ReelShot {
  timing: string;
  action: string;
  cameraTip: string;
}

export interface ReelIdea {
  id: string;
  countryKey: string;
  placeKey: string;
  placeName: string;
  spotName: string;
  styleId: "pov-transition" | "scenic-cinematic" | "hidden-gem" | "foodie-taste" | "travel-hacks";
  title: string;
  hookOverlay: string; // The 3-second text hook on screen
  audioVibe: string;
  bestTimeToFilm: string;
  shots: ReelShot[];
  caption: string;
  hashtags: string[];
  viralPotential: "🔥 Ultra-Viral (100k+ reach)" | "✨ Aesthetic Save-Magnet" | "💡 High Shareability";
  difficulty: "Easy (Single phone)" | "Medium (Gimbal/Pacing)" | "Pro (Golden Hour sync)";
  image: string;
}

export const REEL_STYLE_TYPES = [
  { id: "all", label: "All Reel Styles", icon: "🎬", desc: "Browse all content blueprints" },
  { id: "pov-transition", label: "POV & Snap Transitions", icon: "⚡", desc: "First-person walking, door/window reveals, beat-sync cuts" },
  { id: "scenic-cinematic", label: "Cinematic & Golden Hour", icon: "🌅", desc: "Atmospheric B-roll, slow pan, reflections, sun flares" },
  { id: "hidden-gem", label: "Secret Spots & Hidden Views", icon: "🔍", desc: "Off-the-beaten-track vantage points that get millions of saves" },
  { id: "foodie-taste", label: "Sensory Food & Street Crawl", icon: "🍜", desc: "First-bite crunches, cheese pulls, sizzling pan transitions" },
  { id: "travel-hacks", label: "Money Hacks & Pro Tips", icon: "💡", desc: "High-value travel advice, train ticket tricks, best timings" },
];

export const CURATED_REEL_IDEAS: ReelIdea[] = [
  /* ---------------- SWITZERLAND ---------------- */
  {
    id: "reel-ch-zermatt-train",
    countryKey: "switzerland",
    placeKey: "zermatt",
    placeName: "Zermatt",
    spotName: "Gornergrat Bahn Window",
    styleId: "pov-transition",
    title: "The 3-Second Swiss Train Window Reveal",
    hookOverlay: "Wait for the turn… Switzerland is not a real country 🤯🏔️",
    audioVibe: "Acoustic strings crescendo syncing to the mountain reveal",
    bestTimeToFilm: "08:15 AM (Sun hitting the east face of the Matterhorn)",
    shots: [
      { timing: "0:00 - 0:02", action: "Dark interior of the wooden cogwheel carriage, phone pointed at the side glass window", cameraTip: "Lock auto-exposure so window isn't blown out" },
      { timing: "0:02 - 0:05", action: "Train curves round the bend; the Matterhorn suddenly towers into full view against crisp blue sky", cameraTip: "Smooth slow push-forward towards the pane" },
      { timing: "0:05 - 0:08", action: "Cut to traveler stepping onto the snow terrace with a hot chocolate mug", cameraTip: "Lower angle looking slightly upward" },
    ],
    caption: "POV: You booked the morning Gornergrat cogwheel train and grabbed the right-side window seat. No filter, just pure Swiss Alps magic. Save this tip: Sit on the RIGHT side heading up from Zermatt for the uninterrupted Matterhorn view!",
    hashtags: ["#Zermatt", "#Matterhorn", "#SwitzerlandTravel", "#TravelReels", "#SwissAlps", "#POVTravel"],
    viralPotential: "🔥 Ultra-Viral (100k+ reach)",
    difficulty: "Easy (Single phone)",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-ch-zermatt-riffelsee",
    countryKey: "switzerland",
    placeKey: "zermatt",
    placeName: "Zermatt",
    spotName: "Riffelsee Reflection Mirror",
    styleId: "scenic-cinematic",
    title: "The Glass Mirror Matterhorn Reflection",
    hookOverlay: "Turn your phone upside down… you can’t tell which side is real 🏔️🪞",
    audioVibe: "Cinematic ethereal ambient pad with quiet wind",
    bestTimeToFilm: "07:30 AM (Zero wind before breeze ripples the water)",
    shots: [
      { timing: "0:00 - 0:03", action: "Camera skimming 2 inches above the crystalline lake surface, showing the inverted peak in water", cameraTip: "Invert your phone upside down so the lens touches the waterline" },
      { timing: "0:03 - 0:06", action: "Slow tilt upward from water reflection to the genuine Matterhorn rising into the dawn sky", cameraTip: "0.5x ultra-wide lens, 60fps slow motion" },
      { timing: "0:06 - 0:09", action: "A solitary walker standing at the water's edge admiring the quiet panorama", cameraTip: "Rule of thirds framing with golden dawn light" },
    ],
    caption: "The secret to this shot? You must take the FIRST train of the day up to Rotenboden (7 AM). By 10 AM, alpine breeze creates waves and ruins the mirror. Save this for your Zermatt bucket list!",
    hashtags: ["#Riffelsee", "#ZermattMatterhorn", "#SwitzerlandWonderland", "#GoldenHour", "#AestheticTravel"],
    viralPotential: "✨ Aesthetic Save-Magnet",
    difficulty: "Pro (Golden Hour sync)",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-ch-lauter-staubbach",
    countryKey: "switzerland",
    placeKey: "lauterbrunnen",
    placeName: "Lauterbrunnen",
    spotName: "Staubbach Falls Valley Floor",
    styleId: "pov-transition",
    title: "Stepping into the Real-Life Rivendell",
    hookOverlay: "Tolkien didn't invent fantasy worlds… he just visited Lauterbrunnen 🧝‍♂️✨",
    audioVibe: "Nostalgic fantasy folk melody (Lord of the Rings inspired)",
    bestTimeToFilm: "09:00 AM (Morning mist rising past the vertical rock faces)",
    shots: [
      { timing: "0:00 - 0:02", action: "Fast speed-ramp walking through the narrow wooden village street lined with flowerboxes", cameraTip: "Hold phone chest-high, step heel-to-toe" },
      { timing: "0:02 - 0:05", action: "Whip pan to the left as Staubbach Waterfall drops 300 meters into mist directly behind the church", cameraTip: "Snap zoom or whip transition" },
      { timing: "0:05 - 0:08", action: "Slow-motion droplet spray drifting across the screen as cows graze in the green meadow", cameraTip: "120fps macro focus on water droplets" },
    ],
    caption: "Did you know Lauterbrunnen valley was J.R.R. Tolkien’s direct inspiration for Rivendell in 1911? Stand at the church cemetery path for the most iconic composition without cars in the frame.",
    hashtags: ["#Lauterbrunnen", "#SwissValley", "#Rivendell", "#BucketListTravel", "#IncredibleSwitzerland"],
    viralPotential: "🔥 Ultra-Viral (100k+ reach)",
    difficulty: "Easy (Single phone)",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-ch-lauter-chalet",
    countryKey: "switzerland",
    placeKey: "lauterbrunnen",
    placeName: "Lauterbrunnen",
    spotName: "Wengen / Chalet Balcony",
    styleId: "hidden-gem",
    title: "The Ultimate Swiss Balcony Morning Routine",
    hookOverlay: "Tell me you woke up in Switzerland without telling me you woke up in Switzerland… ☕",
    audioVibe: "Cozy warm acoustic guitar with church bells in distance",
    bestTimeToFilm: "06:45 AM (Soft pastel sunrise over the cliff walls)",
    shots: [
      { timing: "0:00 - 0:02", action: "Steaming coffee cup being held in front of wooden shutters", cameraTip: "Warm white balance, close focal depth" },
      { timing: "0:02 - 0:05", action: "Pushing open wooden shutters to reveal 72 waterfalls echoing across the vertical valley floor", cameraTip: "Wide angle 0.5x, smooth reveal" },
      { timing: "0:05 - 0:08", action: "Yellow cogwheel train slowly crawling up the cliffside in the distance", cameraTip: "3x telephoto zoom on the red/yellow train" },
    ],
    caption: "The sound of distant cowbells and rushing glacial water at 7 AM. Save this location: stay in higher Wengen or Mürren for the balcony view looking down into the Lauterbrunnen canyon!",
    hashtags: ["#SwissChalet", "#MorningVibes", "#LauterbrunnenValley", "#SlowTravel", "#CoffeeWithAView"],
    viralPotential: "✨ Aesthetic Save-Magnet",
    difficulty: "Medium (Gimbal/Pacing)",
    image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-ch-lucerne-bridge",
    countryKey: "switzerland",
    placeKey: "lucerne",
    placeName: "Lucerne",
    spotName: "Chapel Bridge & Water Tower",
    styleId: "scenic-cinematic",
    title: "Medieval Lucerne at Sunrise (Zero Tourists)",
    hookOverlay: "The trick to having Europe's oldest wooden bridge entirely to yourself 🤫🏰",
    audioVibe: "Calm acoustic lo-fi indie with gentle river stream sounds",
    bestTimeToFilm: "06:15 AM (Soft golden light hitting the water tower)",
    shots: [
      { timing: "0:00 - 0:03", action: "Low angle walking across the creaking wooden planks lined with red geranium flowers", cameraTip: "Gimbal or stable two-hand grip close to wooden railing" },
      { timing: "0:03 - 0:06", action: "Panning out over the Reuss river showing swans swimming towards Mount Pilatus backdrop", cameraTip: "Smooth slow horizontal pan, 4K 60fps" },
      { timing: "0:06 - 0:08", action: "Warm cup of fresh Swiss coffee at a riverside bench watching the paddle steamer depart", cameraTip: "Shallow depth of field on coffee cup" },
    ],
    caption: "By 10:30 AM, Chapel Bridge has hundreds of visitors. But arrive before 7 AM and you’ll share it only with local rowers and swans. Best breakfast spot right after: Mill’Feuille along the water!",
    hashtags: ["#Lucerne", "#ChapelBridge", "#SwitzerlandTourism", "#LakeLucerne", "#EuropeTravelHacks"],
    viralPotential: "💡 High Shareability",
    difficulty: "Easy (Single phone)",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-ch-grindelwald-first",
    countryKey: "switzerland",
    placeKey: "grindelwald",
    placeName: "Grindelwald",
    spotName: "First Cliff Walk by Tissot",
    styleId: "pov-transition",
    title: "Walking on Air: The Suspended Alpine Cliff Walk",
    hookOverlay: "Do NOT look down if you're afraid of heights… 4,000 ft drop 😱🌁",
    audioVibe: "High-adrenaline cinematic synth beat drop at the platform edge",
    bestTimeToFilm: "09:30 AM (Sun clearing the summit of the Eiger)",
    shots: [
      { timing: "0:00 - 0:02", action: "POV looking straight down through the metal grating walkway into the endless abyss below", cameraTip: "Point phone downward at 45 degrees, walking forward" },
      { timing: "0:02 - 0:05", action: "Raise camera to eye level as you step onto the glass cantilever viewpoint hanging over the valley", cameraTip: "Wide 0.5x lens, steady push" },
      { timing: "0:05 - 0:08", action: "The imposing Eiger North Face right in your face with paragliders floating below", cameraTip: "Slow full 180-degree sweep" },
    ],
    caption: "The First Cliff Walk in Grindelwald is completely FREE once you take the cable car up. Tip: Walk out to the single glass ledge early before the photo queue forms!",
    hashtags: ["#Grindelwald", "#FirstCliffWalk", "#Eiger", "#ThrillSeeker", "#JungfrauRegion"],
    viralPotential: "🔥 Ultra-Viral (100k+ reach)",
    difficulty: "Easy (Single phone)",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-ch-interlaken-lake",
    countryKey: "switzerland",
    placeKey: "interlaken",
    placeName: "Interlaken",
    spotName: "Lake Brienz & Iseltwald Pier",
    styleId: "hidden-gem",
    title: "The Most Turquoise Lake on Earth",
    hookOverlay: "Is this water even real? The glacial cyan of Lake Brienz 💎🛶",
    audioVibe: "Relaxing ambient piano with soft water ripples",
    bestTimeToFilm: "11:00 AM - 1:00 PM (Direct overhead sunlight illuminates glacial minerals)",
    shots: [
      { timing: "0:00 - 0:02", action: "Dipping hand into neon turquoise water showing unreal clarity", cameraTip: "Macro close-up, water splashing against lens" },
      { timing: "0:02 - 0:05", action: "Walking to the tip of the famous wooden pier in Iseltwald", cameraTip: "Tracking shot from behind traveler" },
      { timing: "0:05 - 0:08", action: "Kayak slicing through mirror water with traditional wood chalets behind", cameraTip: "Cinematic 24fps drone or telephoto perspective" },
    ],
    caption: "Glacial silt from the Grindelwald glaciers refracts sunlight into this surreal cyan hue. Take bus 103 from Interlaken Ost directly to Iseltwald village for this exact pier!",
    hashtags: ["#LakeBrienz", "#Interlaken", "#Iseltwald", "#TurquoiseWater", "#SwissLakes"],
    viralPotential: "✨ Aesthetic Save-Magnet",
    difficulty: "Medium (Gimbal/Pacing)",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-ch-zurich-lindt",
    countryKey: "switzerland",
    placeKey: "zurich",
    placeName: "Zurich",
    spotName: "Lindt Home of Chocolate 9m Fountain",
    styleId: "foodie-taste",
    title: "The 9-Meter Real Liquid Chocolate Fountain",
    hookOverlay: "Willy Wonka was Swiss and this is the proof… 🍫🤤",
    audioVibe: "Upbeat playful retro jazz pop",
    bestTimeToFilm: "10:00 AM (Freshly flowing warm chocolate pumps)",
    shots: [
      { timing: "0:00 - 0:02", action: "Slow-motion drip of liquid chocolate falling from the giant gold whisk fountain", cameraTip: "0.5x wide angle looking up into the 9-meter cascade" },
      { timing: "0:02 - 0:05", action: "Testing the all-you-can-taste chocolate spoon dispensing stations (dark, milk, hazelnut)", cameraTip: "Close-up creamy spoon swirl" },
      { timing: "0:05 - 0:08", action: "Taking a golden Lindor ball unwrapping and bite crunch", cameraTip: "Snap sound design sync on wrapper crackle" },
    ],
    caption: "At the Lindt Home of Chocolate in Kilchberg (15 min boat from Zurich), you get UNLIMITED tastings included with your ticket. Book time slots at least 2 weeks ahead!",
    hashtags: ["#ZurichFood", "#LindtChocolate", "#ChocolateLover", "#SwissChocolate", "#FoodieReel"],
    viralPotential: "🔥 Ultra-Viral (100k+ reach)",
    difficulty: "Easy (Single phone)",
    image: "https://images.unsplash.com/photo-1548812328-98a44e1c2211?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-ch-bern-aare",
    countryKey: "switzerland",
    placeKey: "bern",
    placeName: "Bern",
    spotName: "Aare River Float & Old Town",
    styleId: "pov-transition",
    title: "Commuting like a Local: The Aare River Float",
    hookOverlay: "In Switzerland, people don't take the subway… they float home in the river 🌊💼",
    audioVibe: "Summer indie upbeat chill wave",
    bestTimeToFilm: "3:00 PM - 5:00 PM (Warm sunny afternoon when locals swim)",
    shots: [
      { timing: "0:00 - 0:02", action: "Packing phone into colorful waterproof Aare bag, running and jumping off the concrete riverbank", cameraTip: "Action cam or waterproof phone case POV" },
      { timing: "0:02 - 0:05", action: "Floating effortlessly past the medieval Parliament building and sandstone towers", cameraTip: "Water-level viewpoint gazing up at old town" },
      { timing: "0:05 - 0:08", action: "Grabbing the exit handrail at Marzili pool and sipping a cold Rivella", cameraTip: "Laughing selfie exit to sunny lawn" },
    ],
    caption: "The cleanest glacial river in Europe flows straight through Switzerland's capital. Locals pack clothes into an 'Aarebag' and float 2km through the city. An absolute must-do in summer!",
    hashtags: ["#Bern", "#AareSchwimmen", "#SwissSummer", "#LocalHacks", "#BernOldTown"],
    viralPotential: "💡 High Shareability",
    difficulty: "Medium (Gimbal/Pacing)",
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1200&q=80",
  },

  /* ---------------- JAPAN ---------------- */
  {
    id: "reel-jp-tokyo-shibuya",
    countryKey: "japan",
    placeKey: "tokyo",
    placeName: "Tokyo",
    spotName: "Shibuya Crossing at Night",
    styleId: "pov-transition",
    title: "The Neon Scramble: 3,000 People in 60 Seconds",
    hookOverlay: "POV: The pedestrian light turns green in Shibuya 🚥⚡",
    audioVibe: "Cyberpunk synthwave bass drop synced to the green light",
    bestTimeToFilm: "7:30 PM (Dusk neon signs reflecting on wet asphalt)",
    shots: [
      { timing: "0:00 - 0:02", action: "Footage of the red hand pedestrian light counting down with thousands waiting on the curb", cameraTip: "Close-up telephoto on the crowd's shoes and neon billboards" },
      { timing: "0:02 - 0:05", action: "Green chime rings; fast tracking shot walking into the center intersection surrounded by giant screens", cameraTip: "Wide 0.5x lens held high overhead" },
      { timing: "0:05 - 0:08", action: "Camera spins 360 degrees in the exact center before crossing finishes", cameraTip: "Smooth 360 spin at 60fps" },
    ],
    caption: "Up to 3,000 people cross Shibuya intersection on a single light cycle. Tip: If it starts raining, the transparent umbrellas create the most photogenic neon reflections!",
    hashtags: ["#ShibuyaCrossing", "#TokyoVibes", "#JapanTravel", "#TokyoNight", "#NeonAesthetic"],
    viralPotential: "🔥 Ultra-Viral (100k+ reach)",
    difficulty: "Easy (Single phone)",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-jp-kyoto-fushimi",
    countryKey: "japan",
    placeKey: "kyoto",
    placeName: "Kyoto",
    spotName: "Fushimi Inari Torii Tunnel",
    styleId: "scenic-cinematic",
    title: "10,000 Red Torii Gates with Zero Crowds",
    hookOverlay: "How to see Japan's most famous shrine with NOBODY else in your shot ⛩️🤫",
    audioVibe: "Traditional Japanese flute fused with lofi chill beats",
    bestTimeToFilm: "06:15 AM (Morning sun filtering through the vermilion gates)",
    shots: [
      { timing: "0:00 - 0:03", action: "Continuous smooth gliding walk through the vermilion orange wooden tunnel, sunlight slicing through slats", cameraTip: "Heel-to-toe ninja walk, phone stabilized against chest" },
      { timing: "0:03 - 0:06", action: "Slow tilt to black calligraphy inscriptions on the reverse side of each gate", cameraTip: "Shallow depth of field focus rack" },
      { timing: "0:06 - 0:08", action: "Wide shot looking up mountain path with misty cedar trees above", cameraTip: "Vertical 9:16 composition emphasizing height" },
    ],
    caption: "The gates are open 24 hours with FREE admission. Arrive before 7 AM or hike 20 minutes past the lower loop to Yotsutsuji intersection—95% of tourists turn around before the upper mountain!",
    hashtags: ["#FushimiInari", "#KyotoHiddenGems", "#JapanTrip", "#ToriiGates", "#KyotoTravel"],
    viralPotential: "✨ Aesthetic Save-Magnet",
    difficulty: "Pro (Golden Hour sync)",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-jp-osaka-dotonbori",
    countryKey: "japan",
    placeKey: "osaka",
    placeName: "Osaka",
    spotName: "Dotonbori Street Food Alley",
    styleId: "foodie-taste",
    title: "The Sizzling 3-Bite Osaka Street Food Crawl",
    hookOverlay: "Osaka's motto is 'Eat until you drop'… here is where to start 🐙🔥",
    audioVibe: "Upbeat energetic Tokyo street beat with ASMR sizzling sound bites",
    bestTimeToFilm: "08:00 PM (Stalls in full swing, steam rising under neon lanterns)",
    shots: [
      { timing: "0:00 - 0:02", action: "Extreme close-up of Takoyaki chef rotating 30 batter balls with metal chopsticks at lightning speed", cameraTip: "Macro 4K, focus on the molten golden crust" },
      { timing: "0:02 - 0:05", action: "Dancing bonito flakes melting on top as sweet soy and Japanese mayo are drizzled", cameraTip: "Slow-mo 120fps drizzle shot" },
      { timing: "0:05 - 0:08", action: "First bite steam release with the giant Glico running man sign illuminated in background", cameraTip: "Chewing smile reaction with illuminated neon depth" },
    ],
    caption: "Osaka is Japan's culinary capital for a reason. Top 3 bites: Takoyaki at Kukuru, crispy Kushikatsu skewers at Daruma, and fluffy Okonomiyaki pancakes. Save this crawl for dinner!",
    hashtags: ["#OsakaFood", "#Dotonbori", "#StreetFoodJapan", "#Takoyaki", "#FoodReels"],
    viralPotential: "🔥 Ultra-Viral (100k+ reach)",
    difficulty: "Easy (Single phone)",
    image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80",
  },

  /* ---------------- ITALY ---------------- */
  {
    id: "reel-it-rome-trevi",
    countryKey: "italy",
    placeKey: "rome",
    placeName: "Rome",
    spotName: "Trevi Fountain at Dawn",
    styleId: "scenic-cinematic",
    title: "Trevi Fountain with Absolutely No One There",
    hookOverlay: "Don’t come here at 2 PM… set your alarm for 6:15 AM instead 🏛️🪙",
    audioVibe: "Romantic Italian classical waltz (Vivaldi or romantic strings)",
    bestTimeToFilm: "06:15 AM (First dawn light hitting the white travertine marble)",
    shots: [
      { timing: "0:00 - 0:03", action: "Empty cobblestone piazza with only the thunderous roar of crystal water echoing", cameraTip: "Slow push forward toward the fountain centerpiece" },
      { timing: "0:03 - 0:06", action: "Traveler in trench coat flipping a euro coin over the left shoulder into the turquoise basin", cameraTip: "Track the spinning coin in slow-mo until it splashes" },
      { timing: "0:06 - 0:08", action: "Steaming cornetto and espresso at the historic bar right around the corner", cameraTip: "Warm golden light, powdered sugar dusting" },
    ],
    caption: "By midday, 1,200 people crowd this square. At 6 AM, it feels like private movie set. Legend says: One coin ensures your return to Rome, two brings romance, three brings marriage!",
    hashtags: ["#TreviFountain", "#RomeItaly", "#RomeTravelHacks", "#ItalianSummer", "#DawnInRome"],
    viralPotential: "🔥 Ultra-Viral (100k+ reach)",
    difficulty: "Pro (Golden Hour sync)",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-it-florence-panino",
    countryKey: "italy",
    placeKey: "florence",
    placeName: "Florence",
    spotName: "All'Antico Vinaio / Santa Croce",
    styleId: "foodie-taste",
    title: "The World's Most Famous Focaccia Sandwich Crunch",
    hookOverlay: "Is this 2-hour queue in Florence actually worth it? Listen to the crunch 🥖🥩",
    audioVibe: "ASMR crisp crunch audio followed by lively Italian acoustic guitar",
    bestTimeToFilm: "11:15 AM (Beating the 12:30 lunch rush line)",
    shots: [
      { timing: "0:00 - 0:02", action: "Baker slicing open huge warm Tuscan schiacciata bread with loud crunchy crackle", cameraTip: "Phone microphone 3 inches from crust for maximum ASMR" },
      { timing: "0:02 - 0:05", action: "Layers of truffle cream, thinly sliced sbriciolona salami, and melted stracchino cheese spread", cameraTip: "Top-down overhead framing" },
      { timing: "0:05 - 0:08", action: "Sitting on the steps of Santa Croce piazza taking the massive first bite with wine cup", cameraTip: "Golden Italian sunlight on the historic facade" },
    ],
    caption: "The 'La Favolosa' at All'Antico Vinaio: sbriciolona salami, pecorino cream, artichoke cream, and spicy eggplant. Tip: Go to the Via dei Neri storefront at 11:15 AM to wait under 5 minutes!",
    hashtags: ["#FlorenceFood", "#AllAnticoVinaio", "#TuscanyEats", "#Focaccia", "#StreetFoodEurope"],
    viralPotential: "🔥 Ultra-Viral (100k+ reach)",
    difficulty: "Easy (Single phone)",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-it-cinque-manarola",
    countryKey: "italy",
    placeKey: "cinqueterre",
    placeName: "Cinque Terre",
    spotName: "Manarola Cliffside Harbor",
    styleId: "scenic-cinematic",
    title: "The Golden Pastel Sunset of Manarola",
    hookOverlay: "The exact coordinates for the postcard shot of Cinque Terre 🌅🍷",
    audioVibe: "Warm nostalgic Italian seaside melody with ambient clinking wine glasses",
    bestTimeToFilm: "07:45 PM (Sun dipping below Mediterranean horizon)",
    shots: [
      { timing: "0:00 - 0:03", action: "A glass of chilled Cinque Terre DOC white wine being raised at Nessun Dorma terrace", cameraTip: "Foreground wine glass, colorful pastel cliff village in background" },
      { timing: "0:03 - 0:06", action: "Local cliff divers leaping off the black volcanic rocks into the azure sea below", cameraTip: "Fast 60fps tracking the diver into the water splash" },
      { timing: "0:06 - 0:08", action: "All village lanterns flicker on as the sky turns deep purple and peach", cameraTip: "Tripod or stable ledge for long exposure look" },
    ],
    caption: "Book your Nessun Dorma table via their app at 7:45 AM on the morning of your visit. Grab the pesto bruschetta and watch the pastel buildings light up as the sun sets over the Ligurian sea.",
    hashtags: ["#Manarola", "#CinqueTerre", "#ItalianRiviera", "#SunsetLovers", "#VisitItaly"],
    viralPotential: "✨ Aesthetic Save-Magnet",
    difficulty: "Medium (Gimbal/Pacing)",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
  },

  /* ---------------- THAILAND ---------------- */
  {
    id: "reel-th-bangkok-tuktuk",
    countryKey: "thailand",
    placeKey: "bangkok",
    placeName: "Bangkok",
    spotName: "Chinatown Yaowarat Road",
    styleId: "pov-transition",
    title: "Midnight Tuk-Tuk Neon Sprint through Chinatown",
    hookOverlay: "Bangkok after midnight is a whole different planet 🛺💨",
    audioVibe: "Energetic bass-boosted beat drop synced to street light flashes",
    bestTimeToFilm: "10:30 PM (Peak neon sign illumination and bustling sidewalk tables)",
    shots: [
      { timing: "0:00 - 0:02", action: "POV jumping into the back seat of a glowing neon-lit tuk-tuk", cameraTip: "Wide 0.5x, held firmly over driver's shoulder" },
      { timing: "0:02 - 0:05", action: "Tuk-tuk zooming down Yaowarat road between sizzling street woks and flashing dragon banners", cameraTip: "Night mode stabilized 60fps" },
      { timing: "0:05 - 0:08", action: "Sudden stop in front of a Michelin Guide pad thai stall with flames leaping 3 feet in the air", cameraTip: "Camera whip-pan onto the wok flames" },
    ],
    caption: "Yaowarat Road is the largest street food strip in Southeast Asia. Agree on 100-150 THB before hopping into the tuk-tuk and make sure to hit Nai Ek Roll Noodle for their pepper broth!",
    hashtags: ["#BangkokNightlife", "#Yaowarat", "#TukTuk", "#StreetFoodBangkok", "#ThailandTravel"],
    viralPotential: "🔥 Ultra-Viral (100k+ reach)",
    difficulty: "Easy (Single phone)",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "reel-th-krabi-longtail",
    countryKey: "thailand",
    placeKey: "krabi",
    placeName: "Krabi",
    spotName: "Railay Beach & Maya Bay Boat Bow",
    styleId: "pov-transition",
    title: "The Classic Longtail Wooden Boat Bow Pose",
    hookOverlay: "The #1 video every traveler takes in Thailand (and how to nail it) 🛶🌴",
    audioVibe: "Tropical house chill melody with ocean waves and gentle engine rumble",
    bestTimeToFilm: "08:00 AM (Flat glass sea before speedboats create wake)",
    shots: [
      { timing: "0:00 - 0:02", action: "Close up of colorful fabric ribbons fluttering on the wooden prow of the longtail boat", cameraTip: "Low angle looking out toward limestone karsts" },
      { timing: "0:02 - 0:05", action: "Traveler walking out to the bow tip as boat glides into a hidden emerald lagoon", cameraTip: "Follow cam moving smoothly forward" },
      { timing: "0:05 - 0:08", action: "Jumping off into crystal turquoise water surrounded by towering jungle cliffs", cameraTip: "Underwater transition cut if waterproof" },
    ],
    caption: "Rent a private longtail boat from Ao Nang beach at 7:30 AM instead of joining group tours. You get the iconic lagoons completely to yourself for under $60 total for the morning!",
    hashtags: ["#KrabiThailand", "#LongtailBoat", "#RailayBeach", "#TropicalVibes", "#IslandLife"],
    viralPotential: "✨ Aesthetic Save-Magnet",
    difficulty: "Medium (Gimbal/Pacing)",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  },
];

/* Helper to capitalize and format names */
function fmtPlace(k: string): string {
  if (!k) return "Destination";
  return k.charAt(0).toUpperCase() + k.slice(1);
}

/* Dynamic Fallback Generator for Any Country / Place */
export function generateDynamicReelsForPlace(countryKey: string, placeKey: string): ReelIdea[] {
  const placeName = fmtPlace(placeKey);
  const countryName = fmtPlace(countryKey);

  return [
    {
      id: `reel-dyn-${placeKey}-pov`,
      countryKey,
      placeKey,
      placeName,
      spotName: `${placeName} Historic Old Quarter`,
      styleId: "pov-transition",
      title: `The 3-Second First Impression: Arriving in ${placeName}`,
      hookOverlay: `No one prepared me for how stunning ${placeName} actually is in person… 🤯✈️`,
      audioVibe: "Trending cinematic transition drop syncing from footsteps to panoramic view",
      bestTimeToFilm: "07:30 AM (Soft sunrise light with empty streets)",
      shots: [
        { timing: "0:00 - 0:02", action: `Close-up walking shot through the cobblestones/arches of ${placeName}`, cameraTip: "Low angle tracking phone chest height" },
        { timing: "0:02 - 0:05", action: `Whip-turn transition into the signature panoramic landmark of ${placeName}`, cameraTip: "Smooth 0.5x wide angle sweep" },
        { timing: "0:05 - 0:08", action: `Local artisan or baker handing over a fresh regional pastry/drink`, cameraTip: "Warm authentic eye-level reaction" },
      ],
      caption: `POV: You just checked into your stay in ${placeName} and took your first walk outside. Save this destination for your ${countryName} route planner!`,
      hashtags: [`#${placeName}`, `#${countryName}Travel`, "#HiddenGems", "#TravelReels", "#Wanderlust"],
      viralPotential: "🔥 Ultra-Viral (100k+ reach)",
      difficulty: "Easy (Single phone)",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: `reel-dyn-${placeKey}-scenic`,
      countryKey,
      placeKey,
      placeName,
      spotName: `${placeName} Panorama Viewpoint`,
      styleId: "scenic-cinematic",
      title: `Golden Hour Magic over ${placeName}`,
      hookOverlay: `The secret vantage point in ${placeName} that feels like a painting 🌅🎨`,
      audioVibe: "Ethereal acoustic melody with ambient evening breeze",
      bestTimeToFilm: "Golden hour (60 minutes before sunset)",
      shots: [
        { timing: "0:00 - 0:03", action: `Slow cinematic push forward through stone arches overlooking ${placeName}`, cameraTip: "60fps slow motion, 16:9 vertical lock" },
        { timing: "0:03 - 0:06", action: `Golden sun flares catching rooftops, mountains, or water reflections`, cameraTip: "Point slightly towards sun for lens flare" },
        { timing: "0:06 - 0:08", action: `Traveler sitting peacefully on the viewpoint ledge taking it all in`, cameraTip: "Silhouette or warm backlighting" },
      ],
      caption: `If you only have one evening in ${placeName}, spend it right here during golden hour. The light hits the landmarks in the most unforgettable way.`,
      hashtags: [`#${placeName}`, "#GoldenHour", "#SunsetViews", "#AestheticTravel", `#Visit${countryName}`],
      viralPotential: "✨ Aesthetic Save-Magnet",
      difficulty: "Pro (Golden Hour sync)",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: `reel-dyn-${placeKey}-food`,
      countryKey,
      placeKey,
      placeName,
      spotName: `${placeName} Food Crawl & Local Market`,
      styleId: "foodie-taste",
      title: `What to Eat in ${placeName}: The Ultimate First-Bite Crawl`,
      hookOverlay: `If you come to ${placeName}, you CANNOT leave without trying this 🤤🍽️`,
      audioVibe: "Lively upbeat acoustic rhythm with sizzling food ASMR",
      bestTimeToFilm: "12:30 PM or 7:30 PM (Active dining rush)",
      shots: [
        { timing: "0:00 - 0:02", action: `Cook expertly preparing or plating the local specialty dish of ${placeName}`, cameraTip: "Extreme macro 4K, focus on steam and sizzle" },
        { timing: "0:02 - 0:05", action: `Satisfying pull, drizzle, or slice revealing the tender interior`, cameraTip: "Slow-motion 120fps food action" },
        { timing: "0:05 - 0:08", action: `First bite smile on the outdoor terrace with lively street vibe behind`, cameraTip: "Genuine reaction with plate presented to camera" },
      ],
      caption: `Food in ${placeName} hits completely different when you order the local specialty. Save this reel for when you're looking for where to eat on your trip!`,
      hashtags: [`#${placeName}Food`, "#StreetFood", "#FoodieReels", "#LocalFlavors", `#Eats${placeName}`],
      viralPotential: "💡 High Shareability",
      difficulty: "Easy (Single phone)",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    },
  ];
}

/**
 * Filter and retrieve Reel Ideas matching the itinerary's stops, country, style, search query, and place filter.
 */
export function getReelIdeas(
  countryKey: string,
  bases: string[],
  styleFilter: string = "all",
  query: string = "",
  placeFilter: string = "all"
): ReelIdea[] {
  const normCountry = (countryKey || "switzerland").toLowerCase();
  const normalizedBases = bases && bases.length ? bases.map((b) => b.toLowerCase()) : ["zurich", "lucerne", "zermatt"];

  // 1. Gather curated matching ideas
  let list: ReelIdea[] = CURATED_REEL_IDEAS.filter((r) => {
    // Check if it belongs to this country OR matches any of our itinerary bases
    const countryMatch = r.countryKey.toLowerCase() === normCountry;
    const baseMatch = normalizedBases.includes(r.placeKey.toLowerCase());
    return countryMatch || baseMatch;
  });

  // 2. Ensure every base in the itinerary has at least 1-3 reel ideas
  const coveredBases = new Set(list.map((r) => r.placeKey.toLowerCase()));
  normalizedBases.forEach((b) => {
    if (!coveredBases.has(b)) {
      const dynamicIdeas = generateDynamicReelsForPlace(normCountry, b);
      list.push(...dynamicIdeas);
    }
  });

  // If still low, generate for all bases
  if (list.length === 0) {
    normalizedBases.forEach((b) => {
      list.push(...generateDynamicReelsForPlace(normCountry, b));
    });
  }

  // 3. Filter by Place if specified
  if (placeFilter && placeFilter !== "all") {
    const pf = placeFilter.toLowerCase();
    list = list.filter((r) => r.placeKey.toLowerCase() === pf || r.placeName.toLowerCase() === pf);
  }

  // 4. Filter by Style
  if (styleFilter && styleFilter !== "all") {
    list = list.filter((r) => r.styleId === styleFilter);
  }

  // 5. Filter by Query
  if (query && query.trim().length > 0) {
    const q = query.toLowerCase().trim();
    list = list.filter((r) => {
      return (
        r.title.toLowerCase().includes(q) ||
        r.hookOverlay.toLowerCase().includes(q) ||
        r.spotName.toLowerCase().includes(q) ||
        r.placeName.toLowerCase().includes(q) ||
        r.caption.toLowerCase().includes(q) ||
        r.hashtags.some((h) => h.toLowerCase().includes(q)) ||
        r.shots.some((s) => s.action.toLowerCase().includes(q) || s.cameraTip.toLowerCase().includes(q))
      );
    });
  }

  return list;
}
