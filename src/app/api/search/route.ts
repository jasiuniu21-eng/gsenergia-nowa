import { NextRequest, NextResponse } from "next/server";
import { getAll } from "@/lib/content";

export const dynamic = "force-dynamic";

export type SearchResultType = "blog" | "uslugi" | "realizacje";

export type SearchResult = {
  slug: string;
  type: SearchResultType;
  title: string;
  excerpt: string;
  href: string;
};

const LIMIT_PER_TYPE = 5;

function buildExcerpt(d: { frontmatter: Record<string, unknown>; content: string }): string {
  const fmExcerpt = d.frontmatter.excerpt;
  if (typeof fmExcerpt === "string" && fmExcerpt.trim().length > 0) {
    return fmExcerpt.length > 120 ? fmExcerpt.slice(0, 120).trim() + "…" : fmExcerpt;
  }
  const stripped = d.content.replace(/[#*_`>\-\[\]()]/g, "").trim();
  return stripped.slice(0, 120) + (stripped.length > 120 ? "…" : "");
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
  if (q.length < 2) return NextResponse.json([]);

  const services = getAll("uslugi").map((d) => ({
    slug: d.slug,
    type: "uslugi" as const,
    title: (d.frontmatter.title as string | undefined) ?? d.slug,
    excerpt: buildExcerpt(d),
    href: `/uslugi/${d.slug}`,
  }));

  const realizacje = getAll("realizacje").map((d) => ({
    slug: d.slug,
    type: "realizacje" as const,
    title: (d.frontmatter.title as string | undefined) ?? d.slug,
    excerpt: buildExcerpt(d),
    href: `/realizacje/${d.slug}`,
  }));

  const posts = getAll("posts").map((d) => ({
    slug: d.slug,
    type: "blog" as const,
    title: (d.frontmatter.title as string | undefined) ?? d.slug,
    excerpt: buildExcerpt(d),
    href: `/blog/${d.slug}`,
  }));

  const matches = (r: { title: string; excerpt: string }) =>
    r.title.toLowerCase().includes(q) || r.excerpt.toLowerCase().includes(q);

  const results: SearchResult[] = [
    ...services.filter(matches).slice(0, LIMIT_PER_TYPE),
    ...realizacje.filter(matches).slice(0, LIMIT_PER_TYPE),
    ...posts.filter(matches).slice(0, LIMIT_PER_TYPE),
  ];

  return NextResponse.json(results);
}
