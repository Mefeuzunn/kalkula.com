"use client";

import React, { useState } from "react";

export function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState(""); // Yıllık faiz oranı %
  const [days, setDays] = useState("");
  const [result, setResult] = useState<{ netInterest: number; totalAmount: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const d = parseInt(days);

    if (!p || !r || !d) return;

    // Basit günlük faiz getirisi = Anapara * (Yıllık Faiz / 365) * Gün
    const grossInterest = p * (r / 365) * d;
    
    // Stopaj vergisi genelde %5 ila %15 civarı değişiyor, simülasyon için %5 kabul edelim.
    const taxRate = 0.05;
    const netInterest = grossInterest * (1 - taxRate);
    
    const totalAmount = p + netInterest;

    setResult({ netInterest, totalAmount });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yatırılacak Tutar (₺)</label>
        <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="input-field" placeholder="Örn: 200000" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yıllık Faiz Oranı (%)</label>
          <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className="input-field" placeholder="Örn: 48.5" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vade (Gün)</label>
          <input type="number" value={days} onChange={e => setDays(e.target.value)} className="input-field" placeholder="Örn: 32" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Getiriyi Hesapla
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", textAlign: "center" }}>Vadeli Mevduat Kazancı</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--text-muted)" }}>Vade Sonu Net Getiri:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#22c55e" }}>
              +{result.netInterest.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Toplam Tutar:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "var(--accent-primary)" }}>
               {result.totalAmount.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
            </span>
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
            * %5 standart stopaj kesintisi hesaba katılmıştır. Banka bazlı değişiklik gösterebilir.
          </p>
        </div>
      )}
    </div>
  );
}
