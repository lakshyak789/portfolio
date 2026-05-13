import { ImageResponse } from "next/og";

export const alt = "Lakshya Khanna — The Quiet Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background:
            "linear-gradient(180deg, #f6f4ef 0%, #efece2 100%)",
          color: "#1a1a1a",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Top row: brand mark + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#666666",
            fontFamily:
              "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
          }}
        >
          <div style={{ display: "flex" }}>The Quiet Engineer</div>
          <div style={{ display: "flex" }}>lakshya.space</div>
        </div>

        {/* Center: name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontWeight: 300,
            }}
          >
            Lakshya Khanna
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              lineHeight: 1.15,
              fontStyle: "italic",
              color: "#444444",
              maxWidth: 900,
            }}
          >
            Quietly building loud things with code & care.
          </div>
        </div>

        {/* Bottom row: stack chips */}
        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 20,
            color: "#444444",
            letterSpacing: "0.02em",
            alignItems: "center",
            fontFamily:
              "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
          }}
        >
          <div style={{ display: "flex" }}>React</div>
          <div style={{ display: "flex", color: "#d97757" }}>·</div>
          <div style={{ display: "flex" }}>FastAPI</div>
          <div style={{ display: "flex", color: "#d97757" }}>·</div>
          <div style={{ display: "flex" }}>Python</div>
          <div style={{ display: "flex", color: "#d97757" }}>·</div>
          <div style={{ display: "flex" }}>Whisper AI</div>
          <div style={{ display: "flex", color: "#d97757" }}>·</div>
          <div style={{ display: "flex" }}>AWS</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
