"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";

export function FuturesCalculator() {
  const [spotPrice, setSpotPrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [dividendYield, setDividendYield] = useState("");
  const [days, setDays] = useState("");
  const [result, setResult] = useState<{ theoreticalPrice: number; basis: number; carryCost: number; dividendImpact: number } | null>(null);

  const calculate = () => {
    const s = parseFloat(spotPrice);
    const r = parseFloat(interestRate) / 100;
    const dy = parseFloat(dividendYield) / 100 || 0; 
    const d = parseFloat(days);

    if (s > 0 && !isNaN(r) && d > 0) {
      const time = d / 365;
      const carryCost = s * r * time;
      const dividendImpact = s * dy * time;
      const theoreticalPrice = s + carryCost - dividendImpact;
      const basis = theoreticalPrice - s;

      setResult({ theoreticalPrice, basis, carryCost, dividendImpact });
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 }, colors: ["#3b82f6", "#6366f1"] });
    }
  };

  const fmt = (val: number) => val.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 4 });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Dayanak Varlık Spot Fiyatı</label>
          <input type="number" value={spotPrice} onChange={e => setSpotPrice(e.target.value)} className="input-field py-4 font-bold" placeholder="10.850" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Risksiz Faiz Oranı (%)</label>
          <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="input-field py-4 font-bold" placeholder="45" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Temettü Verimi (%)</label>
          <input type="number" value={dividendYield} onChange={e => setDividendYield(e.target.value)} className="input-field py-4 font-bold text-red-500" placeholder="2.5" />
        </div>
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Vadeye Kalan Gün</label>
          <input type="number" value={days} onChange={e => setDays(e.target.value)} className="input-field py-4 font-bold text-accent-primary" placeholder="60" />
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={calculate}>Teorik Fiyatı Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge !bg-indigo-500/10 !text-indigo-500 !border-indigo-500/20">Teorik Vadeli Fiyat (Fair Value)</div>
              <div className="result-value-premium !text-indigo-500 font-black">{fmt(result.theoreticalPrice)}</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                 <div className="text-left p-4 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Taşıma Maliyeti</div>
                    <div className="font-bold text-lg text-primary">+{fmt(result.carryCost)}</div>
                 </div>
                 <div className="text-left p-4 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Temettü Etkisi</div>
                    <div className="font-bold text-lg text-red-500">-{fmt(result.dividendImpact)}</div>
                 </div>
                 <div className="text-left p-4 bg-accent-glow/5 border border-accent-primary/20 rounded-2xl">
                    <div className="text-[10px] font-black text-accent-primary uppercase mb-1">Baz Puan (Spread)</div>
                    <div className="font-bold text-2xl text-accent-primary">{result.basis > 0 ? "+" : ""}{result.basis.toFixed(2)}</div>
                 </div>
              </div>

              <div className="mt-6 p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium leading-relaxed">
                 💡 Vadeli fiyat; spot fiyata paranın maliyetinin (taşıma maliyeti) eklenmesi ve beklenen temettünün çıkarılmasıyla bulunur. 
                 Eğer piyasa fiyatı bu değerden çok farklıysa arbitraj fırsatı olabilir.
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
