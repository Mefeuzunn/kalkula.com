"use client";

import React, { useState } from "react";

export function NetGrossCalculator() {
  const [net, setNet] = useState("");
  const [result, setResult] = useState<{ gross: number; tax: number; sgk: number } | null>(null);

  const calculate = () => {
    const n = parseFloat(net);
    if (!n) return;

    // Basit tahmini Türkiye SGK ve Gelir Vergisi formülasyonu (Gerçek senaryoda çok daha komplike dilimler vardır)
    // SGK İşçi (%14), İşsizlik (%1), Gelir Vergisi (%15 taban), Damga (%0.759)
    // Brüt = Net / (1 - (0.14 + 0.01 + 0.15 + 0.00759)) yaklaşık olarak => Net / 0.7145 civarı.
    
    // Yüzdesel paylar
    const totalDeductionRate = 0.285; 
    const gross = n / (1 - totalDeductionRate);
    
    const sgk = gross * 0.15; // İşçi payı + işsizlik
    const tax = gross * 0.15 + gross * 0.00759; // Basit vergi

    setResult({ gross, tax, sgk });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Aylık Net Maaş (₺)</label>
        <input type="number" value={net} onChange={e => setNet(e.target.value)} className="input-field" placeholder="Örn: 17002" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Brüt Maaşı Hesapla
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", textAlign: "center" }}>Tahmini Maaş Hesaplaması</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--text-muted)" }}>Tahmini Brüt Maaş:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "var(--accent-primary)" }}>
              {result.gross.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ color: "var(--text-muted)" }}>SGK Kesintileri:</span>
            <span style={{ fontWeight: "bold" }}>
              {result.sgk.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Gelir ve Damga Vergisi:</span>
            <span style={{ fontWeight: "bold" }}>
              {result.tax.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
            </span>
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
            * Bu hesaplama giriş seviyesi algoritmalarla yapılmış taban orana sahip tahmini bir değerdir. Vergi diliminiz değiştikçe rakamlar farklılık gösterebilir.
          </p>
        </div>
      )}
    </div>
  );
}
