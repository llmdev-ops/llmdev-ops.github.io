/* ══════════════════════════════════════════
   ROUTER — Navigation SPA
   ══════════════════════════════════════════ */

function showPage(id) {
  // Masquer toutes les pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Afficher la page cible
  const target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');

  // Mettre à jour les liens actifs
  document.querySelectorAll('[data-page]').forEach(a => {
    a.classList.toggle('active-page', a.dataset.page === id);
  });

  // Scroll haut de page
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Mettre à jour l'URL (sans rechargement)
  history.pushState({ page: id }, '', '#' + id);

  // Relancer les animations reveal sur la nouvelle page
  setTimeout(observeReveals, 60);
}

// Gérer le bouton retour navigateur
window.addEventListener('popstate', (e) => {
  const id = e.state?.page || location.hash.replace('#', '') || 'accueil';
  showPage(id);
});

// Démarrer sur la bonne page selon le hash URL
document.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.replace('#', '');
  if (hash) showPage(hash);
});
