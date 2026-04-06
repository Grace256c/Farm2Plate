/* =====================================================
   FARM 2 PLATE CONNECT — index.js (Homepage)
   Features: Splash, Dark Mode, Language Dropdown,
   Counters, Charts, Leaflet Map, AI Assistant,
   Voice Recognition, Donation Popups, Modals
   Python backend: POST /api/chat, /api/register
   ===================================================== */

/* =========== TRANSLATIONS =========== */
const T = {
  en: {
    hero_badge:"🇺🇬 Built for Uganda & East Africa",
    hero_h1:"Connecting Farms<br/><em>to Families.</em>",
    hero_sub:"A mobile + SMS platform linking farmers, households, schools & NGOs — ending food waste and fighting malnutrition across Uganda."
  },
  lg: {
    hero_badge:"🇺🇬 Ezakozesebwa mu Uganda ne Afrika",
    hero_h1:"Okutana Ennimiro<br/><em>n'Amaka.</em>",
    hero_sub:"Enkola ya simu n'obubaka bwa SMS ekimanyi abalimi, amaka, essomero n'abawagizi — okukomerera okusasagala kw'emmere n'enjala mu Uganda."
  },
  sw: {
    hero_badge:"🇺🇬 Imetengenezwa kwa Uganda na Afrika Mashariki",
    hero_h1:"Kuunganisha Mashamba<br/><em>na Familia.</em>",
    hero_sub:"Jukwaa la simu + SMS linalowachanganya wakulima, kaya, shule na NGO — kumaliza upotevu wa chakula na kupigana na utapiamlo Uganda."
  }
};

let currentLang = localStorage.getItem('f2p_lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('f2p_lang', lang);
  const t = T[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (t[k]) el.innerHTML = t[k];
  });
  document.querySelectorAll('.lang-opt').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  document.documentElement.lang = lang;
}

/* =========== LANGUAGE DROPDOWN =========== */
const langDrop  = document.getElementById('lang-drop');
const langTrig  = document.getElementById('lang-trigger');
const langMenu  = document.getElementById('lang-menu');

langTrig.addEventListener('click', (e) => {
  e.stopPropagation();
  langDrop.classList.toggle('open');
  langTrig.setAttribute('aria-expanded', langDrop.classList.contains('open'));
});

document.addEventListener('click', () => { langDrop.classList.remove('open'); langTrig.setAttribute('aria-expanded','false'); });

document.querySelectorAll('.lang-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    applyLang(btn.dataset.lang);
    document.getElementById('lang-flag').textContent = btn.dataset.flag;
    document.getElementById('lang-code').textContent = btn.dataset.lang.toUpperCase();
    langDrop.classList.remove('open');
  });
});

/* =========== SPLASH =========== */
window.addEventListener('load', () => {
  applyLang(currentLang);
  setTimeout(() => {
    document.getElementById('splash').classList.add('gone');
    // Cookie banner
    if (!localStorage.getItem('f2p_cookie')) {
      setTimeout(() => document.getElementById('cookie-bar').classList.add('show'), 700);
    }
    initCounters();
    initCharts();
    initMap();
    initScrollReveal();
    startHeroNums();
    scheduleDonationPopups();
  }, 2000);
});

/* =========== COOKIE =========== */
document.getElementById('cb-accept').onclick = () => { localStorage.setItem('f2p_cookie','accepted'); document.getElementById('cookie-bar').classList.remove('show'); };
document.getElementById('cb-decline').onclick = () => { localStorage.setItem('f2p_cookie','declined'); document.getElementById('cookie-bar').classList.remove('show'); };

/* =========== DARK MODE =========== */
const darkBtn = document.getElementById('dark-btn');
const saved = localStorage.getItem('f2p_theme') || 'light';
document.documentElement.setAttribute('data-theme', saved);
setDarkIcon(saved);
darkBtn.onclick = () => {
  const n = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', n);
  localStorage.setItem('f2p_theme', n);
  setDarkIcon(n);
  if (window._wc) { window._wc.destroy(); window._ic.destroy(); initCharts(); }
};
function setDarkIcon(t) { darkBtn.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'; }

/* =========== NAVBAR =========== */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});
document.getElementById('hamburger').addEventListener('click', function() {
  document.getElementById('nav-links').classList.toggle('open');
  this.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
  });
});

