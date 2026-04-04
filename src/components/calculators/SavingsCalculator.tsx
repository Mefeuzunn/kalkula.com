"use client";

import React, { useState } from "react";

export function SavingsCalculator() {
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [years, setYears] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");
  const [result, setResult] = useState<{ totalValue: number; totalInterest: number; totalContributions: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(initialAmount) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const y = parseFloat(years) || 0;
    const r = parseFloat(annualInterestRate) / 100 || 0;

    if (y <= 0) return;

    // Aylık faiz oranı
    const monthlyRate = r / 12;
    const totalMonths = y * 12;

    // Bileşik Faizli Gelecek Değer: FV = P(1+r)^n + PMT [ ((1+r)^n - 1) / r ]
    let futureValueOfPrincipal = p * Math.pow(1 + monthlyRate, totalMonths);
    
    let futureValueOfContributions = 0;
    if (monthlyRate > 0) {
      futureValueOfContributions = pmt * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    } else {
      futureValueOfContributions = pmt * totalMonths;
    }

    const totalValue = futureValueOfPrincipal + futureValueOfContributions;
    const totalContributions = p + (pmt * totalMonths);
    const totalInterest = totalValue - totalContributions;

    setResult({ totalValue, totalInterest, totalContributions });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Aylık düzenli yatırımlarınızın faiz getirisiyle birlikte gelecekteki değerini görün.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Başlangıç Birikimi (Mevcut Para) (₺)</label>
        <input type="number" value={initialAmount} onChange={e => setInitialAmount(e.target.value)} className="input-field" placeholder="Örn: 5000" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Aylık Düzenli Tasarruf (Eklenen Katkı) (₺)</label>
        <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="input-field" placeholder="Örn: 1000" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yatırım Süresi (Yıl)</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="Örn: 10" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yıllık Ortalama Faiz (%)</label>
          <input type="number" value={annualInterestRate} onChange={e => setAnnualInterestRate(e.target.value)} className="input-field" placeholder="Örn: 25" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Birikimi Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1rem", textAlign: "center" }}>Birikim Sonucu</h3>
          
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--accent-primary)", textAlign: "center", marginBottom: "1.5rem" }}>
            {result.totalValue.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Sizin Toplam Yatırdığınız Tutar:</span>
            <span style={{ fontWeight: "bold" }}>{result.totalContributions.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
            <span style={{ color: "var(--text-muted)", fontWeight: "bold" }}>Elde Edilen Faiz Getirisi:</span>
            <span style={{ fontWeight: "bold", color: "#22c55e" }}>+{result.totalInterest.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
        </div>
      )}
    </div>
  );
}
