"use client";

import React, { useState, useEffect } from "react";

export function BillCalculator() {
  const [nominal, setNominal] = useState("100000");
  const [price, setPrice] = useState("92000");
  const [days, setDays] = useState("90");
  const [result, setResult] = useState<{ annualYield: number; profit: number; dayReturn: number } | null>(null);

  const calculate = () => {
    const n = parseFloat(nominal);
    const p = parseFloat(price);
    const d = parseFloat(days);
    if (n > 0 && p > 0 && d > 0 && n > p) {
      const profit = n - p;
      const annualYield = ((n / p) - 1) * (365 / d) * 100;
      const dayReturn = (profit / p) * 100;
      setResult({ annualYield, profit, dayReturn });
    } else setResult(null);
  };

  const reset = () => { setNominal("100000"); setPrice("92000"); setDays("90"); setResult(null); };

  useEffect(() => { calculate(); }, [nominal, price, days]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Vade Sonu Nominal Değer</label>
        <div className="calc-input-wrapper">
          <input type="number" value={nominal} onChange={e => setNominal(e.target.value)} className="calc-input has-unit" placeholder="100000" min="0" />
          <span className="calc-unit">₺</span>
        </div>
      </div>
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Bugünkü İşlem Fiyatı</label>
          <div className="calc-input-wrapper">
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="calc-input has-unit" placeholder="92000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Vadeye Kalan Gün</label>
          <div className="calc-input-wrapper">
            <input type="number" value={days} onChange={e => setDays(e.target.value)} className="calc-input has-unit" placeholder="90" min="1" />
            <span className="calc-unit">GÜN</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📄 Bono Verimini Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📄 Hazine Bonosu / Finansman Bonosu Getirisi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Yıllıklandırılmış Basit Getiri</div>
              <div className="calc-result-hero-value" style={{ color: "#22c55e" }}>%{result.annualYield.toFixed(2)}</div>
              <div className="calc-result-hero-sub">{days} günlük vade için</div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Vade Sonu Net Kâr</span>
              <span className="calc-result-row-value success">+{fmt(result.profit)}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Dönemsel Getiri ({days} gün)</span>
              <span className="calc-result-row-value accent">%{result.dayReturn.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">📋</span>
        <span className="calc-info-box-text">Hazine Bonosu, Finansman Bonosu gibi iskontolu (kuponsuz) menkul kıymetler için yıllık getiri oranı hesaplanır. Vergi kesilmeden önceki brüt verim gösterilmektedir.</span>
      </div>
    </div>
  );
}
