"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ── Types ─────────────────────────────────────────────────────────── */
interface TweakState {
  displayFont: string;
  bodyFont: string;
  monoFont: string;
  heroIntensity: number;
  heroSpeed: number;
  heroPalette: "warm" | "cool" | "forest" | "mono";
}

const DEFAULTS: TweakState = {
  displayFont: "Fraunces",
  bodyFont: "Inter Tight",
  monoFont: "JetBrains Mono",
  heroIntensity: 1.0,
  heroSpeed: 1.0,
  heroPalette: "warm",
};

const FONT_PAIRS = {
  display: [
    { v: "Fraunces", label: "Fraunces" },
    { v: "Instrument Serif", label: "Instrument Serif" },
    { v: "DM Serif Display", label: "DM Serif Display" },
    { v: "Playfair Display", label: "Playfair" },
    { v: "Cormorant Garamond", label: "Cormorant" },
    { v: "Syne", label: "Syne" },
    { v: "Space Grotesk", label: "Space Grotesk" },
    { v: "Inter Tight", label: "Inter Tight" },
  ],
  body: [
    { v: "Inter Tight", label: "Inter Tight" },
    { v: "Inter", label: "Inter" },
    { v: "DM Sans", label: "DM Sans" },
    { v: "Manrope", label: "Manrope" },
    { v: "IBM Plex Sans", label: "IBM Plex Sans" },
  ],
  mono: [
    { v: "JetBrains Mono", label: "JetBrains Mono" },
    { v: "IBM Plex Mono", label: "IBM Plex Mono" },
    { v: "Space Mono", label: "Space Mono" },
  ],
};

const PALETTES: Record<string, { paper: string; ink: string; accent: string; stone: string }> = {
  warm:   { paper: "#f6f4ef", ink: "#1a1a1a", accent: "#d97757", stone: "#c9c4b8" },
  cool:   { paper: "#f4f6fa", ink: "#0a0e1a", accent: "#4a6cf7", stone: "#c5c9d3" },
  forest: { paper: "#f4f1ec", ink: "#1f2622", accent: "#5b8266", stone: "#c9c8be" },
  mono:   { paper: "#f4f4f4", ink: "#0a0a0a", accent: "#666666", stone: "#cccccc" },
};

/* ── Helpers ────────────────────────────────────────────────────────── */
function loadGoogleFont(family: string) {
  const id = "gf-" + family.replace(/\s+/g, "-");
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/\s+/g, "+")}:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap`;
  document.head.appendChild(link);
}

function applyFonts(t: TweakState) {
  loadGoogleFont(t.displayFont);
  loadGoogleFont(t.bodyFont);
  loadGoogleFont(t.monoFont);
  const root = document.documentElement;
  root.style.setProperty("--serif", `"${t.displayFont}", Georgia, serif`);
  root.style.setProperty("--sans", `"${t.bodyFont}", -apple-system, sans-serif`);
  root.style.setProperty("--mono", `"${t.monoFont}", Menlo, monospace`);
}

function applyPalette(t: TweakState) {
  const p = PALETTES[t.heroPalette] || PALETTES.warm;
  const root = document.documentElement;
  root.style.setProperty("--paper", p.paper);
  root.style.setProperty("--ink", p.ink);
  root.style.setProperty("--accent", p.accent);
  root.style.setProperty("--stone", p.stone);
  window.dispatchEvent(new CustomEvent("qe-palette", { detail: p }));
}

function applyHero(t: TweakState) {
  window.dispatchEvent(
    new CustomEvent("qe-hero", { detail: { intensity: t.heroIntensity, speed: t.heroSpeed } })
  );
}

/* ── Panel CSS ─────────────────────────────────────────────────────── */
const PANEL_STYLE = `
.twk-trigger{position:fixed;right:16px;bottom:16px;z-index:2147483645;
  appearance:none;border:1px solid rgba(0,0,0,.12);border-radius:10px;
  background:rgba(250,249,247,.9);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);
  padding:8px 12px;font:12px/1 ui-sans-serif,system-ui,sans-serif;color:#29261b;
  cursor:default;box-shadow:0 2px 12px rgba(0,0,0,.1);transition:background .15s}
.twk-trigger:hover{background:rgba(255,255,255,.95)}
.twk-panel{position:fixed;right:16px;bottom:56px;z-index:2147483646;width:280px;
  max-height:calc(100vh - 80px);display:flex;flex-direction:column;
  background:rgba(250,249,247,.88);color:#29261b;
  -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
  border:.5px solid rgba(255,255,255,.6);border-radius:14px;
  box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
  font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
.twk-hd{display:flex;align-items:center;justify-content:space-between;
  padding:10px 8px 10px 14px;cursor:move;user-select:none;border-bottom:.5px solid rgba(0,0,0,.06)}
.twk-hd b{font-size:12px;font-weight:600}
.twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
  width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
.twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
.twk-body{padding:8px 14px 14px;display:flex;flex-direction:column;gap:10px;
  overflow-y:auto;overflow-x:hidden;min-height:0}
.twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
  color:rgba(41,38,27,.45);padding:8px 0 0;margin-bottom:-4px}
