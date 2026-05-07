"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ROLES = [
  {
    when: "2026 — Present",
    company: "CS Technology LLC",
    role: "Contract Full-Stack Developer",
    summary:
      "Built a Plant Health Management System: a full-stack monitoring platform with admin controls, a Python heartbeat agent, and incident workflows.",
    bullets: [
      "React · FastAPI · PostgreSQL · Python",
      "Heartbeat agent pings services every 60s",
      "Real-time green/red status dashboard",
      "Email-subscription system per service",
    ],
  },
  {
    when: "2024 — 2025",
    company: "Isha Foundation",
    role: "Volunteer · Whisper Pipelines",
    summary:
      "Improved an internal Whisper transcription service — added Tamil support via Whisper.cpp, queueing under GPU pressure, and a custom Confluence diff tool.",
    bullets: [
      "Whisper.cpp + FastAPI · FFmpeg chunking (15s)",
      "Fine-tuned Whisper on 400h on Kaggle",
      "Confluence Page-Diff tool (FastAPI + React)",
      "Tampermonkey integration for in-page launch",
    ],
  },
  {
    when: "2023 — 2024",
    company: "Isha Foundation",
    role: "Sadhanapada Volunteer · Web team",
    summary:
      "Worked with the org's web team building React-based pages, then shifted to reporting using Google Apps Script and Looker Studio.",
    bullets: ["React · Apps Script · Looker Studio", "Internal reporting dashboards"],
  },
  {
    when: "2021 — 2022",
    company: "Ibexlabs",
    role: "Software Engineer",
    summary:
      "Front-end UI in TypeScript/React/Redux with Jest. Back-end APIs in Go and Python. Wrote a ConnectWise CRM integration end-to-end.",
    bullets: ["TypeScript · React · Redux · Jest", "Go · Python · PostgreSQL", "ConnectWise CRM integration"],
  },
  {
    when: "2019 — 2021",
    company: "SupportGenie",
    role: "React.js Developer",
    summary:
      "Carried the front end of a ticketing portal solo. Migrated the marketing site from AngularJS to Gatsby, swapped REST for Apollo GraphQL, shipped a WebRTC video-chat.",
    bullets: [
      "Autobahn pub/sub · Apollo GraphQL · Gatsby",
      "WebRTC video-chat application",
      "Jenkins CI · Docker containerization",
      "Material-UI · Python APIs",
    ],
  },
  {
    when: "2018 — 2019",
    company: "Actionable Science",
    role: "JavaScript Developer Intern",
    summary:
      "First professional role. Built React UI for a YAML-driven chatbot platform — the kind of system that taught me to read other people's configs carefully.",
    bullets: ["React · YAML flow authoring"],
  },
  {
    when: "2016",
    company: "Axel Web Technology",
    role: "Backend PHP Developer",
    summary:
      "Worked on an electronic-health-record back end in CakePHP. The first time I saw what 'legacy' really meant.",
    bullets: ["CakePHP · MySQL · EHR domain"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const stage = section.querySelector<HTMLElement>(".timeline-stage");
    if (!stage) return;

    const totalWidth = track.scrollWidth;
    const distance = totalWidth - window.innerWidth;

    const st = gsap.to(track, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: () => `+=${distance}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
      gsap.from(card, {
        y: 40,
        opacity: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          containerAnimation: st,
          start: "left 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div>
            <div className="num">03 — A working life</div>
            <h2 style={{ marginTop: 16 }}>
              Seven years, <span className="display-italic">one through-line.</span>
            </h2>
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.18em" }}>
            SCROLL HORIZONTALLY →
          </div>
        </div>
      </div>

      <div className="timeline-stage">
        <div className="timeline-rail" />
        <div className="timeline-track" ref={trackRef}>
          {ROLES.map((r, i) => (
            <div className="timeline-card" key={i}>
              <div className="corner" />
              <div className="role-mono">{r.when}</div>
              <h4>{r.company}</h4>
              <div className="role">{r.role}</div>
              <div className="summary">{r.summary}</div>
              <ul className="bullets">
                {r.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
