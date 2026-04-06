"use client";

import React, { useState, useEffect } from "react";

export function TaxFreeCalculator() {
  const [amount, setAmount] = useState("1000");
  const [vatRate, setVatRate] = useState<"10" | "20">("20");
  const [results, setResults] = useState<{
    vatAmount: number;
    estimatedRefund: number;
    netCost: number;
    refundPercent: number;
  } | null>(null);

  const calculate = () => {
    const total = parseFloat(amount) || 0;
    const rate = parseInt(vatRate);
    
    // VAT is included in the price: Price = Net + Net * (Rate/100) => Net = Price / (1 + Rate/100)
    const vatAmount = total - (total / (1 + rate / 100));
    
    // Estimated refund logic (Commission usually 30-40% of VAT)
    // For 20% VAT, typical refund is 12.5% of total.
    // For 10% VAT, typical refund is 6.3% of total.
    const refundFactor = rate === 20 ? 0.125 : 0.063;
    const estimatedRefund = total * refundFactor;
    const netCost = total - estimatedRefund;

    setResults({
      vatAmount,
      estimatedRefund,
      netCost,
      refundPercent: (estimatedRefund / total) * 100,
    });
  };

  useEffect(() => { calculate(); }, [amount, vatRate]);

  return (
    <div className="calc-wrapper">
      <div className="calc-input-group">
        <label className="calc-label">Toplam Tutar (KDV Dahil)</label>
        <div className="calc-input-wrapper">
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="calc-input has-unit" />
          <span className="calc-unit">TL</span>
        </div>
      </div>

      <div className="calc-input-group">
        <label className="calc-label">KDV Kategorisi</label>
        <div className="grid grid-cols-2 gap-4">
          <button 
            className={`calc-input border-2 transition-all ${vatRate === "10" ? "border-accent-primary bg-accent-primary/10" : "border-border"}`}
            onClick={() => setVatRate("10")}
          >
            <div className="font-bold text-lg">%10</div>
            <div className="text-[10px] opacity-60">Giyim, Çanta, Ayakkabı</div>
          </button>
          <button 
            className={`calc-input border-2 transition-all ${vatRate === "20" ? "border-accent-primary bg-accent-primary/10" : "border-border"}`}
            onClick={() => setVatRate("20")}
          >
            <div className="font-bold text-lg">%20</div>
            <div className="text-[10px] opacity-60">Elektronik, Gözlük, Saat</div>
          </button>
        </div>
      </div>

      {results && (
        <div className="calc-result-panel">
          <div className="calc-result-header">💰 Tahmini Tax Free İadesi</div>
          <div className="calc-result-body">
            <div className="calc-result-hero">
              <div className="calc-result-hero-label">Tahmini Alınacak İade</div>
              <div className="calc-result-hero-value" style={{ color: "#10b981" }}>{results.estimatedRefund.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</div>
              <div className="calc-result-hero-sub">Fatura Tutarı: {parseFloat(amount).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</div>
            </div>

            <div className="calc-result-cards">
              <div className="calc-result-card">
                <div className="calc-result-card-label">İade Oranı (Net)</div>
                <div className="calc-result-card-value">%{results.refundPercent.toFixed(1)}</div>
              </div>
              <div className="calc-result-card">
                <div className="calc-result-card-label">Gerçek Maliyet</div>
                <div className="calc-result-card-value">{results.netCost.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="calc-info-box">
        <span className="calc-info-box-icon">ℹ️</span>
        <span className="calc-info-box-text">Tax Free iade tutarı, aracı kurumların (Global Blue, Tax Free Point vb.) komisyon kesintileri sonrası tahmini olarak hesaplanmıştır. Mağaza ve kurum bazlı ufak değişiklikler görülebilir.</span>
      </div>
    </div>
  );
}
