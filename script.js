/* Alexis Carpentier — portfolio v3
   Shared: language (FR / EN), page curtain, scroll reveals.
   Home: the project strip and the project opening.  Project pages: hero reveal and the way back. */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pad = n => String(n).padStart(2, '0');
const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
const mq = matchMedia('(max-width:760px)');
const root = document.documentElement;
const ss = {get(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}},del(k){try{sessionStorage.removeItem(k)}catch(e){}}};

/* ---------- language ---------- */
let lang = 'fr';
try { lang = localStorage.getItem('preferredLanguage') === 'en' ? 'en' : 'fr'; } catch (e) {}
function applyLang() {
  root.lang = lang;
  $$('[data-en]').forEach(el => {
    if (el.dataset.fr === undefined) el.dataset.fr = el.innerHTML;
    el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.fr;
  });
  $$('[data-en-label]').forEach(el => {
    if (el.dataset.frLabel === undefined) el.dataset.frLabel = el.getAttribute('aria-label') || '';
    el.setAttribute('aria-label', lang === 'en' ? el.dataset.enLabel : el.dataset.frLabel);
  });
  const t = $('meta[name="title-en"]');
  if (t) { if (!t.dataset.fr) t.dataset.fr = document.title; document.title = lang === 'en' ? t.content : t.dataset.fr; }
  $$('.lang').forEach(b => { b.textContent = lang === 'en' ? 'FR' : 'EN'; b.setAttribute('aria-label', lang === 'en' ? 'Passer en français' : 'Switch to English'); });
  document.dispatchEvent(new CustomEvent('langchange'));
}
$$('.lang').forEach(b => b.addEventListener('click', () => {
  lang = lang === 'en' ? 'fr' : 'en';
  try { localStorage.setItem('preferredLanguage', lang); } catch (e) {}
  applyLang();
}));
const tr = (fr, en) => lang === 'en' && en ? en : fr;
applyLang();

/* ---------- page curtain between pages ---------- */
function uncover() {
  if (!root.classList.contains('cover')) return;
  requestAnimationFrame(() => requestAnimationFrame(() => { root.classList.add('uncover'); root.classList.remove('cover'); }));
}
uncover();
addEventListener('pageshow', e => { if (e.persisted) { document.body.classList.remove('leaving'); root.classList.remove('cover'); } });
function go(url, curtain = true) {
  if (still || !curtain) { location.href = url; return; }
  ss.set('curtain', '1');
  document.body.classList.add('leaving');
  setTimeout(() => { location.href = url; }, 650);
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target === '_blank' || a.hasAttribute('download')) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || /^(mailto|tel):/.test(a.href)) return;
  if (url.pathname === location.pathname) return; /* same page (anchors) */
  e.preventDefault();
  go(url.href);
});

/* ---------- scroll reveals ---------- */
const io = 'IntersectionObserver' in window && !still ? new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { rootMargin: '0px 0px -8% 0px' }) : null;
$$('[data-reveal]').forEach(el => io ? io.observe(el) : el.classList.add('in'));
const ahead = $('.ahead'); if (ahead) setTimeout(() => ahead.classList.add('in'), still ? 0 : 250);

const letters = txt => [...txt].map((c, i) => c === ' ' ? '<span>&nbsp;</span>' : `<span><em style="transition-delay:${i * 40}ms">${c}</em></span>`).join('');

/* ---------- project page ---------- */
const hero = $('.phero');
if (hero) {
  const viaStrip = root.classList.contains('via-strip');
  if (viaStrip) {
    hero.classList.add('ready');
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('via-strip')));
  } else {
    setTimeout(() => hero.classList.add('ready'), still ? 0 : (root.classList.contains('uncover') || ss.get('curtain') ? 450 : 120));
  }
  ss.del('curtain');
  $$('.vmeta > div').forEach((d, i) => d.style.setProperty('--i', i));
  /* "Fermer": back to the strip, with the image flying back into its slice */
  $$('[data-back]').forEach(a => a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    if (scrollY > 40 || still) { go(a.href); return; }
    ss.set('back', a.dataset.back);
    hero.classList.remove('ready');
    setTimeout(() => go(a.href, false), still ? 0 : 380);
  }));
  /* keyboard: arrows for neighbours, Escape to close */
  addEventListener('keydown', e => {
    if (e.target.closest('input,textarea')) return;
    const k = e.key === 'Escape' ? '[data-back]' : e.key === 'ArrowRight' ? '[data-next]' : e.key === 'ArrowLeft' ? '[data-prev]' : null;
    const a = k && $(k); if (a) { e.preventDefault(); a.click(); }
  });
}

