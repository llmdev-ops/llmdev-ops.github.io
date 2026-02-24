/* ══════════════════════════════════════════
   THEME LOADER v3
   ══════════════════════════════════════════ */

const PALETTES = {
  yellow:   { main: '#f1e3a6', alt: '#e8d48a' },
  beige:    { main: '#d6cbbd', alt: '#c9baa8' },
  sage:     { main: '#c7d4b7', alt: '#b5c7a0' },
  lavender: { main: '#dbd3e8', alt: '#cbbfdc' },
  blue:     { main: '#cedff4', alt: '#b8d0ee' },
};

const FONTS = {
  jakarta: { url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap', family: "'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif" },
  inter:   { url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap', family: "'Inter','Segoe UI',system-ui,sans-serif" },
  dm:      { url: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap', family: "'DM Sans','Segoe UI',system-ui,sans-serif" },
  outfit:  { url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap', family: "'Outfit','Segoe UI',system-ui,sans-serif" },
};

// Presets : valeurs COMPLÈTES, autoritatives
const PRESETS = {
  zenvalue: { couleur_primaire:'#aac335', couleur_sombre:'#414142', palette_complementaire:'yellow',   typographie:'jakarta', rayon_boutons:4,  ombre_activee:true,  hero_fond_droite:'dark' },
  ocean:    { couleur_primaire:'#2e7cf6', couleur_sombre:'#1a2332', palette_complementaire:'blue',     typographie:'inter',   rayon_boutons:8,  ombre_activee:true,  hero_fond_droite:'dark' },
  earth:    { couleur_primaire:'#8b6f4e', couleur_sombre:'#2c2016', palette_complementaire:'beige',    typographie:'dm',      rayon_boutons:2,  ombre_activee:false, hero_fond_droite:'dark' },
  bloom:    { couleur_primaire:'#9b59b6', couleur_sombre:'#2d1b3d', palette_complementaire:'lavender', typographie:'outfit',  rayon_boutons:24, ombre_activee:true,  hero_fond_droite:'dark' },
};

// ── Utilitaires couleurs ──────────────────
function hexToRgb(hex) {
  const h = (hex||'#000000').replace('#','');
  return { r:parseInt(h.slice(0,2),16)||0, g:parseInt(h.slice(2,4),16)||0, b:parseInt(h.slice(4,6),16)||0 };
}
function toHex(r,g,b) {
  return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
}
function lighten(hex,a){ const {r,g,b}=hexToRgb(hex); return toHex(r+(255-r)*a,g+(255-g)*a,b+(255-b)*a); }
function darken(hex,a) { const {r,g,b}=hexToRgb(hex); return toHex(r*(1-a),g*(1-a),b*(1-a)); }
function rgba(hex,a)   { const {r,g,b}=hexToRgb(hex); return `rgba(${r},${g},${b},${a})`; }

// ── Application du thème ─────────────────
function applyTheme(raw) {
  const root = document.documentElement;

  // ── RÈGLE CLÉ ──
  // Si un preset est sélectionné (pas "custom"), on utilise UNIQUEMENT
  // ses valeurs — les champs individuels du CMS sont ignorés.
  // Si "custom", on utilise uniquement les champs individuels.
  let t;
  if (raw.preset && raw.preset !== 'custom' && PRESETS[raw.preset]) {
    t = PRESETS[raw.preset];
    console.info('[ZV Theme] Preset appliqué :', raw.preset);
  } else {
    t = raw;
    console.info('[ZV Theme] Thème personnalisé appliqué');
  }

  // 1. Couleurs primaires
  const primary = t.couleur_primaire || '#aac335';
  const dark    = t.couleur_sombre   || '#414142';

  console.info('[ZV Theme] Couleurs →', primary, dark);

  root.style.setProperty('--zv-green',    primary);
  root.style.setProperty('--zv-green-dk', darken(primary, 0.15));
  root.style.setProperty('--zv-green-lt', lighten(primary, 0.30));
  root.style.setProperty('--zv-green-bg', lighten(primary, 0.82));
  root.style.setProperty('--zv-dark',     dark);
  root.style.setProperty('--zv-gray',     lighten(dark, 0.55));
  root.style.setProperty('--hero-circle-color',       rgba(primary, 0.16));
  root.style.setProperty('--hero-circle-color-inner', rgba(primary, 0.08));

  // 2. Palette complémentaire → alimente bg-yellow, bg-sage, bg-accent
  const palKey = t.palette_complementaire || 'yellow';
  const pal    = PALETTES[palKey] || PALETTES.yellow;
  console.info('[ZV Theme] Palette →', palKey, pal.main);

  root.style.setProperty('--accent-section',     pal.main);
  root.style.setProperty('--accent-section-alt', pal.alt);
  // Mettre à jour toutes les variables de palette pour les usages directs
  Object.entries(PALETTES).forEach(([k,v]) => root.style.setProperty(`--cp-${k}`, v.main));

  // 3. Rayon boutons
  const radius = parseInt(t.rayon_boutons, 10);
  root.style.setProperty('--radius', `${isNaN(radius) ? 4 : radius}px`);

  // 4. Ombre
  root.style.setProperty('--shadow',
    t.ombre_activee === false ? 'none' : '0 2px 24px rgba(65,65,66,.08)'
  );

  // 5. Typographie
  const fontKey = t.typographie || 'jakarta';
  const font    = FONTS[fontKey] || FONTS.jakarta;
  let fontLink  = document.querySelector('link[data-theme-font]');
  if (!fontLink) {
    fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.setAttribute('data-theme-font', '');
    document.head.appendChild(fontLink);
  }
  if (fontLink.href !== font.url) fontLink.href = font.url;
  root.style.setProperty('--ff', font.family);

  // Police custom
  if (fontKey === 'custom' && t.typographie_custom_url) {
    fontLink.href = t.typographie_custom_url;
    root.style.setProperty('--ff', t.typographie_custom_family || "'Segoe UI',system-ui,sans-serif");
  }

  // 6. Fond hero droit
  const heroRight = document.querySelector('.hero-right');
  if (heroRight) {
    heroRight.classList.remove('hero-bg-dark','hero-bg-green','hero-bg-accent');
    heroRight.classList.add(`hero-bg-${t.hero_fond_droite || 'dark'}`);
  }
}

// ── Chargement ───────────────────────────
async function loadTheme() {
  const url = 'content/settings/theme.json?_=' + Date.now();
  console.info('[ZV Theme] Chargement depuis :', url);

  try {
    const res = await fetch(url, { cache: 'no-store' });
    console.info('[ZV Theme] Réponse HTTP :', res.status);

    if (!res.ok) throw new Error(`HTTP ${res.status} — fichier introuvable`);

    const json = await res.json();
    console.info('[ZV Theme] JSON reçu :', JSON.stringify(json));

    applyTheme(json);

  } catch(e) {
    console.warn('[ZV Theme] Erreur — thème par défaut conservé.', e.message);
  }
}

loadTheme();
