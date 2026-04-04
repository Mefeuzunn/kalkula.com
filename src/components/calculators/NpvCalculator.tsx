"use client";

import React, { useState } from "react";

export function NpvCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [cashFlows, setCashFlows] = useState<string[]>(["", "", ""]);
  const [result, setResult] = useState<{ npv: number } | null>(null);

  const calculate = () => {
    const init = parseFloat(initialInvestment) || 0;
    const r = parseFloat(discountRate) / 100;

    if (isNaN(init) || isNaN(r)) return;

    let npv = -Math.abs(init); // Initial investment is usually an outflow
    
    for (let i = 0; i < cashFlows.length; i++) {
       const cf = parseFloat(cashFlows[i]) || 0;
       npv += cf / Math.pow(1 + r, i + 1);
    }

    setResult({ npv });
  };

  const addCashFlow = () => {
    setCashFlows([...cashFlows, ""]);
  };

  const updateCashFlow = (index: number, val: string) => {
    const newF = [...cashFlows];
    newF[index] = val;
    setCashFlows(newF);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Yatırımınızın İskonto Edilmiş Nakit Akışı Değerini (NPV) bulun.</p>
      
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Başlangıç Yatırımı Maliyeti (₺)</label>
          <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} className="input-field" placeholder="Örn: 50000" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>İskonto / Maliyet Oranı (%)</label>
          <input type="number" value={discountRate} onChange={e => setDiscountRate(e.target.value)} className="input-field" placeholder="Örn: 10" />
        </div>
      </div>

      <div className="panel" style={{ padding: "1.5rem", marginTop: "1rem" }}>
        <h4 style={{ marginBottom: "1rem" }}>Yıllık Gelecek Nakit Akışları (+ Gelirler)</h4>
        {cashFlows.map((cf, index) => (
          <div key={index} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ minWidth: "60px", color: "var(--text-muted)", fontWeight: "500" }}>Yıl {index + 1}:</span>
            <input 
              type="number" 
              value={cf} 
              onChange={e => updateCashFlow(index, e.target.value)} 
              className="input-field" 
              placeholder={` ${index + 1}. yıl beklenen nakit akışı`} 
            />
          </div>
        ))}
        <button onClick={addCashFlow} style={{ background: "transparent", color: "var(--accent-primary)", border: "none", cursor: "pointer", marginTop: "0.5rem", fontWeight: "bold" }}>
          + Yeni Yıl Ekle
        </button>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Net Bugünkü Değeri (NPV) Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: `4px solid ${result.npv >= 0 ? '#22c55e' : '#ef4444'}` }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Net Bugünkü Değer Sonucu</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: result.npv >= 0 ? '#22c55e' : '#ef4444', marginTop: "0.5rem" }}>
            {result.npv.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {result.npv >= 0 
              ? "NPV Pozitif. Bu yatırım projesi kârlı görünüyor ve yatırım maliyetinizi aşıyor." 
              : "NPV Negatif. Projenin iskonto edilmiş gelirleri yatırım maliyetini ve beklenen getiriyi karşılamıyor."}
          </p>
        </div>
      )}
    </div>
  );
}
