"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Project = {
  idx: string;
  title: string;
  tagline: string;
  body: string[];
  stack: string[];
  repo?: string;
  repoLabel?: string;
  note?: string;
};

const PROJECTS: Project[] = [
  {
    idx: "WORK / 01",
    title: "A chatbot that reads docs, runs SQL, and answers in tables and charts.",
    tagline: "MES Assist — configurable AI assistant + embeddable widget.",
    body: [
      "Built end-to-end for a Manufacturing Execution System — a no-code admin panel to configure chatbots (prompts, model, RAG knobs) and a self-contained widget that drops into any page with one <script> tag, isolated by Shadow DOM.",
      "Engine combines LlamaIndex + Qdrant RAG with a data-agent that runs read-only SQL and internal API calls, returning live plant data as tables and 11 chart types. LLM provider is switchable per-chatbot (Azure OpenAI · OpenRouter · OpenAI). Nginx fronts admin + widget same-origin under the main MES app with fail-safe upstreams.",
    ],
    stack: ["Django", "DRF", "React", "TypeScript", "LlamaIndex", "Qdrant", "Docker", "nginx", "Azure OpenAI"],
    note: "Production at CS Technology",
  },
  {
    idx: "OSS / 01",
    title: "An agent that reads its own stack traces.",
    tagline: "Open-source AI log analyzer & auto-debugger.",
    body: [
      "A Python agent that watches multi-service apps in real time, catches crashes the moment they happen, and walks the trace itself.",
      "When something breaks, an AI pipeline reads the stack, locates the seam, and proposes an immediate code fix — front-end or back-end. Slack and email pings carry the diff, not just the error.",
    ],
    stack: ["Python", "OpenAI", "FastAPI", "Slack API", "SMTP"],
    repo: "https://github.com/lakshyak789/AI_log_analyzer",
    repoLabel: "github.com/lakshyak789/AI_log_analyzer",
  },
  {
    idx: "OSS / 02",
    title: "A free copilot that sits beside you in the call.",
    tagline: "Open-source AI call & interview assistant.",
    body: [
      "Built as a free alternative to enterprise call assistants — and earned its community traction by refusing to put the useful parts behind a paywall.",
      "It listens to live audio for in-call advice, lets you drop in UI screenshots and returns ready-to-use front-end code, and parses your résumé into 15 specific interview questions tailored to it.",
    ],
    stack: ["Python", "React", "Whisper", "Vision AI", "WebRTC"],
    repo: "https://github.com/lakshyak789/AI_meeting-copilot",
    repoLabel: "github.com/lakshyak789/AI_meeting-copilot",
  },
];

