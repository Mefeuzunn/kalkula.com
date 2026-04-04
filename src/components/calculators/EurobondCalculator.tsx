"use client";

import React, { useState } from "react";

export function EurobondCalculator() {
  const [nominal, setNominal] = useState("");
  const [couponRate, setCouponRate] = useState("");
  const [maturity, setMaturity] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<{ currentYield: number; totalPayment: number } | null>(null);

  const calculate = () => {
    const n = parseFloat(nominal);
    const cr = parseFloat(couponRate) / 100;
    const m = parseInt(maturity);
    const p = parseFloat(price);

    if (!n || !cr || !m || !p) return;

    // Basit Cari Getiri (Current Yield) = (Nominal * Kupon Oranı) / Güncel Fiyat
    const annualCouponPayment = n * cr;
    const currentYield = (annualCouponPayment / p) * 100;

    // Vade sonuna kadar toplam alınacak kupon + anapara
    const totalPayment = (annualCouponPayment * m) + n;

    setResult({ currentYield, totalPayment });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Nominal Değer ($)</label>
        <input type="number" value={nominal} onChange={e => setNominal(e.target.value)} className="input-field" placeholder="Örn: 10000" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Güncel Fiyat ($)</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input-field" placeholder="Örn: 9500" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yıllık Kupon Oranı (%)</label>
          <input type="number" step="0.1" value={couponRate} onChange={e => setCouponRate(e.target.value)} className="input-field" placeholder="Örn: 6.5" />
        </div>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vadeye Kalan Yıl</label>
        <input type="number" value={maturity} onChange={e => setMaturity(e.target.value)} className="input-field" placeholder="Örn: 5" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>
        Getiriyi Hesapla
      </button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", textAlign: "center" }}>Eurobond Getiri Özeti</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--text-muted)" }}>Basit Cari Getiri (Yıllık):</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#22c55e" }}>
              %{result.currentYield.toFixed(2)}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Vade Sonu Toplam Geri Dönüş:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "var(--accent-primary)" }}>
               ${result.totalPayment.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
