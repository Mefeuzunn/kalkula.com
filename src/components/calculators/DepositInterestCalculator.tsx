"use client";

import React, { useState, useEffect } from "react";

export function DepositInterestCalculator() {
  const [principal, setPrincipal] = useState("250000");
  const [days, setDays] = useState("32");
  const [interestRate, setInterestRate] = useState("48");
  const [taxRate, setTaxRate] = useState("7.5"); // Turkiye genelinde kisa vadeli stopaj orani
  const [result, setResult] = useState<{ gross: number; net: number; taxAmount: number; totalEnd: number; dailyNet: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const d = parseFloat(days);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(taxRate) / 100;
    if (p > 0 && d > 0 && r > 0) {
      const gross = p * r * (d / 365);
      const taxAmount = gross * t;
      const net = gross - taxAmount;
      const totalEnd = p + net;
      const dailyNet = net / d;
      setResult({ gross, net, taxAmount, totalEnd, dailyNet });
    } else {
      setResult(null);
    }
  };

  const reset = () => { setPrincipal("250000"); setDays("32"); setInterestRate("48"); setTaxRate("7.5"); setResult(null); };

  useEffect(() => { calculate(); }, [principal, days, interestRate, taxRate]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Yatırılacak Anapara</label>
        <div className="calc-input-wrapper">
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="calc-input has-unit" placeholder="250000" min="0" />
          <span className="calc-unit">₺</span>
        </div>
      </div>
      <div className="calc-grid-3">
        <div className="calc-input-group">
          <label className="calc-label">Faiz Oranı</label>
          <div className="calc-input-wrapper">
            <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="calc-input has-unit" placeholder="48" step="0.1" min="0" />
            <span className="calc-unit">%</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Vade</label>
          <div className="calc-input-wrapper">
            <input type="number" value={days} onChange={e => setDays(e.target.value)} className="calc-input has-unit" placeholder="32" min="1" />
            <span className="calc-unit">GÜN</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Stopaj</label>
          <div className="calc-input-wrapper">
            <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="calc-input has-unit" placeholder="7.5" step="0.1" min="0" />
            <span className="calc-unit">%</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>🏦 Mevduat Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">🏦 Mevduat Getiri Analizi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Vade Sonu Toplam Tutar</div>
              <div className="calc-result-hero-value" style={{ color: "var(--accent-primary)", fontSize: "2.5rem" }}>{fmt(result.totalEnd)}</div>
              <div className="calc-result-hero-sub">Müşteriye net kalan faiz: {fmt(result.net)}</div>
            </div>
            <div className="calc-result-cards" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Brüt Kazanç</div>
                <div className="calc-result-card-value font-bold">{fmt(result.gross)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Vergi (Stopaj)</div>
                <div className="calc-result-card-value text-red-500 font-bold">-{fmt(result.taxAmount)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Günlük Net</div>
                <div className="calc-result-card-value text-green-500 font-bold">{fmt(result.dailyNet)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">⚖️</span>
        <span className="calc-info-box-text">Mevduat getirisinden devlet tarafından vadeye göre değişen oranlarda stopaj (gelir vergisi) kesilir. Burada girdiğiniz stopaj oranına göre brüt kazançtan vergi düşülerek net kazanç bulunur.</span>
      </div>
    </div>
  );
}
