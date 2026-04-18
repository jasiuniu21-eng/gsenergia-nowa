// Services, stats, realizations, testimonials, news, contact, footer

function Services() {
  const groups = [
    {
      key: 'audyty',
      label: '01 · Audyty energetyczne',
      blurb: 'Mapujemy zużycie, wskazujemy straty, kwantyfikujemy oszczędności.',
      items: [
        {
          title: 'Audyt energetyczny przedsiębiorstwa',
          desc: 'Obowiązkowy dla dużych przedsiębiorstw co 4 lata. Analiza instalacji elektroenergetycznych, cieplnych, procesów produkcyjnych i transportu wewnętrznego. Raport zgodny z ustawą o efektywności energetycznej.',
          spec: 'ISO 50002 · Ustawa OEE',
        },
        {
          title: 'Audyt energetyczny budynku',
          desc: 'Szczegółowa ocena przegród budowlanych, źródeł ciepła, wentylacji i instalacji. Ranking działań modernizacyjnych według okresu zwrotu.',
          spec: 'PN-EN 16247',
        },
        {
          title: 'Świadectwa charakterystyki energetycznej',
          desc: 'Certyfikaty energetyczne wymagane przy sprzedaży, wynajmie lub oddaniu do użytku. Obiekty mieszkalne, biurowe, przemysłowe.',
          spec: 'Ustawa z 29.08.2014',
        },
      ],
    },
    {
      key: 'oze',
      label: '02 · Odnawialne źródła energii',
      blurb: 'Projektujemy i wdrażamy OZE dopasowane do profilu zużycia.',
      items: [
        {
          title: 'Fotowoltaika',
          desc: 'Instalacje PV dla firm i domów, farmy fotowoltaiczne oraz systemy BIPV zintegrowane z elewacją. Projekt, dobór komponentów, realizacja pod klucz.',
          spec: 'Od 10 kWp do 5 MWp',
        },
        {
          title: 'Pompy ciepła',
          desc: 'Dobór i projektowanie pomp powietrznych, gruntowych i wodnych. Ogrzewanie, chłodzenie i ciepła woda użytkowa dla obiektów kubaturowych.',
          spec: 'COP ≥ 4.0 · F-gas',
        },
        {
          title: 'Magazyny energii',
          desc: 'Systemy BESS — stabilizacja sieci, zasilanie awaryjne, peak shaving, arbitraż cenowy. Integracja z PV i systemem zarządzania.',
          spec: 'Li-ion · 50 kWh – 2 MWh',
        },
      ],
    },
    {
      key: 'efektywnosc',
      label: '03 · Efektywność energetyczna',
      blurb: 'Optymalizujemy to, co już macie. Bez inwestowania w nowe źródła.',
      items: [
        {
          title: 'Ocena efektywności urządzeń',
          desc: 'Pomiary sprawności kotłów, agregatów chłodniczych i instalacji klimatyzacji. Wskazanie strat i rekomendacje serwisowe.',
          spec: 'Kotły · HVAC · chłodnictwo',
        },
        {
          title: 'Kogeneracja',
          desc: 'Skojarzone wytwarzanie energii elektrycznej i ciepła (CHP). Dobór jednostki, analiza opłacalności, system wsparcia.',
          spec: 'Wsparcie CHP · ARE',
        },
        {
          title: 'Monitoring energii',
          desc: 'Systemy pomiaru, wizualizacji i zarządzania zużyciem energii w czasie rzeczywistym. Alerty anomalii, raporty miesięczne.',
          spec: 'EnMS · ISO 50001',
        },
      ],
    },
  ];

  return (
    <section className="gs-services" id="uslugi">
      <div className="gs-container">
        <div className="gs-section-head">
          <div className="gs-eyebrow">Usługi</div>
          <h2 className="gs-section-title">
            Pełen cykl energetyczny <em>pod jednym dachem</em> &mdash; od pierwszego pomiaru
            do uruchomienia nowej instalacji.
          </h2>
        </div>

        <div className="gs-services__groups">
          {groups.map((g) => (
            <div className="gs-services__group" key={g.key} id={g.key}>
              <div className="gs-services__group-head">
                <div className="gs-services__group-label">{g.label}</div>
                <div className="gs-services__group-blurb">{g.blurb}</div>
              </div>
              <div className="gs-services__cards">
                {g.items.map((it) => (
                  <article className="gs-svc" key={it.title}>
                    <div className="gs-svc__spec">{it.spec}</div>
                    <h3 className="gs-svc__title">{it.title}</h3>
                    <p className="gs-svc__desc">{it.desc}</p>
                    <a className="gs-svc__link" href="#konsultacja">
                      Zapytaj o wycenę <ArrowRight />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { kpi: '15', unit: 'lat', label: 'Doświadczenia w doradztwie energetycznym od 2009 roku.' },
    { kpi: '200+', unit: 'firm', label: 'Przedsiębiorstw i instytucji skorzystało z naszych wdrożeń.' },
    { kpi: '700', unit: 'mln PLN', label: 'Łączne, mierzalne oszczędności energii wygenerowane dla klientów.' },
    { kpi: '9', unit: 'usług', label: 'W portfolio — od audytu po realizację pod klucz.' },
  ];
  return (
    <section className="gs-stats" id="liczby">
      <div className="gs-container">
        <div className="gs-stats__grid">
          <div className="gs-stats__intro">
            <div className="gs-eyebrow gs-eyebrow--light">W liczbach</div>
            <h2 className="gs-stats__title">Mierzalny <em>zwrot</em>. Nie obietnice.</h2>
            <p className="gs-stats__body">
              Każda rekomendacja kończy się liczbą — kWh, PLN, tCO₂.
              Dlatego wracają do nas największe przedsiębiorstwa w Polsce.
            </p>
          </div>
          <div className="gs-stats__kpis">
            {items.map((it) => (
              <div className="gs-stat" key={it.kpi}>
                <div className="gs-stat__kpi">
                  <span className="gs-stat__num">{it.kpi}</span>
                  <span className="gs-stat__unit">{it.unit}</span>
                </div>
                <div className="gs-stat__label">{it.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Cases() {
  const cases = [
    {
      client: 'AGH Kraków',
      kind: 'Uczelnia wyższa',
      title: 'Audyt energetyczny kampusu + modernizacja źródła ciepła',
      result: 'Redukcja zużycia energii cieplnej o 23% w budynkach dydaktycznych.',
      year: '2022',
    },
    {
      client: 'Skanska',
      kind: 'Budownictwo',
      title: 'Charakterystyka energetyczna portfela obiektów biurowych',
      result: 'Świadectwa BREEAM-ready dla 14 projektów deweloperskich.',
      year: '2023',
    },
    {
      client: 'Deutsche Bank',
      kind: 'Bankowość',
      title: 'Monitoring energii i audyt przedsiębiorstwa oddziałów',
      result: 'System EnMS wdrożony w 38 placówkach, oszczędność 1.8 mln PLN/rok.',
      year: '2021',
    },
    {
      client: 'Mostostal',
      kind: 'Przemysł',
      title: 'Audyt zakładu produkcyjnego + projekt kogeneracji',
      result: 'CHP 1.2 MWe z okresem zwrotu 4.2 roku.',
      year: '2020',
    },
    {
      client: 'Kaufland',
      kind: 'Handel detaliczny',
      title: 'Fotowoltaika dachowa na obiektach handlowych',
      result: '12 MWp w 27 lokalizacjach, autokonsumpcja 92%.',
      year: '2023',
    },
    {
      client: 'Urząd Miasta',
      kind: 'Samorząd',
      title: 'Audyty budynków użyteczności publicznej',
      result: '42 placówki oświatowe z planem termomodernizacji.',
      year: '2024',
    },
  ];

  return (
    <section className="gs-cases" id="realizacje">
      <div className="gs-container">
        <div className="gs-section-head gs-section-head--split">
          <div>
            <div className="gs-eyebrow">Realizacje</div>
            <h2 className="gs-section-title">
              200+ wdrożeń. Dla firm, które <em>nie mogą sobie pozwolić</em> na pomyłkę.
            </h2>
          </div>
          <a href="#konsultacja" className="gs-btn gs-btn--ghost">Zobacz pełne portfolio <ArrowRight /></a>
        </div>
        <div className="gs-cases__grid">
          {cases.map((c, i) => (
            <article className="gs-case" key={i}>
              <div className="gs-case__img" aria-hidden="true">
                <div className="gs-case__img-overlay">
                  <div className="gs-case__client">{c.client}</div>
                  <div className="gs-case__kind">{c.kind} · {c.year}</div>
                </div>
              </div>
              <div className="gs-case__body">
                <h3 className="gs-case__title">{c.title}</h3>
                <p className="gs-case__result">{c.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote: 'Audyt GS Energia wskazał trzy obszary optymalizacji, których nie złapały nasze poprzednie analizy. Zwrot z rekomendacji w 18 miesięcy.',
      who: 'Dyrektor ds. Utrzymania Ruchu',
      org: 'Zakład produkcyjny, woj. małopolskie',
    },
    {
      quote: 'Inżynierowie, nie sprzedawcy. Przyszli, zmierzyli, pokazali liczby. Bez marketingu. To jest dokładnie to, czego szukaliśmy.',
      who: 'Property Manager',
      org: 'Portfel biurowy klasy A',
    },
    {
      quote: 'Projekt PV 4.8 MWp wdrożony bez jednej poprawki wykonawczej. Poziom dokumentacji porównywalny z biurem projektowym w Skandynawii.',
      who: 'Inwestor farmy fotowoltaicznej',
      org: 'Polska południowa',
    },
  ];
  return (
    <section className="gs-testi" id="opinie">
      <div className="gs-container">
        <div className="gs-eyebrow">Opinie klientów</div>
        <h2 className="gs-section-title gs-section-title--sm">Co mówią o nas dyrektorzy techniczni.</h2>
        <div className="gs-testi__grid">
          {items.map((t, i) => (
            <figure className="gs-testi__item" key={i}>
              <blockquote className="gs-testi__quote">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="gs-testi__who">
                <div className="gs-testi__who-name">{t.who}</div>
                <div className="gs-testi__who-org">{t.org}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="gs-partners">
          <div className="gs-partners__label">Certyfikaty i członkostwa</div>
          <div className="gs-partners__row">
            <span className="gs-partners__item">ZAE Zrzeszenie Audytorów Energetycznych</span>
            <span className="gs-partners__item">Ministerstwo Klimatu · wpis audytor</span>
            <span className="gs-partners__item">PN-EN ISO 50001</span>
            <span className="gs-partners__item">URE · koncesje</span>
            <span className="gs-partners__item">SEP · uprawnienia D/E</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function News() {
  const posts = [
    {
      tag: 'Regulacje',
      date: '04.2026',
      title: 'Obowiązkowy audyt energetyczny przedsiębiorstwa — co się zmienia w 2026?',
      read: '7 min',
    },
    {
      tag: 'Case study',
      date: '03.2026',
      title: 'Magazyn energii 1.2 MWh w zakładzie przetwórczym — analiza zwrotu.',
      read: '5 min',
    },
    {
      tag: 'Technologia',
      date: '02.2026',
      title: 'BIPV w projektach biurowych — kiedy ma sens, kiedy nie.',
      read: '9 min',
    },
  ];
  return (
    <section className="gs-news" id="aktualnosci">
      <div className="gs-container">
        <div className="gs-section-head gs-section-head--split">
          <div>
            <div className="gs-eyebrow">Aktualności</div>
            <h2 className="gs-section-title gs-section-title--sm">Analizy i komentarze naszego zespołu.</h2>
          </div>
          <a href="#" className="gs-btn gs-btn--ghost">Wszystkie wpisy <ArrowRight /></a>
        </div>
        <div className="gs-news__grid">
          {posts.map((p, i) => (
            <a className="gs-post" key={i} href="#">
              <div className="gs-post__meta">
                <span className="gs-post__tag">{p.tag}</span>
                <span className="gs-post__date">{p.date} · {p.read}</span>
              </div>
              <h3 className="gs-post__title">{p.title}</h3>
              <div className="gs-post__link">Czytaj <ArrowRight /></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = React.useState({ company: '', email: '', phone: '', topic: 'Audyt energetyczny', message: '' });
  const [sent, setSent] = React.useState(false);
  const topics = ['Audyt energetyczny','Fotowoltaika','Pompy ciepła','Magazyn energii','Monitoring energii','Inne — opiszę w wiadomości'];
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section className="gs-contact" id="konsultacja">
      <div className="gs-container">
        <div className="gs-contact__grid">
          <div className="gs-contact__info">
            <div className="gs-eyebrow gs-eyebrow--light">Kontakt</div>
            <h2 className="gs-contact__title">
              30 minut z&nbsp;audytorem. <em>Bezpłatnie.</em>
            </h2>
            <p className="gs-contact__lede">
              Zostaw kontakt — oddzwoni inżynier, nie sprzedawca. Przygotujemy wstępną rekomendację i szacunek oszczędności dla Twojego obiektu.
            </p>
            <ul className="gs-contact__list">
              <li><span>Telefon</span><a href="tel:+48606590931">+48 606 590 931</a></li>
              <li><span>E-mail</span><a href="mailto:biuro@gsenergia.pl">biuro@gsenergia.pl</a></li>
              <li><span>Biuro</span><span>ul. A. Prażmowskiego 9A<br/>30-399 Kraków</span></li>
              <li><span>Obsługujemy</span><span>Całą Polskę</span></li>
            </ul>
          </div>

          <form className="gs-contact__form" onSubmit={submit}>
            {!sent ? (
              <>
                <label className="gs-field">
                  <span className="gs-field__label">Firma / instytucja</span>
                  <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Nazwa podmiotu" />
                </label>
                <div className="gs-field-row">
                  <label className="gs-field">
                    <span className="gs-field__label">E-mail służbowy</span>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jan.kowalski@firma.pl" />
                  </label>
                  <label className="gs-field">
                    <span className="gs-field__label">Telefon</span>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+48" />
                  </label>
                </div>
                <label className="gs-field">
                  <span className="gs-field__label">Temat konsultacji</span>
                  <div className="gs-chips">
                    {topics.map(t => (
                      <button type="button" key={t}
                        className={`gs-chip ${form.topic === t ? 'is-on' : ''}`}
                        onClick={() => setForm({ ...form, topic: t })}>{t}</button>
                    ))}
                  </div>
                </label>
                <label className="gs-field">
                  <span className="gs-field__label">Krótki opis sytuacji</span>
                  <textarea rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Np. zakład 8 000 m², roczne zużycie ok. 2 GWh, szukamy rekomendacji OZE…" />
                </label>
                <div className="gs-contact__submit">
                  <button type="submit" className="gs-btn gs-btn--primary gs-btn--lg">
                    Wyślij — oddzwonimy w 24h <ArrowRight />
                  </button>
                  <span className="gs-contact__privacy">
                    Zgoda na kontakt w sprawie zapytania. Dane nie są używane w celach marketingowych.
                  </span>
                </div>
              </>
            ) : (
              <div className="gs-contact__ok">
                <div className="gs-contact__ok-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3>Dziękujemy.</h3>
                <p>Oddzwonimy pod podany numer w ciągu 24 godzin roboczych. W pilnych sprawach: <a href="tel:+48606590931">+48 606 590 931</a>.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="gs-footer" id="kontakt">
      <div className="gs-container">
        <div className="gs-footer__top">
          <div className="gs-footer__brand">
            <img src="assets/logo-white.png" alt="GS Energia" className="gs-footer__logo" />
            <div className="gs-footer__wordmark">GS ENERGIA</div>
            <p className="gs-footer__tag">
              Niezależni eksperci energetyczni. Od 2009 roku mapujemy przepływ energii w największych firmach w Polsce.
            </p>
          </div>
          <div className="gs-footer__cols">
            <div>
              <div className="gs-footer__col-label">Usługi</div>
              <ul>
                <li><a href="#audyty">Audyty energetyczne</a></li>
                <li><a href="#oze">Fotowoltaika</a></li>
                <li><a href="#oze">Pompy ciepła</a></li>
                <li><a href="#oze">Magazyny energii</a></li>
                <li><a href="#efektywnosc">Monitoring energii</a></li>
                <li><a href="#efektywnosc">Kogeneracja</a></li>
              </ul>
            </div>
            <div>
              <div className="gs-footer__col-label">Firma</div>
              <ul>
                <li><a href="#">O nas</a></li>
                <li><a href="#realizacje">Realizacje</a></li>
                <li><a href="#aktualnosci">Aktualności</a></li>
                <li><a href="#">Kariera</a></li>
              </ul>
            </div>
            <div>
              <div className="gs-footer__col-label">Kontakt</div>
              <ul>
                <li><a href="tel:+48606590931">+48 606 590 931</a></li>
                <li><a href="mailto:biuro@gsenergia.pl">biuro@gsenergia.pl</a></li>
                <li>ul. A. Prażmowskiego 9A</li>
                <li>30-399 Kraków</li>
                <li><a href="https://facebook.com/GS.GSENERGIA" target="_blank" rel="noopener">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="gs-footer__bottom">
          <div>© 2009–2026 GS Energia Sp. z o.o. · Wszystkie prawa zastrzeżone.</div>
          <div className="gs-footer__legal">
            <a href="#">Polityka prywatności</a>
            <a href="#">Regulamin</a>
            <a href="#">RODO</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Services = Services;
window.Stats = Stats;
window.Cases = Cases;
window.Testimonials = Testimonials;
window.News = News;
window.Contact = Contact;
window.Footer = Footer;
