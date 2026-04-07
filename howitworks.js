/* =====================================================
   FARM 2 PLATE CONNECT — howitworks.js
   Features: Module tabs, SMS simulator, AI assistant,
   voice recognition, dark mode, scroll reveals
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
setDarkIcon(savedTheme);
darkBtn.addEventListener('click', () => {
  const n = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', n);
  localStorage.setItem('f2p_theme', n);
  setDarkIcon(n);
});
function setDarkIcon(t) { darkBtn.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'; }

/* ===== NAVBAR ===== */
window.addEventListener('scroll', () => { document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20); });
document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('nav-links').classList.toggle('open');
  this.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}));

/* ===== MODULE TABS ===== */
document.querySelectorAll('.mt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    // Update buttons
    document.querySelectorAll('.mt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Update panels
    document.querySelectorAll('.mp').forEach(p => p.classList.add('hidden'));
    const panel = document.getElementById(`tab-${tab}`);
    if (panel) {
      panel.classList.remove('hidden');
      // Trigger re-reveal for newly shown panel
      panel.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('in');
        setTimeout(() => el.classList.add('in'), 60);
      });
    }
    // Update hero flow diagram active node
    document.querySelectorAll('.fd-node').forEach(n => n.classList.remove('active'));
    const node = document.querySelector(`.fd-node[data-module="${tab}"]`);
    if (node) node.classList.add('active');
  });
});

/* ===== SCROLL REVEAL ===== */
window.addEventListener('load', () => {
  const els = document.querySelectorAll(
    '.tl-item, .tech-layer, .js-step, .hwcm, .mpf, .mps'
  );
  els.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 5) * 0.08}s`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});

/* ===== SMS SIMULATOR ===== */
const smsResponses = {
  'WEATHER': (args) => {
    const loc = args[0] || 'YOUR AREA';
    return `🌤️ Weather for ${loc.toUpperCase()}:\nTue: Sunny 28°C\nWed: Rain expected ⛈️ 22°C\nThu: Partly cloudy 25°C\nFri: Sunny 29°C\n\nPlan planting before Wed. Reply ADVISORY for crop tips.`;
  },
  'PRICE': (args) => {
    const prices = {
      MAIZE: 'UGX 2,400/kg ↑5% (Owino market)',
      TOMATO: 'UGX 1,800/kg → stable (Nakawa market)',
      BEANS: 'UGX 3,100/kg ↓2% (Gulu market)',
      CASSAVA: 'UGX 800/kg ↑3% (Kampala)',
      POTATO: 'UGX 1,200/kg → stable (Kabale)',
      RICE: 'UGX 4,200/kg ↑1% (Kampala)',
    };
    const crop = (args[0] || '').toUpperCase();
    const p = prices[crop] || 'Crop not found. Try: MAIZE, TOMATO, BEANS, CASSAVA, POTATO, RICE';
    return `📊 Market Price Update:\n${crop}: ${p}\n\nUpdated: Today 6:00 AM\nSource: Owino, Nakawa & Gulu markets\nReply PRICE [crop] for another crop.`;
  },
  'REGISTER': (args) => {
    return `👋 Welcome to Farm2Plate!\n\nTo complete registration, reply with:\nREG [Name] [District] [Crop]\n\nExample:\nREG John Luwero Maize\n\nRegistration is FREE. You will start receiving daily advisories within 24 hours.`;
  },
  'ADVISORY': (args) => {
    const crop = (args[0] || 'YOUR CROP').toUpperCase();
    return `🌾 Advisory for ${crop}:\n\n📅 Planting: Best window is now – next 7 days. Soil moisture is optimal.\n\n🐛 Pest Alert: Monitor for aphids. Apply neem spray if spotted.\n\n💧 Water: 3–4 times per week. Avoid waterlogging.\n\n📈 Tip: Add compost before planting to boost yield by 30%.\n\nQuestions? Call 0800-FARM2P (free)`;
  },
  'LIST': (args) => {
    const [crop, qty, price] = args;
    if (!crop || !qty || !price) return `❌ Format: LIST [CROP] [QTY] [PRICE]\nExample: LIST TOMATO 50KG 1800\n\nThis lists your produce on the Farm2Plate marketplace.`;
    return `✅ Listing Created!\n\n🌾 ${crop?.toUpperCase()}\n📦 Quantity: ${qty?.toUpperCase()}\n💰 Price: UGX ${price}/kg\n\nYour listing is now LIVE on Farm2Plate marketplace.\n\nBuyers can see and order your produce.\nYou will receive SMS when an order is placed.\n\nReply DELIST ${crop?.toUpperCase()} to remove.`;
  },
  'HELP': () => {
    return `📱 Farm2Plate SMS Commands:\n\nWEATHER [district]\nPRICE [crop]\nADVISORY [crop]\nLIST [crop] [qty] [price]\nREGISTER FARMER\nNUTRITION\nBALANCE\nHELP\n\nFree helpline: 0800-FARM2P\nWeb: farm2plate.ug`;
  },
  'NUTRITION': () => {
    return `🥗 Nutrition Tip of the Week:\n\n👶 For children 6–23 months:\nAdd mashed beans or groundnut paste to porridge 3× daily.\nThis prevents stunting and supports brain development.\n\n🍲 Recipe: Millet & Bean Porridge\nIngredients: Millet flour, beans, salt, water\nBoil for 15 min. Serves 2 children.\n\nReply NUTRITION WEEK to get weekly tips.`;
  },
  'BALANCE': () => {
    return `💳 Your Farm2Plate Wallet:\n\nBalance: UGX 847,500\nNetwork: MTN MoMo ✅\n\nLast transaction:\n+UGX 288,000 (Maize · WFP Uganda)\n\nSend money: SEND [amount] [number]\nWithdraw: WITHDRAW [amount]\nSave: SAVE [amount]`;
  },
};

function simulateSMS() {
  const input = document.getElementById('sim-input');
  const msg = input.value.trim().toUpperCase();
  if (!msg) return;
  input.value = '';
  addSimMsg(msg, 'outgoing');

  // Parse command
  const parts = msg.split(' ');
  const cmd = parts[0];
  const args = parts.slice(1);

  setTimeout(() => {
    let response;
    if (smsResponses[cmd]) {
      response = smsResponses[cmd](args);
    } else {
      response = `❓ Command not recognised: "${msg}"\n\nReply HELP to see all available commands.\nOr call: 0800-FARM2P (free helpline)`;
    }
    addSimMsg(response, 'incoming');
  }, 600);
}

function tryCmd(cmd) {
  document.getElementById('sim-input').value = cmd;
  simulateSMS();
}

function addSimMsg(text, type) {
  const msgs = document.getElementById('sim-msgs');
  const div = document.createElement('div');
  div.className = `sim-msg ${type}`;
  div.style.whiteSpace = 'pre-line';
  div.innerHTML = text + `<small>${new Date().toLocaleTimeString('en-UG', { hour: '2-digit', minute: '2-digit' })}</small>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

