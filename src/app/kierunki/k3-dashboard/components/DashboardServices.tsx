"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";
import { Reveal, staggerParent } from "../../_shared/motion";

/**
 * K3 Services — bento tile grid with each service as a "monitor panel".
 */
export function DashboardServices() {
  const reduced = useReducedMotion();

  return (
    <section id="uslugi" className="py-24 lg:py-32 relative">
      <div className="k3-container">
        <Reveal className="flex flex-wrap items-end justify-between gap-8 pb-10 border-b border-[color:var(--k3-line)]">
          <div>
            <p className="k3-label">Section 01 · Usługi</p>
            <h2 className="k3-display mt-4 text-[clamp(2rem,1rem+3vw,3.5rem)]">
              Siedem obszarów.
              <br />
              Jedna metoda pomiaru.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[14.5px] leading-[1.55] text-[color:var(--k3-ink-muted)]">
            Każdy moduł to osobny pipeline danych: pomiary → analiza → raport.
            Wszystko spina EMS w jeden cockpit.
          </p>
        </Reveal>

        <motion.div
          variants={staggerParent(0.1, 0.07)}
          initial={reduced ? undefined : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-6 gap-3 lg:gap-4 auto-rows-[180px]"
        >
          {SHARED.services.map((s, i) => (
            <ServiceTile key={s.id} service={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceTile({
  service,
  index,
}: {
  service: (typeof SHARED.services)[number];
  index: number;
}) {
  // Layout classes per index (asymmetric bento)
  const layouts = [
    "col-span-6 md:col-span-3 lg:col-span-2 row-span-2",   // 01 — big
    "col-span-6 md:col-span-3 lg:col-span-2",              // 02
    "col-span-3 md:col-span-3 lg:col-span-2",              // 03
    "col-span-3 md:col-span-3 lg:col-span-2 row-span-2",   // 04 — tall
    "col-span-6 md:col-span-3 lg:col-span-2",              // 05
    "col-span-3 md:col-span-3 lg:col-span-2",              // 06
    "col-span-3 md:col-span-6 lg:col-span-2",              // 07
  ];

  return (
    <motion.article
      id={service.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={[
        "group relative k3-card p-5 lg:p-6 overflow-hidden",
        "hover:border-[color:var(--k3-accent)]/40 hover:bg-[color:var(--k3-surface-2)] transition-all duration-500",
        layouts[index] ?? "col-span-3",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <span className="k3-mono text-[11px] text-[color:var(--k3-ink-faint)]">
          /{service.n}
        </span>
        <span className="inline-flex items-center gap-1.5 k3-mono text-[10px] uppercase tracking-[0.1em] text-[color:var(--k3-accent)]">
          <span
            className="inline-block size-[5px] rounded-full bg-[color:var(--k3-accent)]"
            style={{ animation: "kierunki-dot 2.2s ease-in-out infinite" }}
            aria-hidden="true"
          />
          active
        </span>
      </div>

      <h3 className="k3-display mt-5 text-[clamp(1.1rem,0.8rem+0.8vw,1.5rem)]">
        {service.title}
      </h3>
      <p className="mt-2 text-[13px] leading-[1.55] text-[color:var(--k3-ink-muted)] line-clamp-3">
        {service.body}
      </p>

      {/* Metric */}
      <div className="mt-auto pt-4 flex items-end justify-between">
        <div>
          <p className="k3-label">{service.metricLabel}</p>
          <p className="mt-1 k3-mono text-[16px] text-[color:var(--k3-accent)] font-semibold">
            {service.metric}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="text-[color:var(--k3-ink-faint)] group-hover:text-[color:var(--k3-accent)] group-hover:translate-x-0.5 transition-all"
        >
          →
        </span>
      </div>

      {/* Decorative corner line */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[48px] h-[1px] bg-gradient-to-l from-[color:var(--k3-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.article>
  );
}
