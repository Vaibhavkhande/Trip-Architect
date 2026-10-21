import { CH_LEGS, OVERRIDE_MAP, Destination, CountryConfig, INT_LABEL, nm, BUDGET_TIERS } from "../data/countries";
import { priceActivity } from "./activities";

export const CH_TIME: Record<string, number> = {};
CH_LEGS.forEach(([a, b, h]) => {
  CH_TIME[a < b ? a + "|" + b : b + "|" + a] = h;
});

export function haversine(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  return Math.hypot((a.lon - b.lon) * 111 * Math.cos((a.lat * Math.PI) / 180), (a.lat - b.lat) * 111);
}

export function hrs(country: CountryConfig, a: string, b: string): number {
  if (a === b) return 0;
  if (country.legs) {
    const key = a < b ? a + "|" + b : b + "|" + a;
    if (CH_TIME[key] != null) return CH_TIME[key];
  }
  const ov = OVERRIDE_MAP[country.key] && OVERRIDE_MAP[country.key][a < b ? a + "|" + b : b + "|" + a];
  if (ov) return ov.h;
  const km = haversine(country.dest[a], country.dest[b]);
  const t = km / country.speedKmh + country.overhead;
  return Math.round(t * 20) / 20; // nearest 3 minutes
}

export function legMode(country: CountryConfig, a: string, b: string): string {
  if (a === b) return country.transitMode;
  if (country.legs) {
    const key = a < b ? a + "|" + b : b + "|" + a;
    if (CH_TIME[key] != null) return "rail";
  }
  const ov = OVERRIDE_MAP[country.key] && OVERRIDE_MAP[country.key][a < b ? a + "|" + b : b + "|" + a];
  return ov ? ov.mode : country.transitMode;
}

export function routeHours(country: CountryConfig, route: string[]): number {
  let t = 0;
  for (let i = 1; i < route.length; i++) t += hrs(country, route[i - 1], route[i]);
  return Math.round(t * 100) / 100;
}

export function bestInsertion(country: CountryConfig, route: string[], d: string, oneWay: boolean) {
  let best = { cost: Infinity, idx: 1 };
  for (let i = 1; i < route.length; i++) {
    const c = hrs(country, route[i - 1], d) + hrs(country, d, route[i]) - hrs(country, route[i - 1], route[i]);
    if (c < best.cost - 1e-9) best = { cost: c, idx: i };
  }
  if (oneWay) {
    const c = hrs(country, route[route.length - 1], d);
    if (c < best.cost - 1e-9) best = { cost: c, idx: route.length };
  }
  return best;
}

export function permute<T>(arr: T[], cb: (perm: T[]) => void) {
  const n = arr.length, idx = arr.slice();
  const rec = (k: number) => {
    if (k === n) { cb(idx); return; }
    for (let i = k; i < n; i++) {
      [idx[k], idx[i]] = [idx[i], idx[k]];
      rec(k + 1);
      [idx[k], idx[i]] = [idx[i], idx[k]];
    }
  };
  rec(0);
}

export function optimiseOrder(country: CountryConfig, start: string, chosen: string[], oneWay: boolean, current: string[]) {
  if (chosen.length > 7 || chosen.length < 2) return current;
  let best = current, bestH = routeHours(country, current);
  permute(chosen, (perm) => {
    const r = oneWay ? [start, ...perm] : [start, ...perm, start];
    const h = routeHours(country, r);
    if (h < bestH - 1e-6) { bestH = h; best = r.slice(); }
  });
  return best;
}

export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export const PACE: Record<string, { div: number; ideal: number; max: number; label: string; note: string }> = {
  relaxed: { div: 1.75, ideal: 1.2, max: 2.2, label: "Relaxed", note: "Two nights minimum per base, short hops only." },
  balanced: { div: 1.15, ideal: 2.0, max: 3.2, label: "Balanced", note: "One or two nights per base, moderate transfers." },
  fast: { div: 0.85, ideal: 3.0, max: 4.5, label: "Fast-paced", note: "One night per base, long transfers accepted." },
};

