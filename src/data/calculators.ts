export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color?: string; // Kategoriye özel renk
};

export type CalculatorInfo = {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  description: string;
};

export const categories: Category[] = [
  { id: "kredi", name: "Kredi", slug: "kredi", description: "İhtiyaç, konut, taşıt ve ticari kredi hesaplamaları.", icon: "Bank", color: "#10b981" },
  { id: "finans", name: "Finans", slug: "finans", description: "Faiz, döviz, enflasyon ve yatırım getirisi hesaplamaları.", icon: "TrendingUp", color: "#3b82f6" },
  { id: "saglik", name: "Sağlık", slug: "saglik", description: "İdeal kilo, su ihtiyacı, vücut kitle endeksi, gebelik ve yaş.", icon: "Heart", color: "#ef4444" },
  { id: "egitim", name: "Eğitim", slug: "egitim", description: "Ders notu, ortalama ve okul başlangıç yaşı vb. okul hesaplamaları.", icon: "BookOpen", color: "#f59e0b" },
  { id: "matematik", name: "Matematik", slug: "matematik", description: "Alan, hacim, yüzdelik oran, denklem çözümleri ve dönüştürücüler.", icon: "Calculator", color: "#8b5cf6" },
  { id: "donusturuculer", name: "Dönüştürücüler", slug: "donusturucu", description: "Uzunluk, ağırlık ve sıcaklık gibi çeşitli birim çevirme araçları.", icon: "Repeat", color: "#06b6d4" },
  { id: "sure", name: "Zaman", slug: "zaman", description: "Tarihler arası gün, hafta, saat, namaz saatleri ve yaş.", icon: "Clock", color: "#6366f1" },
  { id: "muhasebe", name: "Muhasebe", slug: "muhasebe", description: "Maaş, tazminat, mesai ve asgari geçim hesaplamaları.", icon: "Briefcase", color: "#475569" },
  { id: "vergi", name: "Vergi", slug: "vergi", description: "KDV, damga vergisi, emlak, gelir ve ÖTV hesaplamaları.", icon: "Percent", color: "#b91c1c" },
  { id: "sinav", name: "Sınav Hesaplamaları", slug: "sinav", description: "ÖSYM, MEB, AGS, YKS, Hâkimlik ve diğer giriş sınavı puan hesaplamaları.", icon: "GraduationCap", color: "#1d4ed8" },
  { id: "ticari", name: "Ticari", slug: "ticari", description: "Kar marjı, fiyat belirleme, KDV dahil/hariç ticari ölçümler.", icon: "ShoppingCart", color: "#f97316" },
  { id: "diger", name: "Diğer", slug: "diger", description: "Kuşak hesaplama, burç hesabı ve diğer spesifik araçlar.", icon: "MoreHorizontal", color: "#ec4899" },
  { id: "araclar", name: "Pratik Araçlar", slug: "pratik-araclar", description: "Şifre oluşturucu, kelime sayacı ve QR kod üretici gibi günlük hayatınızı kolaylaştıran web araçları.", icon: "Settings", color: "#14b8a6" },
  { id: "eglence", name: "Eğlence & Çekiliş", slug: "eglence", description: "Çekiliş yapıcı, zar atma, şanslı kelime ve rastgele sayı üretici (RNG) tarzı eğlence oyunları.", icon: "Smile", color: "#d946ef" },
  { id: "gelistirici", name: "Geliştirici Araçları", slug: "gelistirici-araclari", description: "JSON formatlayıcı, Hash/MD5 şifreleyici, Base64 ve Renk (HEX/RGB) kod dönüştürücü programcı modülleri.", icon: "Code", color: "#000000" },
  { id: "muhendislik", name: "Mühendislik", slug: "muhendislik-araclari", description: "Direnç renk kodları, Ohm kanunu ve teknik hesaplama araçları.", icon: "Cpu", color: "#a855f7" },
  { id: "sosyal", name: "Sosyal Medya", slug: "sosyal-medya-araclari", description: "X (Twitter) karakter sayacı, dekoratif yazı oluşturucu ve içerik araçları.", icon: "Share2", color: "#38bdf8" },
  { id: "pdf", name: "PDF Araçları", slug: "pdf-araclari", description: "PDF birleştirme, bölme, sayfa ayıklama ve görsele dönüştürme gibi döküman yönetim araçları.", icon: "FileText", color: "#ef4444" },
  { id: "oyun", name: "Oyunlar", slug: "oyunlar", description: "2048 gibi zeka oyunları ve platform içi eğlenceli vakit geçirme modülleri.", icon: "Gamepad2", color: "#8b5cf6" }
];

