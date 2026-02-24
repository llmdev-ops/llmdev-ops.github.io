/* ══════════════════════════════════════════
   THEME LOADER
   Charge /content/settings/theme.json
   et surcharge les variables CSS :root en live
   ══════════════════════════════════════════ */

// Palettes complémentaires disponibles
const PALETTES = {
  yellow:   { cp: '#f1e3a6', name: 'Jaune doux'       },
  beige:    { cp: '#d6cbbd', name: 'Beige naturel'     },
  sage:     { cp: '#c7d4b7', name: 'Vert sauge'        },
  lavender: { cp: '#dbd3e8', name: 'Lavande'           },
  blue:     { cp: '#cedff4', name: 'Bleu ciel'         },
};

// Polices disponibles
const FONTS = {
  jakarta: {
    url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap',
    family: "'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif",
  },
  inter: {
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    family: "'Inter', 'Segoe UI', system-ui, sans-serif",
  },
  dm: {
    url: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap',
    family: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
  },
  outfit: {
    url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
    family: "'Outfit', 'Segoe UI', system-ui, sans-serif",
  },
  custom: { url: null, family: null },
};

// Presets de thèmes complets
const PRESETS = {
  zenvalue: {
    couleur_primaire: '#aac335',
    couleur_sombre:   '#414142',
    palette_complementaire: 'yellow',
    typographie: 'jakarta',
    rayon_boutons: '4',
    ombre_activee: true,
    hero_fond_droite: 'dark',
  },
  ocean: {
    couleur_primaire: '#2e7cf6',
    couleur_sombre:   '#1a2332',
    palette_complementaire: 'blue',
    typographie: 'inter',
    rayon_boutons: '8',
    ombre_activee: true,
    hero_fond_droite: 'dark',
  },
  earth: {
    couleur_primaire: '#8b6f4e',
    couleur_sombre:   '#2c2016',
    palette_complementaire: 'beige',
    typographie: 'dm',
    rayon_boutons: '2',
    ombre_activee: false,
    hero_fond_droite: 'dark',
  },
  bloom: {
    couleur_primaire: '#9b59b6',
    couleur_sombre:   '#2d1b3d',
    palette_complementaire: 'lavender',
    typographie: 'outfit',
    rayon_boutons: '24',
    ombre_activee: true,
    hero_fond_droite: 'dark',
  },
};

// Dériver les variantes d'une couleur primaire hex
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return { r, g, b };
}

function lighten(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const lR = Math.min(255, Math.round(r + (255 - r) * amount));
  const lG = Math.min(255, Math.round(g + (255 - g) * amount));
  const lB = Math.min(255, Math.round(b + (255 - b) * amount));
  return `#${lR.toString(16).padStart(2,'0')}${lG.toString(16).padStart(2,'0')}${lB.toString(16).padStart(2,'0')}`;
}

function darken(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const dR = Math.max(0, Math.round(r * (1 - amount)));
  const dG = Math.max(0, Math.round(g * (1 - amount)));
  const dB = Math.max(0, Math.round(b * (1 - amount)));
  return `#${dR.toString(16).padStart(2,'0')}${dG.toString(16).padStart(2,'0')}${dB.toString(16).padStart(2,'0')}`;
}

// Appliquer le thème sur :root
function applyTheme(t) {
  const root = document.documentElement;

  // Fusionner avec le preset si demandé
  const base = t.preset && t.preset !== 'custom' && PRESETS[t.preset]
    ? { ...PRESETS[t.preset], ...t }
    : t;

  // ── Couleurs ──
  const primary = base.couleur_primaire || '#aac335';
  const dark    = base.couleur_sombre   || '#414142';

  root.style.setProperty('--zv-green',    primary);
  root.style.setProperty('--zv-green-dk', darken(primary, 0.15));
  root.style.setProperty('--zv-green-lt', lighten(primary, 0.3));
  root.style.setProperty('--zv-green-bg', lighten(primary, 0.82));
  root.style.setProperty('--zv-dark',     dark);
  root.style.setProperty('--zv-gray',     lighten(dark, 0.55));

  // ── Palette complémentaire ──
  const palKey = base.palette_complementaire || 'yellow';
  const pal    = PALETTES[palKey] || PALETTES.yellow;
  root.style.setProperty('--cp-accent', pal.cp);
  // Remapper les usages des couleurs complémentaires
  root.style.setProperty('--cp-yellow',   PALETTES.yellow.cp);
  root.style.setProperty('--cp-beige',    PALETTES.beige.cp);
  root.style.setProperty('--cp-sage',     PALETTES.sage.cp);
  root.style.setProperty('--cp-lavender', PALETTES.lavender.cp);
  root.style.setProperty('--cp-blue',     PALETTES.blue.cp);
  // Couleur accent principale (sections co-construction, RSE…)
  root.style.setProperty('--accent-section', pal.cp);

  // ── Rayon boutons ──
  const radius = parseInt(base.rayon_boutons, 10) || 4;
  root.style.setProperty('--radius', `${radius}px`);

  // ── Ombre ──
  if (base.ombre_activee === false) {
    root.style.setProperty('--shadow', 'none');
  } else {
    root.style.setProperty('--shadow', '0 2px 24px rgba(65,65,66,.08)');
  }

  // ── Typographie ──
  const fontKey = base.typographie || 'jakarta';
  const font    = FONTS[fontKey] || FONTS.jakarta;

  // Police custom (URL fournie dans le CMS)
  const fontUrl = fontKey === 'custom'
    ? base.typographie_custom_url
    : font.url;

  const fontFamily = fontKey === 'custom'
    ? (base.typographie_custom_family || "'Segoe UI', system-ui, sans-serif")
    : font.family;

  // Injecter la Google Font si pas déjà chargée
  if (fontUrl && !document.querySelector(`link[data-theme-font]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    link.setAttribute('data-theme-font', fontKey);
    document.head.appendChild(link);
  } else if (fontUrl) {
    const existing = document.querySelector('link[data-theme-font]');
    if (existing && existing.href !== fontUrl) {
      existing.href = fontUrl;
      existing.setAttribute('data-theme-font', fontKey);
    }
  }

  root.style.setProperty('--ff', fontFamily);

  // ── Hero fond droit ──
  // (dark | green | accent) — géré via une classe sur le hero-right
  const heroRight = document.querySelector('.hero-right');
  if (heroRight) {
    heroRight.className = heroRight.className.replace(/hero-bg-\w+/g, '');
    heroRight.classList.add(`hero-bg-${base.hero_fond_droite || 'dark'}`);
  }

  console.info('[Theme] Appliqué :', base.preset || 'custom', { primary, dark, font: fontKey });
}

// ── Point d'entrée ──────────────────────────
async function loadTheme() {
  try {
    const res = await fetch('/content/settings/theme.json?v=' + Date.now());
    if (!res.ok) throw new Error('theme.json introuvable');
    const theme = await res.json();
    applyTheme(theme);
  } catch (e) {
    console.warn('[Theme] Utilisation du thème par défaut. (' + e.message + ')');
    // Thème Zen Value par défaut — aucune surcharge
  }
}

// Lancer dès que possible (avant le paint si possible)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadTheme);
} else {
  loadTheme();
}
