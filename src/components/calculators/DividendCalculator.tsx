import React, { useState } from "react";
import confetti from "canvas-confetti";

export function DividendCalculator() {
  const [shareCount, setShareCount] = useState("");
  const [avgCost, setAvgCost] = useState("");
  const [dividendPerShare, setDividendPerShare] = useState("");
  const [taxRate, setTaxRate] = useState("10"); // Türkiye'de temettü stopajı %10 (varsayılan)

  const [result, setResult] = useState<{ 
    grossTotal: number; 
    netTotal: number; 
    taxAmount: number;
    yieldPercent: number; 
  } | null>(null);

  const calculate = () => {
    const shares = parseFloat(shareCount);
    const cost = parseFloat(avgCost);
    const divGross = parseFloat(dividendPerShare);
    const tax = parseFloat(taxRate) / 100;

    if (shares > 0 && cost > 0 && divGross >= 0) {
      const grossTotal = shares * divGross;
      const taxAmount = grossTotal * tax;
      const netTotal = grossTotal - taxAmount;
      const yieldPercent = ( (divGross * (1 - tax)) / cost ) * 100;

      setResult({ grossTotal, netTotal, taxAmount, yieldPercent });
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.8 }, colors: ["#22c55e", "#10b981"] });
    }
  };

  const fmt = (val: number) => val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Toplam Hisse Adedi (Lot)</label>
          <input type="number" value={shareCount} onChange={e => setShareCount(e.target.value)} className="input-field py-4 font-bold" placeholder="1.000" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Ortalama Maliyet (₺)</label>
          <input type="number" value={avgCost} onChange={e => setAvgCost(e.target.value)} className="input-field py-4 font-bold" placeholder="45.50" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Hisse Başı BRÜT Temettü (₺)</label>
          <input type="number" value={dividendPerShare} onChange={e => setDividendPerShare(e.target.value)} className="input-field py-4 font-bold text-primary" placeholder="2.30" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted uppercase px-1">Stopaj (Vergi) Oranı (%)</label>
          <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="input-field py-4 font-bold text-red-500" placeholder="10" />
        </div>
      </div>

      <button className="btn-primary py-4 text-lg font-bold shadow-xl" onClick={calculate}>Kazancı Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className="result-card-premium">
              <div className="result-badge !bg-green-500/10 !text-green-500 !border-green-500/20">Net Temettü Kazancınız</div>
              <div className="result-value-premium !text-green-500 font-black">{fmt(result.netTotal)}</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                 <div className="text-left p-4 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Brüt Kazanç</div>
                    <div className="font-bold text-lg text-primary">{fmt(result.grossTotal)}</div>
                 </div>
                 <div className="text-left p-4 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Stopaj Kesintisi</div>
                    <div className="font-bold text-lg text-red-500">-{fmt(result.taxAmount)}</div>
                 </div>
                 <div className="text-left p-4 bg-accent-glow/5 border border-accent-primary/20 rounded-2xl">
                    <div className="text-[10px] font-black text-accent-primary uppercase mb-1">Net Verim (YOC)</div>
                    <div className="font-bold text-2xl text-accent-primary">%{result.yieldPercent.toFixed(2)}</div>
                 </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-xs text-blue-600 dark:text-blue-400 font-medium">
                 💡 Temettü veriminiz maliyetinize göre hesaplanmıştır (Yield on Cost). 
                 Bu para ile tekrar hisse alarak bileşik getiriden faydalanabilirsiniz.
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
