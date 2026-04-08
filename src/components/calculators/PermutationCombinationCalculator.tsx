"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Hash, Calculator, RotateCcw, Info, Boxes } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

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
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#6366f1", "#a855f7"]
    });
  };

  useEffect(() => {
    calculate();
  }, [n, r]);

  const reset = () => {
    setN("10"); setR("3"); setResults(null);
  };

  return (
    <V2CalculatorWrapper
      title="PERMÜTASYON & KOMBİNASYON"
      icon="🎲"
      infoText="Seçim ve sıralama problemlerini çözün. n elemanlı bir kümeden r elemanın kaç farklı şekilde seçilebileceğini (kombinasyon) veya sıralanabileceğini (permütasyon) hesaplayın."
      results={results && (
        <div className="space-y-8 animate-result">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2ResultCard color="indigo" label="KOMBİNASYON C(n,r)" value={results.combination.toLocaleString('tr-TR')} icon="📦" />
              <V2ResultCard color="purple" label="PERMÜTASYON P(n,r)" value={results.permutation.toLocaleString('tr-TR')} icon="🔢" />
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic flex items-center gap-2 px-2">
                 <Hash className="w-4 h-4 text-indigo-500" /> FAKTÖRİYEL ANALİZİ
              </div>
              <div className="grid grid-cols-3 gap-4">
                 {[
                   { label: "n!", val: results.nFact },
                   { label: "r!", val: results.rFact },
                   { label: "(n-r)!", val: results.diffFact }
                 ].map((item, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-3xl border border-white/5 text-center overflow-hidden">
                       <span className="text-[9px] font-black text-muted uppercase italic mb-1 tracking-widest block">{item.label}</span>
                       <span className="text-sm font-black text-primary italic truncate block px-2">
                          {item.val > 1000000 ? item.val.toExponential(2) : item.val.toLocaleString('tr-TR')}
                       </span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <V2Input label="TOPLAM ELEMAN (n)" value={n} onChange={setN} type="number" placeholder="10" fieldClassName="!text-2xl font-black italic text-center" />
              <V2Input label="SEÇİLEN ELEMAN (r)" value={r} onChange={setR} type="number" placeholder="3" fieldClassName="!text-2xl font-black italic text-center" />
           </div>
           
           <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-center">
              <p className="text-[10px] text-muted leading-relaxed font-bold italic">
                 Permütasyon: Sırlama önemlidir. P(n,r) = n! / (n-r)! <br />
                 Kombinasyon: Sıralama önemsizdir. C(n,r) = n! / (r! · (n-r)!)
              </p>
           </div>

           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Anlık Güncelleniyor" isCalculateDisabled={true} />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
