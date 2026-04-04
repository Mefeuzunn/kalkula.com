"use client";

import React, { useState } from "react";

export function FuturesCalculator() {
  const [spotPrice, setSpotPrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [dividendYield, setDividendYield] = useState("");
  const [days, setDays] = useState("");
  const [result, setResult] = useState<{ theoreticalPrice: number; basis: number } | null>(null);

  const calculate = () => {
    const s = parseFloat(spotPrice);
    const r = parseFloat(interestRate) / 100;
    const dy = parseFloat(dividendYield) / 100 || 0; 
    const d = parseFloat(days);

    if (s > 0 && !isNaN(r) && d > 0) {
      // Vadeli İslem Fiyatı Formülü (Cost of Carry Model): F = S * [1 + (r - q) * (t / 365)]
      // Surekli bilesik faizli yapilmak istenirse: F = S * e^((r-q)*(d/365))
      // Bankacilik Borsa Istanbul VİOP standardinda basit tasiyici maliyeti yaygindir:
      
      const time = d / 365;
      const theoreticalPrice = s * (1 + (r - dy) * time);

      // Baz(Basis) farki
      const basis = theoreticalPrice - s;

      setResult({ theoreticalPrice, basis });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>VİOP gibi türev piyasalarda dayanak varlığın risksiz faize ve temettüye göre teorik vadeli fiyatını (Futures Price) hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Dayanak Varlık Spot Fiyatı</label>
        <input type="number" value={spotPrice} onChange={e => setSpotPrice(e.target.value)} className="input-field" placeholder="Örn: 9500" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Risksiz Faiz Oranı (%)</label>
          <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="input-field" placeholder="Örn: 40" step="0.1" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Temettü Verimi (%)</label>
          <input type="number" value={dividendYield} onChange={e => setDividendYield(e.target.value)} className="input-field" placeholder="Örn: 2" step="0.1" />
        </div>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Kontrat Vadesine Kalan Gün</label>
        <input type="number" value={days} onChange={e => setDays(e.target.value)} className="input-field" placeholder="Örn: 60" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Teorik Vadeli Fiyatı Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Teorik Fiyat (Fair Value)</h3>
           <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
              {result.theoreticalPrice.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
           </div>
           
           <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Spot Fiyat ile Teorik Fark (Baz Puan): <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>{result.basis > 0 ? "+" : ""}{result.basis.toFixed(2)}</span>
           </p>
        </div>
      )}
    </div>
  );
}
