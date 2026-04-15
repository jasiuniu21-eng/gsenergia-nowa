import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5f0e8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "#2d7a4f",
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1a2e24",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            GS Energia
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: "auto",
            fontSize: "64px",
            fontWeight: 700,
            color: "#1e1a14",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          Audyty energetyczne dla przemysłu
        </div>

        {/* Stats row */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "48px",
            fontSize: "20px",
            color: "#3d6b50",
            paddingTop: "32px",
            borderTop: "1px solid #c8d4cc",
          }}
        >
          <span>Od 2008 r.</span>
          <span>400+ audytów</span>
          <span>Kraków · Polska</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
