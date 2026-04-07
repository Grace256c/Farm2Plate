/* =====================================================
   FARM 2 PLATE CONNECT — impact.js
   Features: Animated counters, Charts, Live donor
   feed, SDG progress bars, Countdown, AI assistant,
   Voice recognition, Dark mode, Scroll reveals
   ===================================================== */

/* ===== LANGUAGE DROPDOWN ===== */
const langDrop = document.getElementById('lang-drop');
const langTrig = document.getElementById('lang-trigger');
langTrig.addEventListener('click', e => { e.stopPropagation(); langDrop.classList.toggle('open'); });
document.addEventListener('click', () => langDrop.classList.remove('open'));
document.querySelectorAll('.lang-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('lang-flag').textContent = btn.dataset.flag;
    document.getElementById('lang-code').textContent = btn.dataset.lang.toUpperCase();
    document.querySelectorAll('.lang-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    localStorage.setItem('f2p_lang', btn.dataset.lang);
    langDrop.classList.remove('open');
  });
});
(function () {
  const s = localStorage.getItem('f2p_lang') || 'en';
  const m = { en: ['🇬🇧','EN'], lg: ['🇺🇬','LG'], sw: ['🌍','SW'] };
  if (m[s]) { document.getElementById('lang-flag').textContent = m[s][0]; document.getElementById('lang-code').textContent = m[s][1]; }
  document.querySelectorAll('.lang-opt').forEach(b => b.classList.toggle('active', b.dataset.lang === s));
})();

/* ===== DARK MODE ===== */
const darkBtn = document.getElementById('dark-btn');
const savedTheme = localStorage.getItem('f2p_theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);
darkBtn.addEventListener('click', () => {
  const n = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', n);
  localStorage.setItem('f2p_theme', n);
  updateIcon(n);
  destroyCharts(); initCharts();
});
function updateIcon(t) { darkBtn.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'; }

/* ===== NAVBAR ===== */
window.addEventListener('scroll', () => document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20));
document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('nav-links').classList.toggle('open');
  this.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}));

