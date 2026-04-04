"use client";

import React, { useState } from "react";

type Cheque = { id: number; amount: string; days: string };

export function AverageMaturityCalculator() {
  const [cheques, setCheques] = useState<Cheque[]>([
    { id: 1, amount: "", days: "" },
    { id: 2, amount: "", days: "" }
  ]);
  const [result, setResult] = useState<{ averageDays: number; totalAmount: number } | null>(null);

  const calculate = () => {
    let sumAmount = 0;
    let sumWeighted = 0;

    cheques.forEach(c => {
      const a = parseFloat(c.amount) || 0;
      const d = parseFloat(c.days) || 0;

      if (a > 0 && d >= 0) {
        sumAmount += a;
        sumWeighted += (a * d);
      }
    });

    if (sumAmount > 0) {
      setResult({ averageDays: sumWeighted / sumAmount, totalAmount: sumAmount });
    } else {
      setResult(null);
    }
  };

  const updateField = (id: number, field: "amount" | "days", val: string) => {
    setCheques(cheques.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const addRow = () => {
    setCheques([...cheques, { id: Date.now(), amount: "", days: "" }]);
  };

  const removeRow = (id: number) => {
    setCheques(cheques.filter(c => c.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Tahsil edilecek birden fazla çek veya senedin tutar ve gün ağırlıklı gerçek ortalama vadesini bulun.</p>

      <div className="panel" style={{ padding: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 40px", gap: "1rem", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <div>Tutar (₺)</div>
          <div>Vadeye Kalan Gün</div>
          <div></div>
        </div>

        {cheques.map(c => (
          <div key={c.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 40px", gap: "1rem", marginBottom: "1rem", alignItems: "center" }}>
            <input type="number" value={c.amount} onChange={e => updateField(c.id, "amount", e.target.value)} className="input-field" placeholder="Örn: 50000" />
            <input type="number" value={c.days} onChange={e => updateField(c.id, "days", e.target.value)} className="input-field" placeholder="Örn: 45" />
            <button onClick={() => removeRow(c.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>✕</button>
          </div>
        ))}
        
        <button onClick={addRow} style={{ color: "var(--accent-primary)", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>+ Yeni Çek Ekle</button>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Ortalama Vadeyi Hesapla</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
           <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Ağırlıklı Ortalama Vade</h3>
           <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
              {Math.round(result.averageDays)} Gün
           </div>
           <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>
              Kesin: {result.averageDays.toFixed(2)} Gün
           </p>
           <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Toplam Ödeme: <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>{result.totalAmount.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
           </p>
        </div>
      )}
    </div>
  );
}
