export type GuideSection = {
  what: string;
  how: string;
  why: string;
  faq: { q: string; a: string }[];
};

export type CalculatorGuideMap = Record<string, GuideSection>;

export const calculatorGuides: CalculatorGuideMap = {

  "vucut-kitle-endeksi": {
    what: `Vücut Kitle Endeksi (BMI), bir kişinin kilo ve boy ilişkisini sayısal bir değere dönüştüren, dünyada en yaygın kullanılan sağlık tarama göstergelerinden biridir. Dünya Sağlık Örgütü (WHO) tarafından standart olarak kabul edilen bu değer; 18,5 ile 24,9 arasında olduğunda sağlıklı kiloyu, 25 ve üzerinde fazla kiloyu, 30 ve üzerinde obeziteyi gösterir. BMI, tek başına bir tanı aracı değil; sağlık riskini değerlendirmek için kullanılan pratik bir ön gösterge niteliği taşır.`,
    how: `BMI hesaplamak için tek bir formül kullanılır: kilogram cinsinden ağırlık, metre cinsinden boyun karesiyle bölünür. Örneğin 70 kg ve 1,75 m boyunda biri için hesaplama şöyledir: 70 ÷ (1,75 × 1,75) = 22,9. Bu değer 18,5–24,9 aralığına düştüğü için kişi "normal kilolu" olarak sınıflandırılır. Aracımız bu hesaplamayı anlık olarak yapar, sonucu kategorize eder ve sizi ilgili sağlık aralıkları hakkında bilgilendirir.`,
    why: `BMI değerini bilmek, sizi beklenmedik sağlık risklerine karşı önceden uyarabilir. Yüksek BMI; tip 2 diyabet, hipertansiyon, kalp-damar hastalıkları ve eklem sorunlarıyla güçlü bir korelasyon gösterir. Düşük BMI ise yetersiz beslenme ve kemik erimesi gibi risklere işaret eder. Düzenli takip, kilo yönetimi sürecinizi nesnel verilere dayandırmanızı sağlar.`,
    faq: [
      {
        q: "BMI hesaplaması kası dikkate alıyor mu?",
        a: "Hayır. BMI yalnızca kilo ve boyu kullanır. Bu nedenle yüksek kas kütlesine sahip sporcular aynı formülle fazla kilolu görünebilir. Daha doğru bir vücut kompozisyonu analizi için vücut yağ oranı ölçümü tercih edilmelidir.",
      },
      {
        q: "Çocuklar için BMI hesaplaması farklı mıdır?",
        a: "Evet. 2–19 yaş arası çocuklar için yaşa ve cinsiyete özel persentil tabloları (büyüme eğrileri) kullanılır. Yetişkinlere yönelik sabit sınırlar çocuklara uygulanamaz.",
      },
      {
        q: "Sağlıklı bir BMI aralığına gelmek için ne kadar kilo vermem gerekiyor?",
        a: "Aracımız hesaplama sonucunda, sağlıklı kilo aralığına girebilmek için boyunuza göre hedef kilo aralığını da gösterir. Bu bilgiyi sağlık uzmanınızla paylaşarak kişiselleştirilmiş bir plan oluşturabilirsiniz.",
      },
    ],
  },

  "ideal-kilo": {
    what: `İdeal kilo, belirli bir boya sahip yetişkinin sağlıklı sayılabilmesi için bulunması gereken ağırlık aralığını ifade eder. Tıbbi literatürde Lorentz, Devine ve Robinson gibi farklı formüller bulunmakla birlikte, günümüzde en çok başvurulan standart WHO'nun BMI'ya dayalı yaklaşımıdır. Bu yaklaşıma göre 18,5–24,9 BMI aralığına karşılık gelen kilo değerleri, ideal kilo aralığı olarak kabul edilir.`,
    how: `Aracımız, girdiğiniz boy bilgisini ve cinsiyetinizi kullanarak hem alt hem de üst ideal kilo sınırlarını hesaplar. Hesaplama; boyun karesiyle sağlıklı BMI aralığının (18,5 ve 24,9) çarpılması esasına dayanır. Örneğin 1,70 m boyunda bir kişi için alt sınır: 1,70² × 18,5 ≈ 53,5 kg; üst sınır: 1,70² × 24,9 ≈ 71,9 kg olarak bulunur.`,
    why: `İdeal kilonuzu bilmek; diyet planlaması, egzersiz hedefi belirleme ve sağlık takibi açısından somut bir referans noktası sunar. Yalnızca "kilo vermek istiyorum" demek yerine, tıbbi standartlara dayalı net bir hedef belirlemek motivasyonu artırır ve sağlıklı olmayan düzeyde zayıflamayı önler.`,
    faq: [
      {
        q: "İdeal kilo herkes için aynı mı?",
        a: "Hayır. Boy, cinsiyet ve yaş ideal kiloyu etkiler. Aynı boyda olsa bile geniş kemik yapısına sahip kişilerin sağlıklı kilo aralığının üst sınırına yakın olması oldukça normaldir.",
      },
      {
        q: "İdeal kiloma ulaşmak için günde kaç kalori tüketmeliyim?",
        a: "Bu, bazal metabolizma hızınıza (BMR) ve fiziksel aktivite düzeyinize bağlıdır. Kalori ihtiyacı hesaplama aracımızı kullanarak kişiselleştirilmiş bir değer elde edebilirsiniz.",
      },
      {
        q: "Kas yaparken ideal kilo aralığımın dışına çıkabilir miyim?",
        a: "Evet. Yüksek kas kitlesi, BMI'ya dayalı hesaplamalarda sizi matematiksel olarak fazla kilolu kategorisine sokabilir. Ancak vücut yağ oranınız sağlıklı aralıkta ise bu durum sorun teşkil etmez.",
      },
    ],
  },

  "kredi-hesaplama": {
    what: `Kredi hesaplama; belirli bir anapara tutarı, faiz oranı ve vade kombinasyonundan doğan aylık ödeme miktarını ve toplam geri ödeme tutarını önceden hesaplama işlemidir. Bu bilgi, ihtiyaç, konut veya taşıt kredisi almayı düşünen tüm bireylerin bankaya gitmeden önce sahip olması gereken temel finansal rehberdir.`,
    how: `Aylık taksit tutarı, "eşit taksit" yöntemi (Fransız amortismanı) ile hesaplanır. Formül: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ - 1]. Burada P anapara, r aylık faiz oranı, n vade sayısıdır. Aracımıza anaparanızı, yıllık faiz oranını ve vadeyi girmeniz yeterlidir; tüm hesaplama anında yapılır ve aylık dökümü içeren amortizasyon tablosu gösterilir.`,
    why: `Kredi maliyetini önceden bilmek; farklı bankaların tekliflerini karşılaştırmanıza, bütçenize uygun vade seçmenize ve toplam faiz yükünü minimize etmenize olanak tanır. Aylık taksit tutarı net gelirinizin %40'ını aşmaması, sağlıklı bir borç yönetiminin temel kuralıdır.`,
    faq: [
      {
        q: "Yıllık faiz oranı ile aylık faiz oranı arasındaki fark nedir?",
        a: "Bankalar faizi genellikle aylık olarak açıklar. Aylık oranı 12 ile çarparak yıllık nominal orana ulaşabilirsiniz. Ancak bileşik faiz etkisiyle gerçek yıllık maliyet (APR) biraz daha yüksek olur.",
      },
      {
        q: "KKDF ve BSMV nedir ve maliyeti nasıl etkiler?",
        a: "KKDF ve BSMV, kredi faizi üzerine eklenen yasal vergi ve fondur. Güncel oranlara göre toplam vade maliyetini %15 oranında artırabilir.",
      },
      {
        q: "Erken ödeme yaparsam ne kadar tasarruf ederim?",
        a: "Erken ödeme, kalan anapara üzerindeki gelecek faiz yükünü ortadan kaldırır. Ancak bankalar yasal limite kadar (anapara üzerinde %2) erken kapatma cezası uygulayabilir.",
      },
    ],
  },

  "kdv": {
    what: `Katma Değer Vergisi (KDV), Türkiye'de mal ve hizmet teslimleri üzerinden alınan dolaylı bir tüketim vergisidir. 2026 yılı itibarıyla üç temel oran uygulanmaktadır: gıda ve temel ihtiyaçlar için %1, çeşitli hizmetler için %10 ve genel mal ve hizmetler için %20. KDV hesaplama, hem fatura kesen satıcıların hem de maliyet analizi yapan alıcıların en sık ihtiyaç duyduğu işlemlerden biridir.`,
    how: `KDV dahil fiyat hesaplamak için net tutara oranın eklenmesi yeterlidir: Brüt Tutar = Net Tutar × (1 + KDV Oranı). Tersi yönde, KDV dahil fiyattan net tutara ulaşmak için: Net Tutar = Brüt Tutar ÷ (1 + KDV Oranı). Aracımız her iki yönü de destekler; oran, dahil/hariç seçimi ve tevkifat oranını girerek saniyeler içinde doğru sonuca ulaşabilirsiniz.`,
    why: `Yanlış KDV hesaplaması; e-ticaret satıcıları için cezaya, muhasebe kayıtlarında hatalara ve kar marjı analizlerinde sapmalara yol açar. Faturanızın yasal otoriteler tarafından kabul görmesi için KDV tutarının tam ve doğru hesaplanması zorunludur.`,
    faq: [
      {
        q: "Tevkifatlı KDV nedir?",
        a: "Bazı hizmetlerde (örneğin taşımacılık, yapı işleri) KDV'nin bir kısmı hizmet alan tarafından beyan edilir. Bu orana 'tevkifat' denir. Aracımız tevkifat oranını ayrı bir giriş alanı olarak destekler.",
      },
      {
        q: "KDV iadesi nasıl alınır?",
        a: "KDV mükellefleri, ödedikleri KDV'yi indirim konusu yapabilir ve devreden KDV iade alabilirler. Beyannameye dahil etmeniz gereken tutarı hesaplamak için indirilen ve hesaplanan KDV farkını bulmanız yeterlidir.",
      },
      {
        q: "%10 KDV'ye tabi olan ürünler nelerdir?",
        a: "Restoran hizmetleri, konut kira geliri, bazı tekstil ürünleri ve belirli sağlık hizmetleri %10 KDV'ye tabidir. Spesifik ürün ve hizmetler için Gelir İdaresi Başkanlığı'nın güncel tebliğlerini incelemenizi öneririz.",
      },
    ],
  },

  "gelir-vergisi": {
    what: `Gelir vergisi; bireylerin elde ettikleri ücret, kira, faiz ve ticari kazanç gibi gelirler üzerinden devlete ödedikleri doğrudan bir vergidir. Türkiye'de ücret gelirleri için kümülatif dilim sistemi uygulanır. Çalışanlar bu vergiyi işverenler aracılığıyla "stopaj" yöntemiyle öder.`,
    how: `Vergi hesaplaması, brüt maaştan SGK ve işsizlik sigortası primlerinin düşülmesiyle bulunan matrah üzerinden gerçekleştirilir. Yıllık kümülatif matrah hangi dilime düşüyorsa o dilimin oranı uygulanır (%15, %20, %27, %35, %40). Aracımız vergi dilimlerini otomatik olarak uygular ve net ele geçen tutarı gösterir.`,
    why: `Gelir vergisi hesabını anlamak; maaş pazarlığı sürecinde net ve brüt kavramları arasındaki farkı kavramanızı sağlar. Doğru hesaplama yapamamış çalışanlar, yıl sonunda vergi farkı ödemekle yüz yüze gelebilir.`,
    faq: [
      {
        q: "Brüt ve net maaş arasındaki fark neden bu kadar fazla?",
        a: "Brüt maaştan SGK işçi payı (%14), işsizlik sigortası (%1) ve kümülatif gelir vergisi düşülünce net maaşa ulaşılır. Yüksek maaş dilimlerinde bu kesintiler brüt'ün %35'ini aşabilir.",
      },
      {
        q: "Yıl içinde iki işyerinde çalışırsam ne olur?",
        a: "Vergi dilimi yıllık kümülatif matrah üzerinden hesaplanır. Farklı işverenler altında çalışıldığında matrahlar birleştirilmez; yıl sonu beyannamesi verilmesi gerekebilir.",
      },
      {
        q: "İşveren prim yükü nedir?",
        a: "İşveren, çalışan adına ek olarak SGK payı (%20,5) ve işsizlik sigortası (%2) öder. Bu nedenle bir çalışanın işverene maliyeti, brüt maaşın yaklaşık %22,5 üzerindedir.",
      },
    ],
  },

  "yks-puan": {
    what: `Yükseköğretim Kurumları Sınavı (YKS), Türkiye'de üniversiteye yerleşme sürecini belirleyen iki aşamalı merkezi sınavdır. Birinci aşamada Temel Yeterlilik Testi (TYT), ikinci aşamada ise Alan Yeterlilik Testleri (AYT / YDT) uygulanır. Her puan türü farklı ağırlıklandırma formülüyle hesaplanır.`,
    how: `TYT ham puanı, doğru sayısından yanlış sayısının dörtte birinin çıkarılmasıyla elde edilir. AYT'de ise her alan ayrı ham puana çevrilir, ardından ÖSYM'nin katsayı tablosu uygulanarak ağırlıklı puana ulaşılır. Son adımda ortaöğretim başarı puanı (OBP) eklenerek yerleştirme puanı oluşur.`,
    why: `Sınav öncesi puan simülasyonu yapmak; çalışma stratejisini netleştirmek, hangi derslere öncelik verilmesi gerektiğini anlamak ve gerçekçi tercih listeleri oluşturmak açısından kritik önem taşır.`,
    faq: [
      {
        q: "TYT barajını geçememek ne anlama gelir?",
        a: "TYT'den 150 puanın altında kalan adaylar AYT'ye girse dahi üniversiteye yerleştirme kapsamı dışında kalır. TYT barajı tüm puan türleri için zorunlu ön koşuldur.",
      },
      {
        q: "OBP ne kadar etkilidir?",
        a: "Ortaöğretim Başarı Puanı (OBP), yerleştirme puanına katkı sağlar. Yakın puanlar arasındaki farkı kapatan önemli bir etken olabilir.",
      },
      {
        q: "Hesaplama yaparken yanlış net sayımı nasıl doğrularım?",
        a: "Cevap anahtarını ÖSYM'nin resmi sitesinden indirerek kontrol edebilirsiniz. Aracımız girdiğiniz doğru ve yanlış sayıyı kullanarak puanı hesaplar.",
      },
    ],
  },

  "lgs-puan": {
    what: `Liselere Geçiş Sistemi (LGS), sekizinci sınıf öğrencilerinin liseye yerleşme sürecini belirleyen merkezi sınavdır. Sınav; Türkçe, Matematik, Fen Bilimleri, İnkılap Tarihi, Din Kültürü ve yabancı dil alanlarını kapsar.`,
    how: `LGS'de her doğru yanıt 1 puan değerindedir; yanlış yanıtlar negatif etki yaratmaz. Ham puan, MEB'in dönüşüm tablosuna göre 100–500 arasındaki standart puan skalasına çevrilir. Matematik ve Türkçe diğer derslere oranla daha ağırlıklıdır.`,
    why: `LGS puanını önceden simüle etmek, hangi liselere başvurulabileceğini anlamak ve çalışma takvimini buna göre düzenlemek açısından öğrenciler ve veliler için pratik bir rehber niteliği taşır.`,
    faq: [
      {
        q: "LGS'de yanlış cevaplar puanı düşürür mü?",
        a: "Hayır. LGS'de yanlış cevaplar için negatif puan uygulaması yoktur. Boş bırakmak ile yanlış yanıtlamak arasında puan farkı yoktur.",
      },
      {
        q: "500 puan almak için kaç net yapmam lazım?",
        a: "Tam puana genellikle tüm sorularda doğru yanıt gerekmektedir. Her yıl sınav güçlüğüne göre değişkenlik gösterebilir.",
      },
      {
        q: "Tercihte yüzdelik dilim mi puan mı dikkate alınır?",
        a: "Anadolu ve fen lisesi yerleştirmelerinde ham puan değil standart skor (100–500) ve okul kontenjanı birlikte değerlendirilir.",
      },
    ],
  },

  "kpss-puan": {
    what: `Kamu Personeli Seçme Sınavı (KPSS), Türkiye'de devlet memurluğuna atanmak isteyen adayların katıldığı merkezi bir yeterlilik sınavıdır. Lisans, önlisans ve ortaöğretim düzeyinde ayrı sınavlar düzenlenir. Puan türleri (P3, P93, P94, P10) atanmak istenen kurum ve pozisyona göre farklılık gösterir.`,
    how: `Her puan türü; Genel Yetenek (GY) ve Genel Kültür (GK) netlerinin belirli ağırlıklarla toplanması ve Eğitim Bilimleri (EB) netinin eklenmesiyle oluşur. Net sayısı, doğru sayısından yanlış sayısının dörtte birinin çıkarılmasıyla bulunur.`,
    why: `KPSS puanını önceden bilmek; hangi kadrolara başvurulabileceğini, atanmak için kaç net yapılması gerektiğini ve hangi konu gruplarına öncelik verilmesi gerektiğini netleştirir.`,
    faq: [
      {
        q: "P3 ile P93 arasındaki fark nedir?",
        a: "P3 lisans düzeyindeki KPSS için kullanılan genel puan türüdür. P93 ve P94 ise özellikle öğretmen atamaları için kullanılan, eğitim bilgisi ağırlıklı puan türleridir.",
      },
      {
        q: "KPSS sınavına kaç yılda bir girilir?",
        a: "ÖSYM lisans KPSS sınavını genellikle yılda bir kez yapar. Güncel takvim için ÖSYM resmi sitesini takip etmeniz önerilir.",
      },
      {
        q: "Sözlü mülakat olmadan atanabilir miyim?",
        a: "Bir kısım kadro doğrudan KPSS puanıyla (sözlüsüz) atama yaparken diğer kadrolar mülakat aşaması öngörür. İlgili kurumun duyurusunu dikkatlice incelemeniz gerekir.",
      },
    ],
  },

  "enflasyon": {
    what: `Enflasyon, bir ekonomideki genel fiyat seviyesinin zaman içinde artış oranını ifade eder. Türkiye'de bu oran, TÜİK tarafından aylık yayımlanan Tüketici Fiyat Endeksi (TÜFE) verileriyle ölçülür. Enflasyon hesaplama araçları; paranın satın alma gücünün geçmişe veya geleceğe göre nasıl değiştiğini sayısal olarak gösterir.`,
    how: `Temel formül: Geleceğin Değeri = Bugünkü Değer × [(1 + Enflasyon Oranı)ⁿ]. Geçmiş satın alma gücünü bulmak için ise: Geçmişin Değeri = Bugünkü Değer ÷ Bileşik Enflasyon Katsayısı. Araç, girdiğiniz tutar ve yıl aralığına göre bu hesabı otomatik yapar.`,
    why: `Enflasyonun etkisini somutlaştırmak; birikim ve yatırım kararlarında daha bilinçli olmayı sağlar. Yastık altında tutulan para, negatif reel getiri nedeniyle her yıl değer yitirir. Bu araç, o değer kaybını sayılarla görünür kılar.`,
    faq: [
      {
        q: "TÜFE ve ÜFE arasındaki fark nedir?",
        a: "TÜFE hane halkının tükettiği ürün ve hizmetlerin fiyat artışını ölçerken, ÜFE fabrika çıkış fiyatlarındaki değişimi yansıtır.",
      },
      {
        q: "Enflasyon oranı açıklanandan farklı hissettiriyorsa bu normal mi?",
        a: "Evet. Resmi enflasyon geniş bir tüketici sepeti ortalamasıdır. Kira, gıda ve eğitim gibi belirli harcama kalemlerindeki artış, genel ortalamadan farklı olabilir.",
      },
      {
        q: "Paramın reel değerini nasıl koruyabilirim?",
        a: "Enflasyonu aşan bir getiri sağlamak için altın, döviz veya enflasyona endeksli mevduat gibi araçlara yönelmek gerekir. Reel getiri hesaplama aracımızla yatırımınızın enflasyondan arındırılmış getirisini görebilirsiniz.",
      },
    ],
  },

  "kidem-tazminati": {
    what: `Kıdem tazminatı; işyerinde en az bir yıl çalışmış bir çalışanın iş sözleşmesinin belirli koşullar altında sona ermesi durumunda işverence ödenmesi gereken yasal bir haktır. Her tam çalışma yılı için bir aylık brüt maaşa eşdeğer tazminat ödenir ve bu tazminata yasal bir tavan uygulanır.`,
    how: `Hesaplama şu formülle yapılır: Kıdem Tazminatı = (Brüt Maaş × Tam Çalışma Yılı). Brüt maaş kapsamına yalnızca temel ücret değil, düzenli olarak ödenen yemek, yol ve diğer yan ödemeler de dahil edilir.`,
    why: `Kıdem tazminatı hakkını bilen çalışanlar; işten çıkarılma, istifa veya emeklilik süreçlerinde alacaklarını önceden hesaplayabilir ve işverenle bilinçli müzakere edebilir.`,
    faq: [
      {
        q: "İstifa edersem kıdem tazminatı alabilir miyim?",
        a: "Genel kural olarak istifa eden çalışan kıdem tazminatı alamaz. Ancak askerlik, evlilik (kadın işçiler için) ve emeklilik hakkı kazanma gibi özel durumlarda istifada da tazminat hakkı doğabilir.",
      },
      {
        q: "Part-time çalışanlar için kıdem tazminatı nasıl hesaplanır?",
        a: "Part-time çalışanlarda tazminat, çalışılan süreyle orantılı olarak hesaplanır. Tam zamanlı muadilinin kazanacağı tazminata, çalışılan saat oranı uygulanır.",
      },
      {
        q: "İşverenin kıdem tazminatını ödememesi durumunda ne yapmalıyım?",
        a: "İşverenin haksız şekilde ödeme yapmadığı durumlarda öncelikle Arabuluculuk yoluna başvurulmalıdır. Uzlaşma sağlanamaması halinde İş Mahkemesi'nde dava açılabilir.",
      },
    ],
  },

  "gunluk-kalori-ihtiyaci": {
    what: `Günlük kalori ihtiyacı; bir kişinin ağırlığını koruyabilmesi için 24 saatte alması gereken toplam enerji miktarını ifade eder. Bu değer, yaş, cinsiyet, boy, kilo ve fiziksel aktivite düzeyine göre kişiden kişiye önemli ölçüde farklılık gösterir.`,
    how: `Hesaplama iki aşamadan oluşur. İlk aşamada bazal metabolizma hızı (BMR) Mifflin-St Jeor formülüyle bulunur. İkinci aşamada BMR, aktivite katsayısıyla çarpılarak Toplam Günlük Enerji Harcaması (TDEE) elde edilir. Örneğin orta aktif bir bireyin TDEE'si BMR × 1,55 olarak hesaplanır.`,
    why: `Kalori ihtiyacını bilmeden yapılan diyetler ya çok kısıtlayıcı olup kas kaybına yol açar ya da yetersiz kalori açığı nedeniyle hiç etki göstermez. Bilimsel temele dayanan kişiselleştirilmiş bir kalori hedefi, sürdürülebilir ve sağlıklı kilo yönetiminin temelidir.`,
    faq: [
      {
        q: "Yavaş metabolizma diye bir şey gerçekten var mı?",
        a: "Evet, metabolizma hızı bireyler arasında farklılık gösterir. Yaş ilerledikçe ve kas kütlesi azaldıkça kalori ihtiyacı düşer.",
      },
      {
        q: "1 kg yağ kaç kaloriye eşittir?",
        a: "Yaklaşık 7.700 kalori. Bu da haftada 500 kalorilik açık oluşturarak teorik olarak haftada yarım kilogram kilo verileceği anlamına gelir.",
      },
      {
        q: "Egzersiz yaparsam ne kadar daha yiyebilirim?",
        a: "Yanıt yaptığınız egzersizin türüne ve yoğunluğuna göre değişir. Orta tempolu 45 dakikalık yürüyüş yaklaşık 200–300 kalori yakar.",
      },
    ],
  },

  "netten-brute": {
    what: `Netten brüte maaş hesaplama; "ele geçen" olarak bilinen net maaş tutarından başlayarak, üzerindeki yasal kesintiler geri eklenerek brüt maaşa ulaşma işlemidir. Bu hesaplama; iş tekliflerini değerlendirirken, sözleşme görüşmelerinde ve bordro kontrolünde kritik bir araçtır.`,
    how: `Brüt maaştan sırasıyla; SGK işçi payı (%14), işsizlik sigortası işçi payı (%1) ve kümülatif gelir vergisi dilimi düşülerek net maaşa ulaşılır. Tersine işlem için bu kesintileri sırayla geri eklemek gerekir. Aracımız yıllık kümülatif matrahı da dikkate alır.`,
    why: `"Maaşınız 30.000 TL brüt" dendiğinde sevinmeden önce net tutarı hesaplamak şarttır. Gelir vergisi diliminin yüksek olduğu senaryolarda brüt ile net arasındaki fark %35'i aşabilir.`,
    faq: [
      {
        q: "Maaş bordromda 'vergi matrahı' ne anlama gelir?",
        a: "Vergi matrahı, SGK ve işsizlik sigortası kesintileri düşüldükten sonra kalan ve üzerine gelir vergisi uygulanan tutardır.",
      },
      {
        q: "İşverenin prim yükü toplamda ne kadar?",
        a: "İşveren, çalışan adına ek olarak SGK payı (%20,5) ve işsizlik sigortası (%2) öder. Brüt 30.000 TL maaşlı bir çalışanın işverene toplam maliyeti yaklaşık 36.750 TL'dir.",
      },
      {
        q: "AGİ kaldırıldı mı?",
        a: "Asgari Geçim İndirimi (AGİ) sistemi 2022 itibarıyla kaldırılmış ve asgari ücretin vergi dışında tutulması uygulamasına geçilmiştir.",
      },
    ],
  },

  "yuzde": {
    what: `Yüzde hesaplama; bir sayının belli bir oranını bulmak, iki değer arasındaki oransal farkı tespit etmek ya da bir toplamın içindeki payı hesaplamak için kullanılan temel matematiksel işlemdir.`,
    how: `Üç temel yüzde işlemi vardır: (1) Bir sayının %X'ini bulmak: Sayı × (X ÷ 100). (2) Bir sayının diğerinin yüzde kaçı olduğunu bulmak: (A ÷ B) × 100. (3) Yüzde değişimini bulmak: [(Yeni - Eski) ÷ |Eski|] × 100.`,
    why: `Günlük alışverişten kurumsal raporlamaya kadar pek çok alanda yüzde hesabını hızlı ve doğru yapabilmek; zaman tasarrufu sağlar ve hesap hatalarını önler.`,
    faq: [
      {
        q: "İndirimli fiyatı nasıl hesaplarım?",
        a: "Orijinal fiyatı (1 - indirim oranı / 100) ile çarpın. Örnek: 500 TL ürün, %20 indirimle → 500 × 0,80 = 400 TL.",
      },
      {
        q: "KDV dahil fiyattan KDV'yi nasıl ayırırım?",
        a: "Net tutar = Brüt tutar ÷ (1 + KDV oranı). %20 KDV için: Net = Brüt ÷ 1,20.",
      },
      {
        q: "Yüzde artış ve yüzde puan farkı aynı şey mi?",
        a: "Hayır. %50'den %55'e çıkmak hem +5 puan hem de +%10 değişim anlamına gelir. Finansal analizde bu iki ifade birbirinden farklı kavramlardır.",
      },
    ],
  },

  "birikim": {
    what: `Birikim hesaplama, belirli bir başlangıç sermayesiyle ve gösterilen periyodik katkılarla, belirli bir faiz oranı altında gelecekte oluşacak toplam tutarın öngörülmesi işlemidir. Vadeli mevduat, bireysel emeklilik sistemi (BES) veya düzenli tasarruf planları için ideal bir projeksiyon aracıdır.`,
    how: `Bileşik faiz formülü kullanılır: FV = P × (1 + r)ⁿ + PMT × [(1 + r)ⁿ - 1] / r. Burada P başlangıç tutarı, PMT aylık katkı, r dönemlik faiz oranı, n dönem sayısıdır. Aracımız hem brüt hem net birikimi gösterir.`,
    why: `"Ayda 1.000 TL biriktirirsem 10 yıl sonra ne kadar para yaparım?" sorusunun somut cevabını vermek; erken tasarrufa başlamanın gücünü ve ertelemenin maliyetini görünür kılar.`,
    faq: [
      {
        q: "Vadeli mevduat faiz geliri vergilendirilir mi?",
        a: "Evet. TL vadeli mevduat faiz gelirleri stopaj vergisine tabidir. Aracımız net getiriyi göstermek için stopaj kesintisini otomatik uygulamaktadır.",
      },
      {
        q: "Enflasyonun üzerinde getiri elde etmek için ne yapmam lazım?",
        a: "Reel getiri; nominal getiri eksi enflasyon olarak hesaplanır. Enflasyonun üzerinde reel getiri için alternatif yatırım araçları değerlendirilmelidir.",
      },
      {
        q: "BES katkı payı hesabı için bu araç kullanılabilir mi?",
        a: "Evet. Aylık katkı tutarınızı ve beklenen fon getirisini girerek uzun vadeli BES birikimini simüle edebilirsiniz.",
      },
    ],
  },

  "mtv-hesaplama": {
    what: `Motorlu Taşıtlar Vergisi (MTV), Türkiye'de araç sahiplerinin Ocak ve Temmuz aylarında iki taksit halinde ödediği yıllık bir servet vergisidir. Vergi tutarı; aracın motor hacmi (cc), yaşı ve taşıt türüne göre belirlenir.`,
    how: `MTV, belirli motor hacmi aralıkları ve yaş kategorileri için Hazine ve Maliye Bakanlığı tarafından yayımlanan tarifedeki sabit tutara karşılık gelir. Aracımız 2026 yılı güncel tarifesini kullanarak taksit tutarlarınızı anında gösterir.`,
    why: `Ocak ve Temmuz ayı öncesinde MTV tutarını bilmek, bütçe planlaması açısından önemlidir. Araç alımında da ödenmesi gereken yıllık MTV, toplam sahiplik maliyetinin hesaplanmasında göz ardı edilemez.`,
    faq: [
      {
        q: "MTV ödeme tarihleri nedir?",
        a: "MTV yılda iki eşit taksitle ödenir: Birinci taksit Ocak ayı sonuna, ikinci taksit Temmuz ayı sonuna kadar ödenmesi gerekir.",
      },
      {
        q: "Motorsikletler için MTV nasıl hesaplanır?",
        a: "Her taşıt türünün ayrı bir tarife tablosu bulunmaktadır. Aracımız binek araç, kamyonet, otobüs ve motorsiklet gibi kategoriler için farklı tarife tablolarını desteklemektedir.",
      },
      {
        q: "Engelli vatandaşlar MTV'den muaf mı?",
        a: "Evet. %90 ve üzeri engel oranına sahip vatandaşlar adlarına kayıtlı tek araçtan MTV'den muaf tutulmaktadır.",
      },
    ],
  },

  "kira-artisi": {
    what: `Kira artış oranı hesaplama, mevcut kira sözleşmelerinde yasal sınırlar dahilinde uygulanabilecek azami artış tutarını bulmak amacıyla kullanılır. Türkiye'de konut kira artışları; 12 aylık TÜFE ortalamasına göre belirlenen yasal tavanla sınırlandırılmıştır.`,
    how: `Yeni Kira = Mevcut Kira × (1 + Artış Oranı / 100). 12 aylık TÜFE ortalaması her ay TÜİK tarafından açıklanır. Aracımız güncel yasal tavan oranını kullanarak hem TL hem de yüzde artış değerini hesaplar.`,
    why: `Kiraya veren ve kiracıların kira artış hakkını ve sınırını bilmesi; anlaşmazlıkları önler ve tarafları yasal yükümlülükler konusunda aydınlatır.`,
    faq: [
      {
        q: "Yasal tavanı aşan kira sözleşmesi geçersiz sayılır mı?",
        a: "Yasaya aykırı artış oranı hukuki geçerlilik taşımaz. Kiracı, aşılan kısmı mahkeme yoluyla geri alabilir.",
      },
      {
        q: "İş yeri kirası için de aynı tavan geçerli mi?",
        a: "İş yeri kiraları için dönemsel olarak farklı yasal düzenlemeler yapılmıştır. Güncel dönem için sözleşme tarihine bakılması gerekir.",
      },
      {
        q: "Kira artış oranını ne zaman bildirmeliyim?",
        a: "Artış, kira dönemi başlamadan makul bir süre önce yazılı olarak bildirilmelidir.",
      },
    ],
  },

  "hisse-senedi-ortalama-maliyet": {
    what: `Hisse senedi ortalama maliyet hesaplama; bir yatırımcının farklı fiyatlardan kademeli olarak satın aldığı hisse senetlerinin toplam ağırlıklı ortalama alış fiyatını bulmak için kullanılan bir finansal analiz aracıdır.`,
    how: `Formül basittir: Ortalama Maliyet = Toplam Harcanan Tutar ÷ Toplam Lot Sayısı. Aracımız ayrıca komisyon giderlerini de dahil ederek gerçek ortalama maliyeti hesaplar.`,
    why: `Net ortalama maliyeti bilmek; hangi fiyatta kâra geçileceğini, stop-loss seviyesini ve portföy yönetimini nesnel hale getirir.`,
    faq: [
      {
        q: "Komisyon maliyetini ortalamaya dahil etmeli miyim?",
        a: "Evet. Komisyon, ortalama maliyeti yükseltir ve kâra geçiş fiyatını yukarı taşır. Aracımız bu hesabı otomatik yapar.",
      },
      {
        q: "Ortalama düşürme her zaman mantıklı mı?",
        a: "Hayır. Ortalama düşürme; yalnızca şirketin temellerinde kalıcı bir bozulma olmadığına inanıldığında tercih edilmelidir.",
      },
      {
        q: "Farklı borsalardaki aynı hissenin ortalamasını hesaplayabilir miyim?",
        a: "Evet. Aracımız farklı alım noktalarını serbest olarak girmenize imkân verir.",
      },
    ],
  },

  "dolar-maliyet-ortalamasi": {
    what: `Dolar Maliyet Ortalaması (Dollar-Cost Averaging / DCA), yatırımcının piyasa koşullarından bağımsız olarak düzenli ve sabit tutarda yatırım yaptığı bir stratejidir. Bu strateji; fiyat yüksekken daha az, fiyat düşükken daha fazla birim satın alınmasını otomatik olarak sağlar.`,
    how: `Her dönem sabit tutar, o dönemin varlık fiyatına bölünür ve elde edilen birimler toplanır. Ortalama maliyet = Toplam Yatırılan Tutar ÷ Toplam Satın Alınan Birim Sayısı. Aracımız tüm bu simülasyonu yaparak portföyünüzün büyümesini grafik olarak gösterir.`,
    why: `Piyasayı tam zamanlamak neredeyse imkânsızdır. DCA, bu "doğru zamanı yakalama" baskısını ortadan kaldırır ve uzun vadeli yatırımcıların tutarlı birikimini mümkün kılar.`,
    faq: [
      {
        q: "DCA mı yoksa tek seferde yatırım mı daha iyi?",
        a: "Piyasanın yükseliş trendindeyken tek seferlik yatırım genellikle üstün performans gösterir. Ancak belirsizlikte DCA riski dağıtarak daha güvenli bir alternatif sunar.",
      },
      {
        q: "DCA için en uygun varlık sınıfı hangisidir?",
        a: "DCA; yüksek volatiliteye sahip kripto paralar, hisse senetleri ve emtia gibi varlık sınıflarında en belirgin avantajını gösterir.",
      },
      {
        q: "Ne kadar sıklıkla alım yapmalıyım?",
        a: "Aylık veya haftalık alımlar, işlem maliyetleri ile optimizasyon arasında iyi bir denge sağlar.",
      },
    ],
  },

  "yas-hesaplama": {
    what: `Yaş hesaplama; doğum tarihinizden bugüne kadar geçen süreyi yıl, ay ve gün cinsinden kesin olarak hesaplayan bir araçtır. Pasaport, sürücü belgesi, sigorta poliçesi ve iş başvuruları gibi resmi belgelerde tam yaş bilgisi gün hassasiyetinde istenir.`,
    how: `Hesaplama, doğum tarihinden başlayarak bugünün tarihine kadar geçen tam takvim yıllarını, kalan ayları ve kalan günleri bulma esasına dayanır. 29 Şubat gibi artık yıl gün farklılıkları da dahil edilir.`,
    why: `Emeklilik hesaplamaları, miras davaları, burs başvuruları ve yaş sınırı olan yarışma veya sınavlarda tam yaş bilgisi doğrudan belirleyicidir.`,
    faq: [
      {
        q: "Doğum tarihim 29 Şubat ise yaşım nasıl hesaplanır?",
        a: "Artık olmayan yıllarda doğumgünü, kullanılan takvim sistemine göre 28 Şubat veya 1 Mart olarak kabul edilebilir.",
      },
      {
        q: "Aylık doğum günü ne kadar önemli?",
        a: "Sigorta poliçeleri ve emeklilik hesapları gibi resmi işlemlerde ay bazında doğum günü belirleyicidir.",
      },
      {
        q: "Toplam kaç saat veya dakika yaşadım?",
        a: "Aracımız toplam gün sayısını gösterir. Toplam saati bulmak için gün sayısını 24 ile çarpabilirsiniz.",
      },
    ],
  },

  "bmr": {
    what: `Bazal Metabolizma Hızı (BMR); vücudun tam istirahat halindeyken yalnızca temel yaşamsal fonksiyonları sürdürebilmek için harcadığı minimum kalori miktarını ifade eder. BMR, kilo yönetiminin matematiksel temelidir.`,
    how: `En yaygın kullanılan formül Mifflin-St Jeor denklemleridir. Erkek: BMR = 10 × kilo + 6,25 × boy − 5 × yaş + 5. Kadın: BMR = 10 × kilo + 6,25 × boy − 5 × yaş − 161. Aracımız aktivite katsayısını ekleyerek TDEE'yi de hesaplar.`,
    why: `BMR'nizi bilmeden kilo verme hesabı yapmak, temel bilinmeyen eksik bir denklem kurmak gibidir. Çok düşük kalorili diyet uygulayanlar BMR'nin altına düşebilir; bu kas kaybına ve metabolizmanın yavaşlamasına yol açar.`,
    faq: [
      {
        q: "BMR uyku sırasında da aynı mı kalır?",
        a: "Evet, uykuda da metabolik hız sıfırlanmaz. BMR; uyku dahil mutlak dinlenim durumundaki enerji ihtiyacını yansıtır.",
      },
      {
        q: "BMR'mi artırmak için ne yapabilirim?",
        a: "Kas kütlesi artırmak BMR'yi yükseltmenin en etkili yöntemidir. Direnç antremanları ve yeterli protein alımı bu sürecin temelidir.",
      },
      {
        q: "BMR ile TDEE arasındaki fark nedir?",
        a: "BMR mutlak dinlenim durumundaki kalori ihtiyacıdır. TDEE = BMR × Aktivite Katsayısı olarak hesaplanır ve gün içindeki tüm aktiviteleri kapsar.",
      },
    ],
  },
};

export function getGuideBySlug(slug: string): GuideSection | null {
  return calculatorGuides[slug] ?? null;
}
