"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Scales,
  Calculator,
  ChartLineUp,
  ShieldCheck,
  Certificate,
  ArrowUpRight,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { SITE } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const TIMELINE: { year: string; title: string; desc: string }[] = [
  {
    year: "2008",
    title: "Założenie firmy w Krakowie",
    desc: "Pierwsze audyty energetyczne dla zakładów produkcyjnych Małopolski. Start z jasną zasadą: doradzamy, nie sprzedajemy.",
  },
  {
    year: "2012",
    title: "Wejście w sektor energetyczny",
    desc: "Pierwsze duże projekty dla grupy PGE. Audyty efektywności w elektrowniach konwencjonalnych.",
  },
  {
    year: "2016",
    title: "Specjalizacja w ISO 50001",
    desc: "Wdrożenie systemu zarządzania energią u pierwszego klienta przemysłowego — początek programu EMS i telemetrii.",
  },
  {
    year: "2019",
    title: "Dekarbonizacja i ESG",
    desc: "Rozszerzenie usług o ścieżki dekarbonizacji i raportowanie ESG, jeszcze przed wymogami dyrektywy CSRD.",
  },
  {
    year: "2023",
    title: "400+ projektów w portfelu",
    desc: "Pełen zakres usług: audyt, BESS, fotowoltaika, EMS, kogeneracja, ESG. Klienci od Shell po Skanska.",
  },
  {
    year: "2026",
    title: "18 lat na rynku",
    desc: "Strategia rozwoju w obszarze technologii wodorowych i wielkoskalowych OZE dla przemysłu.",
  },
];

const VALUES: { icon: Icon; title: string; desc: string }[] = [
  {
    icon: Scales,
    title: "Niezależność",
    desc: "Nie reprezentujemy żadnego producenta urządzeń ani technologii. Nasz interes pokrywa się z oszczędnościami klienta — i niczym więcej.",
  },
  {
    icon: Calculator,
    title: "Konkret",
    desc: "Każda rekomendacja zawiera kalkulację ROI w PLN i terminy zwrotu. Bez ogólników typu „estymacja oszczędności 5–25%”.",
  },
  {
    icon: ChartLineUp,
    title: "Długi termin",
    desc: "Pilnujemy efektu po wdrożeniu. Monitoring, raporty, korekty — odpowiadamy za rezultat, nie tylko za fakturę.",
  },
];

const TEAM: { name: string; role: string; bio: string; tone: string }[] = [
  {
    name: "Grzegorz Sokołowski",
    role: "Założyciel, Audytor ekspert",
    bio: "18 lat audytów dla przemysłu ciężkiego i energetyki.",
    tone: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  },
  {
    name: "Anna Kwiatkowska",
    role: "Kierownik ds. EMS i ISO 50001",
    bio: "Wdrożenia systemów zarządzania energią w 60+ zakładach.",
    tone: "bg-lime-500/15 text-lime-300 ring-lime-400/30",
  },
  {
    name: "Tomasz Nowak",
    role: "Inżynier energetyk, specjalista chłodnictwa",
    bio: "Audyty sprężonego powietrza i instalacji chłodniczych.",
    tone: "bg-teal-500/15 text-teal-300 ring-teal-400/30",
  },
  {
    name: "Marta Lewandowska",
    role: "Doradca ds. OZE i fotowoltaiki",
    bio: "Projekty PV i hybrydowe BESS dla zakładów produkcyjnych.",
    tone: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  },
  {
    name: "Piotr Malinowski",
    role: "Audytor wodorowy",
    bio: "Studia wykonalności H2 i ścieżki dekarbonizacji procesów.",
    tone: "bg-lime-500/15 text-lime-300 ring-lime-400/30",
  },
  {
    name: "Karolina Wiśniewska",
    role: "Specjalistka ESG i CSRD",
    bio: "Raportowanie zgodne z dyrektywą CSRD i taksonomią UE.",
    tone: "bg-teal-500/15 text-teal-300 ring-teal-400/30",
  },
];

