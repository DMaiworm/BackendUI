// SG Hünstetten – Tweaks App
// Loaded after tweaks-panel.jsx

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#fde000",
  "ctaText": "Probetraining",
  "showFanshop": true,
  "showSponsors": true,
  "nextTraining": "Di., 29. Apr · 19:00 – 21:30 · Sporthalle Hünstetten",
  "galleryGrayscale": true
}/*EDITMODE-END*/;

function TweaksApp() {
  const [tweaks, setTweaks] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--gold', tweaks.accentColor);
    ['cta-nav','cta-hero'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const text = el.childNodes[0];
      if (text && text.nodeType === 3) text.textContent = tweaks.ctaText + ' ';
    });
    const td = document.getElementById('next-training-display');
    if (td) td.textContent = tweaks.nextTraining;
    const fanshop = document.getElementById('fanshop-section');
    if (fanshop) fanshop.style.display = tweaks.showFanshop ? '' : 'none';
    const sponsors = document.getElementById('sponsors-section');
    if (sponsors) sponsors.style.display = tweaks.showSponsors ? '' : 'none';
  }, [tweaks]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Branding">
        <TweakColor label="Akzentfarbe" value={tweaks.accentColor}
          onChange={v => setTweaks({ accentColor: v })} />
        <TweakText label="CTA Text" value={tweaks.ctaText}
          onChange={v => setTweaks({ ctaText: v })} />
      </TweakSection>
      <TweakSection title="KlubHaus Daten">
        <TweakText label="Nächstes Training" value={tweaks.nextTraining}
          onChange={v => setTweaks({ nextTraining: v })} />
      </TweakSection>
      <TweakSection title="Sektionen">
        <TweakToggle label="Fan-Shop" value={tweaks.showFanshop}
          onChange={v => setTweaks({ showFanshop: v })} />
        <TweakToggle label="Sponsoren" value={tweaks.showSponsors}
          onChange={v => setTweaks({ showSponsors: v })} />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
