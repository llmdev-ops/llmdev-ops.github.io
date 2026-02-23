/* ══════════════════════════════════════════
   ANIMATIONS — Scroll reveal
   ══════════════════════════════════════════ */

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

function observeReveals() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObs.observe(el));
}

document.addEventListener('DOMContentLoaded', observeReveals);
