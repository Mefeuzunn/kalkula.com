"use client";

import React, { useState } from "react";

export function BillCalculator() {
  const [nominal, setNominal] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [result, setResult] = useState<{ annualYield: number; profit: number } | null>(null);

  const calculate = () => {
    const n = parseFloat(nominal);
    const p = parseFloat(price);
    const d = parseFloat(days);

    if (n > 0 && p > 0 && d > 0 && n > p) {
      const profit = n - p;
      // İskontolu Bono Yıllık Basit Getirisi (Verim) = [(Nominal / Fiyat) - 1] * (365 / Gün) * 100
      const annualYield = ((n / p) - 1) * (365 / d) * 100;
      setResult({ annualYield, profit });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Hazine Bonosu, Finansman Bonosu gibi iskontolu (kuponsuz) senetlerin getirisini hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vade Sonu Nominal Değer (₺)</label>
        <input type="number" value={nominal} onChange={e => setNominal(e.target.value)} className="input-field" placeholder="Örn: 100000" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Bugünkü İşlem Fiyatı (₺)</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input-field" placeholder="Örn: 92000" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vadeye Kalan Gün</label>
        <input type="number" value={days} onChange={e => setDays(e.target.value)} className="input-field" placeholder="Örn: 90" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Bono Verimini Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Yıllıklandırılmış Basit Getiri</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)", marginTop: "0.5rem" }}>
            %{result.annualYield.toFixed(2)}
          </div>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginTop: "1rem" }}>
            Vade Sonundaki Net Kârınız: <span style={{ fontWeight: "bold", color: "#22c55e" }}>{result.profit.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
          </p>
        </div>
      )}
    </div>
  );
}
