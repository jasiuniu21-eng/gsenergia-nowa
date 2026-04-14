"use client";

import { motion } from "framer-motion";
import { SHARED } from "../../_data/content";
import { Reveal } from "../../_shared/motion";

export function BlueprintServices() {
  return (
    <section id="uslugi" className="py-24 lg:py-32 border-t border-[color:var(--k1-line-strong)]">
      <div className="k1-container">
        {/* Section header */}
        <Reveal className="flex items-end justify-between gap-8 pb-12 border-b border-[color:var(--k1-line)]">
          <div>
            <p className="k1-label">Section 01 · Usługi</p>
            <h2 className="k1-display mt-4 text-[clamp(2rem,1rem+3vw,3.5rem)]">
              Siedem obszarów,
              <br />
              jedna metoda.
            </h2>
          </div>
          <p className="max-w-[36ch] k1-mono text-[12px] leading-[1.6] text-[color:var(--k1-ink-muted)] hidden md:block">
            Każdy audyt kończymy raportem z liczbami, priorytetyzacją i
            wyliczonym czasem zwrotu. Nigdy ogólnymi zaleceniami.
          </p>
        </Reveal>

        {/* Service table */}
        <div className="mt-0 divide-y divide-[color:var(--k1-line)] border-b border-[color:var(--k1-line-strong)]">
          {SHARED.services.map((s, i) => (
            <ServiceRow key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof SHARED.services)[number];
  index: number;
}) {
  return (
    <motion.article
      id={service.id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.04 }}
      className="group grid grid-cols-12 gap-4 items-center py-6 md:py-7 hover:bg-[color:var(--k1-ink)]/[0.02] transition-colors"
    >
      {/* Number */}
      <div className="col-span-2 md:col-span-1">
        <span className="k1-mono text-[12px] text-[color:var(--k1-ink-faint)]">
          {service.n}
        </span>
      </div>

      {/* Title */}
      <h3 className="col-span-10 md:col-span-4 k1-display text-xl md:text-[1.45rem] font-medium tracking-[-0.015em] leading-[1.1]">
        {service.title}
      </h3>

      {/* Description */}
      <p className="col-span-12 md:col-span-4 text-[14px] leading-[1.55] text-[color:var(--k1-ink-muted)] pl-[calc(8.333%+1rem)] md:pl-0">
        {service.body}
      </p>

      {/* Metric */}
      <div className="col-span-10 md:col-span-2 pl-[calc(8.333%+1rem)] md:pl-0 md:text-right">
        <p className="k1-mono text-[12px] text-[color:var(--k1-ink-faint)]">
          {service.metricLabel}
        </p>
        <p className="k1-mono mt-1 text-[1.1rem] text-[color:var(--k1-accent)] font-semibold">
          {service.metric}
        </p>
      </div>

      {/* Arrow */}
      <div className="col-span-2 md:col-span-1 text-right md:text-center">
        <span
          aria-hidden="true"
          className="inline-block text-[color:var(--k1-ink-faint)] group-hover:text-[color:var(--k1-accent)] group-hover:translate-x-1 transition-all"
        >
          →
        </span>
      </div>
    </motion.article>
  );
}
