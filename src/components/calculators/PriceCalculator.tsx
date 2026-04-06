"use client";

import React, { useState, useEffect } from "react";

export function PriceCalculator() {
  const [cost, setCost] = useState("100");
  const [margin, setMargin] = useState("30");
  const [tax, setTax] = useState("20");
  const [result, setResult] = useState<{ profitAmount: number; priceExTax: number; priceWithTax: number; taxAmount: number } | null>(null);

  const calculate = () => {
    const c = parseFloat(cost) || 0;
    const m = parseFloat(margin) || 0;
    const t = parseFloat(tax) || 0;
    if (c <= 0) { setResult(null); return; }
    const profitAmount = c * (m / 100);
    const priceExTax = c + profitAmount;
    const taxAmount = priceExTax * (t / 100);
    const priceWithTax = priceExTax + taxAmount;
    setResult({ profitAmount, priceExTax, taxAmount, priceWithTax });
  };

  const reset = () => { setCost("100"); setMargin("30"); setTax("20"); setResult(null); };

  useEffect(() => { calculate(); }, [cost, margin, tax]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Ürün Birim Maliyeti</label>
        <div className="calc-input-wrapper">
          <input type="number" value={cost} onChange={e => setCost(e.target.value)} className="calc-input has-unit" placeholder="100" min="0" />
          <span className="calc-unit">₺</span>
        </div>
      </div>
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Hedeflenen Kâr Marjı</label>
          <div className="calc-input-wrapper">
            <input type="number" value={margin} onChange={e => setMargin(e.target.value)} className="calc-input has-unit" placeholder="30" min="0" />
            <span className="calc-unit">%</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">KDV Oranı</label>
          <select value={tax} onChange={e => setTax(e.target.value)} className="calc-select">
            <option value="0">%0 KDV</option>
            <option value="1">%1 KDV</option>
            <option value="10">%10 KDV</option>
            <option value="20">%20 KDV</option>
          </select>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🏷️ Fiyat Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🏷️ Fiyatlandırma Özeti</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">KDV Dahil Satış Fiyatı</div>
              <div className="calc-result-hero-value">{fmt(result.priceWithTax)}</div>
              <div className="calc-result-hero-sub">KDV Hariç: {fmt(result.priceExTax)}</div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Birim Maliyet</span>
              <span className="calc-result-row-value">{fmt(parseFloat(cost))}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Birim Kâr (%{margin})</span>
              <span className="calc-result-row-value success">+{fmt(result.profitAmount)}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">KDV Tutarı (%{tax})</span>
              <span className="calc-result-row-value warning">+{fmt(result.taxAmount)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Kâr marjı, maliyetin üzerine eklenen yüzde oranıdır. Örneğin %30 marj ile 100 ₺'lik ürün 130 ₺'ye satılır, kâr payı 30 ₺'dir.</span>
      </div>
    </div>
  );
}
