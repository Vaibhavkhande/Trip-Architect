/* ==========================================================================
   BOOKING & EXPERIENCES DATA — Food & Hotel Discovery for Itineraries
   ========================================================================== */

export interface FoodExperienceType {
  id: string;
  label: string;
  icon: string;
  desc: string;
}

export interface HotelExperienceType {
  id: string;
  label: string;
  icon: string;
  desc: string;
}

export interface RestaurantItem {
  id: string;
  name: string;
  cityKey: string;
  cityName: string;
  countryKey: string;
  experienceId: string;
  cuisine: string;
  specialty: string;
  priceLevel: "$" | "$$" | "$$$" | "$$$$";
  rating: number;
  reviewCount: number;
  image: string;
  address: string;
  tags: string[];
}

export interface HotelItem {
  id: string;
  name: string;
  cityKey: string;
  cityName: string;
  countryKey: string;
  experienceId: string;
  style: string;
  pricePerNight: string;
  rating: number;
  reviewCount: number;
  image: string;
  amenities: string[];
  proximity: string;
  tags: string[];
}

export const FOOD_EXPERIENCE_TYPES: FoodExperienceType[] = [
  { id: "all", label: "All Food Experiences", icon: "🍴", desc: "Browse every curated culinary spot across your itinerary" },
  { id: "authentic_local", label: "Authentic Local & Traditional", icon: "🥘", desc: "Heritage family recipes, regional specialties & folklore favorites" },
  { id: "fine_dining", label: "Michelin & Fine Dining", icon: "⭐", desc: "Award-winning gastronomy, innovative tasting menus & wine pairings" },
  { id: "scenic_view", label: "Scenic Mountain & Water Views", icon: "🏔️", desc: "Panoramic summit terraces, cliffside tables & lakeside dining" },
  { id: "historic_bistro", label: "Historic Bistros & Wine Cellars", icon: "🍷", desc: "Atmospheric cobblestone vaulted cellars and centuries-old dining rooms" },
  { id: "farm_table", label: "Farm-to-Table & Organic", icon: "🌱", desc: "Hyper-seasonal foraging, pasture-raised alpine dairy & slow food" },
  { id: "street_market", label: "Street Food & Artisan Markets", icon: "🍢", desc: "Bustling covered markets, fresh food stalls & casual local bites" },
  { id: "cafe_sweets", label: "Artisan Bakeries & Chocolate Salons", icon: "☕", desc: "World-class patisseries, chocolatiers & specialty coffee roasters" },
];

export const HOTEL_EXPERIENCE_TYPES: HotelExperienceType[] = [
  { id: "all", label: "All Stay Styles", icon: "🏨", desc: "Browse curated accommodations matched to your route and budget" },
  { id: "alpine_chalet", label: "Alpine Chalet & Mountain Resort", icon: "🏔️", desc: "Timber-beamed suites, roaring stone fireplaces & alpine summits" },
  { id: "luxury_spa", label: "Luxury 5-Star & Thermal Spa", icon: "💎", desc: "Heated infinity pools, panoramic wellness saunas & lavish suites" },
  { id: "historic_palace", label: "Historic Heritage & Grand Palace", icon: "🏰", desc: "Belle Époque charm, antique salons & preserved historical architecture" },
  { id: "boutique_design", label: "Boutique Design & Art Stays", icon: "🎨", desc: "Intimate contemporary interiors, tailored service & local art" },
  { id: "central_hub", label: "Central Transit & Walkable Hubs", icon: "🚉", desc: "Steps from main railway stations and historic old town plazas" },
  { id: "lakefront", label: "Lakeside & Waterfront Vistas", icon: "🌊", desc: "Private balcony water views, private docks & serene breezes" },
  { id: "eco_nature", label: "Eco-Lodge & Sustainable Nature", icon: "🌿", desc: "Off-grid serenity, sustainable architecture & organic breakfasts" },
  { id: "budget_smart", label: "Budget-Friendly & Modern Pods", icon: "🎒", desc: "Spotlessly clean, smart amenities & high value for money" },
];

