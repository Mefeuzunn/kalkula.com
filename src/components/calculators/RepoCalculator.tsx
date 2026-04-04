"use client";

import React, { useState } from "react";

export function RepoCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const [tax, setTax] = useState("15"); // Repo stopaj orani varsayilan %15 (Yasal degisimlere gore esnektir)
  
  const [result, setResult] = useState<{ grossInterest: number; netReturn: number; totalAmount: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const d = parseFloat(days);
    const t = parseFloat(tax) / 100;

    if (p > 0 && r > 0 && d > 0) {
      // Brüt Repo Getirisi = P * r * (d / 365)
      const grossInterest = p * r * (d / 365);
      
      // Net Repo Getirisi = Brüt - (Brüt * Stopaj)
      const netReturn = grossInterest * (1 - t);
      
      // Toplam Geri Dönüş
      const totalAmount = p + netReturn;

      setResult({ grossInterest, netReturn, totalAmount });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Bankalar arası gecelik veya vadeli repo (Menkul Kıymet Geri Alma Taahhüdü) işlemlerinizdeki kazancınızı hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Repo'ya Girecek Anapara (₺)</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" placeholder="Örn: 100000" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yıllık Basit Repo Faizi (%)</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="input-field" placeholder="Örn: 48" step="0.1" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
           <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vade Günü</label>
           <input type="number" value={days} onChange={e => setDays(e.target.value)} className="input-field" placeholder="Örn: 1" />
        </div>
        <div style={{ flex: 1 }}>
           <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Stopaj (Vergi) (%)</label>
           <input type="number" value={tax} onChange={e => setTax(e.target.value)} className="input-field" placeholder="Örn: 15" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Repo Getirisini Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", textAlign: "center" }}>Vade Sonu Özeti</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
             <span style={{ color: "var(--text-muted)" }}>Brüt Getiri:</span>
             <span style={{ fontWeight: "bold" }}>{result.grossInterest.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
             <span style={{ color: "var(--text-muted)", fontWeight: "bold" }}>Net Getiri (Kâr):</span>
             <span style={{ fontWeight: "bold", color: "#22c55e" }}>+{result.netReturn.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </div>

          <div style={{ textAlign: "center", marginTop: "1rem", paddingTop: "1rem", borderTop: "2px solid var(--border)" }}>
             <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Toplam Alınacak Para</p>
             <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>
                {result.totalAmount.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
