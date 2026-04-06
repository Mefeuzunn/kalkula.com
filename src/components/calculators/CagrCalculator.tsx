"use client";

import React, { useState, useEffect } from "react";

export function CagrCalculator() {
  const [initialValue, setInitialValue] = useState("10000");
  const [finalValue, setFinalValue] = useState("25000");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<{ cagr: number; totalReturn: number } | null>(null);

  const calculate = () => {
    const start = parseFloat(initialValue);
    const end = parseFloat(finalValue);
    const y = parseFloat(years);
    if (start > 0 && end > 0 && y > 0) {
      const cagr = (Math.pow(end / start, 1 / y) - 1) * 100;
      const totalReturn = ((end - start) / start) * 100;
      setResult({ cagr, totalReturn });
    } else setResult(null);
  };

  const reset = () => { setInitialValue("10000"); setFinalValue("25000"); setYears("5"); setResult(null); };

  useEffect(() => { calculate(); }, [initialValue, finalValue, years]);

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Başlangıç Değeri</label>
        <div className="calc-input-wrapper">
          <input type="number" value={initialValue} onChange={e => setInitialValue(e.target.value)} className="calc-input has-unit" placeholder="10000" min="0" />
          <span className="calc-unit">₺</span>
        </div>
      </div>
      <div className="calc-input-group">
        <label className="calc-label">Bitiş Değeri</label>
        <div className="calc-input-wrapper">
          <input type="number" value={finalValue} onChange={e => setFinalValue(e.target.value)} className="calc-input has-unit" placeholder="25000" min="0" />
          <span className="calc-unit">₺</span>
        </div>
      </div>
      <div className="calc-input-group">
        <label className="calc-label">Geçen Süre</label>
        <div className="calc-input-wrapper">
          <input type="number" value={years} onChange={e => setYears(e.target.value)} className="calc-input has-unit" placeholder="5" min="1" />
          <span className="calc-unit">YIL</span>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📈 CAGR Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📊 Bileşik Büyüme Analizi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Yıllık Bileşik Büyüme Oranı (CAGR)</div>
              <div className="calc-result-hero-value" style={{ color: result.cagr >= 0 ? "#22c55e" : "#ef4444" }}>
                %{result.cagr.toFixed(2)}
              </div>
              <div className="calc-result-hero-sub">{years} yıllık dönem için yıllıklandırılmış getiri</div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Toplam Getiri</span>
              <span className="calc-result-row-value" style={{ color: result.totalReturn >= 0 ? "#22c55e" : "#ef4444" }}>
                {result.totalReturn >= 0 ? "+" : ""}{result.totalReturn.toFixed(1)}%
              </span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Net Kazanç</span>
              <span className="calc-result-row-value success">
                +{(parseFloat(finalValue) - parseFloat(initialValue)).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">CAGR (Bileşik Yıllık Büyüme Oranı), farklı sürelerdeki yatırımları karşılaştırmak için kullanılır. Gerçek getirinin her yıl sabit kaldığını varsayar.</span>
      </div>
    </div>
  );
}