function ProjectVisual({ idx }: { idx: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!wrapRef.current || !blobRef.current) return;
    const blob = blobRef.current;

    gsap.fromTo(
      blob,
      { scale: 0.85, rotate: idx % 2 === 0 ? -8 : 8 },
      {
        scale: 1.05,
        rotate: idx % 2 === 0 ? 4 : -4,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    const floatCard = blob.querySelector<HTMLElement>(".float-card");
    if (floatCard) {
      gsap.to(floatCard, { y: -16, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }
  }, [idx]);

  if (idx === 0) {
    return (
      <div className="visual" ref={wrapRef} style={{ background: "#ece8de" }}>
        <div ref={blobRef} style={{ position: "absolute", inset: 0 }}>
          <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%", display: "block" }}>
            {/* Browser frame */}
            <rect x="24" y="40" width="352" height="380" rx="10" fill="#fbf8f1" stroke="#d8d3c7" />
            <rect x="24" y="40" width="352" height="32" rx="10" fill="#1f1d1a" />
            <rect x="24" y="60" width="352" height="12" fill="#1f1d1a" />
            <circle cx="42" cy="56" r="4" fill="#d97757" />
            <circle cx="56" cy="56" r="4" fill="#5b8266" opacity="0.5" />
            <circle cx="70" cy="56" r="4" fill="#3a3633" />
            <rect x="120" y="48" width="180" height="16" rx="3" fill="#2a2724" />
            <text x="130" y="60" fill="#a09b93" fontFamily="monospace" fontSize="9">mes.app/dashboard</text>

            {/* Page content peeking through */}
            <g opacity="0.35">
              <text x="44" y="100" fill="#1a1a1a" fontFamily="serif" fontStyle="italic" fontSize="14">Plant Operations</text>
              <rect x="44" y="112" width="220" height="6" rx="2" fill="#c9c4b8" />
              <rect x="44" y="124" width="240" height="6" rx="2" fill="#dad5c8" />
              <rect x="44" y="136" width="160" height="6" rx="2" fill="#dad5c8" />
              <rect x="44" y="160" width="120" height="40" rx="4" fill="#dad5c8" />
              <rect x="170" y="160" width="120" height="40" rx="4" fill="#dad5c8" />
            </g>

            {/* Floating MES Assist widget */}
            <g transform="translate(180, 130)" className="float-card">
              <rect x="0" y="0" width="180" height="270" rx="10" fill="#1f1d1a" stroke="#2a2724" />
              <rect x="0" y="0" width="180" height="34" rx="10" fill="#161412" />
              <rect x="0" y="22" width="180" height="12" fill="#161412" />
              <circle cx="18" cy="17" r="5" fill="#d97757" />
              <text x="30" y="21" fill="#f6f4ef" fontFamily="serif" fontStyle="italic" fontSize="12">MES Assist</text>

              {/* User message */}
              <rect x="48" y="48" width="120" height="22" rx="11" fill="#2a2724" />
              <text x="58" y="62" fill="#a09b93" fontFamily="sans-serif" fontSize="9">furnace temps last 24h?</text>

              {/* Status */}
              <text x="12" y="88" fill="#6b6862" fontFamily="monospace" fontSize="7">QUERYING SQL...</text>

              {/* Answer card with chart */}
              <rect x="10" y="98" width="160" height="130" rx="6" fill="#0f0d0b" stroke="#2a2724" />
              <text x="20" y="116" fill="#6b6862" fontFamily="monospace" fontSize="7">FURNACE 01 · LAST 24H</text>
              <g transform="translate(20, 124)">
                {Array.from({ length: 12 }).map((_, i) => {
                  const h = Math.abs(Math.sin(i * 0.55 + 0.3)) * 70 + 12;
                  return (
                    <rect
                      key={i}
                      x={i * 11}
                      y={88 - h}
                      width="8"
                      height={h}
                      fill="#d97757"
                      opacity={0.45 + Math.abs(Math.sin(i * 0.55 + 0.3)) * 0.55}
                    />
                  );
                })}
              </g>

              {/* Input bar */}
              <rect x="10" y="238" width="160" height="22" rx="11" fill="#2a2724" />
              <text x="20" y="252" fill="#6b6862" fontFamily="sans-serif" fontSize="9">Ask anything…</text>
              <circle cx="158" cy="249" r="6" fill="#d97757" opacity="0.6" />
            </g>

            {/* Embed indicator */}
            <text x="44" y="448" fill="#1a1a1a" fontFamily="monospace" fontSize="9" opacity="0.6">
              &lt;script src=&quot;/chatbot-widget.js&quot; /&gt;
            </text>
            <text x="44" y="464" fill="#7a7770" fontFamily="monospace" fontSize="7">
              one tag · any page · shadow DOM
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (idx === 1) {
    return (
      <div className="visual" ref={wrapRef} style={{ background: "#1f1d1a" }}>
        <div ref={blobRef} style={{ position: "absolute", inset: 0 }}>
          <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%", display: "block" }}>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#d97757" stopOpacity="0.0" />
                <stop offset="1" stopColor="#d97757" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <rect width="400" height="500" fill="url(#grad1)" />
            <g transform="translate(40, 60)" className="float-card">
              <rect width="320" height="380" rx="6" fill="#161412" stroke="#2a2724" />
              <circle cx="18" cy="20" r="5" fill="#d97757" />
              <circle cx="36" cy="20" r="5" fill="#5b8266" opacity="0.5" />
              <circle cx="54" cy="20" r="5" fill="#3a3633" />
              <text x="160" y="24" textAnchor="middle" fill="#6b6862" fontFamily="monospace" fontSize="10">
                log-analyzer.py
              </text>
              <line x1="0" y1="40" x2="320" y2="40" stroke="#2a2724" />
              <g fontFamily="monospace" fontSize="11">
                <text x="14" y="62" fill="#6b6862">$ tail -f /var/log/api.log</text>
                <text x="14" y="84" fill="#d97757">⚠ TypeError at line 142</text>
                <text x="14" y="106" fill="#a09b93">  → req.user.id (undefined)</text>
                <text x="14" y="128" fill="#5b8266">✓ trace captured</text>
                <text x="14" y="150" fill="#5b8266">✓ context loaded (3 files)</text>
                <text x="14" y="172" fill="#a09b93">→ proposing fix...</text>
                <rect x="14" y="186" width="290" height="120" rx="3" fill="#0f0d0b" stroke="#2a2724" />
                <text x="22" y="206" fill="#5b8266" fontSize="10">
                  + if (req.user?.id) {"{"}
                </text>
                <text x="22" y="222" fill="#a09b93" fontSize="10">    return user.id;</text>
                <text x="22" y="238" fill="#a09b93" fontSize="10">  {"}"}</text>
                <text x="22" y="258" fill="#d97757" fontSize="10">- return req.user.id;</text>
                <text x="22" y="282" fill="#6b6862" fontSize="9">{"// fix posted to Slack #alerts"}</text>
                <text x="14" y="332" fill="#5b8266">✓ slack.notify() ok</text>
                <text x="14" y="354" fill="#a09b93">$ _</text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="visual" ref={wrapRef} style={{ background: "#f0ede5" }}>
      <div ref={blobRef} style={{ position: "absolute", inset: 0 }}>
        <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%", display: "block" }}>
          <g transform="translate(40, 50)" className="float-card">
            <rect width="320" height="400" rx="14" fill="#fefcf7" stroke="#d8d3c7" />
            <circle cx="40" cy="44" r="18" fill="#5b8266" opacity="0.2" />
            <circle cx="40" cy="44" r="14" fill="#5b8266" />
            <text x="68" y="42" fill="#1a1a1a" fontFamily="serif" fontStyle="italic" fontSize="14">
              Live call · 12:04
            </text>
            <text x="68" y="58" fill="#6b6862" fontFamily="monospace" fontSize="9">LISTENING</text>
            <g transform="translate(20, 85)">
              {Array.from({ length: 40 }).map((_, i) => (
                <rect
                  key={i}
                  x={i * 7}
                  y={20 - Math.abs(Math.sin(i * 0.5)) * 18}
                  width="3"
                  height={Math.abs(Math.sin(i * 0.5)) * 36 + 4}
                  fill="#d97757"
                  opacity={0.4 + Math.abs(Math.sin(i * 0.5)) * 0.6}
                />
              ))}
            </g>
            <rect x="20" y="150" width="280" height="110" rx="8" fill="#f6f4ef" stroke="#d8d3c7" />
            <text x="32" y="172" fill="#6b6862" fontFamily="monospace" fontSize="9">SUGGESTED ANSWER</text>
            <text x="32" y="194" fill="#1a1a1a" fontFamily="serif" fontSize="13">
              &quot;I&apos;d start with a heartbeat
            </text>
            <text x="32" y="212" fill="#1a1a1a" fontFamily="serif" fontSize="13">
              agent — every minute, ping
            </text>
            <text x="32" y="230" fill="#1a1a1a" fontFamily="serif" fontSize="13">
              each service, log latency...&quot;
            </text>
            <text x="32" y="252" fill="#5b8266" fontFamily="monospace" fontSize="9">
              ↑ context: system design
            </text>
            <rect x="20" y="280" width="280" height="80" rx="8" fill="#fdfbf6" stroke="#d8d3c7" strokeDasharray="4 4" />
            <text x="160" y="316" textAnchor="middle" fill="#6b6862" fontFamily="monospace" fontSize="10">
              drop a UI screenshot →
            </text>
            <text x="160" y="334" textAnchor="middle" fill="#d97757" fontFamily="monospace" fontSize="10">
              get React code back
            </text>
            <rect x="20" y="376" width="80" height="22" rx="11" fill="#f6f4ef" stroke="#d8d3c7" />
            <text x="60" y="391" textAnchor="middle" fill="#1a1a1a" fontFamily="monospace" fontSize="9">
              15 questions
            </text>
            <rect x="108" y="376" width="80" height="22" rx="11" fill="#f6f4ef" stroke="#d8d3c7" />
            <text x="148" y="391" textAnchor="middle" fill="#1a1a1a" fontFamily="monospace" fontSize="9">
              live advice
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function ProjectRow({ project, idx }: { project: (typeof PROJECTS)[number]; idx: number }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!rowRef.current) return;
    gsap.from(rowRef.current.querySelectorAll(".reveal-fade"), {
      scrollTrigger: { trigger: rowRef.current, start: "top 75%" },
      y: 32,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
    });
  }, []);

  const reverse = idx % 2 === 1;

  return (
    <div className={`project ${reverse ? "reverse" : ""}`} ref={rowRef}>
      <div className="info">
        <h3 className="reveal-fade">{project.title}</h3>
        <div className="tagline reveal-fade">{project.tagline}</div>
        {project.body.map((p, i) => (
          <p key={i} className="reveal-fade">{p}</p>
        ))}
        <div className="stack reveal-fade">
          {project.stack.map((s) => (
            <span className="chip" key={s}>{s}</span>
          ))}
        </div>
        {project.repo ? (
          <a className="repo reveal-fade" href={project.repo} target="_blank" rel="noreferrer">
            ↗ {project.repoLabel}
          </a>
        ) : project.note ? (
          <div className="repo reveal-fade">{project.note}</div>
        ) : null}
      </div>
      <ProjectVisual idx={idx} />
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="num">Recent Work</div>
            <h2 style={{ marginTop: 16 }}>
              Things <span className="display-italic">I built</span>.
            </h2>
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.18em" }}>
            ONE AT WORK · TWO OPEN-SOURCE
          </div>
        </div>

        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.idx} project={p} idx={i} />
        ))}
      </div>
    </section>
  );
}
