/* =====================================================
   FARM 2 PLATE CONNECT — blog.js
   Features: Search, category filter, sort, load more,
   newsletter form, AI assistant, voice recognition,
   dark mode, language dropdown, scroll reveals
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
setIcon(savedTheme);
darkBtn.addEventListener('click', () => {
  const n = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', n);
  localStorage.setItem('f2p_theme', n);
  setIcon(n);
});
function setIcon(t) { darkBtn.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'; }

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

/* ===== ARTICLE FILTER STATE ===== */
let activeCategory = 'all';
let searchTerm = '';
let currentSort = 'newest';
let visibleCount = 12; // all visible by default on this page

const allArticles = Array.from(document.querySelectorAll('.art-card'));

/* ===== CATEGORY FILTER BUTTONS ===== */
document.querySelectorAll('.cf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    applyFilters();
  });
});

/* ===== SEARCH ===== */
function filterArticles() {
  searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
  const clearBtn = document.getElementById('bs-clear');
  clearBtn.classList.toggle('hidden', !searchTerm);
  applyFilters();
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  searchTerm = '';
  document.getElementById('bs-clear').classList.add('hidden');
  applyFilters();
}

function quickFilter(cat) {
  activeCategory = cat;
  document.querySelectorAll('.cf-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  applyFilters();
  // Scroll to articles
  document.getElementById('articles').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function searchTag(tag) {
  document.getElementById('search-input').value = tag;
  searchTerm = tag.toLowerCase();
  document.getElementById('bs-clear').classList.remove('hidden');
  applyFilters();
  document.getElementById('articles').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ===== SORT ===== */
function sortArticles() {
  currentSort = document.getElementById('sort-select').value;
  applyFilters();
}

/* ===== APPLY ALL FILTERS ===== */
function applyFilters() {
  let filtered = allArticles.filter(card => {
    const cat = card.dataset.cat;
    const title = card.querySelector('h3').textContent.toLowerCase();
    const excerpt = card.querySelector('p').textContent.toLowerCase();
    const author = card.querySelector('.art-author span').textContent.toLowerCase();
    const text = title + ' ' + excerpt + ' ' + author + ' ' + cat;

    const catMatch = activeCategory === 'all' || cat === activeCategory;
    const searchMatch = !searchTerm || text.includes(searchTerm);
    return catMatch && searchMatch;
  });

  // Sort
  filtered.sort((a, b) => {
    if (currentSort === 'newest') return new Date(b.dataset.date) - new Date(a.dataset.date);
    if (currentSort === 'oldest') return new Date(a.dataset.date) - new Date(b.dataset.date);
    if (currentSort === 'popular') return parseInt(b.dataset.views) - parseInt(a.dataset.views);
    return 0;
  });

  // Show/hide cards
  const grid = document.getElementById('articles-grid');
  allArticles.forEach(card => {
    card.classList.add('hidden');
    card.classList.remove('reveal', 'in');
  });

  filtered.forEach((card, i) => {
    card.classList.remove('hidden');
    card.classList.add('reveal');
    card.style.transitionDelay = `${(i % 4) * 0.07}s`;
    // Trigger reveal on next frame
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('in')));
  });

  // Update results count
  const count = filtered.length;
  const countEl = document.getElementById('results-count');
  if (searchTerm) {
    countEl.textContent = `${count} result${count !== 1 ? 's' : ''} for "${searchTerm}"`;
  } else if (activeCategory !== 'all') {
    const catLabel = document.querySelector(`.cf-btn[data-cat="${activeCategory}"]`)?.textContent || activeCategory;
    countEl.textContent = `${count} article${count !== 1 ? 's' : ''} in ${catLabel}`;
  } else {
    countEl.textContent = `Showing all ${count} articles`;
  }

  // No results
  const noResults = document.getElementById('no-results');
  noResults.classList.toggle('hidden', count > 0);
}

/* ===== LOAD MORE (placeholder) ===== */
function loadMore() {
  const btn = document.getElementById('load-more');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  btn.disabled = true;
  // Simulate loading delay — in real implementation this would fetch from Python API
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> All articles loaded';
    btn.style.opacity = '0.5';
    btn.disabled = true;
  }, 1500);
}

