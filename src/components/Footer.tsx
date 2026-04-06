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

        <div style={{ 
          borderTop: "1px solid var(--border)", 
          paddingTop: "2rem", 
          marginTop: "2rem", 
          display: "flex", 
          flexDirection: "column", 
          gap: "1.5rem" 
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
             <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", maxWidth: "600px" }}>
               © 2026 Kalküla SaaS Hub. Tüm hakları saklıdır. Bu platformdaki tüm hesaplama motorları ve görsel bileşenler fikri mülkiyet koruması altındadır. | Geliştirici: <Link href="/hakkimizda" style={{ color: "var(--accent-primary)", fontWeight: 700 }}>Mehmet Efe Uzun</Link>
             </p>
             <div style={{ display: "flex", gap: "1rem", alignItems: "center", opacity: 0.7 }}>
                <div title="SSL Secured" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.7rem", color: "#22c55e", fontWeight: "bold", padding: "4px 10px", background: "#22c55e11", borderRadius: "100px", border: "1px solid #22c55e33" }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                   SSL SECURED
                </div>
                <div title="KVKK Compliant" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.7rem", color: "var(--accent-primary)", fontWeight: "bold", padding: "4px 10px", background: "var(--accent-glow)", borderRadius: "100px", border: "1px solid var(--accent-primary)33" }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                   KVKK / GDPR
                </div>
                <div title="Privacy First" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.7rem", color: "var(--text-primary)", fontWeight: "bold", padding: "4px 10px", background: "var(--bg-primary)", borderRadius: "100px", border: "1px solid var(--border)" }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" /></svg>
                   LOCAL CALC
                </div>
             </div>
          </div>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
             <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontStyle: "italic", flex: 1 }}>
               * Kalküla, girilen hiçbir veriyi sunucularında saklamaz. Tüm hesaplamalar uçtan uca şifreli bir şekilde tarayıcınızda (Client-side) gerçekleşir. Gizliliğiniz bizim için en üst önceliktir.
             </p>
             <div style={{ display: "flex", gap: "1rem" }}>
                <Link href="/gizlilik" style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "bold" }} className="hover:text-primary">Gizlilik Politikası</Link>
                <Link href="/kullanim-sartlari" style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "bold" }} className="hover:text-primary">Kullanım Şartları</Link>
                <Link href="/iletisim" style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "bold" }} className="hover:text-primary">İletişim</Link>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
