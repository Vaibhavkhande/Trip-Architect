import React from "react";
import { cap, CountryConfig } from "../data/countries";
import { CAT_ICON, ActCategory } from "../utils/activities";

export const MAPW = 620;
export const MAPH = 400;

export function seededBlob(seed: number, cx: number, cy: number, r: number, points: number): string {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  let d = "";
  for (let i = 0; i <= points; i++) {
    const a = (i / points) * Math.PI * 2;
    const rr = r * (0.78 + rnd() * 0.4);
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr * 0.72;
    d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
  }
  return d + "Z";
}

export function seedOf(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return (h % 90000) + 1000;
}

export function ActIcon({ cat, color, size = 34 }: { cat: ActCategory; color: string; size?: number }) {
  const draw = CAT_ICON[cat] || CAT_ICON.market;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: draw(color) }}
    />
  );
}

export function RouteMap({
  country,
  plan,
  hovered,
  onHover,
}: {
  country: CountryConfig;
  plan: any;
  hovered: string | null;
  onHover: (k: string | null) => void;
}) {
  const dest = country.dest;
  const keys = Object.keys(dest);
  const lats = keys.map((k) => dest[k].lat);
  const lons = keys.map((k) => dest[k].lon);
  const padF = 0.16;
  const latR = Math.max(0.4, Math.max(...lats) - Math.min(...lats));
  const lonR = Math.max(0.4, Math.max(...lons) - Math.min(...lons));
  const minLat = Math.min(...lats) - latR * padF;
  const maxLat = Math.max(...lats) + latR * padF;
  const minLon = Math.min(...lons) - lonR * padF;
  const maxLon = Math.max(...lons) + lonR * padF;
  const px = (lon: number) => ((lon - minLon) / (maxLon - minLon)) * MAPW;
  const py = (lat: number) => ((maxLat - lat) / (maxLat - minLat)) * MAPH;

  const seed = seedOf(country.key || country.name);
  const routePts = plan.route
    .map((k: string) => `${px(dest[k].lon).toFixed(1)},${py(dest[k].lat).toFixed(1)}`)
    .join(" ");
  const onRoute = new Set(plan.stops);

  return (
    <svg
      viewBox={`0 0 ${MAPW} ${MAPH}`}
      className="map"
      role="img"
      aria-label={`Route map for ${country.name}: ${plan.stops.join(" to ")}`}
    >
      <defs>
        <radialGradient id={`bg-${country.key}`} cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor={country.accent2} stopOpacity="0.10" />
          <stop offset="100%" stopColor={country.accent2} stopOpacity="0.02" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width={MAPW} height={MAPH} fill={`url(#bg-${country.key})`} rx="12" />
      <path d={seededBlob(seed, MAPW * 0.5, MAPH * 0.5, MAPW * 0.42, 14)} fill={country.accent2} opacity="0.05" />
      <path d={seededBlob(seed + 7, MAPW * 0.32, MAPH * 0.58, MAPW * 0.22, 10)} fill={country.accent} opacity="0.045" />

      <polyline points={routePts} className="routeline" fill="none" />
      <polyline points={routePts} className="routeline-top" fill="none" style={{ stroke: country.accent }} />

      {keys.map((k) => {
        const x = px(dest[k].lon);
        const y = py(dest[k].lat);
        const active = onRoute.has(k);
        const isHover = hovered === k;
        const idx = plan.stops.indexOf(k);
        const flip = x > MAPW - 100;
        return (
          <g
            key={k}
            className={"node" + (active ? " on" : "")}
            onMouseEnter={() => onHover(k)}
            onMouseLeave={() => onHover(null)}
          >
            {active && <circle cx={x} cy={y} r={isHover ? 15 : 12} fill={country.accent} className="halo" />}
            <circle cx={x} cy={y} r={active ? 6.5 : 3.5} fill={active ? country.accent : "#B9B6AE"} />
            {active && <text x={x} y={y + 3.4} className="dotnum">{idx + 1}</text>}
            <text
              x={flip ? x - 11 : x + 11}
              y={y + 4}
              textAnchor={flip ? "end" : "start"}
              className={"lbl" + (active ? " on" : "")}
            >
              {cap(k)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
