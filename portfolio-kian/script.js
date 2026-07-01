// Efecto de escritura para el rol
const roles = ["Full Stack Developer", "Backend Developer", "Software Engineer"];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  if(!typedEl) return;
  const current = roles[roleIndex];
  if(!deleting){
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if(charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      if(entry.target.classList.contains('lang-card')){
        entry.target.querySelectorAll('.lang-fill').forEach(f => f.classList.add('animate'));
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// Stagger delay for hero elements
document.querySelectorAll('.hero .reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.12) + 's';
});

// Scroll progress bar
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if(progress) progress.style.width = pct + '%';
});

// Active tab highlighting based on section in view
const sections = document.querySelectorAll('main section[id]');
const tabs = document.querySelectorAll('.tab');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      tabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// Cursor glow follow
const glow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (e) => {
  if(glow){
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }
});
