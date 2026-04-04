"use client";

import React, { useState } from "react";

export function DiscountCalculator() {
  const [faceValue, setFaceValue] = useState("");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const [result, setResult] = useState<{ dsDiscount: number; isDiscount: number } | null>(null);

  const calculate = () => {
    const fv = parseFloat(faceValue);
    const r = parseFloat(rate) / 100;
    const d = parseFloat(days);

    if (fv > 0 && r > 0 && d > 0) {
      const t = d / 365;
      
      // Dış İskonto (Ticari İskonto): Fiyat (F) üzerinden iskonto
      // Kesinti = F * r * t
      const dsDiscount = fv * r * t;

      // İç İskonto (Gerçek İskonto): Peşin bedel (P) üzerinden iskonto
      // Kesinti = F * r * t / (1 + r * t) VEYA P = F / (1 + r*t) -> Kesinti = F - P
      const isDiscount = (fv * r * t) / (1 + (r * t));

      setResult({ dsDiscount, isDiscount });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Özellikle senet kırdırım (iskonto) süreçlerinde kullanılan iç ve dış matematiksel kesintileri karşılaştırın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Senetin Nominal Değeri (Üzerinde Yazan Tutar)</label>
        <input type="number" value={faceValue} onChange={e => setFaceValue(e.target.value)} className="input-field" placeholder="Örn: 50000" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yıllık İskonto Hadsi (Faiz) (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="input-field" placeholder="Örn: 24" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vadeye Kalan Gün</label>
          <input type="number" value={days} onChange={e => setDays(e.target.value)} className="input-field" placeholder="Örn: 120" />
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>İskonto Kesintilerini Hesapla</button>

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
          <div className="panel" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>İç İskonto (Gerçek)</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text-primary)" }}>{result.isDiscount.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Peşin değer üzerinden ayrılan matematiksel faizdir.</p>
          </div>

          <div className="panel" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Dış İskonto (Ticari)</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444" }}>{result.dsDiscount.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Nominal değer (gelecek değer) üzerinden hesaplanan ticari kesintidir. Bankalar genellikle bunu uygular.</p>
          </div>
        </div>
      )}
    </div>
  );
}
