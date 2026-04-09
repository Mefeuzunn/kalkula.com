"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";
import { BarChart3, TrendingUp, Landmark, Calculator, ReceiptText } from "lucide-react";

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
    <V2CalculatorWrapper
      title="TAHVİL & BONO FİYAT ANALİZİ"
      icon="📈"
      infoText="Tahvilin fiyatı, gelecekteki tüm nakit akışlarının (kuponlar + anapara) piyasadaki geçerli faiz oranıyla bugüne indirgenmiş (Bugünkü Değer) toplamıdır."
    >
      <div className="flex gap-2 mb-8 bg-secondary/10 p-1.5 rounded-2xl border border-border/50">
        <button 
          onClick={() => setMode("coupon")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all duration-300 ${mode === "coupon" ? "bg-emerald-500 text-white shadow-lg" : "text-muted hover:bg-secondary/20"}`}
        >
          KUPONLU TAHVİL
        </button>
        <button 
          onClick={() => setMode("discount")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all duration-300 ${mode === "discount" ? "bg-emerald-500 text-white shadow-lg" : "text-muted hover:bg-secondary/20"}`}
        >
          İSKONTOLU BONO
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <V2Input 
          label="Nominal Değer (Vade Sonu)" 
          value={faceValue} 
          onChange={setFaceValue} 
          unit="₺" 
          placeholder="1000"
        />
        <V2Input 
          label="Piyasa Getiri Oranı" 
          value={marketRate} 
          onChange={setMarketRate} 
          unit="%" 
          step="0.1"
          placeholder="45"
        />
        {mode === "coupon" && (
          <V2Input 
            label="Yıllık Kupon Oranı" 
            value={couponRate} 
            onChange={setCouponRate} 
            unit="%" 
            step="0.1"
            placeholder="30"
          />
        )}
        <V2Input 
          label="Vadeye Kalan Yıl" 
          value={years} 
          onChange={setYears} 
          unit="YIL" 
          step="0.1"
          placeholder="2"
        />
      </div>

      <V2ActionRow 
        onCalculate={calculate} 
        onReset={reset} 
        calculateLabel="📈 Fiyat Hesapla"
      />

      {result && (
        <V2Premium3DResult
          title="FİYATLAMA ANALİZİ"
          mainLabel="ADİL PİYASA FİYATI"
          mainValue={`₺${fmt(result.price)}`}
          subLabel="Hisse başına ödenmesi gereken tutar"
          subValue=""
          color="emerald"
          variant="precise"
          accentIcon={<BarChart3 size={32} />}
          items={[
            {
              label: "ANAPARA BUGÜNKÜ DEĞERİ",
              value: `₺${fmt(result.pvFace)}`,
              icon: <Landmark size={16} />,
              color: "bg-emerald-500/10 text-emerald-500"
            },
            {
              label: "KUPON BUGÜNKÜ DEĞERİ",
              value: `₺${fmt(result.pvCoupons)}`,
              icon: <ReceiptText size={16} />,
              color: "bg-blue-500/10 text-blue-500"
            },
            {
              label: "VADE SONU TOPLAM NAKİT",
              value: `₺${fmt(result.totalReturn)}`,
              icon: <TrendingUp size={16} />,
              color: "bg-zinc-500/10 text-zinc-400"
            }
          ]}
        />
      )}
    </V2CalculatorWrapper>
  );
}
