"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { categories, calculators, getCalculatorBySlug } from "@/data/calculators";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CategoryIcon } from "@/components/CategoryIcon";

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
  { slug: "doviz-altin-hesaplama", title: "Altın Hesaplama", icon: "🪙" },
  { slug: "lgs-puan", title: "LGS Puan", icon: "🎓" },
];

export default function Home() {
  const [recentTools, setRecentTools] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    
    try {
      const stored = JSON.parse(localStorage.getItem("recent_calculators") || "[]");
      const mappedTools = stored.map((slug: string) => getCalculatorBySlug(slug)).filter(Boolean);
      setRecentTools(mappedTools);
    } catch (e) {}

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- PC VERSION RENDER ---
  const renderPCVersion = () => (
    <>
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
          <h1 style={{ 
            fontSize: "4.5rem", 
            fontWeight: 900, 
            marginBottom: "1.5rem", 
            lineHeight: 1.1, 
            letterSpacing: "-0.06em",
            background: "linear-gradient(to bottom, #ffffff 40%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 25px 50px rgba(0,0,0,0.25)"
          }}>
            Türkiye&apos;nin En Kapsamlı<br />Hesaplama Platformu
          </h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.9)", maxWidth: "650px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
            Finans, eğitim, sağlık ve daha fazlası. {calculators.length}+ profesyonel araç tek bir çatıda.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="#tools" className="hero-btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>Sistemi Keşfet →</Link>
            <Link href="/converter" className="hero-btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>Belge Dönüştürme</Link>
          </div>
        </div>
      </section>

      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="container stats-bar" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 0' }}>
          {STATS.map((s, i) => (
            <div key={i} className="stat-item" style={{ textAlign: 'center', flex: 1 }}>
              <div className="stat-value" style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{s.value}</div>
              <div className="stat-label" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: "4rem 1.5rem" }}>
         <AdPlaceholder type="leaderboard" />

         <section style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 900, marginBottom: "2rem", letterSpacing: '-0.03em' }}>⭐ Popüler Araçlar</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1.5rem' }}>
              {POPULAR_TOOLS.map((tool) => (
                <Link key={tool.slug} href={`/hesapla/${tool.slug}`} className="popular-card" style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', textAlign: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{tool.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{tool.title}</div>
                </Link>
              ))}
            </div>
         </section>

         <section id="tools">
           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
             <h2 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: '-0.03em' }}>Kategorilere Göz Atın</h2>
             <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-muted)", background: 'rgba(255,255,255,0.05)', padding: '0.4rem 1rem', borderRadius: '100px' }}>{categories.length} Kategori Mevcut</span>
           </div>
           <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
             {categories.map((cat) => {
               const toolCount = calculators.filter(c => c.categoryId === cat.id).length;
               return (
                 <Link key={cat.id} href={`/kategori/${cat.slug}`} className="category-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div className="category-icon" style={{ background: cat.color || 'var(--accent-primary)', color: 'white', padding: '0.75rem', borderRadius: '12px' }}>
                        <CategoryIcon id={cat.id} size={24} color="white" />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 900, color: cat.color || 'var(--accent-primary)' }}>{toolCount} Araç</span>
                   </div>
                   <h3 style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{cat.name}</h3>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{cat.description}</p>
                 </Link>
               );
             })}
           </div>
         </section>
      </div>
    </>
  );

  // --- MOBILE VERSION RENDER ---
  const renderMobileVersion = () => (
    <>
      <section style={{
        background: "linear-gradient(135deg, var(--accent-primary) 0%, #1d4ed8 100%)",
        padding: "3.5rem 1rem 3rem",
        textAlign: "center",
        color: "white",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.15)", borderRadius: "9999px", padding: "0.2rem 0.8rem", fontSize: "0.75rem", fontWeight: 600 }}>
          <span style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", display: "inline-block" }}></span>
          Tüm araçlar ücretsiz
        </div>
        <h1 style={{ 
          fontSize: "2.75rem", 
          fontWeight: 900, 
          marginBottom: "1rem", 
          lineHeight: 1.1, 
          letterSpacing: "-0.06em",
          background: "linear-gradient(to bottom, #ffffff 40%, #cbd5e1 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 15px 30px rgba(0,0,0,0.2)"
        }}>
          Türkiye&apos;nin En Kapsamlı<br />Hesaplama Platformu
        </h1>
        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", maxWidth: "300px", margin: "0 auto 2.5rem", lineHeight: 1.6, fontWeight: 500 }}>
          Kalkula profesyonel araçları ile hayatınızı kolaylaştırın.
        </p>
        
        {/* Quick Access Circles (Instagram/App style) - Now styled for the new hero */}
        <div style={{ display: 'flex', gap: '1.25rem', overflowX: 'auto', paddingBottom: '0.5rem' }} className="hide-scrollbar">
          {POPULAR_TOOLS.map((tool) => (
            <Link key={tool.slug} href={`/hesapla/${tool.slug}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <div style={{ 
                width: 68, 
                height: 68, 
                borderRadius: '50%', 
                background: 'var(--surface)', 
                border: '2px solid var(--accent-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.75rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}>
                {tool.icon}
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{tool.title.split(' ')[0]}</span>
            </Link>
          ))}
          <Link href="/converter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', color: 'white' }}>📄</div>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Belge</span>
          </Link>
        </div>
      </section>

      <div style={{ padding: "1.5rem 1rem" }}>
         {/* Categories - Compact List Style */}
         <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Kategoriler</h2>
              <Link href="/kategoriler" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', background: 'var(--accent-glow)', padding: '0.4rem 0.8rem', borderRadius: '100px' }}>Tümünü Gör</Link>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {categories.slice(0, 8).map((cat) => (
                <Link key={cat.id} href={`/kategori/${cat.slug}`} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1rem', 
                  background: 'var(--surface)', 
                  borderRadius: '18px',
                  border: '1px solid var(--border)',
                  borderLeft: `5px solid ${cat.color || 'var(--accent-primary)'}`
                }}>
                  <div style={{ 
                    padding: '0.5rem', 
                    background: `${cat.color}11`, 
                    borderRadius: '10px', 
                    color: cat.color || 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CategoryIcon id={cat.id} size={22} strokeWidth={2.5} color={cat.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: '0.95rem' }}>{cat.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{calculators.filter(c => c.categoryId === cat.id).length} profesyonel araç</div>
                  </div>
                  <div style={{ opacity: 0.3 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </Link>
              ))}
            </div>
         </section>

         {/* Stats - Card Style */}
         <section style={{ marginTop: '2.5rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               {STATS.map((s, i) => (
                 <div key={i}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{s.value}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.label}</div>
                 </div>
               ))}
            </div>
         </section>

         <AdPlaceholder type="native" />
      </div>

      {/* Floating Bottom Navigation */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        left: '20px', 
        right: '20px', 
        background: 'rgba(23,23,23,0.85)', 
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '100px',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
      }}>
        <Link href="/" style={{ fontSize: '1.2rem', opacity: 1 }}>🏠</Link>
        <Link href="/counters" style={{ fontSize: '1.2rem', opacity: 0.6 }}>⏱️</Link>
        <Link href="/calendar" style={{ fontSize: '1.2rem', opacity: 0.6 }}>📅</Link>
        <Link href="/notepad" style={{ fontSize: '1.2rem', opacity: 0.6 }}>📝</Link>
        <Link href="/converter" style={{ fontSize: '1.2rem', opacity: 0.6 }}>📄</Link>
      </div>
    </>
  );

  return (
    <div style={{ minHeight: '100vh', paddingBottom: isMobile ? '100px' : '0' }}>
      {isMobile ? renderMobileVersion() : renderPCVersion()}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
