(function () {
  'use strict';

  /* ── NAV: scroll behavior ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── NAV: mobile hamburger ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── ACCORDION ── */
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // Close siblings (optional single-open behavior)
      const group = item.closest('[data-accordion-group]');
      if (group) {
        group.querySelectorAll('.accordion-item.open').forEach(el => {
          if (el !== item) el.classList.remove('open');
        });
      }
      item.classList.toggle('open', !isOpen);
    });
  });

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      item.classList.toggle('open');
      trigger.querySelector('.faq-icon').textContent =
        item.classList.contains('open') ? '×' : '+';
    });
  });

  /* ── TABS ── */
  document.querySelectorAll('.tab-nav').forEach(nav => {
    const btns = nav.querySelectorAll('.tab-btn');
    const container = nav.closest('[data-tabs]') || nav.parentElement;
    const panels = container ? container.querySelectorAll('.tab-panel') : [];

    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });

  /* ── SCROLL REVEAL (IntersectionObserver) ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => io.observe(el));
  } else {
    // Fallback: make all visible immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── STAGGER children ── */
  document.querySelectorAll('.stagger-children').forEach(parent => {
    [...parent.children].forEach((child, i) => {
      child.style.setProperty('--i', i);
      child.classList.add('fade-up');
    });
  });

  /* ── FORM: basic validation ── */
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        const filled = field.value.trim() !== '';
        field.classList.toggle('error', !filled);
        if (!filled) valid = false;
      });
      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        if (btn) {
          btn.textContent = 'Sent — We\'ll be in touch.';
          btn.disabled = true;
          btn.style.background = '#2A7A2A';
          btn.style.borderColor = '#2A7A2A';
        }
      }
    });
  });

  /* ── SMOOTH SCROLL for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── PROTOTYPE NAV: current page highlight ── */
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a, .nav-mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'homepage.html')) {
      link.style.color = 'var(--white)';
      link.style.borderBottom = '1px solid var(--red)';
    }
  });

})();