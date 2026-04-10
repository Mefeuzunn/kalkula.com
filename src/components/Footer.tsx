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
              <span style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Kalkula</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: "240px" }}>
              Kalkula, Türkiye&apos;nin en kapsamlı ücretsiz hesaplama platformudur. Finanstan eğitime, sağlıktan muhasebeye kadar 160&apos;tan fazla profesyonel hesaplama aracını tek bir yerde sunuyoruz.
            </p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }}></div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Tüm sistemler çalışıyor</span>
            </div>
            
            <Link 
              href="https://github.com/Mefeuzunn/kalkula.com" 
              target="_blank"
              style={{ 
                marginTop: "1.5rem", 
                display: "flex", 
                alignItems: "center", 
                gap: "0.75rem", 
                padding: "12px 16px", 
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid var(--border)", 
                borderRadius: "16px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                width: "fit-content"
              }}
              className="hover:border-accent-primary hover:bg-white/5 group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>GitHub Repository</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Mefeuzunn / kalkula.com</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
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
               © 2026 Kalkula SaaS Hub. Tüm hakları saklıdır. Bu platformdaki tüm hesaplama motorları ve görsel bileşenler fikri mülkiyet koruması altındadır. | Geliştirici: <Link href="/hakkimizda" style={{ color: "var(--accent-primary)", fontWeight: 700 }}>Mehmet Efe Uzun</Link>
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
               * Kalkula, girilen hiçbir veriyi sunucularında saklamaz. Tüm hesaplamalar uçtan uca şifreli bir şekilde tarayıcınızda (Client-side) gerçekleşir. Gizliliğiniz bizim için en üst önceliktir.
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
