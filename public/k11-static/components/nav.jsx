// Sticky top navigation with mega-menu
const { useState, useRef, useEffect } = React;

function Nav({ dark }) {
  const [openMenu, setOpenMenu] = useState(null); // 'services' | 'company' | null
  const [scrolled, setScrolled] = useState(false);
  const hideTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const open = (key) => {
    clearTimeout(hideTimer.current);
    setOpenMenu(key);
  };
  const scheduleClose = () => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const services = [
    {
      group: 'Audyty energetyczne',
      items: [
        { title: 'Audyt energetyczny przedsiębiorstwa', desc: 'Kompleksowa analiza efektywności zakładów przemysłowych' },
        { title: 'Audyt energetyczny budynku', desc: 'Ocena zużycia i rekomendacje oszczędnościowe' },
        { title: 'Świadectwa charakterystyki energetycznej', desc: 'Certyfikaty wymagane prawem' },
      ],
    },
    {
      group: 'Odnawialne źródła energii',
      items: [
        { title: 'Fotowoltaika', desc: 'Instalacje PV, farmy oraz systemy BIPV' },
        { title: 'Pompy ciepła', desc: 'Ogrzewanie i chłodzenie dla obiektów' },
        { title: 'Magazyny energii', desc: 'Magazynowanie i zasilanie awaryjne' },
      ],
    },
    {
      group: 'Efektywność energetyczna',
      items: [
        { title: 'Ocena efektywności urządzeń', desc: 'Kotły, klimatyzacja, systemy chłodnicze' },
        { title: 'Kogeneracja', desc: 'Skojarzone wytwarzanie prądu i ciepła' },
        { title: 'Monitoring energii', desc: 'Systemy zarządzania zużyciem' },
      ],
    },
  ];

  const company = [
    { title: 'O firmie', desc: '15 lat niezależnego doradztwa energetycznego' },
    { title: 'Realizacje', desc: '200+ wdrożeń dla czołowych przedsiębiorstw' },
    { title: 'Zespół', desc: 'Inżynierowie, audytorzy, projektanci' },
    { title: 'Kariera', desc: 'Dołącz do zespołu GS Energia' },
  ];

  return (
    <header className={`gs-nav ${scrolled ? 'is-scrolled' : ''} ${openMenu ? 'is-open' : ''}`}>
      <div className="gs-nav__inner">
        <a href="#top" className="gs-nav__brand" aria-label="GS Energia — strona główna">
          <img src={dark ? 'assets/logo-white.png' : 'assets/logo-navy.png'} alt="" className="gs-nav__logo" />
          <span className="gs-nav__wordmark">
            <span className="gs-nav__wordmark-main">GS ENERGIA</span>
            <span className="gs-nav__wordmark-sub">Eksperci OZE · od 2009</span>
          </span>
        </a>

        <nav className="gs-nav__links" aria-label="Główna nawigacja">
          <button
            className={`gs-nav__link ${openMenu === 'services' ? 'is-active' : ''}`}
            onMouseEnter={() => open('services')}
            onMouseLeave={scheduleClose}
            onClick={() => setOpenMenu(openMenu === 'services' ? null : 'services')}
            aria-expanded={openMenu === 'services'}
          >
            Usługi <Caret />
          </button>
          <button
            className={`gs-nav__link ${openMenu === 'company' ? 'is-active' : ''}`}
            onMouseEnter={() => open('company')}
            onMouseLeave={scheduleClose}
            onClick={() => setOpenMenu(openMenu === 'company' ? null : 'company')}
            aria-expanded={openMenu === 'company'}
          >
            Firma <Caret />
          </button>
          <a className="gs-nav__link" href="#realizacje">Realizacje</a>
          <a className="gs-nav__link" href="#aktualnosci">Aktualności</a>
          <a className="gs-nav__link" href="#kontakt">Kontakt</a>
        </nav>

        <div className="gs-nav__cta">
          <a href="tel:+48606590931" className="gs-nav__phone" aria-label="Zadzwoń">
            <PhoneIcon /> +48 606 590 931
          </a>
          <a href="#konsultacja" className="gs-btn gs-btn--primary gs-btn--sm">
            Umów konsultację
          </a>
        </div>
      </div>

      {/* Mega menus */}
      <div
        className={`gs-mega ${openMenu === 'services' ? 'is-visible' : ''}`}
        onMouseEnter={() => open('services')}
        onMouseLeave={scheduleClose}
        aria-hidden={openMenu !== 'services'}
      >
        <div className="gs-mega__inner gs-mega__inner--wide">
          {services.map((col) => (
            <div className="gs-mega__col" key={col.group}>
              <div className="gs-mega__eyebrow">{col.group}</div>
              <ul className="gs-mega__list">
                {col.items.map((it) => (
                  <li key={it.title}>
                    <a href={`#${slug(it.title)}`} className="gs-mega__item">
                      <span className="gs-mega__item-title">{it.title}</span>
                      <span className="gs-mega__item-desc">{it.desc}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="gs-mega__feature">
            <div className="gs-mega__feature-label">Nie wiesz od czego zacząć?</div>
            <div className="gs-mega__feature-title">Bezpłatna konsultacja z audytorem</div>
            <div className="gs-mega__feature-desc">
              30 min rozmowy z inżynierem — otrzymasz wstępną rekomendację i szacunek oszczędności.
            </div>
            <a href="#konsultacja" className="gs-mega__feature-cta">
              Umów termin <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      <div
        className={`gs-mega ${openMenu === 'company' ? 'is-visible' : ''}`}
        onMouseEnter={() => open('company')}
        onMouseLeave={scheduleClose}
        aria-hidden={openMenu !== 'company'}
      >
        <div className="gs-mega__inner">
          <div className="gs-mega__col gs-mega__col--wide">
            <div className="gs-mega__eyebrow">Firma</div>
            <ul className="gs-mega__list">
              {company.map((it) => (
                <li key={it.title}>
                  <a href="#" className="gs-mega__item">
                    <span className="gs-mega__item-title">{it.title}</span>
                    <span className="gs-mega__item-desc">{it.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="gs-mega__feature">
            <div className="gs-mega__feature-label">W liczbach</div>
            <div className="gs-mega__stats">
              <div><b>15</b><span>lat na rynku</span></div>
              <div><b>200+</b><span>firm i instytucji</span></div>
              <div><b>700 mln</b><span>PLN oszczędności</span></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Caret() {
  return (
    <svg className="gs-caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.8a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.35 1.84.59 2.8.72A2 2 0 0122 16.92z"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi,'-').replace(/^-|-$/g,'');}

window.Nav = Nav;
