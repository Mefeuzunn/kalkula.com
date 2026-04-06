"use client";

import React, { useState, useEffect } from "react";

export function DesiCalculator() {
  const [width, setWidth] = useState("30");
  const [length, setLength] = useState("40");
  const [height, setHeight] = useState("20");
  const [divisor, setDivisor] = useState("3000");

  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(width) || 0;
    const l = parseFloat(length) || 0;
    const h = parseFloat(height) || 0;
    const d = parseFloat(divisor) || 3000;

    if (w > 0 && l > 0 && h > 0) {
      setResult((w * l * h) / d);
    } else {
      setResult(null);
    }
  };

  useEffect(() => { calculate(); }, [width, length, height, divisor]);

  const reset = () => {
    setWidth("30");
    setLength("40");
    setHeight("20");
    setDivisor("3000");
    setResult(null);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-3">
        <div className="calc-input-group">
          <label className="calc-label">Genişlik (см)</label>
          <input type="number" value={width} onChange={e => setWidth(e.target.value)} className="calc-input" placeholder="30" />
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Uzunluk (см)</label>
          <input type="number" value={length} onChange={e => setLength(e.target.value)} className="calc-input" placeholder="40" />
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Yükseklik (см)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="calc-input" placeholder="20" />
        </div>
      </div>

      <div className="calc-input-group">
        <label className="calc-label">Hesaplama Standartı</label>
        <div className="grid grid-cols-2 gap-4">
          <button 
            className={`calc-input border-2 transition-all ${divisor === "3000" ? "border-accent-primary bg-accent-primary/10" : "border-border"}`}
            onClick={() => setDivisor("3000")}
          >
            <div className="font-bold">Yurtiçi (3000)</div>
          </button>
          <button 
            className={`calc-input border-2 transition-all ${divisor === "5000" ? "border-accent-primary bg-accent-primary/10" : "border-border"}`}
            onClick={() => setDivisor("5000")}
          >
            <div className="font-bold">Yurtdışı (5000)</div>
          </button>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📦 Desi Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result !== null && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🔢 Kargo Desi Hacmi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Hesaplanan Desi</div>
              <div className="calc-result-hero-value" style={{ color: "#f59e0b" }}>{result.toFixed(2)}</div>
              <div className="calc-result-hero-sub">Hacim: {((parseFloat(width)*parseFloat(length)*parseFloat(height))/1000).toFixed(1)} Litre</div>
            </div>
            
            <div className="calc-result-row">
              <span className="calc-result-row-label">Formül</span>
              <span className="calc-result-row-value italic opacity-60">(E x B x Y) / {divisor}</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
         <span className="calc-info-box-icon">📦</span>
         <span className="calc-info-box-text">Desi, kargo gönderilerinde hacimsel ağırlığı ifade eder. Kargo şirketleri faturayı gerçek ağırlık ile desi değerinden hangisi büyükse onun üzerinden hesaplar.</span>
      </div>
    </div>
  );
}
