"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, RotateCcw, Zap, Sparkles, Info } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2Select } from "./ui-v2/V2Select";

const DiceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

export function DiceRoller() {
  const [diceCount, setDiceCount] = useState("1");
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);

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
        setIsRolling(false);
        
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.7 },
        });
      }
    }, 80);
  };

  const reset = () => {
    setDiceCount("1");
    setResults([]);
    setIsRolling(false);
  };

  return (
    <V2CalculatorWrapper
      title="ZAR ATMA"
      icon="🎲"
      infoText="Masaüstü oyunları ve karar verme süreçleri için geliştirilmiş, tarafsız rastgele sayı motoru."
      results={results.length > 0 && (
        <div className="flex flex-col items-center py-8">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {results.map((val, idx) => {
              const DiceIcon = DiceIcons[val - 1] || Dice1;
              return (
                <div 
                  key={idx}
                  className={`w-28 h-28 rounded-3xl bg-white/5 border-2 flex items-center justify-center transition-all duration-300 relative ${isRolling ? 'border-purple-500 animate-bounce' : 'border-white/10 shadow-xl'}`}
                >
                  <DiceIcon className={`w-16 h-16 ${isRolling ? 'text-purple-400 blur-sm' : 'text-primary'}`} />
                  {!isRolling && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-black shadow-lg">
                      {val}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-[10px] font-black text-muted uppercase tracking-[0.4em] italic opacity-40">
            {isRolling ? "ZARLAR ATILIYOR..." : `TOPLAM: ${results.reduce((a, b) => a + b, 0)}`}
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-8">
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

        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <Zap className="w-5 h-5 text-purple-500" />
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic">REAL-TIME</div>
           </div>
           <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic">ADİL ŞANS</div>
           </div>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
