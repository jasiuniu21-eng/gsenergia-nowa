import { SHARED } from "../../_data/content";

export function IndustrialFooter() {
  return (
    <footer className="border-t border-[color:var(--k5-line-strong)] bg-[color:var(--k5-surface)]">
      <div className="k5-container py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-[color:var(--k5-line)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 bg-[color:var(--k5-accent)]"
                style={{ animation: "kierunki-dot 1.4s ease-in-out infinite" }}
              />
              <span className="k5-caps text-[14px]">GS ENERGIA</span>
            </div>
            <p className="mt-6 max-w-[34ch] text-[13.5px] text-[color:var(--k5-ink-muted)] leading-[1.65]">
              {SHARED.contact.address}
              <br />
              NIP {SHARED.contact.nip}
            </p>
            <p className="k5-mono mt-4 text-[12.5px] text-[color:var(--k5-ink)]">
              <a href={SHARED.contact.phoneHref} className="hover:text-[color:var(--k5-accent)] transition-colors">{SHARED.contact.phone}</a>
              <br />
              <a href={SHARED.contact.emailHref} className="hover:text-[color:var(--k5-accent)] transition-colors">{SHARED.contact.email}</a>
            </p>
          </div>

          <nav>
            <p className="k5-label">// USŁUGI</p>
            <ul className="mt-5 space-y-2.5">
              {SHARED.footer.navUslugi.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="text-[13px] text-[color:var(--k5-ink-muted)] hover:text-[color:var(--k5-accent)] transition-colors">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="k5-label">// FIRMA</p>
            <ul className="mt-5 space-y-2.5">
              {SHARED.footer.navFirma.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="text-[13px] text-[color:var(--k5-ink-muted)] hover:text-[color:var(--k5-accent)] transition-colors">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="k5-label">// SIGNALS</p>
            <ul className="mt-5 space-y-2.5 k5-mono text-[11.5px] text-[color:var(--k5-ink-muted)]">
              <li>Uptime: 99.98%</li>
              <li>Audits running: 14</li>
              <li>Rev. 2026.04</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 k5-label">
          <span>{SHARED.footer.copyright.toUpperCase()}</span>
          <span>K5 · INDUSTRIAL PREMIUM</span>
        </div>
      </div>
    </footer>
  );
}
