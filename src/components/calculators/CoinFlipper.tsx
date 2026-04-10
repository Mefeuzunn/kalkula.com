"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Coins, RotateCcw, Zap, Sparkles, Info } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

export function CoinFlipper() {
  const [result, setResult] = useState<"Yazı" | "Tura" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

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
        setIsFlipping(false);
        
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
        });
      }
    }, 60);
  };

  const reset = () => {
    setResult(null);
    setIsFlipping(false);
  };

  return (
    <V2CalculatorWrapper
      title="YAZI TURA"
      icon="🪙"
      infoText="Kararsız kaldığınız anlarda şansınızı kadere bırakın. Şık tasarımı ve adil algoritmasıyla klasik yazı tura deneyimi."
      results={(result !== null) && (
        <div className="flex flex-col items-center py-12">
          <div 
            className={`w-48 h-48 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-amber-300/30 flex items-center justify-center transition-all duration-300 relative shadow-2xl ${isFlipping ? 'animate-spin scale-110 !rotate-[720deg]' : 'scale-100'}`}
          >
            <div className="absolute inset-2 rounded-full border border-amber-200/20 flex items-center justify-center">
              <span className={`text-5xl font-black italic tracking-tighter text-amber-950 transition-all ${isFlipping ? 'blur-sm' : ''}`}>
                {result === "Yazı" ? "Y" : result === "Tura" ? "T" : "?"}
              </span>
            </div>
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-amber-900/10"></div>
          </div>
          <div className={`mt-8 px-8 py-3 rounded-2xl bg-white/5 border border-white/5 transition-all ${isFlipping ? 'opacity-40' : 'opacity-100'}`}>
            <span className="text-2xl font-black italic tracking-widest uppercase text-primary">
              {isFlipping ? "DÖNÜYOR..." : result || "HAZIR"}
            </span>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-10 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center gap-8">
          <div className="p-4 rounded-full bg-amber-500/10 text-amber-500">
            <Coins className="w-12 h-12" />
          </div>
          <V2ActionRow 
            onCalculate={flipCoin}
            onReset={reset}
            calculateLabel={isFlipping ? "ATIŞ YAPILIYOR..." : "🪙 PARA AT"}
            isCalculateDisabled={isFlipping}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <Zap className="w-5 h-5 text-amber-500" />
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic">REAL-TIME</div>
           </div>
           <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic">ADİL ŞANS</div>
           </div>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
