"use client";

import React, { useState } from "react";

export function InflationCalculator() {
  const [amount, setAmount] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ futureCost: number; purchasingPower: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(inflationRate) / 100;
    const y = parseInt(years);

    if (!a || !r || !y) return;

    // Aynı ürünün gelecekteki fiyatı 
    const futureCost = a * Math.pow(1 + r, y);
    
    // Bugünkü paranın gelecekteki alım gücü (değer kaybı)
    const purchasingPower = a / Math.pow(1 + r, y);

    setResult({ futureCost, purchasingPower });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Hesaplanacak Tutar veya Fiyat (₺)</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" placeholder="Örn: 1000" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yıllık Ortalama Enflasyon (%)</label>
          <input type="number" step="0.1" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="input-field" placeholder="Örn: 60" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Süre (Yıl)</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="Örn: 5" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Enflasyon Etkisini Hesapla
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", textAlign: "center" }}>Alım Gücü Değişimi</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--text-muted)" }}>Aynı ürünün {years} yıl sonraki fiyatı:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#ef4444" }}>
              {result.futureCost.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Paranızın {years} yıl sonraki değeri:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "var(--accent-primary)" }}>
               {result.purchasingPower.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
