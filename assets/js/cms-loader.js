/* ══════════════════════════════════════════
   CMS LOADER
   Charge les fichiers JSON du dossier /content/
   et injecte le contenu dans le DOM
   ══════════════════════════════════════════ */

// Utilitaire : fetch JSON avec gestion d'erreur
async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${path}`);
    return await res.json();
  } catch (e) {
    console.warn('[CMS Loader] Impossible de charger :', path, e.message);
    return null;
  }
}

// Injecter une valeur texte dans un élément [data-cms="key"]
function inject(key, value) {
  if (value === undefined || value === null) return;
  document.querySelectorAll(`[data-cms="${key}"]`).forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.value = value;
    } else {
      el.innerHTML = value;
    }
  });
}

// ── ACCUEIL ──────────────────────────────
async function loadAccueil() {
  const d = await loadJSON('/content/pages/accueil.json');
  if (!d) return;
  inject('accueil.eyebrow',    d.eyebrow);
  inject('accueil.tagline1',   d.tagline1);
  inject('accueil.tagline2',   d.tagline2);
  inject('accueil.soustitre',  d.soustitre);
  inject('accueil.cta1',       d.cta1);
  inject('accueil.cta2',       d.cta2);
  inject('accueil.badge',      d.badge);
  inject('accueil.quote',      d.quote);
  inject('accueil.stat1_num',  d.stat1_num);
  inject('accueil.stat1_label',d.stat1_label);
  inject('accueil.stat2_num',  d.stat2_num);
  inject('accueil.stat2_label',d.stat2_label);
  inject('accueil.stat3_num',  d.stat3_num);
  inject('accueil.stat3_label',d.stat3_label);
}

// ── PARAMÈTRES GLOBAUX ────────────────────
async function loadGlobal() {
  const d = await loadJSON('/content/settings/global.json');
  if (!d) return;
  inject('global.email',      d.email);
  inject('global.adresse',    d.adresse);
  inject('global.linkedin',   d.linkedin);
  inject('global.copyright',  d.copyright);
  // Liens cliquables
  document.querySelectorAll('[data-cms-href="global.linkedin"]').forEach(el => {
    el.href = d.linkedin_url || '#';
  });
  document.querySelectorAll('[data-cms-href="global.email"]').forEach(el => {
    el.href = `mailto:${d.email}`;
  });
}

// ── CHIFFRES CLÉS ─────────────────────────
async function loadResultats() {
  const d = await loadJSON('/content/settings/resultats.json');
  if (!d) return;
  ['r1','r2','r3','r4'].forEach(k => {
    inject(`resultats.${k}_chiffre`, d[`${k}_chiffre`]);
    inject(`resultats.${k}_label`,   d[`${k}_label`]);
  });
}

// ── QUI SOMMES-NOUS ───────────────────────
async function loadQSN() {
  const d = await loadJSON('/content/pages/qui-sommes-nous.json');
  if (!d) return;
  inject('qsn.discours1',   d.discours1);
  inject('qsn.discours2',   d.discours2);
  inject('qsn.discours3',   d.discours3);
  inject('qsn.vision',      d.vision);
  inject('qsn.mission',     d.mission);
  inject('qsn.histoire1',   d.histoire1);
  inject('qsn.histoire2',   d.histoire2);
  inject('qsn.histoire3',   d.histoire3);
}

// ── PRINCIPES ─────────────────────────────
async function loadPrincipes() {
  const d = await loadJSON('/content/pages/principes.json');
  if (!d || !d.items) return;
  const container = document.getElementById('principes-container');
  if (!container) return;
  container.innerHTML = d.items.map(p => `
    <div class="principe-card reveal">
      <h3>${p.icon} ${p.titre}</h3>
      <p>${p.description}</p>
    </div>
  `).join('');
}

// ── OFFRES ────────────────────────────────
async function loadOffres() {
  const d = await loadJSON('/content/pages/offres.json');
  if (!d || !d.items) return;
  const container = document.getElementById('offres-container');
  if (!container) return;
  container.innerHTML = d.items.map((o, i) => `
    <div class="offre-card reveal">
      <div class="offre-num">0${i+1} — ${o.categorie}</div>
      <h3>${o.titre}</h3>
      <p>${o.description}</p>
      <a href="#" class="offre-link">${o.cta_label || 'En savoir plus'}</a>
    </div>
  `).join('');
}

// ── CAS CLIENTS ───────────────────────────
async function loadCasClients() {
  const d = await loadJSON('/content/pages/cas-clients.json');
  if (!d || !d.items) return;
  const container = document.getElementById('cas-container');
  if (!container) return;
  container.innerHTML = d.items.map(c => `
    <div class="cas-card reveal">
      <blockquote>« ${c.citation} »</blockquote>
      <h3>${c.titre}</h3>
      <p class="cas-desc">${c.description}</p>
      ${c.resultats.map(r => `
        <div class="cas-result">
          <span class="cas-result-num">${r.chiffre}</span>
          <span class="cas-result-label">${r.label}</span>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// ── FORMATION ─────────────────────────────
async function loadFormation() {
  const d = await loadJSON('/content/pages/formation.json');
  if (!d) return;
  inject('formation.titre',       d.titre);
  inject('formation.soustitre',   d.soustitre);
  inject('formation.texte1',      d.texte1);
  inject('formation.texte2',      d.texte2);
  inject('formation.catalogue_url', d.catalogue_url);
  document.querySelectorAll('[data-cms-href="formation.catalogue"]').forEach(el => {
    el.href = d.catalogue_url || 'https://zenvalue.catalogueformpro.com/';
  });
}

// ── RECRUTEMENT ───────────────────────────
async function loadRecrutement() {
  const d = await loadJSON('/content/pages/recrutement.json');
  if (!d) return;
  inject('recrutement.titre',    d.titre);
  inject('recrutement.soustitre',d.soustitre);
  inject('recrutement.intro',    d.intro);
  inject('recrutement.tagline',  d.tagline);

  // Engagements
  if (d.engagements) {
    const container = document.getElementById('engagements-container');
    if (container) {
      container.innerHTML = d.engagements.map(e => `
        <div class="engagement-card reveal">
          <div class="icon">${e.icon}</div>
          <h3>${e.titre}</h3>
          <p>${e.texte}</p>
        </div>
      `).join('');
    }
  }

  // Profils
  if (d.profils) {
    const container = document.getElementById('profils-container');
    if (container) {
      container.innerHTML = d.profils.map(p => `
        <div class="profil-card reveal">
          <h3>${p.icon} ${p.titre}</h3>
          <p>${p.description}</p>
        </div>
      `).join('');
    }
  }

  // Processus
  if (d.processus) {
    const container = document.getElementById('processus-container');
    if (container) {
      container.innerHTML = d.processus.map((p, i) => `
        <div class="processus-step reveal">
          <div class="step-circle">${i === d.processus.length - 1 ? '✓' : i + 1}</div>
          <h4>${p.titre}</h4>
          <p>${p.description}</p>
        </div>
      `).join('');
    }
  }
}

// ── RSE ───────────────────────────────────
async function loadRSE() {
  const d = await loadJSON('/content/pages/rse.json');
  if (!d) return;
  inject('rse.titre',    d.titre);
  inject('rse.intro',    d.intro);
  inject('rse.axe1_titre', d.axe1_titre);
  inject('rse.axe1_texte', d.axe1_texte);
  inject('rse.axe2_titre', d.axe2_titre);
  inject('rse.axe2_texte', d.axe2_texte);

  if (d.mesures) {
    const container = document.getElementById('mesures-container');
    if (container) {
      container.innerHTML = d.mesures.map(m => `
        <div class="rse-mesure reveal">
          <h4>${m.icon} ${m.titre}</h4>
          <p>${m.texte}</p>
        </div>
      `).join('');
    }
  }
}

// ── INITIALISATION ────────────────────────
async function initCMS() {
  await Promise.all([
    loadGlobal(),
    loadAccueil(),
    loadResultats(),
    loadQSN(),
    loadPrincipes(),
    loadOffres(),
    loadCasClients(),
    loadFormation(),
    loadRecrutement(),
    loadRSE(),
  ]);
  // Relancer les reveals après injection du contenu
  observeReveals();
}

document.addEventListener('DOMContentLoaded', initCMS);
