/**
 * FARM 2 PLATE CONNECT — script.js
 * Features:
 *  - Multilingual: English, Luganda (lg), Swahili (sw)
 *  - AI Virtual Assistant (powered by Claude API)
 *  - Voice Recognition (Web Speech API)
 *  - Dark Mode Toggle
 *  - Animated Counters
 *  - Scroll Animations
 *  - Charts (Chart.js)
 *  - Modals, Cookie Banner, Splash Screen
 *  - Hamburger Nav
 *  - Python backend integration notes
 */

/* ============================================================
   TRANSLATIONS — English (primary), Luganda, Swahili
   ============================================================ */
const translations = {
  en: {
    // Nav
    nav_problem: "Problem", nav_solution: "Solution", nav_how: "How It Works",
    nav_impact: "Impact", nav_partners: "Partners", nav_blog: "Blog",
    nav_team: "Team", nav_contact: "Contact",
    // Hero
    hero_badge: "🇺🇬 Made for Uganda & Africa",
    hero_headline: "Connecting Farms to Families.<br/>Ending Hunger with Technology.",
    hero_sub: "Farm 2 Plate Connect is a mobile + SMS-powered ecosystem linking farmers, households, schools, NGOs, and transporters to eliminate food waste and fight malnutrition.",
    hero_cta1: "Get Started", hero_cta2: "Join as a Farmer",
    hstat1: "Undernourished", hstat2: "Child Stunting", hstat3: "In Food Crisis",
    eco_farm: "Farm", eco_platform: "Platform", eco_family: "Family",
    video_label: "Watch Our Story (60s)",
    // Problem
    problem_tag: "🚨 The Crisis",
    problem_title: "Uganda's Food Security Emergency",
    problem_sub: "Millions face hunger not because food doesn't exist — but because systems fail to connect supply with need.",
    prob1_title: "Undernourished Population", prob1_desc: "Over a third of Ugandans do not have consistent access to adequate nutritious food.",
    prob2_title: "Child Stunting", prob2_desc: "1 in 4 children under 5 suffer from stunted growth due to chronic malnutrition.",
    prob3_title: "People in Food Crisis", prob3_desc: "797,000 Ugandans are in acute food crisis, requiring urgent humanitarian assistance.",
    cause1: "Poor distribution networks", cause2: "40% food wasted post-harvest",
    cause3: "Farmers earn too little", cause4: "Limited market information",
    // Solution
    solution_tag: "💡 Our Answer",
    solution_title: "Farm 2 Plate Connect Platform",
    solution_sub: "A mobile + SMS-based ecosystem connecting food production, distribution, and nutrition — accessible even on a basic feature phone.",
    sol1_h: "SMS-First Design", sol1_p: "Works on any phone — no internet required",
    sol2_h: "End-to-End Ecosystem", sol2_p: "Farmers → Platform → Buyers → Households",
    sol3_h: "Transparent & Trusted", sol3_p: "Verified donations, fair pricing, open impact data",
    sol4_h: "Mobile Money Ready", sol4_p: "MTN MoMo & Airtel Money integrated",
    sol5_h: "AI-Powered Insights", sol5_p: "Smart advisories, nutrition tips, route optimization",
    sol6_h: "Local Languages", sol6_p: "English, Luganda, Swahili support",
    platform_tagline: "Tech for Zero Hunger",
    tech_note: "Powered by a Python (Flask/FastAPI) backend with SMS gateway, AI/ML modules, and mobile money APIs",
    // How
    how_tag: "⚙️ The System", how_title: "How It Works",
    how_sub: "Six integrated modules working together to solve food insecurity from farm to plate.",
    step1_title: "Smart Farming Advisory",
    step1_desc: "Farmers receive SMS + voice messages with weather forecasts, planting schedules, pest control advice, and market prices — boosting productivity.",
    step2_title: "Digital Market & Donations",
    step2_desc: "Farmers list produce directly. Surplus food is automatically matched to vulnerable households, schools, and NGOs — reducing waste and hunger simultaneously.",
    step3_title: "Transport & Logistics",
    step3_desc: "Connects farmers with boda bodas, trucks, and logistics partners. AI optimizes delivery routes for lowest cost and fastest time.",
    step4_title: "School Feeding Link",
    step4_desc: "Schools place orders directly from local farmers, ensuring children receive fresh, nutritious meals while farmers gain reliable buyers.",
    step5_title: "Mobile Money & Finance",
    step5_desc: "Seamless payments via MTN MoMo & Airtel Money. Microfinance tools offer savings accounts and small loans to farmers and households.",
    step6_title: "Nutrition & Health AI",
    step6_desc: "Weekly SMS/AI nutrition tips tailored to household needs. Focus on child health, pregnancy, and balanced diets using locally available foods.",
    // Serves
    serves_tag: "👥 Community", serves_title: "Who It Serves",
    serve1_h: "Farmers", serve1_p: "Better prices, reliable buyers, farming advice, and mobile payments.",
    serve2_h: "Households", serve2_p: "Access to affordable, nutritious food with donation safety nets.",
    serve3_h: "Schools", serve3_p: "Fresh food directly from farms for school feeding programmes.",
    serve4_h: "NGOs & Donors", serve4_p: "Transparent donation tracking with real-time impact reporting.",
    serve5_h: "Transporters", serve5_p: "Optimized routes, more jobs, and mobile payment integration.",
    serve6_h: "Children", serve6_p: "Better nutrition, less stunting, brighter futures through school meals.",
    // Impact
    impact_tag: "📊 Impact", impact_title: "Measuring What Matters",
    impact_sub: "Live simulated dashboard — updated as the platform scales across Uganda.",
    metric1: "Less Food Wasted", metric2: "Farmer Income Increase",
    metric3: "Households Fed", metric4: "Schools Connected",
    metric5: "Farmers Registered", metric6: "Child Stunting Reduction",
    map_title: "📍 Coverage Across Uganda",
    map_note: "Interactive map — hover to explore coverage zones",
    // Why
    why_tag: "🧠 Our Approach", why_title: "Why It Works",
    why1_h: "Root Causes, Not Symptoms", why1_p: "We fix broken distribution, not just deliver aid.",
    why2_h: "Inclusive SMS Technology", why2_p: "No smartphone needed. Our SMS-first design reaches the last mile.",
    why3_h: "Evidence-Based Design", why3_p: "Every feature is grounded in Uganda-specific research and nutritional science.",
    why4_h: "Self-Sustaining Ecosystem", why4_p: "Market fees, microfinance margins, and partnerships fund ongoing operations.",
    why5_h: "Radical Transparency", why5_p: "Every donation tracked. Farmers see prices. Donors see impact.",
    why6_h: "African-Centered Design", why6_p: "Built with local communities, in local languages, respecting local food cultures.",
    // SDG
    sdg_tag: "🌍 Global Goals", sdg_title: "Aligned with the SDGs",
    sdg2: "Zero Hunger", sdg3: "Good Health & Well-being",
    sdg8: "Decent Work & Growth", sdg12: "Responsible Consumption", sdg17: "Partnerships for Goals",
    // Partners
    partners_tag: "🤝 Partners & Sponsors", partners_title: "Backed By Global Leaders",
    ssl_note: "SSL Secured · Verified NGO · Transparent Impact Reporting",
    // Team
    team_tag: "👩‍💻 Founders", team_title: "Meet the Team",
    team1_name: "Amara Nakato", team1_role: "CEO & Co-Founder",
    team1_bio: "Former USAID food systems specialist with 10 years in East African agriculture.",
    team2_name: "David Ssemwogerere", team2_role: "CTO & Co-Founder",
    team2_bio: "Full-stack Python & AI engineer. Built SMS platforms reaching 500,000+ users.",
    team3_name: "Grace Achieng", team3_role: "Head of Nutrition",
    team3_bio: "Public health nutritionist, WHO consultant. Expert in child nutrition programming.",
    // Blog
    blog_tag: "📰 Updates", blog_title: "Latest News & Insights",
    blog1_cat: "Impact", blog1_title: "How SMS Farming Advice Doubled Yields in Luwero District",
    blog1_date: "March 28, 2025",
    blog2_cat: "Technology", blog2_title: "AI Route Optimization Cuts Delivery Costs by 35% for Farmers",
    blog2_date: "March 14, 2025",
    blog3_cat: "Partnership", blog3_title: "200 Schools Now Sourcing Meals Directly from Local Farmers",
    blog3_date: "February 20, 2025",
    blog_read: "Read More →",
    // CTA
    cta_title: "Join the Movement to End Hunger",
    cta_sub: "Every registration, donation, and partnership brings us closer to zero hunger in Uganda.",
    cta1: "Register as Farmer", cta2: "Request Food", cta3: "Partner / Donate",
    download_pitch: "Download Pitch Deck", download_onepager: "Download One-Pager",
    // Contact
    contact_tag: "📬 Get In Touch", contact_title: "Contact Us",
    form_name: "Your Name", form_email: "Email Address",
    form_role_select: "I am a...", form_farmer: "Farmer", form_ngo: "NGO / Donor",
    form_school: "School", form_transporter: "Transporter", form_other: "Other",
    form_household: "Household", form_district: "Select District",
    form_message: "Your message...", form_submit: "Send Message",
    // Modal
    modal_title: "Register Your Interest",
    modal_sub: "Join thousands already using Farm 2 Plate Connect.",
    modal_submit: "Register Now — It's Free",
    // Video
    video_title: "Farm 2 Plate Connect — Our Story",
    video_placeholder: "Video embed placeholder — replace with YouTube/Vimeo URL",
    // AI
    ai_name: "FarmBot Assistant", ai_status: "Powered by AI · Online",
    ai_welcome: "👋 Hello! I'm FarmBot. Ask me anything about Farm 2 Plate Connect — in English, Luganda, or Swahili!",
    ai_q1: "Register as farmer?", ai_q2: "SMS advisory?", ai_q3: "Donate food?",
    ai_placeholder: "Type or speak your question...",
    // Voice
    voice_listening: "🎤 Listening...",
    // Cookie
    cookie_text: "We use cookies to improve your experience on this platform.",
    cookie_accept: "Accept", cookie_decline: "Decline",
    // Footer
    footer_mission: "Connecting farms to families. Ending hunger with technology in Uganda and beyond.",
    footer_platform: "Platform", footer_how: "How It Works", footer_impact: "Impact Dashboard",
    footer_register: "Register", footer_org: "Organisation", footer_team: "Our Team",
    footer_partners: "Partners", footer_blog: "Blog", footer_legal: "Legal",
    footer_privacy: "Privacy Policy", footer_terms: "Terms of Service",
    footer_data: "Data Policy", footer_rights: "All rights reserved.",
    footer_ssl: "SSL Secured · Verified Organisation",
    // Floating
    donate_float: "💛 Donate Now",
  },

  lg: {
    // Luganda translations
    nav_problem: "Ekizibu", nav_solution: "Okulabula", nav_how: "Engeri Gye Bikola",
    nav_impact: "Amatokko", nav_partners: "Abeegatte", nav_blog: "Amawulire",
    nav_team: "Akabinja", nav_contact: "Twambako",
    hero_badge: "🇺🇬 Ezakozesebwa mu Uganda ne Afrika",
    hero_headline: "Okutana Ennimiro ne Amaka.<br/>Okukomerera Enjala ne Tekinologiya.",
    hero_sub: "Farm 2 Plate Connect ye ekibinja ekikola ne simu n'obubaka bwa SMS ekimanyi abalimi, amaka, essomero, abawagizi, n'abapakasi okukomerera okusasagala kw'emmere n'enjala.",
    hero_cta1: "Tandika", hero_cta2: "Yingira ng'Omukulima",
    hstat1: "Abatatalirwa", hstat2: "Abaana Abato", hstat3: "Mu Nsobi y'Emmere",
    eco_farm: "Ennimiro", eco_platform: "Ebbaayi", eco_family: "Omaka",
    video_label: "Laba Amawulire Gaffe (60s)",
    problem_tag: "🚨 Obuyinza bw'Engeri",
    problem_title: "Ebizibu by'Emmere mu Uganda",
    problem_sub: "Bangi bawulira enjala si kubanga emmere tebaawo — wabula kubanga enkola ezisaliriza obuwevu n'okwetaaga.",
    prob1_title: "Ab'Enjala", prob1_desc: "Okusukkuluma okusatu kw'Abayuganda tebafuna emmere ennungi bulijjo.",
    prob2_title: "Abaana Abato Abasazira", prob2_desc: "Omwana omu mu bana bane okusinzira 5 asazira olw'enjala.",
    prob3_title: "Ab'Ebizibu by'Emmere", prob3_desc: "Abantu 797,000 b'Abayuganda bali mu nsobi y'emmere.",
    cause1: "Emipiira egibu gya kutundula", cause2: "40% ey'emmere esasagala",
    cause3: "Abalimi bafuna mangu mangu", cause4: "Amawulire g'akatale gamukudde",
    solution_tag: "💡 Okuddamu Kwaffe",
    solution_title: "Ebbaayi ya Farm 2 Plate Connect",
    solution_sub: "Ekibinja ekikola ne simu n'obubaka bwa SMS ekimanyi okukolimba, okusindika, n'embeera y'emmere.",
    sol1_h: "Enkola ya SMS Etandika", sol1_p: "Ekola ku simu yonna — tekyetaaga interineti",
    sol2_h: "Enkola Ey'obutereevu", sol2_p: "Abalimi → Ebbaayi → Abagula → Amaka",
    sol3_h: "Obutevu n'Okwekiriziganya", sol3_p: "Obutunzi obweziibwa, obusuubuzi obutuufu",
    sol4_h: "Ssente za Simu Ziwenya", sol4_p: "MTN MoMo & Airtel Money zikutegeera",
    sol5_h: "Ate ya Artificial Intelligence", sol5_p: "Ebiruwa ebiyamba, ebivuga eby'emmere",
    sol6_h: "Ennimi z'Ekyalo", sol6_p: "Oluzungu, Luganda, Kiswahili biwenya",
    platform_tagline: "Tekinologiya y'Okumaliriza Enjala",
    tech_note: "Ekozesebwa ne Python (Flask/FastAPI) ku nnyumba n'obubaka bwa SMS, AI/ML, n'esente za simu",
    how_tag: "⚙️ Enkola", how_title: "Engeri Gye Bikola",
    how_sub: "Bitundu mukaaga ebikolagana okumaliriza enjala okuva ku nnimiro okutuuka ku mbale.",
    step1_title: "Obuyambi bw'Obukulima Obwegendereza",
    step1_desc: "Abalimi bafuna obubaka bwa SMS n'eddoboozi eby'obudde, ebya kulima, n'ebya kukola.",
    step2_title: "Akatale ka Dijita n'Okugabana",
    step2_desc: "Abalimi bandika eby'okulima. Emmere esigaddewo esindikibwa eri amaka aga kwebaka.",
    step3_title: "Okusindika n'Okutuuka",
    step3_desc: "Ekimanyi abalimi n'abapakasi. AI ekola endago ez'okusindika.",
    step4_title: "Enkola ya Essomero",
    step4_desc: "Essomero zitera okulaguza okuva ku balimi b'ekyalo.",
    step5_title: "Ssente za Simu n'Empola",
    step5_desc: "Okusasula okworoota nga MTN MoMo & Airtel Money. Empola emikuze n'obuyambi.",
    step6_title: "Artificial Intelligence y'Emmere n'Obulamu",
    step6_desc: "Ebivuga bya buli sabbiiti eby'emmere ennungi. Okusooka ku bulamu bw'omwana.",
    serves_tag: "👥 Ekibinja", serves_title: "Abakozesa",
    serve1_h: "Abalimi", serve1_p: "Ebiciro eby'omutindo, abagula abatuufu, n'ssente za simu.",
    serve2_h: "Amaka", serve2_p: "Okutuukako emmere ey'omutindo n'obuyambi.",
    serve3_h: "Essomero", serve3_p: "Emmere entanvu okuva ku nnimiro.",
    serve4_h: "Abawagizi n'Abatandike", serve4_p: "Okugendereza obutunzi okutuusa amawulire g'amatokko.",
    serve5_h: "Abapakasi", serve5_p: "Endago ezigeenda obulungi, mirimu egizudde.",
    serve6_h: "Abaana", serve6_p: "Emmere ennungi, obutazira, mberere ennungi.",
    impact_tag: "📊 Amatokko", impact_title: "Okusimba Ebikyuukirira",
    impact_sub: "Dashboard ey'obuteebwa — esaasanyizibwa ng'ebbaayi egenda mu Uganda yonna.",
    metric1: "Emmere Esasagala Emikudde", metric2: "Omutindo gw'Abalimi Guzudde",
    metric3: "Amaka Gafuna Emmere", metric4: "Essomero Ezikyuukaganye",
    metric5: "Abalimi Abayingidde", metric6: "Okusazira kw'Abaana Kukenye",
    map_title: "📍 Ku Uganda Yonna", map_note: "Maapu ekolagana — sugirira okuzimba ebifo",
    why_tag: "🧠 Enkola Yaffe", why_title: "Engeri Gye Bikola",
    why1_h: "Emisomo, Si Ebikolwa", why1_p: "Tutuulawo ekisolo, si kuwaayo obuyambi.",
    why2_h: "Tekinologiya ya SMS", why2_p: "Simu yonna yegombeka. SMS yetugezaako.",
    why3_h: "Enkola Eyekezebwa", why3_p: "Buli kivvuunyi kiteekeddwa mu nnyonyi z'Uganda.",
    why4_h: "Enkola Eyeyimirira", why4_p: "Ssente z'akatale n'empola zisaliriza enkola.",
    why5_h: "Obutevu Obwenkanankana", why5_p: "Obutunzi bwonna butegeererwa. Omukulima alaba ebiciro.",
    why6_h: "Enkola Eyeekubirwa Afrika", why6_p: "Ezimbwa n'ekibinja, mu lulimi lwa kye, nga bakwata empisa.",
    sdg_tag: "🌍 Ebiraleberwa eby'Ensi Yonna", sdg_title: "Wakati wa SDGs",
    sdg2: "Kumaliriza Enjala", sdg3: "Obulamu Obulungi",
    sdg8: "Emirimu n'Entandisi", sdg12: "Okozesa Obulungi", sdg17: "Obukuumirira",
    partners_tag: "🤝 Abeegatte", partners_title: "Abannyukira n'Abakulembeze b'Ensi Yonna",
    ssl_note: "SSL Eziikiriziddwa · NGO Ewezibwa · Amatokko Agategeererwa",
    team_tag: "👩‍💻 Abatandisi", team_title: "Tumanye Akabinja",
    team1_name: "Amara Nakato", team1_role: "Omutwe n'Omutandisi wa 1",
    team1_bio: "Ennyumba ya USAID y'obukulima mu Bunsaasizi bwa Afrika Waabwe.",
    team2_name: "David Ssemwogerere", team2_role: "Omutwe wa Tekinologiya",
    team2_bio: "Omukozi wa Python & AI. Azimba embeera ya SMS ezikutegeera bangi.",
    team3_name: "Grace Achieng", team3_role: "Omutwe w'Emmere Ennungi",
    team3_bio: "Omusawo w'Obulamu bwa Ssaza, Omuteesa wa WHO.",
    blog_tag: "📰 Amawulire", blog_title: "Amawulire Amatandisi",
    blog1_cat: "Amatokko", blog1_title: "SMS yagamba okukulima obulungi mu Luwero",
    blog1_date: "Machi 28, 2025",
    blog2_cat: "Tekinologiya", blog2_title: "AI Yokola Enkola y'Okusindika 35%",
    blog2_date: "Machi 14, 2025",
    blog3_cat: "Obukuumirira", blog3_title: "Essomero 200 Zitera Okufuna Emmere ku Balimi",
    blog3_date: "Febwuali 20, 2025",
    blog_read: "Soma Okusookera →",
    cta_title: "Yingira mu Nkola yo Kumaliriza Enjala",
    cta_sub: "Buli oyingidde, buli atandike okugabana, n'obukuumirira bitwegezamu okutuuka ku ntego.",
    cta1: "Wandiika ng'Omukulima", cta2: "Saba Emmere", cta3: "Kyuukanya / Wa",
    download_pitch: "Towa Ebbuku lya Pitch", download_onepager: "Towa Ekkubo Emu",
    contact_tag: "📬 Twambako", contact_title: "Twogera Naffe",
    form_name: "Erinnya Lyo", form_email: "Adilesi ya Email",
    form_role_select: "Nze ndi...", form_farmer: "Omukulima", form_ngo: "NGO / Omutandike",
    form_school: "Essomero", form_transporter: "Omupakasi", form_other: "Omu",
    form_household: "Omaka", form_district: "Londa Disitulikiti",
    form_message: "Obubaka bwo...", form_submit: "Tuma Obubaka",
    modal_title: "Wandiika Okwetaagisa Kwo",
    modal_sub: "Yingira n'abangi abakozesa Farm 2 Plate Connect.",
    modal_submit: "Wandiika Leero — Nti Sente",
    video_title: "Farm 2 Plate Connect — Amawulire Gaffe",
    video_placeholder: "Video — Yingiza URL ya YouTube/Vimeo",
    ai_name: "FarmBot Omuteesa", ai_status: "Eyobugagga bwa AI · Online",
    ai_welcome: "👋 Bulungi! Nze FarmBot. Buuza kintu kyonna ku Farm 2 Plate Connect — mu Oluzungu, Luganda, oba Kiswahili!",
    ai_q1: "Wandiika ng'omukulima?", ai_q2: "SMS ekola etya?", ai_q3: "Gaba emmere?",
    ai_placeholder: "Wandika oba yogera ekibuuzo kyo...",
    voice_listening: "🎤 Nkuuliriza...",
    cookie_text: "Tukozesa cookies okuzimba enkola yo mu bbaayi lino.",
    cookie_accept: "Kiriza", cookie_decline: "Gaana",
    footer_mission: "Okutana ennimiro n'amaka. Okumaliriza enjala ne tekinologiya mu Uganda.",
    footer_platform: "Ebbaayi", footer_how: "Engeri Gye Bikola", footer_impact: "Amatokko",
    footer_register: "Wandiika", footer_org: "Ekibinja", footer_team: "Akabinja Kaffe",
    footer_partners: "Abeegatte", footer_blog: "Amawulire", footer_legal: "Amateeka",
    footer_privacy: "Endagiriro y'Obukuumi", footer_terms: "Amateeka g'Okukozesa",
    footer_data: "Endagiriro y'Amakumaaliizo", footer_rights: "Obugagga bwonna obuyikiriziddwa.",
    footer_ssl: "SSL Eziikiriziddwa · Ekibinja Ekikyaliriziddwa",
    donate_float: "💛 Wa Leero",
  },

  sw: {
    // Swahili translations
    nav_problem: "Tatizo", nav_solution: "Suluhisho", nav_how: "Jinsi Inavyofanya Kazi",
    nav_impact: "Athari", nav_partners: "Washirika", nav_blog: "Habari",
    nav_team: "Timu", nav_contact: "Wasiliana",
    hero_badge: "🇺🇬 Imetengenezwa kwa Uganda na Afrika",
    hero_headline: "Kuunganisha Mashamba na Familia.<br/>Kumaliza Njaa kwa Teknolojia.",
    hero_sub: "Farm 2 Plate Connect ni mfumo wa simu + SMS unaowachanganya wakulima, kaya, shule, NGO, na wasafirishaji ili kupunguza upotevu wa chakula na kupigana na utapiamlo.",
    hero_cta1: "Anza Sasa", hero_cta2: "Jiunge kama Mkulima",
    hstat1: "Wanaokabiliwa na Njaa", hstat2: "Udumavu wa Watoto", hstat3: "Katika Mgawiko wa Chakula",
    eco_farm: "Shamba", eco_platform: "Jukwaa", eco_family: "Familia",
    video_label: "Tazama Hadithi Yetu (60s)",
    problem_tag: "🚨 Mzozo",
    problem_title: "Dharura ya Usalama wa Chakula nchini Uganda",
    problem_sub: "Mamilioni wanakabiliwa na njaa si kwa sababu chakula hakipo — bali kwa sababu mifumo inashindwa kuunganisha ugavi na mahitaji.",
    prob1_title: "Watu Wanaokabiliwa na Njaa", prob1_desc: "Zaidi ya theluthi moja ya Wauganda hawapati chakula cha kutosha chenye lishe kila siku.",
    prob2_title: "Udumavu wa Watoto", prob2_desc: "Mtoto 1 kati ya 4 chini ya miaka 5 anakabiliwa na udumavu kutokana na utapiamlo wa muda mrefu.",
    prob3_title: "Watu katika Mgawiko wa Chakula", prob3_desc: "Watu 797,000 wa Uganda wako katika mgawiko mkali wa chakula.",
    cause1: "Mitandao mibaya ya usambazaji", cause2: "40% ya chakula inayopotea baada ya mavuno",
    cause3: "Wakulima wanaopata kidogo sana", cause4: "Habari chache za soko",
    solution_tag: "💡 Jibu Letu",
    solution_title: "Jukwaa la Farm 2 Plate Connect",
    solution_sub: "Mfumo wa simu + SMS unaochanganya uzalishaji wa chakula, usambazaji, na lishe — unaofikiwa hata kwa simu ya kawaida.",
    sol1_h: "Muundo wa SMS-Kwanza", sol1_p: "Inafanya kazi kwenye simu yoyote — bila intaneti",
    sol2_h: "Mfumo wa Mwanzo hadi Mwisho", sol2_p: "Wakulima → Jukwaa → Wanunuzi → Kaya",
    sol3_h: "Uwazi na Uaminifu", sol3_p: "Michango iliyothibitishwa, bei haki, data wazi",
    sol4_h: "Tayari kwa Pesa za Simu", sol4_p: "MTN MoMo & Airtel Money imejumuishwa",
    sol5_h: "Maarifa ya AI", sol5_p: "Ushauri wa akili, vidokezo vya lishe, uboreshaji wa njia",
    sol6_h: "Lugha za Eneo", sol6_p: "Kiingereza, Luganda, Kiswahili zinaauni",
    platform_tagline: "Teknolojia kwa Njaa Sifuri",
    tech_note: "Inayotumia Python (Flask/FastAPI) nyuma na lango la SMS, moduli za AI/ML, na API za pesa za simu",
    how_tag: "⚙️ Mfumo", how_title: "Jinsi Inavyofanya Kazi",
    how_sub: "Moduli sita zilizounganishwa zinazofanya kazi pamoja kutatua uhaba wa chakula kutoka shambani hadi mezani.",
    step1_title: "Ushauri Mzuri wa Kilimo",
    step1_desc: "Wakulima wapokea ujumbe wa SMS + sauti kuhusu hali ya hewa, ratiba za kupanda, ushauri wa kudhibiti wadudu na bei za soko.",
    step2_title: "Soko la Kidijitali na Uchangiaji",
    step2_desc: "Wakulima waorodhesha mazao moja kwa moja. Chakula kilichobaki kinapangiwa kwa kaya dhaifu.",
    step3_title: "Usafiri na Vifaa",
    step3_desc: "Inawachanganya wakulima na bodaboda, malori, na washirika wa usafirishaji. AI inaboresha njia za uwasilishaji.",
    step4_title: "Mfumo wa Chakula cha Shule",
    step4_desc: "Shule zinaagiza moja kwa moja kutoka kwa wakulima wa eneo, kuhakikisha watoto wanapata chakula kipya chenye lishe.",
    step5_title: "Pesa za Simu na Fedha",
    step5_desc: "Malipo rahisi kupitia MTN MoMo & Airtel Money. Zana za fedha ndogo zinatoa akaunti za akiba na mikopo midogo.",
    step6_title: "Lishe ya AI na Afya",
    step6_desc: "Vidokezo vya lishe vya kila wiki kupitia SMS/AI vilivyobinafsishwa. Kuzingatia afya ya mtoto, ujauzito, na lishe bora.",
    serves_tag: "👥 Jamii", serves_title: "Wanaohudumika",
    serve1_h: "Wakulima", serve1_p: "Bei bora, wanunuzi waaminifu, ushauri wa kilimo, na malipo ya simu.",
    serve2_h: "Kaya", serve2_p: "Upatikanaji wa chakula cha bei nafuu chenye lishe na usalama wa michango.",
    serve3_h: "Shule", serve3_p: "Chakula kipya moja kwa moja kutoka mashambani kwa programu za chakula cha shule.",
    serve4_h: "NGO na Wafadhili", serve4_p: "Ufuatiliaji wa michango uwazi na ripoti ya athari wa wakati halisi.",
    serve5_h: "Wasafirishaji", serve5_p: "Njia zilizobinafsishwa, kazi zaidi, na ujumuishaji wa malipo ya simu.",
    serve6_h: "Watoto", serve6_p: "Lishe bora, udumavu mdogo, mustakabali mkali kupitia chakula cha shule.",
    impact_tag: "📊 Athari", impact_title: "Kupima Kinachohusika",
    impact_sub: "Dashibodi ya moja kwa moja iliyoigwa — inasasishwa jukwaa linapoenea Uganda.",
    metric1: "Chakula Kidogo Kinachopotea", metric2: "Ongezeko la Mapato ya Mkulima",
    metric3: "Kaya Zilizolishwa", metric4: "Shule Zilizounganishwa",
    metric5: "Wakulima Waliosajiliwa", metric6: "Kupungua kwa Udumavu wa Watoto",
    map_title: "📍 Usambazaji Uganda Yote", map_note: "Ramani ya mwingiliano — weka juu ya kuona maeneo ya usambazaji",
    why_tag: "🧠 Mbinu Yetu", why_title: "Kwa Nini Inafanya Kazi",
    why1_h: "Visababu vya Msingi, Si Dalili", why1_p: "Tunarekebisha usambazaji uliovunjika, si tu kutoa msaada.",
    why2_h: "Teknolojia ya SMS ya Ujumuishi", why2_p: "Hakuna haja ya smartphone. Muundo wetu wa SMS-kwanza unafikia mwisho wa mstari.",
    why3_h: "Muundo Unaotegemea Ushahidi", why3_p: "Kila kipengele kimewekwa msingi wa utafiti mahususi wa Uganda.",
    why4_h: "Mfumo Unaojitegemea", why4_p: "Ada za soko, faida za fedha ndogo, na ushirikiano hufadhili shughuli zinazoendelea.",
    why5_h: "Uwazi Mkubwa", why5_p: "Kila mchango unafuatiliwa. Wakulima wanaona bei. Wafadhili wanaona athari.",
    why6_h: "Muundo Uliozingatia Afrika", why6_p: "Umejengwa na jamii za eneo, kwa lugha za eneo.",
    sdg_tag: "🌍 Malengo ya Kimataifa", sdg_title: "Imelingana na SDGs",
    sdg2: "Njaa Sifuri", sdg3: "Afya Njema na Ustawi",
    sdg8: "Kazi nzuri na Ukuaji wa Kiuchumi", sdg12: "Matumizi Yanayohusika", sdg17: "Ushirikiano wa Malengo",
    partners_tag: "🤝 Washirika na Wafadhili", partners_title: "Wanaounga Mkono na Viongozi wa Kimataifa",
    ssl_note: "SSL Imehakikishwa · NGO Iliyothibitishwa · Ripoti ya Athari Uwazi",
    team_tag: "👩‍💻 Waanzilishi", team_title: "Kutana na Timu",
    team1_name: "Amara Nakato", team1_role: "CEO na Mwanzilishi Mshirika",
    team1_bio: "Mtaalamu wa zamani wa mifumo ya chakula ya USAID na uzoefu wa miaka 10 katika kilimo cha Afrika Mashariki.",
    team2_name: "David Ssemwogerere", team2_role: "CTO na Mwanzilishi Mshirika",
    team2_bio: "Mhandisi wa Python & AI wa kiwango cha juu. Amejenga majukwaa ya SMS yanayofikia watumiaji 500,000+.",
    team3_name: "Grace Achieng", team3_role: "Mkuu wa Lishe",
    team3_bio: "Mtaalamu wa lishe ya afya ya umma, mshauri wa WHO. Mtaalamu katika programu za lishe ya watoto.",
    blog_tag: "📰 Masasisho", blog_title: "Habari na Maarifa ya Hivi Karibuni",
    blog1_cat: "Athari", blog1_title: "Jinsi Ushauri wa SMS wa Kilimo Ulivyoongeza Mazao Luwero",
    blog1_date: "Machi 28, 2025",
    blog2_cat: "Teknolojia", blog2_title: "AI Inapunguza Gharama za Utoaji kwa 35% kwa Wakulima",
    blog2_date: "Machi 14, 2025",
    blog3_cat: "Ushirikiano", blog3_title: "Shule 200 Sasa Zinapata Milo Moja kwa Moja kutoka kwa Wakulima wa Eneo",
    blog3_date: "Februari 20, 2025",
    blog_read: "Soma Zaidi →",
    cta_title: "Jiunge na Harakati ya Kumaliza Njaa",
    cta_sub: "Kila usajili, mchango, na ushirikiano unatukaribisha karibu zaidi na njaa sifuri Uganda.",
    cta1: "Sajili kama Mkulima", cta2: "Omba Chakula", cta3: "Shirikiana / Changia",
    download_pitch: "Pakua Hati ya Pitch", download_onepager: "Pakua Karatasi Moja",
    contact_tag: "📬 Wasiliana", contact_title: "Wasiliana Nasi",
    form_name: "Jina Lako", form_email: "Anwani ya Barua Pepe",
    form_role_select: "Mimi ni...", form_farmer: "Mkulima", form_ngo: "NGO / Mfadhili",
    form_school: "Shule", form_transporter: "Msafirishaji", form_other: "Nyingine",
    form_household: "Kaya", form_district: "Chagua Wilaya",
    form_message: "Ujumbe wako...", form_submit: "Tuma Ujumbe",
    modal_title: "Sajili Kupendeza Kwako",
    modal_sub: "Jiunge na maelfu wanaotumia Farm 2 Plate Connect.",
    modal_submit: "Sajili Sasa — Bila Malipo",
    video_title: "Farm 2 Plate Connect — Hadithi Yetu",
    video_placeholder: "Nafasi ya video — badilisha na URL ya YouTube/Vimeo",
    ai_name: "Msaidizi wa FarmBot", ai_status: "Inayotumia AI · Mtandaoni",
    ai_welcome: "👋 Habari! Mimi ni FarmBot. Niulize chochote kuhusu Farm 2 Plate Connect — kwa Kiingereza, Luganda, au Kiswahili!",
    ai_q1: "Sajili kama mkulima?", ai_q2: "SMS inafanya kazi vipi?", ai_q3: "Changia chakula?",
    ai_placeholder: "Andika au sema swali lako...",
    voice_listening: "🎤 Sikiliza...",
    cookie_text: "Tunatumia kuki kuboresha uzoefu wako kwenye jukwaa hili.",
    cookie_accept: "Kubali", cookie_decline: "Kataa",
    footer_mission: "Kuunganisha mashamba na familia. Kumaliza njaa kwa teknolojia Uganda na zaidi.",
    footer_platform: "Jukwaa", footer_how: "Jinsi Inavyofanya Kazi", footer_impact: "Dashibodi ya Athari",
    footer_register: "Sajili", footer_org: "Shirika", footer_team: "Timu Yetu",
    footer_partners: "Washirika", footer_blog: "Habari", footer_legal: "Kisheria",
    footer_privacy: "Sera ya Faragha", footer_terms: "Masharti ya Huduma",
    footer_data: "Sera ya Data", footer_rights: "Haki zote zimehifadhiwa.",
    footer_ssl: "SSL Imehakikishwa · Shirika Lililothibitishwa",
    donate_float: "💛 Changia Sasa",
  }
};

