import { SHARED } from "../../_data/content";

export function WarmFooter() {
  return (
    <footer className="bg-[color:var(--k2-surface)] border-t border-[color:var(--k2-line-strong)]">
      <div className="k2-container py-20">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-[color:var(--k2-line)]">
          <div>
            <p className="k2-display text-[1.75rem]">
              GS <span className="k2-italic text-[color:var(--k2-accent)]">Energia</span>
            </p>
            <p className="mt-4 max-w-[32ch] text-[14px] text-[color:var(--k2-ink-muted)] leading-[1.6]">
              Audyty energetyczne dla zakładów produkcyjnych w Polsce.
              Od 2008 roku.
            </p>
            <p className="mt-6 k2-mono text-[12.5px] text-[color:var(--k2-ink)]">
              {SHARED.contact.address}
              <br />
              NIP {SHARED.contact.nip}
            </p>
          </div>

          <nav>
            <p className="k2-label">Usługi</p>
            <ul className="mt-4 space-y-2.5">
              {SHARED.footer.navUslugi.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="text-[13.5px] text-[color:var(--k2-ink-muted)] hover:text-[color:var(--k2-accent)] transition-colors"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="k2-label">Firma</p>
            <ul className="mt-4 space-y-2.5">
              {SHARED.footer.navFirma.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="text-[13.5px] text-[color:var(--k2-ink-muted)] hover:text-[color:var(--k2-accent)] transition-colors"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="k2-label">Kontakt</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={SHARED.contact.phoneHref}
                  className="text-[13.5px] text-[color:var(--k2-ink-muted)] hover:text-[color:var(--k2-accent)] transition-colors"
                >
                  {SHARED.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={SHARED.contact.emailHref}
                  className="text-[13.5px] text-[color:var(--k2-ink-muted)] hover:text-[color:var(--k2-accent)] transition-colors"
                >
                  {SHARED.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 k2-label">
          <span>{SHARED.footer.copyright}</span>
          <span>K2 · Warm Authority</span>
        </div>
      </div>
    </footer>
  );
}
