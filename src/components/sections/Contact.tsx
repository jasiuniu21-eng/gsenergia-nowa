"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  Clock,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const reduced = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative bg-[oklch(0.16_0.02_150)] text-white"
    >
      <div className="container-site py-[clamp(4rem,7vw,7rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16">
          {/* LEFT — content */}
          <div>
            <motion.p
              {...reveal(0)}
              className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#86bc25] mb-3"
            >
              Kontakt
            </motion.p>

            <motion.h2
              id="contact-heading"
              {...reveal(0.05)}
              className="font-display"
              style={{
                fontSize: "clamp(2.25rem, 3.5vw + 1rem, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Porozmawiajmy o Twojej energii
              <span style={{ color: "#86bc25" }}>.</span>
            </motion.h2>

            <motion.p
              {...reveal(0.1)}
              className="mt-5 max-w-[52ch] text-[1.05rem] leading-[1.6] text-white/70"
            >
              Bezpłatna konsultacja, audyt wstępny lub szczegółowa analiza ROI.
              Odpowiadamy w 24h.
            </motion.p>

            <motion.ul
              {...reveal(0.15)}
              className="mt-10 space-y-4 text-[0.98rem]"
            >
              <li className="flex items-start gap-4">
                <MapPin
                  size={18}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-[#86bc25]"
                />
                <span className="text-white/85">
                  Rynek Główny 28
                  <br />
                  31-010 Kraków
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Phone
                  size={18}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-[#86bc25]"
                />
                <a
                  href={SITE.phoneHref}
                  className="text-white/85 hover:text-white transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <EnvelopeSimple
                  size={18}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-[#86bc25]"
                />
                <a
                  href={SITE.emailHref}
                  className="text-white/85 hover:text-white transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Clock
                  size={18}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-[#86bc25]"
                />
                <span className="text-white/85">Pn–Pt 8:00–17:00</span>
              </li>
            </motion.ul>

            <motion.div
              {...reveal(0.2)}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href={SITE.surveyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-[#26890d] text-white px-6 py-3 text-sm font-medium hover:bg-[#1f6f0a] transition-colors"
              >
                Zamów bezpłatną konsultację
                <ArrowUpRight size={14} weight="bold" />
              </a>
              <a
                href={SITE.emailHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-[oklch(0.16_0.02_150)] transition-colors"
              >
                Wyślij e-mail
                <EnvelopeSimple size={14} weight="bold" />
              </a>
            </motion.div>
          </div>

          {/* RIGHT — map */}
          <motion.div
            {...reveal(0.1)}
            className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 aspect-[4/3] lg:aspect-auto lg:min-h-[420px]"
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=19.9314%2C50.0596%2C19.9418%2C50.0644&layer=mapnik&marker=50.0620%2C19.9366"
              className="w-full h-full"
              style={{ border: 0, filter: "grayscale(0.4) contrast(1.1)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja GS Energia — Kraków"
            />
            <div className="absolute top-4 right-4 rounded-lg bg-white/95 backdrop-blur px-3 py-2 text-xs text-[#222328] shadow-lg">
              <p className="font-mono uppercase tracking-[0.14em] text-[10px] text-[#26890d]">
                GS Energia
              </p>
              <p className="mt-0.5 font-medium">Rynek Główny 28</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