/* ===== NEWSLETTER SUBSCRIBE ===== */
function subscribeNewsletter(e) {
  e.preventDefault();
  const form = e.target;
  form.style.display = 'none';
  // Show success if it's the main section form
  const success = document.getElementById('nl-success');
  if (success) success.classList.remove('hidden');
  // Python backend: POST /api/newsletter { name, email, role }
  console.log('Newsletter subscription — POST to Python API /api/newsletter');
}

/* ===== SCROLL REVEAL ===== */
window.addEventListener('load', () => {
  const els = document.querySelectorAll('.art-card, .sb-card, .tl-item, .nlf, .cl-item');
  els.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 5) * 0.07}s`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});

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
        system: `You are FarmBot, the AI assistant for Farm 2 Plate Connect, Uganda's food security platform.
You're on the News & Blog page. Help users find articles, summarise stories, explain topics, and navigate our content.

Available articles and topics:
1. "SMS Farming Advice Doubled Crop Yields in Luwero" - about how daily SMS weather and market tips helped farmer John double yields
2. "AI Route Optimisation Cuts Delivery Costs 35%" - Python AI algorithm reducing transport costs for farmers
3. "200 Schools Now Sourcing Meals Directly from Local Farmers" - WFP-partnered school feeding expansion
4. "Child Stunting Drops 18% After AI Nutrition SMS in Gulu" - longitudinal study on nutrition messaging impact
5. "Rose Tripled Her Carrot Income in Kabale" - farmer spotlight on direct-to-buyer selling
6. "Post-Harvest Food Loss in Uganda: Data Analysis" - Makerere research on 40% waste rate
7. "Uganda National Food Security Plan 2025-2030" - policy analysis
8. "2024 Year in Review: 5,800 Farmers, 12,000 Households" - annual impact summary
9. "Inside Our MTN MoMo Integration" - technical deep dive on 60-second payments
10. "Moses the Transporter: 4 Jobs a Day via SMS" - transporter spotlight
11. "WFP Uganda Signs Multi-Year Partnership" - WFP deal for 150 more schools
12. "Pregnancy Nutrition Gap and SMS Tips" - nutrition programme for expectant mothers
13. "Climate Change and SMS Weather Alerts" - climate adaptation for smallholders

Help users find relevant content, summarise articles, or explain topics. Keep responses concise and warm. Reply in the user's language (English, Luganda or Swahili).`,
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
  if (m.includes('popular') || m.includes('top') || m.includes('most read'))
    return '🏆 Our most-read article is the "2024 Year in Review" with 7,340 views — followed closely by Rose\'s carrot farmer spotlight (6,720 views) and the Gulu child stunting story (5,940 views).';
  if (m.includes('farmer') || m.includes('spotlight'))
    return '👩‍🌾 Farmer spotlight articles feature Rose Kyomugisha (Kabale carrots), Moses Okot (transporter), and John Ssemakula (Luwero maize). Use the "Farmer Spotlights" filter to find them all.';
  if (m.includes('nutrition') || m.includes('child') || m.includes('health'))
    return '🥗 We have great nutrition content! Grace Achieng wrote about child stunting dropping 18% in Gulu, pregnancy nutrition gaps, and our weekly SMS health tip programme. Filter by "Nutrition & Health".';
  if (m.includes('technology') || m.includes('python') || m.includes('ai') || m.includes('sms'))
    return '🐍 Technology articles include our AI route optimisation piece, the MTN MoMo 60-second payment deep dive, and the climate SMS weather alert system. Filter by "Technology".';
  if (m.includes('subscribe') || m.includes('newsletter') || m.includes('email'))
    return '📬 Scroll down to the newsletter section or use the sidebar signup to subscribe to our weekly digest — delivered every Tuesday to 4,200+ readers!';
  return '📰 I can help you find articles by topic, author, or category. Try asking about farmers, nutrition, technology, partnerships, or use the search bar at the top of the page!';
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
  recog.onerror  = () => appendMsg('🎤 Could not hear clearly — please try typing.', 'bot');
  recog.onend    = () => { listening = false; mic.classList.remove('on'); vbar.classList.add('hidden'); };
  recog.start();
}

/* ===== READING TIME ESTIMATOR (cosmetic) ===== */
// Already baked into HTML — no JS needed

/* ===== KEYBOARD SHORTCUT: Ctrl/Cmd + K opens search ===== */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const input = document.getElementById('search-input');
    input.focus();
    input.select();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});