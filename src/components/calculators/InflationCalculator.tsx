"use client";

import React, { useState, useEffect } from "react";

export function InflationCalculator() {
  const [amount, setAmount] = useState("1000");
  const [inflationRate, setInflationRate] = useState("50");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<{ futureCost: number; purchasingPower: number; lossRate: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(inflationRate) / 100;
    const y = parseInt(years);
    if (!a || !r || !y || a <= 0 || r <= 0 || y <= 0) { setResult(null); return; }
    const futureCost = a * Math.pow(1 + r, y);
    const purchasingPower = a / Math.pow(1 + r, y);
    const lossRate = ((a - purchasingPower) / a) * 100;
    setResult({ futureCost, purchasingPower, lossRate });
  };

  const reset = () => { setAmount("1000"); setInflationRate("50"); setYears("5"); setResult(null); };

  useEffect(() => { calculate(); }, [amount, inflationRate, years]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Hesaplanacak Tutar</label>
        <div className="calc-input-wrapper">
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="calc-input has-unit" placeholder="1000" min="0" />
          <span className="calc-unit">₺</span>
        </div>
      </div>
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Yıllık Ortalama Enflasyon</label>
          <div className="calc-input-wrapper">
            <input type="number" step="0.1" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="calc-input has-unit" placeholder="50" min="0" />
            <span className="calc-unit">%</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Süre</label>
          <div className="calc-input-wrapper">
            <input type="number" value={years} onChange={e => setYears(e.target.value)} className="calc-input has-unit" placeholder="5" min="1" />
            <span className="calc-unit">YIL</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📉 Enflasyon Etkisini Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📊 Alım Gücü Analizi — {years} Yıl</div>
          <div className="calc-result-body">
            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">🛒 Aynı Ürünün Fiyatı</div>
                <div className="calc-result-card-value" style={{ color: "#ef4444", fontSize: "1.2rem" }}>{fmt(result.futureCost)}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{years} yıl sonra</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">💸 Paranızın Değeri</div>
                <div className="calc-result-card-value" style={{ color: "#f59e0b", fontSize: "1.2rem" }}>{fmt(result.purchasingPower)}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{years} yıl sonra</div>
              </div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Alım Gücü Kaybı</span>
              <span className="calc-result-row-value danger">%{result.lossRate.toFixed(1)}</span>
            </div>
            <div style={{ paddingTop: "0.5rem" }}>
              <div className="calc-scale-bar">
                <div className="calc-scale-fill" style={{ width: `${Math.min(result.lossRate, 100)}%`, background: "linear-gradient(90deg, #f59e0b, #ef4444)" }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">📌</span>
        <span className="calc-info-box-text">Enflasyon paranızın alım gücünü düşürür. Bugün {amount} ₺'ye aldığınız ürün, %{inflationRate} enflasyonla {years} yıl sonra ~{result ? result.futureCost.toFixed(0) : "?"} ₺'ye çıkacaktır.</span>
      </div>
    </div>
  );
}
