"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Dice5, Shuffle, RefreshCw, Zap, Sparkles, Hash, Trash2, Info, AlertTriangle, PlayCircle, Trophy } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const generate = () => {
    const minValue = parseInt(min) || 0;
    const maxValue = parseInt(max) || 0;
    
    if (minValue >= maxValue) {
      return;
    }

    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
      count++;
      if (count > 25) {
        clearInterval(interval);
        const final = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        setResult(final);
        setHistory(prev => [final, ...prev].slice(0, 5));
        setIsRolling(false);
        confetti({ 
          particleCount: 60, 
          spread: 50, 
          origin: { y: 0.7 }, 
          colors: ["#3b82f6", "#10b981", "#f59e0b"] 
        });
      }
    }, 60);
  };

  const reset = () => {
    setMin("1");
    setMax("100");
    setResult(null);
    setIsRolling(false);
    setHistory([]);
  };

  const minValue = parseInt(min) || 0;
  const maxValue = parseInt(max) || 0;
  const isInvalid = minValue >= maxValue;

  return (
    <V2CalculatorWrapper
      title="RASTGELE SAYI ÜRETİCİ"
      icon="🎲"
      infoText="Belirlediğiniz alt ve üst limitler arasında tamamen tarafsız rastgele sayılar üretin. Çekilişler, kuralar ve oyunlar için profesyonel seçim algoritması."
      results={(result !== null || history.length > 0) && (
        <div className="space-y-8">
           {/* Final Number Display */}
           <div className="flex flex-col items-center">
              <div 
                className={`w-48 h-48 rounded-[3rem] bg-white/5 border-4 flex items-center justify-center transition-all duration-300 relative group overflow-hidden ${isRolling ? 'border-blue-500 scale-110 rotate-6 shadow-[0_0_50px_rgba(59,130,246,0.3)]' : 'border-white/10 shadow-2xl shadow-black/40'}`}
              >
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 
                 <span className={`text-7xl font-black italic tracking-tighter transition-all duration-300 ${isRolling ? 'text-blue-500 blur-[2px]' : 'text-primary'}`}>
                    {result ?? "?"}
                 </span>

                 {isRolling && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <RefreshCw className="w-24 h-24 text-blue-500/10 animate-spin" />
                    </div>
                 )}
              </div>
              <div className="mt-6 text-[10px] font-black text-muted uppercase tracking-[0.4em] italic opacity-40">
                 {isRolling ? "SAYI SEÇİLİYOR..." : "SONUÇ BELİRLENDİ"}
              </div>
           </div>

           {/* History List */}
           {history.length > 0 && !isRolling && (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                 <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2 italic">
                    <Zap className="w-4 h-4 text-amber-500" /> GEÇMİS ÜRETİMLER
                 </div>
                 <div className="flex flex-wrap gap-3">
                    {history.map((num, i) => (
                       <div key={i} className={`px-5 py-3 rounded-xl bg-white/5 border border-white/5 text-lg font-black italic transition-all hover:scale-110 cursor-default ${i === 0 ? 'text-blue-500 border-blue-500/30 bg-blue-500/5' : 'text-muted opacity-60'}`}>
                          {num}
                       </div>
                    ))}
                 </div>
              </div>
           )}
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-8">
           <div className="grid grid-cols-2 gap-6">
              <V2Input 
                label="MİNUMUM" 
                value={min} 
                onChange={setMin} 
                type="number"
                placeholder="1"
                fieldClassName="!text-3xl text-center font-black italic"
              />
              <V2Input 
                label="MAKSİMUM" 
                value={max} 
                onChange={setMax} 
                type="number"
                placeholder="100"
                fieldClassName="!text-3xl text-center font-black italic"
              />
           </div>

           {isInvalid && (
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex gap-3 items-center animate-shake">
                 <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                 <p className="text-[10px] text-red-500 font-bold italic uppercase tracking-widest leading-relaxed">
                   Minimum değer maksimum değerden küçük olmalıdır!
                 </p>
              </div>
           )}

           <V2ActionRow 
             onCalculate={generate} 
             onReset={reset} 
             calculateLabel={isRolling ? "ÜRETİLİYOR..." : "🎲 RASTGELE SEÇ"}
             isCalculateDisabled={isRolling || isInvalid}
             className="!mt-2"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Shuffle className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">ALGORİTMA</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Matematiksel Tarafsızlık</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">HIZLI</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Anında Rastlantısal Seçim</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> Bu araç tarayıcı tabanlı `Math.random` motorunu kullanarak kura ve çekilişlerinizde tam güvenilirlik sağlar.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
