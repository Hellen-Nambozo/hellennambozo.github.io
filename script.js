// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Typing effect for the title
const typed = document.getElementById('typed');
const words = ['Statistician & Data Analyst', 'Data Storyteller', 'Insight Finder'];
let w = 0, c = words[0].length, deleting = true;
function type() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 2000); }
    if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; }
    c += deleting ? -1 : 1;
    setTimeout(type, deleting ? 40 : 80);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setTimeout(type, 2000); }

// Highlight active menu pill while scrolling
const pills = document.querySelectorAll('.nav-pill');
const sections = [...pills].map(p => document.querySelector(p.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            pills.forEach(p => p.classList.toggle('active', p.getAttribute('href') === '#' + e.target.id));
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => s && spy.observe(s));

// Reveal on scroll + animate skill bars and counters
document.querySelectorAll('.section-title, .skill-card, .project-card, .contact-card, .stat').forEach(el => el.classList.add('reveal'));
const reveal = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        e.target.querySelectorAll('[data-level]').forEach(b => b.style.width = b.dataset.level + '%');
        const num = e.target.querySelector('[data-count]');
        if (num) {
            const target = +num.dataset.count; let n = 0;
            const t = setInterval(() => { n += Math.ceil(target / 30); if (n >= target) { n = target; clearInterval(t); } num.textContent = n; }, 40);
        }
        reveal.unobserve(e.target);
    });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

// Project filters
document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.toggle('hide', btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter);
    });
}));

// Project modal
const modal = document.getElementById('modal');
document.querySelectorAll('.more').forEach(btn => btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    document.getElementById('modal-title').textContent = card.dataset.title;
    document.getElementById('modal-desc').textContent = card.dataset.desc;
    document.getElementById('modal-tools').textContent = card.dataset.tools;
    modal.classList.add('open');
}));
modal.addEventListener('click', e => { if (e.target === modal || e.target.classList.contains('modal-close')) modal.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });

// Copy email
const toast = document.getElementById('toast');
document.getElementById('copy-email').addEventListener('click', () => {
    navigator.clipboard.writeText('nambozoh5@gmail.com').then(() => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    });
});

document.getElementById('year').textContent = new Date().getFullYear();
