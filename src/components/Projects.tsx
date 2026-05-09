"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
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
        <div className="idx reveal-fade">{project.idx}</div>
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
        <a className="repo reveal-fade" href={project.repo} target="_blank" rel="noreferrer">
          ↗ {project.repoLabel}
        </a>
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
            <div className="num">02 — Open Source</div>
            <h2 style={{ marginTop: 16 }}>
              Open-source projects <span className="display-italic">I built</span>.
            </h2>
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.18em" }}>
            BOTH OPEN-SOURCE
          </div>
        </div>

        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.idx} project={p} idx={i} />
        ))}
      </div>
    </section>
  );
}
