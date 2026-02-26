/* ═══════════════════════════════════════════════
   THEME LOADER v4 — Systeme 9 couleurs
   3 couleurs principales x (principale + foncee + claire)
   ═══════════════════════════════════════════════ */

const FONTS = {
  jakarta:     { url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap', family: "'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif" },
  inter:       { url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap', family: "'Inter','Segoe UI',system-ui,sans-serif" },
  josefin:     { url: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&display=swap', family: "'Josefin Sans','Segoe UI',system-ui,sans-serif" },
  roboto:      { url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap', family: "'Roboto','Segoe UI',system-ui,sans-serif" },
  opensans:    { url: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap', family: "'Open Sans','Segoe UI',system-ui,sans-serif" },
  rubik:       { url: 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap', family: "'Rubik','Segoe UI',system-ui,sans-serif" },
  dm:          { url: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap', family: "'DM Sans','Segoe UI',system-ui,sans-serif" },
  poppins:     { url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap', family: "'Poppins','Segoe UI',system-ui,sans-serif" },
  lato:        { url: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap', family: "'Lato','Segoe UI',system-ui,sans-serif" },
  nunito:      { url: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap', family: "'Nunito','Segoe UI',system-ui,sans-serif" },
  ubuntu:      { url: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap', family: "'Ubuntu','Segoe UI',system-ui,sans-serif" },
  sourcesans:  { url: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&display=swap', family: "'Source Sans 3','Segoe UI',system-ui,sans-serif" },
  worksans:    { url: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap', family: "'Work Sans','Segoe UI',system-ui,sans-serif" },
  manrope:     { url: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap', family: "'Manrope','Segoe UI',system-ui,sans-serif" },
  raleway:     { url: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap', family: "'Raleway','Segoe UI',system-ui,sans-serif" },
  montserrat:  { url: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&display=swap', family: "'Montserrat','Segoe UI',system-ui,sans-serif" },
  playfair:    { url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap', family: "'Playfair Display',Georgia,serif" },
  baskerville: { url: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap', family: "'Libre Baskerville',Georgia,serif" },
  neuton:      { url: 'https://fonts.googleapis.com/css2?family=Neuton:wght@300;400;700&display=swap', family: "'Neuton',Georgia,serif" },
  lora:        { url: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap', family: "'Lora',Georgia,serif" },
  arvo:        { url: 'https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap', family: "'Arvo',Georgia,serif" },
  outfit:      { url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap', family: "'Outfit','Segoe UI',system-ui,sans-serif" },
};

const PRESETS = {
  zenvalue: {
    c1: '#AAC335', c1d: '#6D7D22', c1l: '#F1F6E2',
    c2: '#404041', c2d: '#14191E', c2l: '#9CA3AF',
    c3: '#FF467C', c3d: '#9D174D', c3l: '#FFF1F6',
    typographie: 'jakarta', rayon_boutons: 4,
  },
  ardoise: {
    c1: '#2563EB', c1d: '#1E40AF', c1l: '#EFF6FF',
    c2: '#1E293B', c2d: '#0F172A', c2l: '#94A3B8',
    c3: '#F59E0B', c3d: '#B45309', c3l: '#FFFBEB',
    typographie: 'inter', rayon_boutons: 6,
  },
  mineral: {
    c1: '#059669', c1d: '#047857', c1l: '#ECFDF5',
    c2: '#374151', c2d: '#111827', c2l: '#D1D5DB',
    c3: '#8B5CF6', c3d: '#6D28D9', c3l: '#F5F3FF',
    typographie: 'manrope', rayon_boutons: 8,
  },
};

function hexToRgb(hex) {
  const h = (hex||'#000000').replace('#','');
  return { r:parseInt(h.slice(0,2),16)||0, g:parseInt(h.slice(2,4),16)||0, b:parseInt(h.slice(4,6),16)||0 };
}
function rgba(hex, a) { const {r,g,b} = hexToRgb(hex); return 'rgba('+r+','+g+','+b+','+a+')'; }

function applyTheme(raw) {
  const root = document.documentElement;

  // Choisir les valeurs selon preset ou custom
  let t;
  if (raw.preset && raw.preset !== 'custom' && PRESETS[raw.preset]) {
    t = PRESETS[raw.preset];
  } else {
    t = raw;
  }

  // -- 9 variables couleurs --
  const c1  = t.c1  || '#AAC335';
  const c1d = t.c1d || '#6D7D22';
  const c1l = t.c1l || '#F1F6E2';
  const c2  = t.c2  || '#404041';
  const c2d = t.c2d || '#14191E';
  const c2l = t.c2l || '#9CA3AF';
  const c3  = t.c3  || '#FF467C';
  const c3d = t.c3d || '#9D174D';
  const c3l = t.c3l || '#FFF1F6';

  root.style.setProperty('--c1',  c1);
  root.style.setProperty('--c1d', c1d);
  root.style.setProperty('--c1l', c1l);
  root.style.setProperty('--c2',  c2);
  root.style.setProperty('--c2d', c2d);
  root.style.setProperty('--c2l', c2l);
  root.style.setProperty('--c3',  c3);
  root.style.setProperty('--c3d', c3d);
  root.style.setProperty('--c3l', c3l);

  // Aliases pour compatibilite avec le CSS existant
  root.style.setProperty('--zv-green',    c1);
  root.style.setProperty('--zv-green-dk', c1d);
  root.style.setProperty('--zv-green-bg', c1l);
  root.style.setProperty('--zv-dark',     c2);
  root.style.setProperty('--zv-gray',     c2l);
  root.style.setProperty('--accent',      c3);
  root.style.setProperty('--accent-dk',   c3d);
  root.style.setProperty('--accent-lt',   c3l);

  // Cercles hero
  root.style.setProperty('--hero-circle-color',       rgba(c1, 0.16));
  root.style.setProperty('--hero-circle-color-inner', rgba(c1, 0.08));

  // Rayon boutons
  const radius = parseInt(t.rayon_boutons, 10);
  root.style.setProperty('--radius', (isNaN(radius) ? 4 : radius) + 'px');

  // Typographie
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

  console.info('[ZV Theme] Preset:', raw.preset || 'custom', '| C1:', c1, '| C2:', c2, '| C3:', c3);
}

async function loadTheme() {
  const url = 'content/settings/theme.json?_=' + Date.now();
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    applyTheme(json);
  } catch(e) {
    console.warn('[ZV Theme] Erreur — theme par defaut.', e.message);
  }
}

loadTheme();
