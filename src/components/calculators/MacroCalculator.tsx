"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function MacroCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("180");
  const [age, setAge] = useState("25");
  const [activity, setActivity] = useState("1.375"); // Lightly active
  const [goal, setGoal] = useState<"maintain" | "lose" | "gain">("maintain");

  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    goalCalories: number;
    macros: { protein: number; carbs: number; fat: number };
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const a = parseFloat(age) || 0;
    const act = parseFloat(activity) || 1.2;

    if (w <= 0 || h <= 0 || a <= 0) {
      setResults(null);
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = gender === "male" ? bmr + 5 : bmr - 161;

    const tdee = bmr * act;
    let goalCalories = tdee;
    
    // Macro Ratios (%)
    let ratios = { p: 0.3, c: 0.4, f: 0.3 }; // Maintain default

    if (goal === "lose") {
      goalCalories = tdee - 500;
      ratios = { p: 0.4, c: 0.35, f: 0.25 };
    } else if (goal === "gain") {
      goalCalories = tdee + 300;
      ratios = { p: 0.25, c: 0.5, f: 0.25 };
    }

    const protein = (goalCalories * ratios.p) / 4;
    const carbs = (goalCalories * ratios.c) / 4;
    const fat = (goalCalories * ratios.f) / 9;

    setResults({
      bmr,
      tdee,
      goalCalories,
      macros: { protein, carbs, fat }
    });

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.7 },
      colors: ["#10b981", "#3b82f6"]
    });
  };

  useEffect(() => {
    calculate();
  }, [gender, weight, height, age, activity, goal]);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-emerald-500/20 flex flex-col gap-6">
              <div className="flex bg-secondary/15 p-1.5 rounded-2xl gap-1">
                 <button 
                    onClick={() => setGender("male")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "male" ? 'bg-surface text-emerald-600 shadow-sm' : 'text-muted'}`}
                 >
                    ♂ ERKEK
                 </button>
                 <button 
                    onClick={() => setGender("female")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === "female" ? 'bg-surface text-emerald-600 shadow-sm' : 'text-muted'}`}
                 >
                    ♀ KADIN
                 </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Kilo (kg)</label>
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="input-field !py-3 font-black text-center"/>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Boy (cm)</label>
                    <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="input-field !py-3 font-black text-center"/>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Yaş</label>
                    <input type="number" value={age} onChange={e => setAge(e.target.value)} className="input-field !py-3 font-black text-center"/>
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Aktivite Seviyesi</label>
                 <select value={activity} onChange={e => setActivity(e.target.value)} className="input-field font-bold text-sm">
                    <option value="1.2">Hareketsiz (Masa başı)</option>
                    <option value="1.375">Hafif Hareketli (1-3 gün spor)</option>
                    <option value="1.55">Orta Hareketli (3-5 gün spor)</option>
                    <option value="1.725">Çok Hareketli (6-7 gün spor)</option>
                    <option value="1.9">Profesyonel Sporcu</option>
                 </select>
              </div>

              <div className="flex flex-col gap-4">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Beslenme Hedefi</label>
                 <select value={goal} onChange={e => setGoal(e.target.value as any)} className="input-field font-black uppercase text-xs tracking-widest">
                    <option value="maintain">Kiloyu Koru</option>
                    <option value="lose">Kilo Ver (-500 kcal)</option>
                    <option value="gain">Kas Kazan / Kilo Al (+300 kcal)</option>
                 </select>
              </div>
           </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-8 h-full bg-white dark:bg-zinc-900 border-4 border-emerald-500/10 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-emerald-600 tracking-[0.3em] uppercase rotate-12">Bio Engine v2.0</div>
                    
                    <div className="flex flex-col items-center text-center mb-10">
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4 bg-emerald-500/10 px-4 py-1 rounded-full border border-emerald-500/20 italic">Günlük Hedef Kalori</span>
                       <div className="text-6xl font-black italic tracking-tighter text-primary">
                          {results.goalCalories.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} <span className="text-2xl not-italic ml-1">kcal</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                       <div className="p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10 flex flex-col items-center">
                          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic mb-2">Protein</span>
                          <span className="text-2xl font-black text-primary">{results.macros.protein.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} gr</span>
                       </div>
                       <div className="p-6 bg-amber-500/5 rounded-3xl border border-amber-500/10 flex flex-col items-center">
                          <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest italic mb-2">Karbonhidrat</span>
                          <span className="text-2xl font-black text-primary">{results.macros.carbs.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} gr</span>
                       </div>
                       <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/10 flex flex-col items-center">
                          <span className="text-[9px] font-black text-red-600 uppercase tracking-widest italic mb-2">Yağ</span>
                          <span className="text-2xl font-black text-primary">{results.macros.fat.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} gr</span>
                       </div>
                    </div>

                    <div className="mt-auto panel p-6 bg-secondary/5 rounded-3xl border border-border">
                       <div className="flex justify-between items-center mb-6">
                          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Vücut Analiz Özeti</h4>
                          <span className="text-[9px] font-black text-muted bg-white px-3 py-1 rounded-full border border-border italic uppercase">Mifflin-St Jeor</span>
                       </div>
                       <div className="flex flex-col gap-4">
                          <div className="flex justify-between text-xs font-bold italic">
                             <span className="text-muted">Bazal Metabolizma Hızı (BMR):</span>
                             <span className="text-primary font-black">{results.bmr.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} kcal</span>
                          </div>
                          <div className="flex justify-between text-xs font-bold italic border-t border-border pt-4">
                             <span className="text-muted">Günlük Toplam Harcama (TDEE):</span>
                             <span className="text-primary font-black">{results.tdee.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} kcal</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-12 bg-secondary/5 rounded-[3rem] grayscale opacity-40 text-center">
                 <div className="text-6xl mb-6">🥗</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-widest italic">Vücut verilerinizi girerek analizi başlatın</h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
