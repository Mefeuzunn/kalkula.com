import Link from "next/link";
import { getCategoryBySlug, getCalculatorsByCategory, categories } from "@/data/calculators";
import { notFound } from "next/navigation";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { LeftSidebar } from "@/components/LeftSidebar";
import { CategoryIcon } from "@/components/CategoryIcon";

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
        <div style={{ marginBottom: "2rem", padding: "2rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", borderLeft: `6px solid ${category.color || 'var(--accent-primary)'}`, display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ padding: '1rem', background: category.color || 'var(--accent-primary)', borderRadius: '16px', color: 'white', boxShadow: `0 8px 24px -6px ${category.color}44` }}>
             <CategoryIcon id={category.id} size={48} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.25rem", letterSpacing: '-0.02em' }}>
              {category.name} Hesaplamaları
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: '600px' }}>
              {category.description}
            </p>
            <div style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 700, color: category.color || 'var(--accent-primary)', background: `${category.color}11`, padding: "0.4rem 1rem", borderRadius: "9999px" }}>
              <CategoryIcon id={category.id} size={14} color={category.color} strokeWidth={3} />
              {calcs.length} profesyonel araç
            </div>
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
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${category.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: category.color || 'var(--accent-primary)', flexShrink: 0 }}>
                    <CategoryIcon id={category.id} size={18} strokeWidth={2.5} />
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
