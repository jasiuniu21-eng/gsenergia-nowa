import { ImageResponse } from "next/og";
import { getDoc } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("uslugi", slug);
  const title = doc?.frontmatter.title ?? "Usługi energetyczne";

  return new ImageResponse(
    (
      <div
        style={{
          background: "oklch(0.975 0.005 220)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "8px", height: "8px", background: "oklch(0.50 0.16 140)" }} />
          <span style={{ fontSize: "14px", fontWeight: 600, color: "oklch(0.50 0.16 140)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            GS Energia · Usługi
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            marginTop: "auto",
            fontSize: title.length > 40 ? "52px" : "64px",
            fontWeight: 700,
            color: "oklch(0.15 0.02 210)",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "48px",
            fontSize: "18px",
            color: "oklch(0.50 0.08 200)",
            paddingTop: "28px",
            borderTop: "1px solid oklch(0.80 0.01 200)",
          }}
        >
          <span>Audyty energetyczne od 2008 r.</span>
          <span>Bezpłatna wycena w 48 h</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
