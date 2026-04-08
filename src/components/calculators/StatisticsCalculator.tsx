"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { BarChart3, Sigma, TrendingUp, Hash, List, Info, Calculator, RotateCcw } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

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

    let median = 0;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    const freq: Record<number, number> = {};
    let maxFreq = 0;
    raw.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });
    const mode = Object.keys(freq).filter(n => freq[parseFloat(n)] === maxFreq).map(n => parseFloat(n));

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

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#10b981", "#3b82f6", "#8b5cf6"]
    });
  };

  useEffect(() => {
    calculate();
  }, [input]);

  const reset = () => {
    setInput("");
    setResults(null);
  };

  return (
    <V2CalculatorWrapper
      title="İSTATİSTİKSEL VERİ ANALİZİ"
      icon="📊"
      infoText="Veri setinizi girerek aritmetik ortalama, standart sapma, varyans ve dağılım analizi gibi temel metrikleri anında hesaplayın."
      results={results && (
        <div className="space-y-8 animate-result">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2ResultCard color="emerald" label="ARİTMETİK ORTALAMA" value={results.mean.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} icon="μ" />
              <V2ResultCard color="blue" label="STANDART SAPMA (σ)" value={results.stdDev.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} icon="σ" />
           </div>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <V2ResultCard color="amber" label="MEDYAN" value={results.median.toString()} icon="📏" />
              <V2ResultCard color="purple" label="VARYANS" value={results.variance.toFixed(2)} icon="V" />
              <V2ResultCard color="indigo" label="AÇIKLIK (RANGE)" value={results.range.toString()} icon="↔️" />
              <V2ResultCard color="emerald" label="VERİ ADEDİ" value={results.count.toString()} icon="N" />
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <div className="text-[10px] font-black text-muted uppercase tracking-widest italic flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-500" /> VERİ DAĞILIMI
                 </div>
                 <div className="text-[10px] font-black text-emerald-500 italic">Sorted Sequence Analysis</div>
              </div>
              
              <div className="w-full h-32 bg-black/20 rounded-3xl flex items-end px-4 py-2 gap-1 overflow-hidden border border-white/5 shadow-inner">
                 {results.sorted.slice(0, 50).map((n, i) => {
                    const maxVal = Math.max(...results.sorted);
                    const minVal = Math.min(...results.sorted);
                    const rangeVal = maxVal - minVal || 1;
                    const height = 10 + ((n - minVal) / rangeVal) * 90;
                    return (
                       <div 
                          key={i} 
                          className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-500/60 rounded-full transition-all hover:to-emerald-400 group relative"
                          style={{ height: `${height}%` }}
                       >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 border border-white/10 text-white rounded-xl text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all z-10 pointer-events-none shadow-2xl scale-75 group-hover:scale-100">
                             {n}
                          </div>
                       </div>
                    )
                 })}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                 <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
                    <Sigma className="w-4 h-4 text-blue-500" />
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-muted uppercase italic">Toplam Yekün</span>
                       <span className="text-xs font-black text-primary">{results.sum.toLocaleString('tr-TR')}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
                    <TrendingUp className="w-4 h-4 text-amber-500" />
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-muted uppercase italic">Mod (En Sık)</span>
                       <span className="text-xs font-black text-primary">{results.mode.length > 0 ? results.mode.join(', ') : 'Mod Yok'}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 font-black italic text-xs tracking-widest uppercase pointer-events-none group-hover:opacity-10 transition-opacity">DATA COMPUTE</div>
           
           <div className="space-y-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-[0.3em] italic flex items-center gap-2 px-2">
                 <List className="w-4 h-4 text-blue-500" /> VERİ SETİ GİRİŞİ
              </label>
              <textarea 
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 className="w-full bg-white/5 border-2 border-white/5 rounded-3xl p-8 font-black text-lg focus:border-blue-500/30 outline-none transition-all min-h-[180px] leading-relaxed italic"
                 placeholder="Örn: 10, 22, 45, 12, 100..."
              />
              <p className="text-[10px] text-muted italic px-4 mt-2">
                * Sayıları virgül (,), boşluk veya yeni satır ile ayırarak girebilirsiniz.
              </p>
           </div>

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Analiz Ediliyor √" isCalculateDisabled={true} className="!mt-4" />
        </div>

        <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
           <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
           <p className="text-[10px] text-muted leading-relaxed italic">
              <b>Analiz Notu:</b> Standart sapma, veri setindeki değerlerin ortalamadan ne kadar uzaklaştığını gösterir. Düşük sapma, verilerin ortalamaya yakın (homojen) olduğunu, yüksek sapma ise verilerin geniş bir aralığa yayıldığını (heterojen) gösterir.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
