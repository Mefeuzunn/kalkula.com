"use client";

import React, { useState } from "react";

export function EOkulCalculator() {
  const [yazili1, setYazili1] = useState("");
  const [yazili2, setYazili2] = useState("");
  const [performans1, setPerformans1] = useState("");
  const [performans2, setPerformans2] = useState("");
  const [proje, setProje] = useState("");
  const [result, setResult] = useState<{ average: number } | null>(null);

  const calculate = () => {
    const scores = [];
    if (yazili1) scores.push(parseFloat(yazili1));
    if (yazili2) scores.push(parseFloat(yazili2));
    
    // E-okul mantigina gore:
    // Once Sinavlar ve Performanslarin hepsi toplanip adedine mi bolunur? 
    // Guncel yonetmelige gore: Sinavlarin ortalamasi ile - eger varsa performanslar ve proje puanlarinin ortalamasi alinir vs. 
    // En basiti MEB E-okul VBS dogrudan tum girilenleri toplayip girilen adede böler.
    
    if (performans1) scores.push(parseFloat(performans1));
    if (performans2) scores.push(parseFloat(performans2));
    if (proje) scores.push(parseFloat(proje));

    if (scores.length > 0) {
      const total = scores.reduce((a, b) => a + b, 0);
      const average = total / scores.length;
      setResult({ average });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>E-okul Veli Bilgilendirme Sistemi (VBS) mantığıyla tek bir dersinizin karneye düşecek puanını bulun.</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>1. Yazılı Sınav</label>
          <input type="number" value={yazili1} onChange={e => setYazili1(e.target.value)} className="input-field" placeholder="Örn: 85" />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>2. Yazılı Sınav</label>
          <input type="number" value={yazili2} onChange={e => setYazili2(e.target.value)} className="input-field" placeholder="Örn: 90" />
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>1. Performans</label>
          <input type="number" value={performans1} onChange={e => setPerformans1(e.target.value)} className="input-field" placeholder="Örn: 100" />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>2. Performans (Varsa)</label>
          <input type="number" value={performans2} onChange={e => setPerformans2(e.target.value)} className="input-field" placeholder="İsteğe bağlı" />
        </div>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Proje Notu (Varsa)</label>
        <input type="number" value={proje} onChange={e => setProje(e.target.value)} className="input-field" placeholder="İsteğe bağlı" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>E-Okul Notunu Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Bu Dersin Karne Ortalaması</h3>
           <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--text-primary)" }}>
              {result.average.toFixed(4)}
           </div>
           <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Bu puan sınıf geçme ve teşekkür/takdir hesaplamalarında karneye yansıyan kesin değerdir.
           </p>
        </div>
      )}
    </div>
  );
}
