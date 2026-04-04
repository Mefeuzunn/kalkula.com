"use client";

import React, { useState } from "react";

export function IrrCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [cashFlows, setCashFlows] = useState<string[]>(["", "", ""]);
  const [result, setResult] = useState<{ irr: number | string } | null>(null);

  const calculateIRR = (cashFlowsArray: number[], guess = 0.1) => {
    // Newton-Raphson method to find IRR
    const maxIter = 1000;
    const precision = 1e-7;
    let rate = guess;

    for (let i = 0; i < maxIter; i++) {
      let npv = 0;
      let derivativeNpv = 0;

      for (let t = 0; t < cashFlowsArray.length; t++) {
        npv += cashFlowsArray[t] / Math.pow(1 + rate, t);
        if (t > 0) {
          derivativeNpv -= t * cashFlowsArray[t] / Math.pow(1 + rate, t + 1);
        }
      }

      const newRate = rate - npv / derivativeNpv;

      if (Math.abs(newRate - rate) < precision) {
        return newRate * 100;
      }
      rate = newRate;
    }
    return "Hesaplanamadı";
  };

  const calculate = () => {
    const init = parseFloat(initialInvestment) || 0;
    
    // Yılı 0'daki nakit akisi (yatirim) genellikle negatiftir.
    const flows = [-Math.abs(init)];
    
    for (let i = 0; i < cashFlows.length; i++) {
       const cf = parseFloat(cashFlows[i]) || 0;
       flows.push(cf);
    }

    const irr = calculateIRR(flows);
    setResult({ irr });
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
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Net Bugünkü Değeri (NPV) sıfırlayan, bir projenin "karlı" sayılacağı iç verim (getiri) oranını hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Başlangıç Yatırım Tutarı (₺)</label>
        <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} className="input-field" placeholder="Örn: 100000" />
      </div>

      <div className="panel" style={{ padding: "1.5rem", marginTop: "0.5rem" }}>
        <h4 style={{ marginBottom: "1rem" }}>Gelecekteki Nakit Akışları</h4>
        {cashFlows.map((cf, index) => (
          <div key={index} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ minWidth: "60px", color: "var(--text-muted)", fontWeight: "500" }}>Yıl {index + 1}:</span>
            <input 
              type="number" 
              value={cf} 
              onChange={e => updateCashFlow(index, e.target.value)} 
              className="input-field" 
              placeholder={` ${index + 1}. yıl nakit girişi`} 
            />
          </div>
        ))}
        <button onClick={addCashFlow} style={{ background: "transparent", color: "var(--accent-primary)", border: "none", cursor: "pointer", marginTop: "0.5rem", fontWeight: "bold" }}>
          + Yeni Yıl Ekle
        </button>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>İç Verim Oranını (IRR) Bul</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Hesaplanan İç Verim Oranı (IRR)</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
            {typeof result.irr === "number" ? `%${result.irr.toFixed(2)}` : result.irr}
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Eğer bu oran piyasa faizlerinden ve sermaye maliyetinden büyükse proje kârlı sayılır.
          </p>
        </div>
      )}
    </div>
  );
}
