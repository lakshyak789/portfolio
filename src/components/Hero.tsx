"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroParams {
  intensity: number;
  speed: number;
}
interface Palette {
  paper: string;
  ink: string;
  accent: string;
  stone: string;
}

function HeroCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [params, setParams] = useState<HeroParams>({ intensity: 1.0, speed: 1.0 });
  const [palette, setPalette] = useState<Palette>({
    paper: "#f6f4ef",
    ink: "#1a1a1a",
    accent: "#d97757",
    stone: "#c9c4b8",
  });

  useEffect(() => {
    const onParams = (e: Event) =>
      setParams((p) => ({ ...p, ...((e as CustomEvent<Partial<HeroParams>>).detail || {}) }));
    const onPalette = (e: Event) =>
      setPalette((p) => ({ ...p, ...((e as CustomEvent<Partial<Palette>>).detail || {}) }));
    window.addEventListener("qe-hero", onParams);
    window.addEventListener("qe-palette", onPalette);
    return () => {
      window.removeEventListener("qe-hero", onParams);
      window.removeEventListener("qe-palette", onPalette);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    const tex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(26,26,26,0.85)");
      grad.addColorStop(0.4, "rgba(26,26,26,0.35)");
      grad.addColorStop(1, "rgba(26,26,26,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      const t = new THREE.CanvasTexture(c);
      t.minFilter = THREE.LinearFilter;
      return t;
    })();

    const W = 16, H = 12, D = 10;
    const COUNT = 260;

    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const flakes = Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * W,
      y: Math.random() * H - H * 0.3,
      z: (Math.random() - 0.5) * D,
      speed: 0.008 + Math.random() * 0.022,
      sway: 0.3 + Math.random() * 0.7,
      swaySpeed: 0.4 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
    }));

    for (let i = 0; i < COUNT; i++) sizes[i] = 0.06 + Math.random() * 0.12;

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      map: tex,
      size: 0.22,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const snow = new THREE.Points(geom, mat);
    scene.add(snow);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = wrap;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let visible = true;
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0 });
    io.observe(wrap);

    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    let rafId = 0;
    const start = performance.now();
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;
      cx += (mx - cx) * 0.04;
      cy += (my - cy) * 0.04;
      const wind = cx * 0.04;
      snow.rotation.z = -cx * 0.08;
      snow.rotation.x = cy * 0.05;
      const t = (performance.now() - start) * 0.001;
      for (let i = 0; i < COUNT; i++) {
        const f = flakes[i];
        f.y -= f.speed;
        f.x += Math.sin(t * f.swaySpeed + f.phase) * 0.004 * f.sway + wind * 0.3;
        if (f.y < -H * 0.6) { f.y = H * 0.6; f.x = (Math.random() - 0.5) * W; f.z = (Math.random() - 0.5) * D; }
        if (f.x > W * 0.6) f.x = -W * 0.6;
        else if (f.x < -W * 0.6) f.x = W * 0.6;
        positions[i * 3] = f.x;
        positions[i * 3 + 1] = f.y;
        positions[i * 3 + 2] = f.z;
      }
      geom.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      geom.dispose();
      mat.dispose();
      tex.dispose();
      renderer.dispose();
    };
  }, []);

  const dur = 28 / Math.max(0.1, params.speed);
  const opacity = Math.min(1, 0.4 + params.intensity * 0.35);

  return (
    <div
      ref={wrapRef}
      className="hero-mist"
      style={
        {
          "--paper": palette.paper,
          "--accent": palette.accent,
          "--stone": palette.stone,
          "--ink": palette.ink,
          "--mist-dur": `${dur}s`,
          "--mist-opacity": opacity,
        } as React.CSSProperties
      }
    >
      <canvas ref={canvasRef} className="hero-3d" />
    </div>
  );
}

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!headlineRef.current || !metaRef.current) return;
    const tl = gsap.timeline({ delay: 0.4 });
    const lines = headlineRef.current.querySelectorAll(".split-line > span");
    tl.fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.08 });
    tl.from(
      metaRef.current.querySelectorAll(".reveal-item"),
      { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  const handleScroll = () => {
    const target = document.getElementById("about");
    if (!target) return;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.8,
        easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="hero" id="hero">
      <HeroCanvas />

      <div className="hero-content">
        <h1 className="display" ref={headlineRef}>
          <span className="split-line" ><span>Quietly building</span></span>{" "}
          <span className="split-line" style={{display: "contents"}}><span className="display-italic">loud</span></span>{" "}
          <span className="split-line"><span>things</span></span>
          <br />
          <span className="split-line"><span>with code &amp; care.</span></span>
        </h1>

        <div className="meta-row" ref={metaRef}>
          <div className="meta-block reveal-item">
            <div className="meta-label">Currently</div>
            <div className="meta-value">
              Working as a freelancer — full-stack engineer at CS Technology, building monitoring &amp; AI tooling
              that keeps services breathing.
            </div>
          </div>
          <div className="meta-block reveal-item">
            <div className="meta-label">Based in</div>
            <div className="meta-value">Dehradun, India · 30°N 78°E</div>
          </div>
          <button
            type="button"
            className="reveal-item scroll-cue meta-block"
            onClick={handleScroll}
            aria-label="Scroll to About section"
          >
            <div className="meta-label">Continue</div>
            <div className="meta-value">
              <span>scroll</span>
              <span className="scroll-arrow">↓</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