/* ===== COUNTER ANIMATION ===== */
function animCount(el, target, dur = 1800) {
  const start = performance.now();
  const isLarge = target >= 1000;
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = Math.round(ease * target);
    el.textContent = isLarge ? val.toLocaleString() : val;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

/* ===== INIT ON LOAD ===== */
window.addEventListener('load', () => {
  // Hero big counters
  document.querySelectorAll('.big-counter').forEach(el =>
    animCount(el, parseInt(el.dataset.target), 2200)
  );

  // Scroll counters
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animCount(e.target, parseInt(e.target.dataset.target)); cObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => cObs.observe(el));

  // SDG progress bars
  const sdgObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const w = e.target.dataset.w;
        setTimeout(() => { e.target.style.width = w + '%'; }, 200);
        sdgObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.spg-fill').forEach(el => sdgObs.observe(el));

  // Scroll reveals
  const els = document.querySelectorAll('.mc,.chart-card,.fc-item,.story-card,.report-card,.cert,.spg-item,.dtg-item');
  els.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 5) * 0.07}s`;
  });
  const rObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rObs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => rObs.observe(el));

  initCharts();
  startDonorFeed();
  startRefreshCountdown();
  animateDonorTotals();
});

/* ===== CHARTS ===== */
let charts = {};
function destroyCharts() { Object.values(charts).forEach(c => c.destroy()); charts = {}; }

function initCharts() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const tc = dark ? '#d8ede6' : '#1A3B32';
  const gc = dark ? 'rgba(255,255,255,.06)' : 'rgba(26,59,50,.06)';
  const defaults = (title) => ({
    responsive: true, maintainAspectRatio: true,
    plugins: {
      legend: { labels: { color: tc, font: { family: 'Plus Jakarta Sans', size: 11 } } },
      title: { display: false }
    },
    scales: {
      x: { ticks: { color: tc, font: { size: 10 } }, grid: { color: gc } },
      y: { ticks: { color: tc, font: { size: 10 } }, grid: { color: gc } }
    }
  });

  // Growth chart (wide)
  const c1 = document.getElementById('growthChart');
  if (c1) charts.growth = new Chart(c1, {
    type: 'bar',
    data: {
      labels: ['Q1 2022','Q2 2022','Q3 2022','Q4 2022','Q1 2023','Q2 2023','Q3 2023','Q4 2023','Q1 2024','Q2 2024','Q3 2024','Q4 2024','Q1 2025'],
      datasets: [
        { label: 'Farmers', data: [120,380,720,1100,1600,2200,2900,3600,4200,4800,5200,5600,5800], backgroundColor: 'rgba(26,59,50,.7)', borderRadius: 4, yAxisID: 'y' },
        { label: 'Avg Income (UGX 000s)', data: [180,220,280,330,390,450,500,540,580,620,660,700,730], borderColor: '#FFD729', backgroundColor: 'rgba(255,215,41,.12)', type: 'line', tension: 0.4, fill: true, borderWidth: 2.5, pointRadius: 3, yAxisID: 'y1' }
      ]
    },
    options: { ...defaults(), responsive: true, scales: { x: { ticks: { color: tc, font: { size: 9 } }, grid: { color: gc } }, y: { ticks: { color: tc, font: { size: 9 } }, grid: { color: gc } }, y1: { position: 'right', ticks: { color: '#FFD729', font: { size: 9 } }, grid: { display: false } } }, plugins: { legend: { labels: { color: tc, font: { family: 'Plus Jakarta Sans', size: 11 } } } } }
  });

  // Waste chart
  const c2 = document.getElementById('wasteChart');
  if (c2) charts.waste = new Chart(c2, {
    type: 'line',
    data: {
      labels: ['2022','2023','2024','2025 (proj)'],
      datasets: [{ label: 'Food Waste %', data: [40,34,28,20], borderColor: '#FFD729', backgroundColor: 'rgba(255,215,41,.12)', borderWidth: 3, fill: true, tension: 0.4, pointBackgroundColor: '#1A3B32', pointBorderColor: '#FFD729', pointRadius: 5 }]
    },
    options: defaults()
  });

  // Children chart
  const c3 = document.getElementById('childrenChart');
  if (c3) charts.children = new Chart(c3, {
    type: 'bar',
    data: {
      labels: ['Kampala','Gulu','Wakiso','Mbale','Mbarara','Jinja'],
      datasets: [{ label: 'Children Fed Daily', data: [18000,8500,7200,5800,4400,4100], backgroundColor: ['#1A3B32','#2a5c4a','#3d7a63','#FFD729','#e6c000','#c0a000'], borderRadius: 6 }]
    },
    options: defaults()
  });

  // Transaction chart
  const c4 = document.getElementById('txnChart');
  if (c4) charts.txn = new Chart(c4, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [{ label: 'Transactions (UGX M)', data: [120,185,240,310,390,420,510,580,650,720,800,900], borderColor: '#1A3B32', backgroundColor: 'rgba(26,59,50,.08)', borderWidth: 3, fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#FFD729' }]
    },
    options: { ...defaults(), plugins: { legend: { labels: { color: tc, font: { family: 'Plus Jakarta Sans', size: 11 } } } } }
  });

  // User breakdown donut
  const c5 = document.getElementById('userChart');
  if (c5) charts.users = new Chart(c5, {
    type: 'doughnut',
    data: {
      labels: ['Farmers','Households','Schools','Transporters','NGOs'],
      datasets: [{ data: [5800,12000,320,680,45], backgroundColor: ['#1A3B32','#FFD729','#3d7a63','#e6c000','#2a5c4a'], borderWidth: 0, hoverOffset: 8 }]
    },
    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'right', labels: { color: tc, font: { family: 'Plus Jakarta Sans', size: 11 }, boxWidth: 12 } } }, cutout: '65%' }
  });
}

/* ===== LIVE DONOR FEED ===== */
const donors = [
  { name: 'Anonymous Donor', type: '🇺🇬', amount: 50000, item: 'Food Pool', time: 'just now' },
  { name: 'FAO Uganda', type: '🌾', amount: 4500000, item: 'School Meals Fund', time: '2 min ago' },
  { name: 'Sarah K. (Kampala)', type: '👩‍💼', amount: 100000, item: 'Household Support', time: '4 min ago' },
  { name: 'WFP East Africa', type: '🍽️', amount: 8000000, item: 'Emergency Reserve', time: '7 min ago' },
  { name: 'John & Family', type: '👨‍👩‍👧', amount: 25000, item: 'Child Nutrition', time: '10 min ago' },
  { name: 'MTN Foundation', type: '📡', amount: 2000000, item: 'SMS Advisory Fund', time: '12 min ago' },
  { name: 'Tech for Good NGO', type: '💻', amount: 500000, item: 'Platform Development', time: '15 min ago' },
  { name: 'Grace A. (Gulu)', type: '👩‍🌾', amount: 75000, item: 'Farmer Support', time: '18 min ago' },
  { name: 'UNICEF Uganda', type: '🦄', amount: 6000000, item: 'School Nutrition', time: '20 min ago' },
  { name: 'Robert M. (UK)', type: '🇬🇧', amount: 200000, item: 'General Fund', time: '22 min ago' },
];

let donorIdx = 0;
let todayTotal = 0;
let todayCount = 0;

function startDonorFeed() {
  // Populate initial donors
  const stream = document.getElementById('donor-stream');
  donors.slice(0,6).forEach(d => { stream.appendChild(createDonorItem(d)); todayTotal += d.amount; todayCount++; });
  updateDonorTotals();

  // Add new donors periodically
  setInterval(() => {
    const d = donors[donorIdx % donors.length];
    d.time = 'just now';
    const item = createDonorItem(d);
    stream.insertBefore(item, stream.firstChild);
    if (stream.children.length > 12) stream.removeChild(stream.lastChild);
    todayTotal += d.amount;
    todayCount++;
    updateDonorTotals();
    donorIdx++;
  }, 5000);
}

function createDonorItem(d) {
  const div = document.createElement('div');
  div.className = 'donor-item';
  div.innerHTML = `
    <div class="di-avatar">${d.type}</div>
    <div class="di-body">
      <strong>${d.name}</strong>
      <span>${d.item} · ${d.time}</span>
    </div>
    <div class="di-amount">
      <strong>UGX ${d.amount.toLocaleString()}</strong>
      <small>Verified ✓</small>
    </div>
  `;
  return div;
}

function animateDonorTotals() {
  // Animate month total
  const monthTarget = 87450000;
  const monthCount = 342;
  animCount(document.getElementById('month-total'), monthTarget);
  animCount(document.getElementById('month-count'), monthCount);
}

function updateDonorTotals() {
  document.getElementById('today-total').textContent = todayTotal.toLocaleString();
  document.getElementById('today-count').textContent = todayCount;
  const pct = Math.min((todayTotal / 5000000) * 100, 100);
  document.getElementById('dt-progress').style.width = pct + '%';
}

/* ===== REFRESH COUNTDOWN ===== */
function startRefreshCountdown() {
  let secs = 60;
  const el = document.getElementById('refresh-countdown');
  if (!el) return;
  const iv = setInterval(() => {
    secs--;
    el.textContent = secs;
    if (secs <= 0) { secs = 60; el.textContent = secs; }
  }, 1000);
}

/* ===== AI ASSISTANT ===== */
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
  const t = appendMsg('💭 Thinking...', 'thinking');
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are FarmBot, AI assistant for Farm 2 Plate Connect, Uganda's food security platform. 
You're on the Impact page. Answer questions about our impact data, metrics, district coverage, annual reports, and how to donate or support.

Key impact data:
- 5,800+ farmers registered, 12,000+ households fed, 320+ schools, 48,000 children fed daily
- 40% food waste reduction, 65% farmer income increase, 30% child stunting reduction
- 911 tonnes of food saved from waste = 6.4 million meals
- UGX 4.2 billion in transactions processed
- Top district: Kampala (92% coverage)
- Annual reports available for 2022, 2023, 2024
- SDG 2: 68% target achieved, SDG 8: 74% target achieved
Respond warmly and concisely in the user's language (English, Luganda or Swahili).`,
        messages: [{ role: 'user', content: msg }]
      })
    });
    const data = await res.json();
    t.remove();
    appendMsg(data.content?.[0]?.text || fallback(msg), 'bot');
  } catch {
    t.remove();
    appendMsg(fallback(msg), 'bot');
  }
}

