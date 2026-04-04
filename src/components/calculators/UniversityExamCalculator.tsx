"use client";

import React, { useState } from "react";

export function UniversityExamCalculator() {
  const [vize, setVize] = useState("");
  const [vizeWeight, setVizeWeight] = useState("40");
  const [finalScore, setFinalScore] = useState("");
  const [finalWeight, setFinalWeight] = useState("60");
  const [result, setResult] = useState<{ average: number } | null>(null);

  const calculate = () => {
    const v = parseFloat(vize);
    const vw = parseFloat(vizeWeight) / 100;
    const f = parseFloat(finalScore);
    const fw = parseFloat(finalWeight) / 100;

    if (!isNaN(v) && !isNaN(f) && vw + fw > 0) {
      // Normallestirme orani tam 1 degilse bile oranlar ustunden carpalim
      const sumWeight = vw + fw;
      const average = (v * vw + f * fw) / sumWeight;
      setResult({ average });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Üniversite veya yüksekokul vize ve final ağırlıklarınıza göre ders ortalamanızı bulun.</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vize (Ara Sınav) Notu</label>
          <input type="number" value={vize} onChange={e => setVize(e.target.value)} className="input-field" placeholder="Örn: 55" />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vize Etkisi (%)</label>
          <input type="number" value={vizeWeight} onChange={e => setVizeWeight(e.target.value)} className="input-field" placeholder="40" />
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Final (Yarıyıl Sonu) Notu</label>
          <input type="number" value={finalScore} onChange={e => setFinalScore(e.target.value)} className="input-field" placeholder="Örn: 70" />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Final Etkisi (%)</label>
          <input type="number" value={finalWeight} onChange={e => setFinalWeight(e.target.value)} className="input-field" placeholder="60" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Ders Ortalamasını Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Ders Yıl Sonu Ortalamanız</h3>
           <div style={{ fontSize: "3rem", fontWeight: "bold", color: result.average >= 50 ? "#22c55e" : "#ef4444" }}>
              {result.average.toFixed(2)}
           </div>
           <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {result.average >= 50 ? "Tebrikler, genel barajı (50) aştınız (Çan eğrisi veya özel kurallar hariçtir)." : "Ortalamanız 50'nin altında. DD veya FF olarak kalabilirsiniz."}
           </p>
        </div>
      )}
    </div>
  );
}
