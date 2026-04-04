"use client";

import React, { useState } from "react";

export function GoldCalculator() {
  const [type, setType] = useState("gram");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<number | null>(null);

  // Mock rates against TRY
  const rates: Record<string, number> = {
    gram: 2450.50,
    ceyrek: 4125.00,
    yarim: 8250.00,
    tam: 16500.00,
    ons: 76000.00 // yaklasik ons bazli try
  };

  const calculate = () => {
    const qty = parseFloat(amount);
    if (!qty || qty <= 0) return;
    const rate = rates[type];
    setResult(qty * rate);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Altınınızı güncel (simülasyon) verilere göre TL karşılığına çevirin.</p>
      
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Altın Türü</label>
          <select value={type} onChange={e => setType(e.target.value)} className="input-field">
            <option value="gram">Gram Altın</option>
            <option value="ceyrek">Çeyrek Altın</option>
            <option value="yarim">Yarım Altın</option>
            <option value="tam">Tam Altın</option>
            <option value="ons">Ons Altın</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Miktar (Adet/Gram)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" placeholder="Örn: 5" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Karşılığını Hesapla</button>

      {result !== null && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Toplam Türk Lirası Karşılığı</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#eab308", marginTop: "0.5rem" }}>
            {result.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "1rem" }}>* Veriler anlık piyasa değil, varsayımsal sabit oranlardır.</p>
        </div>
      )}
    </div>
  );
}