function fallback(msg) {
  const m = msg.toLowerCase();
  if (m.includes('biggest') || m.includes('impact') || m.includes('result'))
    return '📊 Our biggest impact: 911 tonnes of food saved from waste (6.4 million meals!), 65% farmer income increase, and 30% reduction in child stunting across active districts.';
  if (m.includes('district') || m.includes('kampala') || m.includes('gulu'))
    return '🗺️ Kampala leads with 1,240 farmers, 88 schools and 3,400 households. Gulu is growing fastest at +42% year-on-year. We cover 10 districts and expanding to 4 more in 2025.';
  if (m.includes('donat') || m.includes('give') || m.includes('support'))
    return '💛 Click "Donate Now" — every UGX 10,000 buys 5kg of food for a family. Donations go directly to the food pool and are matched to families in real time. 100% transparent.';
  if (m.includes('report') || m.includes('annual') || m.includes('data'))
    return '📄 We publish full annual impact reports — 2022, 2023, and 2024 are available to download as PDFs on this page. The 2025 mid-year report comes in July.';
  if (m.includes('sdg') || m.includes('goal'))
    return '🌍 SDG Progress: Zero Hunger (68% of targets), Good Health (54%), Decent Work (74%), Responsible Consumption (82%), Partnerships (90%). On track to meet all 2025 targets.';
  return '📊 I can help with impact data, district coverage, how to donate, or annual reports. What would you like to know?';
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

/* ===== VOICE RECOGNITION ===== */
let listening = false, recog = null;
function startVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('Voice recognition not supported. Please use Chrome.'); return; }
  if (listening) { recog?.stop(); return; }
  recog = new SR();
  recog.lang = (localStorage.getItem('f2p_lang') === 'sw') ? 'sw-KE' : 'en-UG';
  recog.interimResults = false;
  const mic = document.getElementById('mic-btn');
  const vbar = document.getElementById('voice-bar');
  recog.onstart  = () => { listening = true;  mic.classList.add('on');    vbar.classList.remove('hidden'); };
  recog.onresult = e  => { document.getElementById('ap-in').value = e.results[0][0].transcript; sendAI(); };
  recog.onerror  = () => appendMsg('🎤 Could not hear — please type your question.', 'bot');
  recog.onend    = () => { listening = false; mic.classList.remove('on'); vbar.classList.add('hidden'); };
  recog.start();
}

/* ===== STORY NAVIGATION (visual only) ===== */
let activeStory = 0;
const storyDots = document.querySelectorAll('.sn-dot');
function scrollStories(dir) {
  activeStory = Math.max(0, Math.min(storyDots.length - 1, activeStory + dir));
  storyDots.forEach((d, i) => d.classList.toggle('active', i === activeStory));
}