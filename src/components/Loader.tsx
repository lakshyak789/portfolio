"use client";

import { useEffect, useRef } from "react";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry, MultiLineString } from "geojson";
import worldAtlas from "world-atlas/countries-110m.json";

export default function Loader() {
  const graticuleRef = useRef<SVGPathElement>(null);
  const countriesRef = useRef<SVGPathElement>(null);
  const bordersRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const radius = 60;
    const projection = geoOrthographic()
      .scale(radius)
      .translate([0, 0])
      .clipAngle(90)
      .rotate([0, -15, 0]);

    const pathGen = geoPath(projection);
    const graticule = geoGraticule10();

    const topo = worldAtlas as unknown as Topology<{ countries: GeometryCollection }>;
    const land = feature(topo, topo.objects.countries) as
      | Feature<Geometry>
      | FeatureCollection<Geometry>;
    const borders = mesh(topo, topo.objects.countries, () => true) as MultiLineString;

    let lambda0 = 0;
    let last = performance.now();
    const degPerSec = 36; // 1 full rotation per 10s
    let raf = 0;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      lambda0 = (lambda0 + degPerSec * dt) % 360;
      projection.rotate([lambda0, -15, 0]);

      if (graticuleRef.current) graticuleRef.current.setAttribute("d", pathGen(graticule) || "");
      if (countriesRef.current) countriesRef.current.setAttribute("d", pathGen(land) || "");
      if (bordersRef.current) bordersRef.current.setAttribute("d", pathGen(borders) || "");

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="loader">
      <div className="stage" role="status" aria-label="Loading">
        {/* Whirl: arcs and ticks orbiting around the globe */}
        <svg className="whirl" viewBox="0 0 200 200" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="#1a1a1a"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
          <g className="ticks">
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="3"
              strokeDasharray="1 11"
              strokeOpacity="0.55"
              pathLength={360}
            />
          </g>
          <g className="sweepA">
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeDasharray="60 480"
              strokeLinecap="round"
              pathLength={540}
              strokeOpacity="0.85"
            />
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeDasharray="22 518"
              strokeDashoffset={-110}
              strokeLinecap="round"
              pathLength={540}
              strokeOpacity="0.55"
            />
          </g>
          <g className="sweepB">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1"
              strokeDasharray="34 466"
              strokeDashoffset={-50}
              strokeLinecap="round"
              pathLength={500}
              strokeOpacity="0.7"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1"
              strokeDasharray="8 492"
              strokeDashoffset={-260}
              strokeLinecap="round"
              pathLength={500}
              strokeOpacity="0.45"
            />
          </g>
        </svg>

        {/* Globe with real country outlines */}
        <svg className="globe" viewBox="-65 -65 130 130" aria-hidden="true">
          <defs>
            <clipPath id="globeClip">
              <circle cx="0" cy="0" r="60" />
            </clipPath>
          </defs>
          <g clipPath="url(#globeClip)">
            <circle cx="0" cy="0" r="60" fill="#1a1a1a" fillOpacity="0.04" />
            <path
              ref={graticuleRef}
              fill="none"
              stroke="#1a1a1a"
              strokeOpacity="0.22"
              strokeWidth="0.4"
            />
            <path
              ref={countriesRef}
              fill="#1a1a1a"
              fillOpacity="0.10"
              stroke="#1a1a1a"
              strokeOpacity="0.95"
              strokeWidth="0.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              ref={bordersRef}
              fill="none"
              stroke="#1a1a1a"
              strokeOpacity="0.9"
              strokeWidth="0.45"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
          <circle
            cx="0"
            cy="0"
            r="60"
            fill="none"
            stroke="#1a1a1a"
            strokeOpacity="0.9"
            strokeWidth="0.8"
          />
        </svg>
      </div>
      <div className="name">Lakshya Khanna</div>
      <div className="bar" />
    </div>
  );
}