export const USABLE_HOURS = 10;
export const DWELL_DEFAULT = 6;

export function sameRegionCluster(country: CountryConfig, a: string, b: string): boolean {
  return !country.dest[a].hub && !country.dest[b].hub;
}

export const BUCKETS = ["Adventure", "Relaxation", "Culture", "Nature", "Luxury", "Foodie"] as const;
export type Bucket = typeof BUCKETS[number];

export const TAG_TO_BUCKET: Record<string, Partial<Record<Bucket, number>>> = {
  mountains: { Adventure: 2, Nature: 2 },
  scenic: { Nature: 2, Relaxation: 1 },
  cities: { Culture: 3 },
  nature: { Nature: 3 },
  snow: { Adventure: 3 },
  food: { Foodie: 3 },
  luxury: { Luxury: 3 },
  instagram: { Culture: 1, Relaxation: 1 },
  adventure: { Adventure: 3 },
  relaxed: { Relaxation: 3 },
};

export function computeArchetype(
  dest: Record<string, Destination>,
  stops: string[],
  pace: string,
  interests: string[]
) {
  const raw: Record<Bucket, number> = {
    Adventure: 0,
    Relaxation: 0,
    Culture: 0,
    Nature: 0,
    Luxury: 0,
    Foodie: 0,
  };
  stops.forEach((k) => {
    dest[k]?.tags?.forEach((t) => {
      const w = TAG_TO_BUCKET[t];
      if (w) {
        Object.entries(w).forEach(([b, v]) => {
          raw[b as Bucket] += v || 0;
        });
      }
    });
  });
  if (pace === "relaxed") raw.Relaxation += stops.length * 1.5;
  if (pace === "fast") raw.Adventure += stops.length * 1.2;
  interests.forEach((i) => {
    const w = TAG_TO_BUCKET[i];
    if (w) {
      Object.entries(w).forEach(([b, v]) => {
        raw[b as Bucket] += (v || 0) * 0.4;
      });
    }
  });
  const total = Object.values(raw).reduce((a, b) => a + b, 0) || 1;
  const pct: Record<string, number> = Object.fromEntries(
    BUCKETS.map((b) => [b, Math.round((raw[b] / total) * 100)])
  );
  const ranked = BUCKETS.slice().sort((a, b) => pct[b] - pct[a]);
  const top = ranked.filter((b) => pct[b] >= 15).slice(0, 2);
  const label = top.length >= 2 ? `${top[0]}–${top[1]} trip` : top.length === 1 ? `${top[0]} trip` : "Balanced trip";
  return { pct, ranked, label };
}

