import React, { useState } from "react";
import confetti from "canvas-confetti";

export function RealReturnCalculator() {
  const [nominalRate, setNominalRate] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [result, setResult] = useState<{ realRate: number } | null>(null);

  const calculate = () => {
    const nr = parseFloat(nominalRate) / 100;
    const infl = parseFloat(inflationRate) / 100;

    if (!isNaN(nr) && !isNaN(infl)) {
      const realRate = ((1 + nr) / (1 + infl) - 1) * 100;
      setResult({ realRate });
      
      if (realRate > 0) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ["#22c55e", "#10b981"] });
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Yıllık Getiri (Nominal Faiz) (%)</label>
          <input type="number" value={nominalRate} onChange={e => setNominalRate(e.target.value)} className="input-field py-4 font-bold" placeholder="45" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Tahmini/Yıllık Enflasyon (%)</label>
          <input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="input-field py-4 font-bold text-red-500" placeholder="60" />
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={calculate}>Reel Getiriyi Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className={`result-card-premium ${result.realRate < 0 ? 'shadow-[0_0_20px_rgba(239,68,68,0.1)] border-red-500/20' : ''}`}>
              <div className={`result-badge ${result.realRate >= 0 ? '!bg-green-500/10 !text-green-500 !border-green-500/20' : '!bg-red-500/10 !text-red-500 !border-red-500/20'}`}>
                {result.realRate >= 0 ? 'Enflasyon Üstü Reel Kazanç' : 'Enflasyon Altı Reel Kayıp'}
              </div>
              <div className={`result-value-premium font-black ${result.realRate >= 0 ? '!text-green-500' : '!text-red-500'}`}>
                %{result.realRate.toFixed(2)}
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                 <div className={`p-6 rounded-2xl text-sm leading-relaxed font-medium ${result.realRate >= 0 ? 'bg-green-500/5 text-green-700 dark:text-green-400 border border-green-500/10' : 'bg-red-500/5 text-red-700 dark:text-red-400 border border-red-500/10'}`}>
                    {result.realRate >= 0 
                      ? "✨ Tebrikler! Yatırımınız enflasyon canavarını yenmiş. Paranızın alım gücü artmış ve gerçekten zenginleşmişsiniz." 
                      : "⚠️ Dikkat! Para miktarınız rakamsal olarak artsa da enflasyonun gerisinde kalmış. Alım gücünüz maalesef eriyor."}
                 </div>
              </div>

              <div className="mt-6 p-4 bg-secondary/5 rounded-xl text-[10px] text-muted font-medium italic">
                 💡 Hesaplamada Fisher Denklemi [(1+Nominal)/(1+Enflasyon)-1] kullanılmıştır. 
                 Sadece faiz oranlarının farkı alınarak yapılan basit hesaplama yüksek enflasyonlu dönemlerde yanlış sonuç verir.
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
