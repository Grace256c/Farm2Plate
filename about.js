/* =====================================================
   FARM 2 PLATE CONNECT — about.js
   Features: Navbar, Dark Mode, Language Dropdown,
   Scroll Animations, AI Assistant, Voice Recognition
   ===================================================== */

/* ===== LANGUAGE DROPDOWN ===== */
const langDrop = document.getElementById('lang-drop');
const langTrig = document.getElementById('lang-trigger');

langTrig.addEventListener('click', (e) => {
  e.stopPropagation();
  langDrop.classList.toggle('open');
  langTrig.setAttribute('aria-expanded', langDrop.classList.contains('open'));
});
document.addEventListener('click', () => { langDrop.classList.remove('open'); });

document.querySelectorAll('.lang-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    const flag = btn.dataset.flag;
    document.getElementById('lang-flag').textContent = flag;
    document.getElementById('lang-code').textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    localStorage.setItem('f2p_lang', lang);
    document.documentElement.lang = lang;
    langDrop.classList.remove('open');
  });
});

/* restore saved language label */
(function() {
  const saved = localStorage.getItem('f2p_lang') || 'en';
  const map = { en: ['🇬🇧','EN'], lg: ['🇺🇬','LG'], sw: ['🌍','SW'] };
  if (map[saved]) {
    document.getElementById('lang-flag').textContent = map[saved][0];
    document.getElementById('lang-code').textContent = map[saved][1];
    document.querySelectorAll('.lang-opt').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === saved);
    });
  }
})();

/* ===== DARK MODE ===== */
const darkBtn = document.getElementById('dark-btn');
const savedTheme = localStorage.getItem('f2p_theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
setIcon(savedTheme);

darkBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('f2p_theme', next);
  setIcon(next);
});
function setIcon(t) {
  darkBtn.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

/* ===== NAVBAR ===== */
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

/* ===== SCROLL REVEAL ===== */
window.addEventListener('load', () => {
  // Mark elements for reveal
  const revealEls = document.querySelectorAll(
    '.mvv-card, .ap-card, .tf-card, .tt-card, .adv-card, .pg-item, .sdg-full-card, .pstat, .tl-item, .is-item'
  );
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.09}s`;
  });

  document.querySelectorAll('.story-left').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.story-right').forEach(el => el.classList.add('reveal-right'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));

  // Animate hero numbers on page load
  document.querySelectorAll('.ahn strong[data-target]').forEach(el => {
    animCount(el, parseInt(el.dataset.target));
  });
});

function animCount(el, target, dur = 1600) {
  const start = performance.now();
  const isK = el.textContent.includes('K') || el.closest('.ahn')?.querySelector('span')?.textContent === 'Farmers';
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = Math.round(ease * target);
    el.textContent = val.toLocaleString() + (target >= 1000 ? '+' : target >= 100 ? '+' : '');
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ===== TIMELINE ANIMATION ===== */
const tlObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.style.opacity = '1', i * 150);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.tl-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.4s ease';
  tlObs.observe(el);
});

/* ===== AI ASSISTANT ===== */
let aiOpen = false;
let currentLang = localStorage.getItem('f2p_lang') || 'en';

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
        system: `You are FarmBot, a warm AI assistant for Farm 2 Plate Connect, a food security platform in Uganda.
Answer questions about the organisation's story, team, mission, values, partnerships and how to get involved.
Keep answers clear, warm, hopeful and concise. Respond in the same language the user writes in (English, Luganda, or Swahili).

Key facts about the organisation:
- Founded in 2021 in Luwero District, Uganda
- 5 co-founders: Amara Nakato (CEO), David Ssemwogerere (CTO), Grace Achieng (Nutrition), Moses Okello (Operations), Sarah Namukasa (Finance)
- Mission: End food insecurity through inclusive SMS + mobile technology
- Partners: FAO, UNICEF, WFP, Government of Uganda, MTN, Airtel
- 5,800+ farmers, 12,000+ households, 320+ schools`,
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
  if (m.includes('found') || m.includes('start') || m.includes('story'))
    return '🌾 Farm 2 Plate Connect was founded in 2021 by 5 passionate Ugandans who watched a farmer discard food while families nearby went hungry. We decided to build the bridge!';
  if (m.includes('team') || m.includes('who') || m.includes('ceo') || m.includes('founder'))
    return '👥 Our 5 co-founders are: Amara Nakato (CEO), David Ssemwogerere (CTO), Grace Achieng (Nutrition), Moses Okello (Operations), and Sarah Namukasa (Finance & Partnerships).';
  if (m.includes('mission') || m.includes('vision') || m.includes('goal'))
    return '🎯 Our mission is to eliminate food insecurity and malnutrition in Uganda by connecting farmers, households, schools, and NGOs through technology accessible to everyone — including those without smartphones.';
  if (m.includes('partner') || m.includes('fao') || m.includes('unicef') || m.includes('wfp'))
    return '🤝 We partner with FAO, UNICEF, WFP, the Government of Uganda, MTN Uganda, and Airtel Uganda — combining global reach with local expertise.';
  return '🌾 Happy to help! You can also contact our team directly at hello@farm2plate.ug or call +256 700 123 456.';
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
  if (!SR) { alert('Voice recognition not supported in your browser. Please use Chrome.'); return; }
  if (listening) { recog?.stop(); return; }

  recog = new SR();
  recog.lang = currentLang === 'sw' ? 'sw-KE' : 'en-UG';
  recog.interimResults = false;

  const mic = document.getElementById('mic-btn');
  const vbar = document.getElementById('voice-bar');

  recog.onstart  = () => { listening = true;  mic.classList.add('on');    vbar.classList.remove('hidden'); };
  recog.onresult = (e) => { document.getElementById('ap-in').value = e.results[0][0].transcript; sendAI(); };
  recog.onerror  = ()  => appendMsg('🎤 Could not hear clearly — please try typing your question.', 'bot');
  recog.onend    = () => { listening = false; mic.classList.remove('on'); vbar.classList.add('hidden'); };
  recog.start();
}