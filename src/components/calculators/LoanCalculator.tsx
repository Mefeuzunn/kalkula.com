"use client";

import React, { useState } from "react";

export function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(""); // Aylık faiz oranı %
  const [months, setMonths] = useState("");
  const [result, setResult] = useState<{ monthly: string; total: string; interest: string } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const n = parseInt(months);

    if (!p || !r || !n) return;

    // Aylık taksit formülü: P * [ r(1+r)^n ] / [ (1+r)^n - 1 ]
    // r = aylık faiz
    const monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    setResult({
      monthly: monthlyPayment.toLocaleString("tr-TR", { style: "currency", currency: "TRY" }),
      total: totalPayment.toLocaleString("tr-TR", { style: "currency", currency: "TRY" }),
      interest: totalInterest.toLocaleString("tr-TR", { style: "currency", currency: "TRY" }),
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Kredi Tutarı (₺)</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" placeholder="Örn: 100000" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Aylık Faiz Oranı (%)</label>
          <input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} className="input-field" placeholder="Örn: 3.5" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vade (Ay)</label>
          <input type="number" value={months} onChange={e => setMonths(e.target.value)} className="input-field" placeholder="Örn: 24" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Hesapla
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", textAlign: "center" }}>Ödeme Planı Özeti</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--text-muted)" }}>Aylık Taksit Tutarı:</span>
            <span style={{ fontWeight: "bold", color: "var(--accent-primary)", fontSize: "1.2rem" }}>{result.monthly}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--text-muted)" }}>Toplam Geri Ödeme:</span>
            <span style={{ fontWeight: "bold" }}>{result.total}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Toplam Faiz:</span>
            <span style={{ fontWeight: "bold", color: "#ef4444" }}>{result.interest}</span>
          </div>
        </div>
      )}
    </div>
  );
}