/* Curated database of restaurants by country and city */
export const RESTAURANT_CATALOG: RestaurantItem[] = [
  // SWITZERLAND
  {
    id: "ch-res-1",
    name: "Kronenhalle & Brasserie",
    cityKey: "zurich",
    cityName: "Zurich",
    countryKey: "switzerland",
    experienceId: "historic_bistro",
    cuisine: "Swiss Continental & Classic Zurich",
    specialty: "Zürcher Geschnetzeltes with crispy butter Rösti under original Chagall & Miró art",
    priceLevel: "$$$$",
    rating: 4.9,
    reviewCount: 1420,
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80",
    address: "Rämistrasse 4, 8001 Zurich",
    tags: ["Legendary", "Art Collection", "Cocktails"],
  },
  {
    id: "ch-res-2",
    name: "Swiss Chuchi Restaurant",
    cityKey: "zurich",
    cityName: "Zurich",
    countryKey: "switzerland",
    experienceId: "authentic_local",
    cuisine: "Traditional Swiss Fondue & Raclette",
    specialty: "Four-cheese alpine fondue with crusty dark bread and Valais air-dried beef",
    priceLevel: "$$",
    rating: 4.7,
    reviewCount: 2310,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    address: "Rosengasse 10 (Niederdorf), Zurich",
    tags: ["Cozy", "Classic Fondue", "Old Town"],
  },
  {
    id: "ch-res-3",
    name: "Restaurant Fritschi",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "authentic_local",
    cuisine: "Lucerne Heritage Cuisine",
    specialty: "Luzerner Chügelipastete (puff pastry filled with veal and wild forest mushrooms)",
    priceLevel: "$$",
    rating: 4.6,
    reviewCount: 1890,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    address: "Sternenplatz 5, Lucerne",
    tags: ["Fresco Facade", "Lucerne Classic"],
  },
  {
    id: "ch-res-4",
    name: "Wirtshaus Galliker",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "historic_bistro",
    cuisine: "Centuries-Old Family Tavern",
    specialty: "Braised beef pot roast with saffron spätzli and homemade apple compote",
    priceLevel: "$$$",
    rating: 4.8,
    reviewCount: 940,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
    address: "Schützenstrasse 1, Lucerne",
    tags: ["Est. 1856", "Local Favorite"],
  },
  {
    id: "ch-res-5",
    name: "Panorama Restaurant Harder Kulm",
    cityKey: "interlaken",
    cityName: "Interlaken",
    countryKey: "switzerland",
    experienceId: "scenic_view",
    cuisine: "Bernese Oberland Alpine Bistro",
    specialty: "Summit Cheese Burger & Eiger Rösti overlooking Lake Brienz and Lake Thun",
    priceLevel: "$$",
    rating: 4.8,
    reviewCount: 3100,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
    address: "Harder Kulm Funicular Summit, Interlaken",
    tags: ["Panoramic Vista", "Sunset Dining", "Funicular Access"],
  },
  {
    id: "ch-res-6",
    name: "Stadthaus Restaurant & Terrace",
    cityKey: "interlaken",
    cityName: "Interlaken",
    countryKey: "switzerland",
    experienceId: "farm_table",
    cuisine: "Modern Swiss Farm-to-Table",
    specialty: "Pan-seared lake trout from Lake Brienz with garden herbs and mountain butter",
    priceLevel: "$$$",
    rating: 4.7,
    reviewCount: 820,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    address: "Marktgasse 21, Unterseen, Interlaken",
    tags: ["Fresh Catch", "Outdoor Riverside"],
  },
  {
    id: "ch-res-7",
    name: "Chez Vrony",
    cityKey: "zermatt",
    cityName: "Zermatt",
    countryKey: "switzerland",
    experienceId: "scenic_view",
    cuisine: "Alpine Gourmet & Matterhorn Vista",
    specialty: "Vrony's signature bloody burger on homemade buns with homemade alpine cheese",
    priceLevel: "$$$$",
    rating: 4.9,
    reviewCount: 2850,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
    address: "Findeln Hamlet 2100m, Zermatt",
    tags: ["Matterhorn View", "Michelin Guide", "Ski-In/Hike-In"],
  },
  {
    id: "ch-res-8",
    name: "Schäferstube at Hotel Julen",
    cityKey: "zermatt",
    cityName: "Zermatt",
    countryKey: "switzerland",
    experienceId: "authentic_local",
    cuisine: "Valais Lamb & Raclette Grill",
    specialty: "Tender mountain lamb cooked over open beechwood flame & wood-fired raclette",
    priceLevel: "$$$",
    rating: 4.8,
    reviewCount: 1650,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    address: "Riedstrasse 2, Zermatt",
    tags: ["Open Fire Grill", "Rustic Wood Interior"],
  },
  {
    id: "ch-res-9",
    name: "Restaurant 1910 Gourmet by Hausers",
    cityKey: "grindelwald",
    cityName: "Grindelwald",
    countryKey: "switzerland",
    experienceId: "fine_dining",
    cuisine: "Michelin-Starred Alpine Fine Dining",
    specialty: "7-course glacial foraging menu pairing alpine pine needle infusions & Simmental beef",
    priceLevel: "$$$$",
    rating: 4.9,
    reviewCount: 680,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
    address: "Dorfstrasse 133, Grindelwald",
    tags: ["1 Michelin Star", "Wine Cellar"],
  },
  {
    id: "ch-res-10",
    name: "Cafe Sprüngli Confiserie & Salon",
    cityKey: "zurich",
    cityName: "Zurich",
    countryKey: "switzerland",
    experienceId: "cafe_sweets",
    cuisine: "Swiss Chocolatier & High Tea",
    specialty: "Fresh daily Luxemburgerli macarons, hot Grand Cru chocolate and hazelnut tart",
    priceLevel: "$$",
    rating: 4.8,
    reviewCount: 4200,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    address: "Paradeplatz, Bahnhofstrasse 21, Zurich",
    tags: ["Since 1836", "Famous Macarons"],
  },
  {
    id: "ch-res-11",
    name: "Restaurant Weidstübli",
    cityKey: "lauterbrunnen",
    cityName: "Lauterbrunnen",
    countryKey: "switzerland",
    experienceId: "farm_table",
    cuisine: "Waterfall Valley Homestyle",
    specialty: "Swiss Alpine Macaroni (Älplermagronen) served with roasted onions and homemade apple purée",
    priceLevel: "$$",
    rating: 4.7,
    reviewCount: 1100,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    address: "Staubbachfallweg, Lauterbrunnen",
    tags: ["Waterfall View", "Valley Cozy"],
  },
  {
    id: "ch-res-12",
    name: "Kornhauskeller",
    cityKey: "bern",
    cityName: "Bern",
    countryKey: "switzerland",
    experienceId: "historic_bistro",
    cuisine: "Historic Vaulted Cellar & Bernese Roast",
    specialty: "Berner Platte with smoked pork cutlet, cured ham, sauerkraut and yellow turnip",
    priceLevel: "$$$",
    rating: 4.8,
    reviewCount: 2200,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    address: "Kornhausplatz 18, Bern",
    tags: ["Baroque Vaults", "Bern Heritage"],
  },
  {
    id: "ch-res-13",
    name: "Markthalle Im Viadukt & Food Hall",
    cityKey: "zurich",
    cityName: "Zurich",
    countryKey: "switzerland",
    experienceId: "street_market",
    cuisine: "Artisan Market Hall & Street Stalls",
    specialty: "Freshly wood-fired alpine flatbreads, artisanal local charcuterie boards, and craft ciders",
    priceLevel: "$",
    rating: 4.8,
    reviewCount: 3100,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    address: "Viaduktstrasse, 8005 Zurich West",
    tags: ["Food Stalls", "Artisan Stalls", "Lively Vibe"],
  },
  {
    id: "ch-res-14",
    name: "Lucerne Wochenmarkt on Kapellplatz",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "street_market",
    cuisine: "Open-Air Riverside Food Stalls",
    specialty: "Hot Luzerner Birnenweggen (spiced pear pastry), melted raclette rolls, and fresh alpine apple must",
    priceLevel: "$",
    rating: 4.7,
    reviewCount: 1850,
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80",
    address: "Kapellplatz & Rathausquai, Lucerne",
    tags: ["Riverfront Market", "Local Farmers", "Street Bites"],
  },
  {
    id: "ch-res-15",
    name: "Alp Chäserenholz Mountain Dairy",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "farm_table",
    cuisine: "High Alpine Foraging & Pasture Dairy",
    specialty: "Raw cow's milk alpine cheese matured in limestone caves, served with wildflower honey and rye bread",
    priceLevel: "$$",
    rating: 4.9,
    reviewCount: 940,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    address: "Mount Rigi Kulm Trail, Lucerne",
    tags: ["Mountain Pasture", "Organic Dairy", "Panoramic"],
  },
  {
    id: "ch-res-16",
    name: "Confiserie Bachmann Lucerne",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "cafe_sweets",
    cuisine: "Master Chocolatiers & Coffee Salon",
    specialty: "Handcrafted Schutzengeli truffles, flowery chocolate walls and warm Brioche hot chocolate",
    priceLevel: "$$",
    rating: 4.85,
    reviewCount: 3900,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    address: "Schwanenplatz 7, Lucerne",
    tags: ["Chocolate Wall", "Iconic Lucerne", "Pastries"],
  },
  {
    id: "ch-res-17",
    name: "Fuchs Bakery & Tea Salon Zermatt",
    cityKey: "zermatt",
    cityName: "Zermatt",
    countryKey: "switzerland",
    experienceId: "cafe_sweets",
    cuisine: "Alpine Artisan Patisserie",
    specialty: "Matterhorn-shaped mountain pralines, walnut rye rolls, and Valais spiced hot wine",
    priceLevel: "$$",
    rating: 4.75,
    reviewCount: 1650,
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=600&q=80",
    address: "Bahnhofstrasse 28, Zermatt",
    tags: ["Matterhorn Pralines", "Cozy Salon", "Since 1965"],
  },
  {
    id: "ch-res-18",
    name: "Restaurant Pavillon at Baur au Lac",
    cityKey: "zurich",
    cityName: "Zurich",
    countryKey: "switzerland",
    experienceId: "fine_dining",
    cuisine: "Haute Modern French & Swiss Gastronomy",
    specialty: "Langoustine carpaccio with white truffle infusion and vintage Bordeaux pairings",
    priceLevel: "$$$$",
    rating: 4.95,
    reviewCount: 890,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
    address: "Talstrasse 1, 8001 Zurich",
    tags: ["2 Michelin Stars", "Glass Rotunda", "Park View"],
  },
  {
    id: "ch-res-19",
    name: "Klinglers Ristorante & Lake Terrace",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "scenic_view",
    cuisine: "Italian Mediterranean with Lake Panorama",
    specialty: "Handmade lobster tagliolini enjoyed right at the edge of glittering Lake Lucerne",
    priceLevel: "$$$",
    rating: 4.8,
    reviewCount: 1220,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    address: "Inseliquai 12, Lucerne",
    tags: ["Lake Terrace", "Sunset Cocktails", "Waterfront"],
  },

  // JAPAN
  {
    id: "jp-res-1",
    name: "Sushi Yoshitake Ginza",
    cityKey: "tokyo",
    cityName: "Tokyo",
    countryKey: "japan",
    experienceId: "fine_dining",
    cuisine: "Edomae Omakase Sushi",
    specialty: "Wild abalone simmered in liver sauce followed by sea urchin nigiri",
    priceLevel: "$$$$",
    rating: 4.9,
    reviewCount: 920,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    address: "7-8-13 Ginza, Chuo City, Tokyo",
    tags: ["3 Michelin Stars", "Omakase Counter"],
  },
  {
    id: "jp-res-2",
    name: "Gion Karyo Kaiseki",
    cityKey: "kyoto",
    cityName: "Kyoto",
    countryKey: "japan",
    experienceId: "authentic_local",
    cuisine: "Seasonal Kyoto Kaiseki",
    specialty: "10-course seasonal bamboo shoot and grilled sweetfish banquet overlooking stone zen garden",
    priceLevel: "$$$$",
    rating: 4.8,
    reviewCount: 1350,
    image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=600&q=80",
    address: "Gion-machi Minamigawa, Higashiyama, Kyoto",
    tags: ["Geisha District", "Garden View"],
  },
  {
    id: "jp-res-3",
    name: "Dotonbori Kushikatsu Daruma",
    cityKey: "osaka",
    cityName: "Osaka",
    countryKey: "japan",
    experienceId: "street_market",
    cuisine: "Osaka Street Food & Deep-fried Skewers",
    specialty: "Golden crispy skewers of wagyu, lotus root and quail egg dipped once into secret tangy sauce",
    priceLevel: "$",
    rating: 4.7,
    reviewCount: 3800,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    address: "1-6-4 Dotonbori, Chuo Ward, Osaka",
    tags: ["No Double Dipping", "Osaka Soul Food"],
  },

  // ITALY
  {
    id: "it-res-1",
    name: "Roscioli Salumeria con Cucina",
    cityKey: "rome",
    cityName: "Rome",
    countryKey: "italy",
    experienceId: "authentic_local",
    cuisine: "Roman Pasta & Artisanal Salumi",
    specialty: "The legendary Carbonara made with artisanal Guanciale di Monte Conero and pecorino romano",
    priceLevel: "$$$",
    rating: 4.9,
    reviewCount: 4100,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    address: "Via dei Giubbonari 21, 00186 Roma",
    tags: ["Iconic Carbonara", "Wine Cellar"],
  },
  {
    id: "it-res-2",
    name: "Trattoria Mario",
    cityKey: "florence",
    cityName: "Florence",
    countryKey: "italy",
    experienceId: "historic_bistro",
    cuisine: "Florentine Steaks & Ribollita",
    specialty: "Bistecca alla Fiorentina cut thick from Chianina beef, grilled rare over oak coals",
    priceLevel: "$$",
    rating: 4.8,
    reviewCount: 3400,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    address: "Via Rosina 2r, 50123 Firenze",
    tags: ["Since 1953", "Communal Tables"],
  },

  // ICELAND
  {
    id: "is-res-1",
    name: "Fiskmarkaðurinn (The Fish Market)",
    cityKey: "reykjavik",
    cityName: "Reykjavik",
    countryKey: "iceland",
    experienceId: "farm_table",
    cuisine: "Nordic Seafood & Volcanic Charcoal",
    specialty: "Minke whale and wild Arctic char smoked with dried birch and served with sweet wasabi",
    priceLevel: "$$$$",
    rating: 4.8,
    reviewCount: 1650,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    address: "Aðalstræti 12, Reykjavik",
    tags: ["Local Arctic Catch", "Robata Grill"],
  },

  // THAILAND
  {
    id: "th-res-1",
    name: "Jay Fai Michelin Street Food",
    cityKey: "bangkok",
    cityName: "Bangkok",
    countryKey: "thailand",
    experienceId: "street_market",
    cuisine: "Wok-Fired Seafood Legend",
    specialty: "Crispy giant golden crab omelette (Kai-Jeaw Poo) wok-fried over roaring charcoal fire",
    priceLevel: "$$$",
    rating: 4.8,
    reviewCount: 3900,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
    address: "327 Maha Chai Rd, Samran Rat, Bangkok",
    tags: ["1 Michelin Star", "Goggles Chef", "Legendary"],
  },
];

