"use client";

import { motion, useReducedMotion } from "framer-motion";

const FEATURED = {
  quote:
    "Mieliśmy w głowie modernizację amoniakalni, ale brakowało nam twardych danych. Zespół GS Energia spędził u nas 5 tygodni z licznikami i loggerami — bez tego nie ruszylibyśmy z miejsca. Po wdrożeniu pierwszych rekomendacji spadek zużycia energii w chłodnictwie na poziomie 17%, a ROI wyszedł na 16 miesięcy. Robota wykonana jak należy.",
  name: "Maciej Kowalski",
  role: "Dyrektor Techniczny",
  company: "Zakłady Mięsne Łuków",
};

const REST = [
  {
    quote:
      "Wdrożenie ISO 50001 z systemem EMS przy 6 zakładach mleczarskich. GS Energia poprowadziła to po inżyniersku — rok po certyfikacji mamy oszczędność 280 MWh i widzimy zużycie w czasie rzeczywistym.",
    name: "Beata Janicka",
    role: "Energy Manager",
    company: "Polmlek",
  },
  {
    quote:
      "Audyt sprężonego powietrza: 14 punktów wycieku, nadwymiarowana sprężarka. Efekt: −23% kosztów wytworzenia powietrza i 180 tys. zł rocznie. Bez sprzedaży urządzeń, czysty audyt.",
    name: "Krzysztof Wójcik",
    role: "Kierownik Utrzymania Ruchu",
    company: "Cersanit",
  },
  {
    quote:
      "Zaoszczędziliśmy ok. 2,1 mln zł na nietrafionej inwestycji. GS Energia zrobiła ocenę efektywności OZE z analizą profilu 15-minutowego — PV tak, pompy ciepła dopiero po modernizacji.",
    name: "Robert Pietrzak",
    role: "Dyrektor Operacyjny",
    company: "Volkswagen Poznań",
  },
] as const;

export function Testimonials() {
  const reduced = useReducedMotion();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-[#1c2419] text-white"
    >
      <div className="container-site py-[clamp(4rem,7vw,7rem)]">
        {/* Eyebrow */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--c-brand-400)] mb-10">
          Opinie klientów
        </p>

        {/* Full-width pull quote */}
        <motion.blockquote
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-16 pb-16 border-b border-white/10"
        >
          {/* Decorative quote mark */}
          <span
            aria-hidden
            className="font-display text-[color:var(--c-brand-500)] leading-none select-none absolute -top-6 -left-3 opacity-30"
            style={{ fontSize: "clamp(8rem, 14vw, 14rem)", fontWeight: 800, lineHeight: 0.7 }}
          >
            "
          </span>

          <p
            id="testimonials-heading"
            className="font-display text-white leading-snug tracking-tight relative z-10 max-w-4xl"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", fontWeight: 600 }}
          >
            {FEATURED.quote}
          </p>

          <footer className="mt-8 flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold text-[#1c2419] shrink-0"
              style={{ background: "var(--c-brand-400)" }}
            >
              {FEATURED.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{FEATURED.name}</p>
              <p className="text-white/45 text-sm">{FEATURED.role} · {FEATURED.company}</p>
            </div>
          </footer>
        </motion.blockquote>

        {/* 3 smaller quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REST.map((t, i) => (
            <motion.article
              key={t.name}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/8 bg-white/5 p-7 flex flex-col gap-5"
            >
              <p className="text-white/70 text-[0.95rem] leading-relaxed flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-[#1c2419] shrink-0"
                  style={{ background: "var(--c-brand-400)" }}
                >
                  {t.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