/* ============================================================
   LANGUAGE SYSTEM
   ============================================================ */
let currentLang = localStorage.getItem('f2p_lang') || 'en';

function applyTranslations(lang) {
  currentLang = lang;
  localStorage.setItem('f2p_lang', lang);
  const t = translations[lang];
  if (!t) return;

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update html lang
  document.documentElement.lang = lang;
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyTranslations(btn.dataset.lang));
});

/* ============================================================
   SPLASH SCREEN
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
    // Show cookie banner after splash
    setTimeout(() => {
      if (!localStorage.getItem('f2p_cookie')) {
        document.getElementById('cookie-banner').classList.add('show');
      }
    }, 600);
    // Apply saved language
    applyTranslations(currentLang);
    // Start animations
    initScrollAnimations();
    initCounters();
    initCharts();
  }, 2000);
});

/* ============================================================
   COOKIE BANNER
   ============================================================ */
document.getElementById('cookie-accept').addEventListener('click', () => {
  localStorage.setItem('f2p_cookie', 'accepted');
  document.getElementById('cookie-banner').classList.remove('show');
});
document.getElementById('cookie-decline').addEventListener('click', () => {
  localStorage.setItem('f2p_cookie', 'declined');
  document.getElementById('cookie-banner').classList.remove('show');
});

