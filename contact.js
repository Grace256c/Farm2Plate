/* =====================================================
   FARM 2 PLATE CONNECT — contact.js
   Features: Contact form (routing, char count, file
   drop, success state), Leaflet office map, scroll
   reveals, AI assistant, voice, dark mode, language
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

/* ===== SMART FORM ROUTING ===== */
const routingMessages = {
  register:    { icon: '📋', msg: 'Your message will be directed to our <strong>Farmer &amp; Platform Support team</strong>. Or register instantly at <a href="getinvolved.html">Get Involved</a>.' },
  technical:   { icon: '🐍', msg: 'Your message goes to our <strong>Technical / Developer team</strong>. For urgent bugs, email tech@farm2plate.ug directly.' },
  partnership: { icon: '🤝', msg: 'Your message goes to <strong>Sarah Namukasa (Head of Partnerships)</strong>. Expect a reply within 2 business days.' },
  donation:    { icon: '💛', msg: 'Your message goes to our <strong>Donations &amp; Finance team</strong>. To donate now, visit our <a href="getinvolved.html#donate">Donate page</a>.' },
  media:       { icon: '📰', msg: 'Your message goes directly to our <strong>Media &amp; Press team</strong>. For urgent stories, WhatsApp +256 700 123 458.' },
  research:    { icon: '🔬', msg: 'Your message goes to our <strong>Research &amp; Data team</strong>. We love academic collaborations — please share your institution.' },
  complaint:   { icon: '📣', msg: 'We take all feedback seriously. Your message is flagged as <strong>priority</strong> and will be reviewed by our team lead within 12 hours.' },
  general:     { icon: '💬', msg: 'Your message goes to our <strong>General Enquiries team</strong>. We\'ll route it to the right person and reply within 24 hours.' },
};

function updateRouting() {
  const subject = document.getElementById('cf-subject').value;
  const note = document.getElementById('routing-note');
  if (!subject || !routingMessages[subject]) { note.classList.add('hidden'); return; }
  const { icon, msg } = routingMessages[subject];
  note.innerHTML = `<i class="fas fa-info-circle"></i> <span>${icon} ${msg}</span>`;
  note.classList.remove('hidden');
}

/* ===== CHARACTER COUNTER ===== */
const msgArea = document.getElementById('cf-message');
if (msgArea) {
  msgArea.addEventListener('input', () => {
    const count = msgArea.value.length;
    document.getElementById('char-num').textContent = count;
    if (count > 550) document.getElementById('char-num').style.color = '#ef4444';
    else document.getElementById('char-num').style.color = '';
  });
}

/* ===== FILE UPLOAD ===== */
function dragOver(e) {
  e.preventDefault();
  document.getElementById('file-drop').classList.add('drag-over');
}
function dragLeave(e) {
  document.getElementById('file-drop').classList.remove('drag-over');
}
function dropFile(e) {
  e.preventDefault();
  document.getElementById('file-drop').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) showFileSelected(file);
}
function fileSelected(input) {
  if (input.files[0]) showFileSelected(input.files[0]);
}
function showFileSelected(file) {
  const el = document.getElementById('file-selected');
  const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
  el.innerHTML = `<i class="fas fa-file-alt"></i> <strong>${file.name}</strong> (${sizeMB} MB) &nbsp;<button type="button" onclick="removeFile()" style="color:#ef4444;font-weight:700">✕ Remove</button>`;
  el.classList.remove('hidden');
  document.getElementById('file-drop').style.display = 'none';
}
function removeFile() {
  document.getElementById('file-selected').classList.add('hidden');
  document.getElementById('file-input').value = '';
  document.getElementById('file-drop').style.display = '';
}

/* ===== FORM SUBMIT ===== */
function submitContact(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;

  // Simulate API call — Python backend: POST /api/contact { name, phone, email, role, subject, district, message }
  setTimeout(() => {
    document.getElementById('contact-form').style.display = 'none';
    const success = document.getElementById('form-success');
    success.classList.remove('hidden');
    document.getElementById('success-name').textContent = name;
    document.getElementById('success-email').textContent = email;
    console.log('Contact form submitted — POST to Python /api/contact');
  }, 1200);
}

function resetForm() {
  document.getElementById('contact-form').reset();
  document.getElementById('contact-form').style.display = 'flex';
  document.getElementById('form-success').classList.add('hidden');
  document.getElementById('routing-note').classList.add('hidden');
  document.getElementById('char-num').textContent = '0';
  document.getElementById('file-selected').classList.add('hidden');
  document.getElementById('file-drop').style.display = '';
  const btn = document.getElementById('submit-btn');
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Message</span>';
}

/* ===== LEAFLET OFFICE MAP ===== */
window.addEventListener('load', () => {
  initMap();
  initScrollReveal();
});

