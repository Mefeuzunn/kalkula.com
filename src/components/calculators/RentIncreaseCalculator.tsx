"use client";

import React, { useState, useEffect } from "react";

type PropertyType = "konut" | "isyeri";

export function RentIncreaseCalculator() {
  const [currentRent, setCurrentRent] = useState("15000");
  const [propertyType, setPropertyType] = useState<PropertyType>("konut");
  const [inflationRate, setInflationRate] = useState("65.93");
  
  const [results, setResults] = useState<{ increaseAmount: number; newRent: number; increaseRate: number; legalStatus: string; } | null>(null);

  const calculate = () => {
    const rent = parseFloat(currentRent) || 0;
    const rate = parseFloat(inflationRate) || 0;

    if (rent <= 0) { setResults(null); return; }

    const increaseRate = rate;
    const increaseAmount = rent * (increaseRate / 100);
    const newRent = rent + increaseAmount;

    setResults({
      increaseAmount, newRent, increaseRate,
      legalStatus: "12 Aylık TÜFE Ortalaması (Yasal Sınır)"
    });
  };

  const reset = () => { setCurrentRent("15000"); setPropertyType("konut"); setInflationRate("65.93"); setResult(null); };

  useEffect(() => { calculate(); }, [currentRent, propertyType, inflationRate]);

  return (
    <div className="calc-wrapper">
      <div className="calc-toggle-group" style={{ marginBottom: "1rem" }}>
         <button className={`calc-toggle-btn ${propertyType === "konut" ? "active" : ""}`} onClick={() => setPropertyType("konut")}>🏘️ KONUT</button>
         <button className={`calc-toggle-btn ${propertyType === "isyeri" ? "active" : ""}`} onClick={() => setPropertyType("isyeri")}>🏢 İŞYERİ</button>
      </div>

      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Mevcut Kira Bedeli</label>
          <div className="calc-input-wrapper">
             <input type="number" value={currentRent} onChange={e => setCurrentRent(e.target.value)} className="calc-input has-unit" placeholder="15000" min="0" />
             <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>TÜFE (12 Aylık Ort.)</span>
            <span style={{ fontSize: "0.6rem", background: "var(--accent-primary)", color: "#fff", padding: "2px 6px", borderRadius: "4px" }}>Resmi Sınır</span>
          </label>
          <div className="calc-input-wrapper">
             <input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="calc-input has-unit" placeholder="65.93" step="0.1" min="0" />
             <span className="calc-unit">%</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📈 Yeni Kirayı Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {results && (
        <div className="calc-result-panel">
          <div className="calc-result-header">⚖️ Resmi Kira Artış Sınırı Analizi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Yeni Aylık Kira (Maksimum)</div>
              <div className="calc-result-hero-value" style={{ color: "#f59e0b", fontSize: "3.5rem" }}>
                 {results.newRent.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} <span style={{ fontSize: "2rem", opacity: 0.6 }}>₺</span>
              </div>
              <div className="calc-result-hero-sub" style={{ marginTop: "0.5rem" }}>
                Artış Miktarı: +{results.increaseAmount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚖️</span>
        <span className="calc-info-box-text">Temmuz 2024 itibarıyla konutlarda %25 sınırı kalkmıştır. Hem konut hem işyerinde yasal tavan artış oranı, son 12 ayın TÜFE ortalamasıdır. Kiracıdan bu oranın üzerinde artış talep edilemez.</span>
      </div>
    </div>
  );
}
