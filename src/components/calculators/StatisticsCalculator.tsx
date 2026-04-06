"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function StatisticsCalculator() {
  const [input, setInput] = useState("10, 20, 30, 40, 50, 60, 70, 80, 90, 100");
  const [results, setResults] = useState<{
    mean: number;
    median: number;
    mode: number[];
    variance: number;
    stdDev: number;
    range: number;
    sum: number;
    count: number;
    sorted: number[];
  } | null>(null);

  const calculate = () => {
    const raw = input.split(/[,\s]+/).map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (raw.length === 0) {
      setResults(null);
      return;
    }

    const sorted = [...raw].sort((a, b) => a - b);
    const count = raw.length;
    const sum = raw.reduce((a, b) => a + b, 0);
    const mean = sum / count;

    // Median
    let median = 0;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    // Mode
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    raw.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });
    const mode = Object.keys(freq).filter(n => freq[parseFloat(n)] === maxFreq).map(n => parseFloat(n));

    // Variance & StdDev
    const vSum = raw.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
    const variance = vSum / count;
    const stdDev = Math.sqrt(variance);

    setResults({
      mean,
      median,
      mode: maxFreq > 1 ? mode : [],
      variance,
      stdDev,
      range: sorted[count - 1] - sorted[0],
      sum,
      count,
      sorted
    });

    if (count > 0) {
       confetti({
         particleCount: 20,
         spread: 30,
         origin: { y: 0.7 },
         colors: ["#10b981", "#3b82f6", "#ffffff"]
       });
    }
  };

  useEffect(() => {
    calculate();
  }, [input]);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Giriş Alanı */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-green-500/20 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic font-mono mb-2">Veri Seti (Virgül veya Boşlukla Ayırın)</label>
                 <textarea 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="input-field !py-6 font-black text-center text-lg min-h-[160px] leading-relaxed tracking-tighter"
                    placeholder="Örn: 10, 22, 45, 12..."
                 />
              </div>

              <div className="mt-4 p-5 bg-green-500/5 rounded-2xl border border-green-500/10 flex items-start gap-4">
                <span className="text-2xl">📊</span>
                <p className="text-[10px] text-green-900/70 dark:text-green-400 leading-relaxed font-bold italic">
                   Girdiğiniz sayılar anlık olarak analiz edilir. Ortalama, medyan, standart sapma ve varyans gibi temel istatistiksel metrikler hesaplanır.
                </p>
              </div>
           </div>
        </div>

        {/* Sonuçlar */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-10 h-full bg-surface border-4 border-green-500/10 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-green-600 tracking-[0.5em] uppercase rotate-12">Stats Engine v4.2</div>
                    
                    <div className="grid grid-cols-2 gap-8 mb-10">
                       <div className="flex flex-col items-center justify-center p-6 bg-green-500/5 rounded-[2.5rem] border border-green-500/10">
                          <span className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-3 italic">Aritmetik Ortalama</span>
                          <span className="text-4xl font-black italic tracking-tighter text-primary">
                             {results.mean.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}
                          </span>
                       </div>
                       <div className="flex flex-col items-center justify-center p-6 bg-blue-500/5 rounded-[2.5rem] border border-blue-500/10">
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 italic">Standart Sapma (σ)</span>
                          <span className="text-4xl font-black italic tracking-tighter text-primary">
                             {results.stdDev.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}
                          </span>
                       </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-8">
                       {[
                         { label: "Medyan", val: results.median },
                         { label: "Varyans", val: results.variance.toFixed(1) },
                         { label: "Açıklık", val: results.range }
                       ].map((stat, i) => (
                          <div key={i} className="p-4 bg-secondary/5 rounded-3xl border border-border text-center">
                             <span className="text-[9px] font-black text-muted uppercase italic mb-1 tracking-widest block">{stat.label}</span>
                             <span className="text-xl font-black text-primary italic tracking-tight">{stat.val}</span>
                          </div>
                       ))}
                    </div>

                    <div className="w-full h-px bg-border/40 my-2 mb-6"></div>

                    <div className="flex flex-col gap-4">
                       <div className="flex items-center justify-between px-4">
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest italic">Veri Dağılımı</span>
                          <span className="text-[9px] font-bold text-muted">{results.count} Veri Noktası</span>
                       </div>
                       
                       <div className="w-full h-12 bg-secondary/10 rounded-full flex items-center px-2 gap-1 overflow-hidden">
                          {results.sorted.slice(0, 20).map((n, i) => {
                             const height = Math.max(20, (n / Math.max(...results.sorted)) * 100);
                             return (
                                <div 
                                   key={i} 
                                   className="flex-1 bg-green-500/40 rounded-full transition-all hover:bg-green-500 cursor-help group relative"
                                   style={{ height: `${height}%` }}
                                >
                                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-primary text-surface rounded text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl">
                                      {n}
                                   </div>
                                </div>
                             )
                          })}
                          {results.count > 20 && <span className="text-[8px] font-bold text-muted ml-2">+{results.count - 20}</span>}
                       </div>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-4 w-full px-6">
                       <div className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest mb-1">Toplam Toplam</span>
                          <span className="text-xs font-bold text-primary">{results.sum.toLocaleString('tr-TR')}</span>
                       </div>
                       <div className="flex flex-col items-center border-l border-border">
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest mb-1">Mod Değeri</span>
                          <span className="text-xs font-bold text-primary">{results.mode.length > 0 ? results.mode.join(', ') : 'Yok'}</span>
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[3rem] grayscale opacity-40 text-center border-dashed border-4 border-border">
                 <span className="text-6xl mb-6">📉</span>
                 <p className="text-[11px] font-black uppercase tracking-widest text-muted italic">VERİ SETİNİ GİRİNİZ</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
