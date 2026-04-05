"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

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

    if (w <= 0 || h <= 0 || a <= 0) {
      setBmr(null);
      return;
    }

    // Mifflin-St Jeor Equation
    let result = (10 * w) + (6.25 * h) - (5 * a);
    result = gender === "male" ? result + 5 : result - 161;

    setBmr(result);

    confetti({
      particleCount: 15,
      spread: 30,
      origin: { y: 0.7 },
      colors: ["#ec4899", "#d946ef"]
    });
  };

  useEffect(() => {
    calculate();
  }, [gender, weight, height, age]);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Settings */}
        <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-pink-500/20 flex flex-col gap-6">
           <div className="flex bg-secondary/15 p-1.5 rounded-2xl gap-1">
              <button 
                 onClick={() => setGender("male")}
                 className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "male" ? 'bg-surface text-pink-600 shadow-sm' : 'text-muted'}`}
              >
                 ♂ ERKEK
              </button>
              <button 
                 onClick={() => setGender("female")}
                 className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "female" ? 'bg-surface text-pink-600 shadow-sm' : 'text-muted'}`}
              >
                 ♀ KADIN
              </button>
           </div>

           <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Kilo (kg)</label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="input-field !py-4 font-black text-center"/>
           </div>

           <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Boy (cm)</label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="input-field !py-4 font-black text-center"/>
           </div>

           <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Yaş</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} className="input-field !py-4 font-black text-center"/>
           </div>
        </div>

        {/* Result */}
        <div className="flex flex-col gap-4 h-full">
           {bmr !== null ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-10 h-full bg-white dark:bg-zinc-900 border-4 border-pink-500/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-pink-600 tracking-[0.3em] uppercase rotate-12">Metabolic Engine</div>
                    
                    <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center text-4xl mb-6">🧘</div>
                    <span className="text-[10px] font-black text-pink-600 uppercase tracking-[0.4em] mb-4 italic">Bazal Metabolizma Hızı</span>
                    
                    <div className="text-6xl font-black italic tracking-tighter text-pink-600 mb-2 drop-shadow-sm">
                       {bmr.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} <span className="text-2xl not-italic ml-1">kcal</span>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-200/50 to-transparent my-8"></div>

                    <p className="text-[10px] font-bold text-muted uppercase italic max-w-[240px] leading-relaxed">
                       Bu miktar, vücudunuzun tam dinlenme halindeyken hayatta kalmak için harcadığı enerjidir.
                    </p>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex items-center justify-center bg-secondary/5 rounded-[2.5rem] grayscale opacity-40">
                 <span className="text-xl font-black italic text-muted">Hesaplanıyor... ✨</span>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
