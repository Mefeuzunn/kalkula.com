"use client";

import React, { useState } from "react";

export function CagrCalculator() {
  const [initialValue, setInitialValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const start = parseFloat(initialValue);
    const end = parseFloat(finalValue);
    const y = parseFloat(years);

    if (start > 0 && end > 0 && y > 0) {
      // CAGR Formülü: (Son Değer / İlk Değer)^(1 / Yıl) - 1
      const cagr = (Math.pow(end / start, 1 / y) - 1) * 100;
      setResult(cagr);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Ortalama yıllık Bileşik Büyüme Oranınızı (CAGR) hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Başlangıç Değeri (İlk Değer)</label>
        <input type="number" value={initialValue} onChange={e => setInitialValue(e.target.value)} className="input-field" placeholder="Örn: 10000" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Bitiş Değeri (Son Değer)</label>
        <input type="number" value={finalValue} onChange={e => setFinalValue(e.target.value)} className="input-field" placeholder="Örn: 25000" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Geçen Yıl Sayısı</label>
        <input type="number" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="Örn: 5" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>CAGR Hesapla</button>

      {result !== null && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center", borderTop: "4px solid var(--accent-primary)" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Bileşik Yıllık Büyüme Oranı</h3>
          <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--accent-primary)", marginTop: "0.5rem" }}>
            %{result.toFixed(2)}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "1rem" }}>
            Bu oran, yatırımınızın belirttiğiniz yıllar boyunca her yıl sabit olarak büyümesi durumunda elde edilecek yıllık yüzde büyümesini gösterir.
          </p>
        </div>
      )}
    </div>
  );
}
