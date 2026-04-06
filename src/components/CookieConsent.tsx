"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="animate-fade-in"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none"
      }}
    >
      <div 
        className="calc-result-panel"
        style={{
          background: "var(--bg-secondary)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--border)",
          borderRadius: "2rem",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          maxWidth: "850px",
          width: "100%",
          pointerEvents: "auto",
          flexWrap: "wrap",
          boxShadow: "0 25px 60px -12px rgba(0,0,0,0.3)"
        }}
      >
        <div style={{ flex: 1, minWidth: "280px" }}>
           <h4 className="calc-label accent" style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>🍪 Çerez ve Gizlilik Tercihleri</h4>
           <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6, fontWeight: 500 }}>
              Kalkula deneyiminizi kişiselleştirmek ve güvenliğinizi sağlamak için çerezleri kullanıyoruz. Devam ederek <Link href="/gizlilik" className="font-bold underline decoration-accent-primary/30">Gizlilik Politikamızı</Link> onaylamış olursunuz.
           </p>
        </div>
        
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
           <button 
              onClick={decline}
              className="calc-label"
              style={{ padding: "0.5rem 1rem", opacity: 0.6, cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}
           >
              Reddet
           </button>
           <button 
              onClick={accept}
              className="btn-primary"
              style={{ borderRadius: "100px", padding: "0.75rem 2rem", fontSize: "0.85rem", boxShadow: "0 10px 30px var(--accent-glow)" }}
           >
              Kabul Et
           </button>
        </div>
      </div>
    </div>
  );
}
