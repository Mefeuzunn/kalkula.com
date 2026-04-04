"use client";

import React, { useState } from "react";

export function CreditCardCalculator() {
  const [debt, setDebt] = useState("");
  const [limit, setLimit] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const d = parseFloat(debt);
    const l = parseFloat(limit);
    if (!d || !l) return;

    // Asgari ödeme oranı limiti 25.000 TL ve altı için %20, üstü için %40 vb. kurallar vardır.
    let ratio = 0.20;
    if (l > 25000) {
      ratio = 0.40;
    }

    setResult(d * ratio);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Kredi Kartı Limiti (₺)</label>
        <input type="number" value={limit} onChange={e => setLimit(e.target.value)} className="input-field" placeholder="Örn: 50000" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Dönem Borcu (₺)</label>
        <input type="number" value={debt} onChange={e => setDebt(e.target.value)} className="input-field" placeholder="Örn: 15000" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Hesapla
      </button>

      {result !== null && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Ödenmesi Gereken Asgari Tutar</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--accent-primary)" }}>
            {result.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            * BDDK kurallarına göre kart limiti 25.000 TL ve altında olanlar için asgari ödeme oranı %20, üstünde olanlar için %40'tır.
          </p>
        </div>
      )}
    </div>
  );
}
