import React from "react";

export function Metric({
  label,
  value,
  sub,
  big,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  big?: boolean;
  accent?: string;
}) {
  return (
    <div className={"metric" + (big ? " big" : "")} style={big && accent ? { background: accent } : undefined}>
      <div className="metric-l">{label}</div>
      <div className="metric-v">{value}</div>
      {sub && <div className="metric-s">{sub}</div>}
    </div>
  );
}

export function Chip({
  on,
  onClick,
  children,
  dim,
  disabled,
}: {
  on?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  dim?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={"chip" + (on ? " on" : "") + (dim ? " dim" : "")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function Row({ k, v, strong }: { k: string; v: string | number; strong?: boolean }) {
  return (
    <div className={"crow" + (strong ? " strong" : "")}>
      <span>{k}</span>
      <b>{v}</b>
    </div>
  );
}

export function Stepper({
  step,
  go,
  accent,
}: {
  step: number;
  go: (s: number) => void;
  accent?: string;
}) {
  const steps = ["Destination", "Setup", "Itinerary", "What's next"];
  return (
    <nav className="stepper" aria-label="Progress">
      {steps.map((s, i) => (
        <button
          key={s}
          type="button"
          className={"step" + (i + 1 === step ? " now" : "") + (i + 1 < step ? " done" : "")}
          style={i + 1 === step && accent ? { background: accent } : undefined}
          onClick={() => go(i + 1)}
        >
          <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
          <span className="step-t">{s}</span>
        </button>
      ))}
    </nav>
  );
}

export function ScoreCard({ archetype, accent }: { archetype: any; accent: string }) {
  return (
    <div className="scorecard">
      <div className="sc-head">
        <span className="sc-label">Trip DNA</span>
        <h3>{archetype.label}</h3>
      </div>
      <div className="sc-bars">
        {archetype.ranked.map((b: string) => (
          <div className="sc-row" key={b}>
            <span className="sc-name">{b}</span>
            <div className="sc-track">
              <div className="sc-fill" style={{ width: `${archetype.pct[b]}%`, background: accent }} />
            </div>
            <span className="sc-pct">{archetype.pct[b]}%</span>
          </div>
        ))}
      </div>
      <p className="sc-note">Computed from the destinations actually in your route, not just what you asked for.</p>
    </div>
  );
}

export function ThinkingBar({
  active,
  messages,
  msgIndex,
}: {
  active: boolean;
  messages: string[];
  msgIndex: number;
}) {
  if (!active) return null;
  return (
    <div className="thinking">
      <span className="think-dot" />
      <span className="think-dot" />
      <span className="think-dot" />
      <span className="think-text">{messages[msgIndex % messages.length]}</span>
    </div>
  );
}

export function Block({ t, body }: { t: string; body: string }) {
  return (
    <div className="dblock">
      <h4>{t}</h4>
      <p>{body}</p>
    </div>
  );
}

export function agentMessages(label: string) {
  return [
    `Checking: ${label.toLowerCase()}...`,
    "Comparing routes against the transit budget...",
    "Re-solving the order to cut backtracking..."
  ];
}
