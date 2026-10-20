/* Aydın Oto Elektrik — tüm sayfaların ortak kodu
   Dükkan bilgileri, üst menü, alt bilgi ve ürün kartları burada. */

/* =========================================================
   DÜKKAN BİLGİLERİ — değiştirmek için sadece burayı düzenleyin
   ========================================================= */
const DUKKAN = {
  name:    "Aydın Oto Elektrik",
  phone:   "0532 464 64 18",   phoneRaw:"905324646418",
  wa:      "0530 478 57 97",   waRaw:   "905304785797",
  email:   "aydinotoelektrik06@gmail.com",
  landline:"0312 278 70 98",   landRaw: "903122787098",
  address: "Bahçekapı Mah. Dökmeciler Sanayi Sitesi 2500. Cadde No: 8/6, Şaşmaz, Etimesgut / Ankara",
  mapQuery:"Dökmeciler Sanayi Sitesi 2500. Cadde Şaşmaz Etimesgut Ankara",
  // Haritadaki iğne: dükkanın tam koordinatı (Google Haritalar'da dükkana sağ tıklayınca çıkan sayılar).
  // Boş bırakılırsa yukarıdaki adres aranır.
  konum:   "",
  // Toptancı (Arıcı) küçük ürün resimlerini göster. Arıcı izin vermezse false yapın, çizimler görünür.
  ariciResim: true,
  // Çalıştığımız markalar. logo boşsa ya da yüklenemezse marka adı yazı olarak görünür.
  brands: [
    {ad:"Mutlu Akü",        logo:"https://www.mutlu.com.tr/images/logo.svg"},
    {ad:"Esan Akü",         logo:"https://www.esanaku.com/site/img/esan_aku_logo.png"},
    {ad:"Bosch",            logo:""},
    {ad:"Valeo",            logo:"https://www.valeo.com/wp-content/uploads/2025/11/logo-valeo-signature-2025_210x110.png"},
    {ad:"Magneti Marelli",  logo:"https://www.marelli.com/content/experience-fragments/marelli/en/site/footer/master/_jcr_content/root/footer_v2_copy/logo.coreimg.svg/1717166889182/fe9ec73ff2da4fbc0c05.svg"},
    {ad:"Osram",            logo:""},
    {ad:"Narva",            logo:"https://static.wixstatic.com/media/ae96f6_1a6a5909a5de45e3a9dba7d357cc3ebe~mv2.png/v1/fill/w_236,h_52,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/NARVA_WEBSITE_Logo%20for%20Header_No%20Margin.png"},
    {ad:"Philips",          logo:""},
    {ad:"Hella",            logo:""},
    {ad:"HC-Cargo",         logo:""},
    {ad:"Lucas",            logo:""},
    {ad:"Mako",             logo:""},
    {ad:"ZM",               logo:""},
    {ad:"Mega",             logo:""},
    {ad:"Win Win",          logo:""},
    {ad:"NSK",              logo:""},
    {ad:"ORS",              logo:""},
    {ad:"Superlight",       logo:""},
    {ad:"Maxtel",           logo:""}
  ],
  hours: [
    ["Pazartesi","08:30 – 19:00"],["Salı","08:30 – 19:00"],["Çarşamba","08:30 – 19:00"],
    ["Perşembe","08:30 – 19:00"],["Cuma","08:30 – 19:00"],["Cumartesi","08:30 – 17:00"],["Pazar","Kapalı"]
  ]
};
/* ========================================================= */

const KAT = window.KATEGORILER || {};
const URUNLER_HEPSI = window.URUNLER || [];
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const LINK = {
  tel: "tel:+" + DUKKAN.phoneRaw,
  land:"tel:+" + DUKKAN.landRaw,
  mail:"mailto:" + DUKKAN.email,
  wa:  "https://wa.me/" + DUKKAN.waRaw,
  dir: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(DUKKAN.konum || DUKKAN.mapQuery)
};
const IC = {
  tel: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  wa:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.4 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.2-.7a11.3 11.3 0 0 1-4.4-3.9 5 5 0 0 1-1-2.7 3 3 0 0 1 .9-2.2 1 1 0 0 1 .7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6a8.5 8.5 0 0 0 1.6 2 7.7 7.7 0 0 0 2.3 1.4c.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3a2.4 2.4 0 0 1-.1 1.3z"/></svg>',
  bolt:'<svg viewBox="0 0 24 24" fill="#f2b705"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>'
};

