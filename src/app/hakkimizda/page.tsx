import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Kalküla",
  description: "Kalküla — Türkiye'nin en kapsamlı ücretsiz hesaplama platformu hakkında bilgi edinin.",
};

export default function Hakkimizda() {
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "2rem", fontSize: "0.875rem", color: "var(--text-muted)", display: "flex", gap: "0.4rem" }}>
        <Link href="/" style={{ color: "var(--text-muted)" }}>Ana Sayfa</Link>
        <span>›</span>
        <span style={{ color: "var(--text-primary)" }}>Hakkımızda</span>
      </nav>

      {/* Hero */}
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
          Kalküla Hakkında
        </h1>
        <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "680px" }}>
          Kalküla, Türkiye&apos;nin en kapsamlı ücretsiz hesaplama platformudur. 
          Finanstan eğitime, sağlıktan muhasebeye kadar 60&apos;tan fazla profesyonel 
          hesaplama aracını tek bir yerde sunuyoruz.
        </p>
      </div>

      {/* Mission */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "2rem", marginBottom: "2rem", borderLeft: "4px solid var(--accent-primary)" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>🎯 Misyonumuz</h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
          Karmaşık hesaplamaları herkes için erişilebilir ve anlaşılır kılmak. 
          İster kredi hesaplıyor, ister sınav puanınızı öğreniyor, ister altın yatırımınızı 
          analiz ediyor olun — Kalküla her adımda yanınızda.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
        {[
          { value: "60+", label: "Hesaplama Aracı", icon: "🧮" },
          { value: "11", label: "Kategori", icon: "📂" },
          { value: "%100", label: "Ücretsiz", icon: "🆓" },
          { value: "%99.9", label: "Doğruluk Oranı", icon: "✅" },
        ].map(s => (
          <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{s.icon}</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--accent-primary)" }}>{s.value}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.25rem" }}>Değerlerimiz</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
        {[
          { title: "🔒 Güvenilirlik", text: "Tüm hesaplama formülleri TCMB, MEB ve ÖSYM gibi resmi kaynaklardan derlenmektedir." },
          { title: "⚡ Hız", text: "Hiçbir hesaplama aracımız sunucu gerektirmez — tüm işlemler anlık tarayıcınızda gerçekleşir." },
          { title: "🆓 Ücretsizlik", text: "Kalküla'daki tüm araçlara kayıt olmadan, sınırsız biçimde erişebilirsiniz." },
          { title: "🔐 Gizlilik", text: "Girdiğiniz veriler hiçbir sunucuya gönderilmez; tüm veriler yalnızca cihazınızda kalır." },
        ].map(v => (
          <div key={v.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.25rem 1.5rem" }}>
            <h3 style={{ fontWeight: 700, marginBottom: "0.4rem" }}>{v.title}</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{v.text}</p>
          </div>
        ))}
      </div>

      {/* Developer & Contact */}
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.25rem" }}>Geliştirici & İletişim</h2>
      <div style={{ background: "var(--surface)", border: "1.5px solid var(--accent-primary)", borderRadius: "12px", padding: "1.5rem 2rem", marginBottom: "3rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
           <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
              👤
           </div>
           <div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Geliştirici</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>MEHMET EFE UZUN</div>
           </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
           <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
              ✉️
           </div>
           <div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>İletişim</div>
              <Link href="mailto:mefeuzunn@gmail.com" style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--accent-primary)", textDecoration: "none" }}>
                mefeuzunn@gmail.com
              </Link>
           </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, var(--accent-primary), #1d4ed8)", borderRadius: "12px", padding: "2.5rem", textAlign: "center", color: "white" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Hesaplamaya Başlayın</h2>
        <p style={{ opacity: 0.85, marginBottom: "1.5rem" }}>60+ ücretsiz araçtan dilediğinizi kullanın.</p>
        <Link href="/" style={{ background: "white", color: "var(--accent-primary)", padding: "0.75rem 2rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
          Araçları Keşfet →
        </Link>
      </div>
    </div>
  );
}