/* =========== HERO NUMBERS =========== */
function startHeroNums() {
  document.querySelectorAll('.hnum').forEach(el => {
    animCount(el, parseInt(el.dataset.target), 2000);
  });
}

/* =========== COUNTERS (scroll triggered) =========== */
function animCount(el, target, dur = 1600) {
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animCount(e.target, parseInt(e.target.dataset.target));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => obs.observe(el));
}

/* =========== CHARTS =========== */
function initCharts() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const tc = dark ? '#d8ede6' : '#1A3B32';
  const gc = dark ? 'rgba(255,255,255,.06)' : 'rgba(26,59,50,.06)';

  const opts = (title) => ({
    responsive: true, maintainAspectRatio: true,
    plugins: {
      legend: { labels: { color: tc, font: { family: 'Plus Jakarta Sans', size: 11 } } },
      title: { display: true, text: title, color: tc, font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' } }
    },
    scales: {
      x: { ticks: { color: tc, font: { size: 10 } }, grid: { color: gc } },
      y: { ticks: { color: tc, font: { size: 10 } }, grid: { color: gc } }
    }
  });

  const c1 = document.getElementById('wasteChart');
  const c2 = document.getElementById('incomeChart');
  if (!c1 || !c2) return;

  window._wc = new Chart(c1, {
    type: 'bar',
    data: {
      labels: ['2022','2023','2024','2025','2026'],
      datasets: [{ label: 'Food Waste %', data: [42,38,30,22,14],
        backgroundColor: ['#1A3B32','#1A3B32','#1A3B32','#FFD729','#FFD729'],
        borderRadius: 6 }]
    },
    options: opts('Food Waste Reduction (%)')
  });

  window._ic = new Chart(c2, {
    type: 'line',
    data: {
      labels: ['Q1','Q2','Q3','Q4','Q5','Q6'],
      datasets: [{ label: 'Avg Farmer Income (UGX 000s)', data: [180,215,270,315,375,430],
        borderColor: '#FFD729', backgroundColor: 'rgba(255,215,41,.12)',
        borderWidth: 3, fill: true, tension: 0.4,
        pointBackgroundColor: '#1A3B32', pointBorderColor: '#FFD729', pointRadius: 5 }]
    },
    options: opts('Farmer Income Growth')
  });
}

