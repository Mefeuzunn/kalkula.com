"use client";

import React, { useState } from "react";

export function PriceCalculator() {
  const [cost, setCost] = useState("");
  const [margin, setMargin] = useState("");
  const [tax, setTax] = useState("18"); // KDV oranı varsayılan
  const [result, setResult] = useState<{ salePriceBeforeTax: number; salePriceWithTax: number; profitAmount: number } | null>(null);

  const calculate = () => {
    const c = parseFloat(cost) || 0;
    const m = parseFloat(margin) || 0;
    const t = parseFloat(tax) || 0;

    if (c <= 0 || m < 0) return;

    // Kâr = Maliyet * Kâr Marjı
    const profitAmount = c * (m / 100);
    const salePriceBeforeTax = c + profitAmount;
    
    // KDV'li satış fiyatı
    const salePriceWithTax = salePriceBeforeTax * (1 + (t / 100));

    setResult({ salePriceBeforeTax, salePriceWithTax, profitAmount });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Ürün Birim Maliyeti (₺)</label>
        <input type="number" value={cost} onChange={e => setCost(e.target.value)} className="input-field" placeholder="Örn: 100" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Hedeflenen Kâr Marjı (%)</label>
          <input type="number" value={margin} onChange={e => setMargin(e.target.value)} className="input-field" placeholder="Örn: 25" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>KDV Oranı (%)</label>
          <select value={tax} onChange={e => setTax(e.target.value)} className="input-field">
            <option value="0">%0 KDV</option>
            <option value="1">%1 KDV</option>
            <option value="10">%10 KDV</option>
            <option value="20">%20 KDV</option>
          </select>
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>SonSatış Fiyatını Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", textAlign: "center" }}>Fiyatlandırma Özeti</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Birim Başına Net Kâr:</span>
            <span style={{ fontWeight: "bold", color: "#22c55e" }}>{result.profitAmount.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--text-muted)" }}>KDV Hariç Satış Fiyatı:</span>
            <span style={{ fontWeight: "bold" }}>{result.salePriceBeforeTax.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "1.2rem", fontWeight: "bold" }}>KDV Dahil Satış Fiyatı:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.4rem", color: "var(--accent-primary)" }}>{result.salePriceWithTax.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
        </div>
      )}
    </div>
  );
}
