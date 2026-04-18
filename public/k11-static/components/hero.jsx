// Hero with original Sankey-diagram welcome animation
const { useEffect: useEffectH, useRef: useRefH, useState: useStateH } = React;

function Hero({ variant, dark }) {
  // variant: 'konsultacja' | 'inzynieria'
  const [phase, setPhase] = useStateH(0); // 0 idle, 1 lines drawing, 2 labels, 3 headline, 4 done
  const wrapRef = useRefH(null);

  useEffectH(() => {
    const t1 = setTimeout(() => setPhase(1), 250);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setPhase(3), 2600);
    const t4 = setTimeout(() => setPhase(4), 4200);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [variant]);

  const replay = () => {
    setPhase(0);
    requestAnimationFrame(() => {
      setPhase(1);
      setTimeout(() => setPhase(2), 1350);
      setTimeout(() => setPhase(3), 2350);
      setTimeout(() => setPhase(4), 3950);
    });
  };

  return (
    <section className={`gs-hero gs-hero--${variant} ${dark ? 'is-dark' : ''}`} id="top" ref={wrapRef} data-phase={phase}>
      <div className="gs-hero__grid-bg" aria-hidden="true">
        <GridPattern />
      </div>

      <SankeyDiagram phase={phase} variant={variant} />

      <div className="gs-hero__content">
        <div className="gs-hero__eyebrow">
          <span className="gs-hero__pulse" />
          EKSPERCI ENERGETYCZNI · KRAKÓW · OD 2009
        </div>

        {variant === 'konsultacja' ? (
          <h1 className="gs-hero__title">
            <span className="gs-hero__title-line" style={{ '--i': 0 }}>Mapujemy przepływ energii</span>
            <span className="gs-hero__title-line gs-hero__title-line--accent" style={{ '--i': 1 }}>w&nbsp;Twojej&nbsp;firmie.</span>
            <span className="gs-hero__title-line" style={{ '--i': 2 }}>Zamieniamy&nbsp;go w&nbsp;oszczędności.</span>
          </h1>
        ) : (
          <h1 className="gs-hero__title">
            <span className="gs-hero__title-line" style={{ '--i': 0 }}>Audyt. Projekt. Wdrożenie.</span>
            <span className="gs-hero__title-line gs-hero__title-line--accent" style={{ '--i': 1 }}>Jeden partner</span>
            <span className="gs-hero__title-line" style={{ '--i': 2 }}>od analizy po kilowat.</span>
          </h1>
        )}

        <p className="gs-hero__lede">
          Niezależne doradztwo energetyczne dla firm, instytucji i samorządów.
          <br className="gs-br" />
          Audyty, OZE i efektywność &mdash; od strategii po realizację pod klucz.
        </p>

        <div className="gs-hero__cta">
          <a href="#konsultacja" className="gs-btn gs-btn--primary">
            Umów bezpłatną konsultację <ArrowRight />
          </a>
          <a href="#uslugi" className="gs-btn gs-btn--ghost">
            Zobacz usługi
          </a>
        </div>

        <div className="gs-hero__trust">
          <span className="gs-hero__trust-label">Zaufali nam</span>
          <div className="gs-hero__trust-logos">
            <TrustLogo>AGH Kraków</TrustLogo>
            <TrustLogo>Skanska</TrustLogo>
            <TrustLogo>Deutsche Bank</TrustLogo>
            <TrustLogo>Mostostal</TrustLogo>
            <TrustLogo>Kaufland</TrustLogo>
          </div>
        </div>
      </div>

      <button className="gs-hero__replay" onClick={replay} aria-label="Odtwórz animację">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Odtwórz animację
      </button>
    </section>
  );
}

function TrustLogo({ children }) {
  return <span className="gs-hero__trust-logo">{children}</span>;
}

function GridPattern() {
  return (
    <svg width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="gs-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gs-grid)"/>
    </svg>
  );
}

/**
 * The signature Sankey flow animation:
 * Left side: single "Energia" bar →
 * splits into 9 services (3 groups) drawn with SVG strokes that animate via stroke-dashoffset →
 * reconverges on the right into "700 mln PLN oszczędności"
 */