export function makePlan(country: CountryConfig, s: any) {
  const {
    days, start, pace, interests, must = [], month = 6, lambda = 2.5, capBonus = 0, oneWay = false,
  } = s;
  const cfg = PACE[pace] || PACE.balanced;
  const dest = country.dest;
  const pool = Object.keys(dest).filter((d) => d !== start);
  const score = (d: string) => dest[d].base + interests.filter((i: string) => dest[d].tags.includes(i)).length * 3;

  const wanted = must.filter((m: string) => m !== start);
  let capacity = Math.round((days - 1) / cfg.div) + capBonus;
  capacity = clamp(capacity, 1, Math.min(8, days - 1, pool.length));

  const overAsked = wanted.length > capacity;
  const forced = overAsked ? [] : wanted.slice();

  let route = oneWay ? [start] : [start, start];
  const chosen: string[] = [];

  const autoEligible = (d: string, picked: string[]) => {
    if (dest[d].secondary) return false;
    if (dest[d].excursion && picked.some((k) => sameRegionCluster(country, k, d))) return false;
    return true;
  };

  let pending = forced.slice();
  while (pending.length) {
    let pick: string | null = null, ins: any = null;
    for (const d of pending) {
      const c = bestInsertion(country, route, d, oneWay);
      if (!ins || c.cost < ins.cost) { pick = d; ins = c; }
    }
    if (ins && pick) {
      route.splice(ins.idx, 0, pick);
      chosen.push(pick);
      pending = pending.filter((x) => x !== pick);
    } else {
      break;
    }
  }

  const budgetH = days * cfg.max;
  while (chosen.length < capacity) {
    const picked = oneWay ? route : route.slice(0, -1);
    let pick: string | null = null, ins: any = null, bestVal = -Infinity;
    for (const d of pool) {
      if (chosen.includes(d)) continue;
      if (!autoEligible(d, picked)) continue;
      const c = bestInsertion(country, route, d, oneWay);
      const val = score(d) - lambda * c.cost;
      if (val > bestVal + 1e-9) { bestVal = val; pick = d; ins = c; }
    }
    if (!pick) break;
    if (routeHours(country, route) + ins.cost > budgetH && chosen.length >= 1) break;
    route.splice(ins.idx, 0, pick);
    chosen.push(pick);
  }

  route = optimiseOrder(country, start, chosen, oneWay, route);

  if (!oneWay && chosen.length >= 2) {
    const rev = [route[0], ...route.slice(1, -1).reverse(), route[route.length - 1]];
    if (Math.abs(routeHours(country, rev) - routeHours(country, route)) < 1e-6 &&
        hrs(country, rev[0], rev[1]) < hrs(country, route[0], route[1])) route = rev;
  }

  const stops = oneWay ? route.slice() : route.slice(0, -1);
  const totalH = routeHours(country, route);

  const excluded = pool
    .filter((d) => !chosen.includes(d))
    .map((d) => ({ key: d, score: score(d), cost: Math.round(bestInsertion(country, route, d, oneWay).cost * 100) / 100 }))
    .sort((a, b) => b.score - a.score || b.cost - a.cost);

  const hasReturnDay = !oneWay && days >= stops.length + 1;
  const dayPool = days - (hasReturnDay ? 1 : 0);
  const nights = stops.map(() => 1);
  let spare = dayPool - stops.length;
  const order = stops.map((k, i) => ({ i, k, sc: score(k) - (i === 0 ? 4 : 0) })).sort((a, b) => b.sc - a.sc);
  let oi = 0;
  while (spare > 0) { nights[order[oi % order.length].i] += 1; spare--; oi++; }

  const itinerary: any[] = [];
  let dayNo = 1;
  stops.forEach((place, si) => {
    for (let n = 0; n < nights[si]; n++) {
      const from = n === 0 && si > 0 ? stops[si - 1] : null;
      const travel = from ? hrs(country, from, place) : 0;
      const acts = dest[place].acts;
      const per = Math.max(3, Math.ceil(acts.length / Math.max(1, nights[si])));
      const slice = acts.slice((n * per) % acts.length, (n * per) % acts.length + Math.min(3, acts.length));
      itinerary.push({
        day: dayNo++, place, from, travel,
        acts: slice.length >= 2 ? slice : acts.slice(0, Math.min(3, acts.length)),
        kind: si === 0 && n === 0 ? "arrival" : n === 0 ? "transfer" : "stay",
        nightIndex: n, nightsHere: nights[si],
      });
    }
  });
  if (hasReturnDay) {
    const last = stops[stops.length - 1];
    itinerary.push({
      day: dayNo++, place: start, from: last, travel: hrs(country, last, start),
      acts: ["Buffer for delays", "Last-minute shopping near the hub", "Airport transfer"],
      kind: "return", nightIndex: 0, nightsHere: 1,
    });
  } else if (!oneWay) {
    const l = itinerary[itinerary.length - 1];
    if (l) {
      l.returnLeg = { from: l.place, hours: hrs(country, l.place, start), to: start };
    }
  }

  /* ---- feasibility ---- */
  const thin: any[] = [];
  let singleNight = 0;
  stops.forEach((k, si) => {
    const arrival = si > 0 ? hrs(country, stops[si - 1], k) : 0;
    const departing = si === stops.length - 1 && !hasReturnDay && !oneWay ? hrs(country, k, start) : 0;
    const usable = nights[si] * USABLE_HOURS - arrival - departing - (si === 0 ? 1 : 0);
    const need = DWELL_DEFAULT;
    if (usable < need) thin.push({ key: k, usable: Math.max(0, usable), need });
    if (nights[si] === 1 && arrival >= 2.5) singleNight++;
  });

  /* ---- metrics ---- */
  const perDay = totalH / days;
  const paceFit = clamp(1 - Math.abs(perDay - cfg.ideal) / (cfg.ideal * 1.4), 0, 1);
  const covered = new Set<string>();
  stops.forEach((k) => dest[k]?.tags?.forEach((t: string) => { if (interests.includes(t)) covered.add(t); }));
  const interestFit = interests.length ? covered.size / interests.length : 0.8;
  const bench = pool.filter((d) => !dest[d].secondary).map(score).sort((a, b) => b - a).slice(0, 6);
  const benchSum = bench.reduce((a, b) => a + b, 0) || 1;
  const valueFit = clamp(stops.reduce((t, k) => t + score(k), 0) / benchSum, 0, 1);
  const idealNights = pace === "relaxed" ? 2.0 : pace === "fast" ? 1.0 : 1.4;
  const avgNights = (days - (hasReturnDay ? 1 : 0)) / Math.max(1, stops.length);
  const depthFit = clamp(1 - Math.abs(avgNights - idealNights) / idealNights, 0, 1);
  const farthest = Math.max(0.01, ...stops.map((k) => hrs(country, start, k)));
  const excessPerStop = (totalH - 2 * farthest) / Math.max(1, stops.length - 2);
  const backtrack = excessPerStop <= 0.8 ? "Low" : excessPerStop <= 1.8 ? "Moderate" : "High";
  const btPen = backtrack === "Low" ? 0 : backtrack === "Moderate" ? 4 : 9;
  const overPen = perDay > cfg.max ? 10 : 0;
  const tripScore = clamp(Math.round(
    41 + 20 * interestFit + 14 * paceFit + 12 * depthFit + 22 * valueFit - btPen - overPen - 3 * singleNight - 4 * thin.length
  ), 38, 98);
  const load = perDay < 1.0 ? "Light" : perDay < 2.5 ? "Moderate" : "Heavy";
  const balIdx = 0.5 * paceFit + 0.3 * interestFit + 0.2 * (1 - btPen / 9) - 0.12 * thin.length;
  const balance = balIdx >= 0.8 ? "Excellent" : balIdx >= 0.62 ? "Good" : balIdx >= 0.45 ? "Workable" : "Strained";

  /* ---- archetype (trip-score-card buckets) ---- */
  const archetype = computeArchetype(dest, stops, pace, interests);

  /* ---- warnings ---- */
  const warnings: any[] = [];
  if (overAsked) warnings.push({ level: "block", text: `You asked for ${must.length} destinations in ${days} days. At a ${cfg.label.toLowerCase()} pace, a route out of ${dest[start] ? start : start} supports about ${capacity + 1}.` });
  if (perDay > cfg.max) warnings.push({ level: "warn", text: `Averaging ${perDay.toFixed(1)} h of travel a day, above the ${cfg.max} h ceiling for a ${cfg.label.toLowerCase()} pace.` });
  itinerary.forEach((d) => {
    if (d.kind === "transfer" && d.nightsHere === 1 && d.travel >= 2.5)
      warnings.push({ level: "warn", text: `Day ${d.day}: ${d.travel.toFixed(1)} h of travel for a single night in ${d.place}.` });
  });
  thin.forEach((t) => warnings.push({ level: "warn", text: `${t.key} needs roughly ${t.need} hours on the ground; this plan leaves about ${t.usable.toFixed(0)}.` }));
  const season = country.season(month);
  if (season.tone === "warn") warnings.push({ level: "info", text: season.text });
  if (stops.length >= 4 && stops.every((_, i) => nights[i] === 1))
    warnings.push({ level: "info", text: "Every stop is a one-night stay — packing and unpacking daily." });

  const seen = new Set();
  const uniqueWarnings = warnings.filter((w) => (seen.has(w.text) ? false : (seen.add(w.text), true)));

  return {
    country: country.name,
    settings: { days, start, pace, interests, must, month, lambda, capBonus, oneWay },
    route, stops, chosen, nights, itinerary, totalH, excluded, capacity, overAsked, wanted, thin,
    metrics: { tripScore, balance, load, backtrack, perDay, interestFit, paceFit, valueFit, depthFit, destinations: stops.length },
    archetype, warnings: uniqueWarnings, season,
  };
}

