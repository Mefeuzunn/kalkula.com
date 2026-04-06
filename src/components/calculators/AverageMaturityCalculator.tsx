"use client";

import React, { useState, useEffect } from "react";

type Cheque = { id: number; amount: string; days: string };

export function AverageMaturityCalculator() {
  const [cheques, setCheques] = useState<Cheque[]>([
    { id: 1, amount: "150000", days: "30" },
    { id: 2, amount: "250000", days: "60" }
  ]);
  const [result, setResult] = useState<{ averageDays: number; totalAmount: number } | null>(null);

  const calculate = () => {
    let sumAmount = 0;
    let sumWeighted = 0;
    cheques.forEach(c => {
      const a = parseFloat(c.amount) || 0;
      const d = parseFloat(c.days) || 0;
      if (a > 0 && d >= 0) {
         sumAmount += a;
         sumWeighted += (a * d);
      }
    });

    if (sumAmount > 0) {
      setResult({ averageDays: sumWeighted / sumAmount, totalAmount: sumAmount });
    } else {
      setResult(null);
    }
  };

  const updateField = (id: number, field: "amount" | "days", val: string) => {
    setCheques(cheques.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const addRow = () => {
    setCheques([...cheques, { id: Date.now(), amount: "", days: "" }]);
  };

  const removeRow = (id: number) => {
    if (cheques.length <= 1) return;
    setCheques(cheques.filter(c => c.id !== id));
  };

  const reset = () => {
    setCheques([
      { id: Date.now(), amount: "150000", days: "30" },
      { id: Date.now() + 1, amount: "250000", days: "60" }
    ]);
  };

  useEffect(() => { calculate(); }, [cheques]);

  const fmt = (val: number) => val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-section-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
         <span>🧾 Çek / Senet Portföyü</span>
         <button onClick={addRow} style={{ color: "var(--accent-primary)", fontSize: "0.8rem", cursor: "pointer", fontWeight: 700 }}>+ Yeni Ekle</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {cheques.map((c, i) => (
          <div key={c.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 40px", gap: "0.5rem", alignItems: "center" }}>
            <div className="calc-input-wrapper">
               <input type="number" value={c.amount} onChange={e => updateField(c.id, "amount", e.target.value)} className="calc-input has-unit" placeholder="Örn: 10000" min="0" />
               <span className="calc-unit">₺</span>
            </div>
            <div className="calc-input-wrapper">
               <input type="number" value={c.days} onChange={e => updateField(c.id, "days", e.target.value)} className="calc-input has-unit" placeholder="Örn: 45" min="0" />
               <span className="calc-unit">GÜN</span>
            </div>
            <button 
              onClick={() => removeRow(c.id)} 
              className="calc-btn-reset" 
              style={{ padding: 0, margin: 0, height: "100%", opacity: cheques.length > 1 ? 1 : 0.5 }}
              disabled={cheques.length <= 1}
            >✕</button>
          </div>
        ))}
      </div>

      <div className="calc-action-row" style={{ marginTop: "1rem" }}>
        <button className="calc-btn-calculate" onClick={calculate}>⚖️ Vade Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">⚖️ Ortalama Vade Analizi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Ağırlıklı Ortalama Vade</div>
              <div className="calc-result-hero-value" style={{ color: "var(--accent-primary)", fontSize: "3rem" }}>{Math.round(result.averageDays)}<span style={{ fontSize: "1.5rem", opacity: 0.6 }}> Gün</span></div>
            </div>
            <div className="calc-result-cards" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="calc-result-card">
                 <div className="calc-result-card-label">Toplam Portföy Tutarı</div>
                 <div className="calc-result-card-value font-bold">{fmt(result.totalAmount)}</div>
              </div>
              <div className="calc-result-card">
                 <div className="calc-result-card-label">Matematiksel (Kesin) Vade</div>
                 <div className="calc-result-card-value font-bold text-accent-primary">{result.averageDays.toFixed(1)} Gün</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Ortalama vade, portföyünüzdeki her bir alacağın/borcun büyüklüğüne göre süresinin matematiksel ağırlığı alınarak(Tutar x Gün / Toplam Tutar) hesaplanır.</span>
      </div>
    </div>
  );
}