function SankeyDiagram({ phase, variant }) {
  const services = [
    { label: 'Audyt przedsiębiorstwa', group: 0 },
    { label: 'Audyt budynku', group: 0 },
    { label: 'Świadectwa energ.', group: 0 },
    { label: 'Fotowoltaika', group: 1 },
    { label: 'Pompy ciepła', group: 1 },
    { label: 'Magazyny energii', group: 1 },
    { label: 'Ocena urządzeń', group: 2 },
    { label: 'Kogeneracja', group: 2 },
    { label: 'Monitoring energii', group: 2 },
  ];

  const W = 1400, H = 680;
  const leftX = 120, rightX = W - 120;
  const midLeft = W * 0.34;
  const midRight = W * 0.66;

  // input/output anchor positions
  const inputY = H / 2;
  const outputY = H / 2;

  // fanout y positions on left (after widen) and right (before narrow)
  const topY = 110;
  const gap = (H - 220) / (services.length - 1);

  return (
    <div className="gs-sankey" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="gs-flow-a" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--sankey-from)" stopOpacity="0.85"/>
            <stop offset="100%" stopColor="var(--sankey-to)" stopOpacity="0.85"/>
          </linearGradient>
          <linearGradient id="gs-flow-b" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.65"/>
          </linearGradient>
          <filter id="gs-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.4"/>
          </filter>
        </defs>

        {/* Input trunk */}
        <g className="gs-sankey__trunk gs-sankey__trunk--in">
          <rect x={leftX - 16} y={inputY - 60} width="8" height="120" rx="2" fill="var(--sankey-from)" opacity="0.9" />
          <text x={leftX - 30} y={inputY - 70} textAnchor="end" className="gs-sankey__trunk-label">ENERGIA WEJŚCIOWA</text>
          <text x={leftX - 30} y={inputY - 52} textAnchor="end" className="gs-sankey__trunk-sub">stan obecny</text>
          <line x1={leftX - 8} y1={inputY} x2={leftX + 20} y2={inputY} stroke="var(--sankey-from)" strokeWidth="2" />
        </g>

        {/* Output trunk */}
        <g className="gs-sankey__trunk gs-sankey__trunk--out">
          <rect x={rightX + 8} y={outputY - 60} width="8" height="120" rx="2" fill="var(--accent)" />
          <text x={rightX + 30} y={outputY - 70} className="gs-sankey__trunk-label">OSZCZĘDNOŚCI</text>
          <text x={rightX + 30} y={outputY - 52} className="gs-sankey__trunk-sub">mierzalne · 700 mln PLN łącznie</text>
          <line x1={rightX - 20} y1={outputY} x2={rightX + 8} y2={outputY} stroke="var(--accent)" strokeWidth="2" />
        </g>

        {/* Flow lines — each service is a bezier curve split into two arcs */}
        {services.map((s, i) => {
          const y = topY + gap * i;
          const delay = i * 0.11;
          const d1 = `M ${leftX + 20} ${inputY} C ${midLeft} ${inputY}, ${midLeft} ${y}, ${W/2} ${y}`;
          const d2 = `M ${W/2} ${y} C ${midRight} ${y}, ${midRight} ${outputY}, ${rightX - 20} ${outputY}`;
          return (
            <g key={i} className="gs-sankey__flow" style={{ '--delay': `${delay}s` }}>
              <path d={d1} className="gs-sankey__path gs-sankey__path--in" stroke="url(#gs-flow-a)" />
              <path d={d2} className="gs-sankey__path gs-sankey__path--out" stroke="url(#gs-flow-b)" />
              <circle cx={W/2} cy={y} r="3" className="gs-sankey__node" />
              <text x={W/2 + 10} y={y - 6} className="gs-sankey__node-label" data-group={s.group}>{s.label}</text>
              {/* Traveling particle */}
              <circle r="2.5" className="gs-sankey__particle" style={{ '--delay': `${delay + 2}s` }}>
                <animateMotion dur="4.5s" repeatCount="indefinite" begin={`${delay + 2.3}s`} path={d1 + ' ' + d2.replace(/^M[^C]+/, '')} />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

window.Hero = Hero;
