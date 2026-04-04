"use client";

import React, { useState } from "react";

export function CurrencyCalculator() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("TRY");
  const [result, setResult] = useState<number | null>(null);

  // Exchange rates relative to base (USD = 1)
  const rates: Record<string, number> = {
    USD: 1,
    TRY: 32.5,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 151.2
  };

  const calculate = () => {
    const qty = parseFloat(amount);
    if (!qty || qty <= 0) return;
    
    // Convert to USD first, then to target
    const amountInUsd = qty / rates[from];
    const finalAmount = amountInUsd * rates[to];
    setResult(finalAmount);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Majör para birimleri arası kur çevrimi yapın (sabit oranlı).</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Çevrilecek Miktar</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="input-field" placeholder="Örn: 1000" />
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Girdi Para Birimi</label>
          <select value={from} onChange={e => setFrom(e.target.value)} className="input-field">
            <option value="USD">Dolar (USD)</option>
            <option value="TRY">Türk Lirası (TRY)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">Sterlin (GBP)</option>
            <option value="JPY">Japon Yeni (JPY)</option>
          </select>
        </div>
        <div style={{ fontSize: "1.5rem", color: "var(--text-muted)", marginTop: "1rem" }}>&rarr;</div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Hedef Para Birimi</label>
          <select value={to} onChange={e => setTo(e.target.value)} className="input-field">
            <option value="TRY">Türk Lirası (TRY)</option>
            <option value="USD">Dolar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">Sterlin (GBP)</option>
            <option value="JPY">Japon Yeni (JPY)</option>
          </select>
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Döviz Çevir</button>

      {result !== null && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Çevrilen Tutar</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--accent-primary)", marginTop: "0.5rem" }}>
            {result.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {to}
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "1rem" }}>* API entegrasyonu olmadığı için varsayımsal sabit oranlarla çalışır.</p>
        </div>
      )}
    </div>
  );
}
