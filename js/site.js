/* Gedeelde nav, footer, Tailwind-config en hulpfuncties voor alle pagina's */
tailwind.config = {
  theme: { extend: {
    fontFamily: { display: ['"Bricolage Grotesque"', 'sans-serif'], sans: ['"DM Sans"', 'sans-serif'] },
    colors: { ink: '#0B1020', panel: '#141B34', aqua: '#2DE2C8', violet: '#8B6CFF', coral: '#FF7A59', sun: '#FFD166' },
    keyframes: {
      flowR: { '0%': { left: '0%', opacity: 0 }, '12%': { opacity: 1 }, '88%': { opacity: 1 }, '100%': { left: '100%', opacity: 0 } },
      flowL: { '0%': { left: '100%', opacity: 0 }, '12%': { opacity: 1 }, '88%': { opacity: 1 }, '100%': { left: '0%', opacity: 0 } },
      float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      pop: { '0%': { transform: 'scale(.9)', opacity: 0 }, '100%': { transform: 'scale(1)', opacity: 1 } },
      rise: { '0%': { transform: 'translateY(14px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } }
    },
    animation: { flowR: 'flowR 4s linear infinite', flowL: 'flowL 4s linear infinite', float: 'float 6s ease-in-out infinite', pop: 'pop .25s ease-out', rise: 'rise .6s ease-out both' }
  } }
};

const page = document.body.dataset.page;
const links = [['index.html', 'home', 'Home'], ['product.html', 'product', 'Het toestel'], ['faq.html', 'faq', 'FAQ en contact']];
const li = (c) => links.map(l => `<a href="${l[0]}" class="px-3 py-2 rounded-full ${page === l[1] ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'} ${c}">${l[2]}</a>`).join('');
document.body.insertAdjacentHTML('afterbegin', `
<header class="sticky top-0 z-50 bg-ink/80 backdrop-blur-xl border-b border-white/10">
  <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
    <a href="index.html" class="font-display text-xl font-bold flex items-center gap-2"><span class="grid place-items-center w-8 h-8 rounded-xl bg-aqua text-ink"><i class="bi bi-wind"></i></span>Vernast</a>
    <nav class="hidden md:flex items-center gap-1 text-sm">${li('')}
      <a href="portaal.html" class="ml-2 px-4 py-2 rounded-full bg-aqua text-ink font-semibold hover:bg-white transition ${page === 'portaal' ? 'ring-2 ring-white' : ''}"><i class="bi bi-person-circle mr-1"></i>Klantenportaal</a></nav>
    <button id="mbtn" class="md:hidden text-2xl" aria-label="Menu"><i class="bi bi-list"></i></button>
  </div>
  <nav id="mmenu" class="hidden md:hidden px-4 pb-4 flex-col gap-1 text-sm">${li('block')}
    <a href="portaal.html" class="block px-4 py-2 rounded-full bg-aqua text-ink font-semibold text-center mt-2">Klantenportaal</a></nav>
</header>`);
const $m = document.getElementById('mmenu');
document.getElementById('mbtn').onclick = () => { $m.classList.toggle('hidden'); $m.classList.toggle('flex'); };

if (!document.body.dataset.nofooter) document.body.insertAdjacentHTML('beforeend', `
<footer class="border-t border-white/10 mt-20 py-10 text-sm text-slate-400">
  <div class="max-w-7xl mx-auto px-4 grid gap-6 md:grid-cols-3">
    <div><div class="font-display text-lg text-white font-bold">Vernast Healthy Home</div><p class="mt-2">Slimme ventilatie voor een gezonder binnenklimaat. Installatie, service en klantenportaal door Vernast.</p></div>
    <div class="flex flex-col gap-1"><a class="hover:text-white" href="product.html">Het toestel</a><a class="hover:text-white" href="faq.html">FAQ en contact</a><a class="hover:text-white" href="portaal.html">Klantenportaal</a></div>
    <p>Product: SIEGENIA AEROPLUS WRG smart.<br>Schoolproject met fictieve data. © 2026 Vernast.</p>
  </div>
</footer>`);

/* Meldingen */
window.toast = (msg) => {
  let c = document.getElementById('toasts');
  if (!c) { c = document.createElement('div'); c.id = 'toasts'; c.className = 'fixed bottom-20 lg:bottom-6 right-4 z-[60] flex flex-col gap-2'; document.body.append(c); }
  const t = document.createElement('div');
  t.className = 'animate-pop bg-panel border border-aqua/40 text-white rounded-2xl px-4 py-3 shadow-xl max-w-xs text-sm flex gap-2';
  t.innerHTML = `<i class="bi bi-check-circle-fill text-aqua"></i><span>${msg}</span>`;
  c.append(t); setTimeout(() => t.remove(), 3500);
};

/* Tellers die optellen wanneer ze zichtbaar worden */
const io = new IntersectionObserver((es) => es.forEach(e => {
  if (!e.isIntersecting) return; io.unobserve(e.target);
  const el = e.target, to = +el.dataset.count, t0 = performance.now();
  const step = (t) => { const p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}), { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
