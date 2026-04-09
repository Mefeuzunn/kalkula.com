"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, 
  RotateCcw, History, Sparkles, Zap, Info 
} from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Select } from "./ui-v2/V2Select";

const DiceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

export function DiceRoller() {
  const [diceCount, setDiceCount] = useState("1");
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<number[][]>([]);

  const rollDice = () => {
    setIsRolling(true);
    const count = parseInt(diceCount);
    
    let iterations = 0;
    const interval = setInterval(() => {
      const tempResults = Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
      setResults(tempResults);
      iterations++;
      
      if (iterations > 15) {
        clearInterval(interval);
        const finalResults = Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
        setResults(finalResults);
        setHistory(prev => [finalResults, ...prev].slice(0, 5));
        setIsRolling(false);
        
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#8b5cf6", "#6366f1", "#d946ef"]
        });
      }
    }, 80);
  };

  const reset = () => {
    setDiceCount("1");
    setResults([]);
    setIsRolling(false);
    setHistory([]);
  };

  return (
    <V2CalculatorWrapper
      title="ZAR ATMA"
      icon="🎲"
      infoText="İhtiyacınız olan sayıda zarı anında atın. Masaüstü oyunları, karar verme süreçleri ve eğlence için geliştirilmiş tarafsız zar motoru."
      results={(results.length > 0 || history.length > 0) && (
        <div className="space-y-8">
           <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-4 py-4">
                 {results.map((val, idx) => {
                    const DiceIcon = DiceIcons[val - 1] || Dice1;
                    return (
                       <div 
                         key={idx}
                         className={`w-28 h-28 rounded-3xl bg-white/5 border-2 flex items-center justify-center transition-all duration-300 relative group ${isRolling ? 'border-purple-500 animate-bounce scale-110 rotate-12 shadow-[0_0_40px_rgba(139,92,246,0.2)]' : 'border-white/10 shadow-xl'}`}
                         style={{ animationDelay: `${idx * 0.1}s` }}
                       >
                          <DiceIcon className={`w-16 h-16 transition-all duration-200 ${isRolling ? 'text-purple-400 blur-[1px]' : 'text-primary'}`} />
                          {!isRolling && (
                             <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-black shadow-lg">
                                {val}
                             </div>
                          )}
                       </div>
                    );
                 })}
              </div>
              <div className="mt-6 text-[10px] font-black text-muted uppercase tracking-[0.4em] italic opacity-40">
                 {isRolling ? "ZARLAR ATILIYOR..." : `TOPLAM: ${results.reduce((a, b) => a + b, 0)}`}
              </div>
           </div>

           {history.length > 0 && !isRolling && (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                 <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2 italic">
                    <History className="w-4 h-4 text-purple-500" /> GEÇMİŞ ATISLAR
                 </div>
                 <div className="space-y-2">
                    {history.map((roll, i) => (
                       <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                          <div className="flex gap-1">
                             {roll.map((v, j) => {
                                const Icon = DiceIcons[v-1] || Dice1;
                                return <Icon key={j} className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />;
                             })}
                          </div>
                          <div className="ml-auto text-xs font-black italic text-muted">
                             TOPLAM: {roll.reduce((a, b) => a + b, 0)}
                          </div>
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
           <V2Select 
             label="ZAR SAYISI"
             value={diceCount}
             onChange={setDiceCount}
             options={[
               { value: "1", label: "1 Zar" },
               { value: "2", label: "2 Zar" },
               { value: "3", label: "3 Zar" },
               { value: "4", label: "4 Zar" },
               { value: "5", label: "5 Zar" },
             ]}
           />

           <V2ActionRow 
             onCalculate={rollDice}
             onReset={reset}
             calculateLabel={isRolling ? "ATILIYOR..." : "🎲 ZAR AT"}
             isCalculateDisabled={isRolling}
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                 <Zap className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-purple-500 uppercase italic">GERÇEKÇİ</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Fizik Tabanlı Simülasyon</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">ADİL</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Matematiksel Rastlantısallık</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> Zar atma aracı tamamen tarayıcı tarafında çalışır ve hiçbir şekilde manipüle edilemez.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
