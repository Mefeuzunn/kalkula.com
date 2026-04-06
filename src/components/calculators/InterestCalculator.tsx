"use client";

import React, { useState, useEffect } from "react";

export function InterestCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("48.5");
  const [days, setDays] = useState("32");
  const [result, setResult] = useState<{ grossInterest: number; netInterest: number; totalAmount: number; taxAmount: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const d = parseInt(days);
    if (!p || !r || !d || p <= 0 || r <= 0 || d <= 0) { setResult(null); return; }
    const grossInterest = p * (r / 365) * d;
    const taxRate = 0.05;
    const taxAmount = grossInterest * taxRate;
    const netInterest = grossInterest * (1 - taxRate);
    const totalAmount = p + netInterest;
    setResult({ grossInterest, netInterest, totalAmount, taxAmount });
  };

  const reset = () => { setPrincipal("100000"); setRate("48.5"); setDays("32"); setResult(null); };

  useEffect(() => { calculate(); }, [principal, rate, days]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Yatırılacak Tutar</label>
        <div className="calc-input-wrapper">
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="calc-input has-unit" placeholder="100000" min="0" />
          <span className="calc-unit">₺</span>
        </div>
      </div>
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Yıllık Faiz Oranı</label>
          <div className="calc-input-wrapper">
            <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className="calc-input has-unit" placeholder="48.5" min="0" />
            <span className="calc-unit">%</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Vade</label>
          <div className="calc-input-wrapper">
            <input type="number" value={days} onChange={e => setDays(e.target.value)} className="calc-input has-unit" placeholder="32" min="1" />
            <span className="calc-unit">GÜN</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>⚡ Getiriyi Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">💰 Vadeli Mevduat Getirisi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Vade Sonu Net Getiri</div>
              <div className="calc-result-hero-value" style={{ color: "#22c55e" }}>+{fmt(result.netInterest)}</div>
              <div className="calc-result-hero-sub">%5 stopaj kesintisi uygulandı</div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Brüt Faiz Getirisi</span>
              <span className="calc-result-row-value">{fmt(result.grossInterest)}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Stopaj Vergisi (%5)</span>
              <span className="calc-result-row-value danger">−{fmt(result.taxAmount)}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Vade Sonu Toplam Tutar</span>
              <span className="calc-result-row-value accent">{fmt(result.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">ℹ️</span>
        <span className="calc-info-box-text">Stopaj oranı banka ve vadeye göre %5–%15 arasında değişebilir. Bu hesaplama %5 stopaj esas alınmıştır.</span>
      </div>
    </div>
  );
}
