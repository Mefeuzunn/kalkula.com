"use client";

import Link from "next/link";
import { categories, calculators } from "@/data/calculators";
import { AdPlaceholder } from "@/components/AdPlaceholder";

const STATS = [
  { label: "Hesaplama Aracı", value: `${calculators.length}+` },
  { label: "Kategori", value: `${categories.length}` },
  { label: "Günlük Kullanıcı", value: "10K+" },
  { label: "Doğruluk Oranı", value: "%99.9" },
];

const POPULAR_TOOLS = [
  { slug: "kredi-hesaplama", title: "Kredi Hesaplama", icon: "🏦" },
  { slug: "vucut-kitle-endeksi", title: "VKI (BMI)", icon: "⚖️" },
  { slug: "yks-puan", title: "YKS Puan", icon: "📚" },
  { slug: "enflasyon", title: "Enflasyon", icon: "📈" },
  { slug: "altin", title: "Altın Hesaplama", icon: "🪙" },
  { slug: "lgs-puan", title: "LGS Puan", icon: "🎓" },
];

export default function Home() {
  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, var(--accent-primary) 0%, #1d4ed8 100%)",
        padding: "5rem 0 4rem",
        textAlign: "center",
        color: "white",
      }}>
        <div className="container">
          <div style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.15)", borderRadius: "9999px", padding: "0.3rem 1rem", fontSize: "0.85rem", fontWeight: 500 }}>
            <span style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", display: "inline-block" }}></span>
            Tüm araçlar ücretsiz
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, marginBottom: "1.25rem", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Türkiye&apos;nin En Kapsamlı<br />Hesaplama Platformu
          </h1>
          <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.85)", maxWidth: "580px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Finans&apos;tan eğitime, sağlıktan muhasebeye kadar {calculators.length}+ hesaplama aracı tek bir profesyonel platformda.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="#tools" className="hero-btn-primary">
              Hesaplama Araçları →
            </Link>
            <Link href="/converter" className="hero-btn-secondary">
              Belge Dönüştürücü
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container stats-bar">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: "3rem 1.5rem" }}>
        <AdPlaceholder type="leaderboard" />

        {/* Popular Quick Access */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem" }}>⚡ Popüler Araçlar</h2>
          <div className="popular-grid">
            {POPULAR_TOOLS.map((tool) => (
              <Link key={tool.slug} href={`/hesapla/${tool.slug}`} className="popular-card">
                <span style={{ fontSize: "1.3rem" }}>{tool.icon}</span>
                <span>{tool.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Grid */}
        <section id="tools">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Tüm Kategoriler</h2>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{categories.length} kategori</span>
          </div>

          <div className="category-grid">
            {categories.map((cat) => {
              const toolCount = calculators.filter(c => c.categoryId === cat.id).length;
              return (
                <Link key={cat.id} href={`/kategori/${cat.slug}`} className="category-card">
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <div className="category-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {cat.icon === "Bank" && <><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 9l9-7 9 7"/><line x1="12" y1="9" x2="12" y2="21"/></>}
                        {cat.icon === "TrendingUp" && <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>}
                        {cat.icon === "Heart" && <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>}
                        {cat.icon === "BookOpen" && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>}
                        {cat.icon === "Calculator" && <><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></>}
                        {cat.icon === "Clock" && <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>}
                        {cat.icon === "Briefcase" && <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></>}
                        {cat.icon === "Percent" && <><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>}
                        {cat.icon === "GraduationCap" && <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>}
                        {cat.icon === "ShoppingCart" && <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>}
                        {cat.icon === "MoreHorizontal" && <><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>}
                      </svg>
                    </div>
                    <span className="tool-count-badge">{toolCount} araç</span>
                  </div>
                  <h3 className="category-name">{cat.name}</h3>
                  <p className="category-desc">{cat.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <div style={{ marginTop: "3rem" }}>
          <AdPlaceholder type="leaderboard" />
        </div>

        {/* Quick Tools */}
        <section style={{ marginTop: "3rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.25rem" }}>Hızlı Araçlar</h2>
          <div className="quick-tools-grid">
            {[
              { href: "/calculator", label: "🔢 Hesap Makinesi" },
              { href: "/notepad", label: "📝 Not Defteri" },
              { href: "/counters", label: "⏱️ Kronometre" },
              { href: "/calendar", label: "📅 Takvim" },
              { href: "/password-generator", label: "🔐 Şifre Oluşturucu" },
              { href: "/converter", label: "📄 Belge Dönüştürücü" },
            ].map(t => (
              <Link key={t.href} href={t.href} className="quick-tool-card">
                {t.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
