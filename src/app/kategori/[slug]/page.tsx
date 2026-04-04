import Link from "next/link";
import { getCategoryBySlug, getCalculatorsByCategory, categories } from "@/data/calculators";
import { notFound } from "next/navigation";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { LeftSidebar } from "@/components/LeftSidebar";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const calcs = getCalculatorsByCategory(category.id);
  const otherCategories = categories.filter(c => c.id !== category.id);

  return (
    <div className="container layout-3col" style={{ padding: "3rem 1.5rem" }}>
      <LeftSidebar />

      <div className="main-content">
        <AdPlaceholder type="leaderboard" />

        {/* Breadcrumb */}
        <nav style={{ marginBottom: "1.5rem", fontSize: "0.875rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Link href="/" style={{ color: "var(--text-muted)" }}>Ana Sayfa</Link>
          <span>›</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{category.name}</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: "2rem", padding: "2rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", borderLeft: "4px solid var(--accent-primary)" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            {category.name} Hesaplamaları
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}>
            {category.description}
          </p>
          <div style={{ marginTop: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--text-muted)", background: "var(--bg-tertiary)", padding: "0.3rem 0.75rem", borderRadius: "9999px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/></svg>
            {calcs.length} hesaplama aracı
          </div>
        </div>

        {/* Tool Cards Grid */}
        {calcs.length === 0 ? (
          <div className="panel" style={{ padding: "4rem", textAlign: "center" }}>
            <h3 style={{ color: "var(--text-muted)", fontSize: "1.25rem" }}>Bu kategoride henüz araç bulunmuyor.</h3>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {calcs.map((calc) => (
              <Link key={calc.id} href={`/hesapla/${calc.slug}`} className="tool-card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-primary)", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2"/>
                      <line x1="8" y1="8" x2="16" y2="8"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                  </div>
                  <h3 className="tool-card-title">{calc.title}</h3>
                </div>
                <p className="tool-card-desc">{calc.description}</p>
                <div className="tool-card-cta">
                  Hesapla
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        <AdPlaceholder type="fluid" />

        {/* Related Categories */}
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Diğer Kategoriler</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {otherCategories.map(c => (
              <Link key={c.id} href={`/kategori/${c.slug}`} className="cat-tag">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <aside className="right-sidebar sticky-sidebar">
        <AdPlaceholder type="rectangle" />
        <AdPlaceholder type="skyscraper" />
      </aside>
    </div>
  );
}
