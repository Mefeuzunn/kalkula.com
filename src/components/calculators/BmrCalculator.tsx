"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Info, Activity, Flame, Zap } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function BmrCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("30");
  const [bmr, setBmr] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const a = parseFloat(age) || 0;
    if (w <= 0 || h <= 0 || a <= 0) { setBmr(null); return; }
    let result = (10 * w) + (6.25 * h) - (5 * a);
    result = gender === "male" ? result + 5 : result - 161;
    setBmr(result);
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
  };

  const reset = () => { setGender("male"); setWeight("70"); setHeight("175"); setAge("30"); setBmr(null); };

  useEffect(() => { calculate(); }, [gender]);

  return (
    <V2CalculatorWrapper
      title="BAZAL METABOLİZMA HIZI (BMR)"
      icon="🧘"
      infoText="Mifflin-St Jeor denklemine göre, vücudunuzun tam dinlenme halindeyken hayatta kalmak (nefes almak, kalp atışı vb.) için harcadığı minimum enerji miktarını hesaplar."
      results={bmr !== null && (
        <div className="space-y-6">
          <V2ResultCard
            color="emerald"
            label="GÜNLÜK BAZAL ENERJİ"
            value={`${bmr.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} KCAL`}
            subLabel="Minimum Hayatta Kalma Enerjisi"
            icon="🔥"
          />
          
          <div className="space-y-4">
             <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" /> AKTİVİTEYE GÖRE TOPLAM İHTİYAÇ (TDEE)
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: "HAREKETSİZ", factor: 1.2, icon: "🪑" },
                  { label: "HAFİF AKTİF", factor: 1.375, icon: "🚶" },
                  { label: "ORTA AKTİF", factor: 1.55, icon: "🏃" }
                ].map((act, i) => (
                  <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center group hover:bg-white/10 transition-all">
                    <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">{act.label}</div>
                    <div className="text-xl font-black text-primary italic">{Math.round(bmr * act.factor)} <span className="text-[10px] not-italic opacity-50">KCAL</span></div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4 items-center">
             <Info className="w-5 h-5 text-blue-500" />
             <p className="text-[10px] text-muted font-medium italic leading-relaxed">
                TDEE (Toplam Günlük Enerji Harcaması), BMR değerinizin aktivite katsayısı ile çarpılmasıyla bulunur.
             </p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <V2Input label="KİLO (KG)" value={weight} onChange={setWeight} unit="KG" placeholder="70" />
          <V2Input label="BOY (CM)" value={height} onChange={setHeight} unit="CM" placeholder="175" />
          <V2Input label="YAŞ" value={age} onChange={setAge} unit="YAŞ" placeholder="30" />
        </div>
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="🔥 BMR Hesapla"
      />
    </V2CalculatorWrapper>
  );
}
