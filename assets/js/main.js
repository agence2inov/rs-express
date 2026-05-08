/* Au Cœur des Saveurs — interactions */
(() => {
  'use strict';

  /* ---------- Sticky header ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile drawer ---------- */
  const toggle = document.querySelector('[data-nav-toggle]');
  const drawer = document.querySelector('[data-mobile-drawer]');
  const closeBtn = document.querySelector('[data-mobile-close]');
  const openDrawer = () => {
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  if (toggle && drawer) {
    toggle.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    });
  }

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach((el, i) => {
      // Stagger inside same parent
      const idx = [...el.parentElement.children].filter(c => c.classList.contains('reveal')).indexOf(el);
      if (idx > -1) el.style.setProperty('--reveal-delay', `${Math.min(idx, 6) * 80}ms`);
      io.observe(el);
    });
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Sticky mobile CTA ---------- */
  const stickyCta = document.querySelector('[data-sticky-mobile]');
  const heroSection = document.querySelector('.hero, .page-hero');
  if (stickyCta && heroSection && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([entry]) => {
      stickyCta.classList.toggle('is-visible', !entry.isIntersecting);
    }, { threshold: 0 });
    io.observe(heroSection);
  }

  /* ---------- Smooth anchor scroll with header offset ---------- */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = (header?.offsetHeight || 0) + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Form: contact & commande ---------- */
  document.querySelectorAll('[data-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('[data-form-status]');
      const data = Object.fromEntries(new FormData(form).entries());
      // No backend wired in this static prototype: surface success state for review.
      // Replace with real endpoint (Formspree, Resend, custom API) before launch.
      if (!data.email || !data.message) {
        if (status) {
          status.textContent = "Merci de renseigner votre email et un message.";
          status.style.color = 'var(--brick)';
        }
        return;
      }
      form.reset();
      if (status) {
        status.textContent = "Merci, votre message a été envoyé. Nous revenons vers vous rapidement.";
        status.style.color = 'var(--wheat)';
      }
    });
  });

  /* ---------- Set active nav link ---------- */
  const path = location.pathname.replace(/\/$/, '') || '/index.html';
  const file = path.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === file || (file === '' && href === 'index.html')) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });
})();
