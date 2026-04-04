"use client";

import React, { useState } from "react";

export function BondCalculator() {
  const [faceValue, setFaceValue] = useState("");
  const [couponRate, setCouponRate] = useState("");
  const [marketRate, setMarketRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ price: number } | null>(null);

  const calculate = () => {
    const fv = parseFloat(faceValue);
    const cr = parseFloat(couponRate) / 100;
    const mr = parseFloat(marketRate) / 100;
    const y = parseInt(years);

    if (fv > 0 && cr >= 0 && mr > 0 && y > 0) {
      // Tahvil fiyatlandırması: PV = C * [1 - (1+r)^-n]/r + FV / (1+r)^n
      const coupon = fv * cr;
      const pvCoupons = coupon * ( (1 - Math.pow(1 + mr, -y)) / mr );
      const pvFace = fv / Math.pow(1 + mr, y);
      const price = pvCoupons + pvFace;

      setResult({ price });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Kuponlu tahvillerin piyasa faiz oranına göre bugünkü adil değerini (fiyatını) hesaplayın.</p>
      
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Nominal Değer (Face Value)</label>
        <input type="number" value={faceValue} onChange={e => setFaceValue(e.target.value)} className="input-field" placeholder="Örn: 1000" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Yıllık Kupon Oranı (%)</label>
        <input type="number" value={couponRate} onChange={e => setCouponRate(e.target.value)} className="input-field" placeholder="Örn: 8" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Piyasa İskonto/Getiri Oranı (%)</label>
        <input type="number" value={marketRate} onChange={e => setMarketRate(e.target.value)} className="input-field" placeholder="Örn: 10" />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>Vadeye Kalan Yıl Sayısı</label>
        <input type="number" value={years} onChange={e => setYears(e.target.value)} className="input-field" placeholder="Örn: 5" />
      </div>

      <button className="btn-primary" onClick={calculate} style={{ marginTop: "1rem" }}>Tahvilin Fiyatını Bul</button>

      {result && (
        <div className="panel" style={{ marginTop: "2rem", padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>Tahvilin Adil (Teorik) Piyasa Fiyatı</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--accent-primary)", marginTop: "0.5rem" }}>
            {result.price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "1rem" }}>
            * Kupon ödemelerinin yıllık yapıldığı varsayımı ile Net Bugünkü Değer formülü kullanılmıştır.
          </p>
        </div>
      )}
    </div>
  );
}
