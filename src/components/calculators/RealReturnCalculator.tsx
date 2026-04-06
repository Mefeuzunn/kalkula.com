"use client";

import React, { useState, useEffect } from "react";

export function RealReturnCalculator() {
  const [nominalRate, setNominalRate] = useState("45");
  const [inflationRate, setInflationRate] = useState("60");
  const [result, setResult] = useState<{ realRate: number; isPositive: boolean } | null>(null);

  const calculate = () => {
    const nr = parseFloat(nominalRate) / 100;
    const infl = parseFloat(inflationRate) / 100;

    if (!isNaN(nr) && !isNaN(infl)) {
      const realRate = ((1 + nr) / (1 + infl) - 1) * 100;
      setResult({ realRate, isPositive: realRate >= 0 });
    } else {
      setResult(null);
    }
  };

  const reset = () => { setNominalRate("45"); setInflationRate("60"); setResult(null); };

  useEffect(() => { calculate(); }, [nominalRate, inflationRate]);

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Yıllık Nominal Getiri</label>
          <div className="calc-input-wrapper">
            <input type="number" value={nominalRate} onChange={e => setNominalRate(e.target.value)} className="calc-input has-unit" placeholder="45" step="0.1" />
            <span className="calc-unit">%</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Tahmini Enflasyon</label>
          <div className="calc-input-wrapper">
            <input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="calc-input has-unit" style={{ borderColor: "#ef4444", color: "#ef4444" }} placeholder="60" step="0.1" />
            <span className="calc-unit">%</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📉 Reel Getiri Analizi</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📈 Net Alım Gücü Analizi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero" style={{ background: result.isPositive ? "linear-gradient(135deg, rgba(34,197,94,0.1), transparent)" : "linear-gradient(135deg, rgba(239,68,68,0.1), transparent)" }}>
              <div className="calc-result-hero-label" style={{ color: result.isPositive ? "#22c55e" : "#ef4444" }}>
                {result.isPositive ? "Enflasyon Üstü Reel Kazanç" : "Enflasyon Altı Reel Kayıp"}
              </div>
              <div className="calc-result-hero-value" style={{ color: result.isPositive ? "#22c55e" : "#ef4444", fontSize: "3.5rem" }}>
                %{result.realRate.toFixed(2)}
              </div>
            </div>
            
            <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: result.isPositive ? "#166534" : "#991b1b", background: result.isPositive ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", padding: "1rem", borderRadius: "8px", border: `1px solid ${result.isPositive ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}` }}>
              {result.isPositive 
                 ? "✨ Tebrikler! Yatırımınız enflasyon canavarını yenmiş. Paranızın alım gücü artmış ve gerçekten zenginleşmişsiniz." 
                 : "⚠️ Dikkat! Para miktarınız rakamsal olarak artsa da enflasyonun gerisinde kalmış. Alım gücünüz maalesef eriyor."}
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Reel getiri hesaplamasında Fisher Denklemi [(1+Nominal)/(1+Enflasyon)-1] kullanılır. Yüksek enflasyonlu ortamlarda basit çıkarma işlemi (Nominal - Enflasyon) hatalı sonuçlar verir.</span>
      </div>
    </div>
  );
}
