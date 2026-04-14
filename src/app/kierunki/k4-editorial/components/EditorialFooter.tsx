import { SHARED } from "../../_data/content";

export function EditorialFooter() {
  return (
    <footer className="pt-20 pb-10 border-t border-[color:var(--k4-line-strong)]">
      <div className="k4-container">
        <div className="grid md:grid-cols-3 gap-10 pb-16">
          <div>
            <p className="k4-display text-[2rem] leading-[1]">
              GS <span className="k4-italic text-[color:var(--k4-accent)]">Energia</span>
            </p>
            <p className="mt-6 max-w-[36ch] text-[14.5px] leading-[1.6] text-[color:var(--k4-ink-muted)]">
              {SHARED.contact.address}
            </p>
            <p className="k4-mono mt-3 text-[13px] text-[color:var(--k4-ink)]">
              NIP {SHARED.contact.nip}
            </p>
          </div>

          <nav>
            <p className="k4-label">— Usługi</p>
            <ul className="mt-5 space-y-3">
              {SHARED.footer.navUslugi.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="text-[14px] text-[color:var(--k4-ink)] hover:text-[color:var(--k4-accent)] transition-colors">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="k4-label">— Kontakt</p>
            <ul className="mt-5 space-y-3 k4-mono text-[13.5px]">
              <li>
                <a href={SHARED.contact.phoneHref} className="text-[color:var(--k4-ink)] hover:text-[color:var(--k4-accent)] transition-colors">
                  {SHARED.contact.phone}
                </a>
              </li>
              <li>
                <a href={SHARED.contact.emailHref} className="text-[color:var(--k4-ink)] hover:text-[color:var(--k4-accent)] transition-colors">
                  {SHARED.contact.email}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[color:var(--k4-line)] k4-label">
          <span>{SHARED.footer.copyright}</span>
          <span>K4 · Editorial Minimal</span>
        </div>
      </div>
    </footer>
  );
}
