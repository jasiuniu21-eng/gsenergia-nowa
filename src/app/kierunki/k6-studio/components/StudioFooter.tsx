import Image from "next/image";
import { SHARED } from "../../_data/content";

export function StudioFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--k6-line)" }}>
      <div className="k6-container py-20">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12 border-b" style={{ borderColor: "var(--k6-line)" }}>
          {/* Brand + NAP */}
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--k6-accent)" }}
              />
              <Image
                src="/logos/gs-energia-white.png"
                alt="GS Energia"
                width={180}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="mt-6 max-w-[32ch] text-[14px] text-[color:var(--k6-ink-muted)] leading-[1.65]">
              {SHARED.contact.address}
              <br />
              NIP {SHARED.contact.nip}
            </p>
            <p className="k6-mono mt-5 text-[13px] text-[color:var(--k6-ink)]">
              <a
                href={SHARED.contact.phoneHref}
                className="transition-colors hover:text-[color:var(--k6-accent)]"
              >
                {SHARED.contact.phone}
              </a>
              <br />
              <a
                href={SHARED.contact.emailHref}
                className="transition-colors hover:text-[color:var(--k6-accent)]"
              >
                {SHARED.contact.email}
              </a>
            </p>
          </div>

          {/* Usługi */}
          <nav>
            <p className="k6-label">// Usługi</p>
            <ul className="mt-5 space-y-3">
              {SHARED.footer.navUslugi.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="text-[13px] text-[color:var(--k6-ink-muted)] hover:text-[color:var(--k6-accent)] transition-colors"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Firma */}
          <nav>
            <p className="k6-label">// Firma</p>
            <ul className="mt-5 space-y-3">
              {SHARED.footer.navFirma.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="text-[13px] text-[color:var(--k6-ink-muted)] hover:text-[color:var(--k6-accent)] transition-colors"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Signals */}
          <div>
            <p className="k6-label">// Signals</p>
            <ul className="mt-5 space-y-3 k6-mono text-[12px] text-[color:var(--k6-ink-muted)]">
              <li>
                <span style={{ color: "var(--k6-accent)" }}>●</span> Uptime 99.98%
              </li>
              <li>Audits running: 14</li>
              <li>Rev. 2026.04</li>
              <li>Studio · Kraków</li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 k6-label">
          <span>{SHARED.footer.copyright}</span>
          <span style={{ color: "var(--k6-accent-dim)" }}>K6 · Studio</span>
        </div>
      </div>
    </footer>
  );
}
