/* =====================================================
   FARM 2 PLATE CONNECT — getinvolved.js
   Features: Role switcher, registration forms, donation
   calculator, FAQ accordion, volunteer modal, AI,
   voice, dark mode, language dropdown, scroll reveals
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

/* ===== ROLE / TAB SWITCHER ===== */
function switchRole(role) {
  // Hero role cards
  document.querySelectorAll('.role-card').forEach(c => c.classList.toggle('active', c.dataset.role === role));
  // Registration tabs
  document.querySelectorAll('.rt-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === role));
  // Registration panels
  document.querySelectorAll('.reg-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`panel-${role}`);
  if (panel) panel.classList.add('active');
  // Scroll to register section smoothly
  document.getElementById('register').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ===== JUMP TO SECTION ===== */
function jumpTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ===== FORM SUBMISSION ===== */
function submitForm(e, type) {
  e.preventDefault();
  const messages = {
    farmer: { title: '🌾 Registration Successful!', msg: 'Welcome! You\'ll receive your first SMS advisory within 24 hours.' },
    household: { title: '🏠 Request Received!', msg: 'Our team will connect you with food support within 48 hours.' },
    school: { title: '🏫 School Registered!', msg: 'A Farm2Plate partner will contact you within 48 hours to set up your meal programme.' },
    ngo: { title: '🤝 Enquiry Submitted!', msg: 'Our partnerships team will be in touch within 2 business days.' },
    transporter: { title: '🚛 Welcome to the Network!', msg: 'You\'ll start receiving delivery job alerts via SMS tomorrow morning.' },
  };
  showToast(messages[type].title, messages[type].msg);
  // Python backend: POST /api/register { type, ...formData }
  console.log(`Registration submitted: ${type} — POST to Python API /api/register`);
}

/* ===== SUCCESS TOAST ===== */
function showToast(title, msg) {
  const toast = document.getElementById('success-toast');
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('hidden', 'show');
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 400);
  }, 5000);
}

/* ===== DONATION CALCULATOR ===== */
let currentAmount = 10000;
let currentFreq = 'once';

