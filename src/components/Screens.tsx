import React from "react";
import {
  COUNTRIES,
  CountryConfig,
  startOptions,
  nm,
  money,
  INTERESTS,
  EXPERIENCE_ICONS,
  PROFILES,
} from "../data/countries";
import {
  PACE,
  hrs,
  legMode,
  daysBetween,
  defaultTripDates,
  whyThisRoute,
} from "../utils/solver";
import { priceActivity } from "../utils/activities";
import { RouteMap, ActIcon, seedOf, seededBlob } from "./RouteMap";
import { Block, ThinkingBar } from "./Common";
import { COUNTRY_SCENERY, DESTINATION_SCENERY, getScenery, getLocationDetail } from "../data/scenery";
import {
  FOOD_EXPERIENCE_TYPES,
  HOTEL_EXPERIENCE_TYPES,
  getRestaurants,
  getHotels,
  RestaurantItem,
  HotelItem,
} from "../data/booking";
import {
  REEL_STYLE_TYPES,
  getReelIdeas,
  ReelIdea,
} from "../data/reels";

/* ============================================================================
   SCREEN 0 — COUNTRY SELECT
   ============================================================================ */

export function CountryCard({
  ck,
  c,
  onPick,
  onHover,
  isSelected,
}: {
  key?: React.Key;
  ck: string;
  c: CountryConfig;
  onPick: (k: string) => void;
  onHover?: (k: string | null) => void;
  isSelected?: boolean;
}) {
  const scenery = COUNTRY_SCENERY[ck];
  return (
    <button
      type="button"
      className={`country-card ${isSelected ? "selected" : ""}`}
      onClick={() => onPick(ck)}
      onMouseEnter={() => onHover?.(ck)}
      onMouseLeave={() => onHover?.(null)}
      style={{ "--cAccent": c.accent, "--cAccent2": c.accent2 } as React.CSSProperties}
    >
      {scenery && (
        <div
          className="country-card-thumb"
          style={{ backgroundImage: `url(${scenery.url})` }}
        >
          <div className="country-card-thumb-gradient" />
        </div>
      )}
      <div className="country-card-content">
        <div className="country-card-header">
          <span className="country-flag">{c.flag}</span>
          <span className="country-tagline-mini">{c.terrain}</span>
        </div>
        <h3>{c.name}</h3>
        <p>{c.tagline}</p>
        <div className="country-card-meta">
          <span className="country-count">{Object.keys(c.dest).length} destinations</span>
          <span className="country-view-pill">View scenery →</span>
        </div>
      </div>
    </button>
  );
}

export function CountrySelect({
  onPick,
  onDemo,
  onPreviewCountry,
}: {
  onPick: (ck: string) => void;
  onDemo: (mode: "happy" | "stress") => void;
  onPreviewCountry?: (ck: string | null) => void;
}) {
  const [selected, setSelected] = React.useState("switzerland");

  const handleSelectChange = (ck: string) => {
    setSelected(ck);
    onPreviewCountry?.(ck);
  };

  return (
    <main className="landing">
      <div className="hero-simple">
        <p className="kicker">TRIP ARCHITECT</p>
        <h1>Your journey, planned with clarity and cold-precision.</h1>
        <p className="sub">
          Select a destination to explore its authentic landscapes. Configure your dates, budget, and pacing—and let our routing solver balance transit and exploration.
        </p>
      </div>

      <section className="destination-picker">
        <label htmlFor="country-select">Selected Location</label>
        <div className="destination-select-wrap">
          <span className="destination-flag">{COUNTRIES[selected]?.flag}</span>
          <select
            id="country-select"
            className="destination-select"
            value={selected}
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            {Object.entries(COUNTRIES).map(([ck, c]) => (
              <option key={ck} value={ck}>{c.name}</option>
            ))}
          </select>
          <button
            type="button"
            className="primary"
            style={{ background: COUNTRIES[selected]?.accent }}
            onClick={() => onPick(selected)}
          >
            Plan {COUNTRIES[selected]?.name} →
          </button>
        </div>
        <p className="picker-note">
          {Object.keys(COUNTRIES[selected]?.dest || {}).length} destinations available • Real scenery backdrop active
        </p>
      </section>

      <section className="countries-section">
        <div className="countries-head">
          <h2>Choose a Destination to Preview Scenery</h2>
          <p>Hover or click to immerse in each location's real scenery</p>
        </div>
        <div className="country-grid">
          {Object.entries(COUNTRIES).map(([ck, c]) => (
            <CountryCard
              key={ck}
              ck={ck}
              c={c}
              isSelected={selected === ck}
              onPick={(k) => {
                setSelected(k);
                onPick(k);
              }}
              onHover={(k) => onPreviewCountry?.(k)}
            />
          ))}
        </div>
      </section>

      <section className="demo-strip">
        <div>
          <b>Feasibility Presets</b>
          <span>Test travel constraints with pre-calculated routes.</span>
        </div>
        <div className="demo-actions">
          <button type="button" onClick={() => onDemo("happy")}>Switzerland Alpine Loop</button>
          <button type="button" onClick={() => onDemo("stress")}>Morocco Overload Test</button>
        </div>
      </section>
    </main>
  );
}

/* ============================================================================
   SCREEN 1 — SETUP
   ============================================================================ */

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="field">
      <h2>{label}</h2>
      {hint && <p className="hint">{hint}</p>}
      {children}
    </section>
  );
}

