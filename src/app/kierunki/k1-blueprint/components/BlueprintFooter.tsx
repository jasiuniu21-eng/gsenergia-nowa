import { SHARED } from "../../_data/content";

export function BlueprintFooter() {
  return (
    <footer className="border-t border-[color:var(--k1-line-strong)] bg-[color:var(--k1-bg)]">
      <div className="k1-container py-16 lg:py-20">
        {/* Drawing titleblock */}
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-10 pb-10 border-b border-[color:var(--k1-line)]">
          <div>
            <p className="k1-label">Registered office</p>
            <p className="k1-display mt-4 text-[1.35rem]">GS Energia</p>
            <p className="mt-3 text-[14px] text-[color:var(--k1-ink-muted)] leading-[1.6]">
              {SHARED.contact.address}
              <br />
              NIP {SHARED.contact.nip}
            </p>
            <p className="k1-mono mt-4 text-[12px] text-[color:var(--k1-ink)]">
              <a href={SHARED.contact.phoneHref}>{SHARED.contact.phone}</a>
              <br />
              <a href={SHARED.contact.emailHref}>{SHARED.contact.email}</a>
            </p>
          </div>

          <nav>
            <p className="k1-label">Usługi</p>
            <ul className="mt-4 space-y-2.5">
              {SHARED.footer.navUslugi.slice(0, 7).map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="text-[13px] text-[color:var(--k1-ink-muted)] hover:text-[color:var(--k1-ink)] transition-colors"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="k1-label">Firma</p>
            <ul className="mt-4 space-y-2.5">
              {SHARED.footer.navFirma.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="text-[13px] text-[color:var(--k1-ink-muted)] hover:text-[color:var(--k1-ink)] transition-colors"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 k1-label">
          <span>{SHARED.footer.copyright}</span>
          <span>DWG · GSE / 2026-04 · K1 Blueprint</span>
        </div>
      </div>
    </footer>
  );
}