/* =========== LEAFLET MAP =========== */
function initMap() {
  const el = document.getElementById('ugandaMap');
  if (!el || typeof L === 'undefined') return;

  const map = L.map('ugandaMap', { center: [1.3, 32.3], zoom: 7, zoomControl: true });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 17
  }).addTo(map);

  const farmerIcon = L.divIcon({ className:'', html:'<div style="background:#FFD729;width:14px;height:14px;border-radius:50%;border:2px solid #1A3B32;box-shadow:0 2px 8px rgba(0,0,0,.25)"></div>', iconSize:[14,14] });
  const schoolIcon = L.divIcon({ className:'', html:'<div style="background:#1A3B32;width:14px;height:14px;border-radius:50%;border:2px solid #FFD729;box-shadow:0 2px 8px rgba(0,0,0,.25)"></div>', iconSize:[14,14] });
  const distIcon  = L.divIcon({ className:'', html:'<div style="background:#e05c1a;width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.25)"></div>', iconSize:[14,14] });
  const ngoIcon   = L.divIcon({ className:'', html:'<div style="background:#4a90d9;width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.25)"></div>', iconSize:[14,14] });

  const farmers = [
    [0.317, 32.581, 'Kampala Central — 423 farmers'],
    [0.453, 32.447, 'Wakiso District — 312 farmers'],
    [2.774, 32.299, 'Gulu — 289 farmers'],
    [1.063, 34.175, 'Mbale — 198 farmers'],
    [-0.607, 30.658, 'Mbarara — 256 farmers'],
    [0.450, 33.200, 'Jinja — 175 farmers'],
    [0.665, 30.274, 'Fort Portal — 134 farmers'],
    [3.022, 30.911, 'Arua — 167 farmers'],
    [1.715, 33.613, 'Soroti — 143 farmers'],
    [-0.055, 29.970, 'Kabale — 118 farmers'],
  ];

  const schools = [
    [0.320, 32.600, 'Kampala — 42 schools'],
    [0.460, 32.450, 'Wakiso — 28 schools'],
    [2.780, 32.310, 'Gulu — 31 schools'],
    [1.070, 34.180, 'Mbale — 24 schools'],
    [-0.600, 30.650, 'Mbarara — 19 schools'],
  ];

  const dist = [
    [0.310, 32.570, 'Kampala Hub'],
    [2.770, 32.290, 'Gulu Hub'],
    [1.060, 34.170, 'Mbale Hub'],
    [-0.610, 30.660, 'Mbarara Hub'],
  ];

  const ngos = [
    [0.325, 32.590, 'FAO Uganda Office'],
    [0.330, 32.595, 'WFP Uganda'],
    [0.315, 32.575, 'UNICEF Uganda'],
  ];

  farmers.forEach(([lat, lng, label]) => L.marker([lat, lng], { icon: farmerIcon }).addTo(map).bindPopup(`<b>🌾 Farmers</b><br/>${label}`));
  schools.forEach(([lat, lng, label]) => L.marker([lat, lng], { icon: schoolIcon }).addTo(map).bindPopup(`<b>🏫 School</b><br/>${label}`));
  dist.forEach(([lat, lng, label]) => L.marker([lat, lng], { icon: distIcon }).addTo(map).bindPopup(`<b>🚛 Distribution</b><br/>${label}`));
  ngos.forEach(([lat, lng, label]) => L.marker([lat, lng], { icon: ngoIcon }).addTo(map).bindPopup(`<b>🤝 NGO</b><br/>${label}`));
}

/* =========== SCROLL REVEAL =========== */
function initScrollReveal() {
  const els = document.querySelectorAll('.prob-card,.how-card,.pc,.sc,.mbox,.sdg-card,.team-card,.p-chip,.sol-item');
  els.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 0.07}s`;
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* =========== DONATION POPUPS =========== */
const donations = [
  { who: 'Sarah from Kampala', what: 'donated 20 kg of maize', when: '2 min ago' },
  { who: 'John from Gulu', what: 'donated 15 kg of beans', when: '5 min ago' },
  { who: 'St. Mary\'s School', what: 'placed an order for 50 kg vegetables', when: '8 min ago' },
  { who: 'FAO Uganda', what: 'matched 200 kg of food to 12 families', when: '11 min ago' },
  { who: 'Rose from Mbarara', what: 'donated 30 kg sweet potatoes', when: '14 min ago' },
  { who: 'Wakiso Farmer Co-op', what: 'listed 500 kg maize on the market', when: 'just now' },
  { who: 'Grace from Jinja', what: 'registered as a new farmer', when: '3 min ago' },
  { who: 'WFP Uganda', what: 'added 1,000 kg to the donation pool', when: '6 min ago' },
];
let donIdx = 0;

function showDonPopup() {
  const d = donations[donIdx % donations.length];
  document.getElementById('dp-who').textContent = d.who;
  document.getElementById('dp-what').textContent = d.what;
  document.getElementById('dp-when').textContent = d.when;
  document.getElementById('don-popup').classList.remove('hidden');
  donIdx++;
  setTimeout(hideDonPopup, 5000);
}
function hideDonPopup() { document.getElementById('don-popup').classList.add('hidden'); }

function scheduleDonationPopups() {
  setTimeout(() => { showDonPopup(); setInterval(showDonPopup, 12000); }, 4000);
}

/* =========== MODALS =========== */
function openModal(role) {
  const m = document.getElementById('reg-modal');
  m.classList.add('open');
  if (role) { const s = document.getElementById('m-role'); if (s) s.value = role; }
}
function closeModal() { document.getElementById('reg-modal').classList.remove('open'); }
function openVideo() { document.getElementById('vid-modal').classList.add('open'); }
function closeVideo() { document.getElementById('vid-modal').classList.remove('open'); }

document.getElementById('reg-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
document.getElementById('vid-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeVideo(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeVideo(); } });

function submitReg(e) {
  e.preventDefault();
  /* Python: POST /api/register { name, phone, email, role, district } */
  alert('✅ Registration submitted! You will receive an SMS confirmation shortly.');
  closeModal();
}

/* =========== AI ASSISTANT =========== */
let aiOpen = false;

function toggleAI() {
  aiOpen = !aiOpen;
  document.getElementById('ai-panel').classList.toggle('open', aiOpen);
}

async function sendAI() {
  const inp = document.getElementById('ap-in');
  const msg = inp.value.trim();
  if (!msg) return;
  appendMsg(msg, 'user');
  inp.value = '';
  const thinking = appendMsg('💭 Thinking...', 'thinking');

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are FarmBot, a warm and helpful AI assistant for Farm 2 Plate Connect — Uganda's food security platform.
You help farmers, households, schools, NGOs, and transporters understand the platform.
Keep answers short, practical, hopeful, and empowering.
Respond in the same language the user writes in (English, Luganda, or Swahili).
Key facts: SMS-based, works on any phone, MTN MoMo & Airtel payments, free to register, covers all Uganda.`,
        messages: [{ role: 'user', content: msg }]
      })
    });
    const data = await res.json();
    thinking.remove();
    appendMsg(data.content?.[0]?.text || fallback(msg), 'bot');
  } catch {
    thinking.remove();
    appendMsg(fallback(msg), 'bot');
  }
}

