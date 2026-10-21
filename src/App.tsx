import React from "react";
import {
  COUNTRIES,
  CountryConfig,
  startOptions,
  DEFAULTS,
} from "./data/countries";
import {
  makePlan,
  computeCost,
  diffPlans,
  daysBetween,
  defaultTripDates,
  dateISO,
} from "./utils/solver";
import { buildQuestions } from "./utils/activities";
import { Stepper, agentMessages } from "./components/Common";
import {
  CountrySelect,
  Setup,
  Dashboard,
  Next,
} from "./components/Screens";
import { getScenery, SceneryInfo } from "./data/scenery";

export default function App() {
  const [screen, setScreen] = React.useState<"country" | "setup" | "dash" | "next">("country");
  const [countryKey, setCountryKey] = React.useState<string | null>(null);
  const [previewCountry, setPreviewCountry] = React.useState<string | null>(null);
  const [previewDestination, setPreviewDestination] = React.useState<string | null>(null);
  const [sceneryMode, setSceneryMode] = React.useState<"normal" | "immersive">("normal");

  const initialDates = defaultTripDates();
  const [settings, setSettings] = React.useState({
    ...DEFAULTS,
    start: "" as string,
    days: 6,
    startDate: initialDates.startDate,
    endDate: initialDates.endDate,
    budgetAmount: 1500,
    profile: "solo",
  });
  const [decision, setDecision] = React.useState<any>(null);
  const [snapshot, setSnapshot] = React.useState<any>(null);
  const [options, setOptions] = React.useState<any>(null);
  const [compare, setCompare] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [log, setLog] = React.useState<any[]>([]);
  const [proposal, setProposal] = React.useState<any>(null);
  const [altCount, setAltCount] = React.useState(0);
  const [thinking, setThinking] = React.useState({ active: false, messages: [] as string[], msgIndex: 0 });
  const timers = React.useRef<{ i?: any; t?: any }>({});

  const clearTimers = () => {
    if (timers.current.i) clearInterval(timers.current.i);
    if (timers.current.t) clearTimeout(timers.current.t);
  };
  React.useEffect(() => clearTimers, []);

  const runAction = (label: string, fn: () => void) => {
    clearTimers();
    const messages = agentMessages(label);
    setThinking({ active: true, messages, msgIndex: 0 });
    let idx = 0;
    timers.current.i = setInterval(() => {
      idx++;
      setThinking((t) => ({ ...t, msgIndex: idx }));
    }, 380);
    timers.current.t = setTimeout(() => {
      clearInterval(timers.current.i);
      setThinking({ active: false, messages: [], msgIndex: 0 });
      fn();
    }, 820);
  };

  const country = countryKey ? COUNTRIES[countryKey] : null;

  // Active Scenery determination based on hovered place, starting hub, or country
  const currentCountryKey = countryKey || previewCountry || "switzerland";
  const currentDestKey = hovered || previewDestination || (countryKey ? settings.start : undefined);
  const activeScenery = getScenery(currentCountryKey, currentDestKey);

  const plan = React.useMemo(() => {
    if (!country || !settings.start) return null;
    const p = makePlan(country, settings);
    return { ...p, cost: computeCost(country, p, settings.budget) };
  }, [country, settings]);

  const planB = React.useMemo(() => {
    if (!country || !settings.start) return null;
    const p = makePlan(country, { ...settings, lambda: 0.7, capBonus: 2 });
    return { ...p, cost: computeCost(country, p, settings.budget) };
  }, [country, settings]);

  const set = (patch: any) => setSettings((s) => ({ ...s, ...patch }));

  const applyChange = (patch: any, label: string) => {
    if (!country) return;
    runAction(label, () => {
      const next = { ...settings, ...patch };
      const after = makePlan(country, next);
      const afterC = { ...after, cost: computeCost(country, after, next.budget) };
      setSnapshot({ settings, plan });
      setDecision({ label, before: plan, after: afterC, diff: diffPlans(plan, afterC) });
      setSettings(next);
      setOptions(null);
      setProposal(null);
    });
  };

  const restore = () => {
    if (!snapshot) return;
    setSettings(snapshot.settings);
    setDecision(null);
    setOptions(null);
    setAltCount(0);
  };

  const generateAlternative = () => {
    if (!country) return;
    const variants = [
      { lambda: 1.0, capBonus: 0, oneWay: false },
      { lambda: 4.0, capBonus: -1, oneWay: false },
      { lambda: 2.0, capBonus: 1, oneWay: true },
    ];
    const v = variants[altCount % variants.length];
    setAltCount((c) => c + 1);
    runAction("Generating an alternative", () => {
      const next = { ...settings, ...v };
      const after = makePlan(country, next);
      const afterC = { ...after, cost: computeCost(country, after, next.budget) };
      setDecision({
        label: "Alternative route",
        before: plan,
        after: afterC,
        diff: diffPlans(plan, afterC),
        alt: true,
      });
      setSettings(next);
    });
  };

  const pickOption = (which: "a" | "b") => {
    const chosen = which === "a" ? options.a : options.b;
    runAction("Applying your choice", () => {
      set({ ...chosen.settings, must: chosen.stops.filter((k: string) => k !== chosen.settings.start) });
      setOptions(null);
    });
  };

  const pickCountry = (ck: string) => {
    const c = COUNTRIES[ck];
    setCountryKey(ck);
    setPreviewCountry(null);
    const ds = defaultTripDates();
    const st = startOptions(c)[0];
    setSettings({
      ...DEFAULTS,
      start: st,
      days: daysBetween(ds.startDate, ds.endDate),
      startDate: ds.startDate,
      endDate: ds.endDate,
      budgetAmount: 1500,
      profile: "solo",
    });
    setDecision(null);
    setOptions(null);
    setSnapshot(null);
    setLog([]);
    setProposal(null);
    setScreen("setup");
  };

  const runDemo = (which: "happy" | "stress") => {
    if (which === "happy") {
      setCountryKey("switzerland");
      const ds = defaultTripDates();
      setSettings({
        ...DEFAULTS,
        start: "zurich",
        days: daysBetween(ds.startDate, ds.endDate),
        startDate: ds.startDate,
        endDate: ds.endDate,
        budgetAmount: 1800,
        interests: ["mountains", "scenic", "nature"],
        profile: "solo",
      });
      setDecision(null);
      setOptions(null);
      setSnapshot(null);
      setScreen("dash");
    } else {
      const c = COUNTRIES.morocco;
      const req = Object.keys(c.dest).filter((k) => k !== "marrakech");
      const ds = defaultTripDates();
      const e = new Date(ds.startDate + "T12:00:00");
      e.setDate(e.getDate() + 3);
      const base = {
        ...DEFAULTS,
        start: "marrakech",
        days: 4,
        startDate: ds.startDate,
        endDate: dateISO(e),
        budgetAmount: 900,
        interests: ["adventure", "instagram"],
        must: req,
        profile: "friends",
      };
      setCountryKey("morocco");
      setSettings(base);
      const a = makePlan(c, { ...base });
      const b = makePlan(c, { ...base, lambda: 0.7, oneWay: true });
      setOptions({
        requested: req,
        days: 4,
        a: { ...a, cost: computeCost(c, a, "mid") },
        b: { ...b, cost: computeCost(c, b, "mid") },
      });
      setDecision(null);
      setSnapshot(null);
      setScreen("dash");
    }
  };

  const questions = React.useMemo(() => (country && plan ? buildQuestions(country, plan) : []), [country, plan]);

  const ask = (item: any) => {
    const res = item.a();
    setLog((l) => [...l, { q: item.q, ...res }]);
    if (res.apply) {
      setProposal({ patch: res.apply, label: res.applyLabel });
    }
  };

  const step = screen === "country" ? 1 : screen === "setup" ? 2 : screen === "next" ? 4 : 3;

  return (
    <div className={`app ${sceneryMode === "immersive" ? "scenery-mode-pure" : ""}`}>
      {/* Dynamic Scenery Backdrop */}
      <div className="scenery-viewport" aria-hidden="true">
        <div
          key={activeScenery.url}
          className="scenery-img"
          style={{ backgroundImage: `url(${activeScenery.url})` }}
        />
        <div className="scenery-vignette" />
      </div>

      {/* Floating Scenery Attribution & Immersion Toggle */}
      <div className="scenery-badge">
        <span className="scenery-badge-dot" />
        <div className="scenery-badge-text">
          <span className="scenery-badge-loc">📍 {activeScenery.location}</span>
          <span className="scenery-badge-desc">— {activeScenery.title}</span>
        </div>
        <button
          type="button"
          className="scenery-toggle-btn"
          title={sceneryMode === "immersive" ? "Restore cards view" : "Admire scenery view"}
          onClick={() => setSceneryMode((m) => (m === "normal" ? "immersive" : "normal"))}
        >
          {sceneryMode === "immersive" ? "Show Details" : "View Scenery"}
        </button>
      </div>

      <header className="topbar">
        <button type="button" className="brand" onClick={() => setScreen("country")}>
          <span className="flag-dot" style={{ background: country ? country.accent : "#0284C7" }} />
          <span className="brand-t">Trip Architect</span>
          {country && <span className="brand-s">{country.name}</span>}
        </button>
        {screen !== "country" && (
          <Stepper
            step={step}
            accent={country ? country.accent : undefined}
            go={(n) => setScreen(n === 1 ? "country" : n === 2 ? "setup" : n === 4 ? "next" : "dash")}
          />
        )}
        {screen !== "country" && (
          <button
            type="button"
            className="ghost"
            onClick={() => {
              setCountryKey(null);
              setPreviewCountry(null);
              setPreviewDestination(null);
              setScreen("country");
            }}
          >
            Start over
          </button>
        )}
      </header>

      {screen === "country" && (
        <CountrySelect
          onPick={pickCountry}
          onDemo={runDemo}
          onPreviewCountry={(ck) => setPreviewCountry(ck)}
        />
      )}

      {screen === "setup" && country && (
        <Setup
          country={country}
          settings={settings}
          set={set}
          onBack={() => setScreen("country")}
          onBuild={() => setScreen("dash")}
          onPreviewDestination={(destKey) => setPreviewDestination(destKey)}
        />
      )}

      {screen === "dash" && country && plan && (
        <Dashboard
          country={country}
          plan={plan}
          planB={planB}
          settings={settings}
          applyChange={applyChange}
          hovered={hovered}
          setHovered={setHovered}
          decision={decision}
          snapshot={snapshot}
          restore={restore}
          clearDecision={() => setDecision(null)}
          generateAlternative={generateAlternative}
          options={options}
          pickOption={pickOption}
          compare={compare}
          setCompare={setCompare}
          onFinish={() => setScreen("next")}
          thinking={thinking}
        />
      )}

      {screen === "next" && country && plan && (
        <Next
          country={country}
          plan={plan}
          settings={settings}
          back={() => setScreen("dash")}
          questions={questions}
          log={log}
          ask={ask}
          proposal={proposal}
          applyProposal={() => {
            if (proposal) {
              applyChange(proposal.patch, proposal.label);
              setProposal(null);
              setScreen("dash");
            }
          }}
          dismissProposal={() => setProposal(null)}
        />
      )}
    </div>
  );
}

