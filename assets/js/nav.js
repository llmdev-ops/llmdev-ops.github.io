/* ══════════════════════════════════════════
   NAV — Burger mobile, scroll shadow
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // Navbar shadow au scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Formulaire contact — Netlify
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        await fetch('/', { method: 'POST', body: data });
        document.getElementById('form-success')?.classList.add('visible');
        form.reset();
      } catch {
        document.getElementById('form-error')?.classList.add('visible');
      }
    });
  }

});