/* ---------- Ürün çizimleri (fotoğraf yoksa gösterilir) ---------- */
const CIZIM = {
  aku(ah){
    ah = Number(ah) || 60;
    const w = Math.max(150, Math.min(260, Math.round(150 + (ah - 60) * 0.6))), x = (300 - w) / 2, y = 78, h = 112;
    return `<svg viewBox="0 0 300 220" aria-hidden="true">
      <ellipse cx="150" cy="198" rx="${w/2+12}" ry="7" fill="#000" opacity=".10"/>
      <rect x="${x+20}" y="${y-30}" width="16" height="16" rx="2" fill="#9aa0a8"/>
      <rect x="${x+w-36}" y="${y-30}" width="16" height="16" rx="2" fill="#9aa0a8"/>
      <rect x="${x+18}" y="${y-22}" width="20" height="8" rx="2" fill="#c8312b"/>
      <rect x="${x+w-38}" y="${y-22}" width="20" height="8" rx="2" fill="#3b4048"/>
      <rect x="${x-4}" y="${y-16}" width="${w+8}" height="20" rx="4" fill="#3a3f47"/>
      <path d="M124 ${y-16} v-8 a6 6 0 0 1 6 -6 h40 a6 6 0 0 1 6 6 v8" fill="none" stroke="#2a2e34" stroke-width="5"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#262a30"/>
      <rect x="${x+14}" y="${y+18}" width="${w-28}" height="${h-36}" rx="3" fill="#f4f5f7"/>
      <rect x="${x+14}" y="${y+18}" width="${w-28}" height="8" fill="#f2b705"/>
      <text x="150" y="${y+50}" text-anchor="middle" font-family="Inter,sans-serif" font-size="13" font-weight="600" fill="#6b7280">12V</text>
      <text x="150" y="${y+78}" text-anchor="middle" font-family="Inter,sans-serif" font-size="26" font-weight="800" fill="#16191d">${esc(ah)} Ah</text>
      <text x="${x+28}" y="${y-36}" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" font-weight="800" fill="#c8312b">+</text>
      <text x="${x+w-28}" y="${y-36}" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" font-weight="800" fill="#3b4048">−</text>
    </svg>`;
  },
  mars(renk="#2a2e34"){
    return `<svg viewBox="0 0 640 300" fill="none" stroke="${renk}" stroke-width="7" stroke-linejoin="round" aria-hidden="true">
      <rect x="60" y="120" width="300" height="140" rx="22" fill="${renk}" fill-opacity=".08"/>
      <line x1="110" y1="120" x2="110" y2="260"/><line x1="310" y1="120" x2="310" y2="260"/>
      <g stroke-width="4" opacity=".6"><line x1="140" y1="160" x2="280" y2="160"/><line x1="140" y1="190" x2="280" y2="190"/><line x1="140" y1="220" x2="280" y2="220"/></g>
      <path d="M60 140 h-22 a14 14 0 0 0 -14 14 v72 a14 14 0 0 0 14 14 h22"/>
      <path d="M360 110 h50 v160 h-50"/>
      <path d="M410 150 h80 l20 15 v50 l-20 15 h-80"/>
      <path d="M400 96 l26 -40 a18 18 0 0 1 30 18 l-20 32"/><circle cx="440" cy="64" r="8"/>
      <circle cx="555" cy="190" r="34"/><circle cx="555" cy="190" r="10" fill="${renk}"/>
      <g stroke-width="12"><line x1="555" y1="146" x2="555" y2="156"/><line x1="555" y1="224" x2="555" y2="234"/><line x1="599" y1="190" x2="589" y2="190"/><line x1="585" y1="160" x2="579" y2="166"/><line x1="579" y1="214" x2="585" y2="220"/></g>
      <rect x="150" y="30" width="220" height="80" rx="40" fill="${renk}" fill-opacity=".08"/>
      <rect x="370" y="52" width="26" height="36" rx="4"/>
      <circle cx="210" cy="30" r="10"/><circle cx="270" cy="30" r="10"/>
    </svg>`;
  },
  sarj(renk="#2a2e34"){
    return `<svg viewBox="0 0 400 400" fill="none" stroke="${renk}" stroke-width="7" stroke-linejoin="round" aria-hidden="true">
      <path d="M70 120 l-40 -30 a18 18 0 1 1 22 -26 l46 34"/><circle cx="40" cy="78" r="8"/>
      <path d="M330 280 l40 30 a18 18 0 1 1 -22 26 l-46 -34"/><circle cx="360" cy="322" r="8"/>
      <circle cx="200" cy="200" r="150" fill="${renk}" fill-opacity=".08"/><circle cx="200" cy="200" r="132"/>
      <g stroke-width="12" stroke-linecap="round" opacity=".85">
        <line x1="200" y1="85" x2="200" y2="112"/><line x1="200" y1="288" x2="200" y2="315"/>
        <line x1="85" y1="200" x2="112" y2="200"/><line x1="288" y1="200" x2="315" y2="200"/>
        <line x1="119" y1="119" x2="138" y2="138"/><line x1="262" y1="262" x2="281" y2="281"/>
        <line x1="281" y1="119" x2="262" y2="138"/><line x1="138" y1="262" x2="119" y2="281"/>
      </g>
      <circle cx="200" cy="200" r="70"/><circle cx="200" cy="200" r="56"/><circle cx="200" cy="200" r="42"/>
      <circle cx="200" cy="200" r="15" fill="${renk}"/>
      <rect x="300" y="110" width="40" height="26" rx="5"/><line x1="340" y1="123" x2="372" y2="123"/>
    </svg>`;
  },
  ampul(renk="#2a2e34"){
    return `<svg viewBox="0 0 300 300" fill="none" stroke="${renk}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">
      <path d="M150 30 c-46 0 -70 34 -70 70 c0 30 16 48 30 64 c8 9 12 18 12 28 h56 c0 -10 4 -19 12 -28 c14 -16 30 -34 30 -64 c0 -36 -24 -70 -70 -70 z" fill="#f2b705" fill-opacity=".14"/>
      <path d="M132 192 v-40 l18 -22 l18 22 v40" stroke-width="4" opacity=".7"/>
      <rect x="116" y="192" width="68" height="20" rx="4" fill="${renk}" fill-opacity=".1"/>
      <rect x="104" y="212" width="92" height="22" rx="4" fill="${renk}" fill-opacity=".85"/>
      <path d="M124 234 v30 M150 234 v38 M176 234 v30"/>
      <g stroke="#f2b705" stroke-width="6" opacity=".9"><line x1="40" y1="96" x2="20" y2="96"/><line x1="260" y1="96" x2="280" y2="96"/><line x1="62" y1="40" x2="48" y2="26"/><line x1="238" y1="40" x2="252" y2="26"/></g>
    </svg>`;
  }
};
CIZIM.aydinlatma = (renk="#2a2e34") => `<svg viewBox="0 0 300 220" aria-hidden="true">
  <ellipse cx="150" cy="198" rx="120" ry="7" fill="#000" opacity=".08"/>
  <rect x="30" y="50" width="240" height="130" rx="14" fill="${renk}" fill-opacity=".9"/>
  <rect x="44" y="64" width="66" height="102" rx="6" fill="#c8312b"/>
  <rect x="117" y="64" width="66" height="102" rx="6" fill="#f2b705"/>
  <rect x="190" y="64" width="66" height="102" rx="6" fill="#f4f5f7"/>
  <g fill="#fff" opacity=".35"><circle cx="77" cy="96" r="9"/><circle cx="77" cy="134" r="9"/><circle cx="150" cy="96" r="9"/><circle cx="150" cy="134" r="9"/></g>
  <path d="M70 180 v14 M230 180 v14" stroke="${renk}" stroke-width="8" stroke-linecap="round"/></svg>`;
