"use client";

import React, { useState } from "react";

export function PregnancyCalculator() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [result, setResult] = useState<{ date: string; weeks: number } | null>(null);

  const calculate = () => {
    if (!lastPeriod) return;
    const date = new Date(lastPeriod);
    const today = new Date();
    
    // Normal gebelik süresi ~280 gündür (40 hafta)
    const dueDate = new Date(date.getTime() + 280 * 24 * 60 * 60 * 1000);
    
    // Şu anki hafta sayısı
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const weeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

    setResult({
      date: dueDate.toLocaleDateString("tr-TR"),
      weeks: weeks > 42 ? 42 : weeks // Kapama (Cap)
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Son Adet Tarihiniz (SAT)</label>
        <input 
          type="date" 
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
          className="input-field" 
        />
      </div>
      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Hesapla
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>Sonuç</h3>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Tahmini Doğum Tarihi</p>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent-primary)" }}>{result.date}</p>
            </div>
            <div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Gebelik Haftası</p>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent-primary)" }}>{result.weeks}. Hafta</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
