export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
};

export type CalculatorInfo = {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  description: string;
  // Buralara form config veya endpoint tipi gelecek
};

export const categories: Category[] = [
  { id: "kredi", name: "Kredi", slug: "kredi", description: "İhtiyaç, konut, taşıt ve ticari kredi hesaplamaları.", icon: "Bank" },
  { id: "finans", name: "Finans", slug: "finans", description: "Faiz, döviz, enflasyon ve yatırım getirisi hesaplamaları.", icon: "TrendingUp" },
  { id: "saglik", name: "Sağlık", slug: "saglik", description: "Vücut kitle endeksi, gebelik, kalori ve yaş hesaplamaları.", icon: "Heart" },
  { id: "egitim", name: "Eğitim", slug: "egitim", description: "Ders notu, ortalama ve okul başlangıç yaşı vb. okul hesaplamaları.", icon: "BookOpen" },
  { id: "matematik", name: "Matematik", slug: "matematik", description: "Alan, hacim, yüzdelik oran ve denklem çözümleri.", icon: "Calculator" },
  { id: "sure", name: "Zaman", slug: "zaman", description: "Tarihler arası gün, hafta, saat, namaz saatleri ve yaş.", icon: "Clock" },
  { id: "muhasebe", name: "Muhasebe", slug: "muhasebe", description: "Maaş, tazminat, mesai ve asgari geçim hesaplamaları.", icon: "Briefcase" },
  { id: "vergi", name: "Vergi", slug: "vergi", description: "KDV, damga vergisi, emlak, gelir ve ÖTV hesaplamaları.", icon: "Percent" },
  { id: "sinav", name: "Sınav Hesaplamaları", slug: "sinav", description: "ÖSYM, MEB, AGS, YKS, Hâkimlik ve diğer giriş sınavı puan hesaplamaları.", icon: "GraduationCap" },
  { id: "ticari", name: "Ticari", slug: "ticari", description: "Kar marjı, fiyat belirleme, KDV dahil/hariç ticari ölçümler.", icon: "ShoppingCart" },
  { id: "diger", name: "Diğer", slug: "diger", description: "Kuşak hesaplama, burç hesabı ve diğer spesifik araçlar.", icon: "MoreHorizontal" }
];