/* ============================================================
   DARK MODE
   ============================================================ */
const darkToggle = document.getElementById('dark-toggle');
const savedTheme = localStorage.getItem('f2p_theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateDarkIcon(savedTheme);

darkToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('f2p_theme', next);
  updateDarkIcon(next);
  // Re-render charts for dark mode
  if (window.foodWasteChart) { window.foodWasteChart.destroy(); window.incomeChart.destroy(); initCharts(); }
});

function updateDarkIcon(theme) {
  darkToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

/* ============================================================
   NAVBAR
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

// Close on nav link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open'));
});

/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.problem-card, .step-card, .serve-card, .metric-card, .why-card, .sdg-badge, .team-card, .blog-card, .sol-item, .partner-logo, .cause'
  );
  elements.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function animateCounter(el, target, suffix) {
  const duration = 1800;
  const start = performance.now();
  const isDecimal = target < 100;

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(ease * target);
    el.textContent = val.toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter, .hnum, .metric-val').forEach(el => {
    counterObserver.observe(el);
  });
}

/* ============================================================
   CHARTS (Chart.js)
   ============================================================ */
function initCharts() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#e8f5f0' : '#1A3B32';
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(26,59,50,0.08)';

  const chartDefaults = {
    plugins: { legend: { labels: { color: textColor, font: { family: 'DM Sans' } } } },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  };

  // Food Waste Reduction Chart
  const ctx1 = document.getElementById('foodWasteChart');
  if (ctx1) {
    window.foodWasteChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['2023', '2024', '2025', '2026', '2027'],
        datasets: [{
          label: 'Food Waste %',
          data: [40, 34, 28, 22, 15],
          backgroundColor: ['#FFD729', '#FFD729', '#1A3B32', '#1A3B32', '#1A3B32'],
          borderRadius: 8
        }]
      },
      options: { ...chartDefaults, responsive: true, plugins: { ...chartDefaults.plugins, title: { display: true, text: 'Food Waste Reduction (%)', color: textColor } } }
    });
  }

  // Farmer Income Chart
  const ctx2 = document.getElementById('incomeChart');
  if (ctx2) {
    window.incomeChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
        datasets: [{
          label: 'Avg Farmer Income (UGX 000s)',
          data: [180, 210, 265, 310, 370, 420],
          borderColor: '#FFD729',
          backgroundColor: 'rgba(255,215,41,0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#1A3B32',
          pointBorderColor: '#FFD729',
          pointRadius: 5
        }]
      },
      options: { ...chartDefaults, responsive: true, plugins: { ...chartDefaults.plugins, title: { display: true, text: 'Farmer Income Growth (UGX)', color: textColor } } }
    });
  }
}

