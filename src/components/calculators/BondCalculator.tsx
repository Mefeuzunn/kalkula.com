import React, { useState } from "react";
import confetti from "canvas-confetti";

export function BondCalculator() {
  const [mode, setMode] = useState<"coupon" | "discount">("coupon");
  const [faceValue, setFaceValue] = useState("");
  const [couponRate, setCouponRate] = useState("");
  const [marketRate, setMarketRate] = useState("");
  const [years, setYears] = useState("");
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
        const price = fv / (1 + mr * (y / 1)); // Basit iskonto mantigi (Yil bazli)
        setResult({ price, pvCoupons: 0, pvFace: price, totalReturn: fv });
      }
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 }, colors: ["#fbbf24", "#f59e0b"] });
    }
  };

  const fmt = (val: number) => val.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex p-1 bg-secondary/10 rounded-2xl border border-border self-center md:self-start">
         <button onClick={() => { setMode("coupon"); setResult(null); }} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'coupon' ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-primary'}`}>Kuponlu Tahvil</button>
         <button onClick={() => { setMode("discount"); setResult(null); }} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'discount' ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-primary'}`}>İskontolu Bono</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Nominal Değer (Vade Sonu Tutar)</label>
          <input type="number" value={faceValue} onChange={e => setFaceValue(e.target.value)} className="input-field py-4 font-bold" placeholder="1000" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Piyasa Getiri / İskonto (%)</label>
          <input type="number" value={marketRate} onChange={e => setMarketRate(e.target.value)} className="input-field py-4 font-bold text-red-500" placeholder="45" />
        </div>
        {mode === "coupon" && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-muted uppercase px-1">Yıllık Kupon Oranı (%)</label>
            <input type="number" value={couponRate} onChange={e => setCouponRate(e.target.value)} className="input-field py-4 font-bold text-primary" placeholder="30" />
          </div>
        )}
        <div className={`flex flex-col gap-2 ${mode === 'discount' ? 'col-span-1 md:col-span-2' : ''}`}>
          <label className="text-xs font-bold text-muted uppercase px-1">Vadeye Kalan Yıl</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} className="input-field py-4 font-bold text-accent-primary" placeholder="2" />
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={calculate}>Teorik Fiyatı Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge !bg-yellow-500/10 !text-yellow-500 !border-yellow-500/20">Adil Piyasa Fiyatı (Hisse Başı)</div>
              <div className="result-value-premium !text-yellow-500 font-black">₺{fmt(result.price)}</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                 <div className="text-left p-4 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Vade Sonu Toplam Giriş</div>
                    <div className="font-bold text-lg text-primary">₺{fmt(result.totalReturn)}</div>
                 </div>
                 <div className="text-left p-4 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Anapara B. Değeri</div>
                    <div className="font-bold text-lg text-primary">₺{fmt(result.pvFace)}</div>
                 </div>
                 <div className="text-left p-4 bg-accent-glow/5 border border-accent-primary/20 rounded-2xl">
                    <div className="text-[10px] font-black text-accent-primary uppercase mb-1">Kuponlar B. Değeri</div>
                    <div className="font-bold text-lg text-accent-primary">₺{fmt(result.pvCoupons)}</div>
                 </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/10 text-[10px] text-yellow-600 dark:text-yellow-400 font-medium leading-relaxed italic">
                 💡 Tahvilin fiyatı, gelecekteki tüm nakit akışlarının (kuponlar + anapara) piyasa faiz oranıyla bugüne indirgenmiş toplamıdır. 
                 Eğer piyasa faizi kupon oranından yüksekse tahvil iskontolu (nominal fiyattan düşük) işlem görür.
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