/* ---------- home ---------- */
const track = $('#track');
if (!track || !window.PROJECTS) { ss.del('curtain'); return; }
ss.del('curtain');
const P = window.PROJECTS;
const home = $('#home'), view = $('#view'), vMedia = $('#vMedia');

/* ruler */
$('#tot').textContent = pad(P.length);
const tL = $('#tL'), tR = $('#tR');
P.forEach((_, i) => (i < P.length / 2 ? tL : tR).append(document.createElement('i')));
const ticks = [...tL.children, ...tR.children];
function mark(i) { $('#cur').textContent = pad(i + 1); ticks.forEach((t, k) => t.classList.toggle('on', k === i)); }

const loopVideo = (p, cls) => `<video class="${cls}" autoplay muted loop playsinline preload="metadata" poster="${p.poster}"><source src="${p.video}" type="video/mp4"></video>`;
const S = [];
P.forEach((p, i) => {
  const b = document.createElement('button');
  b.className = 'slice';
  const colour = p.video ? loopVideo(p, 'c') : `<img class="c" src="${p.cover}" alt="" decoding="async">`;
  b.innerHTML = `<span class="in"><img class="g" src="${p.video ? p.poster : p.cover}" alt="" decoding="async">${colour}</span>`;
  /* a slice sliding under a still cursor is not a hover: only count it when the strip is at rest
     and the mouse really moves over it */
  const enter = () => { if (stripMoving || hovered === i) return; hovered = i; show(i); wake(); };
  b.addEventListener('mouseenter', enter);
  b.addEventListener('mousemove', enter);
  b.addEventListener('mouseleave', () => { if (hovered === i) { hovered = null; wake(); } });
  b.addEventListener('focus', () => { show(i); if (!mq.matches && b.matches(':focus-visible')) { scrollTo(0, scrollFor(i * STEP)); wake(); } });
  b.addEventListener('click', () => openView(i));
  track.append(b);
  S.push({ el: b, in: b.firstElementChild, c: b.querySelector('.c'), p: i });
});
const slices = S.map(o => o.el);
let hovered = null, shown = -1, active = 0, stripMoving = false;
function labels() { slices.forEach((b, i) => { const p = P[i]; b.setAttribute('aria-label', `${p.t} — ${tr(p.type, p.typeEn)}, ${p.y}`); }); }
labels();

function show(i, force) {
  if (i === shown && !force && !hidden) return; shown = i; hidden = false; const p = P[i];
  clearTimeout(infoTimer); infoTimer = null;
  const big = $('#big'); big.classList.remove('in', 'out'); big.innerHTML = letters(p.t);
  requestAnimationFrame(() => requestAnimationFrame(() => big.classList.add('in')));
  infoTo(i);
  mark(i);
}
/* The info row never changes in plain sight. The first time it rolls in; after that, a light bar
   sweeps over each value from the left, the words are swapped while they are covered, and the bar
   leaves to the right. Changes asked for mid-sweep wait for it to finish, then take the latest. */
let filled = -1, sweeping = false, wanted = -1;
const COVER = 240, STAGGER = 30;
function fillInfo(i) {
  const p = P[i]; filled = i;
  $('#iN').textContent = `${pad(i + 1)} / ${pad(P.length)}`; $('#iT').textContent = p.t;
  $('#iType').textContent = tr(p.type, p.typeEn); $('#iRole').textContent = tr(p.role, p.roleEn); $('#iY').textContent = p.y;
}
function infoTo(i, force) {
  const pi = $('#pinfo');
  if (!pi.classList.contains('in')) { fillInfo(i); clearTimeout(pi._t); pi._t = setTimeout(() => pi.classList.add('in'), still ? 0 : 160); return; }
  if (still) { fillInfo(i); return; }
  if (sweeping) { wanted = i; return; }
  if (i === filled && !force) return;
  sweeping = true; wanted = -1;
  pi.classList.add('wipe');
  const covered = COVER + STAGGER * 4;
  setTimeout(() => {
    fillInfo(wanted >= 0 ? wanted : i); wanted = -1;
    pi.classList.remove('wipe');
    setTimeout(() => { sweeping = false; if (wanted >= 0 && wanted !== filled) infoTo(wanted); }, covered);
  }, covered + 20);
}
/* While the strip is moving, the giant title steps aside (a soft fade) instead of following every
   project that flies past; once a project settles in the middle it rises back in. */
