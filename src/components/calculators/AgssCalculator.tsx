"use client";

import React, { useState, useEffect } from "react";

export function AgssCalculator() {
  const [gkgyCorrect, setGkgyCorrect] = useState("45");
  const [gkgyWrong, setGkgyWrong] = useState("10");
  const [alanCorrect, setAlanCorrect] = useState("60");
  const [alanWrong, setAlanWrong] = useState("15");
  const [result, setResult] = useState<{ net: number; point: number; gkgyNet: number; alanNet: number } | null>(null);

  const calculate = () => {
    const gkgyC = parseFloat(gkgyCorrect) || 0;
    const gkgyW = parseFloat(gkgyWrong) || 0;
    const alanC = parseFloat(alanCorrect) || 0;
    const alanW = parseFloat(alanWrong) || 0;

    const gkgyNet = Math.max(0, gkgyC - (gkgyW / 4));
    const alanNet = Math.max(0, alanC - (alanW / 4));
    const totalNet = gkgyNet + alanNet;
    const point = 50 + (gkgyNet * 0.4) + (alanNet * 0.5);

    if (totalNet > 0) {
      setResult({ net: totalNet, point: point, gkgyNet, alanNet });
    } else {
      setResult(null);
    }
  };

  const reset = () => { setGkgyCorrect("45"); setGkgyWrong("10"); setAlanCorrect("60"); setAlanWrong("15"); setResult(null); };

  useEffect(() => { calculate(); }, [gkgyCorrect, gkgyWrong, alanCorrect, alanWrong]);

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div>
          <div className="calc-section-title">Genel Yetenek / G. Kültür</div>
          <div className="calc-input-group" style={{ marginBottom: "0.5rem" }}>
            <label className="calc-label">Doğru Sayısı</label>
            <input type="number" value={gkgyCorrect} onChange={e => setGkgyCorrect(e.target.value)} className="calc-input" style={{ borderColor: "#22c55e", color: "#22c55e" }} placeholder="45" min="0" />
          </div>
          <div className="calc-input-group">
            <label className="calc-label">Yanlış Sayısı</label>
            <input type="number" value={gkgyWrong} onChange={e => setGkgyWrong(e.target.value)} className="calc-input" style={{ borderColor: "#ef4444", color: "#ef4444" }} placeholder="10" min="0" />
          </div>
        </div>
        <div>
          <div className="calc-section-title">Akademik Personel Alan Bilgisi</div>
          <div className="calc-input-group" style={{ marginBottom: "0.5rem" }}>
            <label className="calc-label">Doğru Sayısı</label>
            <input type="number" value={alanCorrect} onChange={e => setAlanCorrect(e.target.value)} className="calc-input" style={{ borderColor: "#22c55e", color: "#22c55e" }} placeholder="60" min="0" />
          </div>
          <div className="calc-input-group">
            <label className="calc-label">Yanlış Sayısı</label>
            <input type="number" value={alanWrong} onChange={e => setAlanWrong(e.target.value)} className="calc-input" style={{ borderColor: "#ef4444", color: "#ef4444" }} placeholder="15" min="0" />
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🎓 Puanı Analiz Et</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🎓 AGS Sınav Performansı</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Tahmini AGS Puanı</div>
              <div className="calc-result-hero-value" style={{ color: "var(--accent-primary)", fontSize: "3.5rem" }}>{result.point.toFixed(2)}</div>
              <div className="calc-result-hero-sub">Olası Standart Sapma Dahil Değildir</div>
            </div>
            
            <div className="calc-result-cards" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <div className="calc-result-card" style={{ borderTop: "4px solid var(--accent-primary)" }}>
                <div className="calc-result-card-label" style={{ color: "var(--accent-primary)" }}>Toplam Net</div>
                <div className="calc-result-card-value">{result.net.toFixed(2)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">GKGY Neti</div>
                <div className="calc-result-card-value font-bold">{result.gkgyNet.toFixed(2)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Alan Bilgisi Neti</div>
                <div className="calc-result-card-value font-bold">{result.alanNet.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Hesaplama, genel katsayı ortalamalarına göre 4 yanlışın 1 doğruyu götürdüğü varsayımsal projeksiyonlar kullanılarak yapılmıştır.</span>
      </div>
    </div>
  );
}