.twk-row{display:flex;flex-direction:column;gap:5px}
.twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
  color:rgba(41,38,27,.72);font-weight:500}
.twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums;font-weight:400}
.twk-field{appearance:none;width:100%;height:26px;padding:0 22px 0 8px;
  border:.5px solid rgba(0,0,0,.1);border-radius:7px;
  background:rgba(255,255,255,.6) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>") no-repeat right 8px center;
  color:inherit;font:inherit;outline:none}
.twk-field:focus{border-color:rgba(0,0,0,.25);background-color:rgba(255,255,255,.85)}
.twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
  border-radius:999px;background:rgba(0,0,0,.12);outline:none}
.twk-slider::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;
  border-radius:50%;background:#fff;border:.5px solid rgba(0,0,0,.12);
  box-shadow:0 1px 3px rgba(0,0,0,.2)}
.twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
  background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2)}
.twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
  background:rgba(0,0,0,.06);user-select:none}
.twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
  background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
  transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s;pointer-events:none}
.twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
  background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
  border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2}
`;

/* ── Component ──────────────────────────────────────────────────────── */
export default function Tweaks() {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState<TweakState>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);

  const set = useCallback(<K extends keyof TweakState>(key: K, val: TweakState[K]) => {
    setT((prev) => ({ ...prev, [key]: val }));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { applyFonts(t); }, [t.displayFont, t.bodyFont, t.monoFont]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { applyPalette(t); }, [t.heroPalette]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { applyHero(t); }, [t.heroIntensity, t.heroSpeed]);

  /* dragging */
  const offsetRef = useRef({ right: 16, bottom: 56 });
  const onDragStart = (e: React.MouseEvent) => {
    const panel = panelRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        right: Math.max(8, startRight - (ev.clientX - sx)),
        bottom: Math.max(8, startBottom - (ev.clientY - sy)),
      };
      panel.style.right = offsetRef.current.right + "px";
      panel.style.bottom = offsetRef.current.bottom + "px";
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const palettes = ["warm", "cool", "forest", "mono"] as const;
  const palIdx = palettes.indexOf(t.heroPalette);

  return (
    <>
      <style>{PANEL_STYLE}</style>

      <button type="button" className="twk-trigger" onClick={() => setOpen((o) => !o)}>
        {open ? "✕ Close" : "⚙ Tweaks"}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="twk-panel"
          style={{ right: offsetRef.current.right, bottom: offsetRef.current.bottom }}
        >
          <div className="twk-hd" onMouseDown={onDragStart}>
            <b>Tweaks</b>
            <button className="twk-x" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="twk-body">
            <div className="twk-sect">Typography</div>

            <div className="twk-row">
              <div className="twk-lbl">Display font</div>
              <select
                className="twk-field"
                value={t.displayFont}
                onChange={(e) => set("displayFont", e.target.value)}
              >
                {FONT_PAIRS.display.map((o) => (
                  <option key={o.v} value={o.v}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="twk-row">
              <div className="twk-lbl">Body font</div>
              <select
                className="twk-field"
                value={t.bodyFont}
                onChange={(e) => set("bodyFont", e.target.value)}
              >
                {FONT_PAIRS.body.map((o) => (
                  <option key={o.v} value={o.v}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="twk-row">
              <div className="twk-lbl">Monospace font</div>
              <select
                className="twk-field"
                value={t.monoFont}
                onChange={(e) => set("monoFont", e.target.value)}
              >
                {FONT_PAIRS.mono.map((o) => (
                  <option key={o.v} value={o.v}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="twk-sect">Hero animation</div>

            <div className="twk-row">
              <div className="twk-lbl">
                <span>Intensity</span>
                <span className="twk-val">{t.heroIntensity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                className="twk-slider"
                min={0.2}
                max={2.0}
                step={0.05}
                value={t.heroIntensity}
                onChange={(e) => set("heroIntensity", Number(e.target.value))}
              />
            </div>

            <div className="twk-row">
              <div className="twk-lbl">
                <span>Speed</span>
                <span className="twk-val">{t.heroSpeed.toFixed(2)}</span>
              </div>
              <input
                type="range"
                className="twk-slider"
                min={0.1}
                max={2.5}
                step={0.05}
                value={t.heroSpeed}
                onChange={(e) => set("heroSpeed", Number(e.target.value))}
              />
            </div>

            <div className="twk-sect">Palette</div>

            <div className="twk-seg">
              <div
                className="twk-seg-thumb"
                style={{
                  left: `calc(2px + ${palIdx} * (100% - 4px) / ${palettes.length})`,
                  width: `calc((100% - 4px) / ${palettes.length})`,
                }}
              />
              {palettes.map((p) => (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={t.heroPalette === p}
                  onClick={() => set("heroPalette", p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