/* ============================================================
   MODALS
   ============================================================ */
function openModal(type) {
  const modal = document.getElementById('register-modal');
  modal.classList.add('open');
  if (type && document.getElementById('modal-role')) {
    document.getElementById('modal-role').value = type;
  }
}

function closeModal() {
  document.getElementById('register-modal').classList.remove('open');
}

// Close on overlay click
document.getElementById('register-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});
document.getElementById('video-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});

// ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    document.getElementById('video-modal').classList.remove('open');
  }
});

function submitRegister(e) {
  e.preventDefault();
  // Python backend: POST /api/register
  // { name, phone, email, role, district }
  alert('✅ Registration received! We will contact you via SMS shortly.');
  closeModal();
}

function submitContact(e) {
  e.preventDefault();
  // Python backend: POST /api/contact
  // { name, email, role, message }
  alert('✅ Message sent! Our team will respond within 24 hours.');
  document.getElementById('contact-form').reset();
}

/* ============================================================
   AI VIRTUAL ASSISTANT
   Python Backend Integration:
   POST https://your-api.farm2plate.ug/api/chat
   Body: { message: string, lang: 'en'|'lg'|'sw', session_id: string }
   Response: { reply: string, suggestions?: string[] }
   ============================================================ */
let aiOpen = false;
let sessionId = 'session_' + Math.random().toString(36).substr(2, 9);

