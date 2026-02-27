/* CMS LOADER - Charge les JSON et injecte dans le DOM */

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + path);
    return await res.json();
  } catch (e) {
    console.warn('[CMS] Erreur:', path, e.message);
    return null;
  }
}

function inject(key, value) {
  if (value === undefined || value === null) return;
  document.querySelectorAll('[data-cms="' + key + '"]').forEach(function(el) {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.value = value;
    } else {
      el.innerHTML = value;
    }
  });
}

async function loadAccueil() {
  var d = await loadJSON('content/pages/accueil.json');
  if (!d) return;
  inject('accueil.eyebrow',     d.eyebrow);
  inject('accueil.tagline1',    d.tagline1);
  inject('accueil.tagline2',    d.tagline2);
  inject('accueil.soustitre',   d.soustitre);
  inject('accueil.cta1',        d.cta1);
  inject('accueil.cta2',        d.cta2);
  inject('accueil.badge',       d.badge);
  inject('accueil.quote',       d.quote);
  inject('accueil.stat1_num',   d.stat1_num);
  inject('accueil.stat1_label', d.stat1_label);
  inject('accueil.stat2_num',   d.stat2_num);
  inject('accueil.stat2_label', d.stat2_label);
  inject('accueil.stat3_num',   d.stat3_num);
  inject('accueil.stat3_label', d.stat3_label);
}

async function loadGlobal() {
  var d = await loadJSON('content/settings/global.json');
  if (!d) return;
  inject('global.email',     d.email);
  inject('global.adresse',   d.adresse);
  inject('global.linkedin',  d.linkedin);
  inject('global.copyright', d.copyright);
  document.querySelectorAll('[data-cms-href="global.linkedin"]').forEach(function(el) {
    el.href = d.linkedin_url || '#';
  });
  document.querySelectorAll('[data-cms-href="global.email"]').forEach(function(el) {
    el.href = 'mailto:' + d.email;
  });
}

async function loadResultats() {
  var d = await loadJSON('content/settings/resultats.json');
  if (!d) return;
  ['r1','r2','r3','r4'].forEach(function(k) {
    inject('resultats.' + k + '_chiffre', d[k + '_chiffre']);
    inject('resultats.' + k + '_label',   d[k + '_label']);
  });
}

async function loadQSN() {
  var d = await loadJSON('content/pages/qui-sommes-nous.json');
  if (!d) return;
  inject('qsn.discours1', d.discours1);
  inject('qsn.discours2', d.discours2);
  inject('qsn.discours3', d.discours3);
  inject('qsn.vision',    d.vision);
  inject('qsn.mission',   d.mission);
  inject('qsn.histoire1', d.histoire1);
  inject('qsn.histoire2', d.histoire2);
  inject('qsn.histoire3', d.histoire3);
}

async function loadPrincipes() {
  var d = await loadJSON('content/pages/principes.json');
  if (!d || !d.items) return;
  var container = document.getElementById('principes-container');
  if (!container) return;
  container.innerHTML = d.items.map(function(p) {
    return '<div class="principe-card reveal"><h3>' + p.icon + ' ' + p.titre + '</h3><p>' + p.description + '</p></div>';
  }).join('');
}

async function loadOffres() {
  var d = await loadJSON('content/pages/offres.json');
  if (!d || !d.items) return;
  var container = document.getElementById('offres-container');
  if (!container) return;
  container.innerHTML = d.items.map(function(o, i) {
    return '<div class="offre-card reveal"><div class="offre-num">0' + (i+1) + ' - ' + o.categorie + '</div><h3>' + o.titre + '</h3><p>' + o.description + '</p><a href="#" class="offre-link">' + (o.cta_label || 'En savoir plus') + '</a></div>';
  }).join('');
}

async function loadCasClients() {
  var d = await loadJSON('content/pages/cas-clients.json');
  if (!d || !d.items) return;
  var container = document.getElementById('cas-container');
  if (!container) return;
  container.innerHTML = d.items.map(function(c) {
    var resultats = (c.resultats || []).map(function(r) {
      return '<div class="cas-result"><span class="cas-result-num">' + r.chiffre + '</span><span class="cas-result-label">' + r.label + '</span></div>';
    }).join('');
    return '<div class="cas-card reveal"><blockquote>' + c.citation + '</blockquote><h3>' + c.titre + '</h3><p class="cas-desc">' + c.description + '</p>' + resultats + '</div>';
  }).join('');
}