/* Curated database of hotels by country and city */
export const HOTEL_CATALOG: HotelItem[] = [
  // SWITZERLAND
  {
    id: "ch-hot-1",
    name: "The Dolder Grand",
    cityKey: "zurich",
    cityName: "Zurich",
    countryKey: "switzerland",
    experienceId: "luxury_spa",
    style: "Luxury 5-Star City Resort & 4000m² Spa",
    pricePerNight: "CHF 750 / night",
    rating: 4.9,
    reviewCount: 1280,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    amenities: ["4000m² Alpine Spa", "Indoor & Outdoor Infinity Pools", "2-Star Michelin Restaurant", "Private Art Gallery"],
    proximity: "Overlooking Lake Zurich & the Alps, 10 min by Dolderbahn",
    tags: ["5-Star Superior", "World-Renowned Spa"],
  },
  {
    id: "ch-hot-2",
    name: "Marktgasse Hotel Old Town",
    cityKey: "zurich",
    cityName: "Zurich",
    countryKey: "switzerland",
    experienceId: "boutique_design",
    style: "Boutique Heritage in Niederdorf",
    pricePerNight: "CHF 290 / night",
    rating: 4.8,
    reviewCount: 1840,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    amenities: ["Historic 15th-Century Building", "Artisan Bakery Breakfast", "Aesop Toiletries", "Free High-Speed WiFi"],
    proximity: "Heart of pedestrian Old Town, 6 min walk to Zurich HB main station",
    tags: ["Design Hotel", "Walk to Station"],
  },
  {
    id: "ch-hot-3",
    name: "Hotel Schweizerhof Luzern",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "historic_palace",
    style: "Belle Époque 5-Star Lakeside Landmark",
    pricePerNight: "CHF 420 / night",
    rating: 4.9,
    reviewCount: 2150,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    amenities: ["Lakeside Balconies", "Wellness & Finnish Sauna", "Live Piano Lounge", "Complimentary City Transit Pass"],
    proximity: "Facing Lake Lucerne, 2 min walk to Chapel Bridge",
    tags: ["Historic Since 1845", "Lake View"],
  },
  {
    id: "ch-hot-4",
    name: "Hotel des Balances",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "lakefront",
    style: "Riverside Historic Boutique",
    pricePerNight: "CHF 310 / night",
    rating: 4.8,
    reviewCount: 1420,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    amenities: ["Reuss River Terrace", "Painted Guildhall Facade", "Gourmet Restaurant", "Nespresso Bar"],
    proximity: "Directly on the Reuss river, 7 min walk from station",
    tags: ["Waterfront Terrace", "Romantic"],
  },
  {
    id: "ch-hot-5",
    name: "Victoria-Jungfrau Grand Hotel & Spa",
    cityKey: "interlaken",
    cityName: "Interlaken",
    countryKey: "switzerland",
    experienceId: "luxury_spa",
    style: "Grand Palace Hotel facing the Jungfrau Peak",
    pricePerNight: "CHF 620 / night",
    rating: 4.9,
    reviewCount: 2600,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    amenities: ["5500m² Spa Nescens", "Outdoor Saltwater Whirlpool", "Direct Jungfrau Peak View", "Tennis Courts"],
    proximity: "Höheweg Boulevard, 8 min walk from Interlaken West",
    tags: ["Ultimate Luxury", "Jungfrau View"],
  },
  {
    id: "ch-hot-6",
    name: "Hotel Interlaken (Est. 1323)",
    cityKey: "interlaken",
    cityName: "Interlaken",
    countryKey: "switzerland",
    experienceId: "central_hub",
    style: "Centuries-Old Renovated Classic",
    pricePerNight: "CHF 220 / night",
    rating: 4.7,
    reviewCount: 1980,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
    amenities: ["Japanese Zen Garden", "Swiss Breakfast Buffet", "Bicycle Rental", "Ski & Luggage Storage"],
    proximity: "3 min walk to Interlaken Ost railway hub for trains to peaks",
    tags: ["Central Hub", "Value for Money"],
  },
  {
    id: "ch-hot-7",
    name: "The Omnia Mountain Lodge",
    cityKey: "zermatt",
    cityName: "Zermatt",
    countryKey: "switzerland",
    experienceId: "alpine_chalet",
    style: "Clifftop Contemporary Alpine Chalet",
    pricePerNight: "CHF 690 / night",
    rating: 4.95,
    reviewCount: 1450,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=600&q=80",
    amenities: ["Indoor/Outdoor Pool with Matterhorn View", "Finnish & Turkish Saunas", "Granite Fireplace Lounge", "Private Elevator through the Cliff"],
    proximity: "Elevated high above Zermatt village with private rock-tunnel access",
    tags: ["Matterhorn Sunset", "Award Winner"],
  },
  {
    id: "ch-hot-8",
    name: "Hotel Matthiol Boutique & Spa",
    cityKey: "zermatt",
    cityName: "Zermatt",
    countryKey: "switzerland",
    experienceId: "eco_nature",
    style: "Eco-Friendly Chalet & Ski-in/Ski-out",
    pricePerNight: "CHF 380 / night",
    rating: 4.8,
    reviewCount: 910,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    amenities: ["Bio-Sauna & Herbal Bath", "Open Wood Burning Fireplace", "Ski Room with Boot Warmers", "Electric Taxi Transfer"],
    proximity: "Winkelmatten hamlet, peaceful nature setting with Matterhorn views",
    tags: ["Alpine Modern", "Ski-In"],
  },
  {
    id: "ch-hot-9",
    name: "Romantik Hotel Schweizerhof Grindelwald",
    cityKey: "grindelwald",
    cityName: "Grindelwald",
    countryKey: "switzerland",
    experienceId: "alpine_chalet",
    style: "Chalet Hotel with Eiger North Face Panorama",
    pricePerNight: "CHF 360 / night",
    rating: 4.8,
    reviewCount: 1720,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=600&q=80",
    amenities: ["Eiger View Sun Terrace", "Indoor Heated Pool", "Steam Bath & Glacier Grotto", "Fondue Stübli Restaurant"],
    proximity: "3 min walk to Grindelwald station, gateway to Eiger Express",
    tags: ["Eiger View", "Family Run"],
  },
  {
    id: "ch-hot-10",
    name: "Hotel Staubbach Valley Lodge",
    cityKey: "lauterbrunnen",
    cityName: "Lauterbrunnen",
    countryKey: "switzerland",
    experienceId: "budget_smart",
    style: "Historic View Hotel facing Staubbach Falls",
    pricePerNight: "CHF 165 / night",
    rating: 4.7,
    reviewCount: 2200,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    amenities: ["Balconies directly facing 300m waterfall", "Free Breakfast", "Cozy Lounge with Books", "Guest Kitchen"],
    proximity: "5 min walk from Lauterbrunnen train station",
    tags: ["Waterfall Balcony", "Great Value"],
  },
  {
    id: "ch-hot-11",
    name: "Hotel Schweizerhof Bern & The Spa",
    cityKey: "bern",
    cityName: "Bern",
    countryKey: "switzerland",
    experienceId: "central_hub",
    style: "5-Star Luxury opposite Bern Main Station",
    pricePerNight: "CHF 390 / night",
    rating: 4.85,
    reviewCount: 1600,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    amenities: ["500m² Hydrotherapy Pool", "Sky Terrace & Rooftop Lounge", "Jack's Brasserie", "Underground Station Access"],
    proximity: "Directly opposite Bern Central Station, gateway to Old Town",
    tags: ["Station Adjacent", "Rooftop Views"],
  },
  {
    id: "ch-hot-12",
    name: "Citybox Smart Pods Zurich Central",
    cityKey: "zurich",
    cityName: "Zurich",
    countryKey: "switzerland",
    experienceId: "budget_smart",
    style: "Nordic Minimalist Smart Pods",
    pricePerNight: "CHF 110 / night",
    rating: 4.65,
    reviewCount: 3100,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    amenities: ["Self-Service Check-in Kiosks", "High-speed WiFi 6", "Rain Showers", "Luggage Lockers"],
    proximity: "4 min walk to Zurich Hauptbahnhof main rail terminal",
    tags: ["Smart Budget", "Modern Pods", "Great Transit"],
  },
  {
    id: "ch-hot-13",
    name: "Green Alpine Capsule & Design Hub Lucerne",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "budget_smart",
    style: "Futuristic Swiss Alpine Capsule Pods",
    pricePerNight: "CHF 78 / night",
    rating: 4.7,
    reviewCount: 1940,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
    amenities: ["Ergonomic Memory Foam Pods", "Ambient LED Mood Lighting", "Coworking Space", "Barista Coffee Bar"],
    proximity: "Heart of Lucerne Old Town, 8 min walk from Chapel Bridge",
    tags: ["Budget Smart", "Pod Hotel", "Solo & Duo"],
  },
  {
    id: "ch-hot-14",
    name: "Whitepod Eco-Luxury Wilderness Resort",
    cityKey: "zermatt",
    cityName: "Zermatt",
    countryKey: "switzerland",
    experienceId: "eco_nature",
    style: "Geodesic Eco-Pods in Alpine Nature",
    pricePerNight: "CHF 490 / night",
    rating: 4.9,
    reviewCount: 1250,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80",
    amenities: ["Pellet Stove Fireplaces", "100% Renewable Energy", "Zero Single-Use Plastic", "Guided Wildlife Snowshoe Hikes"],
    proximity: "Perched on private mountain slopes overlooking the Rhone Valley",
    tags: ["Eco Sanctuary", "Geodesic Pods", "Private Stars"],
  },
  {
    id: "ch-hot-15",
    name: "Berghaus Bort Eco Alpine Lodge",
    cityKey: "grindelwald",
    cityName: "Grindelwald",
    countryKey: "switzerland",
    experienceId: "eco_nature",
    style: "Timber Solar-Powered Mountain Lodge",
    pricePerNight: "CHF 220 / night",
    rating: 4.8,
    reviewCount: 880,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    amenities: ["Solar-Heated Spring Water", "Organic Local Mountain Breakfast", "Direct Alpine Trail Access", "Eiger Sunset Deck"],
    proximity: "Middle station of Grindelwald-First Gondola",
    tags: ["Off-Grid Chic", "Nature Immersion", "Eiger View"],
  },
  {
    id: "ch-hot-16",
    name: "Baur au Lac Grand Palace",
    cityKey: "zurich",
    cityName: "Zurich",
    countryKey: "switzerland",
    experienceId: "historic_palace",
    style: "180-Year Belle Époque Sanctuary",
    pricePerNight: "CHF 760 / night",
    rating: 4.95,
    reviewCount: 2100,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    amenities: ["Private Lakefront Park", "2-Star Michelin Pavillon", "Chauffeured Rolls Royce", "Historic Antique Salons"],
    proximity: "Situated right on Lake Zurich and famous Bahnhofstrasse",
    tags: ["Legendary Palace", "Aristocratic", "Lakefront Park"],
  },
  {
    id: "ch-hot-17",
    name: "Hotel Schweizerhof Luzern (Est. 1845)",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "historic_palace",
    style: "Historic Grand Festival Palace",
    pricePerNight: "CHF 410 / night",
    rating: 4.9,
    reviewCount: 2450,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    amenities: ["Historical Guest Rooms (Mark Twain, Wagner)", "Lakeside Veranda", "Vitality Spa with Lake Views", "Steinway Piano Lounge"],
    proximity: "Directly along the Lake Lucerne promenade facing Mount Rigi",
    tags: ["Heritage Palace", "Lake Promenade", "Famous Guests"],
  },
  {
    id: "ch-hot-18",
    name: "25hours Hotel Zurich West",
    cityKey: "zurich",
    cityName: "Zurich",
    countryKey: "switzerland",
    experienceId: "boutique_design",
    style: "Creative Art & Industrial Chic",
    pricePerNight: "CHF 225 / night",
    rating: 4.75,
    reviewCount: 3200,
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=600&q=80",
    amenities: ["Rooftop Sauna overlooking railway tracks", "Freitag Messenger Bags to borrow", "Schindelhauer Bicycles", "NENI Oriental Kitchen"],
    proximity: "Heart of Zurich's design and nightlife district",
    tags: ["Boutique Design", "Vibrant", "Sauna With A View"],
  },
  {
    id: "ch-hot-19",
    name: "Boutique Hotel Glacier Grindelwald",
    cityKey: "grindelwald",
    cityName: "Grindelwald",
    countryKey: "switzerland",
    experienceId: "boutique_design",
    style: "Contemporary Alpine Glacier Design",
    pricePerNight: "CHF 370 / night",
    rating: 4.9,
    reviewCount: 1380,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=600&q=80",
    amenities: ["Outdoor Hot Tub facing Eiger Peak", "Glacier-Themed Spa", "Gourmet Tasting Restaurant", "Heated Ski Gear Storage"],
    proximity: "10 min walk from Grindelwald center with clear Eiger vista",
    tags: ["Boutique Alpine", "Outdoor Jacuzzi", "Design Award"],
  },
  {
    id: "ch-hot-20",
    name: "Hermitage Lake Lucerne Waterfront Resort",
    cityKey: "lucerne",
    cityName: "Lucerne",
    countryKey: "switzerland",
    experienceId: "lakefront",
    style: "Direct Lakeside Resort & Private Beach",
    pricePerNight: "CHF 380 / night",
    rating: 4.85,
    reviewCount: 1950,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    amenities: ["Private Lake Lawn & Swimming Dock", "Stand-Up Paddleboards", "Lakefront Sunset Deck Restaurant", "Private Boat Shuttle to Lucerne"],
    proximity: "Directly on Lake Lucerne with uninterrupted view of Mount Pilatus",
    tags: ["Private Beach", "Pilatus View", "Sunset Dining"],
  },
  {
    id: "ch-hot-21",
    name: "Carlton-Europe Vintage Lakeside Interlaken",
    cityKey: "interlaken",
    cityName: "Interlaken",
    countryKey: "switzerland",
    experienceId: "lakefront",
    style: "Historic Art Nouveau by the Turquoise River",
    pricePerNight: "CHF 250 / night",
    rating: 4.75,
    reviewCount: 1780,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    amenities: ["Natural Swimming Pond", "Swiss Fondue Chalet in Park", "Wellness Saunas", "River Brienz Promenade Access"],
    proximity: "2 min walk from Interlaken Ost station and Lake Brienz boat docks",
    tags: ["Art Nouveau", "Natural Pool", "Near Lake Docks"],
  },

  // JAPAN
  {
    id: "jp-hot-1",
    name: "Aman Tokyo",
    cityKey: "tokyo",
    cityName: "Tokyo",
    countryKey: "japan",
    experienceId: "luxury_spa",
    style: "Sky-High Urban Sanctuary & Onsen",
    pricePerNight: "¥ 145,000 / night",
    rating: 4.95,
    reviewCount: 1100,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80",
    amenities: ["Traditional Japanese Furo Baths", "30m Panoramic Swimming Pool", "Washi Paper Architectural Walls", "Mount Fuji View"],
    proximity: "Otemachi Tower, 5 min walk to Tokyo Central Station",
    tags: ["Aman Luxury", "Fuji View"],
  },
  {
    id: "jp-hot-2",
    name: "Hiiragiya Ryokan",
    cityKey: "kyoto",
    cityName: "Kyoto",
    countryKey: "japan",
    experienceId: "historic_palace",
    style: "Edo-Period Authentic Wooden Ryokan",
    pricePerNight: "¥ 85,000 / night",
    rating: 4.9,
    reviewCount: 880,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    amenities: ["Private Cedar Hinoki Baths", "Multi-Course Kaiseki in Room", "Private Moss Gardens", "Hand-crafted Screen Partitions"],
    proximity: "Central Nakagyo, Kyoto, near Nishiki Market",
    tags: ["Est. 1818", "Traditional Ryokan"],
  },

  // ITALY
  {
    id: "it-hot-1",
    name: "Hotel de Russie, Rocco Forte",
    cityKey: "rome",
    cityName: "Rome",
    countryKey: "italy",
    experienceId: "historic_palace",
    style: "Historic Roman Luxury with Secret Terraced Gardens",
    pricePerNight: "€ 680 / night",
    rating: 4.9,
    reviewCount: 1540,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    amenities: ["Terraced Pine Garden", "De Russie Wellness & Hydro Pool", "Stravinskij Cocktail Bar", "Marble Bathrooms"],
    proximity: "Between Piazza del Popolo and Spanish Steps",
    tags: ["Secret Garden", "Celebrity Favorite"],
  },
  {
    id: "it-hot-2",
    name: "Four Seasons Hotel Firenze",
    cityKey: "florence",
    cityName: "Florence",
    countryKey: "italy",
    experienceId: "luxury_spa",
    style: "Renaissance Palace & 11-Acre Private Botanical Park",
    pricePerNight: "€ 890 / night",
    rating: 4.95,
    reviewCount: 970,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    amenities: ["15th-Century Original Frescoes", "Heated Garden Pool", "Michelin-Starred Dining", "Full-Service Spa"],
    proximity: "15 min walk from the Duomo Cathedral",
    tags: ["Medici Palace", "Botanical Park"],
  },

  // ICELAND
  {
    id: "is-hot-1",
    name: "The Retreat at Blue Lagoon",
    cityKey: "reykjavik",
    cityName: "Reykjavik",
    countryKey: "iceland",
    experienceId: "luxury_spa",
    style: "Subterranean Volcanic Lagoon & Spa",
    pricePerNight: "$ 1,250 / night",
    rating: 4.95,
    reviewCount: 1400,
    image: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=600&q=80",
    amenities: ["Private Mineral Lagoon Access", "Lava Tube Relaxation Cave", "Northern Lights Wake-Up Call", "Fine Dining Moss Restaurant"],
    proximity: "Directly carved into the 800-year-old Reykjanes lava field",
    tags: ["Geothermal Oasis", "Iconic Retreat"],
  },
];

