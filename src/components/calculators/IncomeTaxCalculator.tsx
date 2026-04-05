"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function IncomeTaxCalculator() {
  const [brutto, setBrutto] = useState("50000"); // Monthly Gross
  const [period, setPeriod] = useState("aylik");
  const [year, setYear] = useState("2025");
  
  const [results, setResults] = useState<{
    yearlyGross: number;
    brackets: { rate: number; taxable: number; tax: number; range: string }[];
    totalTax: number;
    effectiveRate: number;
    yearlyNet: number;
    avgMonthlyNet: number;
  } | null>(null);

  // 2024 & 2025 (Projected) Brackets
  const TAX_DATA: any = {
    "2024": [
      { limit: 110000, rate: 0.15 },
      { limit: 230000, rate: 0.20 },
      { limit: 580000, rate: 0.27 },
      { limit: 3000000, rate: 0.35 },
      { limit: Infinity, rate: 0.40 }
    ],
    "2025": [
      { limit: 158000, rate: 0.15 }, // Projected based on %44 increase
      { limit: 330000, rate: 0.20 },
      { limit: 840000, rate: 0.27 },
      { limit: 4300000, rate: 0.35 },
      { limit: Infinity, rate: 0.40 }
    ]
  };

  const calculate = () => {
    const monthlyGross = parseFloat(brutto) || 0;
    const yearlyGross = period === "aylik" ? monthlyGross * 12 : monthlyGross;
    
    if (yearlyGross <= 0) {
      setResults(null);
      return;
    }

    const yearBrackets = TAX_DATA[year];
    let totalTax = 0;
    let remaining = yearlyGross;
    let prevLimit = 0;
    const bracketDetails = [];

    for (const b of yearBrackets) {
      const taxableInRange = Math.min(remaining, b.limit - prevLimit);
      if (taxableInRange <= 0) break;

      const tax = taxableInRange * b.rate;
      totalTax += tax;
      remaining -= taxableInRange;

      bracketDetails.push({
        rate: b.rate * 100,
        taxable: taxableInRange,
        tax: tax,
        range: `${prevLimit.toLocaleString()} - ${b.limit === Infinity ? '∞' : b.limit.toLocaleString()} TL`
      });

      prevLimit = b.limit;
    }

    const yearlyNet = yearlyGross - totalTax;

    setResults({
      yearlyGross,
      brackets: bracketDetails,
      totalTax,
      effectiveRate: (totalTax / yearlyGross) * 100,
      yearlyNet,
      avgMonthlyNet: yearlyNet / 12
    });

    confetti({
      particleCount: 15,
      spread: 30,
      origin: { y: 0.7 },
      colors: ["#6366f1", "#4f46e5"]
    });
  };

  useEffect(() => {
    calculate();
  }, [brutto, period, year]);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-indigo-500/20 flex flex-col gap-6">
              <div className="flex bg-secondary/15 p-1.5 rounded-2xl gap-1">
                 {["2024", "2025"].map(y => (
                    <button 
                       key={y}
                       onClick={() => setYear(y)}
                       className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${year === y ? 'bg-surface text-indigo-600 shadow-sm' : 'text-muted'}`}
                    >
                       {y} {y === "2025" && "(Tahmini)"}
                    </button>
                 ))}
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Brüt Gelir (TL)</label>
                 <div className="relative">
                    <input 
                       type="number" 
                       value={brutto} 
                       onChange={e => setBrutto(e.target.value)}
                       className="input-field !text-2xl !py-4 font-black border-4 border-border transition-all pr-24"
                       placeholder="50.000"
                    />
                    <select 
                       value={period} 
                       onChange={e => setPeriod(e.target.value as any)}
                       className="absolute right-3 top-3 bg-secondary/10 border-none text-[9px] font-black uppercase tracking-widest rounded-lg px-2 cursor-pointer focus:ring-0"
                    >
                       <option value="aylik">Aylık</option>
                       <option value="yillik">Yıllık</option>
                    </select>
                 </div>
              </div>

              <div className="mt-4 p-5 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-start gap-4">
                 <span className="text-2xl">📊</span>
                 <div className="flex flex-col gap-1">
                    <h4 className="text-[10px] font-black text-indigo-900 dark:text-indigo-200 uppercase italic">Vergi İpucu</h4>
                    <p className="text-[10px] text-indigo-800/70 dark:text-indigo-400 leading-relaxed italic">
                       Gelir vergisi dilim usulü hesaplanır. Kazancınız arttıkça, üst dilimdeki vergi oranınız da yükselir. 
                       2025 rakamları henüz resmiyet kazanmamış olup, beklenen %44 YDO oranına göre projeksiyon olarak sunulmaktadır.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Dynamic Analysis Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-8 h-full bg-surface border-4 border-indigo-500 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-indigo-600 tracking-[0.3em] uppercase rotate-12">Tax Engine v2.5</div>
                    
                    <div className="flex flex-col items-center text-center mb-10">
                       <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4 bg-indigo-500/10 px-4 py-1 rounded-full border border-indigo-500/20 italic">Yıllık Net Kazanç</span>
                       <div className="text-6xl font-black italic tracking-tighter text-primary">
                          {results.yearlyNet.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} <span className="text-2xl not-italic ml-1">₺</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="p-5 bg-secondary/5 rounded-3xl border border-border flex flex-col items-center">
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest italic mb-2">Ort. Aylık Net</span>
                          <span className="text-xl font-black text-indigo-600">{results.avgMonthlyNet.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                       </div>
                       <div className="p-5 bg-secondary/5 rounded-3xl border border-border flex flex-col items-center">
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest italic mb-2">Toplam Vergi</span>
                          <span className="text-xl font-black text-red-500">{results.totalTax.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span>
                       </div>
                    </div>

                    {/* Tax Bar Visualization */}
                    <div className="mb-8">
                       <div className="flex justify-between items-center px-1 mb-2">
                          <span className="text-[10px] font-black text-primary uppercase italic">Dilim Dağılımı</span>
                          <span className="text-[10px] font-black text-indigo-600 uppercase italic">Efektif Oran: %{results.effectiveRate.toFixed(1)}</span>
                       </div>
                       <div className="h-3 w-full bg-secondary/20 rounded-full overflow-hidden flex shadow-inner">
                          {results.brackets.map((b, idx) => (
                             <div 
                                key={idx} 
                                style={{ width: `${(b.taxable / results.yearlyGross) * 100}%` }}
                                className={`h-full transition-all duration-1000 ${idx === 0 ? 'bg-indigo-400' : idx === 1 ? 'bg-indigo-500' : idx === 2 ? 'bg-indigo-600' : idx === 3 ? 'bg-indigo-800' : 'bg-indigo-950'}`}
                             />
                          ))}
                       </div>
                    </div>

                    {/* Bracket Details Table */}
                    <div className="flex flex-col gap-3">
                       {results.brackets.map((b, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white/40 dark:bg-zinc-800/40 rounded-xl border border-border/50 text-[11px] font-medium italic">
                             <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-indigo-400' : idx === 1 ? 'bg-indigo-500' : 'bg-indigo-600'}`} />
                                <span className="text-muted">%{b.rate} Dilimi:</span>
                                <span className="text-primary font-black uppercase text-[10px] tracking-tighter opacity-40">{b.range}</span>
                             </div>
                             <div className="text-right flex flex-col">
                                <span className="font-black text-indigo-700">{b.tax.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺ Vergi</span>
                                <span className="text-[8px] text-muted uppercase font-bold">{b.taxable.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} TL üzerinden</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-12 bg-secondary/5 rounded-[3rem] border-dashed border-4 border-border/40 grayscale opacity-40 text-center">
                 <div className="text-6xl mb-6">📉</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-widest italic leading-relaxed">
                    GELİR VERGİSİ ANALİZİ İÇİN<br/>BRÜT TUTAR GİRİNİZ
                 </h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