async function loadFormation() {
  var d = await loadJSON('content/pages/formation.json');
  if (!d) return;
  inject('formation.titre',       d.titre);
  inject('formation.soustitre',   d.soustitre);
  inject('formation.texte1',      d.texte1);
  inject('formation.texte2',      d.texte2);
  inject('formation.catalogue_url', d.catalogue_url);
  document.querySelectorAll('[data-cms-href="formation.catalogue"]').forEach(function(el) {
    el.href = d.catalogue_url || 'https://zenvalue.catalogueformpro.com/';
  });
}

async function loadRecrutement() {
  var d = await loadJSON('content/pages/recrutement.json');
  if (!d) return;
  inject('recrutement.titre',     d.titre);
  inject('recrutement.soustitre', d.soustitre);
  inject('recrutement.intro',     d.intro);
  inject('recrutement.tagline',   d.tagline);

  if (d.engagements) {
    var c1 = document.getElementById('engagements-container');
    if (c1) c1.innerHTML = d.engagements.map(function(e) {
      return '<div class="engagement-card reveal"><div class="icon">' + e.icon + '</div><h3>' + e.titre + '</h3><p>' + e.texte + '</p></div>';
    }).join('');
  }

  if (d.profils) {
    var c2 = document.getElementById('profils-container');
    if (c2) c2.innerHTML = d.profils.map(function(p) {
      return '<div class="profil-card reveal"><h3>' + p.icon + ' ' + p.titre + '</h3><p>' + p.description + '</p></div>';
    }).join('');
  }

  if (d.processus) {
    var c3 = document.getElementById('processus-container');
    if (c3) c3.innerHTML = d.processus.map(function(p, i) {
      var num = (i === d.processus.length - 1) ? '&#10003;' : (i + 1);
      return '<div class="processus-step reveal"><div class="step-circle">' + num + '</div><h4>' + p.titre + '</h4><p>' + p.description + '</p></div>';
    }).join('');
  }
}

async function loadRSE() {
  var d = await loadJSON('content/pages/rse.json');
  if (!d) return;
  inject('rse.titre',      d.titre);
  inject('rse.intro',      d.intro);
  inject('rse.axe1_titre', d.axe1_titre);
  inject('rse.axe1_texte', d.axe1_texte);
  inject('rse.axe2_titre', d.axe2_titre);
  inject('rse.axe2_texte', d.axe2_texte);

  if (d.mesures) {
    var container = document.getElementById('mesures-container');
    if (container) container.innerHTML = d.mesures.map(function(m) {
      return '<div class="rse-mesure reveal"><h4>' + m.icon + ' ' + m.titre + '</h4><p>' + m.texte + '</p></div>';
    }).join('');
  }
}


async function loadLogosClients() {
  var container = document.getElementById('clients-logos');
  if (!container) return;
  try {
    var res = await fetch('https://api.github.com/repos/llmdev-ops/llmdev-ops.github.io/contents/assets/images/logos-clients');
    if (!res.ok) return;
    var files = await res.json();
    var exts = ['jpg','jpeg','png','webp','svg','avif','gif'];
    var logos = files.filter(function(f) {
      return exts.includes(f.name.split('.').pop().toLowerCase());
    });
    if (!logos.length) return; // garde les placeholders
    container.innerHTML = logos.map(function(f) {
      var url = 'https://llmdev-ops.github.io/' + f.path;
      var name = f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      return '<img class="client-logo" src="' + url + '" alt="' + name + '" loading="lazy" />';
    }).join('');
  } catch(e) {
    // réseau KO : placeholders restent affichés
  }
}
async function initCMS() {
  await Promise.all([
    loadGlobal(),
    loadLogosClients(),
    loadAccueil(),
    loadResultats(),
    loadQSN(),
    loadPrincipes(),
    loadOffres(),
    loadCasClients(),
    loadFormation(),
    loadRecrutement(),
    loadRSE()
  ]);
  observeReveals();
}

document.addEventListener('DOMContentLoaded', initCMS);