/* Helper to get filtered restaurants for a given country & itinerary bases */
export function getRestaurants(
  countryKey: string,
  bases: string[],
  selectedExperienceId: string = "all",
  searchQuery: string = "",
  selectedCity: string = "all"
): RestaurantItem[] {
  // First get country-specific or generic
  let list = RESTAURANT_CATALOG.filter((r) => r.countryKey === countryKey);
  if (list.length === 0) {
    // Fallback: adapt available items to this country
    list = RESTAURANT_CATALOG.slice(0, 10).map((r, i) => ({
      ...r,
      countryKey,
      cityName: bases[i % bases.length] || r.cityName,
      cityKey: bases[i % bases.length] || r.cityKey,
    }));
  }

  // Filter by experience
  if (selectedExperienceId !== "all") {
    list = list.filter((r) => r.experienceId === selectedExperienceId);
  }

  // Graceful fallback if country didn't have this specific experience
  if (list.length === 0 && selectedExperienceId !== "all") {
    const matches = RESTAURANT_CATALOG.filter((r) => r.experienceId === selectedExperienceId);
    if (matches.length > 0) {
      list = matches.map((r, i) => ({
        ...r,
        id: `${countryKey}-adap-${r.id}-${i}`,
        countryKey,
        cityName: bases[i % (bases.length || 1)] || r.cityName,
        cityKey: bases[i % (bases.length || 1)] || r.cityKey,
      }));
    }
  }

  // Filter by selected city
  if (selectedCity !== "all") {
    const cityFiltered = list.filter((r) => r.cityKey === selectedCity || r.cityName.toLowerCase() === selectedCity.toLowerCase());
    if (cityFiltered.length > 0) {
      list = cityFiltered;
    }
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.specialty.toLowerCase().includes(q) ||
        r.cityName.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return list;
}

/* Helper to get filtered hotels for a given country & itinerary bases */
export function getHotels(
  countryKey: string,
  bases: string[],
  selectedExperienceId: string = "all",
  searchQuery: string = "",
  selectedCity: string = "all"
): HotelItem[] {
  let list = HOTEL_CATALOG.filter((h) => h.countryKey === countryKey);
  if (list.length === 0) {
    list = HOTEL_CATALOG.slice(0, 10).map((h, i) => ({
      ...h,
      countryKey,
      cityName: bases[i % bases.length] || h.cityName,
      cityKey: bases[i % bases.length] || h.cityKey,
    }));
  }

  if (selectedExperienceId !== "all") {
    list = list.filter((h) => h.experienceId === selectedExperienceId);
  }

  // Graceful fallback if country didn't have this specific experience
  if (list.length === 0 && selectedExperienceId !== "all") {
    const matches = HOTEL_CATALOG.filter((h) => h.experienceId === selectedExperienceId);
    if (matches.length > 0) {
      list = matches.map((h, i) => ({
        ...h,
        id: `${countryKey}-adap-${h.id}-${i}`,
        countryKey,
        cityName: bases[i % (bases.length || 1)] || h.cityName,
        cityKey: bases[i % (bases.length || 1)] || h.cityKey,
      }));
    }
  }

  if (selectedCity !== "all") {
    const cityFiltered = list.filter((h) => h.cityKey === selectedCity || h.cityName.toLowerCase() === selectedCity.toLowerCase());
    if (cityFiltered.length > 0) {
      list = cityFiltered;
    }
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.style.toLowerCase().includes(q) ||
        h.cityName.toLowerCase().includes(q) ||
        h.amenities.some((a) => a.toLowerCase().includes(q)) ||
        h.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return list;
}
