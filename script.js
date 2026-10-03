// Horaires (heure de Paris) — 0 = dimanche ... 6 = samedi, 24 = minuit
const HOURS = {
  0: [9, 24],
  1: [8, 23],
  2: [8, 23],
  3: [8, 23],
  4: [8, 23],
  5: [8, 23],
  6: [9, 24],
};

// Langue en cours : 'fr', 'de' ou 'en' (choisie tout en bas de ce fichier)
let lang = 'fr';
const WORDS = {
  fr: {
    hour: (h) => (h === 24 ? 'minuit' : `${h}h`),
    open: (t) => `Ouvert maintenant · jusqu'à ${t}`,
    today: (t) => `Fermé · ouvre à ${t}`,
    tomorrow: (t) => `Fermé · ouvre demain à ${t}`,
    map: 'Le Comptoir Flambé sur la carte',
  },
  de: {
    hour: (h) => (h === 24 ? 'Mitternacht' : `${h} Uhr`),
    open: (t) => `Jetzt geöffnet · bis ${t}`,
    today: (t) => `Geschlossen · öffnet um ${t}`,
    tomorrow: (t) => `Geschlossen · öffnet morgen um ${t}`,
    map: 'Le Comptoir Flambé auf der Karte',
  },
  en: {
    hour: (h) => (h === 24 ? 'midnight' : `${h > 12 ? h - 12 : h} ${h >= 12 ? 'pm' : 'am'}`),
    open: (t) => `Open now · until ${t}`,
    today: (t) => `Closed · opens at ${t}`,
    tomorrow: (t) => `Closed · opens tomorrow at ${t}`,
    map: 'Le Comptoir Flambé on the map',
  },
};

// Jour et heure actuels à Kaysersberg, quel que soit le fuseau du visiteur
function parisNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, time: Number(get('hour')) + Number(get('minute')) / 60 };
}

// Pastille « Ouvert / Fermé » + jour du jour dans le tableau des horaires
function updateStatus() {
  const { day, time } = parisNow();
  const [open, close] = HOURS[day];
  const isOpen = time >= open && time < close;
  const words = WORDS[lang];
  let label = words.open(words.hour(close));
  if (!isOpen) {
    label = time < open
      ? words.today(words.hour(open))
      : words.tomorrow(words.hour(HOURS[(day + 1) % 7][0]));
  }

  document.querySelectorAll('[data-status]').forEach((status) => {
    status.classList.toggle('is-open', isOpen);
    status.classList.toggle('is-closed', !isOpen);
    status.querySelector('.status__text').textContent = label;
  });
  document.querySelectorAll('#hours tr').forEach((row) => {
    row.classList.toggle('is-today', Number(row.dataset.day) === day);
  });
}
updateStatus();
setInterval(updateStatus, 60_000);

// Accueil : en-tête transparent sur la photo, plein une fois qu'on descend
const header = document.getElementById('header');
const hero = document.querySelector('.hero');
if (hero) {
  new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-solid', !entry.isIntersecting);
  }, { rootMargin: `-${header.offsetHeight}px 0px 0px 0px` }).observe(hero);
}

// Menu plein écran (mobile)
const overlay = document.getElementById('overlay');
const burger = document.querySelector('.burger');
const closeBtn = overlay.querySelector('.overlay__close');
function toggleMenu(open) {
  if (overlay.classList.contains('is-open') === open) return;
  overlay.classList.toggle('is-open', open);
  document.body.classList.toggle('is-locked', open);
  burger.setAttribute('aria-expanded', String(open));
  (open ? closeBtn : burger).focus();
}
burger.addEventListener('click', () => toggleMenu(true));
closeBtn.addEventListener('click', () => toggleMenu(false));
// Le clavier reste dans le menu tant qu'il est ouvert
overlay.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;
  const items = [...overlay.querySelectorAll('a, button')];
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
overlay.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') toggleMenu(false);
});

// Apparition douce des blocs au scroll (et départ de la cigogne)
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      revealer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .skyline').forEach((el) => revealer.observe(el));

// Page carte : catégorie active pendant le scroll
const chips = [...document.querySelectorAll('.chip')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    chips.forEach((chip) => chip.classList.toggle('is-active', chip.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-25% 0px -65% 0px' });
chips.forEach((chip) => {
  const target = document.querySelector(chip.hash);
  if (target) spy.observe(target);
});

// Personnages alsaciens à côté des grands titres, tirés au hasard à chaque visite.
// Titres centrés : un couple (une Alsacienne, un Alsacien) de part et d'autre. Sinon : un seul personnage.
const pick = (list) => list[Math.floor(Math.random() * list.length)];
document.querySelectorAll('.titled').forEach((title) => {
  const couple = [pick([1, 3]), pick([2, 4])];
  if (Math.random() < 0.5) couple.reverse();
  title.style.setProperty('--fig', `var(--fig-${couple[0]})`);
  title.style.setProperty('--fig2', `var(--fig-${couple[1]})`);
});

// Langue : français, allemand ou anglais sur tout le site.
// Chaque texte à traduire porte ses versions dans data-de et data-en.
const langButtons = [...document.querySelectorAll('[data-lang]')];
const texts = [...document.querySelectorAll('[data-de]')];
texts.forEach((el) => { el.dataset.fr = el.innerHTML; });
function setLang(next) {
  lang = next;
  document.documentElement.lang = lang;
  texts.forEach((el) => { el.innerHTML = el.dataset[lang]; });
  langButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  updateStatus();
}
langButtons.forEach((button) => button.addEventListener('click', () => {
  setLang(button.dataset.lang);
  try { localStorage.setItem('lang', lang); } catch (e) { /* stockage indisponible */ }
}));
// Au premier passage : la langue du téléphone, sinon l'anglais pour les visiteurs non francophones
let saved = null;
try { saved = localStorage.getItem('lang'); } catch (e) { /* stockage indisponible */ }
const browser = (navigator.language || 'fr').slice(0, 2);
const start = ['fr', 'de', 'en'].includes(saved) ? saved : (['fr', 'de'].includes(browser) ? browser : 'en');
if (start !== 'fr') setLang(start);

// Page infos : le plan Google ne se charge qu'à la demande
document.querySelectorAll('[data-map]').forEach((box) => {
  box.querySelector('button').addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.title = WORDS[lang].map;
    frame.src = box.dataset.map;
    box.replaceChildren(frame);
  });
});