CIZIM.elektrik = (renk="#2a2e34") => `<svg viewBox="0 0 300 220" fill="none" stroke="${renk}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M40 150 c40 0 50 -70 100 -70 s60 60 110 60" stroke-width="10" opacity=".85"/>
  <rect x="20" y="132" width="44" height="36" rx="6" fill="${renk}" fill-opacity=".9"/>
  <path d="M64 142 h18 M64 158 h18"/>
  <rect x="200" y="40" width="70" height="40" rx="8" fill="#f2b705"/>
  <path d="M212 60 h46" stroke="#fff" stroke-width="5"/>
  <path d="M235 80 v22 M224 102 h22"/>
  <path d="M160 150 l-14 26 h18 l-10 26" stroke="#f2b705" stroke-width="7"/></svg>`;
CIZIM.silecek = (renk="#2a2e34") => `<svg viewBox="0 0 300 220" fill="none" stroke="${renk}" stroke-linecap="round" aria-hidden="true">
  <path d="M30 170 Q150 20 270 170" stroke-width="5" opacity=".25"/>
  <path d="M150 182 L70 70" stroke-width="10"/>
  <path d="M40 92 L104 46" stroke-width="12"/>
  <path d="M40 92 L104 46" stroke="#f2b705" stroke-width="4"/>
  <circle cx="150" cy="182" r="14" fill="${renk}"/></svg>`;