function toggleAI() {
  aiOpen = !aiOpen;
  const panel = document.getElementById('ai-panel');
  panel.classList.toggle('open', aiOpen);
}

document.getElementById('ai-toggle').addEventListener('click', toggleAI);

async function sendAIMessage() {
  const input = document.getElementById('ai-input');
  const msg = input.value.trim();
  if (!msg) return;

  appendAIMessage(msg, 'user');
  input.value = '';

  const thinking = appendAIMessage('💭 Thinking...', 'thinking');

  try {
    // Call Claude API (Anthropic)
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are FarmBot, a friendly AI assistant for Farm 2 Plate Connect — a platform fighting food insecurity in Uganda through technology. 
        
You help farmers, households, schools, NGOs, and transporters understand the platform. 
Keep answers concise, warm, and practical. 
Always be hopeful and empowering.
Respond in the same language the user writes in (English, Luganda, or Swahili).
If speaking Luganda or Swahili, still be helpful and accurate.
Current language setting: ${currentLang}

Key platform facts:
- SMS-based system, works on any phone
- Connects farmers to buyers, schools, NGOs
- MTN MoMo and Airtel Money payments
- AI nutrition tips and farming advice
- Covers Uganda: Kampala, Gulu, Mbarara, Jinja, Mbale and more
- Free to register for farmers and households
- Platform also helps with transport matching and school feeding`,
        messages: [{ role: 'user', content: msg }]
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || getFallbackResponse(msg);

    thinking.remove();
    appendAIMessage(reply, 'bot');

  } catch (err) {
    thinking.remove();
    appendAIMessage(getFallbackResponse(msg), 'bot');
  }
}

function getFallbackResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes('register') || m.includes('sign up') || m.includes('wandiika') || m.includes('sajili')) {
    return '👨‍🌾 To register, click the "Get Started" button and fill in your name, phone number, and district. It\'s completely free!';
  }
  if (m.includes('sms') || m.includes('phone') || m.includes('simu')) {
    return '📱 Our SMS system works on any phone — even a basic feature phone. You don\'t need a smartphone or internet connection!';
  }
  if (m.includes('donat') || m.includes('food') || m.includes('emmere') || m.includes('chakula')) {
    return '🍽️ To donate food or request food support, click "Request Food" or "Partner/Donate" above. We match surplus food with families in need.';
  }
  if (m.includes('payment') || m.includes('money') || m.includes('momo') || m.includes('pesa')) {
    return '💳 We support MTN Mobile Money and Airtel Money for all transactions — payments, donations, and microloans for farmers.';
  }
  if (m.includes('transport') || m.includes('deliver') || m.includes('truck') || m.includes('boda')) {
    return '🚛 Our AI-powered logistics system connects you with boda bodas and trucks. We optimize routes to reduce costs and delivery time.';
  }
  return '🌾 Thank you for your question! Farm 2 Plate Connect is here to help end hunger in Uganda. For more help, call us at +256 700 123 456 or WhatsApp us!';
}

function appendAIMessage(text, type) {
  const messages = document.getElementById('ai-messages');
  const div = document.createElement('div');
  div.className = `ai-msg ${type}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

function askAI(question) {
  document.getElementById('ai-input').value = question;
  sendAIMessage();
}

// Send on Enter
document.getElementById('ai-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendAIMessage();
});

/* ============================================================
   VOICE RECOGNITION (Web Speech API)
   Python Backend note: For server-side speech, use Google Cloud
   Speech-to-Text or Whisper API with Python
   ============================================================ */
let recognition = null;
let isListening = false;

function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
    return;
  }

  if (isListening) {
    recognition?.stop();
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = currentLang === 'sw' ? 'sw-KE' : currentLang === 'lg' ? 'lg-UG' : 'en-UG';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const voiceBtn = document.getElementById('voice-btn');
  const voiceIndicator = document.getElementById('voice-indicator');

  recognition.onstart = () => {
    isListening = true;
    voiceBtn.classList.add('listening');
    voiceIndicator.classList.remove('hidden');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('ai-input').value = transcript;
    sendAIMessage();
  };

  recognition.onerror = (event) => {
    console.warn('Voice recognition error:', event.error);
    appendAIMessage('🎤 Sorry, I couldn\'t hear that clearly. Please try again or type your question.', 'bot');
  };

  recognition.onend = () => {
    isListening = false;
    voiceBtn.classList.remove('listening');
    voiceIndicator.classList.add('hidden');
  };

  recognition.start();
}

