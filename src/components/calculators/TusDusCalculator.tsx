"use client";

import React, { useState, useEffect } from "react";

export function TusDusCalculator() {
  const [tt1, setTt1] = useState("85");
  const [tk, setTk] = useState("90");
  const [result, setResult] = useState<{ klinik: number; temel: number } | null>(null);

  const calculate = () => {
    const t1 = parseFloat(tt1);
    const k = parseFloat(tk);
    if (isNaN(t1) || isNaN(k) || t1 < 0 || k < 0) { setResult(null); return; }
    // TUS Yaklaşık Puan Formülü
    const pKlinik = 40 + (k * 0.45) + (t1 * 0.25);
    const pTemel = 40 + (t1 * 0.45) + (k * 0.25);
    setResult({ klinik: pKlinik, temel: pTemel });
  };

  const reset = () => { setTt1("85"); setTk("90"); setResult(null); };

  useEffect(() => { calculate(); }, [tt1, tk]);

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Temel Tıp Neti (0-120)</label>
          <input type="number" value={tt1} onChange={e => setTt1(e.target.value)} className="calc-input" placeholder="85" min="0" max="120" />
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Klinik Tıp Neti (0-120)</label>
          <input type="number" value={tk} onChange={e => setTk(e.target.value)} className="calc-input" placeholder="90" min="0" max="120" />
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🩺 Puanları Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🩺 Sınav Tahmin Sonucu</div>
          <div className="calc-result-body">
            <div className="calc-result-cards" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="calc-result-card" style={{ borderTop: "4px solid var(--accent-primary)" }}>
                <div className="calc-result-card-label" style={{ color: "var(--accent-primary)" }}>Klinik Puanı</div>
                <div className="calc-result-card-value">{result.klinik.toFixed(2)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Tercih Puanı (K)</div>
              </div>
              <div className="calc-result-card" style={{ borderTop: "4px solid var(--accent-secondary)" }}>
                <div className="calc-result-card-label" style={{ color: "var(--accent-secondary)" }}>Temel Puanı</div>
                <div className="calc-result-card-value">{result.temel.toFixed(2)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Bilim Puanı (T)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Bu hesaplama, genel sınav ortalaması ve standart sapmaların geçmiş yıllara paralel olduğu varsayımıyla tahmini üretilmiştir. Gerçek puanlar ±2 puan değişkenlik gösterebilir.</span>
      </div>
    </div>
  );
}
