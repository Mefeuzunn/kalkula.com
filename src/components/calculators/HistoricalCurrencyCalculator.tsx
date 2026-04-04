"use client";

import React, { useState } from "react";

export function HistoricalCurrencyCalculator() {
  const [year, setYear] = useState("2020");
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<{ pastValue: number; currentValue: number; diffPercent: number } | null>(null);

  // Varsayimsal ortalama kurlar
  const historicalRates: Record<string, Record<string, number>> = {
    USD: { "2018": 4.8, "2019": 5.6, "2020": 7.0, "2021": 8.8, "2022": 16.5, "2023": 23.5, "2024": 32.5 },
    EUR: { "2018": 5.6, "2019": 6.3, "2020": 8.0, "2021": 10.4, "2022": 17.3, "2023": 25.4, "2024": 35.2 }
  };

  const calculate = () => {
    const qty = parseFloat(amount);
    if (!qty || qty <= 0 || !historicalRates[currency][year]) return;

    const currentRate = historicalRates[currency]["2024"];
    const pastRate = historicalRates[currency][year];

    const pastValue = qty * pastRate;
    const currentValue = qty * currentRate;
    const diffPercent = ((currentRate - pastRate) / pastRate) * 100;

    setResult({ pastValue, currentValue, diffPercent });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Geçmiş yıllara ait kur değerleri üzerinden bugüne TL bazlı artışı izleyin.</p>
      
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Döviz Türü</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="input-field">
            <option value="USD">Dolar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yıl Seçimi</label>
          <select value={year} onChange={e => setYear(e.target.value)} className="input-field">
            {Object.keys(historicalRates["USD"]).slice(0,-1).map(y => (
              <option key={y} value={y}>{y} Yılı</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Miktar</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" placeholder={`Örn: 1000`} />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Farkı Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1rem", textAlign: "center" }}>Döviz Artış Analizi</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)" }}>{year} Yılındaki TL Karşılığı:</span>
            <span style={{ fontWeight: "bold" }}>{result.pastValue.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)", fontWeight: "bold" }}>Bugünkü TL Karşılığı:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#22c55e" }}>{result.currentValue.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <span style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", padding: "0.5rem 1rem", borderRadius: "100px", fontWeight: "bold" }}>
               TL Bazında Kur Artışı: +%{result.diffPercent.toFixed(1)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
