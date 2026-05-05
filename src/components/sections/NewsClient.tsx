"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { LatestPost } from "@/lib/content";

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(date: string | null): string | null {
  if (!date) return null;
  const d = new Date(date.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return null;
  return dateFormatter.format(d);
}

export function NewsClient({ posts }: { posts: LatestPost[] }) {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="news-heading"
      className="relative bg-white text-[#222328] border-t border-black/10"
    >
      <div className="container-site py-[clamp(4rem,7vw,7rem)]">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-[40ch]">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
              Aktualności
            </p>
            <motion.h2
              id="news-heading"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display"
              style={{
                fontSize: "clamp(2.25rem, 3.5vw + 1rem, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Co u nas nowego<span style={{ color: "#8DC73F" }}>.</span>
            </motion.h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[0.95rem] text-[#26890d] hover:underline underline-offset-4"
          >
            Wszystkie wpisy <ArrowUpRight size={15} weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => {
            const dateLabel = formatDate(post.date);
            return (
              <motion.article
                key={post.slug}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] hover:-translate-y-0.5 transition-all"
              >
                {dateLabel && (
                  <time
                    dateTime={post.date ?? undefined}
                    className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]"
                  >
                    {dateLabel}
                  </time>
                )}
                <h3
                  className="mt-3 font-display tracking-[-0.01em] text-[#222328] line-clamp-3"
                  style={{ fontSize: "1.2rem", lineHeight: 1.25 }}
                >
                  {post.title}
                </h3>

                <p className="mt-4 text-[0.95rem] text-[color:var(--c-fg-muted)] leading-[1.55] line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto pt-6 inline-flex items-center gap-1 text-sm text-[#222328] group-hover:text-[#26890d] transition-colors"
                  aria-label={`Czytaj: ${post.title}`}
                >
                  Czytaj
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
