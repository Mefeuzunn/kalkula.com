"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function CalorieCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("30");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState<{ bmr: number; tdee: number; lose: number; gain: number } | null>(null);

  const ACTIVITIES = [
    { value: "1.2", label: "Hareketsiz (Masa başı)" },
    { value: "1.375", label: "Hafif aktif (1-3 gün/hafta)" },
    { value: "1.55", label: "Orta aktif (3-5 gün/hafta)" },
    { value: "1.725", label: "Çok aktif (6-7 gün/hafta)" },
    { value: "1.9", label: "Ekstra aktif (Fiziksel iş)" },
  ];

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a || w <= 0 || h <= 0 || a <= 0) { setResult(null); return; }
    let bmr = gender === "male"
      ? 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
      : 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    const tdee = Math.round(bmr * parseFloat(activity));
    setResult({ bmr: Math.round(bmr), tdee, lose: tdee - 500, gain: tdee + 500 });
  };

  const reset = () => { setGender("male"); setWeight("70"); setHeight("175"); setAge("30"); setActivity("1.2"); setResult(null); };

  useEffect(() => { calculate(); }, [gender, weight, height, age, activity]);

  return (
    <V2CalculatorWrapper
      title="GÜNLÜK KALORİ VE ENERJİ ANALİZİ"
      icon="🔥"
      infoText="Sağlıklı kilo yönetimi için günlük enerji harcamanızı (TDEE) bilmeniz önemlidir. Harris-Benedict formülü kullanılarak bazal metabolizma hızınız ve aktivite seviyenize göre ihtiyaçlarınız hesaplanır."
      results={result && (
        <div className="space-y-8">
          <V2ResultCard
            color="amber"
            icon="⚡"
            label="GÜNLÜK KALORİ İHTİYACINIZ (TDEE)"
            value={`${result.tdee} kcal`}
            subLabel="Kilonuzu Korumak İçin Gereken"
          />

          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
             <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-4">
                <span className="text-muted">Bazal Metabolizma (BMR)</span>
                <span className="text-primary">{result.bmr} kcal</span>
             </div>
             <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-4 text-[#10b981]">
                <span>Kilo Vermek İçin (-500)</span>
                <span>{result.lose} kcal</span>
             </div>
             <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-4 text-[#ef4444]">
                <span>Kilo Almak İçin (+500)</span>
                <span>{result.gain} kcal</span>
             </div>
          </div>

          <div className="p-6 bg-orange-500/5 rounded-2xl border border-orange-500/10 text-[10px] text-orange-400 italic text-center leading-relaxed">
             ℹ️ Sağlıklı kilo değişimi için haftalık 0.5 - 1 kg hedefi idealdir.
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Biyo-Cinsiyet</label>
          <div className="flex bg-white/5 p-1.5 rounded-2xl gap-1">
             <button 
                onClick={() => setGender("male")}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "male" ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-muted hover:text-primary'}`}
             >
                ♂ ERKEK
             </button>
             <button 
                onClick={() => setGender("female")}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "female" ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-muted hover:text-primary'}`}
             >
                ♀ KADIN
             </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <V2Input label="KİLO (KG)" value={weight} onChange={setWeight} unit="KG" />
          <V2Input label="BOY (CM)" value={height} onChange={setHeight} unit="CM" />
        </div>

        <V2Input label="YAŞ" value={age} onChange={setAge} unit="YIL" />

        <V2Select label="HAREKET SEVİYESİ" value={activity} onChange={setActivity}>
           {ACTIVITIES.map(a => <option key={a.value} value={a.value} className="bg-slate-900">{a.label}</option>)}
        </V2Select>
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="⚡ Enerji Analizini Başlat"
      />
    </V2CalculatorWrapper>
  );
}
