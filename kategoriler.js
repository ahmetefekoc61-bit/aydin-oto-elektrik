/* Aydın Oto Elektrik — kategori tanımları
   Her kategorinin kendi sayfası ve kendi özellik alanları var.
   alanlar : ürün kartında ve yönetim tablosunda görünen teknik özellikler.
   filtre  : sayfadaki filtre düğmelerinin hangi alana göre olacağı (marka, tur, grup...).
   baslik  : "ad" boşsa ürün adının nasıl oluşturulacağı ({alan} yazan yerler doldurulur).
   rozet   : ürün resminin köşesinde gösterilecek alan.
   menu    : true ise üst menüde görünür (diğerleri ana sayfada ve alt bilgide). */
window.KATEGORILER = {
  aku: {
    ad: "Aküler", tekil: "Akü", sayfa: "aku.html", menu: true, filtre: "marka", oncelik: ["MUTLU","ESAN"],
    aciklama: "Binek araçtan ağır vasıtaya kadar Mutlu, Esan ve Solid aküler. Yerinde test ve montaj.",
    alanlar: [
      { k: "volt", ad: "Voltaj",   birim: "V",  tip: "number", varsayilan: 12 },
      { k: "ah",   ad: "Kapasite", birim: "Ah", tip: "number" },
      { k: "cca",  ad: "Marş akımı (EN)", birim: "A", tip: "number" }
    ],
    baslik: "{volt}V {ah} Ah Akü", rozet: "ah", rozetBirim: "Ah"
  },
  mars: {
    ad: "Marş Dinamoları", kisa: "Marş", tekil: "Marş Dinamosu", sayfa: "mars-dinamosu.html", menu: true, filtre: "tur", oncelik: ["Marş motoru"],
    aciklama: "Komple marş motorları ve yedek parçaları: otomatik, kollektör, dişli, kömür, burç.",
    alanlar: [
      { k: "tur",  ad: "Parça türü", birim: "",   tip: "text", ipucu: "Marş motoru, Otomatik..." },
      { k: "volt", ad: "Voltaj",     birim: "V",  tip: "number" },
      { k: "kw",   ad: "Güç",        birim: "kW", tip: "number" },
      { k: "dis",  ad: "Diş sayısı", birim: "",   tip: "number" }
    ],
    baslik: "{tur}", rozet: "volt", rozetBirim: "V"
  },
  sarj: {
    ad: "Şarj Dinamoları", kisa: "Şarj", tekil: "Şarj Dinamosu", sayfa: "sarj-dinamosu.html", menu: true, filtre: "tur", oncelik: ["Alternatör (komple)"],
    aciklama: "Alternatörler ve yedek parçaları: konjektör, statör, diyot, kömür, kasnak.",
    alanlar: [
      { k: "tur",   ad: "Parça türü", birim: "",  tip: "text", ipucu: "Alternatör, Konjektör..." },
      { k: "volt",  ad: "Voltaj",     birim: "V", tip: "number" },
      { k: "amper", ad: "Akım",       birim: "A", tip: "number" }
    ],
    baslik: "{tur}", rozet: "amper", rozetBirim: "A"
  },
  ampul: {
    ad: "Ampuller", tekil: "Ampul", sayfa: "ampul.html", menu: true, filtre: "tip",
    aciklama: "Far, sis, sinyal ve stop ampulleri. Halojen, xenon ve LED; 12V ve 24V.",
    alanlar: [
      { k: "tip",  ad: "Ampul tipi", birim: "",  tip: "text", ipucu: "H4, H7, P21W..." },
      { k: "volt", ad: "Voltaj",     birim: "V", tip: "text" },
      { k: "watt", ad: "Güç",        birim: "W", tip: "text" }
    ],
    baslik: "{tip} {volt}V {watt}W Ampul", rozet: "tip", rozetBirim: ""
  },
  aydinlatma: {
    ad: "Aydınlatma", tekil: "Lamba", sayfa: "aydinlatma.html", menu: true, filtre: "tur",
    aciklama: "Stop lambaları, side marker, far, sis ve çalışma lambaları, reflektörler.",
    alanlar: [
      { k: "tur",  ad: "Tür",    birim: "",  tip: "text" },
      { k: "volt", ad: "Voltaj", birim: "V", tip: "text" }
    ],
    baslik: "{tur}", rozet: "volt", rozetBirim: "V"
  },
  elektrik: {
    ad: "Elektrik Malzemeleri", kisa: "Elektrik", tekil: "Malzeme", sayfa: "elektrik.html", menu: false, filtre: "grup",
    aciklama: "Kablo, sigorta, röle, korna, römork fişi ve soketleri, müşür ve anahtarlar.",
    alanlar: [ { k: "grup", ad: "Grup", birim: "", tip: "text" } ],
    baslik: "{grup}", rozet: "", rozetBirim: ""
  },
  silecek: {
    ad: "Silecek & Su Motoru", kisa: "Silecek", tekil: "Silecek", sayfa: "silecek.html", menu: false, filtre: "grup",
    aciklama: "Silecek süpürgeleri, silecek motorları, su fıskiye motorları ve cam suyu.",
    alanlar: [
      { k: "grup", ad: "Grup",  birim: "",   tip: "text" },
      { k: "olcu", ad: "Boyut", birim: "mm", tip: "number" }
    ],
    baslik: "{grup}", rozet: "olcu", rozetBirim: "mm"
  },
  diger: {
    ad: "Diğer Parçalar", kisa: "Diğer", tekil: "Parça", sayfa: "diger.html", menu: false, filtre: "grup",
    aciklama: "Fren balatası ve diski, filtre, yakıt pompası, webasto ısıtıcı ve diğer parçalar.",
    alanlar: [ { k: "grup", ad: "Grup", birim: "", tip: "text" } ],
    baslik: "{grup}", rozet: "", rozetBirim: ""
  }
};
