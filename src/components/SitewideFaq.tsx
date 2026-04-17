export default function SitewideFaq() {
  const faqs = [
    {
      q: "Kalkula'daki hesaplama araçları ücretsiz mi?",
      a: "Evet, Kalkula'daki 160'tan fazla hesaplama aracının tamamı %100 ücretsizdir. Kayıt veya abonelik gerektirmez; hesaplama araçlarını dilediğiniz zaman, sınırsız biçimde kullanabilirsiniz.",
    },
    {
      q: "Verilerim güvende mi? Kişisel bilgilerimi saklıyor musunuz?",
      a: "Hayır. Kalkula'ya girdiğiniz hiçbir veri sunucularımıza gönderilmez veya saklanmaz. Tüm hesaplamalar yalnızca tarayıcınızda (client-side) gerçekleşir. Gizliliğiniz bizim için en üst önceliktir.",
    },
    {
      q: "Hesaplama sonuçları ne kadar doğru?",
      a: "Tüm hesaplama motorlarımız resmi formüller, güncel yasal düzenlemeler (ÖSYM, KKDF, BSMV, MTV tarifeleri vb.) ve uluslararası standartlar kullanılarak geliştirilmiştir. Sonuçlar bilgi amaçlıdır; kritik finansal kararlar için mutlaka uzman görüşü alın.",
    },
    {
      q: "Mobil cihazlarda da kullanabilir miyim?",
      a: "Evet. Kalkula, tüm ekran boyutlarına tam uyumlu (responsive) tasarıma sahiptir. Akıllı telefon ve tabletlerde de sorunsuz çalışır. Ek olarak Kalküla Mobil uygulaması da geliştirme aşamasındadır.",
    },
    {
      q: "Aradığım hesaplama aracını bulamıyorum, ne yapmalıyım?",
      a: "Sayfanın üst kısmındaki arama çubuğunu kullanarak 160+ araç arasında arama yapabilirsiniz. Eğer aradığınız araç listede yoksa İletişim sayfasından bize ulaşın; popüler talepleri öncelikli olarak eklerim.",
    },
    {
      q: "Kalkula'yı kimler kullanabilir?",
      a: "Öğrenciler, öğretmenler, muhasebeciler, yatırımcılar, sağlık çalışanları ve meraklı herkes için tasarlandı. İlkokul düzeyinden kurumsal analize kadar geniş bir kitleye hitap eden araçlar bir arada sunulmaktadır.",
    },
    {
      q: "Çevrimdışı (internet olmadan) kullanabilir miyim?",
      a: "Şu an için internet bağlantısı gereklidir. Ancak sayfa bir kez yüklendikten sonra pek çok hesaplama aracı yavaş bağlantılarda da aksaklık olmadan çalışır; hesaplamalar sunucuya bağımlı değildir.",
    },
  ];

  return (
    <section className="sitewide-faq-section">
      <div className="container">
        <div className="sitewide-faq-header">
          <div className="sitewide-faq-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <path d="M12 17h.01"/>
            </svg>
            Sıkça Sorulan Sorular
          </div>
          <h2 className="sitewide-faq-title">Merak Ettikleriniz</h2>
          <p className="sitewide-faq-sub">
            Kalkula hakkında en çok sorulan soruların yanıtlarını burada bulabilirsiniz.
          </p>
        </div>

        <div className="sitewide-faq-list">
          {faqs.map((item, i) => (
            <details key={i} className="sitewide-faq-item">
              <summary className="sitewide-faq-summary">
                <span className="sitewide-faq-q">{item.q}</span>
                <span className="sitewide-faq-chevron" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </summary>
              <p className="sitewide-faq-answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
