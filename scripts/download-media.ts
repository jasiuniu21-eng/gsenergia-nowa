import fs from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";
import pLimit from "p-limit";

const XML_PATH = path.resolve(
  __dirname,
  "../../pliki_z_wordpress/gsenergia.WordPress.2026-04-14.xml",
);
const OUT = path.resolve(__dirname, "../public/media");
const PREFIX = "https://gsenergia.pl/wp-content/uploads/";

function collectUrls(xml: string): Set<string> {
  const urls = new Set<string>();
  const parser = new XMLParser({
    ignoreAttributes: false,
    cdataPropName: "__cdata",
    isArray: (n) => n === "item",
  });
  const doc = parser.parse(xml);
  const items = doc.rss.channel.item ?? [];
  for (const it of items) {
    const u = it["wp:attachment_url"]?.__cdata ?? it["wp:attachment_url"];
    if (typeof u === "string" && u.startsWith(PREFIX)) urls.add(u);
    const content =
      it["content:encoded"]?.__cdata ?? it["content:encoded"] ?? "";
    const re = /https?:\/\/gsenergia\.pl\/wp-content\/uploads\/[^\s"')<>]+/g;
    for (const m of String(content).matchAll(re)) urls.add(m[0]);
  }
  return urls;
}

async function download(url: string): Promise<"ok" | "skip" | "fail"> {
  const rel = url.slice(PREFIX.length).split("?")[0];
  const dest = path.join(OUT, rel);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return "skip";
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`FAIL ${res.status} ${url}`);
      return "fail";
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    return "ok";
  } catch (e) {
    console.warn(`ERR ${url}`, (e as Error).message);
    return "fail";
  }
}

async function main() {
  const xml = fs.readFileSync(XML_PATH, "utf8");
  const urls = [...collectUrls(xml)];
  console.log(`Found ${urls.length} media URLs`);
  const limit = pLimit(8);
  let ok = 0,
    skip = 0,
    fail = 0,
    done = 0;
  await Promise.all(
    urls.map((u) =>
      limit(async () => {
        const r = await download(u);
        if (r === "ok") ok++;
        else if (r === "skip") skip++;
        else fail++;
        done++;
        if (done % 50 === 0)
          console.log(`${done}/${urls.length} (ok=${ok} skip=${skip} fail=${fail})`);
      }),
    ),
  );
  console.log(`Done. ok=${ok} skip=${skip} fail=${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
