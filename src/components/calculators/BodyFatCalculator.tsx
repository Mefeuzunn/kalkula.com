"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Info, Ruler, User, Zap } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("180");
  const [neck, setNeck] = useState("40");
  const [waist, setWaist] = useState("90");
  const [hip, setHip] = useState("100");

  const [result, setResult] = useState<{ bodyFat: number; category: string; color: string; themeColor: "emerald" | "blue" | "amber" | "red" } | null>(null);

  const calculate = () => {
    const h = parseFloat(height) || 0;
    const n = parseFloat(neck) || 0;
    const w = parseFloat(waist) || 0;
    const hp = parseFloat(hip) || 0;

    if (h <= 0 || n <= 0 || w <= 0 || (gender === "female" && hp <= 0)) { setResult(null); return; }

    let bf = 0;
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }
    if (bf < 0) bf = 0;

    let category = "Normal"; 
    let themeColor: "emerald" | "blue" | "amber" | "red" = "blue";

    if (gender === "male") {
      if (bf < 6) { category = "Atletik / Düşük"; themeColor = "emerald"; }
      else if (bf < 14) { category = "Fit"; themeColor = "emerald"; }
      else if (bf < 18) { category = "Ortalama"; themeColor = "blue"; }
      else if (bf < 25) { category = "Normal"; themeColor = "amber"; }
      else { category = "Yüksek (Obez)"; themeColor = "red"; }
    } else {
      if (bf < 14) { category = "Atletik / Düşük"; themeColor = "emerald"; }
      else if (bf < 21) { category = "Fit"; themeColor = "emerald"; }
      else if (bf < 25) { category = "Ortalama"; themeColor = "blue"; }
      else if (bf < 32) { category = "Normal"; themeColor = "amber"; }
      else { category = "Yüksek (Obez)"; themeColor = "red"; }
    }
    setResult({ bodyFat: bf, category, color: "", themeColor });
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
  };

  const reset = () => { setHeight("180"); setNeck("40"); setWaist("90"); setHip("100"); setResult(null); };

  useEffect(() => { calculate(); }, [gender]);

  return (
    <V2CalculatorWrapper
      title="VÜCUT YAĞ ORANI (US NAVY)"
      icon="🧑‍🔬"
      infoText="Amerikan Donanması (US Navy) tarafından geliştirilen bu metod, boy ve çevre ölçümlerinizi kullanarak vücut yağ oranınızı yüksek doğrulukla tahmin eder."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.themeColor}
            label="VÜCUT YAĞ ORANI"
            value={`%${result.bodyFat.toFixed(1)}`}
            subLabel={result.category}
            icon="⚖️"
          />
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
             <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-muted uppercase tracking-widest">KATEGORİ ANALİZİ</span>
                <span className="text-[10px] font-medium text-muted italic">US Navy Standards</span>
             </div>
             <div className="flex gap-2 h-3 rounded-full overflow-hidden bg-white/5">
                <div className={`flex-1 ${result.themeColor === 'emerald' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/10'}`}></div>
                <div className={`flex-1 ${result.themeColor === 'blue' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`}></div>
                <div className={`flex-1 ${result.themeColor === 'amber' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-white/10'}`}></div>
                <div className={`flex-1 ${result.themeColor === 'red' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-white/10'}`}></div>
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Cinsiyet</label>
          <div className="flex bg-white/5 p-2 rounded-[2rem] gap-2 shadow-inner">
             <button 
                onClick={() => setGender("male")}
                className={`flex-1 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "male" ? 'bg-white text-slate-900 shadow-xl scale-[1.02]' : 'text-muted hover:text-primary'}`}
             >
                ♂ ERKEK
             </button>
             <button 
                onClick={() => setGender("female")}
                className={`flex-1 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "female" ? 'bg-white text-slate-900 shadow-xl scale-[1.02]' : 'text-muted hover:text-primary'}`}
             >
                ♀ KADIN
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <V2Input label="BOY (CM)" value={height} onChange={setHeight} unit="CM" placeholder="180" />
          <V2Input label="BOYUN (CM)" value={neck} onChange={setNeck} unit="CM" placeholder="40" />
          <V2Input label="BEL (CM)" value={waist} onChange={setWaist} unit="CM" placeholder="90" />
          {gender === "female" && (
            <div className="animate-slide-up">
              <V2Input label="KALÇA (CM)" value={hip} onChange={setHip} unit="CM" placeholder="100" />
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4 items-center">
           <Info className="w-5 h-5 text-blue-500" />
           <p className="text-[10px] text-muted font-medium italic leading-relaxed">
              Bel çevresini göbek deliği hizasından, boyun çevresini ise gırtlağın hemen altından ölçünüz.
           </p>
        </div>
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="🧑‍🔬 Analiz Et"
      />
    </V2CalculatorWrapper>
  );
}
