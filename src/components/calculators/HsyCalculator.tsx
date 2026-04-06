"use client";

import React, { useState, useEffect } from "react";

export function HsyCalculator() {
  const [gkgyCorrect, setGkgyCorrect] = useState("22");
  const [gkgyWrong, setGkgyWrong] = useState("4");
  const [alanCorrect, setAlanCorrect] = useState("55");
  const [alanWrong, setAlanWrong] = useState("10");
  const [result, setResult] = useState<{ gkNet: number; alNet: number; gkPoint: number; alPoint: number; totalPoint: number } | null>(null);

  const calculate = () => {
    const gkC = parseFloat(gkgyCorrect) || 0;
    const gkW = parseFloat(gkgyWrong) || 0;
    const alC = parseFloat(alanCorrect) || 0;
    const alW = parseFloat(alanWrong) || 0;

    const gkNet = Math.max(0, gkC - (gkW / 4));
    const alNet = Math.max(0, alC - (alW / 4));

    const gkPoint = (gkNet / 30) * 20;
    const alPoint = (alNet / 70) * 80;

    setResult({ gkNet, alNet, gkPoint, alPoint, totalPoint: gkPoint + alPoint });
  };

  const reset = () => { setGkgyCorrect("22"); setGkgyWrong("4"); setAlanCorrect("55"); setAlanWrong("10"); setResult(null); };

  useEffect(() => { calculate(); }, [gkgyCorrect, gkgyWrong, alanCorrect, alanWrong]);

  return (
    <div className="calc-wrapper">
      <div className="calc-section">
        <div className="calc-section-title">🏛️ GY-GK (30 Soru — Etki: %20)</div>
        <div className="calc-grid-2">
          <div className="calc-input-group">
            <label className="calc-label">Doğru</label>
            <input type="number" value={gkgyCorrect} onChange={e => setGkgyCorrect(e.target.value)} className="calc-input" placeholder="22" min="0" max="30" />
          </div>
          <div className="calc-input-group">
            <label className="calc-label">Yanlış</label>
            <input type="number" value={gkgyWrong} onChange={e => setGkgyWrong(e.target.value)} className="calc-input" placeholder="4" min="0" max="30" />
          </div>
        </div>
      </div>

      <div className="calc-section">
        <div className="calc-section-title">⚖️ Alan Bilgisi (70 Soru — Etki: %80)</div>
        <div className="calc-grid-2">
          <div className="calc-input-group">
            <label className="calc-label">Doğru</label>
            <input type="number" value={alanCorrect} onChange={e => setAlanCorrect(e.target.value)} className="calc-input" placeholder="55" min="0" max="70" />
          </div>
          <div className="calc-input-group">
            <label className="calc-label">Yanlış</label>
            <input type="number" value={alanWrong} onChange={e => setAlanWrong(e.target.value)} className="calc-input" placeholder="10" min="0" max="70" />
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>⚖️ Tahmini Puanı Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">⚖️ HSY Sınav Sonucu Projeksiyonu</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Tahmini Puan (Standart Sapma Hariç)</div>
              <div className="calc-result-hero-value" style={{ color: result.totalPoint >= 70 ? "#22c55e" : "#ef4444" }}>
                {result.totalPoint.toFixed(2)}
              </div>
              <div className="calc-result-hero-sub">Mülakata çağrılma taban puanı her yıl değişmekle birlikte genellikle 70+ beklenir</div>
            </div>
            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">GY-GK Net</div>
                <div className="calc-result-card-value">{result.gkNet}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Katkı: {result.gkPoint.toFixed(1)}/20</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Alan Bilgisi Net</div>
                <div className="calc-result-card-value">{result.alNet}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Katkı: {result.alPoint.toFixed(1)}/80</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">ℹ️</span>
        <span className="calc-info-box-text">ÖSYM sisteminde her 4 yanlış 1 doğruyu götürür. Yukarıdaki puanlama varsayımsal net üzerinden yapılmıştır; gerçek sonuçlarda Türkiye geneli standart sapma puan tablosunu değiştirebilir.</span>
      </div>
    </div>
  );
}
