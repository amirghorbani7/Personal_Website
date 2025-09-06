// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal-on-scroll with IntersectionObserver
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Simple hamburger toggle on mobile
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.mainnav');
burger?.addEventListener('click', () => {
  nav?.classList.toggle('open');
  if (nav?.classList.contains('open')) {
    nav.style.display = 'flex';
    nav.style.position = 'absolute';
    nav.style.top = '64px';
    nav.style.right = '20px';
    nav.style.flexDirection = 'column';
    nav.style.gap = '10px';
    nav.style.background = '#fff';
    nav.style.border = '1px solid #e5e7eb';
    nav.style.borderRadius = '12px';
    nav.style.padding = '12px';
    nav.style.boxShadow = '0 10px 30px rgba(0,0,0,.08)';
  } else {
    nav.removeAttribute('style');
  }
});