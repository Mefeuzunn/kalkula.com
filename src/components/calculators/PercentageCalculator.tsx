"use client";

import React, { useState } from "react";

export function PercentageCalculator() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [result1, setResult1] = useState<string | null>(null);

  const [val3, setVal3] = useState("");
  const [val4, setVal4] = useState("");
  const [result2, setResult2] = useState<string | null>(null);

  const calc1 = () => {
    const x = parseFloat(val1);
    const y = parseFloat(val2);
    if (!isNaN(x) && !isNaN(y)) {
      setResult1(`${x} sayısının %${y}'si = ${(x * y) / 100}`);
    }
  };

  const calc2 = () => {
    const x = parseFloat(val3);
    const y = parseFloat(val4);
    if (!isNaN(x) && !isNaN(y) && x !== 0) {
      setResult2(`${x} sayısı, ${y} sayısının %${(x / y) * 100} kadarıdır.`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      
      {/* 1. Kısım */}
      <div className="panel" style={{ padding: "1.5rem" }}>
        <h4 style={{ marginBottom: "1rem", fontWeight: 600 }}>A Sayısının %B'si Kaçtır?</h4>
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <div>
            <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.2rem", display: "block" }}>A Sayısı</label>
            <input type="number" value={val1} onChange={e => setVal1(e.target.value)} className="input-field" placeholder="Örn: 500" />
          </div>
          <div>
            <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.2rem", display: "block" }}>B Yüzdesi (%)</label>
            <input type="number" value={val2} onChange={e => setVal2(e.target.value)} className="input-field" placeholder="Örn: 20" />
          </div>
          <button className="btn-primary" onClick={calc1} style={{ padding: "0.75rem 1.5rem" }}>Hesapla</button>
        </div>
        {result1 && <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--surface-light)", borderRadius: "8px", fontWeight: 500 }}>{result1}</div>}
      </div>

      {/* 2. Kısım */}
      <div className="panel" style={{ padding: "1.5rem" }}>
        <h4 style={{ marginBottom: "1rem", fontWeight: 600 }}>A Sayısı B Sayısının Yüzde Kaçıdır?</h4>
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <div>
            <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.2rem", display: "block" }}>A Sayısı</label>
            <input type="number" value={val3} onChange={e => setVal3(e.target.value)} className="input-field" placeholder="Örn: 50" />
          </div>
          <div>
            <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.2rem", display: "block" }}>B Sayısı</label>
            <input type="number" value={val4} onChange={e => setVal4(e.target.value)} className="input-field" placeholder="Örn: 200" />
          </div>
          <button className="btn-secondary" onClick={calc2} style={{ padding: "0.75rem 1.5rem" }}>Hesapla</button>
        </div>
        {result2 && <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--surface-light)", borderRadius: "8px", fontWeight: 500 }}>{result2}</div>}
      </div>

    </div>
  );
}
