"use client";

import React, { useState } from "react";

export function DividendCalculator() {
  const [shareCount, setShareCount] = useState("");
  const [avgCost, setAvgCost] = useState("");
  const [dividendPerShare, setDividendPerShare] = useState("");
  const [result, setResult] = useState<{ totalDividend: number; yieldPercent: number; yieldOnCost: number } | null>(null);

  const calculate = () => {
    const shares = parseFloat(shareCount);
    const cost = parseFloat(avgCost);
    const div = parseFloat(dividendPerShare);

    if (shares > 0 && cost > 0 && div >= 0) {
      // Toplam Alınacak Temettu
      const totalDividend = shares * div;
      
      // Temettu Verimi (Karşılaştırması zordur ancak maliyete göre verimlilik, Yield-on-Cost - YOC)
      const yieldOnCost = (div / cost) * 100;
      
      // Eger sadece fiyata gore olsaydi genel Yield kullanilirdi. Burada maliyete oran bulunuyor.
      setResult({ totalDividend, yieldPercent: 0, yieldOnCost });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Hisse senedi yatırımlarınızın size sağladığı temettü (kâr payı) miktarını ve maliyete göre verimini (Yield on Cost) hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Hisse Adeti (Lot)</label>
        <input type="number" value={shareCount} onChange={e => setShareCount(e.target.value)} className="input-field" placeholder="Örn: 2000" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Ortalama Maliyetiniz (Hisse Başı ₺)</label>
        <input type="number" value={avgCost} onChange={e => setAvgCost(e.target.value)} className="input-field" placeholder="Örn: 45.50" step="0.01" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Hisse Başına Açıklanan Net Temettü (₺)</label>
        <input type="number" value={dividendPerShare} onChange={e => setDividendPerShare(e.target.value)} className="input-field" placeholder="Örn: 2.30" step="0.01" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Temettü ve Verim Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Toplam Kâr Payınız</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
             {result.totalDividend.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
             Yatırım Maliyetinize Göre Veriminiz (YOC): <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>%{result.yieldOnCost.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
