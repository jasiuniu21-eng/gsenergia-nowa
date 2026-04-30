import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  Clock,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z GS Energia — bezpłatna konsultacja energetyczna, audyty, BESS, fotowoltaika. Kraków · Rynek Główny 28. Tel. +48 606 590 931.",
  alternates: { canonical: "https://gsenergia.pl/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white">
        <div className="container-site pt-[clamp(4rem,7vw,6.5rem)] pb-[clamp(2rem,4vw,3rem)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#26890d] mb-3">
            Kontakt
          </p>
          <h1
            className="font-display text-[#222328] max-w-[24ch]"
            style={{
              fontSize: "clamp(2.25rem, 4vw + 1rem, 4rem)",
              fontWeight: 100,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Porozmawiajmy o Twojej energii
            <span style={{ color: "#8DC73F" }}>.</span>
          </h1>
          <p className="mt-5 max-w-[58ch] text-[1.05rem] leading-[1.65] text-[#222328]/70">
            Wypełnij formularz lub zadzwoń. Odpowiadamy w 24h, konsultacja
            wstępna jest bezpłatna.
          </p>
        </div>
      </section>

      {/* TWO COLUMNS */}
      <section className="bg-white">
        <div className="container-site pb-[clamp(4rem,7vw,7rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">
            {/* LEFT — info card */}
            <div className="rounded-2xl bg-[oklch(0.16_0.02_150)] text-white p-8 lg:p-10">
              <h2 className="font-display text-2xl mb-6">
                Skontaktuj się z nami
              </h2>

              <a
                href={SITE.phoneHref}
                className="block font-display text-white hover:text-[#8DC73F] transition-colors"
                style={{
                  fontSize: "clamp(1.6rem, 2.4vw + 0.5rem, 2rem)",
                  fontWeight: 200,
                  letterSpacing: "-0.01em",
                }}
              >
                {SITE.phone}
              </a>
              <a
                href={SITE.emailHref}
                className="mt-2 inline-flex items-center gap-2 text-[1.05rem] text-white/85 hover:text-white transition-colors"
              >
                <EnvelopeSimple size={16} weight="bold" className="text-[#8DC73F]" />
                {SITE.email}
              </a>

              <ul className="mt-8 space-y-4 text-[0.98rem]">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-[#8DC73F]"
                  />
                  <span className="text-white/85">
                    Rynek Główny 28
                    <br />
                    31-010 Kraków
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock
                    size={18}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-[#8DC73F]"
                  />
                  <span className="text-white/85">
                    Poniedziałek – Piątek 8:00 – 17:00
                  </span>
                </li>
              </ul>

              <div className="mt-8 rounded-xl overflow-hidden ring-1 ring-white/10">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=19.9314%2C50.0596%2C19.9418%2C50.0644&layer=mapnik&marker=50.0620%2C19.9366"
                  className="w-full"
                  style={{
                    border: 0,
                    height: 280,
                    filter: "grayscale(0.4) contrast(1.1)",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokalizacja GS Energia — Rynek Główny 28, Kraków"
                />
              </div>
            </div>

            {/* RIGHT — form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="bg-[#f6f7f4]">
        <div className="container-site py-[clamp(2.5rem,5vw,4rem)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-[1.05rem] text-[#222328]">
              Nie chcesz pisać? Zadzwoń od razu —{" "}
              <a
                href={SITE.phoneHref}
                className="font-medium text-[#26890d] hover:underline"
              >
                {SITE.phone}
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#26890d] text-white px-6 py-3 text-sm font-medium hover:bg-[#1f6f0a] transition-colors"
              >
                <Phone size={14} weight="bold" />
                Zadzwoń teraz
              </a>
              <a
                href={SITE.emailHref}
                className="inline-flex items-center gap-2 rounded-full border border-black/15 text-[#222328] px-6 py-3 text-sm font-medium hover:bg-white transition-colors"
              >
                <EnvelopeSimple size={14} weight="bold" />
                Wyślij e-mail
                <ArrowUpRight size={12} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