CIZIM.diger = (renk="#2a2e34") => `<svg viewBox="0 0 300 220" fill="none" stroke="${renk}" stroke-width="8" aria-hidden="true">
  <circle cx="150" cy="110" r="58" fill="${renk}" fill-opacity=".08"/>
  <circle cx="150" cy="110" r="22" fill="#f2b705" stroke="none"/>
  <g stroke-width="18" stroke-linecap="butt">${[0,45,90,135,180,225,270,315].map(a=>{const r=a*Math.PI/180;return `<line x1="${150+58*Math.cos(r)}" y1="${110+58*Math.sin(r)}" x2="${150+76*Math.cos(r)}" y2="${110+76*Math.sin(r)}"/>`}).join("")}</g></svg>`;
function resimYok(img){ const u = {kat: img.dataset.kat, ah: img.dataset.ah}; img.outerHTML = urunCizim(u); }
function urunCizim(u){ return u.kat === "aku" ? CIZIM.aku(u.ah) : (CIZIM[u.kat] ? CIZIM[u.kat]() : ""); }

/* ---------- Ürün adı ve özellikleri ---------- */
function urunBaslik(u){
  const k = KAT[u.kat]; if (!k) return u.marka || "";
  if (u.ad) return u.ad;
  // "{volt}V {ah} Ah Akü" → boş alanların kelimesini atla
  const bos = f => u[f] === "" || u[f] == null;
  const parcalar = k.baslik.split(" ");
  const out = [];
  for (let i = 0; i < parcalar.length; i++){
    const t = parcalar[i], m = t.match(/\{(\w+)\}/);
    if (m && bos(m[1])) { if (t === `{${m[1]}}` && /^[a-zA-Z]{1,2}$/.test(parcalar[i+1]||"")) i++; continue; }
    out.push(t.replace(/\{(\w+)\}/g, (_, f) => u[f]));
  }
  return out.join(" ") || k.tekil;
}
function urunOzellik(u){
  const k = KAT[u.kat]; if (!k) return "";
  return k.alanlar.filter(a => u[a.k] !== "" && u[a.k] != null)
    .map(a => `<span><b>${esc(a.ad)}:</b> ${esc(u[a.k])}${a.birim ? " " + esc(a.birim) : ""}</span>`).join("")
    + (u.parcano ? `<span><b>Parça no:</b> ${esc(u.parcano)}</span>` : "");
}
function urunKart(u){
  const k = KAT[u.kat] || {};
  const title = urunBaslik(u);
  const msg = encodeURIComponent(`Merhaba, ${u.marka ? u.marka + " " : ""}${title} hakkında bilgi almak istiyorum.`);
  const alt = esc((u.marka||"") + " " + title);
  const img = u.foto ? `<img src="${esc(u.foto)}" alt="${alt}" loading="lazy">`
    : (DUKKAN.ariciResim && u.resim && u.aid) ? `<img src="https://crm.ariciotomotiv.com/Service/JsonService.svc/Thumb/${Number(u.aid)}.res" alt="${alt}" loading="lazy" referrerpolicy="no-referrer" data-kat="${esc(u.kat)}" data-ah="${esc(u.ah||"")}" onerror="resimYok(this)">`
    : urunCizim(u);
  const rz = u[k.rozet];
  const badge = rz !== "" && rz != null ? `<span class="badge">${esc(rz)}${k.rozetBirim ? " " + esc(k.rozetBirim) : ""}</span>` : "";
  const price = u.fiyat ? `<span class="price">${esc(u.fiyat)}</span>` : `<span class="price ask">Fiyat için arayın</span>`;
  return `<article class="p">
    <div class="p-img">${img}${badge}${u.stok===false?'<span class="badge out">Stokta yok</span>':''}</div>
    <div class="p-body">
      ${u.marka ? `<span class="p-brand">${esc(u.marka)}</span>` : ""}
      <span class="p-title" title="${esc(title)}">${esc(title)}</span>
      <div class="specs">${urunOzellik(u)}</div>
      ${u.kullanim ? `<span class="p-use">${esc(u.kullanim)}</span>` : ""}
      <div class="p-foot">${price}
        <a href="https://wa.me/${DUKKAN.waRaw}?text=${msg}" target="_blank" rel="noopener">${IC.wa}Sor</a>
      </div>
    </div></article>`;
}

