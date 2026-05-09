"use client";

import { sendGAEvent } from "@next/third-parties/google";

export default function Nav() {
  const handleCvClick = () =>
    sendGAEvent("event", "cv_download", {
      location: "nav_mobile",
      file_name: "CV_Lakshya.pdf",
    });

  return (
    <nav className="nav">
      <div className="brand">Lakshya Khanna</div>
      <div className="links">
        <a href="#about">About</a>
        <a href="#projects">Work</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Stack</a>
        <a href="#contact">Contact</a>
      </div>
      <a
        className="nav-cv-mobile"
        href="/CV_Lakshya.pdf"
        download="Lakshya-Khanna-CV.pdf"
        onClick={handleCvClick}
        aria-label="Download résumé"
      >
        CV <span aria-hidden="true">↓</span>
      </a>
    </nav>
  );
}
