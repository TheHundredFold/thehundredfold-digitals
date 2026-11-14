import { element } from './dom';
// Native, lightweight motion. Content remains usable with animation disabled.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = element('motion-toggle');
let animationsPaused = false;
let explicitlyEnabled = false;
try { const preference = localStorage.getItem('hundredfold-motion'); animationsPaused = preference === 'paused'; explicitlyEnabled = preference === 'enabled'; } catch {}
function motionAllowed() { return !animationsPaused && (!reducedMotion.matches || explicitlyEnabled); }
export function animateStage() {
  const panel = element('demo-panel');
  panel.getAnimations().forEach(animation => animation.cancel());
  if (motionAllowed()) panel.animate([{opacity:.35,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}], {duration:360,easing:'cubic-bezier(.2,.7,.3,1)'});
}
function updateMotionPreference() {
  const allowed = motionAllowed();
  document.documentElement.classList.toggle('motion-enabled', allowed);
  document.documentElement.classList.toggle('motion-opt-in', explicitlyEnabled && !animationsPaused);
  motionToggle.textContent = allowed ? 'Pause animations' : 'Enable animations';
  motionToggle.setAttribute('aria-pressed', String(!allowed));
  if (!allowed) {
    document.querySelectorAll<HTMLElement>('.reveal').forEach(element => element.classList.add('is-revealed'));
    document.getAnimations().forEach(animation => animation.cancel());
  }
}
motionToggle.addEventListener('click', () => {
  animationsPaused = motionAllowed();
  explicitlyEnabled = !animationsPaused;
  try { localStorage.setItem('hundredfold-motion', animationsPaused ? 'paused' : 'enabled'); } catch {}
  updateMotionPreference();
});
reducedMotion.addEventListener('change', updateMotionPreference);
updateMotionPreference();

if ('IntersectionObserver' in window) {
  const reveals = document.querySelectorAll<HTMLElement>('.section-heading,.project-heading,.project-layout,.project-details>div,.demo-intro,.demo-console,.approach>h2,.approach-grid article,.about-section>div,.contact-section>h2,.contact-bottom');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:.08,rootMargin:'0px 0px -24px 0px'});
  reveals.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
    if (!motionAllowed() || element.getBoundingClientRect().top < window.innerHeight) element.classList.add('is-revealed');
    else revealObserver.observe(element);
  });
  const ambientObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('motion-visible', entry.isIntersecting));
  }, {threshold:.05});
  document.querySelectorAll('.portrait-panel,.system-preview,.about-label').forEach(element => ambientObserver.observe(element));
}

// Keyboard focus must never land inside a hidden reveal.
document.addEventListener('focusin', event => {
  if (event.target instanceof Element) event.target.closest('.reveal')?.classList.add('is-revealed');
});
if (motionAllowed()) {
  ['.hero-content .eyebrow','h1','.hero-intro','.hero-actions','.hero-foot','.portrait-frame','.portrait-caption'].forEach((selector,index) => {
    document.querySelector(selector)?.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:820,delay:index*75,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
  });
}
