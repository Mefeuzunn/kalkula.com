import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Kalkula",
  description:
    "Kalkula hakkında en çok sorulan soruların yanıtlarını bu sayfada bulabilirsiniz. Ücretsiz mi? Veriler güvende mi? Nasıl çalışır?",
  alternates: { canonical: "/sss" },
};

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
    a: "Evet. Kalkula, tüm ekran boyutlarına tam uyumlu (responsive) tasarıma sahiptir. Akıllı telefon ve tabletlerde de sorunsuz çalışır. Ek olarak Kalkula Mobil uygulaması da geliştirme aşamasındadır.",
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
  {
    q: "Hesaplama araçları hangi kategorileri kapsıyor?",
    a: "Finans (kredi, faiz, yatırım), Sağlık (BMI, kalori, ideal kilo), Eğitim (YKS, LGS, KPSS puan hesaplama), Vergi (KDV, gelir vergisi, MTV), Matematik, Dönüştürücüler ve daha pek çok kategori mevcuttur.",
  },
  {
    q: "Hata bulursam veya öneri iletmek istersem ne yapmalıyım?",
    a: "İletişim sayfamızdaki formu doldurabilir ya da doğrudan bizimle e-posta yoluyla iletişime geçebilirsiniz. Tüm geri bildirimler dikkate alınarak araçlar sürekli güncellenmektedir.",
  },
  {
    q: "Kalkula'nın reklam politikası nedir?",
    a: "Kalkula, hizmetlerin sürdürülebilirliğini sağlamak amacıyla Google AdSense üzerinden minimal düzeyde reklam göstermektedir. Reklamlar, kullanıcı deneyimini olumsuz etkilemeyecek konumlara yerleştirilmiştir. Hiçbir kişisel veri reklam amacıyla üçüncü taraflarla paylaşılmaz.",
  },
];

export default function SSSPage() {
  return (
    <div className="sss-page">
      {/* Hero */}
      <div className="sss-hero">
        <div className="container">
          <div className="sss-breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <span>›</span>
            <span>Sıkça Sorulan Sorular</span>
          </div>
          <div className="sss-hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <path d="M12 17h.01"/>
            </svg>
            SSS
          </div>
          <h1 className="sss-hero-title">Sıkça Sorulan Sorular</h1>
          <p className="sss-hero-sub">
            Kalkula hakkında aklınızdaki soruların yanıtlarını aşağıda bulabilirsiniz.
            Bulamadığınız bir soru için{" "}
            <Link href="/iletisim" className="sss-hero-link">bize ulaşın</Link>.
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="container sss-content">
        <div className="sss-list">
          {faqs.map((item, i) => (
            <details key={i} className="sss-item">
              <summary className="sss-summary">
                <span className="sss-number">{String(i + 1).padStart(2, "0")}</span>
                <span className="sss-q">{item.q}</span>
                <span className="sss-chevron" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </summary>
              <p className="sss-answer">{item.a}</p>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="sss-cta">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <h2 className="sss-cta-title">Sorunuz hâlâ yanıtsız mı?</h2>
          <p className="sss-cta-sub">
            İletişim formumuzu doldurun, en kısa sürede size geri dönelim.
          </p>
          <Link href="/iletisim" className="btn-primary" style={{ textDecoration: "none", marginTop: "0.5rem" }}>
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </div>
  );
}
