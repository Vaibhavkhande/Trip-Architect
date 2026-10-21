import { money } from "../data/countries";

export type ActCategory = "adventure" | "viewpoint" | "water" | "culture" | "nature" | "food" | "market";

export const ACT_CATEGORIES: [ActCategory, string[], number, number, number][] = [
  ["adventure", ["paragliding","ski","skiing","diving","rafting","climb","safari","toboggan","zipline","trek","camel","canyon","surf"], 45, 140, 3],
  ["viewpoint", ["cable car","gondola","funicular","viewpoint","peak","tower","cliff","rooftop","sky","dome climb","observatory"], 18, 55, 2],
  ["water", ["lake","cruise","boat","beach","coast","river","waterfall","falls","canal","swim","lagoon","ferry"], 8, 40, 2],
  ["culture", ["museum","palace","temple","cathedral","castle","ruins","monument","house","shrine","gallery","basilica","fortress","citadel","gate","tannery","monastery"], 8, 26, 2],
  ["nature", ["hike","trail","walk","valley","glacier","desert","dune","jungle","forest","garden","park","reserve"], 0, 15, 2.5],
  ["food", ["chocolate","food","dining","culinary","wine","cuisine","tasting","ceviche","tea","market crawl","street food","seafood"], 10, 42, 1.5],
  ["market", ["market","souk","bazaar","old town","village","district","square","promenade","medina","quarter","streets","harbour"], 0, 10, 1.5],
];

export function classifyActivity(text: string): { cat: ActCategory; lo: number; hi: number; hours: number } {
  const t = text.toLowerCase();
  for (const [cat, kws, lo, hi, hours] of ACT_CATEGORIES) {
    if (kws.some((k) => t.includes(k))) return { cat, lo, hi, hours };
  }
  return { cat: "market", lo: 0, hi: 12, hours: 1.5 };
}

export function priceActivity(text: string, costTier: number): { cat: ActCategory; lo: number; hi: number; hours: number; cost: number } {
  const c = classifyActivity(text);
  const mid = Math.round(((c.lo + c.hi) / 2) * costTier);
  return { ...c, cost: mid };
}

export const CAT_ICON: Record<ActCategory, (color: string) => string> = {
  adventure: (color) => `<path d="M4 26 L14 8 L20 18 L24 12 L30 26 Z" fill="${color}" opacity="0.85"/><circle cx="24" cy="7" r="2.6" fill="${color}"/>`,
  viewpoint: (color) => `<path d="M3 25 L12 9 L18 19 L22 13 L31 25 Z" fill="${color}" opacity="0.55"/><circle cx="9" cy="6" r="3" fill="${color}" opacity="0.9"/>`,
  water: (color) => `<path d="M2 20 Q7 16 12 20 T22 20 T32 20" stroke="${color}" stroke-width="2.4" fill="none"/><path d="M2 25 Q7 21 12 25 T22 25 T32 25" stroke="${color}" stroke-width="2" fill="none" opacity="0.55"/><path d="M15 20 L20 10 L25 20 Z" fill="${color}" opacity="0.35"/>`,
  culture: (color) => `<rect x="7" y="14" width="20" height="12" fill="${color}" opacity="0.75"/><path d="M5 14 L17 5 L29 14 Z" fill="${color}"/><rect x="15" y="18" width="4" height="8" fill="#fff" opacity="0.85"/>`,
  nature: (color) => `<path d="M17 4 C10 8 8 16 12 22 C7 22 5 19 5 19 C5 25 10 28 17 28 C24 28 29 25 29 19 C29 19 27 22 22 22 C26 16 24 8 17 4 Z" fill="${color}" opacity="0.8"/><rect x="15.5" y="26" width="3" height="4" fill="${color}"/>`,
  food: (color) => `<circle cx="17" cy="17" r="11" fill="none" stroke="${color}" stroke-width="2.2"/><path d="M11 9 V16 M9 9 V13 M13 9 V13" stroke="${color}" stroke-width="1.6"/><path d="M24 9 C22 9 22 13 24 15 V22" stroke="${color}" stroke-width="1.8" fill="none"/>`,
  market: (color) => `<path d="M5 13 L29 13 L26 26 L8 26 Z" fill="${color}" opacity="0.7"/><path d="M4 13 L9 5 M30 13 L25 5 M17 13 L17 4" stroke="${color}" stroke-width="1.8"/>`,
};

export function settingsHasMultiNight(plan: any): boolean {
  return plan.nights.some((n: number) => n === 1) && plan.stops.length >= 3;
}

export function buildQuestions(country: any, plan: any) {
  return [
    {
      q: "Can I make this trip cheaper?",
      a: () => {
        const cheaper = [];
        cheaper.push(`Your route is ${plan.totalH.toFixed(1)}h of travel and ${money(plan.cost.experiences)} of highlight experiences — that split is where the money actually goes.`);
        if (settingsHasMultiNight(plan)) {
          cheaper.push("Basing yourself in fewer places for more nights cuts both transport cost and the number of hotel check-ins.");
        }
        cheaper.push(`Moving down one budget tier saves about ${money(150 * country.costTier * plan.settings.days - 65 * country.costTier * plan.settings.days)} across the trip.`);
        return { text: cheaper };
      }
    },
    {
      q: "Give me a relaxed version.",
      a: () => ({
        text: [
          `A relaxed rebuild targets about 1.2h of travel a day instead of 2.0h, with a two-night minimum per base.`,
          "You'll see fewer places. In exchange, mornings stop starting with a transfer."
        ],
        apply: { pace: "relaxed" },
        applyLabel: "Rebuild at a relaxed pace"
      })
    },
    {
      q: "Can I do this with my parents?",
      a: () => {
        const hard = plan.itinerary.filter((d: any) => d.travel >= 2.5).length;
        return {
          text: [
            `As it stands: ${plan.metrics.perDay.toFixed(1)}h of travel a day on average, and ${hard} day${hard === 1 ? "" : "s"} with a transfer over 2.5h.`,
            "Fewer bases with more nights each is the change that actually helps — less luggage movement, not just a slower pace."
          ],
          apply: { pace: "relaxed" },
          applyLabel: "Rebuild at a relaxed pace"
        };
      }
    },
    {
      q: "What's the trip actually like?",
      a: () => ({
        text: [
          `This comes out as a ${plan.archetype.label.toLowerCase()} — ${plan.archetype.ranked.slice(0, 2).map((b: string) => `${plan.archetype.pct[b]}% ${b.toLowerCase()}`).join(", ")}.`,
          "That's computed from the destinations actually in your route, not your stated interests — worth checking they match what you wanted."
        ]
      })
    },
  ];
}