let hidden = false, infoTimer = null;
function hideInfo() {
  if (hidden) return; hidden = true;
  $('#big').classList.add('out');
}
function settleInfo(moving) {
  if (hovered !== null) return;
  if (moving) { clearTimeout(infoTimer); infoTimer = null; if (active !== shown) hideInfo(); return; }
  if (!infoTimer && (hidden || active !== shown)) infoTimer = setTimeout(() => { infoTimer = null; if (hovered === null) show(active, true); }, still ? 0 : 120);
}
$$('#pinfo > div, .vmeta > div').forEach(d => d.style.setProperty('--i', [...d.parentNode.children].indexOf(d)));
document.addEventListener('langchange', () => { labels(); show(shown < 0 ? 0 : shown, true); infoTo(shown < 0 ? 0 : shown, true); });

/* Geometry. Vertical scroll moves the page; horizontal input (trackpad swipe, shift+wheel, drag,
   arrows) moves the strip. Nothing snaps: speed alone makes the slices near the centre swell,
   stretch, turn toward you and take their colour, then everything settles flat and grey. */
let W, G, STEP, X0, PER, last = performance.now(), awake = true;
let sx = null, psx = null, amp = 0;
const hv = S.map(() => 0), prev = S.map(() => ({ t: '', i: '', o: -1 }));
const wake = () => { awake = true; };
const maxOff = () => STEP * (S.length - 1);
function sizeHome() {
  if (mq.matches) { home.style.height = ''; slices.forEach((s, j) => { s.style.transform = ''; S[j].in.style.transform = ''; S[j].c.style.opacity = ''; prev[j] = { t: '', i: '', o: -1 }; }); return; }
  W = Math.round(Math.min(Math.max(110, innerWidth * .095), 170)); G = Math.round(W * .22); STEP = W + G; PER = innerHeight * .55;
  const H = Math.round(Math.min(innerHeight * .44, W * 3));
  home.style.setProperty('--W', W + 'px'); home.style.setProperty('--H', H + 'px');
  X0 = innerWidth / 2 - W / 2;
  home.style.height = (innerHeight + PER * (S.length - 1)) + 'px';
  sx = null; wake();
}
/* the strip position comes from the page scroll (the home is pinned while the strip runs); a
   sideways input is turned into that same scroll, so wheel, trackpad, drag and arrows agree */
const curOff = () => Math.min(Math.max(scrollY - home.offsetTop, 0) / PER, S.length - 1) * STEP;
const scrollFor = o => home.offsetTop + Math.max(0, Math.min(maxOff(), o)) / STEP * PER;
const nudge = d => { const y = scrollFor(curOff() + d); if (Math.abs(y - scrollY) < .5) return false; scrollTo(0, y); wake(); return true; };
const homeVisible = () => { const r = home.getBoundingClientRect(); return r.bottom > innerHeight * .35 && r.top < innerHeight * .65; };
addEventListener('wheel', e => {
  if (mq.matches || e.ctrlKey || view.classList.contains('open') || !homeVisible()) return;
  const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
  if (!dx || (!e.shiftKey && Math.abs(dx) < Math.abs(e.deltaY))) return;
  const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerWidth : 1;
  if (nudge(dx * unit * 1.15)) e.preventDefault();
}, { passive: false });
let drag = null, dragged = false;
track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button !== 0 || mq.matches) return; drag = { x: e.clientX, o: curOff() }; dragged = false; });
addEventListener('pointermove', e => {
  if (!drag) return; const d = drag.x - e.clientX;
  if (!dragged && Math.abs(d) > 6) { dragged = true; document.body.classList.add('dragging'); }
  if (dragged) { scrollTo(0, scrollFor(drag.o + d * 1.3)); wake(); }
});
addEventListener('pointerup', () => { drag = null; document.body.classList.remove('dragging'); });
track.addEventListener('click', e => { if (dragged) { e.stopPropagation(); e.preventDefault(); dragged = false; } }, true);
addEventListener('keydown', e => {
  if (view.classList.contains('open') || mq.matches || !homeVisible() || e.target.closest('input,textarea')) return;
  if (e.key === 'ArrowRight') { nudge(STEP); e.preventDefault(); }
  if (e.key === 'ArrowLeft') { nudge(-STEP); e.preventDefault(); }
});

