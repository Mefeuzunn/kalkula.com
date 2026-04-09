"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function InflationCalculator() {
  const [amount, setAmount] = useState("1000");
  const [inflationRate, setInflationRate] = useState("50");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<{ futureCost: number; purchasingPower: number; lossRate: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(inflationRate) / 100;
    const y = parseInt(years);
    if (!a || !r || !y || a <= 0 || r <= 0 || y <= 0) { setResult(null); return; }
    const futureCost = a * Math.pow(1 + r, y);
    const purchasingPower = a / Math.pow(1 + r, y);
    const lossRate = ((a - purchasingPower) / a) * 100;
    setResult({ futureCost, purchasingPower, lossRate });
  };

  const reset = () => { setAmount("1000"); setInflationRate("50"); setYears("5"); setResult(null); };

  useEffect(() => { calculate(); }, [amount, inflationRate, years]);

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title={`Alım Gücü Analizi — ${years} Yıl`}
      icon="📊"
      infoText={`Enflasyon paranızın alım gücünü düşürür. Bugün ${amount} ₺'ye aldığınız ürün, %${inflationRate} enflasyonla ${years} yıl sonra ~${result ? result.futureCost.toFixed(0) : "?"} ₺ seviyesine çıkacaktır.`}
      results={result && (
        <>
          <div className="grid grid-cols-2 gap-6">
            <V2ResultCard
              color="red"
              icon="🛒"
              label="Aynı Ürünün Fiyatı"
              value={fmt(result.futureCost)}
              subLabel={`${years} Yıl Sonra`}
            />
            <V2ResultCard
              color="amber"
              icon="💸"
              label="Paranızın Değeri"
              value={fmt(result.purchasingPower)}
              subLabel={`${years} Yıl Sonra`}
            />
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
             <span className="text-xs font-black text-muted uppercase tracking-widest">Alım Gücü Kaybı</span>
             <span className="text-2xl font-black text-[#ef4444]">-%{result.lossRate.toFixed(1)}</span>
          </div>

          <div className="mt-4 h-3 bg-white/5 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-1000 ease-out"
               style={{ width: `${Math.min(result.lossRate, 100)}%` }}
             />
          </div>
        </>
      )}
    >
      <V2Input
        label="Hesaplanacak Tutar"
        value={amount}
        onChange={setAmount}
        unit="₺"
      />

      <div className="grid grid-cols-2 gap-4">
        <V2Input
          label="Yıllık Ortalama Enflasyon"
          value={inflationRate}
          onChange={setInflationRate}
          unit="%"
          fieldClassName="!text-3xl"
        />
        <V2Input
          label="Süre"
          value={years}
          onChange={setYears}
          unit="YIL"
          fieldClassName="!text-3xl"
        />
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="📉 Enflasyon Etkisini Hesapla"
      />
    </V2CalculatorWrapper>
  );
}