/* ---------- Üst menü, alt bilgi, mobil butonlar ---------- */
function sayfaKur(aktif){
  const tum = [["index.html","Ana Sayfa","ana"], ...Object.entries(KAT).map(([key,k]) => [k.sayfa, k.ad, key]), ["index.html#hakkimizda","Hakkımızda","hakkimizda"], ["index.html#iletisim","İletişim","iletisim"]];
  const ust = [["index.html","Ana Sayfa","ana"], ...Object.entries(KAT).filter(([,k]) => k.menu).map(([key,k]) => [k.sayfa, k.kisa || k.ad, key]),
               ["index.html#hakkimizda","Hakkımızda","hakkimizda"], ["index.html#iletisim","İletişim","iletisim"]];
  const linkler = arr => arr.map(([h,t,key]) => `<a href="${h}" class="${key===aktif?'on':''}">${esc(t)}</a>`).join("");
  const links = linkler(ust), mlinks = linkler(tum);
  $("#ust").outerHTML = `
  <div class="topbar"><div class="wrap">
    <span class="addr">${esc(DUKKAN.address)}</span>
    <span>Sabit hat: <a href="${LINK.land}">${esc(DUKKAN.landline)}</a></span>
  </div></div>
  <header>
    <div class="wrap hrow">
      <a href="index.html" class="brand">
        <span class="brand-mark">${IC.bolt}</span>
        <span><b>${esc(DUKKAN.name)}</b><small>Akü · Marş · Şarj Dinamosu · Oto Elektrik</small></span>
      </a>
      <nav class="main">${links}</nav>
      <a class="call" href="${LINK.tel}">Hemen Ara</a>
    </div>
    <nav class="mobile">${mlinks}</nav>
  </header>`;

  const katList = Object.values(KAT).map(k => `<li><a href="${k.sayfa}">${esc(k.ad)}</a></li>`).join("");
  $("#alt").outerHTML = `
  <footer><div class="wrap">
    <div class="fgrid">
      <div><h4>${esc(DUKKAN.name)}</h4><p>${esc(DUKKAN.address)}</p></div>
      <div><h4>Ürünler</h4><ul>${katList}</ul></div>
      <div><h4>İletişim</h4><ul>
        <li><a href="${LINK.tel}">${esc(DUKKAN.phone)} (cep)</a></li>
        <li><a href="${LINK.land}">${esc(DUKKAN.landline)} (dükkan)</a></li>
        <li><a href="${LINK.wa}" target="_blank" rel="noopener">WhatsApp: ${esc(DUKKAN.wa)}</a></li>
        <li><a href="${LINK.mail}">${esc(DUKKAN.email)}</a></li>
      </ul></div>
    </div>
    <div class="fbottom">© ${new Date().getFullYear()} ${esc(DUKKAN.name)}</div>
  </div></footer>
  <div class="sticky-cta">
    <a class="btn btn-y" href="${LINK.tel}">Ara</a>
    <a class="btn btn-g" href="${LINK.wa}" target="_blank" rel="noopener">WhatsApp</a>
    <a class="btn btn-o" href="${LINK.dir}" target="_blank" rel="noopener">Yol Tarifi</a>
  </div>`;
  document.querySelectorAll("[data-href]").forEach(a => a.href = LINK[a.dataset.href]);
  document.querySelectorAll("[data-f]").forEach(el => el.textContent = DUKKAN[el.dataset.f]);
}