function step(now) {
  if (mq.matches || (view.classList.contains('open') && !view.classList.contains('closing'))) return;
  const dt = Math.min(now - last, 64) || 16.7; last = now; const f = dt / 16.7;
  const tx = X0 - curOff();
  if (sx === null) { sx = psx = tx; awake = true; }
  sx += (tx - sx) * (still ? 1 : 1 - Math.pow(.885, f)); if (Math.abs(tx - sx) < .05) sx = tx;
  const v = Math.abs(sx - psx) / f; psx = sx;
  const want = still ? 0 : Math.min(1, v / 16);
  amp += (want - amp) * (1 - Math.pow(want > amp ? .82 : .95, f)); if (amp < .002 && want === 0) amp = 0;
  let busy = v > 0 || amp > 0;
  const hk = 1 - Math.pow(.84, f);
  for (let j = 0; j < S.length; j++) { const w = hovered === S[j].p ? 1 : 0; if (hv[j] !== w) { hv[j] += (w - hv[j]) * hk; if (Math.abs(w - hv[j]) < .004) hv[j] = w; busy = true; } }
  if (!busy && !awake) return; awake = false;
  const mid = innerWidth / 2; let best = 0, bd = 1e9;
  for (let j = 0; j < S.length; j++) {
    const cx = sx + j * STEP + W / 2, d = (cx - mid) / mid, ad = Math.abs(cx - mid);
    if (ad < bd) { bd = ad; best = j; }
    const bell = Math.exp(-d * d * 2.4), dc = Math.max(-1, Math.min(1, d));
    const sc = 1 + amp * .14 * bell, sy = 1 + amp * .3 * bell, rot = amp * 26 * dc, push = amp * W * .55 * dc * bell;
    const t = `translate3d(${(cx - W / 2 + push).toFixed(1)}px,0,0) rotateY(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)},${(sc * sy).toFixed(4)})`;
    const ti = `scaleY(${(1 / sy).toFixed(4)})`;
    const o = Math.round(Math.max(hv[j], Math.min(1, amp * 1.4) * bell) * 100) / 100;
    const pv = prev[j];
    if (t !== pv.t) { S[j].el.style.transform = t; pv.t = t; }
    if (ti !== pv.i) { S[j].in.style.transform = ti; pv.i = ti; }
    if (o !== pv.o) { S[j].c.style.opacity = o; pv.o = o; }
  }
  if (S[best].p !== active) { active = S[best].p; mark(active); if (hovered === null) infoTo(active); }
  stripMoving = v > 1;
  if (stripMoving && hovered !== null) hovered = null;
  settleInfo(stripMoving);
}
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(now - (frame.l || now), 64) || 16.7; frame.l = now;
  if (window.journeyStep) { try { window.journeyStep(dt); } catch (e) { console.error(e); } }
  try { step(now); } catch (e) { console.error(e); }
}

/* phone: the strip is swiped natively; the title follows the slice in the middle */
function syncSwipe() {
  if (!mq.matches) return; const c = innerWidth / 2; let best = 0, d = 1e9;
  slices.forEach((s, j) => { const r = s.getBoundingClientRect(), m = Math.abs(r.left + r.width / 2 - c); if (m < d) { d = m; best = j; } });
  if (best !== active) { active = best; mark(best); infoTo(best); }
  settleInfo(true); clearTimeout(syncSwipe.t); syncSwipe.t = setTimeout(() => settleInfo(false), 140);
}
track.addEventListener('scroll', syncSwipe, { passive: true });
mq.addEventListener('change', () => { shown = -1; sizeHome(); syncSwipe(); });
addEventListener('resize', sizeHome);

