"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Hash, Calculator, RotateCcw, Info, ArrowLeftRight } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2ResultCard } from "./ui-v2/V2ResultCard";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

export function EbobEkokCalculator() {
  const [num1, setNum1] = useState("24");
  const [num2, setNum2] = useState("36");
  const [result, setResult] = useState<{ ebob: number; ekok: number } | null>(null);

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  const calculate = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) { setResult(null); return; }
    const ebob = gcd(a, b);
    const ekok = (a * b) / ebob;
    setResult({ ebob, ekok });
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ["#3b82f6", "#10b981"] });
  };

  const reset = () => { setNum1("24"); setNum2("36"); setResult(null); };

  useEffect(() => { calculate(); }, [num1, num2]);

  return (
    <V2CalculatorWrapper
      title="EBOB & EKOK HESAPLAYICI"
      icon="🔢"
      infoText="İki pozitif tam sayının En Büyük Ortak Bölenini (EBOB) ve En Küçük Ortak Katını (EKOK) anında hesaplayın. Öklid Algoritması ile hassas sonuçlar üretir."
      results={result && (
        <div className="space-y-8 animate-result">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2ResultCard color="blue" label="EBOB" value={result.ebob.toString()} icon="⬇️" className="!text-4xl font-black italic" />
              <V2ResultCard color="emerald" label="EKOK" value={result.ekok.toString()} icon="⬆️" className="!text-4xl font-black italic" />
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-widest italic flex items-center gap-2 px-2">
                 <Hash className="w-4 h-4 text-blue-500" /> MATEMATİKSEL SAĞLAMA
              </div>
              <div className="flex flex-col gap-4">
                 <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                    <span className="text-[10px] font-black text-muted uppercase tracking-widest italic">EBOB × EKOK</span>
                    <span className="text-xl font-black text-primary italic">{(result.ebob * result.ekok).toLocaleString("tr-TR")}</span>
                 </div>
                 <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                    <span className="text-[10px] font-black text-muted uppercase tracking-widest italic">{num1} × {num2}</span>
                    <span className="text-xl font-black text-primary italic">{(parseInt(num1) * parseInt(num2)).toLocaleString("tr-TR")} ✓</span>
                 </div>
              </div>
           </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-8 relative overflow-hidden">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
              <V2Input label="1. SAYI" value={num1} onChange={setNum1} type="number" placeholder="24" fieldClassName="!text-3xl font-black italic text-center" />
              <V2Input label="2. SAYI" value={num2} onChange={setNum2} type="number" placeholder="36" fieldClassName="!text-3xl font-black italic text-center" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-3 md:mt-4 z-10">
                 <button 
                  onClick={() => {
                    const t = num1; setNum1(num2); setNum2(t);
                    confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 }, colors: ["#3b82f6"] });
                  }}
                  className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-white/10 text-blue-500 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group backdrop-blur-md"
                 >
                    <ArrowLeftRight className="w-6 h-6 rotate-90 md:rotate-0 transition-transform group-hover:rotate-180" />
                 </button>
              </div>
           </div>

           <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-muted leading-relaxed italic">
                 <b>İpucu:</b> EBOB × EKOK çarpımı her zaman iki sayının kendi çarpımına eşittir. Bu özellik hesaplamanın doğruluğunu onaylamak için kullanılır.
              </p>
           </div>
           
           <V2ActionRow onCalculate={() => {}} onReset={reset} calculateLabel="Canlı Güncelleniyor" isCalculateDisabled={true} />
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
