"use client";

import React, { useState, useEffect } from "react";

const GOLD_TYPES = [
  { value: "gram", label: "Gram Altın", emoji: "🪙", rate: 2450.50 },
  { value: "ceyrek", label: "Çeyrek Altın", emoji: "💛", rate: 4125.00 },
  { value: "yarim", label: "Yarım Altın", emoji: "🥇", rate: 8250.00 },
  { value: "tam", label: "Tam Altın", emoji: "👑", rate: 16500.00 },
  { value: "ons", label: "Ons Altın", emoji: "⭐", rate: 76000.00 },
];

export function GoldCalculator() {
  const [type, setType] = useState("gram");
  const [amount, setAmount] = useState("5");
  const [result, setResult] = useState<{ tryValue: number; unitRate: number } | null>(null);

  const calculate = () => {
    const qty = parseFloat(amount);
    if (!qty || qty <= 0) { setResult(null); return; }
    const selected = GOLD_TYPES.find(g => g.value === type)!;
    setResult({ tryValue: qty * selected.rate, unitRate: selected.rate });
  };

  const reset = () => { setType("gram"); setAmount("5"); setResult(null); };

  useEffect(() => { calculate(); }, [type, amount]);

  const selectedGold = GOLD_TYPES.find(g => g.value === type)!;

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Altın Türü</label>
        <div className="calc-toggle-group" style={{ flexWrap: "wrap", height: "auto", gap: "4px" }}>
          {GOLD_TYPES.map(g => (
            <button key={g.value} className={`calc-toggle-btn ${type === g.value ? "active" : ""}`} onClick={() => setType(g.value)}
              style={{ fontSize: "0.72rem", padding: "0.5rem 0.75rem" }}>
              {g.emoji} {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="calc-input-group">
        <label className="calc-label">Miktar (Adet / Gram)</label>
        <div className="calc-input-wrapper">
          <input type="number" step="0.1" value={amount} onChange={e => setAmount(e.target.value)} className="calc-input has-unit" placeholder="5" min="0" />
          <span className="calc-unit">{type === "gram" ? "gr" : "🪙"}</span>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🥇 Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🥇 Altın TL Karşılığı</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">{amount} Adet {selectedGold.label}</div>
              <div className="calc-result-hero-value" style={{ color: "#eab308" }}>
                {result.tryValue.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
              </div>
              <div className="calc-result-hero-sub">Birim Fiyat: {result.unitRate.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚠️</span>
        <span className="calc-info-box-text">Fiyatlar gerçek zamanlı piyasa verileri değil, gösterim amaçlı sabit oranlardır. Güncel fiyatlar için yetkili kuyumcu veya borsa kaynaklarını kontrol ediniz.</span>
      </div>
    </div>
  );
}
