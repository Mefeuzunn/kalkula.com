"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/calculators";

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="left-sidebar sticky-sidebar">
      <div style={{ padding: "1.25rem" }}>
        <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "1.5px" }}>
          Kategoriler
        </h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          {categories.map((cat) => {
            const isActive = pathname === `/kategori/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/kategori/${cat.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "7px",
                  color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                  fontWeight: isActive ? 700 : 400,
                  fontSize: "0.9rem",
                  background: isActive ? "var(--accent-glow)" : "transparent",
                  borderLeft: isActive ? "3px solid var(--accent-primary)" : "3px solid transparent",
                  transition: "all 0.15s",
                  textDecoration: "none",
                }}
                className="sidebar-link"
              >
                {cat.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ borderTop: "1px solid var(--border)", margin: "1.25rem 0" }} />

        <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "1.5px" }}>
          Araçlar
        </h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          {[
            { href: "/calculator", label: "🔢 Hesap Makinesi" },
            { href: "/notepad", label: "📝 Not Defteri" },
            { href: "/calendar", label: "📅 Takvim" },
            { href: "/counters", label: "⏱️ Kronometre" },
            { href: "/password-generator", label: "🔐 Şifre Oluşturucu" },
          ].map(t => {
            const isActive = pathname === t.href;
            return (
              <Link key={t.href} href={t.href}
                style={{
                  display: "block",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "7px",
                  color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                  fontWeight: isActive ? 700 : 400,
                  fontSize: "0.875rem",
                  background: isActive ? "var(--accent-glow)" : "transparent",
                  transition: "all 0.15s",
                  textDecoration: "none",
                }}
                className="sidebar-link"
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
