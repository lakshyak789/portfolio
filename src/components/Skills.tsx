"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SKILL_GROUPS = [
  {
    h: "Front-of-house",
    items: ["React", "TypeScript", "Redux", "Next.js", "Gatsby", "Apollo GraphQL", "Material UI", "Jest"],
  },
  {
    h: "Back-of-house",
    items: ["Python", "FastAPI", "Django", "Node", "Go", "PostgreSQL", "REST", "GraphQL"],
  },
  {
    h: "AI & audio",
    items: ["Whisper", "Whisper.cpp", "FFmpeg", "Kaggle (fine-tune)", "Prompt orchestration"],
  },
  {
    h: "Glue & ops",
    items: ["AWS", "Docker", "Linux", "Jenkins", "WebRTC", "Autobahn pub/sub", "Slack/Email automation", "Confluence/Jira scripts"],
  },
];

function SkillsCanvas() {
  return (
    <svg viewBox="-3 -3 6 6" className="skills-svg" preserveAspectRatio="xMidYMid meet">
      <circle cx="0" cy="0" r="1.0" fill="none" stroke="var(--stone)" strokeWidth="0.008" />
      <circle cx="0" cy="0" r="1.6" fill="none" stroke="var(--accent)" strokeWidth="0.01" />
      <circle cx="0" cy="0" r="2.2" fill="none" stroke="var(--stone)" strokeWidth="0.008" />

      <g className="orbit-fast">
        <circle cx="1.0" cy="0" r="0.07" fill="var(--ink)" />
        <circle cx="-0.5" cy="0.866" r="0.06" fill="var(--accent)" />
        <circle cx="-0.5" cy="-0.866" r="0.06" fill="var(--ink)" />
      </g>
      <g className="orbit-mid">
        <circle cx="1.6" cy="0" r="0.08" fill="var(--accent)" />
        <circle cx="-0.8" cy="1.385" r="0.07" fill="var(--ink)" />
        <circle cx="-0.8" cy="-1.385" r="0.07" fill="var(--ink)" />
      </g>
      <g className="orbit-slow">
        <circle cx="2.2" cy="0" r="0.07" fill="var(--ink)" />
        <circle cx="-2.2" cy="0" r="0.07" fill="var(--accent)" />
      </g>

      <circle cx="0" cy="0" r="0.2" fill="var(--ink)" />
      <circle cx="0" cy="0" r="0.24" fill="none" stroke="var(--accent)" strokeWidth="0.012" />
    </svg>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".skill-group"), {
      scrollTrigger: { trigger: ref.current, start: "top 70%" },
      y: 32,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    });
  }, []);

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div>
            <div className="num">04 — Tools at hand</div>
            <h2 style={{ marginTop: 16 }}>
              The kit, <span className="display-italic">honestly</span>.
            </h2>
          </div>
        </div>
        <div className="grid">
          <div className="canvas-wrap">
            <SkillsCanvas />
          </div>
          <div className="cats">
            {SKILL_GROUPS.map((g) => (
              <div className="skill-group" key={g.h}>
                <h5>{g.h}</h5>
                <div className="items">
                  {g.items.map((it) => (
                    <span key={it}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
