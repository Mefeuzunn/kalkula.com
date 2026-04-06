"use client";

import React, { useState, useEffect } from "react";

export function CreditCardCalculator() {
  const [debt, setDebt] = useState("15000");
  const [limit, setLimit] = useState("50000");
  const [result, setResult] = useState<{ minPayment: number; ratio: number; remaining: number } | null>(null);

  const calculate = () => {
    const d = parseFloat(debt);
    const l = parseFloat(limit);
    if (!d || !l || d <= 0 || l <= 0) { setResult(null); return; }
    const ratio = l > 25000 ? 0.40 : 0.20;
    const minPayment = d * ratio;
    const remaining = d - minPayment;
    setResult({ minPayment, ratio, remaining });
  };

  const reset = () => { setDebt("15000"); setLimit("50000"); setResult(null); };

  useEffect(() => { calculate(); }, [debt, limit]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Kredi Kartı Limiti</label>
          <div className="calc-input-wrapper">
            <input type="number" value={limit} onChange={e => setLimit(e.target.value)} className="calc-input has-unit" placeholder="50000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Dönem Borcu</label>
          <div className="calc-input-wrapper">
            <input type="number" value={debt} onChange={e => setDebt(e.target.value)} className="calc-input has-unit" placeholder="15000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>💳 Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">💳 Asgari Ödeme Tutarı</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Ödenmesi Gereken Asgari Tutar</div>
              <div className="calc-result-hero-value">{fmt(result.minPayment)}</div>
              <div className="calc-result-hero-sub">Uygulanan Oran: %{(result.ratio * 100).toFixed(0)} — BDDK kuralı</div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Kalan Borç (Asgari Sonrası)</span>
              <span className="calc-result-row-value danger">{fmt(result.remaining)}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Toplam Dönem Borcu</span>
              <span className="calc-result-row-value">{fmt(parseFloat(debt))}</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">📋</span>
        <span className="calc-info-box-text">BDDK kuralına göre kart limiti 25.000 ₺ ve altında %20, üzerinde ise %40 asgari ödeme oranı uygulanır. Sadece asgari ödeme yapılması faiz yükünü artırır.</span>
      </div>
    </div>
  );
}
