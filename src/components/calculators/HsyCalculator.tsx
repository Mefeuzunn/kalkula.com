"use client";

import React, { useState } from "react";

export function HsyCalculator() {
  const [gkgyCorrect, setGkgyCorrect] = useState("");
  const [gkgyWrong, setGkgyWrong] = useState("");
  const [alanCorrect, setAlanCorrect] = useState("");
  const [alanWrong, setAlanWrong] = useState("");
  const [result, setResult] = useState<{ point: number } | null>(null);

  const calculate = () => {
    const gkC = parseFloat(gkgyCorrect) || 0;
    const gkW = parseFloat(gkgyWrong) || 0;
    const alC = parseFloat(alanCorrect) || 0;
    const alW = parseFloat(alanWrong) || 0;

    // Her 4 yanlış 1 doğruyu götürür
    const gkNet = Math.max(0, gkC - (gkW / 4));
    const alNet = Math.max(0, alC - (alW / 4));

    // GYGK maks 30 Soru (%20 etki) -> Max 20 puan
    // Alan maks 70 Soru (%80 etki) -> Max 80 puan
    const gkPoint = (gkNet / 30) * 20;
    const alPoint = (alNet / 70) * 80;

    const totalPoint = gkPoint + alPoint;

    setResult({ point: totalPoint });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Hâkim ve Savcı Yardımcılığı Sınavı netlerinizi giriniz (4 yanlış 1 doğruyu götürür).</p>
      
      <div className="panel" style={{ padding: "1.5rem" }}>
        <h4 style={{ marginBottom: "1rem" }}>Genel Yetenek - Genel Kültür (30 Soru)</h4>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.2rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Doğru</label>
            <input type="number" value={gkgyCorrect} onChange={e => setGkgyCorrect(e.target.value)} className="input-field" placeholder="Örn: 22" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.2rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Yanlış</label>
            <input type="number" value={gkgyWrong} onChange={e => setGkgyWrong(e.target.value)} className="input-field" placeholder="Örn: 4" />
          </div>
        </div>
      </div>

      <div className="panel" style={{ padding: "1.5rem" }}>
        <h4 style={{ marginBottom: "1rem" }}>Alan Bilgisi Testi (70 Soru)</h4>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.2rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Doğru</label>
            <input type="number" value={alanCorrect} onChange={e => setAlanCorrect(e.target.value)} className="input-field" placeholder="Örn: 55" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.2rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Yanlış</label>
            <input type="number" value={alanWrong} onChange={e => setAlanWrong(e.target.value)} className="input-field" placeholder="Örn: 10" />
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Tahmini Puanı Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid #22c55e" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Tahmini Sınav Puanı (100 üzerinden)</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#22c55e" }}>{result.point.toFixed(2)}</div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem" }}>* Formül %20 GY-GK ve %80 Alan net bazlı hesaplanır. ÖSYM Standart sapması hariçtir.</p>
        </div>
      )}
    </div>
  );
}
