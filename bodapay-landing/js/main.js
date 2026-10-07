const nav = document.querySelector('.nav');
const toggle = document.getElementById('menuToggle');
const links = document.querySelectorAll('.nav-links a');
const modal = document.querySelector('.modal');
const loginLink = document.querySelector('.login-link');
const closeButtons = document.querySelectorAll('[data-close]');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

loginLink?.addEventListener('click', e => { e.preventDefault(); openModal(); });
function openModal(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
modal?.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const spyLinks = [...document.querySelectorAll('.nav-links a')];
const spyTargets = spyLinks.map(a => ({a, el: document.querySelector(a.getAttribute('href'))})).filter(t => t.el);
let navLock = false, navTimer;
const setActive = a => spyLinks.forEach(l => l.classList.toggle('active', l === a));
function spy(){
  if(navLock) return;
  const y = window.scrollY + 140;
  let cur = null;
  if(window.scrollY > 80) {
    spyTargets.forEach(t => { if(t.el.id !== 'top' && t.el.getBoundingClientRect().top + window.scrollY <= y) cur = t; });
  }
  setActive(cur?.a ?? null);
}
const unlock = () => { navLock = false; spy(); };
spyLinks.forEach(a => a.addEventListener('click', () => {
  setActive(a); navLock = true; clearTimeout(navTimer); navTimer = setTimeout(unlock, 1000);
}));
window.addEventListener('scroll', spy, {passive:true});
window.addEventListener('scrollend', unlock);
spy();

const header = document.querySelector('.site-header');
const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, {passive:true}); onScroll();