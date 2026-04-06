"use client";

import React, { useState, useEffect } from "react";

export function DiscountCalculator() {
  const [faceValue, setFaceValue] = useState("50000");
  const [rate, setRate] = useState("36");
  const [days, setDays] = useState("90");
  const [result, setResult] = useState<{ dsDiscount: number; isDiscount: number; dsNet: number; isNet: number } | null>(null);

  const calculate = () => {
    const fv = parseFloat(faceValue);
    const r = parseFloat(rate) / 100;
    const d = parseFloat(days);
    if (fv > 0 && r > 0 && d > 0) {
      const t = d / 365;
      const dsDiscount = fv * r * t;
      const dsNet = fv - dsDiscount;
      const isDiscount = (fv * r * t) / (1 + (r * t));
      const isNet = fv - isDiscount;
      setResult({ dsDiscount, isDiscount, dsNet, isNet });
    } else {
      setResult(null);
    }
  };

  const reset = () => { setFaceValue("50000"); setRate("36"); setDays("90"); setResult(null); };

  useEffect(() => { calculate(); }, [faceValue, rate, days]);

  const fmt = (val: number) => val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Senetin Nominal Değeri (Vadedeki Tutar)</label>
        <div className="calc-input-wrapper">
          <input type="number" value={faceValue} onChange={e => setFaceValue(e.target.value)} className="calc-input has-unit" placeholder="50000" min="0" />
          <span className="calc-unit">₺</span>
        </div>
      </div>
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Yıllık İskonto Oranı</label>
          <div className="calc-input-wrapper">
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="calc-input has-unit" placeholder="36" step="0.1" min="0" />
            <span className="calc-unit">%</span>
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
        <button className="calc-btn-calculate" onClick={calculate}>📉 Kesintileri Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📉 İskonto (Kırdırma) Analizi</div>
          <div className="calc-result-body">
            <div className="calc-result-cards" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="calc-result-card" style={{ borderTop: "4px solid var(--accent-primary)" }}>
                <div className="calc-result-card-label" style={{ color: "var(--accent-primary)" }}>İç İskonto (Net Kazanılan)</div>
                <div className="calc-result-card-value font-bold">{fmt(result.isNet)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Kesinti: {fmt(result.isDiscount)}</div>
              </div>
              <div className="calc-result-card" style={{ borderTop: "4px solid #ef4444" }}>
                <div className="calc-result-card-label" style={{ color: "#ef4444" }}>Dış İskonto (Net Kazanılan)</div>
                <div className="calc-result-card-value font-bold">{fmt(result.dsNet)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Kesinti: {fmt(result.dsDiscount)}</div>
              </div>
            </div>
            
            <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)", background: "var(--surface)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
              <p style={{ marginBottom: "0.5rem" }}><span style={{ color: "var(--accent-primary)", fontWeight: "bold" }}>İç İskonto: </span>Matematiksel olarak en adil yöntemdir. Senetin peşin değeri üzerinden ayrılan faizi baz alır.</p>
              <p><span style={{ color: "#ef4444", fontWeight: "bold" }}>Dış İskonto: </span>Bankaların genellikle kullandığı (ticari) yöntemdir. Nominal değer üzerinden hesaplandığı için banka lehine kesinti daha yüksektir.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
