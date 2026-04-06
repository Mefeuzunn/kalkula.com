"use client";

import React, { useState, useEffect } from "react";

export function EbobEkokCalculator() {
  const [num1, setNum1] = useState("24");
  const [num2, setNum2] = useState("36");
  const [result, setResult] = useState<{ ebob: number; ekok: number } | null>(null);

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  const calculate = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) { setResult(null); return; }
    const ebob = gcd(a, b);
    const ekok = (a * b) / ebob;
    setResult({ ebob, ekok });
  };

  const reset = () => { setNum1("24"); setNum2("36"); setResult(null); };

  useEffect(() => { calculate(); }, [num1, num2]);

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">1. Sayı</label>
          <input type="number" value={num1} onChange={e => setNum1(e.target.value)} className="calc-input" placeholder="24" min="1" step="1" />
        </div>
        <div className="calc-input-group">
          <label className="calc-label">2. Sayı</label>
          <input type="number" value={num2} onChange={e => setNum2(e.target.value)} className="calc-input" placeholder="36" min="1" step="1" />
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🔢 Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🔢 EBOB & EKOK Sonuçları</div>
          <div className="calc-result-body">
            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">🔵 EBOB</div>
                <div className="calc-result-card-value" style={{ fontSize: "2.5rem", color: "var(--accent-primary)" }}>{result.ebob}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>En Büyük Ortak Bölen</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">🟢 EKOK</div>
                <div className="calc-result-card-value" style={{ fontSize: "2.5rem", color: "#22c55e" }}>{result.ekok}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>En Küçük Ortak Kat</div>
              </div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">EBOB × EKOK</span>
              <span className="calc-result-row-value">{(result.ebob * result.ekok).toLocaleString("tr-TR")}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">{num1} × {num2}</span>
              <span className="calc-result-row-value">{(parseInt(num1) * parseInt(num2)).toLocaleString("tr-TR")} ✓</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">EBOB × EKOK = A × B özelliği her zaman geçerlidir. Öklid Algoritması kullanılarak hesaplanmaktadır.</span>
      </div>
    </div>
  );
}