/* ---------- opening a project: the slice becomes the project page, then we navigate ---------- */
const DUR = still ? 0 : 1150, IO = 'cubic-bezier(.76,0,.24,1)';
function fillView(i) {
  const p = P[i], n = P[(i + 1) % P.length];
  vMedia.innerHTML = p.video ? `<video autoplay muted loop playsinline poster="${p.poster}"><source src="${p.video}" type="video/mp4"></video>` : `<img src="${p.hero}" alt="">`;
  $('#vSide').src = n.cover;
  $('#vBig').innerHTML = p.l.map(w => `<div class="ln">${letters(w)}</div>`).join('');
  $('#vY').textContent = p.y; $('#vType').textContent = tr(p.type, p.typeEn); $('#vRole').textContent = tr(p.role, p.roleEn); $('#vTools').textContent = p.tools;
  mark(i);
}
const rectOf = el => { const r = el.getBoundingClientRect(); return { left: r.left, top: r.top, width: r.width, height: r.height }; };
const box = r => ({ left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
function makeGhost(i, from, to) {
  const p = P[i], g = document.createElement('div'); g.className = 'ghost';
  g.innerHTML = `<img src="${p.video ? p.poster : p.cover}" alt="">`;
  Object.assign(g.style, box(to)); document.body.append(g);
  if (DUR) {
    g.animate([box(from), box(to)], { duration: DUR, easing: IO });
    g.firstChild.animate([{ transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: DUR * 1.3, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
  return g;
}
function scatter(j0, out) {
  slices.forEach((s, j) => {
    if (j === j0) return;
    const d = Math.abs(j - j0), dir = j < j0 ? -1 : 1;
    const kf = [{ opacity: 1, translate: '0 0' }, { opacity: 0, translate: `${dir * 40}px ${dir * -18 * Math.min(d, 8)}px` }];
    s.animate(out ? kf : kf.reverse(), { duration: still ? 0 : 650, delay: still ? 0 : (out ? d * 30 : 200 + (P.length - d) * 25), easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
  });
}
let opening = false;
function openView(i) {
  if (opening) return; opening = true;
  const p = P[i];
  if (still) { location.href = p.url; return; }
  const from = rectOf(slices[i]);
  fillView(i);
  home.classList.add('away'); slices[i].style.visibility = 'hidden'; scatter(i, true);
  view.classList.add('open'); vMedia.classList.add('hold');
  const col = `inset(0px ${innerWidth - from.left - from.width}px 0px ${from.left}px)`;
  view.animate([{ clipPath: col }, { clipPath: 'inset(0px 0px 0px 0px)' }], { duration: DUR, easing: IO, fill: 'forwards' });
  makeGhost(i, from, rectOf(vMedia));
  setTimeout(() => view.classList.add('ready'), 520);
  /* once the letters have landed, the real page takes over with the same layout */
  setTimeout(() => { ss.set('via', 'strip'); location.href = p.url; }, DUR + 700);
}
/* coming back from a project with "Fermer": start opened, then fly the image back into the strip */
function returnFrom(slug) {
  const i = P.findIndex(p => p.slug === slug); if (i < 0) return;
  sx = null; amp = 0; active = i; show(i, true);
  if (mq.matches) { slices[i].scrollIntoView({ inline: 'center', block: 'nearest' }); return; }
  scrollTo({ top: scrollFor(i * STEP), behavior: 'instant' });
  step(performance.now());
  fillView(i); view.classList.add('open', 'ready', 'closing'); home.classList.add('away');
  slices[i].style.visibility = 'hidden';
  slices.forEach((s, j) => { if (j !== i) s.style.opacity = '0'; });
  requestAnimationFrame(() => {
    slices.forEach(s => { s.style.opacity = ''; });
    const to = rectOf(slices[i]), from = rectOf(vMedia);
    vMedia.classList.add('hold');
    const g = makeGhost(i, from, to);
    const col = `inset(0px ${innerWidth - to.left - to.width}px 0px ${to.left}px)`;
    view.classList.remove('ready');
    view.animate([{ clipPath: 'inset(0px 0px 0px 0px)' }, { clipPath: col }], { duration: DUR, easing: IO, fill: 'forwards' });
    scatter(i, false); home.classList.remove('away');
    setTimeout(() => {
      view.classList.remove('open', 'closing'); view.getAnimations().forEach(a => a.cancel());
      slices[i].style.visibility = ''; g.remove(); vMedia.classList.remove('hold');
      slices.forEach(s => s.getAnimations().forEach(a => a.cancel()));
      slices[i].focus({ preventScroll: true });
    }, DUR + 250);
  });
}
/* the browser's back button brings a cached page: reset it */
addEventListener('pageshow', e => {
  if (!e.persisted) return;
  opening = false; view.classList.remove('open', 'ready', 'closing'); view.getAnimations().forEach(a => a.cancel());
  home.classList.remove('away'); $$('.ghost').forEach(g => g.remove());
  slices.forEach(s => { s.style.visibility = ''; s.getAnimations().forEach(a => a.cancel()); });
});

sizeHome();
const back = ss.get('back'); ss.del('back');
if (back) returnFrom(back); else show(0);
syncSwipe();
requestAnimationFrame(frame);

/* "Contact" links land on the end of the journey, where the contact is */
const journey = $('#contact');
function toContact() { if (window.journeySkip) window.journeySkip(); scrollTo({ top: journey.offsetTop, behavior: 'instant' }); }
$$('a[href="#contact"], a[href$="index.html#contact"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); toContact(); }));
if (location.hash === '#contact') setTimeout(() => toContact(), 60);
})();
