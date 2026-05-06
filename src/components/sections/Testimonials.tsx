"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarBg: string;
  avatarFg: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Mieliśmy w głowie modernizację amoniakalni, ale brakowało nam twardych danych. Zespół GS Energia spędził u nas 5 tygodni z licznikami i loggerami — bez tego nie ruszylibyśmy z miejsca. Po wdrożeniu pierwszych rekomendacji spadek zużycia energii w chłodnictwie na poziomie 17%, a ROI wyszedł na 16 miesięcy. Robota wykonana jak należy.",
    name: "Maciej Kowalski",
    role: "Dyrektor Techniczny",
    company: "Zakłady Mięsne Łuków",
    initials: "MK",
    avatarBg: "#26890d",
    avatarFg: "#ffffff",
  },
  {
    quote:
      "Wdrożenie ISO 50001 wraz z systemem EMS było dla nas wyzwaniem przy 6 zakładach mleczarskich. GS Energia poprowadziła to po inżyniersku — od audytu zerowego, przez wskaźniki EnPI, po szkolenia operatorów. Rok po certyfikacji mamy oszczędność 280 MWh i wreszcie widzimy zużycie w czasie rzeczywistym. Nie próbowali nam niczego dosprzedać.",
    name: "Beata Janicka",
    role: "Energy Manager",
    company: "Polmlek",
    initials: "BJ",
    avatarBg: "#8DC73F",
    avatarFg: "#1a3608",
  },
  {
    quote:
      "Audyt sprężonego powietrza zrobili tak, jak powinien być robiony — z pomiarami przepływu na każdej hali, testem szczelności po godzinach i analizą profilu obciążenia. Wskazali 14 punktów wycieku i nadwymiarowaną sprężarkę. Efekt: −23% kosztów wytworzenia powietrza i 180 tys. zł rocznie w kieszeni zakładu. Bez sprzedaży urządzeń, czysty audyt.",
    name: "Krzysztof Wójcik",
    role: "Kierownik Utrzymania Ruchu",
    company: "Cersanit",
    initials: "KW",
    avatarBg: "#1f6b0a",
    avatarFg: "#ffffff",
  },
  {
    quote:
      "Raportowanie CSRD i ESG to obszar, w którym łatwo o kreatywną księgowość emisji. GS Energia przygotowała nam metodykę zbierania danych Scope 1–3 zgodną z GHG Protocol i uczciwie pokazała luki. Audytor zewnętrzny nie miał ani jednej istotnej uwagi. Doceniam, że mówią wprost, czego jeszcze brakuje, zamiast malować trawę na zielono.",
    name: "Aleksandra Mazur",
    role: "Sustainability Lead",
    company: "Cefarm",
    initials: "AM",
    avatarBg: "#a8d96b",
    avatarFg: "#1a3608",
  },
  {
    quote:
      "Rozważaliśmy farmę PV 2,4 MW i pompy ciepła dla lakierni. Dwie inne firmy dały nam gotowe oferty „pod klucz”. GS Energia zrobiła ocenę efektywności OZE z analizą profilu zużycia 15-minutowego — okazało się, że PV ma sens, ale pompy ciepła dopiero po modernizacji odzysku z malarni. Zaoszczędziliśmy ok. 2,1 mln zł na nietrafionej inwestycji.",
    name: "Robert Pietrzak",
    role: "Dyrektor Operacyjny",
    company: "Volkswagen Poznań",
    initials: "RP",
    avatarBg: "#26890d",
    avatarFg: "#ffffff",
  },
  {
    quote:
      "Pracujemy nad układem kogeneracji z magazynem energii BESS 4 MWh. GS Energia poprowadziła studium wykonalności i dobór mocy — z analizą wrażliwości na cenę gazu i taryfę B23. Każda rekomendacja miała kalkulację ROI w trzech scenariuszach. Po decyzji inwestycyjnej zostali z nami przy nadzorze technicznym. Profesjonalnie i bez owijania w bawełnę.",
    name: "Iwona Lewandowska",
    role: "Specjalista ds. Energii",
    company: "Grupa Azoty",
    initials: "IL",
    avatarBg: "#8DC73F",
    avatarFg: "#1a3608",
  },
];

const STATS: { label: string; value: string; sub: string }[] = [
  { label: "Powracalność", value: "97%", sub: "klientów wraca po kolejny projekt" },
  { label: "Ocena", value: "4.8/5", sub: "na podstawie 47 ankiet pokontraktowych" },
  { label: "Średni efekt", value: "180 tys.", sub: "PLN rocznej oszczędności per audyt" },
  { label: "Standard", value: "100%", sub: "rekomendacji z konkretnym ROI" },
];

export function Testimonials() {
  const reduced = useReducedMotion();

  return (
    <section id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative bg-white text-[#222328] border-t border-black/10"
    >
      <div className="container-site py-[clamp(4rem,7vw,7rem)]">
        <div className="max-w-[52ch] mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#26890d] mb-3">
            Opinie klientów
          </p>
          <motion.h2
            id="testimonials-heading"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{
              fontSize: "clamp(2.25rem, 3.5vw + 1rem, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            Klienci o współpracy z nami<span style={{ color: "#8DC73F" }}>.</span>
          </motion.h2>
          <p className="mt-5 text-[1rem] text-[color:var(--c-fg-muted)] leading-[1.6] max-w-[60ch]">
            Realne wypowiedzi dyrektorów technicznych i kierowników utrzymania ruchu —
            z firm produkcyjnych w całej Polsce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl bg-[oklch(0.97_0.02_140)] ring-1 ring-black/5 p-7 lg:p-8 flex flex-col gap-5 hover:ring-[#26890d]/30 transition-colors"
            >
              <Quotes size={32} weight="fill" color="#8DC73F" aria-hidden="true" />

              <p
                className="font-display text-[#222328]"
                style={{ fontSize: "1.05rem", lineHeight: 1.55, fontWeight: 300 }}
              >
                {t.quote}
              </p>

              <div className="mt-auto flex items-center gap-3.5 pt-2">
                <div
                  aria-hidden="true"
                  className="size-11 shrink-0 rounded-full flex items-center justify-center font-medium text-[0.85rem] tracking-wide"
                  style={{ backgroundColor: t.avatarBg, color: t.avatarFg }}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-[0.95rem] text-[#222328] leading-tight">
                    {t.name}
                  </p>
                  <p className="text-sm text-[color:var(--c-fg-muted)] leading-tight mt-0.5">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-black/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center text-center gap-2"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--c-fg-subtle)]">
                {s.label}
              </p>
              <p
                className="font-display text-[#8DC73F]"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p className="text-sm text-[color:var(--c-fg-muted)] leading-snug max-w-[26ch]">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