document.getElementById('sim-input').addEventListener('keypress', e => { if (e.key === 'Enter') simulateSMS(); });

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
        system: `You are FarmBot, the AI assistant for Farm 2 Plate Connect — a food security platform in Uganda.
You are currently on the "How It Works" page. Answer questions about the platform's 6 modules:
1. Smart Farming Advisory (SMS/voice weather, market prices, pest alerts)
2. Digital Marketplace (farmers list produce, AI surplus matching, donations)
3. Logistics Network (boda bodas, trucks, AI route optimisation)
4. School Feeding Link (schools order from farmers, nutrition dashboards, WFP subsidies)
5. Mobile Money & Finance (MTN MoMo, Airtel, savings, microloans, crop insurance)
6. Nutrition AI Messaging (weekly SMS tips, child nutrition, pregnancy, recipes)

Tech stack: Python (Django/FastAPI), Africa's Talking SMS, MTN MoMo API, Airtel API, PostgreSQL, Redis, Celery, Claude AI, OpenWeatherMap.
Keep answers concise, warm and helpful. Respond in the user's language (English, Luganda or Swahili).`,
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
  if (m.includes('sms') || m.includes('advisory') || m.includes('weather'))
    return '🌾 Module 1: Farmers get daily SMS/voice messages with weather forecasts, planting tips, pest alerts and live market prices — on any basic phone, no internet needed.';
  if (m.includes('market') || m.includes('list') || m.includes('sell'))
    return '🛒 Module 2: Farmers list produce via SMS (e.g. "LIST TOMATO 50KG 1800"). AI matches unsold surplus with vulnerable households, NGOs and food banks automatically.';
  if (m.includes('transport') || m.includes('deliver') || m.includes('truck') || m.includes('boda'))
    return '🚛 Module 3: 680+ boda bodas and trucks are matched to farmers. A Python AI algorithm optimises delivery routes, cutting transport costs by up to 35%.';
  if (m.includes('school') || m.includes('child') || m.includes('meal') || m.includes('feeding'))
    return '🏫 Module 4: 320+ schools place direct orders from local farmers. WFP and UNICEF funds auto-subsidise meals. 48,000 children fed daily with fresh, nutritious food.';
  if (m.includes('payment') || m.includes('momo') || m.includes('money') || m.includes('loan'))
    return '💳 Module 5: Farmers are paid in 60 seconds via MTN MoMo or Airtel Money. Savings wallets earn 8% interest. Microloans up to UGX 2M available after 3 months.';
  if (m.includes('nutrition') || m.includes('health') || m.includes('recipe') || m.includes('diet'))
    return '🥗 Module 6: Claude AI generates personalised weekly SMS nutrition tips. Targets child stunting (0-5 years), pregnancy, and balanced diets from local affordable foods.';
  if (m.includes('python') || m.includes('tech') || m.includes('code') || m.includes('backend'))
    return '🐍 Backend: Python (Django/FastAPI) + Africa\'s Talking SMS API + MTN MoMo API + Airtel API + PostgreSQL + Redis + Celery (tasks) + Claude AI (nutrition tips) + OpenWeatherMap (forecasts).';
  return '🌾 Try the SMS Simulator on this page to see the platform in action! Or ask me about any specific module — advisory, marketplace, logistics, schools, finance or nutrition.';
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
  if (!SR) { alert('Voice recognition not supported. Please use Chrome or Edge.'); return; }
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

/* ===== FINANCE BALANCE ANIMATION ===== */
function animateBalance() {
  const el = document.getElementById('balance-num');
  if (!el) return;
  const target = 847500;
  const start = performance.now();
  const dur = 1800;
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

// Trigger balance animation when tab 5 becomes visible
document.querySelector('[data-tab="5"]').addEventListener('click', () => {
  setTimeout(animateBalance, 300);
});

/* ===== FLOW DIAGRAM — auto cycle ===== */
let flowIdx = 1;
const flowNodes = document.querySelectorAll('.fd-node');
setInterval(() => {
  flowNodes.forEach(n => n.classList.remove('active'));
  if (flowNodes[flowIdx]) flowNodes[flowIdx].classList.add('active');
  flowIdx = (flowIdx + 1) % flowNodes.length;
}, 2000);