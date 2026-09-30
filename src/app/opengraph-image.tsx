import { ImageResponse } from "next/og";

export const alt = "Janardan Hazarika — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0b0d10";
const FG = "#eaecef";
const MUTED = "#8b9199";
const SIGNAL = "#f0a742";
const RULE = "#252a30";

/**
 * Replaces the /og-image.jpg that was referenced in metadata but never existed,
 * so every share preview 404'd. Rendered in the site's own design language.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{ width: 10, height: 10, borderRadius: 5, background: SIGNAL }}
          />
          <div
            style={{
              color: MUTED,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            janardan.xyz
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: FG,
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>I build systems and keep</span>
            <span>
              fixing them until they{" "}
              <span style={{ color: SIGNAL }}>hold at scale.</span>
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            borderTop: `1px solid ${RULE}`,
            paddingTop: 28,
          }}
        >
          <div style={{ color: FG, fontSize: 26 }}>Janardan Hazarika</div>
          <div style={{ color: RULE, fontSize: 26 }}>/</div>
          <div style={{ color: MUTED, fontSize: 26 }}>Software Engineer</div>
          <div style={{ color: RULE, fontSize: 26 }}>/</div>
          <div style={{ color: MUTED, fontSize: 26 }}>Bengaluru IN</div>
        </div>
      </div>
    ),
    size
  );
}
