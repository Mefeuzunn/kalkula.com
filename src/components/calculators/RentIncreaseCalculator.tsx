"use client";

import React, { useState } from "react";

export function RentIncreaseCalculator() {
  const [rent, setRent] = useState("");
  const [rateMode, setRateMode] = useState("tufe");
  const [customRate, setCustomRate] = useState("");
  
  // Guncel aylik tufe 12 aylik ortalama limiti (Varsayimsal guncel)
  const currentTufeLimiti = 59.64; 
  // Eski konut limiti (Kaldirildi ancak historic acidan tutulabilir)
  const konutLimiti = 25.00;

  const [result, setResult] = useState<{ newRent: number; diff: number; rate: number } | null>(null);

  const calculate = () => {
    const currentRent = parseFloat(rent);
    if (!currentRent || currentRent <= 0) return;

    let appliedRate = 0;

    if (rateMode === "tufe") appliedRate = currentTufeLimiti;
    else if (rateMode === "konut") appliedRate = konutLimiti;
    else appliedRate = parseFloat(customRate) || 0;

    const diff = currentRent * (appliedRate / 100);
    const newRent = currentRent + diff;

    setResult({ newRent, diff, rate: appliedRate });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Konut ve İşyerleri için yasal TÜFE sınırlarına göre (veya özel oran belirleyerek) yeni kiranızı hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Mevcut Kira Bedeli (₺)</label>
        <input type="number" value={rent} onChange={e => setRent(e.target.value)} className="input-field" placeholder="Örn: 15000" />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Artış Kuralı / Limiti</label>
        <select value={rateMode} onChange={e => setRateMode(e.target.value)} className="input-field">
          <option value="tufe">Güncel TÜFE 12 Aylık Ortalama (İşyeri & Güncel Konut)</option>
          <option value="konut">Eski Konut Limiti (%25)</option>
          <option value="custom">Özel Oran Belirle</option>
        </select>
      </div>

      {rateMode === "custom" && (
        <div style={{ padding: "1rem", background: "var(--background)", borderRadius: "8px", border: "1px solid var(--border)" }}>
           <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Uygulanacak Zam Oranı (%)</label>
           <input type="number" value={customRate} onChange={e => setCustomRate(e.target.value)} className="input-field" placeholder="Örn: 40" />
        </div>
      )}

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Yeni Kirayı Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", textAlign: "center" }}>Zamlı Kira Sonucu</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Uygulanan Zam Oranı:</span>
            <span style={{ fontWeight: "bold" }}>%{result.rate.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Kira Artış (Fark) Tutarı:</span>
            <span style={{ fontWeight: "bold" }}>{result.diff.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
             <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Yeni Kira Bedeli</p>
             <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
                {result.newRent.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