function fallback(msg) {
  const m = msg.toLowerCase();
  if (m.includes('register') || m.includes('sign') || m.includes('wandiika') || m.includes('sajili'))
    return '👨‍🌾 Click "Get Started" or "Join as Farmer" — fill in your name, phone number & district. It\'s completely free!';
  if (m.includes('sms') || m.includes('phone') || m.includes('simu'))
    return '📱 Our SMS system works on any phone — even a basic feature phone with no internet!';
  if (m.includes('donat') || m.includes('food') || m.includes('emmere') || m.includes('chakula'))
    return '🍽️ Click "Partner / Donate" to contribute. Food surplus is matched automatically to families in need.';
  if (m.includes('payment') || m.includes('momo') || m.includes('pesa'))
    return '💳 We support MTN Mobile Money and Airtel Money for all transactions — payments, donations and microloans.';
  return '🌾 I\'m here to help! For more, call +256 700 123 456 or WhatsApp us anytime.';
}

function appendMsg(text, type) {
  const msgs = document.getElementById('ap-msgs');
  const div = document.createElement('div');
  div.className = `ai-msg ${type}`;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function askAI(q) { document.getElementById('ap-in').value = q; sendAI(); }

/* =========== VOICE RECOGNITION =========== */
let listening = false;
let recog = null;

function startVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('Voice recognition not supported. Please use Chrome or Edge.'); return; }
  if (listening) { recog?.stop(); return; }

  recog = new SR();
  recog.lang = currentLang === 'sw' ? 'sw-KE' : 'en-UG';
  recog.interimResults = false;

  const mic = document.getElementById('mic-btn');
  const vbar = document.getElementById('voice-bar');

  recog.onstart = () => { listening = true; mic.classList.add('on'); vbar.classList.remove('hidden'); };
  recog.onresult = (e) => { document.getElementById('ap-in').value = e.results[0][0].transcript; sendAI(); };
  recog.onerror = () => appendMsg('🎤 Could not hear clearly — please try again or type your question.', 'bot');
  recog.onend = () => { listening = false; mic.classList.remove('on'); vbar.classList.add('hidden'); };
  recog.start();
}

/* =========== INIT =========== */
// Set initial flag in nav
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('f2p_lang') || 'en';
  const map = { en: ['🇬🇧','EN'], lg: ['🇺🇬','LG'], sw: ['🌍','SW'] };
  if (map[saved]) {
    document.getElementById('lang-flag').textContent = map[saved][0];
    document.getElementById('lang-code').textContent = map[saved][1];
  }
});