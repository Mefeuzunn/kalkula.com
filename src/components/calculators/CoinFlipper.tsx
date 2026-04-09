"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  RotateCcw, History, Sparkles, Zap, Info, Coins
} from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

export function CoinFlipper() {
  const [result, setResult] = useState<"Yazı" | "Tura" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [history, setHistory] = useState<("Yazı" | "Tura")[]>([]);

  const flipCoin = () => {
    setIsFlipping(true);
    
    let iterations = 0;
    const interval = setInterval(() => {
      setResult(Math.random() > 0.5 ? "Yazı" : "Tura");
      iterations++;
      
      if (iterations > 20) {
        clearInterval(interval);
        const finalResult = Math.random() > 0.5 ? "Yazı" : "Tura";
        setResult(finalResult);
        setHistory(prev => [finalResult, ...prev].slice(0, 5));
        setIsFlipping(false);
        
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 },
          colors: ["#f59e0b", "#fbbf24", "#d97706"]
        });
      }
    }, 60);
  };

  const reset = () => {
    setResult(null);
    setIsFlipping(false);
    setHistory([]);
  };

  return (
    <V2CalculatorWrapper
      title="YAZI TURA"
      icon="🪙"
      infoText="Kararsız kaldığınız anlarda şansınızı kadere bırakın. Şık tasarımı ve adil algoritmasıyla klasik yazı tura deneyimi."
      results={(result !== null || history.length > 0) && (
        <div className="space-y-8">
           <div className="flex flex-col items-center">
              <div 
                className={`w-48 h-48 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-amber-300/30 flex items-center justify-center transition-all duration-300 relative shadow-[0_0_50px_rgba(245,158,11,0.2)] ${isFlipping ? 'animate-spin scale-110 !rotate-[720deg]' : 'scale-100'}`}
              >
                 <div className="absolute inset-2 rounded-full border border-amber-200/20 flex items-center justify-center">
                    <span className={`text-5xl font-black italic tracking-tighter text-amber-950 transition-all duration-300 ${isFlipping ? 'blur-[2px]' : ''}`}>
                       {result === "Yazı" ? "Y" : result === "Tura" ? "T" : "?"}
                    </span>
                 </div>
                 
                 {/* Internal Rings */}
                 <div className="absolute inset-4 rounded-full border-2 border-dashed border-amber-900/10"></div>
              </div>
              
              <div className="mt-8 px-8 py-3 rounded-2xl bg-white/5 border border-white/5">
                 <span className={`text-2xl font-black italic tracking-widest uppercase transition-all duration-300 ${isFlipping ? 'text-muted opacity-40' : 'text-primary'}`}>
                    {isFlipping ? "PARA DÖNÜYOR..." : result || "HAZIR"}
                 </span>
              </div>
           </div>

           {history.length > 0 && !isFlipping && (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                 <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2 italic">
                    <History className="w-4 h-4 text-amber-500" /> GEÇMİŞ SONUÇLAR
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {history.map((h, i) => (
                       <div key={i} className={`px-4 py-2 rounded-xl text-xs font-black italic transition-all ${i === 0 ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'bg-white/5 text-muted border border-white/5 opacity-60'}`}>
                          {h}
                       </div>
                    ))}
                 </div>
              </div>
           )}
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center gap-8">
           <div className="p-4 rounded-full bg-amber-500/10 text-amber-500">
              <Coins className="w-12 h-12" />
           </div>
           
           <V2ActionRow 
             onCalculate={flipCoin}
             onReset={reset}
             calculateLabel={isFlipping ? "ATIŞ YAPILIYOR..." : "🪙 PARA AT"}
             isCalculateDisabled={isFlipping}
             className="w-full"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                 <Zap className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-amber-500 uppercase italic">ANLIK</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Hızlı Karar Verme Aracı</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">PRO</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Matematiksel Olasılık</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex gap-4 items-center">
           <Info className="w-6 h-6 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             <b>Bilgi:</b> Yazı tura simülasyonu %50-%50 matematiksel olasılık algoritması ile çalışmaktadır.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
