"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function PermutationCombinationCalculator() {
  const [n, setN] = useState("10");
  const [r, setR] = useState("3");
  const [results, setResults] = useState<{
    permutation: number;
    combination: number;
    nFact: number;
    rFact: number;
    diffFact: number;
  } | null>(null);

  const factorial = (num: number): number => {
    if (num < 0) return 0;
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const calculate = () => {
    const numN = parseInt(n) || 0;
    const numR = parseInt(r) || 0;

    if (numN < 0 || numR < 0 || numN < numR || numN > 20) {
      setResults(null);
      return;
    }

    const nFact = factorial(numN);
    const rFact = factorial(numR);
    const diffFact = factorial(numN - numR);

    setResults({
      permutation: nFact / diffFact,
      combination: nFact / (rFact * diffFact),
      nFact,
      rFact,
      diffFact
    });

    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.7 },
      colors: ["#6366f1", "#a855f7", "#ffffff"]
    });
  };

  useEffect(() => {
    calculate();
  }, [n, r]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kontrol Paneli */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-indigo-500/20 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Toplam Eleman (n)</label>
              <input 
                type="number" 
                value={n} 
                onChange={e => setN(e.target.value)} 
                className="input-field !py-5 font-black text-center text-2xl border-2 border-indigo-500/10 focus:border-indigo-500/30"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono text-center">Seçilen Eleman (r)</label>
              <input 
                type="number" 
                value={r} 
                onChange={e => setR(e.target.value)} 
                className="input-field !py-5 font-black text-center text-2xl border-2 border-indigo-500/10 focus:border-indigo-500/30"
              />
            </div>

            <div className="mt-4 p-5 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-start gap-4 text-center">
               <p className="text-[10px] text-indigo-900/70 dark:text-indigo-400 leading-relaxed font-bold italic w-full">
                  Permütasyon: Sırlama önemlidir. P(n,r) = n! / (n-r)! <br />
                  Kombinasyon: Sıralama önemsizdir. C(n,r) = n! / (r! · (n-r)!)
               </p>
            </div>
          </div>
        </div>

        {/* Sonuç Paneli */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-10 h-full bg-surface border-4 border-indigo-500/10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-indigo-600 tracking-[0.5em] uppercase rotate-12">Math Engine v3.0</div>
                    
                    <div className="grid grid-cols-1 gap-8 w-full mb-10">
                       <div className="flex flex-col items-center justify-center p-8 bg-indigo-500/5 rounded-[2.5rem] border border-indigo-500/10 relative group">
                          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 italic">Kombinasyon C(n,r)</span>
                          <span className="text-5xl font-black italic tracking-tighter text-primary">
                             {results.combination.toLocaleString('tr-TR')}
                          </span>
                          <div className="absolute top-4 right-6 text-2xl opacity-10 group-hover:opacity-20 transition-opacity">📦</div>
                       </div>
                       
                       <div className="flex flex-col items-center justify-center p-8 bg-purple-500/5 rounded-[2.5rem] border border-purple-500/10 relative group">
                          <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-4 italic">Permütasyon P(n,r)</span>
                          <span className="text-5xl font-black italic tracking-tighter text-primary">
                             {results.permutation.toLocaleString('tr-TR')}
                          </span>
                          <div className="absolute top-4 right-6 text-2xl opacity-10 group-hover:opacity-20 transition-opacity">🔢</div>
                       </div>
                    </div>

                    <div className="w-full space-y-4">
                       <span className="text-[10px] font-black text-muted uppercase tracking-widest px-4 italic mb-2">Faktöriyel Analizi</span>
                       <div className="grid grid-cols-3 gap-4">
                          {[
                            { label: "n!", val: results.nFact },
                            { label: "r!", val: results.rFact },
                            { label: "(n-r)!", val: results.diffFact }
                          ].map((item, i) => (
                             <div key={i} className="p-4 bg-secondary/5 rounded-3xl border border-border text-center overflow-hidden">
                                <span className="text-[9px] font-black text-muted uppercase italic mb-1 tracking-widest block">{item.label}</span>
                                <span className="text-xs font-black text-primary italic tracking-tight truncate block">
                                   {item.val > 1000000 ? item.val.toExponential(2) : item.val.toLocaleString('tr-TR')}
                                </span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="mt-10 flex items-center gap-4 opacity-40">
                       <div className="h-px bg-border flex-1"></div>
                       <span className="text-[9px] font-black text-muted uppercase tracking-[0.4em] italic leading-none">Standard Factorial Module</span>
                       <div className="h-px bg-border flex-1"></div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[3rem] grayscale opacity-40 text-center border-dashed border-4 border-border">
                 <span className="text-6xl mb-6">🎲</span>
                 <p className="text-[11px] font-black uppercase tracking-widest text-muted italic">n ≥ r ve n ≤ 20 giriniz.</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
