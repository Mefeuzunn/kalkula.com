"use client";

import React, { useState } from "react";

export function SeveranceCalculator() {
  const [gross, setGross] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("0");
  const [result, setResult] = useState<{ amount: number } | null>(null);

  const calculate = () => {
    const g = parseFloat(gross);
    const y = parseInt(years);
    const m = parseInt(months);

    if (!g || isNaN(y) || isNaN(m)) return;

    // Kıdem tazminatı tavanı 2024 varsayımı (~35,000 TL)
    const TAVAN = 35058.58; 
    
    // Uygulanacak taban maaş
    const effectiveSalary = g > TAVAN ? TAVAN : g;

    // Sadece damga vergisi kesilir (%0.759)
    const damgaVergisiOrani = 0.00759;
    
    // Toplam çalışma süresi (Yıl cinsinden ondalık)
    const totalYears = y + (m / 12);

    const brutTazminat = effectiveSalary * totalYears;
    const damgaKesintisi = brutTazminat * damgaVergisiOrani;
    const netTazminat = brutTazminat - damgaKesintisi;

    setResult({ amount: netTazminat });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Aylık Giydirilmiş Brüt Ücret (₺)</label>
        <input type="number" value={gross} onChange={e => setGross(e.target.value)} className="input-field" placeholder="Örn: 25000" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Çalışılan Yıl</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="Örn: 5" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Çalışılan Ay</label>
          <input type="number" value={months} onChange={e => setMonths(e.target.value)} className="input-field" placeholder="0" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Tazminatı Hesapla
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Tahmini Net Kıdem Tazminatı</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>
            {result.amount.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            * Sadece Damga Vergisi kesintisi dikkate alınmıştır. Güncel Kıdem Tavanını geçiyorsanız tavan baz alınmıştır. İhbar tazminatı hariçtir.
          </p>
        </div>
      )}
    </div>
  );
}
