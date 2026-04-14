import { SHARED } from "../../_data/content";

export function DashboardFooter() {
  return (
    <footer className="border-t border-[color:var(--k3-line)] bg-[color:var(--k3-bg)]">
      <div className="k3-container py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-[color:var(--k3-line)]">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block size-[10px] rounded-full bg-[color:var(--k3-accent)]"
                style={{ animation: "kierunki-dot 1.6s ease-in-out infinite" }}
                aria-hidden="true"
              />
              <span className="k3-label text-[color:var(--k3-accent)]">system operational</span>
            </div>
            <p className="k3-display mt-4 text-[1.5rem]">GS Energia</p>
            <p className="mt-3 text-[13px] text-[color:var(--k3-ink-muted)] leading-[1.6]">
              {SHARED.contact.address}
              <br />
              NIP {SHARED.contact.nip}
            </p>
            <p className="k3-mono mt-4 text-[12px] text-[color:var(--k3-ink)]">
              <a href={SHARED.contact.phoneHref} className="hover:text-[color:var(--k3-accent)] transition-colors">{SHARED.contact.phone}</a>
              <br />
              <a href={SHARED.contact.emailHref} className="hover:text-[color:var(--k3-accent)] transition-colors">{SHARED.contact.email}</a>
            </p>
          </div>

          <nav>
            <p className="k3-label">[01] Usługi</p>
            <ul className="mt-4 space-y-2.5">
              {SHARED.footer.navUslugi.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="text-[12.5px] text-[color:var(--k3-ink-muted)] hover:text-[color:var(--k3-accent)] transition-colors">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="k3-label">[02] Firma</p>
            <ul className="mt-4 space-y-2.5">
              {SHARED.footer.navFirma.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="text-[12.5px] text-[color:var(--k3-ink-muted)] hover:text-[color:var(--k3-accent)] transition-colors">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="k3-label">[03] Signals</p>
            <ul className="mt-4 space-y-2.5 k3-mono text-[11.5px] text-[color:var(--k3-ink-muted)]">
              <li>Uptime: 99.98%</li>
              <li>Audits ongoing: 14</li>
              <li>Next release: Q2 2026</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 k3-label">
          <span>{SHARED.footer.copyright}</span>
          <span>K3 · Data Dashboard</span>
        </div>
      </div>
    </footer>
  );
}
