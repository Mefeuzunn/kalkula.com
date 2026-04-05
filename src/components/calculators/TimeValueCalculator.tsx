import React, { useState } from "react";
import confetti from "canvas-confetti";

export function TimeValueCalculator() {
  const [pv, setPv] = useState("");
  const [inflation, setInflation] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ futureValue: number; lossPercent: number } | null>(null);

  const calculate = () => {
    const presentValue = parseFloat(pv);
    const infl = parseFloat(inflation) / 100;
    const y = parseFloat(years);

    if (presentValue > 0 && infl > 0 && y > 0) {
      const futureValue = presentValue * Math.pow(1 + infl, y);
      const lossPercent = (1 - (presentValue / futureValue)) * 100;

      setResult({ futureValue, lossPercent });
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 }, colors: ["#6366f1", "#8b5cf6"] });
    }
  };

  const fmt = (val: number) => val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Paranın Bugünkü Değeri (Alım Gücü) (₺)</label>
          <input type="number" value={pv} onChange={e => setPv(e.target.value)} className="input-field py-4 font-bold" placeholder="10.000" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Yıllık Ortalama Enflasyon (%)</label>
          <input type="number" value={inflation} onChange={e => setInflation(e.target.value)} className="input-field py-4 font-bold text-red-500" placeholder="45" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Tahmini Süre (Yıl)</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} className="input-field py-4 font-bold text-accent-primary" placeholder="3" />
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={calculate}>Zaman Değerini Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge !bg-purple-500/10 !text-purple-500 !border-purple-500/20">Gelecekte Gereken Nominal Tutar</div>
              <div className="result-value-premium !text-purple-500 font-black">{fmt(result.futureValue)}</div>
              
              <div className="mt-8 pt-8 border-t border-border">
                 <div className="p-6 rounded-2xl bg-red-500/5 text-red-700 dark:text-red-400 border border-red-500/10 text-center">
                    <div className="text-[10px] font-black uppercase mb-1 tracking-widest opacity-70">Satın Alma Gücü Erozyonu</div>
                    <div className="text-3xl font-black mb-2">-%{result.lossPercent.toFixed(2)}</div>
                    <p className="text-sm font-medium leading-relaxed">
                       Paranızı bugünkü alım gücünde tutmak istiyorsanız, {years} yıl sonra elinizde en az <b>{fmt(result.futureValue)}</b> olmalı. 
                       Aksi takdirde paranızın reel değeri yukarıdaki oranda eriyecektir.
                    </p>
                 </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 bg-secondary/10 rounded-xl text-[10px] font-bold text-muted uppercase text-center border border-border">
                    Bugünkü ₺100 → {years} Yıl Sonra ₺{(100 * Math.pow(1/(1 + parseFloat(inflation)/100), parseFloat(years))).toFixed(2)} Değerinde
                 </div>
                 <div className="p-4 bg-secondary/10 rounded-xl text-[10px] font-bold text-muted uppercase text-center border border-border">
                    Yıllık %{inflation} Enflasyon Etkisi
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
