import { NextRequest, NextResponse } from "next/server";
import { getAll } from "@/lib/content";

export const dynamic = "force-dynamic";

export type SearchResult = {
  slug: string;
  type: "blog" | "uslugi";
  title: string;
  excerpt: string;
  href: string;
};

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
  if (q.length < 2) return NextResponse.json([]);

  const posts = getAll("posts").map((d) => ({
    slug: d.slug,
    type: "blog" as const,
    title: d.frontmatter.title ?? d.slug,
    excerpt: (d.frontmatter.excerpt ?? d.content.replace(/[#*_`>\-\[\]]/g, "").trim().slice(0, 100)) + "…",
    href: `/blog/${d.slug}`,
  }));

  const services = getAll("uslugi").map((d) => ({
    slug: d.slug,
    type: "uslugi" as const,
    title: d.frontmatter.title ?? d.slug,
    excerpt: (d.frontmatter.excerpt ?? d.content.replace(/[#*_`>\-\[\]]/g, "").trim().slice(0, 100)) + "…",
    href: `/uslugi/${d.slug}`,
  }));

  const all = [...services, ...posts];

  const results = all
    .filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q)
    )
    .slice(0, 8);

  return NextResponse.json(results);
}
