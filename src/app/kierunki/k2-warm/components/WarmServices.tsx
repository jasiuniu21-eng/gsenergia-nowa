"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";
import { Reveal, staggerParent } from "../../_shared/motion";

export function WarmServices() {
  const reduced = useReducedMotion();

  return (
    <section
      id="uslugi"
      className="py-28 lg:py-36 relative"
    >
      <div className="k2-container">
        <Reveal className="max-w-[640px]">
          <p className="k2-label">Usługi</p>
          <h2 className="k2-display mt-5 text-[clamp(2.25rem,1rem+3.5vw,4rem)]">
            Siedem obszarów,{" "}
            <span className="k2-italic text-[color:var(--k2-accent)]">jedna metoda.</span>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-[color:var(--k2-ink-muted)]">
            Każdy audyt to mierzenie, liczenie, raport — i konkretna lista
            środków poprawy ułożonych według czasu zwrotu. Bez ogólników.
          </p>
        </Reveal>

        {/* Zig-zag rows */}
        <motion.div
          variants={staggerParent(0, 0.08)}
          initial={reduced ? undefined : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.15, margin: "-80px" }}
          className="mt-16 flex flex-col gap-3"
        >
          {SHARED.services.map((s, i) => (
            <ServiceRow key={s.id} service={s} flip={i % 2 === 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  flip,
}: {
  service: (typeof SHARED.services)[number];
  flip: boolean;
}) {
  return (
    <motion.article
      id={service.id}
      variants={{
        hidden: { opacity: 0, y: 28 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="group relative"
    >
      <div
        className={[
          "grid grid-cols-1 md:grid-cols-12 gap-6 items-center",
          "rounded-[1.75rem] border border-[color:var(--k2-line)] bg-[color:var(--k2-surface)]",
          "px-6 md:px-10 py-7 md:py-8",
          "hover:border-[color:var(--k2-accent)]/40 hover:bg-white/70 transition-all duration-500",
        ].join(" ")}
      >
        {/* Number */}
        <div
          className={[
            "md:col-span-1",
            flip ? "md:order-3 md:text-right" : "md:order-1",
          ].join(" ")}
        >
          <span className="k2-display text-[2rem] text-[color:var(--k2-accent)]">
            {service.n}
          </span>
        </div>

        {/* Title + body */}
        <div
          className={[
            "md:col-span-7",
            flip ? "md:order-2" : "md:order-2",
          ].join(" ")}
        >
          <h3 className="k2-display text-[clamp(1.5rem,1rem+1.2vw,2rem)] tracking-[-0.01em]">
            {service.title}
          </h3>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-[color:var(--k2-ink-muted)]">
            {service.body}
          </p>
        </div>

        {/* Metric */}
        <div
          className={[
            "md:col-span-4",
            flip ? "md:order-1 md:text-left" : "md:order-3 md:text-right",
          ].join(" ")}
        >
          <div
            className={[
              "inline-flex flex-col gap-1 px-5 py-3 rounded-xl",
              "bg-[color:var(--k2-accent-bg)]",
            ].join(" ")}
          >
            <span className="k2-label text-[color:var(--k2-accent)]">
              {service.metricLabel}
            </span>
            <span className="k2-display text-[1.65rem] text-[color:var(--k2-accent)]">
              {service.metric}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
