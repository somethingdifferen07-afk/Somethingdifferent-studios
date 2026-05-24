/* ============================================================
   Something Different Studios — script.js
   Shared JavaScript for all pages.
   ============================================================ */

/* ----------------------------------------------------------
   CUSTOM CURSOR
---------------------------------------------------------- */
(function initCursor() {
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-r');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * .11;
    ry += (my - ry) * .11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .nav-toggle, .svc-item, .wi, .td, .ps, .work-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('h'); ring.classList.add('h'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('h'); ring.classList.remove('h'); });
  });
})();

/* ----------------------------------------------------------
   MOBILE NAVIGATION
---------------------------------------------------------- */
(function initMobileNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  function setOpen(open) {
    toggle.classList.toggle('open', open);
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setOpen(false);
  });
})();

/* ----------------------------------------------------------
   FADE-UP ON SCROLL (Intersection Observer)
---------------------------------------------------------- */
(function initFadeUp() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('v'), i * 70);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .08 });

  document.querySelectorAll('.fu').forEach(el => obs.observe(el));

  // Hero elements animate in immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .fu, .page-hero .fu').forEach((el, i) => {
      setTimeout(() => el.classList.add('v'), i * 220 + 400);
    });
  }, 100);
})();

/* ----------------------------------------------------------
   TESTIMONIAL ROTATOR (used on index + about pages)
---------------------------------------------------------- */
(function initTestimonials() {
  const tt = document.getElementById('tt');
  const ta = document.getElementById('ta');
  if (!tt || !ta) return;

  const T = [
    {
      t: "Working with Something Different Studios transformed how our audience perceives us. The results were beyond anything we imagined possible.",
      a: "— Alex Chen · Creative Director, NEXUS Labs"
    },
    {
      t: "The cinematic quality they bring to every project is unmatched. They don't just execute briefs — they elevate them.",
      a: "— Mia Torres · Founder, Studio Parallax"
    },
    {
      t: "From concept to delivery, seamless. The final film exceeded every expectation we had for the campaign.",
      a: "— James Okafor · CMO, Meridian Group"
    }
  ];

  let ci = 0;

  window.setT = function(i) {
    ci = i;
    tt.style.opacity = '0'; ta.style.opacity = '0';
    setTimeout(() => {
      tt.textContent = T[i].t;
      ta.textContent = T[i].a;
      tt.style.opacity = '1'; ta.style.opacity = '1';
    }, 280);
    document.querySelectorAll('.td').forEach((d, j) => d.classList.toggle('a', j === i));
  };

  tt.style.transition = 'opacity .28s';
  ta.style.transition = 'opacity .28s';
  setInterval(() => setT((ci + 1) % T.length), 5500);
})();

/* ----------------------------------------------------------
   ACTIVE NAV LINK HIGHLIGHT
   Marks the link matching the current page filename.
---------------------------------------------------------- */
(function highlightNav() {
  const path  = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ----------------------------------------------------------
   CONTACT FORM (used on contact.html)
   Sends the contact form to Formspree.
---------------------------------------------------------- */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn  = form.querySelector('.form-submit');
    const msg  = document.getElementById('form-success');
    const err  = document.getElementById('form-error');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (msg) msg.style.opacity = '0';
    if (err) err.style.opacity = '0';
    btn.textContent = 'Sending...';
    btn.style.opacity = '.6';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!res.ok) throw new Error('Formspree submission failed');

      form.reset();
      btn.textContent  = 'Message Sent';
      btn.style.opacity = '1';
      if (msg) msg.style.opacity = '1';
      setTimeout(() => {
        btn.textContent  = 'Send Message';
        if (msg) msg.style.opacity = '0';
      }, 4000);
    } catch (error) {
      btn.textContent = 'Send Message';
      btn.style.opacity = '1';
      if (err) err.style.opacity = '1';
    } finally {
      btn.disabled = false;
    }
  });
})();

/* ----------------------------------------------------------
   PORTFOLIO FILTER (used on portfolio.html)
   Filters work items by data-category attribute.
---------------------------------------------------------- */
(function initPortfolioFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.work-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      items.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.style.opacity    = match ? '1' : '0';
        item.style.transform  = match ? 'scale(1)'   : 'scale(.97)';
        item.style.pointerEvents = match ? 'auto' : 'none';
        // preserve grid space with visibility rather than display
        item.style.visibility = match ? 'visible' : 'hidden';
      });
    });
  });
})();