export const calculators: CalculatorInfo[] = [
  // Sağlık Kats.
  { id: "bmi", title: "Vücut Kitle Endeksi", slug: "vucut-kitle-endeksi", categoryId: "saglik", description: "Boyunuza ve kilonuza göre sağlıklı aralıkta olup olmadığınızı öğrenin." },
  { id: "gebelik", title: "Gebelik Hesaplama", slug: "gebelik", categoryId: "saglik", description: "Doğum tarihi ve gebelik haftanızı ortalama değerlere göre hesaplayın." },
  { id: "kalori", title: "Günlük Kalori İhtiyacı", slug: "gunluk-kalori-ihtiyaci", categoryId: "saglik", description: "Boy, kilo ve hareket durumunuza göre almanız gereken kalori." },
  
  // Finans ve Kredi
  { id: "kredi", title: "Kredi Hesaplama", slug: "kredi-hesaplama", categoryId: "kredi", description: "Aylık taksit tutarlarınızı, anapara ve faiz oranınıza göre detaylı hesaplayın." },
  { id: "kredikarti", title: "Kredi Kartı Asgari Ödeme", slug: "kredi-karti-asgari", categoryId: "kredi", description: "Mevcut borcunuza göre ödemeniz gereken minimum asgari tutar." },
  { id: "faiz", title: "Faiz Getirisi", slug: "faiz", categoryId: "finans", description: "Vadeli mevduat hesaplamaları ve net/brüt getiri hesabı." },
  { id: "enflasyon", title: "Enflasyon Hesaplama", slug: "enflasyon", categoryId: "finans", description: "Paranın geçmiş ve gelecek yıllara göre alım gücündeki değişimler." },
  { id: "eurobond", title: "Eurobond Hesaplama", slug: "eurobond", categoryId: "finans", description: "Eurobond yatırımınızın getirisini ve pazar fiyatlamasını hesaplayın." },
  { id: "npv", title: "Net Bugünkü Değer Hesaplama", slug: "net-bugunku-deger", categoryId: "finans", description: "Bir nakit akışını paranın maliyeti ile indirgeyerek bugünkü değerini hesaplayın." },
  { id: "altin", title: "Altın Hesaplama", slug: "altin", categoryId: "finans", description: "Gram, çeyrek, yarım ve tam altın gibi türlerin güncel kur bazlı hesaplaması." },
  { id: "doviz", title: "Döviz Hesaplama", slug: "doviz", categoryId: "finans", description: "Dolar, Euro, Sterlin gibi majör para birimleri arası kur çevirici." },
  { id: "cagr", title: "Bileşik Büyüme (CAGR) Hesaplama", slug: "bilesik-buyume", categoryId: "finans", description: "Bir yatırımın belirli yıllar arasındaki yıllık bileşik büyüme oranını hesaplar." },
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

  // Muhasebe ve Ticari
  { id: "netbrut", title: "Netten Brüte Maaş", slug: "netten-brute", categoryId: "muhasebe", description: "Ele geçen net paradan vergi kesintileri dahil brüt maaş hesaplama." },
  { id: "tazminat", title: "Kıdem Tazminatı", slug: "kidem-tazminati", categoryId: "muhasebe", description: "Çalışma sürenize ve brüt maaşınıza göre alacağınız tazminat tutarı." },
  { id: "arac-gider", title: "Binek Araç Gider Kısıtlaması", slug: "binek-arac-gider", categoryId: "muhasebe", description: "Kanunen kabul edilen (KKEG) ve edilmeyen ticari binek araç giderlerini belirleyin." },
  { id: "fiyat-hesap", title: "Fiyat Hesaplama", slug: "fiyat", categoryId: "ticari", description: "Ürün ve hizmetlerin birim maliyeti ve hedeflenen kar marjı ile satış fiyatını bulun." },

  // Sınavlar
  { id: "ags", title: "AGS Puan Hesaplama", slug: "ags-puan", categoryId: "sinav", description: "Akademi Giriş Sınavı netlerinizi ve tahmini puanınızı hesaplayın." },
  { id: "hsy", title: "Hâkim ve Savcı Yardımcılığı Puanı", slug: "hakim-savci-puan", categoryId: "sinav", description: "Genel Kültür ve Alan Bilgisi netlerinize göre tahmini sınav puanınız." },

  // Eğitim
  { id: "lgs", title: "LGS Puan Hesaplama", slug: "lgs-puan", categoryId: "egitim", description: "Liselere Geçiş Sistemi deneme ve sınav netinize göre puanınızı hesaplayın." },
  { id: "yks", title: "YKS Puan Hesaplama", slug: "yks-puan", categoryId: "egitim", description: "TYT, AYT ve YDT netlerinizi girerek üniversite sınav puanınızı tahmini çıkarın." },
  { id: "grade", title: "Ders Notu Ortalaması", slug: "not-ortalamasi", categoryId: "egitim", description: "Ders notlarınızı ve kredilerini (veya ders saati) girerek ağırlıklı not ortalamanızı hesaplayın." },
  // Eğitim - Okul / Karne Paketi
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
  { id: "kusak", title: "Kuşak Hesaplama", slug: "kusak", categoryId: "diger", description: "Doğum yılınıza göre hangi jenerasyona (kuşağa) ait olduğunuzu bulun." },

  // Vergi Hesaplamaları
  { id: "kdv", title: "KDV Hesaplama", slug: "kdv", categoryId: "vergi", description: "KDV dahil ve hariç tutarları %1, %10, %20 oranlarında anında hesaplayın." },
  { id: "damga-vergisi", title: "Damga Vergisi Hesaplama", slug: "damga-vergisi", categoryId: "vergi", description: "Sözleşme, kira, bordro ve banka evraklarının damga vergisini hesaplayın." },
  { id: "gelir-vergisi", title: "Gelir Vergisi Hesaplama", slug: "gelir-vergisi", categoryId: "vergi", description: "2025 gelir vergisi dilimlerine göre aylık brüt maaştan net maaşa geçin." }
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
