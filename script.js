// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  });
}

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Scroll-triggered animations
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = Array.from(entry.target.parentElement.children)
        .filter(el => el.hasAttribute('data-animate'))
        .indexOf(entry.target) * 100;

      setTimeout(() => {
        entry.target.classList.add('animate-in');
      }, delay);

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animateElements.forEach(el => observer.observe(el));

// Counter animation for stats
const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// Contact form handler
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#2ecc71';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      e.target.reset();
    }, 3000);
  });
}

// Cookie consent banner
(function() {
  var banner = document.getElementById('cookieBanner');
  if (!banner) return;

  if (!localStorage.getItem('cookie_consent')) {
    setTimeout(function() { banner.classList.add('visible'); }, 1000);
  }

  var acceptBtn = document.getElementById('cookieAccept');
  var declineBtn = document.getElementById('cookieDecline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      localStorage.setItem('cookie_consent', 'accepted');
      banner.classList.remove('visible');
    });
  }
  if (declineBtn) {
    declineBtn.addEventListener('click', function() {
      localStorage.setItem('cookie_consent', 'declined');
      banner.classList.remove('visible');
    });
  }
})();