function initMap() {
  const el = document.getElementById('office-map');
  if (!el || typeof L === 'undefined') return;

  // Farm2Plate HQ — Kampala, Nakasero Hill
  const lat = 0.3136, lng = 32.5811;

  const map = L.map('office-map', { center: [lat, lng], zoom: 15, zoomControl: true, scrollWheelZoom: false });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors', maxZoom: 18
  }).addTo(map);

  // Custom marker
  const markerIcon = L.divIcon({
    className: '',
    html: `<div style="
      background:#1A3B32;width:36px;height:36px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);border:3px solid #FFD729;
      box-shadow:0 4px 12px rgba(0,0,0,.3);
      display:flex;align-items:center;justify-content:center;
    "><span style="transform:rotate(45deg);font-size:1rem">🌾</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -40],
  });

  L.marker([lat, lng], { icon: markerIcon })
    .addTo(map)
    .bindPopup(`
      <div style="font-family:'Plus Jakarta Sans',sans-serif;padding:4px">
        <strong style="color:#1A3B32;font-size:.95rem">🌾 Farm 2 Plate Connect HQ</strong><br/>
        <span style="font-size:.82rem;color:#6b7280">Plot 42, Kampala Road, Nakasero</span><br/>
        <span style="font-size:.82rem;color:#6b7280">Mon–Fri · 8am–6pm EAT</span><br/>
        <a href="tel:+256700123456" style="color:#1A3B32;font-weight:700;font-size:.82rem">+256 700 123 456</a>
      </div>
    `, { maxWidth: 220 })
    .openPopup();

  // Add secondary office markers
  const offices = [
    { lat: 2.774, lng: 32.299, name: 'Gulu Field Office', phone: '+256 700 123 460' },
    { lat: 1.063, lng: 34.175, name: 'Mbale Field Office', phone: '+256 700 123 461' },
  ];

  const smallIcon = L.divIcon({
    className: '',
    html: `<div style="background:#FFD729;width:12px;height:12px;border-radius:50%;border:2px solid #1A3B32;box-shadow:0 2px 6px rgba(0,0,0,.2)"></div>`,
    iconSize: [12, 12],
  });
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const els = document.querySelectorAll('.dept-card,.fo-card,.pd-item,.scl,.rti,.qc-card,.ocd');
  els.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 5) * 0.07}s`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
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
        max_tokens: 800,
        system: `You are FarmBot, the friendly AI assistant for Farm 2 Plate Connect, Uganda's food security platform.
You're on the Contact page. Help users find the right contact channel, understand response times, and navigate the team structure.

Contact details:
- General: hello@farm2plate.ug | +256 700 123 456
- Partnerships: partners@farm2plate.ug | Sarah Namukasa
- Media/Press: media@farm2plate.ug | +256 700 123 458 | Urgent: WhatsApp 24/7
- Technical: tech@farm2plate.ug
- Research: research@farm2plate.ug
- Government/Policy: policy@farm2plate.ug
- Farmer SMS helpline: 0800-FARM2P (free, 24/7, any network)
- WhatsApp: +256 700 123 456 (under 1 hour reply)

Field offices: Kampala HQ, Gulu, Mbale, Mbarara
Office hours: Mon–Fri 8am–6pm EAT (Kampala), Farmer support Mon–Sat 6am–8pm

Response times: WhatsApp <1hr, SMS helpline 24/7, email 24hr, partnerships 2 business days, media 4hrs urgent.

Reply warmly and concisely. Match user's language (English, Luganda, Swahili).`,
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
  if (m.includes('partner') || m.includes('ngo') || m.includes('donat') || m.includes('fund'))
    return '🤝 For partnerships and donations, contact Sarah Namukasa directly: partners@farm2plate.ug or +256 700 123 457. Expect a reply within 2 business days.';
  if (m.includes('media') || m.includes('press') || m.includes('journalist') || m.includes('interview'))
    return '📰 Our media team is at media@farm2plate.ug or +256 700 123 458. For urgent stories, WhatsApp them 24/7. We have a full press kit available for download too.';
  if (m.includes('sms') || m.includes('helpline') || m.includes('farmer') || m.includes('support'))
    return '📱 Farmers can text 0800-FARM2P free 24/7 on any network! For other support, WhatsApp +256 700 123 456 (reply in under 1 hour during business hours).';
  if (m.includes('whatsapp') || m.includes('quick') || m.includes('fast') || m.includes('urgent'))
    return '⚡ WhatsApp is our fastest channel — +256 700 123 456. Replies in under 1 hour during business hours (Mon–Fri 8am–6pm EAT). For farmer SMS support, text 0800-FARM2P — it\'s free and 24/7.';
  if (m.includes('email') || m.includes('response') || m.includes('reply') || m.includes('time'))
    return '⏱️ Response times: WhatsApp <1hr · SMS helpline 24/7 · General email 24hrs · Partnerships 2 days · Media (urgent) 4hrs. Use the form above or WhatsApp for the fastest reply!';
  if (m.includes('office') || m.includes('address') || m.includes('location') || m.includes('kampala'))
    return '📍 Our head office is at Plot 42, Kampala Road, Nakasero Hill, Kampala — open Mon–Fri 8am–6pm. We also have field offices in Gulu, Mbale, and Mbarara. See the map on this page!';
  if (m.includes('tech') || m.includes('python') || m.includes('api') || m.includes('bug') || m.includes('developer'))
    return '🐍 For technical matters, API access, or bugs — email tech@farm2plate.ug. Include as much detail as possible. Our Python/Django team responds within 1 business day.';
  return '💬 Happy to help! Our main contacts are: 📞 +256 700 123 456 | 📧 hello@farm2plate.ug | 💬 WhatsApp +256 700 123 456 | 📱 SMS 0800-FARM2P (free, 24/7). What do you need?';
}

function appendMsg(text, type) {
  const msgs = document.getElementById('ap-msgs');
  const div = document.createElement('div');
  div.className = `ai-msg ${type}`;
  div.innerHTML = type === 'bot' ? text : '';
  div.textContent = type !== 'bot' ? text : div.textContent;
  if (type === 'bot') div.innerHTML = text; // allow links in bot messages
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
  recog.onerror  = () => appendMsg('🎤 Could not hear — please try typing your question.', 'bot');
  recog.onend    = () => { listening = false; mic.classList.remove('on'); vbar.classList.add('hidden'); };
  recog.start();
}