export const calculators: CalculatorInfo[] = [
  // Sağlık Kats. 2026
  { id: "bmi", title: "Vücut Kitle Endeksi", slug: "vucut-kitle-endeksi", categoryId: "saglik", description: "Boyunuza ve kilonuza göre sağlıklı aralıkta olup olmadığınızı öğrenin." },
  { id: "ideal-kilo", title: "İdeal Kilo Hesaplama", slug: "ideal-kilo", categoryId: "saglik", description: "Boy, yaş ve cinsiyete göre tıbbi standartlardaki ideal (olmanız gereken) kilonuz." },
  { id: "su-ihtiyaci", title: "Su İhtiyacı Hesaplama", slug: "su-ihtiyaci", categoryId: "saglik", description: "Günlük olarak tüketmeniz gereken minimum litre ve bardak bazında su miktarı." },
  { id: "uyku-dongusu", title: "Uyku Döngüsü (REM) Hesaplama", slug: "uyku-dongusu", categoryId: "saglik", description: "Dinç uyanmak için tam olarak saat kaçta uyanmanız veya uyumanız gerektiği." },
  { id: "bmr", title: "Bazal Metabolizma Hızı (BMR)", slug: "bmr", categoryId: "saglik", description: "Vücudunuzun istirahat halindeyken (hiç hareket etmeden) harcadığı minimum kalori." },
  { id: "gebelik", title: "Gebelik Hesaplama", slug: "gebelik", categoryId: "saglik", description: "Doğum tarihi ve gebelik haftanızı ortalama değerlere göre hesaplayın." },
  { id: "adet-takibi", title: "Adet (Regl) Takibi ve Yumurtlama", slug: "adet-takibi", categoryId: "saglik", description: "Sonraki adet döngünüzü, yumurtlama (ovulasyon) günü ve doğurganlık tarihinizi hesaplayın." },
  { id: "kalori", title: "Günlük Kalori İhtiyacı", slug: "gunluk-kalori-ihtiyaci", categoryId: "saglik", description: "Boy, kilo ve hareket durumunuza göre almanız gereken kalori." },
  
  // Finans ve Kredi
  { id: "kredi", title: "Kredi Hesaplama", slug: "kredi-hesaplama", categoryId: "kredi", description: "Aylık taksit tutarlarınızı, anapara ve faiz oranınıza göre detaylı hesaplayın." },
  { id: "kredikarti", title: "Kredi Kartı Asgari Ödeme", slug: "kredi-karti-asgari", categoryId: "kredi", description: "Mevcut borcunuza göre ödemeniz gereken minimum asgari tutar." },
  { id: "amortizasyon", title: "Kredi Ödeme Planı (Amortizasyon)", slug: "kredi-odeme-plani", categoryId: "kredi", description: "Ay bazlı anapara ve faiz dökümünü içeren detaylı kredi taksit tablosu." },
  { id: "faiz", title: "Faiz Getirisi", slug: "faiz", categoryId: "finans", description: "Vadeli mevduat hesaplamaları ve net/brüt getiri hesabı." },
  { id: "vucut-yag", title: "Vücut Yağ Oranı (US Navy)", slug: "vucut-yag-orani", categoryId: "saglik", description: "Bel, boyun ve boy ölçülerinize göre vücut yağ yüzdenizi profesyonelce hesaplayın." },
  { id: "su-takibi", title: "İnteraktif Su Takipçisi", slug: "su-takibi", categoryId: "saglik", description: "Günlük su ihtiyacınızı hesaplayın ve içtiğiniz suyu bardak bazlı görsel takip edin." },
  { id: "uyku", title: "Uyku Döngüsü (Zinde Uyanma)", slug: "uyku-dongusu", categoryId: "saglik", description: "REM uykusu döngülerinize göre en zinde uyanabileceğiniz saati belirleyin." },
  { id: "ovulasyon", title: "Yumurtlama (Ovulasyon) Günü", slug: "ovulasyon-hesaplama", categoryId: "saglik", description: "Hamilelik planlaması için en verimli doğurganlık günlerinizi belirleyin." },
  { id: "makro", title: "Makro & Kalori Analizi", slug: "makro-hesaplama", categoryId: "saglik", description: "Hedefinize göre (Kilo ver/al) almanız gereken protein, karbonhidrat ve yağ dengesi." },

  // Gastro & Mutfak
  { id: "tarif", title: "Tarif Ölçekleyici (Portiyonlama)", slug: "tarif-olcekleyici", categoryId: "saglik", description: "Kişi sayısına göre tarifteki tüm malzemeleri anlık olarak yeniden oranlayın." },
  { id: "gastro", title: "Hassas Mutfak Dönüştürücü", slug: "mutfak-donusturucu", categoryId: "saglik", description: "Un, şeker, yağ gibi malzemeleri malzemeye özel özkütle ile birimler arası dönüştürün." },
  { id: "eurobond", title: "Eurobond Hesaplama", slug: "eurobond", categoryId: "finans", description: "Eurobond yatırımınızın getirisini ve pazar fiyatlamasını hesaplayın." },
  { id: "npv", title: "Net Bugünkü Değer Hesaplama", slug: "net-bugunku-deger", categoryId: "finans", description: "Bir nakit akışını paranın maliyeti ile indirgeyerek bugünkü değerini hesaplayın." },
  { id: "cagr", title: "Bileşik Büyüme (CAGR) Hesaplama", slug: "bilesik-buyume", categoryId: "finans", description: "Bir yatırımın belirli yıllar arasındaki yıllık bileşik büyüme oranını hesaplar." },
  { id: "enflasyon", title: "Enflasyon Hesaplama", slug: "enflasyon", categoryId: "finans", description: "Paranın geçmiş ve gelecek yıllara göre alım gücündeki değişimler." },
  { id: "birikim", title: "Birikim Hesaplama", slug: "birikim", categoryId: "finans", description: "Aylık düzenli ödemeler ile gelecekteki anapara ve faizli birikim tutarınız." },
  { id: "bono", title: "Bono Hesaplama", slug: "bono", categoryId: "finans", description: "İskontolu hazine bonolarının cari fiyat, getiri ve verim hesabı." },
  { id: "tahvil", title: "Tahvil Hesaplama", slug: "tahvil", categoryId: "finans", description: "Kuponlu tahvillerin bugünkü değerine göre fiyatlaması ve satım teorik verimi." },
  { id: "gecmis_altin", title: "Geçmiş Altın Fiyatları Hesaplama", slug: "gecmis-altin", categoryId: "finans", description: "Geçmiş yıllara ait ortalama altın alış fiyatlarını analiz edin." },
  { id: "gecmis_doviz", title: "Geçmiş Döviz Kurları Hesaplama", slug: "gecmis-doviz", categoryId: "finans", description: "Geçmiş yılların döviz kurlarını kullanarak paritenizi karşılaştırın." },
  { id: "iban", title: "IBAN Doğrulama", slug: "iban", categoryId: "finans", description: "IBAN numarasının geçerliliğini ve matematiksel standart formatını doğrulayın." },
  { id: "iskonto", title: "İç ve Dış İskonto Hesaplama", slug: "iskonto", categoryId: "finans", description: "Senet kırdırım işlemlerinde İç İskonto ve Dış İskonto ayrımını tespit edin." },
  { id: "irr", title: "İç Verim Oranı Hesaplama", slug: "ic-verim-orani", categoryId: "finans", description: "Bir yatırım projesinin Net Bugünkü Değerini sıfırlayan verim (IRR) oranını bulun." },
  { id: "kira", title: "Kira Artış Oranı Hesaplama", slug: "kira-artisi", categoryId: "finans", description: "TÜFE limitlerine veya yasal hedeflere göre konut & isyeri kira artışını bulun." },
  { id: "ort_vade", title: "Ortalama Vade Hesaplama", slug: "ortalama-vade", categoryId: "finans", description: "Birden fazla çek veya senetin gün ve tutar ağırlıklı ortalama vadesini hesaplayın." },
  { id: "para_deger", title: "Parasal Değer Hesaplama", slug: "parasal-deger", categoryId: "finans", description: "Paranın zamansal değerini enflasyon oranlarına göre ölçümleyin." },
  { id: "reel_getiri", title: "Reel Getiri Hesaplama", slug: "reel-getiri", categoryId: "finans", description: "Yatırımınızın enflasyondan arındırılmış gerçek (reel) getiri yüzdesini hesaplayın." },
  { id: "repo", title: "Repo Hesaplama", slug: "repo", categoryId: "finans", description: "Gecelik veya vadeli repo işlemlerinizden elde edeceğiniz net getiriyi hesaplayın." },
  { id: "temettu", title: "Sermaye ve Temettü Hesaplama", slug: "temettu", categoryId: "finans", description: "Hisse senedi yatırımlarınızın temettü verimliliğini hisse başı maliyetle analiz edin." },
  { id: "vadeli_islem", title: "Vadeli İşlem Fiyatı Hesaplama", slug: "vadeli-islem", categoryId: "finans", description: "Dayanak varlığın spot fiyattan vadeli (Futures) teorik fiyatına ulaşım formülü." },
  { id: "vadeli_mevduat", title: "Vadeli Mevduat Faizi Hesaplama", slug: "vadeli-mevduat", categoryId: "finans", description: "Brüt ve net mevduat getirilerini ayrı ayrı görebileceğiniz faiz aracı." },

  // Matematik
  { id: "yuzde", title: "Yüzde Hesaplama", slug: "yuzde", categoryId: "matematik", description: "Bir sayının %x'i, yüzde farkları ve oran orantı problemleri." },
  { id: "ebob_ekok", title: "EBOB EKOK", slug: "ebob-ekok", categoryId: "matematik", description: "İki veya daha fazla sayının en büyük ortak böleni ve en küçük ortak katı." },
  { id: "kesir", title: "Kesir Hesaplama", slug: "kesir", categoryId: "matematik", description: "Kesirlerle toplama, çıkarma, çarpma ve bölme işlemlerini kolayca yapın." },
  { id: "logaritma", title: "Logaritma Hesaplama", slug: "logaritma", categoryId: "matematik", description: "İstediğiniz tabanda (10, 2, e) logaritma değerini milisaniyeler içinde hesaplayın." },
  { id: "alan-hacim", title: "Alan ve Hacim Hesaplayıcı", slug: "alan-hacim", categoryId: "matematik", description: "Kare, silindir, küre, daire gibi şekillerin alan, çevre ve hacimlerini bulun." },
  { id: "uslu-koklu", title: "Üslü ve Köklü Sayı Hesaplama", slug: "uslu-koklu", categoryId: "matematik", description: "Herhangi bir sayının üssünü veya n'inci dereceden kökünü kolayca sistemde çözün." },
  { id: "denklem", title: "Denklem Çözücü", slug: "denklem-cozucu", categoryId: "matematik", description: "Birinci ve ikinci dereceden (ax² + bx + c) denklemlerin köklerini ve deltasını bulun." },
  { id: "asal-sayi", title: "Asal Sayı Bulucu", slug: "asal-sayi", categoryId: "matematik", description: "Bir sayının asal olup olmadığını kontrol edin ve çarpanlarına ayırın." },
  { id: "altin-oran", title: "Altın Oran Hesaplama", slug: "altin-oran", categoryId: "matematik", description: "Uzun ve kısa kenar arasındaki altın oran (1.618) dengesini hesaplayın." },
  { id: "faktoriyel", title: "Faktöriyel Hesapla", slug: "faktoriyel-hesaplama", categoryId: "matematik", description: "Bir sayının faktöriyelini (n!) matematiksel olarak hesaplar." },
  { id: "metrekare", title: "Metrekare Hesaplama", slug: "metrekare-hesaplama", categoryId: "matematik", description: "En ve boy ölçülerine göre alan ve tahmini maliyet hesabı." },
  { id: "oran-oranti", title: "Oran-Orantı Hesapla", slug: "oran-oranti-hesaplama", categoryId: "matematik", description: "Doğru ve ters orantı problemlerini X değerini bularak çözün." },
  { id: "sayi-okunusu", title: "Sayı Okunuşu (Yazıyla)", slug: "sayi-okunusu", categoryId: "matematik", description: "Rakamla girilen sayıların Türkçe metin karşılığını (yazılışını) bulun." },
  { id: "taban-donusumu", title: "Taban Dönüşümü", slug: "taban-donusumu", categoryId: "matematik", description: "Sayıları 2, 8, 10, 16 ve diğer tüm tabanlar arasında dönüştürün." },
  { id: "basit-faiz-mat", title: "Basit Faiz Hesaplama", slug: "basit-faiz", categoryId: "matematik", description: "Anapara, faiz oranı ve süreye göre matematiksel faiz getirisi." },
  { id: "bilesik-faiz-mat", title: "Bileşik Faiz Hesaplama", slug: "bilesik-faiz", categoryId: "matematik", description: "Matematiksel bileşik faiz formülü ile gelecek değer hesabı." },
  { id: "cevre", title: "Çevre Hesaplama", slug: "cevre-hesaplama", categoryId: "matematik", description: "Kare, dikdörtgen, daire ve üçgen gibi şekillerin çevre uzunluklarını hesaplayın." },
  { id: "inc", title: "İnç Hesaplama", slug: "inc-hesaplama", categoryId: "matematik", description: "İnç ve santimetre (cm) birimleri arasında anlık ve hassas dönüşüm yapın." },
  { id: "mil", title: "Mil Hesaplama", slug: "mil-hesaplama", categoryId: "matematik", description: "Mil ve kilometre (km) birimleri arasında hızlı mesafe dönüşümü." },

  // Muhasebe, Ticari, Gündelik
  { id: "netbrut", title: "Netten Brüte Maaş", slug: "netten-brute", categoryId: "muhasebe", description: "Ele geçen net paradan vergi kesintileri dahil brüt maaş hesaplama." },
  { id: "tazminat", title: "Kıdem Tazminatı", slug: "kidem-tazminati", categoryId: "muhasebe", description: "Çalışma sürenize ve brüt maaşınıza göre alacağınız tazminat tutarı." },
  { id: "arac-gider", title: "Binek Araç Gider Kısıtlaması", slug: "binek-arac-gider", categoryId: "muhasebe", description: "Kanunen kabul edilen (KKEG) ve edilmeyen ticari binek araç giderlerini belirleyin." },
  { id: "yakit-tuketim", title: "Yakıt Hesaplama", slug: "yakit-maliyeti", categoryId: "muhasebe", description: "Aracınızın km başına kaç TL yaktığını, toplam yol masrafını analiz edin." },
  { id: "meb-ek-ders", title: "MEB Ek Ders Ücreti (2026)", slug: "meb-ek-ders-hesaplama", categoryId: "muhasebe", description: "Öğretmenler için gündüz, gece ve hafta sonu ek ders ücreti hesaplaması." },
  { id: "acad-ek-ders", title: "Akademisyen Ek Ders (2026)", slug: "akademisyen-ek-ders-hesaplama", categoryId: "muhasebe", description: "Akademik personel için unvan bazlı ek ders ücreti hesaplama." },
  { id: "mtv", title: "MTV Hesaplama (2026 Güncel)", slug: "mtv-hesaplama", categoryId: "muhasebe", description: "2026 Ocak MTV tutarlarını araç tipi ve yaşına göre karşılaştırmalı hesaplayın." },
  { id: "currency-commodity", title: "Döviz & Altın Hesaplaması (Canlı)", slug: "doviz-altin-hesaplama", categoryId: "muhasebe", description: "Anlık kurlar ile Dolar, Euro ve altın (Gram, Çeyrek, Yarım) birimlerini TL'ye çevirin." },
  { id: "tax-free", title: "Global Tax Free Hesaplama (2026)", slug: "tax-free-hesaplama", categoryId: "muhasebe", description: "15+ ülke (Fransa, İtalya, Japonya vb.) için KDV iadesini yerel para birimi ve TL karşılığıyla hesaplayın." },
  { id: "desi", title: "Kargo Desi Hesaplama", slug: "kargo-desi-hesaplama", categoryId: "muhasebe", description: "Paket boyutlarına göre kargo desi (hacimsel ağırlık) hesaplaması." },
  
  // Ticari ve Vergi
  { id: "kdv", title: "KDV Hesaplama (Tevkifatlı)", slug: "kdv", categoryId: "ticari", description: "Tevkifat desteği ile KDV dahil ve hariç fatura tutarlarını hesaplayın." },
  { id: "gelirvergisi", title: "Gelir Vergisi (2026 Projeksiyon)", slug: "gelir-vergisi", categoryId: "ticari", description: "2026 yılı beklenen vergi dilimlerine göre net maaş ve dilim dağılımı analizi." },
  { id: "karmarji", title: "Ticari Analiz & Kar Marjı", slug: "kar-marji", categoryId: "ticari", description: "Kar marjı, markup ve başabaş noktası (break-even) görsel analiz modülü." },
  { id: "karzarar", title: "Kar Zarar Hesaplama", slug: "kar-zarar", categoryId: "ticari", description: "Alış ve satış fiyatı üzerinden toplam kar veya zarar tutarı." },
  { id: "toptan", title: "Toptan – Perakende Fiyat", slug: "toptan-perakende", categoryId: "ticari", description: "Birim maliyet ve adet bazında toptan ile perakende fiyatlarını karşılaştırın." },
  { id: "basabas", title: "Başabaş Noktası Hesaplama", slug: "basabas-noktasi", categoryId: "ticari", description: "Sabit giderlerinizi karşılamak için satmanız gereken minimum ürün adedini hesaplayın." },

  // Sınavlar
  { id: "kpss", title: "KPSS Puan Hesaplama", slug: "kpss-puan", categoryId: "sinav", description: "Lisans, Önlisans ve Ortaöğretim KPSS tahmini sınav P3/P93/P94 ve P10 puanınız." },
  { id: "ales", title: "ALES Puan Hesaplama", slug: "ales-puan", categoryId: "sinav", description: "ALES Sayısal, Sözel ve Eşit Ağırlık tahmini sınav sonuç puanları (50-100)." },
  { id: "dgs", title: "DGS Puan Hesaplama", slug: "dgs-puan", categoryId: "sinav", description: "DGS ve ÖBP eklemeli Sayısal, Sözel, EA tahmini sınav puanı hesaplamaları." },
  { id: "yds", title: "YDS & YÖKDİL Puan Hesaplama", slug: "yds-puan", categoryId: "sinav", description: "Doğru sayınıza göre yabancı dil sınavı puanınızı ve harf seviyenizi hesaplayın." },
  { id: "tus-dus", title: "TUS / DUS Puan Hesaplama", slug: "tus-dus-puan", categoryId: "sinav", description: "Tıpta ve Diş Hekimliğinde Uzmanlık temel/klinik tıp puan hesaplama simülatörü." },
  { id: "ags", title: "AGS Puan Hesaplama", slug: "ags-puan", categoryId: "sinav", description: "Akademi Giriş Sınavı netlerinizi ve tahmini puanınızı hesaplayın." },
  { id: "hsy", title: "Hâkim ve Savcı Yardımcılığı Puanı", slug: "hakim-savci-puan", categoryId: "sinav", description: "Genel Kültür ve Alan Bilgisi netlerinize göre tahmini sınav puanınız." },
  { id: "aks-puan", title: "AKS Puan Hesaplama", slug: "aks-puan-hesaplama", categoryId: "sinav", description: "Adaylık Kaldırma Sınavı (AKS) puan hesaplama aracı." },
  { id: "ehliyet-puan", title: "Ehliyet Sınavı Puan Hesaplama", slug: "ehliyet-sinavi-puan", categoryId: "sinav", description: "Sürücü kursu e-sınav puanı ve başarı durumu sorgulama." },
  { id: "isg-puan", title: "İSG Puan Hesaplama", slug: "isg-puan-hesaplama", categoryId: "sinav", description: "İş Sağlığı ve Güvenliği sınavı puanınızı hesaplayın." },
  { id: "ozel-guvenlik-puan", title: "Özel Güvenlik Puan Hesaplama", slug: "ozel-guvenlik-sinavi-puan", categoryId: "sinav", description: "Silahlı ve silahsız özel güvenlik sınavı puanı hesaplayıcısı." },
  { id: "msu-puan", title: "MSÜ Puan Hesaplama", slug: "msu-puan-hesaplama", categoryId: "sinav", description: "Milli Savunma Üniversitesi (MSÜ) puan ve katsayı hesabı." },
  { id: "polislik-puan", title: "Polislik (PMYO/POMEM) Puan Hesaplama", slug: "polislik-puan-hesaplama", categoryId: "sinav", description: "PMYO ve POMEM giriş sınavı puan hesaplama asistanı." },
  { id: "ekpss-puan", title: "EKPSS Puan Hesaplama", slug: "ekpss-puan-hesaplama", categoryId: "sinav", description: "Engelli Kamu Personeli Seçme Sınavı puan tahmin aracı." },
  { id: "hmgs-puan", title: "HMGS Puan Hesaplama", slug: "hmgs-puan-hesaplama", categoryId: "sinav", description: "Hukuk Mesleklerine Giriş Sınavı baraj ve puan sorgulama." },
  { id: "obp-hesaplama", title: "OBP Hesaplama", slug: "obp-hesaplama", categoryId: "sinav", description: "Ortaöğretim Başarı Puanı ve diploma notu hesaplayıcı." },
  { id: "dib-mbsts-puan", title: "DİB MBSTS Puan Hesaplama", slug: "dib-mbsts-puan", categoryId: "sinav", description: "Diyanet MBSTS sınavı puan hesaplama aracı." },
  { id: "eus-puan", title: "EUS Puan Hesaplama", slug: "eus-puan", categoryId: "sinav", description: "Eczacılıkta Uzmanlık Sınavı (EUS) puan hesaplama." },
  { id: "iyos-puan", title: "İYÖS Puan Hesaplama", slug: "iyos-puan", categoryId: "sinav", description: "Uluslararası Öğrenci Sınavı (İYÖS) puan hesaplama." },
  { id: "oyp-puan", title: "ÖYP Puan Hesaplama", slug: "oyp-puan", categoryId: "sinav", description: "Öğretim Üyesi Yetiştirme Programı (ÖYP) puan hesaplama." },

  // Eğitim
  { id: "lgs", title: "LGS Puan Hesaplama", slug: "lgs-puan", categoryId: "egitim", description: "Liselere Geçiş Sistemi deneme ve sınav netinize göre puanınızı hesaplayın." },
  { id: "yks", title: "YKS Puan Hesaplama", slug: "yks-puan", categoryId: "egitim", description: "TYT, AYT ve YDT netlerinizi girerek üniversite sınav puanınızı tahmini çıkarın." },
  { id: "grade", title: "Ders Notu Ortalaması", slug: "not-ortalamasi", categoryId: "egitim", description: "Ders notlarınızı ve kredilerini (veya ders saati) girerek ağırlıklı not ortalamanızı hesaplayın." },
  // Eğitim - Okul / Karne Paketi
  { id: "aof", title: "AÖF Harf Notu Hesaplama", slug: "aof-harf-notu", categoryId: "egitim", description: "Açıköğretim (AÖF) Vize-Final ortalamasına göre tahmini çan hesabı harf notu." },
  { id: "vize-final", title: "Vize Final Ortalama Hesaplama", slug: "vize-final-ortalama", categoryId: "egitim", description: "Üniversite vize ve final ağırlıklarınıza göre ders geçme notunuzu belirleyin." },
  { id: "e-okul", title: "E-Okul Not Hesaplama", slug: "e-okul-not", categoryId: "egitim", description: "Öğrenci sınav, sözlü ve proje performans notlarının e-okul standart ortalaması." },
  { id: "ders-notu", title: "Ders Notu Hesaplama", slug: "ders-notu-hesaplama", categoryId: "egitim", description: "Tekil ders bazlı veya haftalık ağırlığa göre not hesaplayıcısı." },
  { id: "lise-ders-puani", title: "Lise Ders Puanı Hesaplama", slug: "lise-ders-puani", categoryId: "egitim", description: "Lise müfredatına göre ağırlıklı dönem sonu ders puanlarını bulun." },
  { id: "lise-sinif-gecme", title: "Lise Sınıf Geçme Hesaplama", slug: "lise-sinif-gecme", categoryId: "egitim", description: "Baraj dersi (Edebiyat vb.) ve genel ortalamanızla sınıf geçip geçmediğinizi test edin." },
  { id: "lise-ortalama", title: "Lise Ortalama Hesaplama", slug: "lise-ortalama", categoryId: "egitim", description: "Haftalık saat bazında liselilerin tüm ders ağırlıklı ortalaması." },
  { id: "takdir-tesekkur", title: "Takdir Teşekkür Hesaplama", slug: "takdir-tesekkur", categoryId: "egitim", description: "85 Takdir, 70 Teşekkür belgesi sınırlarını test eden özelleştirilmiş karne aracı." },
  { id: "lise-ybp", title: "Lise YBP Hesaplama", slug: "lise-ybp", categoryId: "egitim", description: "MEB lise yıl sonu başarı puanınızı (YBP) tüm yıllara özel hesaplayın." },
  { id: "lise-mezuniyet", title: "Lise Mezuniyet Puanı Hesaplama", slug: "lise-mezuniyet", categoryId: "egitim", description: "Üniversiteye (OBP'ye) etki edecek diploma notu / mezuniyet puanınızı çıkarın." },
  { id: "uni-not", title: "Üniversite Not Ortalaması Hesaplama", slug: "universite-not-ortalamasi", categoryId: "egitim", description: "AA, BA, BB vb. harf notları ve AKTS/kredi sistemiyle GANO hesaplayın." },
  { id: "okula-baslama", title: "Okula Başlama Yaşı Hesaplama", slug: "okula-baslama-yasi", categoryId: "egitim", description: "MEB tablosuna göre çocuğunuzun okula başlama yılı ve ayını hesaplayın." },

  // Zaman ve Diğer
  { id: "kacinci-gun", title: "Yılın Kaçıncı Günü", slug: "yilin-kacinci-gunu", categoryId: "sure", description: "Seçtiğiniz tarihin yılın kaçıncı günü olduğunu kolayca hesaplayın." },
  { id: "tarih-fark", title: "Tarihler Arası Gün Hesaplama", slug: "tarihler-arasi-gun", categoryId: "sure", description: "İki tarih arasındaki gün, hafta, ay, yıl ve iş günü sayısını hesaplayın." },
  { id: "yas-hesap", title: "Yaş Hesaplama", slug: "yas-hesaplama", categoryId: "sure", description: "Doğum tarihinizden kaç yaşında olduğunuzu, toplam günü ve sonraki doğum gününüzü bulun." },
  { id: "saat-hesap", title: "Saat Hesaplama", slug: "saat-hesaplama", categoryId: "sure", description: "İki süreyi toplayın veya çıkarın — çalışma süreleri, mesai ve proje takibi için ideal." },
  { id: "calisma-saati", title: "Çalışma Saati Hesaplama", slug: "calisma-saati", categoryId: "sure", description: "Giriş-çıkış saati ve mola süresine göre günlük, haftalık, aylık ve yıllık çalışma saatinizi öğrenin." },
  { id: "kusak", title: "Kuşak Hesaplama", slug: "kusak", categoryId: "diger", description: "Doğum yılınıza göre hangi jenerasyona (kuşağa) ait olduğunuzu bulun." },
  { id: "burc", title: "Burç Hesaplama", slug: "burc-hesaplama", categoryId: "diger", description: "Doğum tarihinize göre güneş burcunuzu, grubunu ve yönetici gezegeninizi öğrenin." },
  { id: "cin-burcu", title: "Çin Burcu Hesaplama", slug: "cin-burcu", categoryId: "diger", description: "Çin Zodyak sistemine göre doğum yılıyla elementinizi ve hayvan motifi burcunuzu bulun." },
  { id: "yukselen", title: "Yükselen Burç Hesaplama", slug: "yukselen-burc", categoryId: "diger", description: "Doğum tarihi ve saatinizi kullanarak astrolojik ana haritanızdaki yükselen burcu bulun." },

  // Dönüştürücüler
  { id: "uzunluk-ceviri", title: "Uzunluk Çevirici", slug: "uzunluk-cevirici", categoryId: "donusturuculer", description: "Metre, kilometre, inç, ayak, mil gibi uzunluk birimlerini anında birbirine çevirin." },
  { id: "agirlik-ceviri", title: "Ağırlık Çevirici", slug: "agirlik-cevirici", categoryId: "donusturuculer", description: "Gram, kilogram, ton, ons (oz) ve libre (lb) birimlerini kolaylıkla hesaplayın." },
  { id: "sicaklik-ceviri", title: "Sıcaklık Çevirici", slug: "sicaklik-cevirici", categoryId: "donusturuculer", description: "Celsius (°C), Fahrenheit (°F) ve Kelvin (K) ısı birimleri dönüştürücüsü." },
  { id: "alan-ceviri", title: "Alan Çevirici", slug: "alan-cevirici", categoryId: "donusturuculer", description: "Metrekare, dönüm, hektar, acre ve daha fazlası arasında anında alan dönüşümü." },
  { id: "hacim-ceviri", title: "Hacim Çevirici", slug: "hacim-cevirici", categoryId: "donusturuculer", description: "Litre, metreküp, galon ve diğer sıvı/katı hacim birimlerini anlık dönüştürün." },
  { id: "litre-cl-ml", title: "Litre, cl, ml Hesaplama", slug: "litre-cl-ml-hesaplama", categoryId: "donusturuculer", description: "Sıvı ölçü birimleri (Litre, Santilitre, Mililitre) arası anlık dönüşüm." },
  { id: "hiz-ceviri", title: "Hız Çevirici", slug: "hiz-cevirici", categoryId: "donusturuculer", description: "Km/h, Mph, Knot, Mach vb. hız ölçüleri arasında bilimsel rotasyonlar yapın." },
  { id: "mutfak-ceviri", title: "Mutfak Birim Dönüştürücü", slug: "mutfak-donusturucu", categoryId: "donusturuculer", description: "Su bardağı, kaşık ve kahve fincanı gibi mutfak ölçülerini anlık gram/ml'ye çevirin." },
  { id: "veri-ceviri", title: "Veri (Disk) Çevirici", slug: "veri-cevirici", categoryId: "donusturuculer", description: "GB, MB, TB, KB gibi bilgisayar depolama (Byte) birimlerinin karşılıklarını edinin." },
  { id: "zaman-ceviri", title: "Zaman Çevirici", slug: "zaman-cevirici", categoryId: "donusturuculer", description: "Saniye, dakika, saat, gün, ay, yıl arasındaki matematiksel zaman dönüşümü." },

  // Sosyal Medya
  { id: "twitter-count", title: "X (Twitter) Karakter Sayacı", slug: "twitter-karakter-sayaci", categoryId: "sosyal", description: "Twitter (X) limitlerine göre link ve görselleri de sayan gelişmiş karakter aracı." },
  { id: "font-gen", title: "Şık Yazı Tipi Oluşturucu", slug: "sik-yazi-tipi-olusturucu", categoryId: "sosyal", description: "Metinlerinizi b𝚘𝚕𝚍, 𝘪𝘵𝘢𝘭𝘪𝘤 veya 𝔊𝔬𝔱𝔦𝔨 gibi 20+ farklı Unicode stiline dönüştürün." },

  // Vergi Hesaplamaları
  { id: "kdv", title: "KDV Hesaplama (2026)", slug: "kdv", categoryId: "vergi", description: "2026 güncel oranları (%1, %10, %20) ile KDV dahil ve hariç tutarları anında hesaplayın." },
  { id: "damga-vergisi", title: "Damga Vergisi Hesaplama (2026)", slug: "damga-vergisi", categoryId: "vergi", description: "2026 yılı sözleşme, kira ve bordro damga vergisi oranlarına göre hesaplama yapın." },
  { id: "gelir-vergisi", title: "Gelir Vergisi Hesaplama (2026)", slug: "gelir-vergisi", categoryId: "vergi", description: "2026 resmi gelir vergisi dilimlerine göre aylık brüt maaştan net maaşa geçin." },

  // Geliştirici, Pratik ve Eğlence Araçları (Mevcut olanları veriye bağlama)
  { id: "password-gen", title: "Gelişmiş Şifre Oluşturucu", slug: "sifre-olusturucu", categoryId: "araclar", description: "Yüksek güvenlikli, rastgele ve kırılmaz şifreler oluşturun." },
  { id: "word-counter", title: "Kelime ve Karakter Sayacı", slug: "kelime-sayaci", categoryId: "araclar", description: "Metinlerinizin kelime, karakter ve okuma süresi gibi istatistiklerini anlık analiz edin." },
  { id: "qr-gen", title: "QR Kod Üreticisi", slug: "qr-kod-olusturucu", categoryId: "araclar", description: "Linklerinizi veya metinlerinizi saniyeler içinde QR koda dönüştürün ve indirin." },
  
  { id: "raffle", title: "Profesyonel Çekiliş Yapıcı", slug: "cekilis-yapici", categoryId: "eglence", description: "İsim listesi üzerinden adil ve görsel olarak şık çekilişler düzenleyin." },
  { id: "rng", title: "Rastgele Sayı Üretici", slug: "rastgele-sayi", categoryId: "eglence", description: "Belirlediğiniz aralıkta tamamen şans eseri rastgele sayılar ve zarlar üretin." },
  
  { id: "json-fmt", title: "JSON Formatlayıcı (Prettier)", slug: "json-formatter", categoryId: "gelistirici", description: "Karmaşık JSON verilerini okunaklı hale getirin, küçültün ve doğrulayın." },
  { id: "hash-gen", title: "Base64 & Hash İşleyici", slug: "hash-generator", categoryId: "gelistirici", description: "Metinlerinizi Base64 formatına çevirin veya şifrelenmiş verileri geri çözün." },
  { id: "color-conv", title: "Renk Dönüştürücü (HEX/RGB)", slug: "renk-donusturucu", categoryId: "gelistirici", description: "Tasarımcılar için HEX, RGB ve CMYK renk kodlarını anlık dönüştürün." },
  { id: "glass-gen", title: "Glassmorphism Generator", slug: "glassmorphism-generator", categoryId: "gelistirici", description: "Modern UI tasarımları için cam efekti (backdrop-filter) kodları üretin." },
  { id: "ai-prompt", title: "AI Prompt Optimizer", slug: "ai-prompt-optimizer", categoryId: "gelistirici", description: "Yapay zeka için ham komutları profesyonel prompt'lara dönüştürün." },
  { id: "jwt-debug", title: "JWT Debugger & Visualizer", slug: "jwt-debugger", categoryId: "gelistirici", description: "JSON Web Token (JWT) dökümlerini anlık olarak çözün ve analiz edin." },
  { id: "cron-visualizer", title: "Cron Expression Visualizer", slug: "cron-visualizer", categoryId: "gelistirici", description: "Karmaşık cron zamanlamalarını insan diline çevirin ve test edin." },

  
  { id: "mod", title: "Mod Alma", slug: "mod-alma", categoryId: "matematik", description: "Bir sayının diğerine bölümünden kalanını bulun." },
  { id: "matris", title: "Matris Hesaplayıcı", slug: "matris-hesaplama", categoryId: "matematik", description: "Matris toplama, çarpma, determinant ve ters matris işlemleri." },
  { id: "denklem", title: "Denklem Çözücü (Adım Adım)", slug: "denklem-cozucu", categoryId: "matematik", description: "2. dereceden denklemleri çözüm yoluyla birlikte analiz edin." },
  { id: "istatistik", title: "İstatistik Pro", slug: "istatistik-hesaplama", categoryId: "matematik", description: "Ortalama, medyan, standart sapma ve varyans dökümünü içeren veri analiz aracı." },
  { id: "perm-komb", title: "Permütasyon ve Kombinasyon", slug: "permutasyon-kombinasyon-hesaplama", categoryId: "matematik", description: "n ve r elemanlı kümeler için sıralama ve seçim olasılıklarını hesaplayın." },

  // Mühendislik & Fizik
  { id: "direnc", title: "Direnç/Renk Kodları", slug: "direnc-hesaplama", categoryId: "muhendislik", description: "Direnç renk bantlarına göre ohm değerini interaktif görselle bulun." },
  { id: "atish", title: "Eğik Atış Simülatörü", slug: "egik-atish", categoryId: "muhendislik", description: "Hız ve açıya göre yörüngeyi interaktif animasyonla (Canvas) canlandırın." },
  { id: "ohm", title: "Ohm Kanunu", slug: "ohm-kanunu", categoryId: "muhendislik", description: "Volt, Amper ve Direnç arasındaki elektriksel ilişkiyi hesaplayın." },
  { id: "btu", title: "Klima BTU Hesaplama", slug: "btu-hesaplama", categoryId: "muhendislik", description: "Oda alanına ve bölge verilerine göre ihtiyacınız olan klima kapasitesini (BTU) belirleyin." },
  { id: "motor-gucu", title: "Motor Gücü ve Tork Hesaplama", slug: "motor-gucu-hesaplama", categoryId: "muhendislik", description: "Elektrik motorları için nominal güç, RPM ve gerilim bazlı tork ve akım analizi." },
  { id: "metal-agirlik", title: "Metal ve Çelik Ağırlık Hesaplama", slug: "metal-agirlik-hesaplama", categoryId: "muhendislik", description: "Plaka, dolu mil ve boru tipi metal malzemelerin boyutlarına göre teorik ağırlığını hesaplayın." },
  { id: "kinetik-enerji", title: "Kinetik ve Potansiyel Enerji", slug: "kinetik-enerji-hesaplama", categoryId: "muhendislik", description: "Kütle, hız ve yükseklik parametrelerine göre mekanik enerji analizini yapın." },
  { id: "sivi-basinci", title: "Sıvı (Hidrostatik) Basıncı", slug: "sivi-basinci-hesaplama", categoryId: "muhendislik", description: "Derinlik ve özkütleye göre sıvı basıncını animasyonlu tank görseliyle hesaplayın." },
  
  // PDF Araçları
  { id: "pdf-merge", title: "PDF Birleştir", slug: "pdf-birlestir", categoryId: "pdf", description: "Birden fazla PDF dosyasını tek tıkla güvenle birleştirin." },
  { id: "pdf-split", title: "PDF Böl / Sayfa Ayıkla", slug: "pdf-bolme", categoryId: "pdf", description: "Büyük PDF dosyalarından belirli sayfaları ayıklayın veya dökümanı bölün." },
  { id: "pdf-to-img", title: "PDF'den Görsele", slug: "pdf-to-image", categoryId: "pdf", description: "PDF sayfalarını yüksek çözünürlüklü JPEG veya PNG görsellerine dönüştürün." },
  { id: "img-to-pdf", title: "Görselden PDF'e", slug: "image-to-pdf", categoryId: "pdf", description: "Fotoğraflarınızı ve görsellerinizi tek bir PDF dökümanı haline getirin." },
  { id: "pdf-compress", title: "PDF Sıkıştır", slug: "pdf-sikistir", categoryId: "pdf", description: "PDF dökümanlarınızın dosya boyutunu kaliteden aşırı ödün vermeden optimize edin." },
  { id: "retirement-age", title: "Ne Zaman Emekli Olurum?", slug: "ne-zaman-emekli-olurum", categoryId: "muhasebe", description: "SGK ve EYT uyumlu emeklilik robotu ile emeklilik tarihinizi hemen hesaplayın." },
  { id: "investment-simulator", title: "Yatırım Simülatörü", slug: "yatirim-simulatoru", categoryId: "finans", description: "Bileşik faiz ve aylık tasarruflarınızın uzun vadedeki büyümesini görselleştirin." },
  { id: "carbon-footprint", title: "Karbon Ayak İzi", slug: "karbon-ayak-izi", categoryId: "pratik-araclar", description: "Ekolojik etki analizi ile yıllık karbon salınımınızı ve dikmeniz gereken ağaç sayısını öğrenin." },

  // Oyunlar
  { id: "game-2048", title: "2048 Oyunu", slug: "2048", categoryId: "oyun", description: "Klasik 2048 zeka oyunu. Sayıları birleştirin, 2048'e ulaşın!" },
  { id: "game-sudoku", title: "Sudoku Premium", slug: "sudoku", categoryId: "oyun", description: "Zekanızı test edin. Tamamen tarayıcı üzerinde üretilen benzersiz bulmacalar!" }
];

export function getCalculatorsByCategory(categoryId: string) {
  return calculators.filter(c => c.categoryId === categoryId);
}

export function getCategoryBySlug(slug: string) {
  return categories.find(c => c.slug === slug);
}

export function getCalculatorBySlug(slug: string) {
  return calculators.find(c => c.slug === slug);
}
