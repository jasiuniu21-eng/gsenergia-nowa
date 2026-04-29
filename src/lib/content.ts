import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const CONTENT_DIR = path.join(process.cwd(), "content");

export type Doc = {
  slug: string;
  type: string;
  frontmatter: Record<string, any>;
  content: string;
  filePath: string;
};

export function listSlugs(type: string): string[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getDoc(type: string, slug: string): Doc | null {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, type, frontmatter: data, content, filePath };
}

export function getAll(type: string): Doc[] {
  return listSlugs(type)
    .map((s) => getDoc(type, s)!)
    .filter((d) => d && d.content.trim().length > 0)
    .sort((a, b) => {
      const da = a.frontmatter.date ?? "";
      const db = b.frontmatter.date ?? "";
      return db.localeCompare(da);
    });
}

export type LatestPost = {
  slug: string;
  title: string;
  date: string | null;
  excerpt: string;
};

export function getLatestPosts(n: number = 3): LatestPost[] {
  return getAll("posts")
    .slice(0, n)
    .map((post) => {
      const excerpt =
        (post.frontmatter.excerpt as string | undefined) ??
        post.content.replace(/[#*_`>\-\[\]()]/g, "").trim().slice(0, 160) + "…";
      return {
        slug: post.slug,
        title: (post.frontmatter.title as string) ?? post.slug,
        date: (post.frontmatter.date as string | undefined) ?? null,
        excerpt,
      };
    });
}
