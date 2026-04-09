"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";

export function RepoCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const [tax, setTax] = useState("15"); 
  
  const [result, setResult] = useState<{ grossInterest: number; netReturn: number; totalAmount: number; taxAmount: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const d = parseFloat(days);
    const t = parseFloat(tax) / 100;

    if (p > 0 && r > 0 && d > 0) {
      const grossInterest = p * r * (d / 365);
      const taxAmount = grossInterest * t;
      const netReturn = grossInterest - taxAmount;
      const totalAmount = p + netReturn;

      setResult({ grossInterest, netReturn, totalAmount, taxAmount });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
  };

  const fmt = (val: number) => val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Yatıralacak Anapara (₺)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="input-field py-4 font-bold" placeholder="100.000" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Yıllık Repo Oranı (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="input-field py-4 font-bold" placeholder="48" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Vade Günü</label>
          <input type="number" value={days} onChange={e => setDays(e.target.value)} className="input-field py-4 font-bold" placeholder="1" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Stopaj (Vergi) Oranı</label>
          <input type="number" value={tax} onChange={e => setTax(e.target.value)} className="input-field py-4 font-bold text-red-500" placeholder="15" />
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={calculate}>Getiriyi Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge">Vade Sonu Toplam Para</div>
              <div className="result-value-premium">{fmt(result.totalAmount)}</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                 <div className="text-left p-4 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Brüt Getiri</div>
                    <div className="font-bold text-lg text-primary">{fmt(result.grossInterest)}</div>
                 </div>
                 <div className="text-left p-4 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Vergi Kesintisi</div>
                    <div className="font-bold text-lg text-red-500">-{fmt(result.taxAmount)}</div>
                 </div>
                 <div className="text-left p-4 bg-accent-glow/5 border border-accent-primary/20 rounded-2xl">
                    <div className="text-[10px] font-black text-accent-primary uppercase mb-1">Net Kâr</div>
                    <div className="font-bold text-lg text-accent-primary">+{fmt(result.netReturn)}</div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
