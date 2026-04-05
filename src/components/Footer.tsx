import Link from "next/link";
import { categories } from "@/data/calculators";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-secondary)",
      borderTop: "1px solid var(--border)",
      padding: "3rem 0 2rem",
      marginTop: "4rem",
    }}>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div style={{ color: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2.5" fill="var(--accent-glow)" />
                  <path d="M8 6v12M16 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Kalküla</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: "240px" }}>
              Kalküla, Türkiye&apos;nin en kapsamlı ücretsiz hesaplama platformudur. Finanstan eğitime, sağlıktan muhasebeye kadar 160&apos;tan fazla profesyonel hesaplama aracını tek bir yerde sunuyoruz.
            </p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }}></div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Tüm sistemler çalışıyor</span>
            </div>
          </div>

          {/* Kategoriler */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Kategoriler</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {categories.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <Link href={`/kategori/${cat.slug}`} className="footer-link">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Araçlar */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Hızlı Araçlar</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "/calculator", label: "Hesap Makinesi" },
                { href: "/notepad", label: "Not Defteri" },
                { href: "/counters", label: "Kronometre" },
                { href: "/converter", label: "Belge Dönüştürücü" },
                { href: "/password-generator", label: "Şifre Oluşturucu" },
              ].map(t => (
                <li key={t.href}>
                  <Link href={t.href} className="footer-link">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bilgi */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Bilgi</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "Hakkımızda", href: "/hakkimizda" },
                { label: "Gizlilik Politikası", href: "/gizlilik" },
                { label: "İletişim", href: "/iletisim" },
                { label: "Hesap Makinesi", href: "/calculator" },
                { label: "Takvim", href: "/calendar" },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            © 2025 Kalküla. Tüm hakları saklıdır. | Geliştirici: <Link href="/hakkimizda" style={{ color: "var(--accent-primary)", fontWeight: 700 }}>Mehmet Efe Uzun</Link>
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Hesaplamalar bilgilendirme amaçlıdır; profesyonel danışmanlık yerine geçmez.
          </p>
        </div>
      </div>
    </footer>
  );
}
