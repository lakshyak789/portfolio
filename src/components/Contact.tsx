"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sendGAEvent } from "@next/third-parties/google";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;

    gsap.fromTo(
      ref.current.querySelectorAll(".split-line > span"),
      { yPercent: 110 },
      {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        yPercent: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.08,
      }
    );

    gsap.from(ref.current.querySelectorAll(".reveal-c"), {
      scrollTrigger: { trigger: ref.current, start: "top 70%" },
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
    });
  }, []);

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="canvas-wrap">
        <div className="contact-haze" />
      </div>
      <div className="container">
        <div className="eyebrow reveal-c" style={{ marginBottom: 32 }}>
          05 — Let&apos;s talk
        </div>
        <h2 className="display">
          <span className="split-line"><span>Got a system that</span></span>
          <br />
          <span className="split-line" style={{ display: "contents" }}><span className="display-italic"  >needs listening to?</span></span>
        </h2>
        <p className="lead reveal-c">
          I&apos;m open to contract work, full-time roles, and small open-source collaborations — especially
          anything sitting between AI, audio, and infrastructure.
        </p>

        <div className="links-grid">
          <div className="link-block reveal-c">
            <div className="label">Email</div>
            <a href="mailto:Lakshyak789@gmail.com">Lakshyak789@gmail.com</a>
          </div>
          <div className="link-block reveal-c">
            <div className="label">GitHub</div>
            <a href="https://github.com/lakshyak789" target="_blank" rel="noreferrer">
              @lakshyak789
            </a>
          </div>
          <div className="link-block reveal-c">
            <div className="label">LinkedIn</div>
            <a href="https://www.linkedin.com/in/lakshya-khanna-8b861754/" target="_blank" rel="noreferrer">
              @Lakshya Khanna
            </a>
          </div>
          <div className="link-block reveal-c">
            <div className="label">Where</div>
            <span className="val">Dehradun, IN</span>
          </div>
          <div className="link-block reveal-c">
            <div className="label">Résumé</div>
            <a
              href="/CV_Lakshya.pdf"
              download="Lakshya-Khanna-CV.pdf"
              onClick={() =>
                sendGAEvent("event", "cv_download", {
                  location: "contact_section",
                  file_name: "CV_Lakshya.pdf",
                })
              }
            >
              Download CV ↓
            </a>
          </div>
        </div>

        <footer className="footer-bottom">
          <div>© 2026 — Lakshya Khanna</div>
          <div>Built with GSAP · Lenis · three.js · Next.js</div>
        </footer>
      </div>
    </section>
  );
}
