"use client";

import React, { useState } from "react";

export function HistoricalGoldCalculator() {
  const [year, setYear] = useState("2020");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<{ pastValue: number; currentValue: number; diffPercent: number } | null>(null);

  // Varsayimsal ortalama Gram Altin fiyatlari (TL)
  const historicalRates: Record<string, number> = {
    "2018": 180,
    "2019": 250,
    "2020": 450,
    "2021": 500,
    "2022": 950,
    "2023": 1700,
    "2024": 2450 // Guncel 
  };

  const calculate = () => {
    const qty = parseFloat(amount);
    if (!qty || qty <= 0 || !historicalRates[year]) return;

    const currentRate = historicalRates["2024"];
    const pastRate = historicalRates[year];

    const pastValue = qty * pastRate;
    const currentValue = qty * currentRate;
    const diffPercent = ((currentRate - pastRate) / pastRate) * 100;

    setResult({ pastValue, currentValue, diffPercent });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Geçmiş yıllardaki ortalama altın yatırımlarının bugünkü değerini görün.</p>
      
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Hedef Yıl</label>
          <select value={year} onChange={e => setYear(e.target.value)} className="input-field">
            {Object.keys(historicalRates).slice(0,-1).map(y => (
              <option key={y} value={y}>{y} Yılı</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Gram Altın Miktarı</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" placeholder="Örn: 10" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Değerini Sorgula</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1rem", textAlign: "center" }}>Zaman İçerisindeki Değişim</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Seçilen Yıldaki Yaklaşık Değeri:</span>
            <span style={{ fontWeight: "bold" }}>{result.pastValue.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)", fontWeight: "bold" }}>Bugünkü Yaklaşık Değeri:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#eab308" }}>{result.currentValue.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <span style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", padding: "0.5rem 1rem", borderRadius: "100px", fontWeight: "bold" }}>
               Değer Artışı: +%{result.diffPercent.toFixed(1)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
