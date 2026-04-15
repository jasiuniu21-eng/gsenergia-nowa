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
  const doc = getDoc("posts", slug);
  const title = doc?.frontmatter.title ?? "Blog energetyczny";
  const dateStr = doc?.frontmatter.date
    ? new Date(doc.frontmatter.date).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          background: "oklch(0.14 0.025 40)",
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
          <span style={{ fontSize: "14px", fontWeight: 600, color: "oklch(0.72 0.15 130)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            GS Energia · Blog
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            marginTop: "auto",
            fontSize: title.length > 60 ? "44px" : "56px",
            fontWeight: 700,
            color: "oklch(0.97 0.005 220)",
            lineHeight: 1.2,
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
            fontSize: "16px",
            color: "oklch(0.65 0.04 200)",
            paddingTop: "28px",
            borderTop: "1px solid oklch(0.25 0.02 200)",
          }}
        >
          {dateStr && <span>{dateStr}</span>}
          <span>gsenergia.pl</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
