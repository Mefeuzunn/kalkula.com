"use client";

import React, { useState, useEffect } from "react";

export function SavingsCalculator() {
  const [initialAmount, setInitialAmount] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("1000");
  const [years, setYears] = useState("5");
  const [annualRate, setAnnualRate] = useState("40");
  const [result, setResult] = useState<{ totalValue: number; totalPrincipal: number; totalInterest: number; growthRate: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(initialAmount) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const y = parseFloat(years) || 0;
    const r = parseFloat(annualRate) / 100 || 0;
    if (y <= 0) { setResult(null); return; }
    const monthlyRate = r / 12;
    const totalMonths = y * 12;
    const fvPrincipal = p * Math.pow(1 + monthlyRate, totalMonths);
    const fvContributions = monthlyRate > 0
      ? pmt * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
      : pmt * totalMonths;
    const totalValue = fvPrincipal + fvContributions;
    const totalPrincipal = p + (pmt * totalMonths);
    const totalInterest = totalValue - totalPrincipal;
    const growthRate = totalPrincipal > 0 ? (totalInterest / totalPrincipal) * 100 : 0;
    setResult({ totalValue, totalPrincipal, totalInterest, growthRate });
  };

  const reset = () => { setInitialAmount("10000"); setMonthlyContribution("1000"); setYears("5"); setAnnualRate("40"); setResult(null); };

  useEffect(() => { calculate(); }, [initialAmount, monthlyContribution, years, annualRate]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Başlangıç Birikimi</label>
          <div className="calc-input-wrapper">
            <input type="number" value={initialAmount} onChange={e => setInitialAmount(e.target.value)} className="calc-input has-unit" placeholder="10000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Aylık Katkı</label>
          <div className="calc-input-wrapper">
            <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="calc-input has-unit" placeholder="1000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Yatırım Süresi</label>
          <div className="calc-input-wrapper">
            <input type="number" value={years} onChange={e => setYears(e.target.value)} className="calc-input has-unit" placeholder="5" min="1" />
            <span className="calc-unit">YIL</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Yıllık Faiz Oranı</label>
          <div className="calc-input-wrapper">
            <input type="number" value={annualRate} onChange={e => setAnnualRate(e.target.value)} className="calc-input has-unit" placeholder="40" min="0" />
            <span className="calc-unit">%</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📈 Birikimi Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">💰 Birikim Projeksiyonu</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">{years} Yıl Sonraki Toplam Değer</div>
              <div className="calc-result-hero-value">{fmt(result.totalValue)}</div>
              <div className="calc-result-hero-sub">Toplam büyüme: %{result.growthRate.toFixed(0)}</div>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Toplam Yatırdığınız (Anapara)</span>
              <span className="calc-result-row-value">{fmt(result.totalPrincipal)}</span>
            </div>
            <div className="calc-result-row">
              <span className="calc-result-row-label">Toplam Faiz Getirisi</span>
              <span className="calc-result-row-value success">+{fmt(result.totalInterest)}</span>
            </div>
            <div style={{ paddingTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Faiz / Anapara Oranı</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#22c55e" }}>%{result.growthRate.toFixed(0)}</span>
              </div>
              <div className="calc-scale-bar">
                <div className="calc-scale-fill" style={{ width: `${Math.min(result.growthRate, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">📊</span>
        <span className="calc-info-box-text">Bileşik faiz hesaplaması yapılmaktadır. Aylık faiz aylık anaparaya eklenerek büyüme sağlanır. Gerçek getiri enflasyona göre farklılık gösterebilir.</span>
      </div>
    </div>
  );
}
