"use client";

import React, { useState, useEffect } from "react";

export function NetGrossCalculator() {
  const [net, setNet] = useState("25000");
  const [result, setResult] = useState<{ gross: number; sgk: number; tax: number; unemploy: number; stamp: number } | null>(null);

  const calculate = () => {
    const n = parseFloat(net);
    if (!n || n <= 0) { setResult(null); return; }
    // SGK işçi: %14, İşsizlik: %1, Gelir Vergisi: ~%15 (taban dilim), Damga: %0.759
    const totalDeductionRate = 0.14 + 0.01 + 0.15 + 0.00759;
    const gross = n / (1 - totalDeductionRate);
    const sgk = gross * 0.14;
    const unemploy = gross * 0.01;
    const tax = gross * 0.15;
    const stamp = gross * 0.00759;
    setResult({ gross, sgk, tax, unemploy, stamp });
  };

  const reset = () => { setNet("25000"); setResult(null); };

  useEffect(() => { calculate(); }, [net]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Aylık Net Maaş</label>
        <div className="calc-input-wrapper">
          <input type="number" value={net} onChange={e => setNet(e.target.value)} className="calc-input has-unit" placeholder="25000" min="0" />
          <span className="calc-unit">₺</span>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>⚡ Brüt Maaşı Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">💼 Tahmini Maaş Bileşenleri</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Tahmini Brüt Maaş</div>
              <div className="calc-result-hero-value">{fmt(result.gross)}</div>
              <div className="calc-result-hero-sub">İşveren maliyeti ayrıca %22.5 SGK işveren payı eklenecektir</div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">SGK İşçi Payı (%14)</span>
              <span className="calc-result-row-value danger">−{fmt(result.sgk)}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">İşsizlik Sigortası (%1)</span>
              <span className="calc-result-row-value danger">−{fmt(result.unemploy)}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Gelir Vergisi (Taban %15)</span>
              <span className="calc-result-row-value danger">−{fmt(result.tax)}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Damga Vergisi (%0.759)</span>
              <span className="calc-result-row-value danger">−{fmt(result.stamp)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚠️</span>
        <span className="calc-info-box-text">Bu hesaplama taban vergi dilimi (%15) esas alınarak yapılmış tahmini bir değerdir. Gerçek brüt maaşınız, vergi diliminize ve lokantalar gibi avantajlara göre farklılık gösterebilir.</span>
      </div>
    </div>
  );
}
