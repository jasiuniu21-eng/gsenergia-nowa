"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SHARED } from "../../_data/content";
import { Reveal, CountUp } from "../../_shared/motion";

/**
 * K3 Proof — fullscreen "report" view with large animated charts.
 */
export function DashboardProof() {
  const p = SHARED.proof;
  const reduced = useReducedMotion();

  return (
    <section id="proof" className="py-24 lg:py-32 relative">
      <div className="k3-container">
        <Reveal className="flex items-end justify-between gap-8 pb-10 border-b border-[color:var(--k3-line)]">
          <div>
            <p className="k3-label">Section 02 · Proof</p>
            <h2 className="k3-display mt-4 text-[clamp(2rem,1rem+3vw,3.5rem)]">
              Report · {p.caseId}
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 k3-mono text-[11px] text-[color:var(--k3-accent)]">
            <span
              className="inline-block size-[7px] rounded-full bg-[color:var(--k3-accent)]"
              style={{ animation: "kierunki-dot 2s ease-in-out infinite" }}
              aria-hidden="true"
            />
            verified · 3 periods
          </span>
        </Reveal>

        {/* Metadata strip */}
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 border border-[color:var(--k3-line)] rounded-xl overflow-hidden">
            <Meta label="Klient" value={p.client} />
            <Meta label="Region" value={p.region} />
            <Meta label="Rok" value={p.year} />
            <Meta label="ROI" value={p.roi} />
          </div>
        </Reveal>

        {/* Main chart + sidebar */}
        <div className="mt-6 grid lg:grid-cols-[1.5fr_1fr] gap-4">
          {/* Large Before/After bar chart */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="k3-card p-8 lg:p-10"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="k3-label">Roczne zużycie energii</p>
                <p className="mt-2 k3-display text-[1.35rem]">Before → After</p>
              </div>
              <span className="k3-mono text-[11px] text-[color:var(--k3-ink-faint)]">MWh / rok</span>
            </div>

            {/* Giant comparison */}
            <div className="mt-10 space-y-8">
              <BigBar label="Przed audytem" value={8472} max={10000} variant="muted" delay={0.1} />
              <BigBar label="Po wdrożeniu" value={6198} max={10000} variant="accent" delay={0.4} />
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 pt-6 border-t border-[color:var(--k3-line)]">
              <StatCell label="Δ energii" value={<><CountUp to={2274} format={(n) => Math.round(n).toLocaleString("pl-PL").replace(",", " ")} /></>} unit="MWh" accent />
              <StatCell label="Δ kosztu" value={<><CountUp to={1.6} duration={1.8} format={(n) => n.toFixed(1)} /></>} unit="mln zł / rok" accent />
              <StatCell label="Δ CO₂" value={<><CountUp to={1842} format={(n) => Math.round(n).toLocaleString("pl-PL").replace(",", " ")} /></>} unit="t / rok" accent />
            </div>
          </motion.div>

          {/* Breakdown */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="k3-card p-8"
          >
            <p className="k3-label">Breakdown obszarów</p>
            <h3 className="k3-display mt-2 text-[1.25rem]">Gdzie zaoszczędziliśmy?</h3>

            <ul className="mt-7 space-y-6">
              {p.bars.map((bar, i) => (
                <BarRow key={bar.label} bar={bar} delay={i * 0.12 + 0.3} />
              ))}
            </ul>

            <div className="k3-divider-dotted my-7" />

            <div className="flex flex-wrap gap-2">
              {[p.certificates, p.co2, "ISO 50001"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--k3-surface-2)] border border-[color:var(--k3-line)] px-2.5 py-1.5 k3-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--k3-ink-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 border-r border-b border-[color:var(--k3-line)] last:border-r-0 md:border-b-0 bg-[color:var(--k3-surface)]">
      <p className="k3-label">{label}</p>
      <p className="mt-2 text-[14px] text-[color:var(--k3-ink)]">{value}</p>
    </div>
  );
}

function BigBar({
  label,
  value,
  max,
  variant,
  delay,
}: {
  label: string;
  value: number;
  max: number;
  variant: "muted" | "accent";
  delay: number;
}) {
  const pct = value / max;
  const color =
    variant === "accent" ? "var(--k3-accent)" : "var(--k3-ink-faint)";
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="k3-label">{label}</span>
        <span
          className="k3-display text-[clamp(1.25rem,1rem+0.8vw,1.75rem)]"
          style={{ color: variant === "accent" ? color : "var(--k3-ink-muted)" }}
        >
          {value.toLocaleString("pl-PL").replace(",", " ")}{" "}
          <span className="k3-mono text-[0.55em] text-[color:var(--k3-ink-faint)]">MWh</span>
        </span>
      </div>
      <div className="h-4 rounded-full bg-[color:var(--k3-surface-2)] overflow-hidden border border-[color:var(--k3-line)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full"
          style={{
            background:
              variant === "accent"
                ? `linear-gradient(90deg, ${color}, color-mix(in oklch, ${color} 70%, transparent))`
                : `linear-gradient(90deg, ${color}, color-mix(in oklch, ${color} 50%, transparent))`,
          }}
        />
      </div>
    </div>
  );
}

function StatCell({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  unit: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="k3-label">{label}</p>
      <p className="mt-2 k3-display text-[clamp(1.35rem,1rem+1.2vw,1.85rem)]" style={{ color: accent ? "var(--k3-accent)" : "var(--k3-ink)" }}>
        {value}
      </p>
      <p className="k3-mono text-[10.5px] text-[color:var(--k3-ink-faint)] mt-1">{unit}</p>
    </div>
  );
}

function BarRow({
  bar,
  delay,
}: {
  bar: { label: string; value: number; color: "brand" | "amber" };
  delay: number;
}) {
  const color =
    bar.color === "amber" ? "var(--k3-amber)" : "var(--k3-accent)";
  return (
    <li>
      <div className="flex items-baseline justify-between text-[13px]">
        <span className="text-[color:var(--k3-ink)]">{bar.label}</span>
        <span className="k3-mono text-[color:var(--k3-accent)]">
          −{Math.round((1 - bar.value) * 100)}%
        </span>
      </div>
      <div className="mt-2 h-[6px] rounded-full bg-[color:var(--k3-surface-2)] overflow-hidden border border-[color:var(--k3-line)]">
        <motion.div
          initial={{ width: "100%" }}
          whileInView={{ width: `${Math.round(bar.value * 100)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full"
          style={{ background: color }}
        />
      </div>
    </li>
  );
}
