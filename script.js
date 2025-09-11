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
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Mobile menu (simple) */
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.mainnav');
burger?.addEventListener('click', () => {
  const opened = nav?.classList.toggle('open');
  if (opened) {
    Object.assign(nav.style, {
      display:'flex', position:'absolute', top:'64px', right:'20px',
      flexDirection:'column', gap:'10px', background:'var(--bg)',
      border:'1px solid var(--border)', borderRadius:'12px', padding:'12px',
      boxShadow:'0 10px 30px rgba(0,0,0,.08)', zIndex:'60'
    });
  } else {
    nav.removeAttribute('style');
  }
});

/* Theme toggle with localStorage */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
themeToggle?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* Email popup modal */
const modal = document.getElementById("emailModal");
const openBtn = document.getElementById("openEmailPopup");
const closeBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelModal");

openBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
  modal.setAttribute('aria-hidden','false');
});

function closeModal(){
  modal.style.display = "none";
  modal.setAttribute('aria-hidden','true');
}
closeBtn?.addEventListener("click", closeModal);
cancelBtn?.addEventListener("click", closeModal);
window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

/* Contact form validation (required + human checkbox) */
const form = document.getElementById('contactForm');
function setError(field, msg){
  const wrap = field.closest('.field');
  const small = wrap.querySelector('.error');
  wrap.classList.add('invalid');
  small.textContent = msg || 'This field is required.';
}
function clearError(field){
  const wrap = field.closest('.field');
  const small = wrap.querySelector('.error');
  wrap.classList.remove('invalid');
  small.textContent = '';
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name;
  const email = form.email;
  const subject = form.subject;
  const message = form.message;
  const human = form.human;
  const honeypot = form.website;

  let ok = true;

  [name,email,subject,message].forEach(f => {
    if (!f.value.trim()) { setError(f); ok = false; } else { clearError(f); }
  });

  // very simple email pattern
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && !emailRx.test(email.value)) { setError(email, 'Please enter a valid email.'); ok = false; }

  if (!human.checked){ setError(human, 'Please confirm you are human.'); ok = false; } else { clearError(human); }

  // honeypot must stay empty
  if (honeypot.value){ ok = false; }

  if (!ok) return;

  // Demo submit: show a toast/alert. Later integrate EmailJS/Formspree.
  alert('Message sent! (Hook this up to EmailJS or Formspree to receive emails.)');
  form.reset();
  closeModal();
});

/* Header fade on scroll: toggle a class when the page is scrolled */
const headerEl = document.querySelector('.topbar');
function syncHeader(){
  // Add .scrolled when the page is moved a bit to reduce header opacity
  headerEl?.classList.toggle('scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', syncHeader);
syncHeader();

/* Back to Top: show the button after some scroll; smooth-scroll to top on click */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  // Reveal button once user scrolls down
  if (window.scrollY > 300) backToTop?.classList.add("show");
  else backToTop?.classList.remove("show");
});
backToTop?.addEventListener("click", () => {
  // Smoothly scroll back to the very top
  window.scrollTo({ top: 0, behavior: "smooth" });
});
