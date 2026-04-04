"use client";

import React, { useState } from "react";

export function EbobEkokCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState<{ ebob: number; ekok: number } | null>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const calculate = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return;

    const ebob = gcd(a, b);
    const ekok = (a * b) / ebob;

    setResult({ ebob, ekok });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>İki pozitif tam sayı giriniz.</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>1. Sayı</label>
          <input type="number" value={num1} onChange={e => setNum1(e.target.value)} className="input-field" placeholder="Örn: 24" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>2. Sayı</label>
          <input type="number" value={num2} onChange={e => setNum2(e.target.value)} className="input-field" placeholder="Örn: 36" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Hesapla
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", display: "flex", justifyContent: "space-around" }}>
          <div style={{ textAlign: "center" }}>
            <h4 style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>EBOB</h4>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent-primary)" }}>{result.ebob}</div>
          </div>
          <div style={{ textAlign: "center", borderLeft: "1px solid var(--border)", paddingLeft: "3rem" }}>
            <h4 style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>EKOK</h4>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent-primary)" }}>{result.ekok}</div>
          </div>
        </div>
      )}
    </div>
  );
}
