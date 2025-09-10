// Smooth scrolling for in-page anchors
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
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal-on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Mobile hamburger
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.mainnav');
burger?.addEventListener('click', () => {
  const opened = nav?.classList.toggle('open');
  if (opened) {
    Object.assign(nav.style, {
      display:'flex', position:'absolute', top:'64px', right:'20px',
      flexDirection:'column', gap:'10px', background:'#fff',
      border:'1px solid #e5e7eb', borderRadius:'12px', padding:'12px',
      boxShadow:'0 10px 30px rgba(0,0,0,.08)', zIndex:'60'
    });
  } else {
    nav.removeAttribute('style');
  }
});

// Email popup modal
const modal = document.getElementById("emailModal");
const openBtn = document.getElementById("openEmailPopup");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex"; // show popup
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none"; // hide popup
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none"; // click outside closes
  }
});

// Simple form submit (right now only alerts)
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent! (Here you can integrate with EmailJS, Formspree, etc.)");
  modal.style.display = "none";
});