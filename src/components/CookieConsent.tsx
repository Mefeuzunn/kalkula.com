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
      className="animate-fadeIn"
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
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          borderRadius: "2rem",
          padding: "1.25rem 2rem",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          maxWidth: "900px",
          width: "100%",
          pointerEvents: "auto",
          flexWrap: "wrap"
        }}
        className="dark:bg-zinc-900/80 dark:border-zinc-800"
      >
        <div style={{ flex: 1, minWidth: "280px" }}>
           <h4 style={{ fontSize: "0.9rem", fontWeight: 800, marginBottom: "0.25rem", color: "var(--text-primary)" }}>🍪 Çerez ve Gizlilik Tercihleri</h4>
           <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Deneyiminizi iyileştirmek ve platform güvenliğini sağlamak için çerezleri kullanıyoruz. Devam ederek <Link href="/gizlilik" style={{ color: "var(--accent-primary)", fontWeight: 700 }}>Gizlilik Politikamızı</Link> kabul etmiş sayılırsınız.
           </p>
        </div>
        
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
           <button 
              onClick={decline}
              style={{ 
                background: "transparent", 
                border: "none", 
                fontSize: "0.75rem", 
                fontWeight: 700, 
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "0.5rem 1rem"
              }}
           >
              Reddet
           </button>
           <button 
              onClick={accept}
              style={{ 
                background: "var(--text-primary)", 
                color: "var(--bg-primary)",
                border: "none",
                borderRadius: "100px",
                padding: "0.75rem 1.5rem",
                fontSize: "0.8rem",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
              }}
           >
              Kabul Ediyorum
           </button>
        </div>
      </div>
    </div>
  );
}