const CERTS: { icon: Icon; name: string; desc: string }[] = [
  {
    icon: Certificate,
    name: "ISO 50001",
    desc: "System zarządzania energią — wdrażamy, audytujemy i utrzymujemy u klientów.",
  },
  {
    icon: ShieldCheck,
    name: "Ustawa o efektywności energetycznej",
    desc: "Pełna zgodność z wymogami prawnymi dla dużych przedsiębiorstw.",
  },
  {
    icon: Certificate,
    name: "CSRD / ESG",
    desc: "Raportowanie zgodne z dyrektywą unijną od 2024 — dla całych grup kapitałowych.",
  },
  {
    icon: ShieldCheck,
    name: "KAPE",
    desc: "Krajowa Agencja Poszanowania Energii — członek od 2010 roku.",
  },
  {
    icon: Certificate,
    name: "UDT",
    desc: "Audytorzy z uprawnieniami Urzędu Dozoru Technicznego.",
  },
  {
    icon: ShieldCheck,
    name: "PSAE",
    desc: "Polskie Stowarzyszenie Audytorów Energetycznych — członkostwo i prace legislacyjne.",
  },
  {
    icon: Certificate,
    name: "F-gas",
    desc: "Uprawnienia do prac z czynnikami chłodniczymi — audyty chłodu.",
  },
  {
    icon: ShieldCheck,
    name: "PV Pro",
    desc: "Certyfikat projektowania i nadzoru nad instalacjami fotowoltaicznymi.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export function AboutClient() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* ===== Section 1: Hero ===== */}
      <section className="relative bg-white text-[#222328]">
        <div className="container-site py-[clamp(5rem,9vw,8rem)]">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-5"
          >
            O nas
          </motion.p>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display max-w-[22ch]"
            style={{
              fontSize: "clamp(2.6rem, 5vw + 1rem, 5.25rem)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
            }}
          >
            Niezależne doradztwo energetyczne. Od 2008
            <span style={{ color: "#8DC73F" }}>.</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-8 max-w-[60ch] text-[1.075rem] leading-[1.6] text-[color:var(--c-fg-muted)]"
          >
            Pomagamy zakładom przemysłowym, deweloperom i instytucjom redukować
            rachunek za energię o 15–30%. Nie sprzedajemy urządzeń — sprzedajemy
            rzetelne dane i konkretne ROI.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]"
          >
            <span>400+ klientów</span>
            <span className="text-black/20">·</span>
            <span>18 lat</span>
            <span className="text-black/20">·</span>
            <span>ISO 50001</span>
            <span className="text-black/20">·</span>
            <span>Kraków, cała Polska</span>
          </motion.div>
        </div>
      </section>

      {/* ===== Section 2: Mission ===== */}
      <section className="relative bg-white text-[#222328] border-t border-black/10">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
                Nasza misja
              </p>
              <motion.h2
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 3vw + 1rem, 3.25rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                }}
              >
                Energia nie kłamie. Liczby też nie
                <span style={{ color: "#8DC73F" }}>.</span>
              </motion.h2>
            </div>
            <div className="space-y-5 text-[1.025rem] leading-[1.65] text-[color:var(--c-fg-muted)] max-w-[62ch]">
              {[
                "Rynek doradczy w Polsce jest pełen sprzedawców urządzeń, którzy „audytują” pod konkretną technologię — fotowoltaikę, pompy ciepła, kogenerację. My działamy odwrotnie: najpierw mierzymy i analizujemy, dopiero potem rekomendujemy rozwiązanie.",
                "Każda nasza rekomendacja zawiera konkretną kalkulację ROI w złotówkach i realny termin zwrotu. Jeśli inwestycja nie ma sensu finansowego — mówimy to wprost, nawet jeśli oznacza to mniejszy projekt po naszej stronie.",
                "Pracujemy dla zakładów, którym zależy na rzetelnych danych, nie na pretekście do zakupu. Dlatego od 18 lat nasze rekomendacje wdrażają się — i przynoszą oszczędności, które pokazujemy w raportach.",
              ].map((p, i) => (
                <motion.p
                  key={i}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 3: Timeline ===== */}
      <section className="relative bg-[oklch(0.16_0.02_150)] text-white">
        <div className="container-site py-[clamp(4rem,8vw,8rem)]">
          <div className="max-w-[44ch] mb-14">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#86bc25] mb-3">
              Historia
            </p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 3.2vw + 1rem, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Od jednej osoby do zespołu ekspertów
              <span style={{ color: "#86bc25" }}>.</span>
            </motion.h2>
          </div>

          <ol className="relative ml-3 sm:ml-6 border-l border-white/15">
            {TIMELINE.map((m, i) => (
              <motion.li
                key={m.year}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="relative pl-8 sm:pl-12 pb-12 last:pb-0"
              >
                <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-[#86bc25] ring-4 ring-[oklch(0.16_0.02_150)]" />
                <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3 sm:gap-8 items-start">
                  <span
                    className="font-display text-[#86bc25]"
                    style={{
                      fontSize: "clamp(2rem, 2.4vw + 1rem, 3rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {m.year}
                  </span>
                  <div className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-6">
                    <h3 className="font-display text-[1.15rem] tracking-[-0.01em] text-white">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.55] text-white/65">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Section 4: Values ===== */}
      <section className="relative bg-white text-[#222328] border-t border-black/10">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[48ch] mb-14">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
              W co wierzymy
            </p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 3vw + 1rem, 3.25rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Trzy zasady, na których budujemy każdy projekt
              <span style={{ color: "#8DC73F" }}>.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.article
                  key={v.title}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="rounded-2xl border border-black/10 bg-white p-7 hover:border-[#26890d]/40 hover:shadow-[0_18px_40px_-22px_rgba(38,137,13,0.30)] transition-all"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#26890d]/10 text-[#26890d]">
                    <Icon size={24} weight="duotone" />
                  </div>
                  <h3 className="mt-5 font-display text-[1.35rem] tracking-[-0.01em]">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[0.975rem] leading-[1.6] text-[color:var(--c-fg-muted)]">
                    {v.desc}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Section 5: Team ===== */}
      <section className="relative bg-[oklch(0.16_0.02_150)] text-white">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[60ch] mb-12">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#86bc25] mb-3">
              Zespół
            </p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 3vw + 1rem, 3.25rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Audytorzy, inżynierowie, doradcy
              <span style={{ color: "#86bc25" }}>.</span>
            </motion.h2>
            <p className="mt-5 text-[1.025rem] leading-[1.6] text-white/65">
              Nasz zespół łączy 100+ lat doświadczenia w energetyce
              przemysłowej, dyplomy uczelni technicznych i certyfikaty branżowe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((m, i) => (
              <motion.article
                key={m.name}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-6 hover:bg-white/[0.06] hover:ring-white/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ring-1 font-display text-[0.95rem] ${m.tone}`}
                  >
                    {initials(m.name)}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.05rem] tracking-[-0.01em] text-white leading-tight">
                      {m.name}
                    </h3>
                    <p className="text-[#86bc25] text-sm mt-0.5">{m.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-[1.55] text-white/60">
                  {m.bio}
                </p>
              </motion.article>
            ))}
          </div>

          <p className="mt-10 text-sm italic text-white/55 max-w-[60ch]">
            Pełny zespół to 25 osób, w tym 12 audytorów certyfikowanych przez
            UDT i KAPE.
          </p>
        </div>
      </section>

      {/* ===== Section 6: Certificates ===== */}
      <section className="relative bg-white text-[#222328] border-t border-black/10">
        <div className="container-site py-[clamp(4rem,7vw,7rem)]">
          <div className="max-w-[52ch] mb-12">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
              Akredytacje
            </p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 3vw + 1rem, 3.25rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Pracujemy w zgodzie z normami branżowymi
              <span style={{ color: "#8DC73F" }}>.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.article
                  key={c.name}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.06,
                    ease: EASE,
                  }}
                  className="rounded-xl border border-black/10 bg-white p-5 hover:border-[#26890d]/40 transition-colors"
                >
                  <Icon
                    size={26}
                    weight="duotone"
                    className="text-[#26890d]"
                  />
                  <h3
                    className="mt-4 font-display tracking-[-0.005em]"
                    style={{ fontSize: "1rem", fontWeight: 400 }}
                  >
                    {c.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.5] text-[color:var(--c-fg-muted)]">
                    {c.desc}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Section 7: CTA ===== */}
      <section className="relative bg-[oklch(0.16_0.02_150)] text-white">
        <div className="container-site py-[clamp(4rem,8vw,7rem)]">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display max-w-[20ch]"
              style={{
                fontSize: "clamp(2.25rem, 4vw + 1rem, 4.25rem)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
              }}
            >
              Gotowi na audyt, który się zwraca
              <span style={{ color: "#86bc25" }}>?</span>
            </motion.h2>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={SITE.surveyUrl}
                className="inline-flex items-center gap-2 rounded-full bg-[#86bc25] px-6 py-3.5 text-[0.95rem] font-medium text-[#0c1410] hover:bg-[#9bd02f] transition-colors"
              >
                Zamów bezpłatną konsultację
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href="/realizacje"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] text-white ring-1 ring-white/30 hover:ring-white/60 transition-colors"
              >
                Zobacz nasze realizacje
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
