"use client";

import React, { useState, useEffect } from "react";

export function CreditCardCalculator() {
  const [debt, setDebt] = useState("15000");
  const [limit, setLimit] = useState("50000");
  const [interestRate, setInterestRate] = useState("5.00"); // Current TCMB cap is around 5%
  const [result, setResult] = useState<{ 
    minPayment: number; 
    ratio: number; 
    remaining: number;
    dailyInterest: number;
    monthlyInterest: number;
  } | null>(null);

  const calculate = () => {
    const d = parseFloat(debt);
    const l = parseFloat(limit);
    const r = parseFloat(interestRate);
    if (!d || !l || d <= 0 || l <= 0) { setResult(null); return; }
    
    const ratio = l > 25000 ? 0.40 : 0.20;
    const minPayment = d * ratio;
    const remaining = d - minPayment;
    
    // Daily Interest = Remaining * (Monthly Rate / 100 / 30)
    const dailyInterest = remaining > 0 ? remaining * (r / 100 / 30) : 0;
    const monthlyInterest = dailyInterest * 30;

    setResult({ minPayment, ratio, remaining, dailyInterest, monthlyInterest });
  };

  const reset = () => { 
    setDebt("15000"); 
    setLimit("50000"); 
    setInterestRate("5.00");
    setResult(null); 
  };

  useEffect(() => { calculate(); }, [debt, limit, interestRate]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-3">
        <div className="calc-input-group">
          <label className="calc-label">Kredi Kartı Limiti</label>
          <div className="calc-input-wrapper">
            <input type="number" value={limit} onChange={e => setLimit(e.target.value)} className="calc-input has-unit" placeholder="50000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Dönem Borcu</label>
          <div className="calc-input-wrapper">
            <input type="number" value={debt} onChange={e => setDebt(e.target.value)} className="calc-input has-unit" placeholder="15000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Aylık Akdi Faiz (%)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="calc-input has-unit" placeholder="5.00" step="0.01" min="0" />
            <span className="calc-unit">%</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>💳 Faiz Dahil Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">💳 Asgari Ödeme ve Faiz Analizi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Ödenmesi Gereken Asgari Tutar</div>
              <div className="calc-result-hero-value">{fmt(result.minPayment)}</div>
              <div className="calc-result-hero-sub">Uygulanan Oran: %{(result.ratio * 100).toFixed(0)} — BDDK kuralı</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Günlük Faiz Yükü</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>{fmt(result.dailyInterest)}</div>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>30 Günlük Faiz Maliyeti</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>{fmt(result.monthlyInterest)}</div>
                </div>
            </div>

            <div className="calc-result-row" style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <span className="calc-result-row-label">Kalan Borç (Asgari Sonrası)</span>
              <span className="calc-result-row-value danger">{fmt(result.remaining)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box warning" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
        <span className="calc-info-box-icon">⚠️</span>
        <span className="calc-info-box-text">Sadece asgari ödeme yapılması durumunda kalan borca akdi faiz uygulanır. Faiz maliyeti borca eklenerek bir sonraki dönem borcunuzu oluşturur.</span>
      </div>
    </div>
  );
}
