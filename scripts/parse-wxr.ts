import fs from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";
import TurndownService from "turndown";

const XML_PATH = path.resolve(
  __dirname,
  "../../pliki_z_wordpress/gsenergia.WordPress.2026-04-14.xml",
);
const ROOT = path.resolve(__dirname, "..");
const CONTENT = path.join(ROOT, "content");
const DATA = path.join(ROOT, "data");

const TYPE_DIR: Record<string, string> = {
  page: "pages",
  post: "posts",
  uslugi: "uslugi",
  realizacje: "realizacje",
  uslugi_pozostale: "uslugi_pozostale",
};

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function slugify(s: string) {
  return (
    s
      ?.toString()
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled"
  );
}

function yamlEscape(v: unknown): string {
  if (v === null || v === undefined) return '""';
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v))
    return "[" + v.map((x) => yamlEscape(String(x))).join(", ") + "]";
  const s = String(v);
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ")}"`;
}

function toFrontmatter(obj: Record<string, unknown>) {
  const lines = ["---"];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    lines.push(`${k}: ${yamlEscape(v)}`);
  }
  lines.push("---", "");
  return lines.join("\n");
}

function rewriteMediaUrls(html: string) {
  return html.replace(
    /https?:\/\/gsenergia\.pl\/wp-content\/uploads\//g,
    "/media/",
  );
}

function stripInlineStyles(html: string) {
  // Remove style="..." and style='...' and class="..." attributes to avoid
  // React warnings when raw HTML is passed through MDX.
  return html
    .replace(/\sstyle\s*=\s*"[^"]*"/gi, "")
    .replace(/\sstyle\s*=\s*'[^']*'/gi, "")
    .replace(/\sclass\s*=\s*"[^"]*"/gi, "")
    .replace(/\sclass\s*=\s*'[^']*'/gi, "");
}

async function main() {
  console.log("Reading XML…");
  const xml = fs.readFileSync(XML_PATH, "utf8");
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    cdataPropName: "__cdata",
    textNodeName: "#text",
    isArray: (name) => ["item", "category", "wp:postmeta"].includes(name),
  });
  const doc = parser.parse(xml);
  const items = doc.rss.channel.item ?? [];
  console.log(`Items: ${items.length}`);

  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });
  td.keep(["iframe", "figure", "figcaption"]);

  const counts: Record<string, number> = {};
  const navMenu: any[] = [];
  const categories = new Map<string, { slug: string; name: string }>();
  const tags = new Map<string, { slug: string; name: string }>();

  const cd = (v: any): string =>
    v == null ? "" : typeof v === "string" ? v : (v.__cdata ?? v["#text"] ?? "");

  for (const it of items) {
    const type = cd(it["wp:post_type"]);
    const status = cd(it["wp:status"]);

    if (type === "nav_menu_item") {
      const meta: Record<string, string> = {};
      for (const m of it["wp:postmeta"] ?? []) {
        const key = cd(m["wp:meta_key"]);
        const val = cd(m["wp:meta_value"]);
        if (key) meta[key] = val;
      }
      navMenu.push({
        id: cd(it["wp:post_id"]),
        order: Number(cd(it["wp:menu_order"]) || 0),
        title: cd(it.title),
        parent: meta._menu_item_menu_item_parent,
        object: meta._menu_item_object,
        objectId: meta._menu_item_object_id,
        url: meta._menu_item_url,
        type: meta._menu_item_type,
      });
      continue;
    }

    if (status !== "publish") continue;
    const dir = TYPE_DIR[type];
    if (!dir) continue;

    const title = cd(it.title);
    const slug = cd(it["wp:post_name"]) || slugify(title);
    const date = cd(it["wp:post_date"]);
    const rawHtml = cd(it["content:encoded"]);
    const excerpt = cd(it["excerpt:encoded"]);

    const cats: string[] = [];
    const tgs: string[] = [];
    const catArr = Array.isArray(it.category) ? it.category : it.category ? [it.category] : [];
    for (const c of catArr) {
      const domain = c["@_domain"];
      const nicename = c["@_nicename"];
      const name = cd(c);
      if (domain === "category" && nicename) {
        cats.push(nicename);
        if (!categories.has(nicename))
          categories.set(nicename, { slug: nicename, name });
      } else if (domain === "post_tag" && nicename) {
        tgs.push(nicename);
        if (!tags.has(nicename)) tags.set(nicename, { slug: nicename, name });
      }
    }

    const acf: Record<string, string> = {};
    let hasShortcodes = /\[[a-z][a-z0-9_-]*/i.test(rawHtml);
    for (const m of it["wp:postmeta"] ?? []) {
      const key = cd(m["wp:meta_key"]);
      const val = cd(m["wp:meta_value"]);
      if (!key || key.startsWith("_")) continue;
      if (val && val.length < 500) acf[key] = val;
    }

    const html = stripInlineStyles(rewriteMediaUrls(rawHtml));
    let md: string;
    try {
      md = td.turndown(html);
    } catch {
      md = html;
    }

    const frontmatter: Record<string, unknown> = {
      title,
      slug,
      date,
      type,
      excerpt: excerpt ? excerpt.slice(0, 500) : undefined,
      categories: cats.length ? cats : undefined,
      tags: tgs.length ? tgs : undefined,
      hasShortcodes: hasShortcodes || undefined,
      ...acf,
    };

    const outDir = path.join(CONTENT, dir);
    ensureDir(outDir);
    const outFile = path.join(outDir, `${slug}.mdx`);
    fs.writeFileSync(outFile, toFrontmatter(frontmatter) + md + "\n", "utf8");
    counts[dir] = (counts[dir] ?? 0) + 1;
  }

  ensureDir(DATA);
  navMenu.sort((a, b) => a.order - b.order);
  fs.writeFileSync(
    path.join(DATA, "navigation.json"),
    JSON.stringify(navMenu, null, 2),
  );
  fs.writeFileSync(
    path.join(DATA, "categories.json"),
    JSON.stringify([...categories.values()], null, 2),
  );
  fs.writeFileSync(
    path.join(DATA, "tags.json"),
    JSON.stringify([...tags.values()], null, 2),
  );

  console.log("Counts:", counts);
  console.log(
    `Nav: ${navMenu.length}, Categories: ${categories.size}, Tags: ${tags.size}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