/* ============================================================
   HERO NUMBER ANIMATION ON LOAD
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.hnum').forEach(el => {
      const target = parseInt(el.dataset.target);
      animateCounter(el, target);
    });
  }, 2200);
});

/* ============================================================
   SMOOTH ACTIVE NAV HIGHLIGHT ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--green-light)';
    }
  });
});

/* ============================================================
   LAZY LOADING FOR IMAGES
   ============================================================ */
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.dataset.src) img.src = img.dataset.src;
  });
} else {
  // Fallback: IntersectionObserver lazy load
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          lazyObserver.unobserve(img);
        }
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => lazyObserver.observe(img));
}

/* ============================================================
   STAGGER ANIMATION FOR GRIDS
   ============================================================ */
function initStaggerAnimations() {
  const grids = ['.problem-grid', '.serves-grid', '.why-grid', '.impact-metrics', '.team-grid', '.blog-grid', '.sdg-strip'];
  grids.forEach(selector => {
    const parent = document.querySelector(selector);
    if (!parent) return;
    Array.from(parent.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });
}

// Run stagger init after DOM ready
document.addEventListener('DOMContentLoaded', initStaggerAnimations);

/* ============================================================
   PYTHON BACKEND INTEGRATION GUIDE
   ============================================================
   The following Python (Flask/FastAPI) endpoints are expected:

   POST /api/register     → Save farmer/household registration to DB
   POST /api/contact      → Save contact form & send email via SMTP
   POST /api/chat         → AI chatbot (calls Claude or OpenAI API)
   POST /api/voice        → Speech-to-text (Whisper or Google STT)
   GET  /api/impact       → Return live impact metrics from DB
   GET  /api/blog         → Return blog posts
   POST /api/donate       → Process donation via MTN/Airtel API
   GET  /api/coverage     → Return map coverage data

   Python SMS: africas_talking library (Africa's Talking API)
   Python AI:  anthropic library (Claude) or openai library
   Python DB:  SQLAlchemy + PostgreSQL
   Python Auth: JWT tokens
   ============================================================ */

console.log(`
  🌾 Farm 2 Plate Connect — Integrated Food Security Platform
  🐍 Python Backend: Flask/FastAPI
  📱 SMS: Africa's Talking API
  🤖 AI: Claude (Anthropic)
  💳 Payments: MTN MoMo + Airtel Money
  🗣️ Languages: English, Luganda, Swahili
  ✅ Platform ready. Connect your backend!
`);