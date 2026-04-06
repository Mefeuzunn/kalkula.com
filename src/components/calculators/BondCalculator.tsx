"use client";

import React, { useState, useEffect } from "react";

export function BondCalculator() {
  const [mode, setMode] = useState<"coupon" | "discount">("coupon");
  const [faceValue, setFaceValue] = useState("1000");
  const [couponRate, setCouponRate] = useState("30");
  const [marketRate, setMarketRate] = useState("45");
  const [years, setYears] = useState("2");
  const [result, setResult] = useState<{ price: number; pvCoupons: number; pvFace: number; totalReturn: number } | null>(null);

  const calculate = () => {
    const fv = parseFloat(faceValue);
    const mr = parseFloat(marketRate) / 100;
    const y = parseFloat(years);
    if (fv > 0 && mr > 0 && y > 0) {
      if (mode === "coupon") {
        const cr = parseFloat(couponRate) / 100 || 0;
        const coupon = fv * cr;
        const pvCoupons = coupon * ( (1 - Math.pow(1 + mr, -y)) / mr );
        const pvFace = fv / Math.pow(1 + mr, y);
        const price = pvCoupons + pvFace;
        const totalReturn = (coupon * y) + fv;
        setResult({ price, pvCoupons, pvFace, totalReturn });
      } else {
        const price = fv / (1 + mr * (y / 1));
        setResult({ price, pvCoupons: 0, pvFace: price, totalReturn: fv });
      }
    } else {
      setResult(null);
    }
  };

  const reset = () => { setFaceValue("1000"); setCouponRate("30"); setMarketRate("45"); setYears("2"); setResult(null); };

  useEffect(() => { calculate(); }, [mode, faceValue, couponRate, marketRate, years]);

  const fmt = (val: number) => val.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="calc-wrapper">
      <div className="calc-toggle-group" style={{ marginBottom: "1rem" }}>
        <button className={`calc-toggle-btn ${mode === "coupon" ? "active" : ""}`} onClick={() => setMode("coupon")}>Kuponlu Tahvil</button>
        <button className={`calc-toggle-btn ${mode === "discount" ? "active" : ""}`} onClick={() => setMode("discount")}>İskontolu Bono</button>
      </div>

      <div className="calc-grid-2">
        <div className="calc-input-group">
          <label className="calc-label">Nominal Değer (Vade Sonu)</label>
          <div className="calc-input-wrapper">
            <input type="number" value={faceValue} onChange={e => setFaceValue(e.target.value)} className="calc-input has-unit" placeholder="1000" min="0" />
            <span className="calc-unit">₺</span>
          </div>
        </div>
        <div className="calc-input-group">
          <label className="calc-label">Piyasa Getiri Oranı</label>
          <div className="calc-input-wrapper">
            <input type="number" value={marketRate} onChange={e => setMarketRate(e.target.value)} className="calc-input has-unit" placeholder="45" step="0.1" min="0" />
            <span className="calc-unit">%</span>
          </div>
        </div>
        
        {mode === "coupon" && (
          <div className="calc-input-group">
            <label className="calc-label">Yıllık Kupon Oranı</label>
            <div className="calc-input-wrapper">
              <input type="number" value={couponRate} onChange={e => setCouponRate(e.target.value)} className="calc-input has-unit" placeholder="30" step="0.1" min="0" />
              <span className="calc-unit">%</span>
            </div>
          </div>
        )}
        
        <div className={`calc-input-group ${mode === 'discount' ? 'calc-col-span-2' : ''}`}>
          <label className="calc-label">Vadeye Kalan Yıl</label>
          <div className="calc-input-wrapper">
            <input type="number" value={years} onChange={e => setYears(e.target.value)} className="calc-input has-unit" placeholder="2" min="0.1" step="0.1" />
            <span className="calc-unit">YIL</span>
          </div>
        </div>
      </div>

      <div className="calc-action-row">
        <button className="calc-btn-calculate" onClick={calculate}>📈 Fiyat Hesapla</button>
        <button className="calc-btn-reset" onClick={reset}>↺ Sıfırla</button>
      </div>

      {result && (
        <div className="calc-result-panel">
          <div className="calc-result-header">📈 Tahvil / Bono Fiyat Analizi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Adil Piyasa Fiyatı (Hisse Başı)</div>
              <div className="calc-result-hero-value" style={{ color: "#f59e0b" }}>₺{fmt(result.price)}</div>
              <div className="calc-result-hero-sub">Bu fiyatın üzerinde alırsanız zarar edebilirsiniz.</div>
            </div>

            <div className="calc-result-cards" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
               <div className="calc-result-card">
                 <div className="calc-result-card-label">Anapara B. Değeri</div>
                 <div className="calc-result-card-value font-bold">₺{fmt(result.pvFace)}</div>
               </div>
               <div className="calc-result-card">
                 <div className="calc-result-card-label">Kupon B. Değeri</div>
                 <div className="calc-result-card-value font-bold text-accent-primary">₺{fmt(result.pvCoupons)}</div>
               </div>
               <div className="calc-result-card" style={{ borderTop: "4px solid var(--accent-primary)" }}>
                 <div className="calc-result-card-label">Vade Sonu T. Giriş</div>
                 <div className="calc-result-card-value font-bold text-primary">₺{fmt(result.totalReturn)}</div>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text">Tahvilin fiyatı, gelecekteki tüm nakit akışlarının (kuponlar + anapara) piyasadaki geçerli faiz oranıyla bugüne indirgenmiş (Bugünkü Değer) toplamıdır.</span>
      </div>
    </div>
  );
}