export function MustSeePlacesPicker({
  country,
  start,
  must = [],
  onChange,
  onPreviewDestination,
  onOpenModal,
}: {
  country: CountryConfig;
  start: string;
  must: string[];
  onChange: (next: string[]) => void;
  onPreviewDestination?: (destKey: string | null) => void;
  onOpenModal?: (destKey: string) => void;
}) {
  const available = Object.keys(country.dest).filter((k) => k !== start);

  const togglePlace = (k: string) => {
    const isSelected = must.includes(k);
    const updated = isSelected ? must.filter((x) => x !== k) : [...must, k];
    onChange(updated);
    onPreviewDestination?.(k);
  };

  const selectTop3 = () => {
    const top3 = available.slice(0, 3);
    onChange(Array.from(new Set([...must, ...top3])));
  };

  const selectAll = () => {
    onChange([...available]);
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="must-see-container">
      <div className="must-see-toolbar">
        <div className="must-see-counter">
          {must.length > 0 ? (
            <span>
              <b>{must.length}</b> of {available.length} must-see places selected:{" "}
              {must.map(nm).join(", ")}
            </span>
          ) : (
            <span>Choose any places you want to prioritize (select as many as you'd like)</span>
          )}
        </div>
        <div className="must-see-actions">
          <button type="button" className="must-see-act-btn" onClick={selectTop3}>
            + Top 3
          </button>
          <button type="button" className="must-see-act-btn" onClick={selectAll}>
            Select All
          </button>
          {must.length > 0 && (
            <button type="button" className="must-see-act-btn" onClick={clearAll}>
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="must-see-grid">
        {available.map((k) => {
          const isSelected = must.includes(k);
          const sc = getScenery(country.key, k);
          const destObj = country.dest[k];
          const region = (destObj?.tags && destObj.tags[0]) || country.name;

          return (
            <div
              key={k}
              className={`must-see-card ${isSelected ? "selected" : ""}`}
              onClick={() => togglePlace(k)}
              onMouseEnter={() => onPreviewDestination?.(k)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePlace(k);
                }
              }}
            >
              <img src={sc.url} alt={nm(k)} className="must-see-thumb" loading="lazy" />
              <div className="must-see-info">
                <span className="must-see-name">{nm(k)}</span>
                <span className="must-see-tag">{region}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {onOpenModal && (
                  <button
                    type="button"
                    className="day-photo-preview-btn"
                    style={{ fontSize: "10px", padding: "2px 6px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal(k);
                    }}
                    title="View pictures & sights"
                  >
                    📷 Photos
                  </button>
                )}
                <div className="must-see-check">✓</div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="fieldnote">
        Click cards to select/deselect multiple must-see destinations. Tap 📷 Photos to view photo gallery and tips.
      </p>
    </div>
  );
}

export function Setup({
  country,
  settings,
  set,
  onBuild,
  onBack,
  onPreviewDestination,
}: {
  country: CountryConfig;
  settings: any;
  set: (p: any) => void;
  onBuild: (start: string, days: number) => void;
  onBack: () => void;
  onPreviewDestination?: (destKey: string | null) => void;
}) {
  const starts = startOptions(country);
  const [start, setStart] = React.useState(settings.start || starts[0]);
  const [setupModalDest, setSetupModalDest] = React.useState<string | null>(null);
  const d0 = settings.startDate && settings.endDate
    ? { startDate: settings.startDate, endDate: settings.endDate }
    : defaultTripDates();
  const [startDate, setStartDate] = React.useState(d0.startDate);
  const [endDate, setEndDate] = React.useState(d0.endDate);
  const [budget, setBudget] = React.useState(settings.budgetAmount || 1500);

  const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const days = daysBetween(startDate, endDate);
  const season = country.season(new Date(startDate + "T12:00:00").getMonth());

  const handleStartChange = (val: string) => {
    setStart(val);
    onPreviewDestination?.(val);
  };

  const build = () => {
    set({
      start,
      startDate,
      endDate,
      days,
      budgetAmount: Number(budget) || 0,
      month: new Date(startDate + "T12:00:00").getMonth(),
    });
    onBuild(start, days);
  };

  return (
    <main className="setup">
      <div className="setup-inner setup-compact">
        <button type="button" className="back-link" onClick={onBack}>← Change destination</button>
        <p className="kicker" style={{ color: country.accent }}>{country.flag} {country.name}</p>
        <h1 className="setup-h">Tell us the trip. We'll solve the rest.</h1>
        <p className="setup-intro">Just the essentials. Everything can be changed later.</p>
        <div className="setup-grid">
          <Field label="Starting point">
            <select
              className="select full"
              value={start}
              onChange={(e) => handleStartChange(e.target.value)}
            >
              {starts.map((k) => <option key={k} value={k}>{nm(k)}</option>)}
            </select>
          </Field>
          <Field label="Trip dates">
            <div className="date-grid">
              <input className="date-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <span>→</span>
              <input className="date-input" type="date" min={startDate} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <p className="fieldnote">{days} days</p>
          </Field>
        </div>
        <Field label="Total trip budget">
          <div className="budget-input">
            <span>{country.currency === "CHF" ? "CHF" : country.currency.includes("EUR") ? "€" : country.currency.includes("THB") ? "฿" : "$"}</span>
            <input type="number" min="0" step="50" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="1500" />
            <span className="budget-note">your total budget</span>
          </div>
        </Field>
        <Field label="What do you want to experience?">
          <div className="icon-prefs">
            {INTERESTS.map((i) => (
              <button
                type="button"
                key={i.id}
                className={"icon-pref" + (settings.interests.includes(i.id) ? " on" : "")}
                onClick={() => set({ interests: toggle(settings.interests, i.id) })}
              >
                <span>{EXPERIENCE_ICONS[i.id] || "✦"}</span>
                <small>{i.label.replace(/[^a-zA-Z ]/g, "")}</small>
              </button>
            ))}
          </div>
        </Field>
        <div className="setup-grid">
          <Field label="Travel pace">
            <select className="select full" value={settings.pace} onChange={(e) => set({ pace: e.target.value })}>
              {Object.entries(PACE).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </Field>
          <Field label="Travelling with">
            <select className="select full" value={settings.profile || "solo"} onChange={(e) => set({ profile: e.target.value })}>
              {PROFILES.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Must-see places">
          <MustSeePlacesPicker
            country={country}
            start={start}
            must={settings.must || []}
            onChange={(updated) => set({ must: updated })}
            onPreviewDestination={onPreviewDestination}
            onOpenModal={(k) => setSetupModalDest(k)}
          />
        </Field>
        <div className="season-mini">
          <span>●</span>{season.text}
        </div>
        <div className="setup-foot">
          <button type="button" className="primary lg" style={{ background: country.accent }} onClick={build}>
            ✦ Build my experience trip
          </button>
          <p>{days} days · {money(Number(budget) || 0)} budget · from {nm(start)}</p>
        </div>
      </div>

      {setupModalDest && (
        <LocationDetailModal
          countryKey={country.key}
          destKey={setupModalDest}
          onClose={() => setSetupModalDest(null)}
          onFocusScene={(k) => onPreviewDestination?.(k)}
        />
      )}
    </main>
  );
}

/* ============================================================================
   LOCATION DETAIL MODAL & PHOTO GALLERY
   ============================================================================ */

export function LocationDetailModal({
  countryKey,
  destKey,
  onClose,
  onFocusScene,
}: {
  countryKey: string | null;
  destKey: string | null;
  onClose: () => void;
  onFocusScene?: (k: string) => void;
}) {
  if (!destKey) return null;
  const detail = getLocationDetail(countryKey, destKey);
  const [selectedPhoto, setSelectedPhoto] = React.useState<string>(detail.heroUrl);

  React.useEffect(() => {
    setSelectedPhoto(detail.heroUrl);
  }, [destKey]);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="location-modal-backdrop" onClick={onClose}>
      <div className="location-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="location-modal-hero">
          <img src={selectedPhoto} alt={detail.title} className="location-modal-hero-img" />
          <button
            type="button"
            className="location-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
          <div className="location-modal-hero-overlay">
            <span className="location-modal-badge">
              <span>✦</span> {detail.location}
            </span>
            <h3 className="location-modal-title">{detail.title}</h3>
            <p className="location-modal-subtitle">{detail.vibe}</p>
          </div>
        </div>

        <div className="location-modal-body">
          {/* Photo Gallery Thumbnails */}
          <div className="location-gallery-section">
            <h4>Location Photo Gallery (Click to inspect perspective)</h4>
            <div className="location-gallery-row">
              {detail.gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`location-gallery-thumb ${selectedPhoto === img.url ? "active" : ""}`}
                  onClick={() => setSelectedPhoto(img.url)}
                  title={img.label}
                >
                  <img src={img.url} alt={img.label} loading="lazy" />
                  <span className="location-gallery-label">{img.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location Spotlights & Benchmarks */}
          <div className="location-modal-details-grid">
            <div className="location-detail-box spotlight">
              <div className="location-detail-label">
                <span>📸</span> Best Photo Spot & Golden Hour
              </div>
              <p className="location-detail-text">{detail.bestPhotoSpot}</p>
            </div>

            <div className="location-detail-box">
              <div className="location-detail-label">
                <span>💰</span> Daily Cost Benchmark
              </div>
              <p className="location-detail-text" style={{ fontWeight: 600 }}>
                {detail.dailyBudgetEst}
              </p>
            </div>

            <div className="location-detail-box">
              <div className="location-detail-label">
                <span>💡</span> Travel & Exploration Tip
              </div>
              <p className="location-detail-text">{detail.tips}</p>
            </div>

            <div className="location-detail-box" style={{ gridColumn: "1 / -1" }}>
              <div className="location-detail-label">
                <span>🌟</span> Signature Sights & Highlights
              </div>
              <div className="location-highlights-tags">
                {detail.highlights.map((h, i) => (
                  <span key={i} className="location-highlight-pill">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="location-modal-footer">
          <button
            type="button"
            className="location-modal-act-btn"
            style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}
            onClick={() => {
              if (onFocusScene && destKey) onFocusScene(destKey);
              onClose();
            }}
          >
            ✦ Set As Background Scene
          </button>
          <button
            type="button"
            className="location-modal-act-btn"
            style={{ background: "#0f172a", color: "#ffffff", border: "none" }}
            onClick={onClose}
          >
            Done Viewing (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   TRIP SPENDER DASHBOARD
   ============================================================================ */

export function TripDaySpenderDashboard({
  country,
  plan,
  onSelectDay,
}: {
  country: CountryConfig;
  plan: any;
  onSelectDay?: (dayNumber: number) => void;
}) {
  const totalBudget = plan.settings?.budgetAmount || plan.cost?.total || 2200;
  const numDays = plan.itinerary.length || 1;
  const dailyTarget = Math.round(totalBudget / numDays);

  const tierStay = country.costTier === 3 ? 150 : country.costTier === 2 ? 105 : 70;
  const dayFood = country.costTier === 3 ? 60 : country.costTier === 2 ? 40 : 25;

  const dayTotals = plan.itinerary.map((d: any) => {
    const stay = d.kind === "return" ? 0 : tierStay;
    const acts = d.acts.reduce((sum: number, act: string) => sum + priceActivity(act, country.costTier).cost, 0);
    const transit = d.from ? Math.max(14, Math.round(d.travel * 15)) : 8;
    return {
      day: d.day,
      place: d.place,
      total: stay + dayFood + acts + transit,
    };
  });

  const projectedTotal = dayTotals.reduce((sum: number, d: any) => sum + d.total, 0);
  const diff = totalBudget - projectedTotal;
  const isUnder = diff >= 0;

  const maxDayTotal = Math.max(...dayTotals.map((d: any) => d.total), 1);

  return (
    <div className="trip-spender-dashboard">
      <div className="trip-spender-header">
        <div className="trip-spender-title-group">
          <h3>
            <span>📊</span> Day-to-Day Budget & Money Spender
          </h3>
          <p>Track, budget, and balance daily expenditures across every stop of your journey.</p>
        </div>
        <div className="trip-spender-metrics">
          <div className="trip-spender-metric-pill">
            <span className="trip-spender-metric-label">Allocated Budget</span>
            <span className="trip-spender-metric-val">{money(totalBudget)}</span>
          </div>
          <div className="trip-spender-metric-pill highlight">
            <span className="trip-spender-metric-label">Projected Spend</span>
            <span className="trip-spender-metric-val">{money(projectedTotal)}</span>
          </div>
          <div className="trip-spender-metric-pill">
            <span className="trip-spender-metric-label">Daily Target</span>
            <span className="trip-spender-metric-val">{money(dailyTarget)}/day</span>
          </div>
          <span className={`trip-spender-status-badge ${isUnder ? "under" : "over"}`}>
            {isUnder ? `✓ +${money(diff)} buffer` : `⚠️ ${money(Math.abs(diff))} over`}
          </span>
        </div>
      </div>

      <div className="trip-spender-day-chart">
        {dayTotals.map((dt: any) => {
          const heightPercent = Math.min(100, Math.max(20, Math.round((dt.total / maxDayTotal) * 100)));
          return (
            <div
              key={dt.day}
              className="trip-spender-day-col"
              onClick={() => onSelectDay?.(dt.day)}
              title={`Day ${dt.day} (${nm(dt.place)}): ≈${money(dt.total)} - Click to view`}
            >
              <span className="trip-spender-col-day">Day {dt.day}</span>
              <span className="trip-spender-col-place">{nm(dt.place)}</span>
              <div className="trip-spender-col-bar-wrap">
                <div
                  className="trip-spender-col-bar-fill"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: dt.total > dailyTarget * 1.15 ? "#e11d48" : dt.total < dailyTarget * 0.85 ? "#10b981" : "#0284c7",
                  }}
                />
              </div>
              <span className="trip-spender-col-cost">{money(dt.total)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================================
   DAY CARD & TIMELINE
   ============================================================================ */

export function DayCard({
  country,
  d,
  hovered,
  setHovered,
  override,
  pending,
  expanded,
  setExpanded,
  onRequestSwap,
  onConfirmSwap,
  onCancelSwap,
  onOpenLocationModal,
}: {
  key?: React.Key;
  country: CountryConfig;
  d: any;
  hovered: string | null;
  setHovered: (k: string | null) => void;
  override?: any;
  pending?: any;
  expanded: string | null;
  setExpanded: (k: string | null) => void;
  onRequestSwap: (day: number, act: string) => void;
  onConfirmSwap: (day: number, slot: number, act: string) => void;
  onCancelSwap: () => void;
  onOpenLocationModal?: (k: string) => void;
}) {
  const scenery = getScenery(country.key, d.place);
  const defaultTrouble = d.day === 2 ? "weather" : d.day === 4 || (d.kind === "transfer" && d.travel >= 1.8) ? "transit" : "none";
  const [troubleType, setTroubleType] = React.useState<"none" | "weather" | "transit">(defaultTrouble);
  const [isReplanned, setIsReplanned] = React.useState(false);

  const allActs = country.dest[d.place]?.acts || [];
  const base = d.acts;
  
  // If re-planned for weather, provide weather-safe sheltered gems
  const weatherSafeActs = [
    `Covered Alpine Thermal Spa & Mineral Baths in ${nm(d.place)}`,
    `Artisan Chocolate Atelier & Fondue Tasting (Sheltered)`,
    `Old Town Heritage Guildhalls & Covered Bridges`,
  ];

  const effectiveActs = isReplanned && troubleType === "weather"
    ? weatherSafeActs
    : base;

  const current: string[] = override
    ? effectiveActs.map((a: string, i: number) => (i === override.slot ? override.replacement : a))
    : effectiveActs;
  const notShown = allActs.filter((a: string) => !current.includes(a));
  const aiPick = notShown[0];

  // Day-to-day budget calculations
  const tierStay = country.costTier === 3 ? 150 : country.costTier === 2 ? 105 : 70;
  const dayStay = d.kind === "return" ? 0 : tierStay;
  const dayFood = country.costTier === 3 ? 60 : country.costTier === 2 ? 40 : 25;
  const dayActsCost = current.reduce((sum: number, act: string) => sum + priceActivity(act, country.costTier).cost, 0);
  const dayTransit = d.from ? Math.max(14, Math.round(d.travel * 15)) : 8;
  const dayBaseTotal = dayStay + dayFood + dayActsCost + dayTransit;

  // Interactive custom expenditure tracker
  const [customExpenses, setCustomExpenses] = React.useState<number[]>([]);
  const [showSpender, setShowSpender] = React.useState(false);

  const extraSpent = customExpenses.reduce((a, b) => a + b, 0);
  const dayLoggedTotal = dayBaseTotal + extraSpent;

  return (
    <article
      id={`day-card-${d.day}`}
      className={"day k-" + d.kind + (hovered === d.place ? " hi" : "")}
      style={hovered === d.place ? { borderColor: country.accent, boxShadow: `0 0 0 1px ${country.accent}` } : undefined}
      onMouseEnter={() => setHovered(d.place)}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Location Scenic Picture Banner - Click to open Location Modal */}
      <div
        className="day-photo-banner"
        onClick={() => onOpenLocationModal?.(d.place)}
        style={{ cursor: "pointer" }}
        title={`Click to view pictures and details for ${nm(d.place)}`}
      >
        <img src={scenery.url} alt={nm(d.place)} className="day-photo-img" loading="lazy" />
        <div className="day-photo-overlay">
          <div className="day-photo-text">
            <span className="day-photo-title">{scenery.title}</span>
            <span className="day-photo-sub">
              {nm(d.place)} · {country.name}
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <button
              type="button"
              className="day-photo-preview-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLocationModal?.(d.place);
              }}
              title="Open photos & destination modal"
            >
              📷 Photos & Sights
            </button>
            <button
              type="button"
              className="day-photo-preview-btn"
              onClick={(e) => {
                e.stopPropagation();
                setHovered(d.place);
              }}
              title="Preview scenic backdrop"
            >
              ✦ Focus Scene
            </button>
          </div>
        </div>
      </div>

      <header>
        <span className="day-n" style={{ color: country.accent }}>Day {d.day}</span>
        <h4>{nm(d.place)}</h4>
      </header>

      {d.from ? (
        <div className="leg" style={d.kind === "transfer" ? { borderLeftColor: country.accent } : undefined}>
          <span className="leg-route">{nm(d.from)} → {nm(d.place)}</span>
          <span className="leg-h">
            ≈{(isReplanned && troubleType === "transit" ? d.travel + 0.75 : d.travel).toFixed(d.travel < 1 ? 2 : 1)}h
            {isReplanned && troubleType === "transit" ? " (inc. +45m buffer)" : ""} by {legMode(country, d.from, d.place)}
          </span>
        </div>
      ) : (
        <div className="leg">
          <span className="leg-route">{d.kind === "arrival" ? "Arrival day" : `Second day here`}</span>
        </div>
      )}

      {/* Weather & Travel Trouble Alert Box */}
      {!isReplanned && troubleType === "weather" && (
        <div className="day-trouble-box">
          <div className="day-trouble-head">
            <span>🌧️</span>
            <span>Weather Advisory · Alpine Precipitation & Fog in {nm(d.place)}</span>
          </div>
          <p className="day-trouble-msg">
            Heavy alpine cloud inversion and rain detected. Mountain summits and open viewpoints have near-zero visibility. Weather trouble detected — re-plan this day with sheltered thermal baths, chocolate ateliers, and covered museum highlights?
          </p>
          <div className="day-trouble-actions">
            <button
              type="button"
              className="day-replan-btn"
              onClick={() => setIsReplanned(true)}
            >
              ✦ Re-plan Day (Weather-Safe)
            </button>
            <button
              type="button"
              className="day-trouble-dismiss"
              onClick={() => setTroubleType("none")}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {!isReplanned && troubleType === "transit" && (
        <div className="day-trouble-box transit">
          <div className="day-trouble-head">
            <span>⏱️</span>
            <span>Travel Trouble · Rail Delay (+40m on {d.from ? `${nm(d.from)} → ` : ""}{nm(d.place)})</span>
          </div>
          <p className="day-trouble-msg">
            Regional rail track maintenance is causing an estimated +40m delay today. Travel trouble may compress your schedule. Re-plan timetable to insert a +45m arrival buffer and shift afternoon activities smoothly?
          </p>
          <div className="day-trouble-actions">
            <button
              type="button"
              className="day-replan-btn"
              onClick={() => setIsReplanned(true)}
            >
              ✦ Re-plan Schedule (+45m Buffer)
            </button>
            <button
              type="button"
              className="day-trouble-dismiss"
              onClick={() => setTroubleType("none")}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Re-planned Confirmation Banner */}
      {isReplanned && (
        <div className="day-replan-confirmed">
          <span className="day-replan-confirmed-text">
            {troubleType === "weather"
              ? "✓ Re-planned for All-Weather: Outdoor hikes swapped for sheltered thermal spa & artisan tastings."
              : "✓ Re-planned for Rail Delay: +45m arrival buffer allocated, afternoon schedule adjusted."}
          </span>
          <button
            type="button"
            className="day-replan-reset-btn"
            onClick={() => setIsReplanned(false)}
          >
            Restore original
          </button>
        </div>
      )}

      {/* Trouble Simulation Selector */}
      <div className="day-trouble-sim">
        <span className="day-trouble-sim-label">Condition:</span>
        <button
          type="button"
          className={`sim-pill ${troubleType === "weather" ? "active" : ""}`}
          onClick={() => { setTroubleType("weather"); setIsReplanned(false); }}
          title="Simulate weather trouble"
        >
          🌧️ Rain
        </button>
        <button
          type="button"
          className={`sim-pill ${troubleType === "transit" ? "active" : ""}`}
          onClick={() => { setTroubleType("transit"); setIsReplanned(false); }}
          title="Simulate travel delay trouble"
        >
          ⏱️ Delay
        </button>
        <button
          type="button"
          className={`sim-pill ${troubleType === "none" ? "active" : ""}`}
          onClick={() => { setTroubleType("none"); setIsReplanned(false); }}
          title="Simulate clear skies"
        >
          ☀️ Clear
        </button>
      </div>

      <ul className="acts">
        {current.map((a: string, i: number) => {
          const key = d.day + "-" + i;
          const isOpen = expanded === key;
          const info = priceActivity(a, country.costTier);
          return (
            <li key={i}>
              <button type="button" className="act-btn" onClick={() => setExpanded(isOpen ? null : key)}>
                <span className="act-dot" />{a}
              </button>
              {isOpen && (
                <div className="act-detail">
                  <ActIcon cat={info.cat} color={country.accent} size={30} />
                  <div>
                    <span className="act-cat">{info.cat}</span>
                    <span className="act-meta">≈{money(info.cost)} · ≈{info.hours}h</span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Day-to-Day Budget & Money Spender Section */}
      <div className="day-budget-box">
        <div className="day-budget-header">
          <div className="day-budget-title-wrap">
            <span>💰</span>
            <span className="day-budget-title">Day {d.day} Budget & Spender</span>
          </div>
          <span className="day-budget-total-pill">
            ≈ {money(dayLoggedTotal)} {extraSpent > 0 ? `(+${money(extraSpent)} logged)` : "est."}
          </span>
        </div>

        <div className="day-budget-items">
          <div className="day-budget-item">
            <span className="day-budget-item-icon">🏨</span>
            <span className="day-budget-item-cost">{money(dayStay)}</span>
            <span className="day-budget-item-label">Stay</span>
          </div>
          <div className="day-budget-item">
            <span className="day-budget-item-icon">🍴</span>
            <span className="day-budget-item-cost">{money(dayFood)}</span>
            <span className="day-budget-item-label">Meals</span>
          </div>
          <div className="day-budget-item">
            <span className="day-budget-item-icon">🎟️</span>
            <span className="day-budget-item-cost">{money(dayActsCost)}</span>
            <span className="day-budget-item-label">Acts</span>
          </div>
          <div className="day-budget-item">
            <span className="day-budget-item-icon">🚆</span>
            <span className="day-budget-item-cost">{money(dayTransit)}</span>
            <span className="day-budget-item-label">Transit</span>
          </div>
        </div>

        <div className="day-spender-toggle-row">
          <button
            type="button"
            className="day-spender-toggle-btn"
            onClick={() => setShowSpender(!showSpender)}
          >
            {showSpender ? "▴ Hide money spender" : "▾ Track personal spend & extras"}
          </button>
          {extraSpent > 0 && (
            <span style={{ color: "#0284c7", fontWeight: 700, fontSize: "11px" }}>
              Extra logged: +{money(extraSpent)}
            </span>
          )}
        </div>

        {showSpender && (
          <div className="day-spender-panel">
            <span className="day-spender-chips-label">Quick-add daily expenditures:</span>
            <div className="day-spender-chips">
              <button
                type="button"
                className={`day-spend-chip ${customExpenses.includes(15) ? "active" : ""}`}
                onClick={() =>
                  setCustomExpenses((prev) =>
                    prev.includes(15) ? prev.filter((x) => x !== 15) : [...prev, 15]
                  )
                }
              >
                + $15 Coffee & Bakery
              </button>
              <button
                type="button"
                className={`day-spend-chip ${customExpenses.includes(30) ? "active" : ""}`}
                onClick={() =>
                  setCustomExpenses((prev) =>
                    prev.includes(30) ? prev.filter((x) => x !== 30) : [...prev, 30]
                  )
                }
              >
                + $30 Souvenir / Craft
              </button>
              <button
                type="button"
                className={`day-spend-chip ${customExpenses.includes(50) ? "active" : ""}`}
                onClick={() =>
                  setCustomExpenses((prev) =>
                    prev.includes(50) ? prev.filter((x) => x !== 50) : [...prev, 50]
                  )
                }
              >
                + $50 Fine Dining Upgrade
              </button>
              <button
                type="button"
                className={`day-spend-chip ${customExpenses.includes(40) ? "active" : ""}`}
                onClick={() =>
                  setCustomExpenses((prev) =>
                    prev.includes(40) ? prev.filter((x) => x !== 40) : [...prev, 40]
                  )
                }
              >
                + $40 Mountain Pass / Tram
              </button>
            </div>

            <div className="day-spender-summary">
              <span>Day {d.day} Total: <b>{money(dayLoggedTotal)}</b></span>
              {customExpenses.length > 0 && (
                <button
                  type="button"
                  style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 11 }}
                  onClick={() => setCustomExpenses([])}
                >
                  Clear extras
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {d.kind === "return" && <p className="day-note">Buffer day — keep the morning loose in case of a delay.</p>}
      {d.returnLeg && <p className="day-note">Return to {nm(d.returnLeg.to)} the same evening, ≈{d.returnLeg.hours.toFixed(1)}h.</p>}

      {aiPick && !pending && !isReplanned && (
        <button type="button" className="ai-pick" onClick={() => onRequestSwap(d.day, aiPick)}>
          <ActIcon cat={priceActivity(aiPick, country.costTier).cat} color={country.accent} size={26} />
          <div>
            <span className="ai-pick-label" style={{ color: country.accent }}>AI pick — not on your list</span>
            <span className="ai-pick-name">{aiPick}</span>
            <span className="ai-pick-cost">≈{money(priceActivity(aiPick, country.costTier).cost)} · ≈{priceActivity(aiPick, country.costTier).hours}h</span>
          </div>
          <span className="ai-pick-add">+ Consider</span>
        </button>
      )}

      {pending && (
        <div className="sacrifice">
          <p>Adding <b>{pending.activity}</b> costs about {priceActivity(pending.activity, country.costTier).hours}h you don't have free today. What should it replace?</p>
          <div className="sac-opts">
            {current.map((a: string, i: number) => (
              <button
                type="button"
                key={i}
                className="sac-opt"
                onClick={() => onConfirmSwap(d.day, i, pending.activity)}
              >
                Drop "{a}"
              </button>
            ))}
          </div>
          <button type="button" className="sac-cancel" onClick={onCancelSwap}>Never mind</button>
        </div>
      )}
    </article>
  );
}

export function Timeline({
  country,
  plan,
  hovered,
  setHovered,
}: {
  country: CountryConfig;
  plan: any;
  hovered: string | null;
  setHovered: (k: string | null) => void;
}) {
  const [overrides, setOverrides] = React.useState<Record<number, any>>({});
  const [pending, setPending] = React.useState<any>(null);
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [modalLocationKey, setModalLocationKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    setOverrides({});
    setPending(null);
    setExpanded(null);
  }, [plan.route.join(",")]);

  const scrollToDay = (dayNum: number) => {
    const el = document.getElementById(`day-card-${dayNum}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="timeline">
      {/* Trip-Wide Day-to-Day Budget & Money Spender Dashboard */}
      <TripDaySpenderDashboard country={country} plan={plan} onSelectDay={scrollToDay} />

      <div className="tl-head" style={{ marginTop: "20px" }}>
        <h3>Day by day itinerary</h3>
        <p>
          Click any location photo or "Photos & Sights" button to open detailed picture galleries and viewpoints.
        </p>
      </div>
      <div className="days">
        {plan.itinerary.map((d: any) => (
          <DayCard
            key={d.day}
            country={country}
            d={d}
            hovered={hovered}
            setHovered={setHovered}
            override={overrides[d.day]}
            pending={pending && pending.day === d.day ? pending : null}
            expanded={expanded}
            setExpanded={setExpanded}
            onRequestSwap={(day, activity) => setPending({ day, activity })}
            onConfirmSwap={(day, slot, activity) => {
              setOverrides((o) => ({ ...o, [day]: { slot, replacement: activity } }));
              setPending(null);
            }}
            onCancelSwap={() => setPending(null)}
            onOpenLocationModal={(destKey) => setModalLocationKey(destKey)}
          />
        ))}
      </div>

      {/* Interactive Location Pictures & Detail Popup Modal */}
      {modalLocationKey && (
        <LocationDetailModal
          countryKey={country.key}
          destKey={modalLocationKey}
          onClose={() => setModalLocationKey(null)}
          onFocusScene={(k) => setHovered(k)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   DECISION, STRESS, & COMPARE PANELS
   ============================================================================ */

export function DecisionPanel({
  country,
  decision,
  onAccept,
  onAlt,
  onRestore,
  canRestore,
}: {
  country: CountryConfig;
  decision: any;
  onAccept: () => void;
  onAlt: () => void;
  onRestore: () => void;
  canRestore: boolean;
}) {
  const { before, after, diff, label } = decision;
  const why = [];
  if (diff.daysDelta < 0) why.push("Fewer days means a smaller transit budget, so I re-solved the whole route rather than truncating it.");
  if (diff.added.length) why.push(`${nm(diff.added[0])} sits ${hrs(country, after.settings.start, diff.added[0]).toFixed(1)}h from ${nm(after.settings.start)} and pulls the route out of shape.`);
  if (diff.removed.length && !diff.daysDelta) why.push(`Keeping ${diff.removed.map(nm).join(" and ")} alongside it would push the route past what ${after.settings.days} days can absorb.`);
  if (!why.length) why.push("The constraint changed, so the optimal stop set changed with it.");

  const tradeoff = diff.removed.length
    ? `You lose ${diff.removed.map(nm).join(" and ")}. The route now runs ${after.totalH.toFixed(1)}h across ${after.settings.days} days, ${diff.hoursDelta <= 0 ? `${Math.abs(diff.hoursDelta).toFixed(1)}h less` : `${diff.hoursDelta.toFixed(1)}h more`} than before.`
    : `Nothing was dropped — the route absorbed the change.`;

  return (
    <div className="panel ai decision" style={{ borderColor: country.accent }}>
      <div className="ai-head">
        <span className="ai-dot live" style={{ background: country.accent }} />AI trip architect · re-solved
      </div>
      <Block t="What changed" body={label} />
      <Block t="What I recommend" body={diff.removed.length ? `Drop ${diff.removed.map(nm).join(" and ")}${diff.added.length ? `, keep ${diff.added.map(nm).join(" and ")}` : ""}.` : "Accept the re-solved route."} />
      <Block t="Why" body={why.join(" ")} />
      <Block t="What you give up" body={tradeoff} />
      <div className="ba">
        <div className="ba-col">
          <span className="ba-t">Before</span>
          <b>{before.settings.days} days</b>
          <b>{before.metrics.destinations} destinations</b>
          <b>{before.totalH.toFixed(1)}h travel</b>
          <b className="ba-score">Score {before.metrics.tripScore}</b>
          <p>{before.stops.map(nm).join(" → ")}</p>
        </div>
        <div className="ba-col now" style={{ background: country.accent + "0d" }}>
          <span className="ba-t">After</span>
          <b>{after.settings.days} days</b>
          <b>{after.metrics.destinations} destinations</b>
          <b>{after.totalH.toFixed(1)}h travel</b>
          <b className="ba-score">Score {after.metrics.tripScore} <i className={diff.scoreDelta >= 0 ? "up" : "down"}>{diff.scoreDelta >= 0 ? "+" : ""}{diff.scoreDelta}</i></b>
          <p>{after.stops.map(nm).join(" → ")}</p>
        </div>
      </div>
      <div className="dec-actions">
        <button type="button" className="primary" style={{ background: country.accent }} onClick={onAccept}>Accept recommendation</button>
        <button type="button" className="secondary" onClick={onAlt}>Generate alternative</button>
        <button type="button" className="ghost sm" onClick={onRestore} disabled={!canRestore}>Restore original</button>
      </div>
    </div>
  );
}

export function StressPanel({ country, options, onPick }: { country: CountryConfig; options: any; onPick: (which: "a" | "b") => void }) {
  const { requested, days, a, b } = options;
  const start = a.settings.start;
  const cap = a.capacity + 1;
  return (
    <div className="stress" style={{ borderColor: country.accent }}>
      <div className="stress-head" style={{ background: country.accent + "10" }}>
        <span className="stress-icon" style={{ color: country.accent }}>▲</span>
        <div>
          <h3 style={{ color: country.accent }}>This plan is too ambitious. I'm not going to build it.</h3>
          <p>
            You asked for <b>{requested.length} destinations in {days} days</b>. A {days}-day route from {nm(start)} realistically supports <b>{cap} destinations</b>.
          </p>
        </div>
      </div>
      <div className="stress-nums">
        <div><span>Requested</span><b>{requested.length} destinations</b><b>{days} days</b></div>
        <div className="vs">against</div>
        <div><span>Realistic</span><b>{cap - 1}–{cap} destinations</b><b>{days} days</b></div>
      </div>
      <div className="opts">
        <div className="opt">
          <span className="opt-t" style={{ color: country.accent }}>Option A · Balanced</span>
          <p className="opt-route">{a.stops.map(nm).join(" → ")} → {nm(a.settings.start)}</p>
          <ul>
            <li>{a.totalH.toFixed(1)}h travel · score {a.metrics.tripScore}</li>
            <li>Tight cluster — real time in each place.</li>
          </ul>
          <button type="button" className="primary sm" style={{ background: country.accent }} onClick={() => onPick("a")}>
            Use option A
          </button>
        </div>
        <div className="opt">
          <span className="opt-t" style={{ color: country.accent }}>Option B · Bucket list</span>
          <p className="opt-route">{b.stops.map(nm).join(" → ")}{b.settings.oneWay ? "" : ` → ${nm(b.settings.start)}`}</p>
          <ul>
            <li>{b.totalH.toFixed(1)}h travel · score {b.metrics.tripScore}</li>
            <li>More ground covered, less time in each place.</li>
          </ul>
          <button type="button" className="secondary sm" onClick={() => onPick("b")}>
            Use option B
          </button>
        </div>
      </div>
    </div>
  );
}

export function Compare({ country, a, b, onClose }: { country: CountryConfig; a: any; b: any; onClose: () => void }) {
  const rows = [
    ["Destinations", a.metrics.destinations, b.metrics.destinations],
    ["Travel hours", `${a.totalH.toFixed(1)}h`, `${b.totalH.toFixed(1)}h`],
    ["Pace", a.metrics.load, b.metrics.load],
    ["Backtracking", a.metrics.backtrack, b.metrics.backtrack],
    ["Balance", a.metrics.balance, b.metrics.balance],
    ["Score", a.metrics.tripScore, b.metrics.tripScore],
  ];
  return (
    <div className="compare">
      <div className="cmp-head">
        <h3>Compare plans</h3>
        <button type="button" className="ghost sm" onClick={onClose}>Close</button>
      </div>
      <div className="cmp-routes">
        <div>
          <span className="cmp-tag" style={{ color: country.accent }}>Plan A · Balanced</span>
          <p>{a.stops.map(nm).join(" → ")}</p>
        </div>
        <div>
          <span className="cmp-tag b">Plan B · Bucket list</span>
          <p>{b.stops.map(nm).join(" → ")}</p>
        </div>
      </div>
      <table className="cmp-table">
        <thead>
          <tr><th>Metric</th><th>Plan A</th><th>Plan B</th></tr>
        </thead>
        <tbody>
          {rows.map(([k, x, y]) => (
            <tr key={k}><td>{k}</td><td>{x}</td><td>{y}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================================
   DASHBOARD
   ============================================================================ */

export function Dashboard(props: any) {
  const {
    country, plan, planB, settings, applyChange, hovered, setHovered,
    decision, snapshot, restore, generateAlternative, options, pickOption,
    compare, setCompare, onFinish, thinking, clearDecision
  } = props;
  const m = plan.metrics;
  const reasons = React.useMemo(() => whyThisRoute(country, plan), [country, plan]);
  const toggle = (arr: string[], v: string) => arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  const [showWhy, setShowWhy] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);
  const currency = country.currency === "CHF" ? "CHF" : country.currency.includes("EUR") ? "€" : country.currency.includes("THB") ? "฿" : "$";

  return (
    <main className="dash clean-dash">
      <ThinkingBar {...thinking} />

      <section className="dashboard-head">
        <div>
          <p className="kicker" style={{ color: country.accent }}>{country.flag} {country.name}</p>
          <h1>{settings.days}-day trip, solved around your constraints.</h1>
          <p className="head-route">{plan.route.map(nm).join(" → ")}</p>
        </div>
        <button
          type="button"
          className="secondary controls-toggle"
          onClick={() => setShowControls((x) => !x)}
        >
          {showControls ? "Hide filters" : "Edit trip"} ⚙
        </button>
      </section>

      {showControls && (
        <div className="filter-drawer panel">
          <div className="filter-field">
            <label>Starting point</label>
            <select
              className="select"
              value={settings.start}
              onChange={(e) => applyChange({ start: e.target.value }, "Starting point changed")}
            >
              {startOptions(country).map((k) => <option key={k} value={k}>{nm(k)}</option>)}
            </select>
          </div>
          <div className="filter-field">
            <label>Dates</label>
            <div className="date-grid">
              <input
                className="date-input"
                type="date"
                value={settings.startDate || defaultTripDates().startDate}
                onChange={(e) => applyChange({ startDate: e.target.value, days: daysBetween(e.target.value, settings.endDate || e.target.value) }, "Start date changed")}
              />
              <span>→</span>
              <input
                className="date-input"
                type="date"
                min={settings.startDate}
                value={settings.endDate || defaultTripDates().endDate}
                onChange={(e) => applyChange({ endDate: e.target.value, days: daysBetween(settings.startDate || e.target.value, e.target.value) }, "End date changed")}
              />
            </div>
          </div>
          <div className="filter-field">
            <label>Budget</label>
            <div className="budget-input small">
              <span>{currency}</span>
              <input
                type="number"
                min="0"
                step="50"
                value={settings.budgetAmount || 0}
                onChange={(e) => applyChange({ budgetAmount: Number(e.target.value) || 0 }, "Budget changed")}
              />
            </div>
          </div>
          <div className="filter-field">
            <label>Pace</label>
            <select
              className="select"
              value={settings.pace}
              onChange={(e) => applyChange({ pace: e.target.value }, "Pace changed")}
            >
              {Object.entries(PACE).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div className="filter-field filter-wide">
            <label>Experiences</label>
            <div className="icon-prefs mini-icons">
              {INTERESTS.map((i) => (
                <button
                  type="button"
                  key={i.id}
                  title={i.label}
                  aria-label={i.label}
                  className={"icon-pref" + (settings.interests.includes(i.id) ? " on" : "")}
                  onClick={() => applyChange({ interests: toggle(settings.interests, i.id) }, "Experiences updated")}
                >
                  <span>{EXPERIENCE_ICONS[i.id] || "✦"}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="filter-field filter-wide">
            <label>Must-see places</label>
            <select
              className="select"
              multiple
              size={3}
              value={settings.must}
              onChange={(e) => applyChange({ must: Array.from(e.target.selectedOptions, (o) => (o as HTMLOptionElement).value) }, "Must-see places updated")}
            >
              {Object.keys(country.dest).filter((k) => k !== settings.start).map((k) => (
                <option key={k} value={k}>{nm(k)}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <section className="hero-metrics">
        <div className="fit-card" style={{ background: country.accent }}>
          <span>TRIP FIT</span>
          <strong>{m.tripScore}</strong>
          <small>/100 · {plan.archetype.label}</small>
        </div>
        <div className="quick-stat">
          <span>DATES</span>
          <b>{settings.startDate || "—"}</b>
          <small>to {settings.endDate || "—"}</small>
        </div>
        <div className="quick-stat">
          <span>BUDGET</span>
          <b>{money(settings.budgetAmount || 0)}</b>
          <small>{plan.cost.total <= (settings.budgetAmount || 0) ? "within plan" : "needs rebalance"}</small>
        </div>
        <div className="quick-stat">
          <span>TRAVEL</span>
          <b>{plan.totalH.toFixed(1)}h</b>
          <small>{m.perDay.toFixed(1)}h/day</small>
        </div>
      </section>

      <section className="route-section">
        <div className="route-head">
          <div>
            <h2>Your route</h2>
            <p className="route-line">
              {plan.route.map((k: string, i: number) => (
                <span key={i}>
                  <span
                    className={"rn" + (hovered === k ? " hi" : "")}
                    style={hovered === k ? { color: country.accent } : undefined}
                    onMouseEnter={() => setHovered(k)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {nm(k)}
                  </span>
                  {i < plan.route.length - 1 && <span className="arr"> → </span>}
                </span>
              ))}
            </p>
          </div>
          <span className="route-badge">{m.destinations} bases · {m.load}</span>
        </div>
        <div className="mapwrap compact-map">
          <RouteMap country={country} plan={plan} hovered={hovered} onHover={setHovered} />
        </div>
      </section>

      {options && <StressPanel country={country} options={options} onPick={pickOption} />}
      {plan.warnings.length > 0 && !options && (
        <div className="warnbox">
          {plan.warnings.slice(0, 2).map((w: any, i: number) => (
            <p key={i} className={"warnline w-" + w.level}>
              <span>●</span>{w.text}
            </p>
          ))}
        </div>
      )}
      {compare && <Compare country={country} a={plan} b={planB} onClose={() => setCompare(false)} />}

      <section className="itinerary-section">
        <div className="section-title">
          <div>
            <h2>Day by day</h2>
            <p>Tap a day to see the detail.</p>
          </div>
          <button type="button" className="text-btn" onClick={() => setCompare((x: boolean) => !x)}>
            {compare ? "Hide alternative" : "Compare alternative"}
          </button>
        </div>
        <Timeline country={country} plan={plan} hovered={hovered} setHovered={setHovered} />
      </section>

      <section className="decision-strip">
        <div>
          <span className="ai-dot live" style={{ background: country.accent }} /> <b>AI decision</b>
          <p>{reasons[0] || "This route balances your dates, budget and preferences."}</p>
        </div>
        <button type="button" className="secondary" onClick={() => setShowWhy((x) => !x)}>
          {showWhy ? "Hide reasoning" : "Why this route?"}
        </button>
      </section>
      {showWhy && (
        <div className="why-drawer panel">
          {reasons.slice(0, 3).map((r, i) => <p key={i}>• {r}</p>)}
          {plan.excluded.length > 0 && (
            <p><b>Skipped:</b> {plan.excluded.slice(0, 3).map((e: any) => nm(e.key)).join(", ")}</p>
          )}
        </div>
      )}

      {decision && (
        <DecisionPanel
          country={country}
          decision={decision}
          onAccept={clearDecision}
          onAlt={generateAlternative}
          onRestore={restore}
          canRestore={!!snapshot}
        />
      )}
      <button
        type="button"
        className="primary wide lg finish-btn"
        style={{ background: country.accent }}
        onClick={onFinish}
      >
        This plan works → Hotels & restaurants
      </button>
    </main>
  );
}

/* ============================================================================
   SCREEN 3 — WHAT'S NEXT (fully functional action grid & Q&A)
   ============================================================================ */

export function Next({
  country,
  plan,
  settings,
  back,
  questions = [],
  log = [],
  ask,
  proposal,
  applyProposal,
  dismissProposal,
}: {
  country: CountryConfig;
  plan: any;
  settings: any;
  back: () => void;
  questions?: any[];
  log?: any[];
  ask?: (item: any) => void;
  proposal?: any;
  applyProposal?: () => void;
  dismissProposal?: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<"food" | "hotels" | "reels">("food");

  // Food experience filters & search
  const [selectedFoodExp, setSelectedFoodExp] = React.useState("all");
  const [selectedFoodCity, setSelectedFoodCity] = React.useState("all");
  const [foodQuery, setFoodQuery] = React.useState("");
  const [reservedRestaurants, setReservedRestaurants] = React.useState<Record<string, boolean>>({});
  const [savedRestaurants, setSavedRestaurants] = React.useState<Record<string, boolean>>({});

  // Hotel stay filters & search
  const [selectedHotelExp, setSelectedHotelExp] = React.useState("all");
  const [selectedHotelCity, setSelectedHotelCity] = React.useState("all");
  const [hotelQuery, setHotelQuery] = React.useState("");
  const [bookedHotels, setBookedHotels] = React.useState<Record<string, boolean>>({});
  const [savedHotels, setSavedHotels] = React.useState<Record<string, boolean>>({});

  // Reel Ideas filters & search
  const [selectedReelStyle, setSelectedReelStyle] = React.useState("all");
  const [selectedReelCity, setSelectedReelCity] = React.useState("all");
  const [reelQuery, setReelQuery] = React.useState("");
  const [savedReels, setSavedReels] = React.useState<Record<string, boolean>>({});
  const [reelModalDest, setReelModalDest] = React.useState<string | null>(null);

  // Feedback toast
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const bases: string[] = plan.stops.length ? plan.stops : plan.route;
  const uniqueBases = Array.from(new Set(bases));

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  const toggleReserveRestaurant = (id: string, name: string, city: string) => {
    setReservedRestaurants((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        showToast(`🍽️ Table reserved at ${name} (${city})! Added to your itinerary schedule.`);
      } else {
        showToast(`Reservation cancelled for ${name}.`);
      }
      return next;
    });
  };

  const toggleSaveRestaurant = (id: string, name: string) => {
    setSavedRestaurants((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? `★ Saved ${name} to your route favorites.` : `Removed ${name} from saved favorites.`);
      return next;
    });
  };

  const toggleBookHotel = (id: string, name: string, city: string) => {
    setBookedHotels((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        showToast(`🏨 Stay booked at ${name} for your stop in ${city}!`);
      } else {
        showToast(`Booking removed for ${name}.`);
      }
      return next;
    });
  };

  const toggleSaveHotel = (id: string, name: string) => {
    setSavedHotels((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? `★ Saved ${name} to your route shortlist.` : `Removed ${name} from shortlist.`);
      return next;
    });
  };

  const toggleSaveReel = (id: string, title: string) => {
    setSavedReels((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? `★ Saved "${title}" to your shoot list!` : `Removed "${title}" from shoot list.`);
      return next;
    });
  };

  const copyReelScript = (reel: ReelIdea) => {
    const scriptText = `🎬 REEL CONCEPT: ${reel.title} (${reel.placeName})\n` +
      `⏱️ 3-SEC HOOK: "${reel.hookOverlay}"\n` +
      `🎵 AUDIO VIBE: ${reel.audioVibe}\n` +
      `🌅 BEST TIME: ${reel.bestTimeToFilm}\n\n` +
      `📹 SHOT LIST & CAMERA ANGLES:\n` +
      reel.shots.map((s, i) => `Shot ${i + 1} (${s.timing}): ${s.action} [Tip: ${s.cameraTip}]`).join("\n") +
      `\n\n📝 READY-TO-POST CAPTION:\n${reel.caption}\n\n🏷️ HASHTAGS:\n${reel.hashtags.join(" ")}`;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(scriptText);
    }
    showToast(`🎬 Copied shot list & hook for "${reel.title}" to clipboard!`);
  };

  const restaurants = getRestaurants(country.key, bases, selectedFoodExp, foodQuery, selectedFoodCity);
  const hotels = getHotels(country.key, bases, selectedHotelExp, hotelQuery, selectedHotelCity);
  const reelIdeas = getReelIdeas(country.key, bases, selectedReelStyle, reelQuery, selectedReelCity);

  const totalReserved = Object.values(reservedRestaurants).filter(Boolean).length;
  const totalBooked = Object.values(bookedHotels).filter(Boolean).length;
  const totalSavedReels = Object.values(savedReels).filter(Boolean).length;

  return (
    <main className="next final-next">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="booking-toast">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="next-hero" style={{ borderColor: country.accent }}>
        <p className="kicker" style={{ color: country.accent }}>PLAN COMPLETE</p>
        <h1>Your trip is ready. {country.flag}</h1>
        <p className="next-route">{plan.route.map(nm).join(" → ")}</p>
        <div className="next-stats">
          <span><b>{plan.settings.days}</b> days</span>
          <span><b>{plan.metrics.destinations}</b> bases</span>
          <span><b>{money(settings.budgetAmount || 0)}</b> budget</span>
          <span><b>{plan.metrics.tripScore}</b> fit</span>
        </div>
        <button type="button" className="secondary" onClick={back}>← Edit itinerary</button>
      </div>

      <section className="final-phase">
        <div className="phase-head">
          <div>
            <p className="kicker" style={{ color: country.accent }}>STEP 3: EXPERIENCES, STAYS & REELS</p>
            <h2>Find Food, Hotels & Reel Ideas for Your Route</h2>
            <p>Filter by experience type, explore curated venues, and discover viral reel & shot ideas for every stop.</p>
          </div>
        </div>

        {/* Live Booking Confirmation Summary Bar */}
        {(totalReserved > 0 || totalBooked > 0 || totalSavedReels > 0) && (
          <div className="booking-summary-strip">
            <div>
              <span>✦ <b>Your Route Arrangements:</b> </span>
              {totalReserved > 0 && <span>{totalReserved} Dining Reservation{totalReserved !== 1 ? "s" : ""} · </span>}
              {totalBooked > 0 && <span>{totalBooked} Hotel Stay{totalBooked !== 1 ? "s" : ""} Confirmed · </span>}
              {totalSavedReels > 0 && <span>{totalSavedReels} Reel Idea{totalSavedReels !== 1 ? "s" : ""} in Shoot List</span>}
            </div>
            <span style={{ fontSize: "11px", fontWeight: 700 }}>Ready for travel & creating!</span>
          </div>
        )}

        <div className="experience-hub">
          {/* Main Module Tabs */}
          <div className="experience-tabs">
            <button
              type="button"
              className={`experience-tab-btn ${activeTab === "food" ? "active" : ""}`}
              onClick={() => setActiveTab("food")}
            >
              <span>🍴</span>
              <span>Food Experiences & Restaurants ({restaurants.length})</span>
            </button>
            <button
              type="button"
              className={`experience-tab-btn ${activeTab === "hotels" ? "active" : ""}`}
              onClick={() => setActiveTab("hotels")}
            >
              <span>🏨</span>
              <span>Hotel Styles & Stays ({hotels.length})</span>
            </button>
            <button
              type="button"
              className={`experience-tab-btn ${activeTab === "reels" ? "active" : ""}`}
              onClick={() => setActiveTab("reels")}
            >
              <span>🎬</span>
              <span>Reel Ideas for Places ({reelIdeas.length})</span>
            </button>
          </div>

          {/* ================= FOOD EXPERIENCES PANEL ================= */}
          {activeTab === "food" && (
            <div>
              <div className="experience-filter-box">
                {/* Food Experience Type Filter Pills */}
                <div className="filter-row-label">
                  <span>1. What kind of food experience do you want?</span>
                  <span style={{ fontSize: "10.5px", color: "var(--ink-3)", textTransform: "none" }}>
                    Select an experience style
                  </span>
                </div>
                <div className="experience-pills-wrap">
                  {FOOD_EXPERIENCE_TYPES.map((exp) => (
                    <button
                      type="button"
                      key={exp.id}
                      className={`experience-pill ${selectedFoodExp === exp.id ? "active" : ""}`}
                      onClick={() => setSelectedFoodExp(exp.id)}
                      title={exp.desc}
                    >
                      <span>{exp.icon}</span>
                      <span>{exp.label}</span>
                    </button>
                  ))}
                </div>

                {/* City Base & Search Filters */}
                <div className="filter-row-label">
                  <span>2. Filter by itinerary stop & search</span>
                </div>
                <div className="search-and-city-bar">
                  <div className="city-pills-row">
                    <button
                      type="button"
                      className={`city-pill ${selectedFoodCity === "all" ? "active" : ""}`}
                      onClick={() => setSelectedFoodCity("all")}
                    >
                      All Itinerary Stops
                    </button>
                    {uniqueBases.map((b) => (
                      <button
                        type="button"
                        key={b}
                        className={`city-pill ${selectedFoodCity === b ? "active" : ""}`}
                        onClick={() => setSelectedFoodCity(b)}
                      >
                        {nm(b)}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    className="experience-search-input"
                    placeholder="Search restaurant, cuisine, or specialty dish..."
                    value={foodQuery}
                    onChange={(e) => setFoodQuery(e.target.value)}
                  />
                  {foodQuery && (
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => setFoodQuery("")}
                      style={{ fontSize: "11px" }}
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>

              {/* Restaurant Results Grid */}
              {restaurants.length === 0 ? (
                <div className="panel" style={{ textAlign: "center", padding: "30px 16px" }}>
                  <p style={{ fontSize: "14px", color: "var(--ink)", fontWeight: 700 }}>
                    No restaurants found matching this filter.
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--ink-3)", marginTop: "6px" }}>
                    Try selecting "All Food Experiences" or resetting your search.
                  </p>
                  <button
                    type="button"
                    className="primary sm"
                    style={{ background: country.accent, marginTop: "12px" }}
                    onClick={() => { setSelectedFoodExp("all"); setSelectedFoodCity("all"); setFoodQuery(""); }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="experience-card-grid">
                  {restaurants.map((r) => {
                    const isReserved = !!reservedRestaurants[r.id];
                    const isSaved = !!savedRestaurants[r.id];
                    const expObj = FOOD_EXPERIENCE_TYPES.find((f) => f.id === r.experienceId);

                    return (
                      <article key={r.id} className={`experience-card ${isReserved ? "is-booked" : ""}`}>
                        <div className="exp-card-media">
                          <img src={r.image} alt={r.name} className="exp-card-img" loading="lazy" />
                          <div className="exp-card-badges">
                            <span className="exp-tag-badge">
                              {expObj ? `${expObj.icon} ${expObj.label}` : "Dining"}
                            </span>
                            <span className="exp-price-badge">{r.priceLevel}</span>
                          </div>
                        </div>

                        <div className="exp-card-body">
                          <div className="exp-card-header">
                            <h3 className="exp-card-title">{r.name}</h3>
                            <span className="exp-card-rating">
                              ★ {r.rating.toFixed(1)} <small>({r.reviewCount})</small>
                            </span>
                          </div>

                          <span className="exp-card-loc">
                            📍 {r.cityName} · {r.cuisine}
                          </span>

                          <p className="exp-card-specialty">
                            <b>Must-Try:</b> {r.specialty}
                          </p>

                          <div className="exp-amenities-row">
                            {r.tags.map((t, i) => (
                              <span key={i} className="exp-amenity-tag">
                                #{t}
                              </span>
                            ))}
                          </div>

                          <div className="exp-card-actions">
                            <button
                              type="button"
                              className={`exp-book-btn ${isReserved ? "booked" : ""}`}
                              onClick={() => toggleReserveRestaurant(r.id, r.name, r.cityName)}
                            >
                              {isReserved ? "✓ Reserved Table" : "✦ Reserve Table"}
                            </button>
                            <button
                              type="button"
                              className="exp-save-btn"
                              onClick={() => toggleSaveRestaurant(r.id, r.name)}
                              title={isSaved ? "Saved to route" : "Save to route"}
                            >
                              {isSaved ? "★ Saved" : "☆ Save"}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Teaser to Reel Ideas */}
              <div style={{ marginTop: "24px", padding: "16px 20px", background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h4 style={{ margin: "0 0 3px", fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>
                    🎬 Want viral Reel & Video Ideas for these dining spots & places?
                  </h4>
                  <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                    Explore {reelIdeas.length} curated shot lists, 3-second hooks, and camera angles tailored for {uniqueBases.map(nm).join(", ")}.
                  </p>
                </div>
                <button
                  type="button"
                  className="primary sm"
                  style={{ background: "#0f172a", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}
                  onClick={() => {
                    setActiveTab("reels");
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                >
                  <span>Explore Reel Ideas ({reelIdeas.length})</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= HOTEL EXPERIENCES PANEL ================= */}
          {activeTab === "hotels" && (
            <div>
              <div className="experience-filter-box">
                {/* Hotel Experience Style Filter Pills */}
                <div className="filter-row-label">
                  <span>1. What kind of hotel stay style do you want?</span>
                  <span style={{ fontSize: "10.5px", color: "var(--ink-3)", textTransform: "none" }}>
                    Select an accommodation style
                  </span>
                </div>
                <div className="experience-pills-wrap">
                  {HOTEL_EXPERIENCE_TYPES.map((exp) => (
                    <button
                      type="button"
                      key={exp.id}
                      className={`experience-pill ${selectedHotelExp === exp.id ? "active" : ""}`}
                      onClick={() => setSelectedHotelExp(exp.id)}
                      title={exp.desc}
                    >
                      <span>{exp.icon}</span>
                      <span>{exp.label}</span>
                    </button>
                  ))}
                </div>

                {/* City Base & Search Filters */}
                <div className="filter-row-label">
                  <span>2. Filter by itinerary stop & search</span>
                </div>
                <div className="search-and-city-bar">
                  <div className="city-pills-row">
                    <button
                      type="button"
                      className={`city-pill ${selectedHotelCity === "all" ? "active" : ""}`}
                      onClick={() => setSelectedHotelCity("all")}
                    >
                      All Itinerary Bases
                    </button>
                    {uniqueBases.map((b) => (
                      <button
                        type="button"
                        key={b}
                        className={`city-pill ${selectedHotelCity === b ? "active" : ""}`}
                        onClick={() => setSelectedHotelCity(b)}
                      >
                        {nm(b)}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    className="experience-search-input"
                    placeholder="Search hotel name, amenity, or style..."
                    value={hotelQuery}
                    onChange={(e) => setHotelQuery(e.target.value)}
                  />
                  {hotelQuery && (
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => setHotelQuery("")}
                      style={{ fontSize: "11px" }}
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>

              {/* Hotel Results Grid */}
              {hotels.length === 0 ? (
                <div className="panel" style={{ textAlign: "center", padding: "30px 16px" }}>
                  <p style={{ fontSize: "14px", color: "var(--ink)", fontWeight: 700 }}>
                    No stays found matching this filter.
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--ink-3)", marginTop: "6px" }}>
                    Try selecting "All Stay Styles" or resetting your search.
                  </p>
                  <button
                    type="button"
                    className="primary sm"
                    style={{ background: country.accent, marginTop: "12px" }}
                    onClick={() => { setSelectedHotelExp("all"); setSelectedHotelCity("all"); setHotelQuery(""); }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="experience-card-grid">
                  {hotels.map((h) => {
                    const isBooked = !!bookedHotels[h.id];
                    const isSaved = !!savedHotels[h.id];
                    const expObj = HOTEL_EXPERIENCE_TYPES.find((f) => f.id === h.experienceId);

                    return (
                      <article key={h.id} className={`experience-card ${isBooked ? "is-booked" : ""}`}>
                        <div className="exp-card-media">
                          <img src={h.image} alt={h.name} className="exp-card-img" loading="lazy" />
                          <div className="exp-card-badges">
                            <span className="exp-tag-badge">
                              {expObj ? `${expObj.icon} ${expObj.label}` : "Stay"}
                            </span>
                            <span className="exp-price-badge">{h.pricePerNight}</span>
                          </div>
                        </div>

                        <div className="exp-card-body">
                          <div className="exp-card-header">
                            <h3 className="exp-card-title">{h.name}</h3>
                            <span className="exp-card-rating">
                              ★ {h.rating.toFixed(2)} <small>({h.reviewCount})</small>
                            </span>
                          </div>

                          <span className="exp-card-loc">
                            📍 {h.cityName} · {h.style}
                          </span>

                          <p className="exp-card-specialty">
                            <b>Location:</b> {h.proximity}
                          </p>

                          <div className="exp-amenities-row">
                            {h.amenities.map((a, i) => (
                              <span key={i} className="exp-amenity-tag">
                                ✓ {a}
                              </span>
                            ))}
                          </div>

                          <div className="exp-card-actions">
                            <button
                              type="button"
                              className={`exp-book-btn ${isBooked ? "booked" : ""}`}
                              onClick={() => toggleBookHotel(h.id, h.name, h.cityName)}
                            >
                              {isBooked ? "✓ Selected Stay" : "✦ Select Stay"}
                            </button>
                            <button
                              type="button"
                              className="exp-save-btn"
                              onClick={() => toggleSaveHotel(h.id, h.name)}
                              title={isSaved ? "Saved to itinerary" : "Save to itinerary"}
                            >
                              {isSaved ? "★ Saved" : "☆ Save"}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Teaser to Reel Ideas */}
              <div style={{ marginTop: "24px", padding: "16px 20px", background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h4 style={{ margin: "0 0 3px", fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>
                    🎬 Want viral Reel & Video Ideas for these stays & stops?
                  </h4>
                  <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                    Explore {reelIdeas.length} curated shot lists, 3-second hooks, and camera angles tailored for {uniqueBases.map(nm).join(", ")}.
                  </p>
                </div>
                <button
                  type="button"
                  className="primary sm"
                  style={{ background: "#0f172a", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}
                  onClick={() => {
                    setActiveTab("reels");
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                >
                  <span>Explore Reel Ideas ({reelIdeas.length})</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= REEL IDEAS PANEL ================= */}
          {activeTab === "reels" && (
            <div className="reel-ideas-container">
              <div className="experience-filter-box">
                {/* Reel Style Filter Pills */}
                <div className="filter-row-label">
                  <span>1. Select Reel / Video Style</span>
                  <span style={{ fontSize: "10.5px", color: "var(--ink-3)", textTransform: "none" }}>
                    {reelIdeas.length} viral blueprints for your route
                  </span>
                </div>
                <div className="experience-pill-strip">
                  {REEL_STYLE_TYPES.map((st) => (
                    <button
                      type="button"
                      key={st.id}
                      className={`exp-filter-pill ${selectedReelStyle === st.id ? "active" : ""}`}
                      onClick={() => setSelectedReelStyle(st.id)}
                    >
                      <span>{st.icon}</span>
                      <span>{st.label}</span>
                    </button>
                  ))}
                </div>

                {/* Filter by Stop / Base in Route */}
                <div className="filter-row-label" style={{ marginTop: "16px" }}>
                  <span>2. Filter by Particular Place on Route</span>
                  <span style={{ fontSize: "10.5px", color: "var(--ink-3)", textTransform: "none" }}>
                    {uniqueBases.length} destinations
                  </span>
                </div>
                <div className="experience-pill-strip">
                  <button
                    type="button"
                    className={`exp-filter-pill ${selectedReelCity === "all" ? "active" : ""}`}
                    onClick={() => setSelectedReelCity("all")}
                  >
                    All Route Stops ({uniqueBases.length})
                  </button>
                  {uniqueBases.map((b) => (
                    <button
                      type="button"
                      key={b}
                      className={`exp-filter-pill ${selectedReelCity === b ? "active" : ""}`}
                      onClick={() => setSelectedReelCity(b)}
                    >
                      <span>📍</span>
                      <span>{nm(b)}</span>
                    </button>
                  ))}
                </div>

                {/* Keyword search */}
                <div className="experience-search-row">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="experience-search-input"
                    placeholder="Search reel hooks, angles, shots, or spots (e.g. 'train window', 'fountain', 'reflection')..."
                    value={reelQuery}
                    onChange={(e) => setReelQuery(e.target.value)}
                  />
                  {reelQuery && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => setReelQuery("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Reel Ideas Grid */}
              {reelIdeas.length === 0 ? (
                <div className="experience-empty-state">
                  <p>No reel ideas found matching the current filters.</p>
                  <button
                    type="button"
                    className="experience-reset-btn"
                    onClick={() => {
                      setSelectedReelStyle("all");
                      setSelectedReelCity("all");
                      setReelQuery("");
                    }}
                  >
                    Reset All Reel Filters
                  </button>
                </div>
              ) : (
                <div className="reel-card-grid">
                  {reelIdeas.map((reel) => {
                    const isSaved = !!savedReels[reel.id];
                    const styleObj = REEL_STYLE_TYPES.find((s) => s.id === reel.styleId);
                    return (
                      <article key={reel.id} className={`reel-card ${isSaved ? "is-saved" : ""}`}>
                        {/* Media Header */}
                        <div className="reel-card-media">
                          <img
                            src={reel.image}
                            alt={reel.title}
                            className="reel-card-img"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="reel-card-overlay">
                            <div className="reel-card-top-badges">
                              <span className="reel-style-badge">
                                {styleObj?.icon || "🎬"} {styleObj?.label.split("&")[0].trim() || "Reel"}
                              </span>
                              <span className="reel-aspect-tag">9:16 Reel</span>
                            </div>
                            <div className="reel-card-bottom-info">
                              <span className="reel-place-label">
                                📍 {reel.placeName} · {reel.spotName}
                              </span>
                              <h3 className="reel-title-overlay">{reel.title}</h3>
                            </div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="reel-card-body">
                          {/* Hook Callout */}
                          <div className="reel-hook-box">
                            <div className="reel-hook-label">
                              <span>⚡</span> 3-Sec Video Hook (Text Overlay)
                            </div>
                            <p className="reel-hook-text">"{reel.hookOverlay}"</p>
                          </div>

                          {/* Shot List Sequence */}
                          <div className="reel-shot-list-wrap">
                            <div className="reel-shot-list-label">
                              <span>📹</span> 3-Shot Sequence & Camera Angles
                            </div>
                            {reel.shots.map((shot, idx) => (
                              <div key={idx} className="reel-shot-step">
                                <span className="reel-shot-timing">{shot.timing}</span>
                                <div className="reel-shot-content">
                                  <span className="reel-shot-action">{shot.action}</span>
                                  <span className="reel-shot-tip">💡 Camera angle: {shot.cameraTip}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Metadata Tags */}
                          <div className="reel-meta-tags">
                            <span className="reel-meta-pill viral">
                              {reel.viralPotential}
                            </span>
                            <span className="reel-meta-pill audio" title="Recommended sound/music vibe">
                              🎵 {reel.audioVibe}
                            </span>
                            <span className="reel-meta-pill time" title="Best lighting and time to film">
                              🌅 {reel.bestTimeToFilm}
                            </span>
                          </div>

                          {/* Footer Actions */}
                          <div className="reel-card-footer">
                            <button
                              type="button"
                              className="reel-copy-btn"
                              onClick={() => copyReelScript(reel)}
                              title="Copy hook, camera shots, and caption to clipboard"
                            >
                              <span>📋</span>
                              <span>Copy Shot List</span>
                            </button>
                            <button
                              type="button"
                              className={`reel-save-btn ${isSaved ? "saved" : ""}`}
                              onClick={() => toggleSaveReel(reel.id, reel.title)}
                              title={isSaved ? "Saved in shoot list" : "Save in shoot list"}
                            >
                              {isSaved ? "★ Saved" : "☆ Save"}
                            </button>
                            <button
                              type="button"
                              className="reel-save-btn"
                              onClick={() => setReelModalDest(reel.placeKey)}
                              title="View sights & photography tips for this place"
                            >
                              📷 Photos
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= REEL IDEAS AFTER HOTELS & RESTAURANTS LIST ================= */}
        {activeTab !== "reels" && (
          <div style={{ marginTop: "36px", paddingTop: "28px", borderTop: "2px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px", marginBottom: "18px" }}>
              <div>
                <p className="kicker" style={{ color: country.accent, margin: "0 0 4px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>
                  CONTENT CREATOR BLUEPRINTS
                </p>
                <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>
                  🎬 Reel & Video Ideas for {country.name} Stops
                </h3>
                <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                  Shot lists, camera angles, and 3-second hooks for {uniqueBases.map(nm).join(", ")}.
                </p>
              </div>
              <button
                type="button"
                className="secondary sm"
                style={{ fontSize: "12px", fontWeight: 700 }}
                onClick={() => {
                  setActiveTab("reels");
                  window.scrollTo({ top: 380, behavior: "smooth" });
                }}
              >
                <span>Filter by Style ({reelIdeas.length} Ideas)</span>
                <span> →</span>
              </button>
            </div>

            {/* Quick Stop Pills for the After-Hotels Section */}
            <div className="experience-pill-strip" style={{ marginBottom: "16px" }}>
              <button
                type="button"
                className={`exp-filter-pill ${selectedReelCity === "all" ? "active" : ""}`}
                onClick={() => setSelectedReelCity("all")}
              >
                All Route Stops ({uniqueBases.length})
              </button>
              {uniqueBases.map((b) => (
                <button
                  type="button"
                  key={b}
                  className={`exp-filter-pill ${selectedReelCity === b ? "active" : ""}`}
                  onClick={() => setSelectedReelCity(b)}
                >
                  <span>📍</span>
                  <span>{nm(b)}</span>
                </button>
              ))}
            </div>

            {/* Reel Cards Grid */}
            <div className="reel-card-grid">
              {reelIdeas.slice(0, 6).map((reel) => {
                const isSaved = !!savedReels[reel.id];
                const styleObj = REEL_STYLE_TYPES.find((s) => s.id === reel.styleId);
                return (
                  <article key={reel.id} className={`reel-card ${isSaved ? "is-saved" : ""}`}>
                    <div className="reel-card-media">
                      <img
                        src={reel.image}
                        alt={reel.title}
                        className="reel-card-img"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="reel-card-overlay">
                        <div className="reel-card-top-badges">
                          <span className="reel-style-badge">
                            {styleObj?.icon || "🎬"} {styleObj?.label.split("&")[0].trim() || "Reel"}
                          </span>
                          <span className="reel-aspect-tag">9:16 Reel</span>
                        </div>
                        <div className="reel-card-bottom-info">
                          <span className="reel-place-label">
                            📍 {reel.placeName} · {reel.spotName}
                          </span>
                          <h3 className="reel-title-overlay">{reel.title}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="reel-card-body">
                      <div className="reel-hook-box">
                        <div className="reel-hook-label">
                          <span>⚡</span> 3-Sec Video Hook (Text Overlay)
                        </div>
                        <p className="reel-hook-text">"{reel.hookOverlay}"</p>
                      </div>

                      <div className="reel-shot-list-wrap">
                        <div className="reel-shot-list-label">
                          <span>📹</span> 3-Shot Sequence & Camera Angles
                        </div>
                        {reel.shots.map((shot, idx) => (
                          <div key={idx} className="reel-shot-step">
                            <span className="reel-shot-timing">{shot.timing}</span>
                            <div className="reel-shot-content">
                              <span className="reel-shot-action">{shot.action}</span>
                              <span className="reel-shot-tip">💡 Camera angle: {shot.cameraTip}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="reel-meta-tags">
                        <span className="reel-meta-pill viral">
                          {reel.viralPotential}
                        </span>
                        <span className="reel-meta-pill audio" title="Recommended sound/music vibe">
                          🎵 {reel.audioVibe}
                        </span>
                        <span className="reel-meta-pill time" title="Best lighting and time to film">
                          🌅 {reel.bestTimeToFilm}
                        </span>
                      </div>

                      <div className="reel-card-footer">
                        <button
                          type="button"
                          className="reel-copy-btn"
                          onClick={() => copyReelScript(reel)}
                          title="Copy hook, camera shots, and caption to clipboard"
                        >
                          <span>📋</span>
                          <span>Copy Shot List</span>
                        </button>
                        <button
                          type="button"
                          className={`reel-save-btn ${isSaved ? "saved" : ""}`}
                          onClick={() => toggleSaveReel(reel.id, reel.title)}
                          title={isSaved ? "Saved in shoot list" : "Save in shoot list"}
                        >
                          {isSaved ? "★ Saved" : "☆ Save"}
                        </button>
                        <button
                          type="button"
                          className="reel-save-btn"
                          onClick={() => setReelModalDest(reel.placeKey)}
                          title="View sights & photography tips for this place"
                        >
                          📷 Photos
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {questions && questions.length > 0 && ask && (
          <div className="qa">
            <h2>Travel Adviser Q&A</h2>
            <p className="qa-sub">Have questions about your route, pace, or budget? Tap a question to consult the adviser.</p>
            <div className="qa-chips">
              {questions.map((q: any) => (
                <button
                  type="button"
                  key={q.q}
                  className="qa-chip"
                  onClick={() => ask(q)}
                >
                  {q.q}
                </button>
              ))}
            </div>

            {log && log.length > 0 && (
              <div className="qa-log">
                {log.map((item: any, idx: number) => (
                  <div className="qa-item" key={idx}>
                    <div className="qa-q" style={{ color: country.accent }}>Q: {item.q}</div>
                    <div className="qa-a">
                      {item.text.map((t: string, i: number) => (
                        <p key={i}>{t}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {proposal && applyProposal && dismissProposal && (
              <div className="proposal" style={{ borderColor: country.accent }}>
                <p><b>Recommended adjustment:</b> {proposal.label}</p>
                <div>
                  <button
                    type="button"
                    className="primary sm"
                    style={{ background: country.accent }}
                    onClick={applyProposal}
                  >
                    Apply changes
                  </button>
                  <button
                    type="button"
                    className="secondary sm"
                    onClick={dismissProposal}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="end-card">
          <span style={{ color: country.accent }}>✓</span>
          <div>
            <b>Trip planning complete.</b>
            <p>Destination → Dates → Budget → Must-See Places → Itinerary & Weather-Proofing → Hotels & Dining → Reel Ideas</p>
          </div>
        </div>
      </section>

      {/* Location Photo & Sights Modal from Reel Ideas */}
      {reelModalDest && (
        <LocationDetailModal
          destKey={reelModalDest}
          countryKey={country.key}
          onClose={() => setReelModalDest(null)}
        />
      )}
    </main>
  );
}