function setAmount(amount, btn) {
  currentAmount = amount;
  document.querySelectorAll('.pa-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('custom-amount').value = '';
  updateImpactDisplay();
}

function customAmount() {
  const val = parseInt(document.getElementById('custom-amount').value);
  if (val >= 1000) {
    currentAmount = val;
    document.querySelectorAll('.pa-btn').forEach(b => b.classList.remove('active'));
    updateImpactDisplay();
  }
}

function setFreq(freq, btn) {
  currentFreq = freq;
  document.querySelectorAll('.df-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updateImpactDisplay();
}

function updateImpactDisplay() {
  const multiplier = currentFreq === 'monthly' ? 12 : currentFreq === 'annual' ? 1 : 1;
  const annualAmt = currentFreq === 'monthly' ? currentAmount * 12 : currentAmount;
  
  // Per UGX 2,000 = 1kg food, 1 family 3 days = UGX 10,000, 1 child meal = UGX 5,000, 1 SMS tip = UGX 800
  const food = Math.max(1, Math.round(annualAmt / 2000));
  const families = Math.max(1, Math.round(annualAmt / 10000));
  const children = Math.max(1, Math.round(annualAmt / 5000));
  const sms = Math.max(1, Math.round(annualAmt / 800));

  document.getElementById('id-amount').textContent = currentAmount.toLocaleString();
  animateValue(document.getElementById('id-food'), `${food.toLocaleString()} kg`);
  animateValue(document.getElementById('id-family'), `${families.toLocaleString()} ${families === 1 ? 'family' : 'families'}`);
  animateValue(document.getElementById('id-children'), `${children.toLocaleString()} ${children === 1 ? 'child' : 'children'}`);
  animateValue(document.getElementById('id-sms'), `${sms.toLocaleString()} SMS`);
}

function animateValue(el, newVal) {
  el.style.transform = 'scale(1.15)';
  el.style.color = '#FFD729';
  setTimeout(() => {
    el.textContent = newVal;
    el.style.transform = 'scale(1)';
    el.style.color = '';
  }, 180);
}

function processDonation(method) {
  const freq = currentFreq === 'once' ? 'one-time' : currentFreq;
  const methodNames = { mtn: 'MTN Mobile Money', airtel: 'Airtel Money', card: 'Card Payment' };
  // In production: integrate with MTN MoMo API / Airtel Money API / Stripe via Python backend
  showToast(
    '💛 Donation Processing!',
    `Initiating UGX ${currentAmount.toLocaleString()} ${freq} donation via ${methodNames[method]}. You'll receive a confirmation SMS shortly.`
  );
  console.log(`Donation: UGX ${currentAmount} ${freq} via ${method} — POST to Python /api/donate`);
}

// Init calculator
updateImpactDisplay();

/* ===== FAQ ACCORDION ===== */
function toggleFAQ(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  // Open clicked if it was closed
  if (!isOpen) item.classList.add('open');
}

/* ===== VOLUNTEER MODAL ===== */
const volunteerMeta = {
  field:      { icon: '🌾', title: 'Field Volunteer Application', sub: 'Help onboard farmers and support communities across Uganda.' },
  digital:    { icon: '💻', title: 'Digital Champion Application', sub: 'Help communities navigate the platform and spread digital literacy.' },
  nutrition:  { icon: '🥗', title: 'Nutrition Educator Application', sub: 'Support our health team with community nutrition outreach.' },
  translator: { icon: '🌍', title: 'Language Translator Application', sub: 'Help translate content into Ugandan languages.' },
};

function openVolForm(type) {
  const meta = volunteerMeta[type];
  document.getElementById('vol-modal-icon').textContent = meta.icon;
  document.getElementById('vol-modal-title').textContent = meta.title;
  document.getElementById('vol-modal-sub').textContent = meta.sub;
  document.getElementById('vol-modal').classList.add('open');
}

function closeVolModal() { document.getElementById('vol-modal').classList.remove('open'); }

document.getElementById('vol-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeVolModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVolModal(); });

function submitVolunteer(e) {
  e.preventDefault();
  closeVolModal();
  showToast('🙋 Application Received!', 'Thank you! Our volunteer coordinator will contact you within 48 hours.');
  console.log('Volunteer application — POST to Python /api/volunteer');
}

/* ===== SHARE / COPY LINK ===== */
function copyLink() {
  const link = 'https://farm2plate.ug/?ref=share';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(link).then(() => {
      showToast('🔗 Link Copied!', 'Share it with farmers, schools, and donors in your community.');
    });
  } else {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = link;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('🔗 Link Copied!', 'Share it with farmers, schools, and donors in your community.');
  }
}

/* ===== SCROLL REVEAL ===== */
window.addEventListener('load', () => {
  const els = document.querySelectorAll('.vol-card,.so-card,.ds-item,.faq-item,.rpib,.dsi-icon');
  els.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 5) * 0.07}s`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Check for URL hash to pre-open a panel
  const hash = window.location.hash;
  const hashMap = { '#farmer': 'farmer', '#household': 'household', '#school': 'school', '#ngo': 'ngo', '#transporter': 'transporter', '#donate': 'ngo' };
  if (hashMap[hash]) switchRole(hashMap[hash]);
  if (hash === '#donate') jumpTo('donate');
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
You're on the Get Involved page. Help users decide which role to register for, understand how donations work, or find out how to volunteer or partner.

Available actions on this page:
- Register as FARMER: Get SMS advisories, list produce, get paid via MTN MoMo — FREE
- Register as HOUSEHOLD: Request food support, get nutrition tips — FREE
- Register as SCHOOL: Join school feeding programme, source food from local farmers — FREE
- Register as TRANSPORTER: Get delivery job alerts via SMS, earn more — FREE
- NGO/DONOR: Partner or donate — 100% transparent tracking
- VOLUNTEER: Field, digital champion, nutrition educator, language translator roles
- DONATE: UGX 10,000–1,000,000+ via MTN MoMo, Airtel Money, or card

Key facts: All registrations are free. Works on any phone via SMS. Payments via MTN MoMo or Airtel. 10 districts covered. GDPR compliant. Verified NGO.
Respond warmly and helpfully. Keep answers short. Match the user's language (English, Luganda or Swahili).`,
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
  if (m.includes('farmer') || m.includes('grow') || m.includes('farm'))
    return '👨‍🌾 Register as a Farmer — it\'s FREE! You\'ll get daily SMS advisories at 6am, list your produce to buyers, and get paid instantly via MTN MoMo. Fill in the Farmer form above!';
  if (m.includes('school') || m.includes('student') || m.includes('meal') || m.includes('teacher'))
    return '🏫 Schools can join the feeding programme for FREE. You\'ll source fresh food directly from local farmers — cutting costs up to 30%. WFP may subsidise meals too. Fill in the School form above.';
  if (m.includes('donat') || m.includes('give') || m.includes('money') || m.includes('fund'))
    return '💛 Scroll down to the Donate section! UGX 10,000 = 5kg of food. UGX 50,000 = one week of school meals for 5 children. You can pay via MTN MoMo, Airtel Money, or card. 100% tracked & transparent.';
  if (m.includes('transport') || m.includes('boda') || m.includes('truck') || m.includes('deliver'))
    return '🚛 Register as a Transporter — FREE! You\'ll receive 3–5 job alerts per day via SMS, with AI-optimised routes to cut fuel costs. Payment via mobile money instantly after delivery.';
  if (m.includes('volunteer') || m.includes('help') || m.includes('time'))
    return '🙋 We need field volunteers, digital champions, nutrition educators and language translators. See the Volunteer section and click "Apply Now" for the role that suits you best!';
  if (m.includes('ngo') || m.includes('partner') || m.includes('organisation'))
    return '🤝 NGOs, foundations, and corporations can partner with us for school feeding, farmer support, or research. Fill in the NGO/Donor form above and our partnerships team will reply within 2 business days.';
  return '🌾 Choose your role above — Farmer, Household, School, NGO/Donor, or Transporter. All registrations are FREE and work via SMS on any phone. How can I help you get started?';
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
  recog.onerror  = () => appendMsg('🎤 Could not hear clearly — please type your question.', 'bot');
  recog.onend    = () => { listening = false; mic.classList.remove('on'); vbar.classList.add('hidden'); };
  recog.start();
}