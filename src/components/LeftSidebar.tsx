import React from "react";
import Link from "next/link";
import { categories } from "@/data/calculators";

export function LeftSidebar() {
  return (
    <aside className="left-sidebar sticky-sidebar">
      <div className="panel" style={{ padding: "1.5rem", border: "none", background: "transparent", boxShadow: "none" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>
          Kategoriler
        </h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/kategori/${cat.slug}`}
              style={{
                display: "block",
                padding: "0.5rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                fontWeight: 500,
                fontSize: "0.95rem",
                transition: "background 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surface-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
        
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "1rem", marginTop: "2rem", textTransform: "uppercase", letterSpacing: "1px" }}>
          Hızlı Araçlar
        </h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <Link href="/converter" style={{ padding: "0.5rem 0.75rem", color: "var(--text-primary)" }}>Belge Dönüştürme</Link>
          <Link href="/calculator" style={{ padding: "0.5rem 0.75rem", color: "var(--text-primary)" }}>Hesap Makinesi</Link>
        </nav>
      </div>
    </aside>
  );
}
