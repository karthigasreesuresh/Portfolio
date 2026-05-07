// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ===== Counter Animation =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * ease);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  });
}
const statsSection = document.querySelector('#achievements');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.unobserve(statsSection);
    }
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #06d6a0, #4f8cff)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  });
}

// ===== Typed Text Effect for Hero =====
const typedEl = document.getElementById('typed-role');
if (typedEl) {
  const roles = [
    'Full Stack Developer',
    'AI & ML Enthusiast',
    'Hackathon Participant',
    'B.Tech IT Student',
    'Project Developer'
  ];
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  function typeEffect() {
    const current = roles[roleIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    } else {
      typedEl.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) { isDeleting = true; setTimeout(typeEffect, 1500); return; }
    }
    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }
  typeEffect();
}