/* ---------- Kategori sayfası ---------- */
function kategoriSayfasi(key){
  const k = KAT[key];
  sayfaKur(key);
  document.title = `${k.ad} | ${DUKKAN.name} – Etimesgut Ankara`;
  $("#baslik").textContent = k.ad;
  $("#aciklama").textContent = k.aciklama;
  $("#kirinti").innerHTML = `<a href="index.html">Ana Sayfa</a> / ${esc(k.ad)}`;
  $("#head-art").innerHTML = (key === "aku" ? CIZIM.aku(72) : (CIZIM[key] ? CIZIM[key]("#ffffff") : "")).replace('aria-hidden','class="head-art" aria-hidden');

  const liste = URUNLER_HEPSI.filter(u => u.kat === key);
  const fk = k.filtre || "marka";
  const sayisal = k.rozet && liste.length && liste.every(u => u[k.rozet] === "" || !isNaN(Number(u[k.rozet])));
  const sayac = {}; liste.forEach(u => { const v = u[fk]; if (v !== "" && v != null) sayac[v] = (sayac[v]||0) + 1; });
  const oncelik = k.oncelik || [];
  const sirali = Object.keys(sayac).sort((a,b) => {
    const ia = oncelik.indexOf(a), ib = oncelik.indexOf(b);
    if (ia !== ib) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    return sayac[b]-sayac[a] || a.localeCompare(b,"tr");
  });
  const secenekler = ["Tümü", ...sirali];
  const sira = v => { const i = sirali.indexOf(String(v)); return i < 0 ? 999 : i; };
  liste.sort((a,b) => sira(a[fk]) - sira(b[fk]) || (a.marka||"").localeCompare(b.marka||"","tr") ||
    (sayisal ? (Number(a[k.rozet])||0) - (Number(b[k.rozet])||0) : 0));
  let secili = "Tümü", aranan = "", limit = 48, hepsiAcik = false;

  function filtreCiz(){
    const ILK = 12;
    let gorunen = secenekler;
    if (!hepsiAcik && secenekler.length > ILK + 2) { gorunen = secenekler.slice(0, ILK); if (!gorunen.includes(secili)) gorunen.push(secili); }
    $("#filters").innerHTML = secenekler.length > 2 ? gorunen.map(m => `<button class="${m===secili?'on':''}" data-m="${esc(m)}">${esc(m)}${m!=="Tümü" ? ` <small>${sayac[m]}</small>` : ""}</button>`).join("")
      + (secenekler.length > ILK + 2 ? `<button class="tumu-ac" data-ac="1">${hepsiAcik ? "Daha az göster" : `+${secenekler.length - gorunen.length} tür daha`}</button>` : "") : "";
    const ac = $("#filters").querySelector("[data-ac]"); if (ac) ac.onclick = () => { hepsiAcik = !hepsiAcik; filtreCiz(); };
    $("#filters").querySelectorAll("button[data-m]").forEach(b => b.onclick = () => { secili = b.dataset.m; limit = 48; filtreCiz(); urunCiz(); });
  }
  function urunCiz(){
    if (!liste.length){
      $("#products").outerHTML = `<div class="empty" id="products"><b>Bu kategoriye ürünler yakında eklenecek</b>
        Aradığınız ${esc(k.tekil.toLowerCase())} için bizi arayın ya da WhatsApp'tan yazın, stoktan hemen bakalım.<br>
        <a class="btn btn-g" href="${LINK.wa}?text=${encodeURIComponent("Merhaba, " + k.tekil.toLowerCase() + " hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener">${IC.wa}WhatsApp'tan Sor</a></div>`;
      $("#tools").style.display = "none";
      return;
    }
    const q = aranan.toLocaleLowerCase("tr").split(/\s+/).filter(Boolean);
    const gor = liste.filter(u => {
      if (secili !== "Tümü" && String(u[fk]) !== secili) return false;
      if (!q.length) return true;
      const metin = [u.marka, urunBaslik(u), u.kullanim, u.parcano, u.oem, ...k.alanlar.map(a => u[a.k])].join(" ").toLocaleLowerCase("tr");
      return q.every(w => metin.includes(w));
    });
    $("#count").textContent = `${gor.length} ürün`;
    $("#products").innerHTML = gor.slice(0, limit).map(urunKart).join("") || `<p class="count">Aramanıza uygun ürün bulunamadı. Parça numarası ya da araç adıyla deneyin, bulamazsanız bize sorun.</p>`;
    dahaFazla(gor.length - limit, () => { limit += 48; urunCiz(); });
  }
  $("#search").placeholder = "Ara: araç, parça no, marka...";
  $("#search").oninput = e => { aranan = e.target.value.trim(); limit = 48; urunCiz(); };
  filtreCiz(); urunCiz();
}

