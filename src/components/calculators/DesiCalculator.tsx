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
          <label className="calc-label">Genişlik (cm)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={width} onChange={e => setWidth(e.target.value)} className="calc-input has-unit" placeholder="30" />
            <span className="calc-unit">cm</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Uzunluk (cm)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={length} onChange={e => setLength(e.target.value)} className="calc-input has-unit" placeholder="40" />
            <span className="calc-unit">cm</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Yükseklik (cm)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="calc-input has-unit" placeholder="20" />
            <span className="calc-unit">cm</span>
          </div>
        </div>
      </div>

      <div className="calc-input-group">
        <label className="calc-label">Hesaplama Standartı</label>
        <div className="calc-toggle-group">
          <button 
            className={`calc-toggle-btn ${divisor === "3000" ? "active" : ""}`}
            onClick={() => setDivisor("3000")}
          >
            Yurtiçi (3000)
          </button>
          <button 
            className={`calc-toggle-btn ${divisor === "5000" ? "active" : ""}`}
            onClick={() => setDivisor("5000")}
          >
            Yurtdışı (5000)
          </button>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📦 Desi Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result !== null && (
        <div className="calc-result-panel animate-result">
          <div className="calc-result-header">🔢 Kargo Desi Hacmi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Hesaplanan Desi</div>
              <div className="calc-result-hero-value warning">{result.toFixed(2)}</div>
              <div className="calc-result-hero-sub">Hacim: {((parseFloat(width)*parseFloat(length)*parseFloat(height))/1000).toFixed(1)} Litre</div>
            </div>
            
            <div className="calc-result-row">
              <span className="calc-result-row-label">Hesaplama Formülü</span>
              <span className="calc-result-row-value accent">(EksBxY) / {divisor}</span>
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
