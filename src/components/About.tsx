"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function AboutCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

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
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 5);

    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const wireframe = new THREE.WireframeGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x1a1a1a, transparent: true, opacity: 0.55 });
    const lines = new THREE.LineSegments(wireframe, lineMat);
    scene.add(lines);

    const innerGeo = new THREE.OctahedronGeometry(0.6, 0);
    const innerWire = new THREE.WireframeGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({ color: 0xd97757, transparent: true, opacity: 0.85 });
    const inner = new THREE.LineSegments(innerWire, innerMat);
    scene.add(inner);

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
    const io = new IntersectionObserver(
      (entries) => { visible = entries[0].isIntersecting; },
      { threshold: 0 }
    );
    io.observe(wrap);

    let rafId = 0;
    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
      my = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
    };
    wrap.addEventListener("pointermove", onMove);

    const start = performance.now();
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;
      const t = (performance.now() - start) * 0.001;
      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;
      lines.rotation.y = t * 0.15 + tx;
      lines.rotation.x = t * 0.08 + ty;
      inner.rotation.y = -t * 0.25 - tx * 0.5;
      inner.rotation.z = t * 0.12;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      geo.dispose();
      wireframe.dispose();
      innerGeo.dispose();
      innerWire.dispose();
      lineMat.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="about-mark" ref={wrapRef}>
      <svg
        className="about-mark-svg"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="aboutGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(26,26,26,0.06)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="500" fill="var(--paper-2)" />
        <rect width="400" height="500" fill="url(#aboutGrid)" />
        <g stroke="rgba(26,26,26,0.55)" strokeWidth="1" fill="none">
          <path d="M 20 20 L 20 36 M 20 20 L 36 20" />
          <path d="M 380 20 L 380 36 M 380 20 L 364 20" />
          <path d="M 20 480 L 20 464 M 20 480 L 36 480" />
          <path d="M 380 480 L 380 464 M 380 480 L 364 480" />
        </g>
        <g fontFamily="var(--mono)" fontSize={9} fill="rgba(26,26,26,0.55)" letterSpacing="1.5">
          <text x="20" y="14" textAnchor="start">N 30°19&#39;</text>
          <text x="380" y="14" textAnchor="end">E 78°02&#39;</text>
          <text x="20" y="494" textAnchor="start">S 59°41&#39;</text>
          <text x="380" y="494" textAnchor="end">W 101°58&#39;</text>
        </g>
      </svg>
      <canvas ref={canvasRef} className="about-3d" />
    </div>
  );
}

export default function About() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!headRef.current || !bodyRef.current) return;

    gsap.fromTo(
      headRef.current.querySelectorAll(".split-line > span"),
      { yPercent: 110 },
      {
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
      }
    );

    gsap.from(bodyRef.current.querySelectorAll(".reveal-p"), {
      scrollTrigger: { trigger: bodyRef.current, start: "top 80%" },
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.1,
    });

    bodyRef.current.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
      const target = parseFloat(el.dataset.value || "0");
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = Math.round(obj.v) + (el.dataset.unit || "");
        },
      });
    });
  }, []);

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="grid">
          <div className="left">
            <div className="canvas-wrap">
              <AboutCanvas />
            </div>
          </div>
          <div className="right">
            <div className="eyebrow" style={{ marginBottom: 18 }}>About — 01</div>
            <h2 className="display" ref={headRef}>
              <span className="split-line"><span>I write software</span></span>{" "}
              <span className="split-line"><span className="display-italic">that listens</span></span>{" "}
              <span className="split-line"><span>before it speaks.</span></span>
            </h2>

            <div ref={bodyRef} style={{ marginTop: 56 }}>
              <p className="lede reveal-p">
                Most of what I build watches something quietly — services breathing, audio streaming, logs
                scrolling — and steps in only when it matters.
              </p>
              <p className="body reveal-p">
                I&rsquo;m Lakshya. I&rsquo;ve spent the last seven years moving between front-end and back-end
                work, chasing a particular kind of problem: systems that need a careful pair of hands to keep
                them upright. Heartbeat agents pinging plant infrastructure. Whisper pipelines transcribing
                audio in chunks. Log analyzers that read their own stack traces.
              </p>
              <p className="body reveal-p">
                I&rsquo;m happiest when the work is quiet, durable, and slightly unglamorous — when a tool you
                wrote three months ago is still running, and nobody had to think about it.
              </p>

              <div className="stats">
                <div>
                  <div className="stat-num" data-value="7" data-unit="+">0</div>
                  <div className="stat-label">Years writing software</div>
                </div>
                <div>
                  <div className="stat-num" data-value="400" data-unit="h">0</div>
                  <div className="stat-label">Whisper fine-tune audio</div>
                </div>
                <div>
                  <div className="stat-num" data-value="2" data-unit="">0</div>
                  <div className="stat-label">Open-source tools shipped</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
