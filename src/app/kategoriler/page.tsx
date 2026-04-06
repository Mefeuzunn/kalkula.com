"use client";

import React from "react";
import Link from "next/link";
import { categories, calculators } from "@/data/calculators";
import { CategoryIcon } from "@/components/CategoryIcon";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebarAds } from "@/components/RightSidebarAds";
import { AdPlaceholder } from "@/components/AdPlaceholder";

export default function KategorilerPage() {
  return (
    <div className="container layout-3col" style={{ padding: "3rem 1.5rem" }}>
      <LeftSidebar />

      <div className="main-content">
        <AdPlaceholder type="leaderboard" />

        <div style={{ marginBottom: "2.5rem" }}>
           <h1 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "0.75rem", letterSpacing: '-0.03em' }}>Tüm Kategoriler</h1>
           <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "700px" }}>
             İhtiyacınız olan hesaplama aracını kolayca bulmak için 17 farklı kategorideki yüzlerce profesyonel araca göz atın.
           </p>
        </div>

        <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat) => {
            const toolCount = calculators.filter(c => c.categoryId === cat.id).length;
            return (
              <Link key={cat.id} href={`/kategori/${cat.slug}`} className="category-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                   <div style={{ background: cat.color || 'var(--accent-primary)', color: 'white', padding: '0.85rem', borderRadius: '16px', boxShadow: `0 8px 20px -5px ${cat.color}66` }}>
                      <CategoryIcon id={cat.id} size={32} color="white" />
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 900, color: cat.color || 'var(--accent-primary)' }}>{toolCount}</div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Araç</div>
                   </div>
                </div>
                <h3 style={{ fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{cat.description}</p>
              </Link>
            );
          })}
        </div>

        <AdPlaceholder type="fluid" />
      </div>

      <RightSidebarAds />
    </div>
  );
}
