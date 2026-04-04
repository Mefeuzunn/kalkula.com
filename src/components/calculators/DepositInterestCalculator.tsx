"use client";

import React, { useState } from "react";

export function DepositInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [days, setDays] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [taxRate, setTaxRate] = useState("7.5"); // Turkiye genelinde en kisa mevduat stopaji guncelleme gorevi gorebilir.

  const [result, setResult] = useState<{ gross: number; net: number; taxAmount: number; totalEnd: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const d = parseFloat(days);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(taxRate) / 100;

    if (p > 0 && d > 0 && r > 0) {
      // Brüt faiz = Anapara * Faiz Orani * (Gun / 365)
      const gross = p * r * (d / 365);
      
      // Net Faiz ve Stopaj
      const taxAmount = gross * t;
      const net = gross - taxAmount;
      const totalEnd = p + net;

      setResult({ gross, net, taxAmount, totalEnd });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Bankaya yatırılan paranın stopaj kesintisi dahil vade sonundaki net kazancını detaylı görün.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yatırılacak Anapara (₺)</label>
        <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="input-field" placeholder="Örn: 250000" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yıllık Faiz Oranı (%)</label>
        <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="input-field" placeholder="Örn: 48" step="0.1" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
           <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vade Günü</label>
           <input type="number" value={days} onChange={e => setDays(e.target.value)} className="input-field" placeholder="Örn: 32" />
        </div>
        <div style={{ flex: 1 }}>
           <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Stopaj Kesintisi (%)</label>
           <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="input-field" placeholder="Örn: 7.5" step="0.1" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Mevduat Getirisini Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", textAlign: "center" }}>Kazanç Analizi</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
             <span style={{ color: "var(--text-muted)" }}>Brüt Kazanç (Kesinti Öncesi):</span>
             <span style={{ fontWeight: "bold" }}>{result.gross.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
             <span style={{ color: "var(--text-muted)" }}>Kesilen Stopaj (Vergi):</span>
             <span style={{ fontWeight: "bold", color: "#ef4444" }}>-{result.taxAmount.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
             <span style={{ color: "var(--text-muted)", fontWeight: "bold" }}>Müşteriye Kalan Net Faiz:</span>
             <span style={{ fontWeight: "bold", color: "#22c55e" }}>+{result.net.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>

          <div style={{ textAlign: "center", paddingTop: "1rem", borderTop: "2px solid var(--border)" }}>
             <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Vade Sonu Toplam Tutar</p>
             <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
                {result.totalEnd.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
