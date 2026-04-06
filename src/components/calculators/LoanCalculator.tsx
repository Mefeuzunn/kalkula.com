"use client";

import React, { useState, useEffect } from "react";

export function LoanCalculator() {
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("3.5");
  const [months, setMonths] = useState("24");
  const [result, setResult] = useState<{ monthly: string; total: string; interest: string; interestRaw: number; totalRaw: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const n = parseInt(months);
    if (!p || !r || !n || p <= 0 || r <= 0 || n <= 0) { setResult(null); return; }
    const monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;
    setResult({
      monthly: monthlyPayment.toLocaleString("tr-TR", { style: "currency", currency: "TRY" }),
      total: totalPayment.toLocaleString("tr-TR", { style: "currency", currency: "TRY" }),
      interest: totalInterest.toLocaleString("tr-TR", { style: "currency", currency: "TRY" }),
      interestRaw: totalInterest,
      totalRaw: totalPayment,
    });
  };

  const reset = () => { setAmount("100000"); setRate("3.5"); setMonths("24"); setResult(null); };

  useEffect(() => { calculate(); }, [amount, rate, months]);

  const interestPercent = result ? Math.min((result.interestRaw / result.totalRaw) * 100, 100) : 0;

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group" style={{ gridColumn: "1 / -1" }}>
          <label className="calc-label">Kredi Tutarı</label>
          <div className="calc-input-wrapper">
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="calc-input has-unit" placeholder="100000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Aylık Faiz Oranı</label>
          <div className="calc-input-wrapper">
            <input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} className="calc-input has-unit" placeholder="3.5" min="0" />
            <span className="calc-unit">%</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Vade</label>
          <div className="calc-input-wrapper">
            <input type="number" value={months} onChange={e => setMonths(e.target.value)} className="calc-input has-unit" placeholder="24" min="1" />
            <span className="calc-unit">AY</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>⚡ Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📊 Ödeme Planı Özeti</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Aylık Taksit Tutarı</div>
              <div className="calc-result-hero-value">{result.monthly}</div>
              <div className="calc-result-hero-sub">{months} ay boyunca düzenli ödeme</div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Toplam Geri Ödeme</span>
              <span className="calc-result-row-value">{result.total}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Toplam Faiz Yükü</span>
              <span className="calc-result-row-value danger">{result.interest}</span>
            </div>
            <div style={{ paddingTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span className="calc-result-row-label">Faiz / Toplam Oranı</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-primary)" }}>%{interestPercent.toFixed(1)}</span>
              </div>
              <div className="calc-scale-bar">
                <div className="calc-scale-fill" style={{ width: `${interestPercent}%`, background: "linear-gradient(90deg, #22c55e, #ef4444)" }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Aylık faiz oranını bankanızdan öğrenebilirsiniz. Yıllık faiz oranını 12'ye bölerek aylık oranı hesaplayabilirsiniz.</span>
      </div>
    </div>
  );
}
