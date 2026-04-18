// Tweaks panel: accent color, light/dark, hero variant

function Tweaks({ state, setState, defaults }) {
  const [visible, setVisible] = React.useState(false);
  const [minimized, setMinimized] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(_) {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  if (!visible) return null;

  const persist = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*'); } catch(_) {}
  };

  const accents = [
    { key: 'emerald', label: 'Emerald (default)', color: '#27AE60' },
    { key: 'forest',  label: 'Forest',            color: '#0f8a5f' },
    { key: 'teal',    label: 'Teal',              color: '#0aa5a5' },
    { key: 'amber',   label: 'Amber',             color: '#E2A63B' },
    { key: 'coral',   label: 'Coral',             color: '#E85A4F' },
    { key: 'violet',  label: 'Violet',            color: '#7A5AF8' },
  ];

  return (
    <aside className={`gs-tweaks ${minimized ? 'is-min' : ''}`} aria-label="Tweaks panel">
      <div className="gs-tweaks__head">
        <div className="gs-tweaks__title">Tweaks</div>
        <button className="gs-tweaks__min" onClick={() => setMinimized(!minimized)} aria-label="Minimize">
          {minimized ? '▢' : '–'}
        </button>
      </div>
      {!minimized && (
        <div className="gs-tweaks__body">
          <div className="gs-tweaks__group">
            <div className="gs-tweaks__label">Wariant hero</div>
            <div className="gs-tweaks__seg">
              <button className={state.heroVariant === 'konsultacja' ? 'is-on' : ''} onClick={() => persist({ heroVariant: 'konsultacja' })}>Konsultacja</button>
              <button className={state.heroVariant === 'inzynieria' ? 'is-on' : ''} onClick={() => persist({ heroVariant: 'inzynieria' })}>Inżynieria</button>
            </div>
            <div className="gs-tweaks__hint">
              {state.heroVariant === 'konsultacja'
                ? 'Jasna, edytorska — jak zeronest.pl.'
                : 'Ciemny granat + siatka techniczna.'}
            </div>
          </div>

          <div className="gs-tweaks__group">
            <div className="gs-tweaks__label">Tryb kolorystyczny</div>
            <div className="gs-tweaks__seg">
              <button className={state.theme === 'light' ? 'is-on' : ''} onClick={() => persist({ theme: 'light' })}>Jasny</button>
              <button className={state.theme === 'dark' ? 'is-on' : ''} onClick={() => persist({ theme: 'dark' })}>Ciemny</button>
            </div>
          </div>

          <div className="gs-tweaks__group">
            <div className="gs-tweaks__label">Kolor akcentu marki</div>
            <div className="gs-tweaks__swatches">
              {accents.map((a) => (
                <button
                  key={a.key}
                  className={`gs-tweaks__sw ${state.accent === a.key ? 'is-on' : ''}`}
                  style={{ '--sw': a.color }}
                  onClick={() => persist({ accent: a.key })}
                  title={a.label}
                  aria-label={a.label}
                />
              ))}
            </div>
            <div className="gs-tweaks__hint">Zmienia akcenty linków, CTA, diagramu Sankey.</div>
          </div>
        </div>
      )}
    </aside>
  );
}

window.Tweaks = Tweaks;