export function computeCost(country: CountryConfig, plan: any, budgetKey?: string) {
  const tier = BUDGET_TIERS[budgetKey || "mid"] || BUDGET_TIERS.mid;
  const living = tier.perDay * country.costTier * plan.settings.days;
  const transport = Math.round((plan.totalH * 32 + plan.stops.length * 14) * country.costTier);
  const experiences = plan.stops.reduce((sum: number, k: string) => {
    const acts = country.dest[k]?.acts || [];
    const costs = acts.map((a: string) => priceActivity(a, country.costTier).cost);
    return sum + (costs.length ? Math.max(...costs, 0) : 0);
  }, 0);
  return {
    living: Math.round(living),
    transport,
    experiences: Math.round(experiences),
    total: Math.round(living + transport + experiences),
  };
}

export function daysBetween(startDate: string, endDate: string): number {
  const a = new Date(startDate + "T12:00:00");
  const b = new Date(endDate + "T12:00:00");
  return Math.max(2, Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)) + 1);
}

export function dateISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function defaultTripDates() {
  const s = new Date();
  s.setDate(s.getDate() + 30);
  const e = new Date(s);
  e.setDate(e.getDate() + 5);
  return { startDate: dateISO(s), endDate: dateISO(e) };
}

export function whyThisRoute(country: CountryConfig, plan: any): string[] {
  const dest = country.dest;
  const names = plan.stops.map(nm);
  const cfg = PACE[plan.settings.pace] || PACE.balanced;
  const top = plan.excluded[0];
  const lines: string[] = [];
  lines.push(`${plan.settings.days} days is roughly ${(plan.settings.days * cfg.max).toFixed(0)} hours of tolerable travel at a ${cfg.label.toLowerCase()} pace. This route uses ${plan.totalH.toFixed(1)} of them.`);
  lines.push(`The order runs ${names.join(" → ")} because that's the shortest loop that covers everything chosen — no backtracking.`);
  if (top && top.cost > 1.2) lines.push(`I left ${nm(top.key)} out. Adding it costs about ${top.cost.toFixed(1)} extra hours, which at ${plan.settings.days} days would come straight out of time somewhere else.`);
  if (plan.settings.interests.length) {
    const covered = new Set<string>();
    plan.stops.forEach((k: string) => dest[k]?.tags?.forEach((t: string) => { if (plan.settings.interests.includes(t)) covered.add(t); }));
    const missed = plan.settings.interests.filter((i: string) => !covered.has(i));
    lines.push(missed.length
      ? `One gap: nothing on this route strongly delivers ${missed.map((m: string) => INT_LABEL[m]?.toLowerCase() || m).join(" or ")}.`
      : `Every interest you picked is covered by at least one stop, which is why the balance reads ${plan.metrics.balance.toLowerCase()}.`);
  }
  return lines;
}

export function diffPlans(before: any, after: any) {
  const removed = before.stops.filter((k: string) => !after.stops.includes(k));
  const added = after.stops.filter((k: string) => !before.stops.includes(k));
  return {
    removed,
    added,
    hoursDelta: Math.round((after.totalH - before.totalH) * 10) / 10,
    daysDelta: after.settings.days - before.settings.days,
    scoreDelta: after.metrics.tripScore - before.metrics.tripScore,
  };
}
