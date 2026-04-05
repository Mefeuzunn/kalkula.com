import React, { useState } from "react";
import confetti from "canvas-confetti";

export function DiscountCalculator() {
  const [faceValue, setFaceValue] = useState("");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const [result, setResult] = useState<{ dsDiscount: number; isDiscount: number; dsNet: number; isNet: number } | null>(null);

  const calculate = () => {
    const fv = parseFloat(faceValue);
    const r = parseFloat(rate) / 100;
    const d = parseFloat(days);

    if (fv > 0 && r > 0 && d > 0) {
      const t = d / 365;
      
      const dsDiscount = fv * r * t;
      const dsNet = fv - dsDiscount;

      const isDiscount = (fv * r * t) / (1 + (r * t));
      const isNet = fv - isDiscount;

      setResult({ dsDiscount, isDiscount, dsNet, isNet });
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    }
  };

  const fmt = (val: number) => val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Senetin Nominal Değeri (Vadedeki Tutar)</label>
          <input type="number" value={faceValue} onChange={e => setFaceValue(e.target.value)} className="input-field py-4 font-bold" placeholder="50.000" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Yıllık İskonto Oranı (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="input-field py-4 font-bold" placeholder="36" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Vadeye Kalan Gün</label>
          <input type="number" value={days} onChange={e => setDays(e.target.value)} className="input-field py-4 font-bold" placeholder="90" />
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={calculate}>Kesintileri Hesapla</button>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-result">
           <div className="result-container-premium !mt-0 group">
              <div className="result-card-premium !text-left h-full border-2 border-border group-hover:border-accent-primary/40 transition-all">
                 <div className="result-badge !bg-accent-primary/10 !text-accent-primary !border-accent-primary/20">İç İskonto (Gerçek)</div>
                 <div className="text-[10px] font-black text-muted uppercase mb-1 tracking-widest">Net Ele Geçen</div>
                 <div className="result-value-premium !text-accent-primary !text-3xl mb-6">{fmt(result.isNet)}</div>
                 
                 <div className="pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-xs font-bold text-muted uppercase">Toplam Kesinti</span>
                    <span className="font-bold text-primary">{fmt(result.isDiscount)}</span>
                 </div>
                 <p className="mt-4 text-[11px] text-muted leading-relaxed italic border-l-2 border-accent-primary/30 pl-2">
                    Matematiksel olarak en adil yöntemdir. Senetin peşin değeri üzerinden ayrılan faizi baz alır.
                 </p>
              </div>
           </div>

           <div className="result-container-premium !mt-0 group">
              <div className="result-card-premium !text-left h-full border-2 border-border group-hover:border-red-500/40 transition-all shadow-[0_0_20px_rgba(239,68,68,0.05)]">
                 <div className="result-badge !bg-red-500/10 !text-red-500 !border-red-500/20">Dış İskonto (Ticari)</div>
                 <div className="text-[10px] font-black text-muted uppercase mb-1 tracking-widest">Net Ele Geçen</div>
                 <div className="result-value-premium !text-red-500 !text-3xl mb-6">{fmt(result.dsNet)}</div>
                 
                 <div className="pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-xs font-bold text-muted uppercase">Toplam Kesinti</span>
                    <span className="font-bold text-red-500">{fmt(result.dsDiscount)}</span>
                 </div>
                 <p className="mt-4 text-[11px] text-muted leading-relaxed italic border-l-2 border-red-500/30 pl-2">
                    Bankaların genellikle kullandığı yöntemdir. Nominal değer üzerinden hesaplandığı için kesinti daha yüksektir.
                 </p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
