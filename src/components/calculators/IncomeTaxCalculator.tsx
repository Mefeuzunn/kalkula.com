"use client";

import React, { useState, useEffect } from "react";

export function IncomeTaxCalculator() {
  const [brutto, setBrutto] = useState("50000"); // Aylık Brüt
  const [period, setPeriod] = useState("aylik");
  const [year, setYear] = useState("2025");
  
  const [results, setResults] = useState<{
    yearlyGross: number; brackets: { rate: number; taxable: number; tax: number; range: string }[];
    totalTax: number; effectiveRate: number; yearlyNet: number; avgMonthlyNet: number;
  } | null>(null);

  const TAX_DATA: any = {
    "2024": [ { limit: 110000, rate: 0.15 }, { limit: 230000, rate: 0.20 }, { limit: 580000, rate: 0.27 }, { limit: 3000000, rate: 0.35 }, { limit: Infinity, rate: 0.40 } ],
    "2025": [ { limit: 158000, rate: 0.15 }, { limit: 330000, rate: 0.20 }, { limit: 840000, rate: 0.27 }, { limit: 4300000, rate: 0.35 }, { limit: Infinity, rate: 0.40 } ]
  };

  const calculate = () => {
    const monthlyGross = parseFloat(brutto) || 0;
    const yearlyGross = period === "aylik" ? monthlyGross * 12 : monthlyGross;
    if (yearlyGross <= 0) { setResults(null); return; }

    const yearBrackets = TAX_DATA[year];
    let totalTax = 0; let remaining = yearlyGross; let prevLimit = 0; const bracketDetails = [];

    for (const b of yearBrackets) {
      const taxableInRange = Math.min(remaining, b.limit - prevLimit);
      if (taxableInRange <= 0) break;
      const tax = taxableInRange * b.rate;
      totalTax += tax; remaining -= taxableInRange;
      bracketDetails.push({ rate: b.rate * 100, taxable: taxableInRange, tax: tax, range: `${prevLimit.toLocaleString()} - ${b.limit === Infinity ? '∞' : b.limit.toLocaleString()} TL` });
      prevLimit = b.limit;
    }

    const yearlyNet = yearlyGross - totalTax;
    setResults({ yearlyGross, brackets: bracketDetails, totalTax, effectiveRate: (totalTax / yearlyGross) * 100, yearlyNet, avgMonthlyNet: yearlyNet / 12 });
  };

  const reset = () => { setBrutto("50000"); setPeriod("aylik"); setYear("2025"); setResults(null); };

  useEffect(() => { calculate(); }, [brutto, period, year]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });

  return (
    <div className="calc-wrapper">
      <div className="calc-flex-row" style={{ gap: "1rem", flexWrap: "wrap" }}>
        <div className="calc-input-group" style={{ flex: "2" }}>
          <label className="calc-label">Brüt Gelir (₺)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={brutto} onChange={e => setBrutto(e.target.value)} className="calc-input has-unit" placeholder="50000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group" style={{ flex: "1" }}>
          <label className="calc-label">Periyot</label>
          <select value={period} onChange={e => setPeriod(e.target.value)} className="calc-select">
            <option value="aylik">Aylık</option>
            <option value="yillik">Yıllık</option>
          </select>
        </div>
        <div className="calc-input-group" style={{ flex: "1" }}>
          <label className="calc-label">Vergi Yılı</label>
          <select value={year} onChange={e => setYear(e.target.value)} className="calc-select">
            <option value="2025">2025 (Tahmini)</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📉 Vergimi Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {results && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🏢 Gelir Vergisi Beyanname Projeksiyonu</div>
          <div className="calc-result-body">
            <div className="calc-result-hero" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), transparent)" }}>
              <div className="calc-result-hero-label text-indigo-500">Yıllık Net Kazancınız</div>
              <div className="calc-result-hero-value text-indigo-600" style={{ fontSize: "3rem" }}>{fmt(results.yearlyNet)}</div>
              <div className="calc-result-hero-sub mt-2">Ortalama Aylık Net: {fmt(results.avgMonthlyNet)}</div>
            </div>

            <div className="calc-result-cards" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Brüt Gelir (Yıllık)</div>
                <div className="calc-result-card-value text-primary">{fmt(results.yearlyGross)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Toplam Vergi Yükü</div>
                <div className="calc-result-card-value text-red-500">{fmt(results.totalTax)}</div>
              </div>
            </div>

            <div className="mt-4">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span className="calc-result-row-label">Vergi Dilimi Dağılımı</span>
                <span className="calc-result-row-value accent">Efektif: %{results.effectiveRate.toFixed(1)}</span>
              </div>
              <div className="calc-scale-bar" style={{ height: "12px", background: "var(--border)", display: "flex" }}>
                {results.brackets.map((b, idx) => (
                  <div key={idx} style={{ 
                    width: `${(b.taxable / results.yearlyGross) * 100}%`, 
                    background: idx === 0 ? '#818cf8' : idx === 1 ? '#6366f1' : idx === 2 ? '#4f46e5' : idx === 3 ? '#3730a3' : '#312e81',
                    borderRight: "1px solid rgba(255,255,255,0.2)"
                  }} title={`%${b.rate} Dilim`} />
                ))}
              </div>
            </div>

            <div className="mt-4" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {results.brackets.map((b, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "0.8rem" }}>
                   <div style={{ color: "var(--text-muted)" }}>%{b.rate} Dilimi (<span style={{ fontSize: "0.7rem", opacity: 0.7 }}>{b.range}</span>)</div>
                   <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{fmt(b.tax)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">📌</span>
        <span className="calc-info-box-text">Gelir vergisi dilim usulü hesaplanır. Üst dilime geçildiğinde kümülatif matrah dilim sınırını aşan kısmı için yüksek vergi ödenir. 2025 rakamları yeniden değerleme oranına göre tahmini girilmiştir.</span>
      </div>
    </div>
  );
}