function dahaFazla(kalan, fn){
  let b = document.getElementById("daha");
  if (!b) { b = document.createElement("div"); b.id = "daha"; b.className = "daha"; $("#products").after(b); }
  b.innerHTML = kalan > 0 ? `<button class="btn btn-l">Daha fazla göster <small>(${kalan} ürün daha)</small></button>` : "";
  if (kalan > 0) b.querySelector("button").onclick = fn;
}
function aramaMetni(u){
  const k = KAT[u.kat] || {alanlar:[]};
  return [k.ad, u.marka, urunBaslik(u), u.kullanim, u.parcano, u.oem, ...k.alanlar.map(a => u[a.k])].join(" ").toLocaleLowerCase("tr");
}

/* ---------- Ana sayfa ---------- */
function anaSayfa(){
  sayfaKur("ana");
  $("#cats").innerHTML = Object.entries(KAT).map(([key,k]) => {
    const n = URUNLER_HEPSI.filter(u => u.kat === key).length;
    return `<a class="cat" href="${k.sayfa}">
      <div class="cat-img">${key === "aku" ? CIZIM.aku(72) : (CIZIM[key] ? CIZIM[key]() : "")}</div>
      <div class="cat-body"><h3>${esc(k.ad)}</h3><p>${esc(k.aciklama)}</p>
      <span class="more">${n ? n + " ürün · " : ""}Ürünleri gör →</span></div></a>`;
  }).join("");
  const kutu = $("#genelArama");
  if (kutu) {
    let limit = 48;
    const ciz = () => {
      const q = kutu.value.toLocaleLowerCase("tr").split(/\s+/).filter(Boolean);
      const alan = $("#aramaSonuc");
      if (!q.length) { alan.hidden = true; $("#cats").hidden = false; return; }
      const gor = URUNLER_HEPSI.filter(u => { const m = aramaMetni(u); return q.every(w => m.includes(w)); });
      alan.hidden = false; $("#cats").hidden = true;
      $("#count").textContent = `"${kutu.value.trim()}" için ${gor.length} ürün`;
      $("#products").innerHTML = gor.slice(0, limit).map(urunKart).join("") || `<p class="count">Bulunamadı. Parça numarası ya da araç adıyla deneyin, ya da bize sorun.</p>`;
      dahaFazla(gor.length - limit, () => { limit += 48; ciz(); });
    };
    kutu.oninput = () => { limit = 48; ciz(); };
  }
  $("#brands").innerHTML = DUKKAN.brands.map(b => {
    const m = typeof b === "string" ? {ad:b} : b;
    return m.logo
      ? `<span class="logo" title="${esc(m.ad)}"><img src="${esc(m.logo)}" alt="${esc(m.ad)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.remove('logo');this.parentNode.textContent=this.alt"></span>`
      : `<span>${esc(m.ad)}</span>`;
  }).join("");
  const today = (new Date().getDay() + 6) % 7;
  $("#hours").innerHTML = DUKKAN.hours.map((h,i) => `<tr class="${i===today?'today':''}"><td>${h[0]}</td><td>${h[1]}</td></tr>`).join("");
  $("#map").src = "https://maps.google.com/maps?q=" + encodeURIComponent(DUKKAN.konum || DUKKAN.mapQuery) + "&z=17&output=embed";
}
