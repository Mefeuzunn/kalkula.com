"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

type ActivityLevel = "sedanter" | "hafif" | "orta" | "yuksek";

export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<ActivityLevel>("sedanter");
  const [climate, setClimate] = useState<"normal" | "sicak">("normal");
  const [result, setResult] = useState<{ liters: number; glasses: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    if (w <= 0) {
      setResult(null);
      return;
    }

    // Base: 35ml per kg
    let baseLiters = w * 0.035;

    // Activity adjustment
    const activityFactors: Record<ActivityLevel, number> = {
      sedanter: 0,
      hafif: 0.3,
      orta: 0.7,
      yuksek: 1.2
    };

    // Hot climate adjustment (+10-20%)
    const climateFactor = climate === "sicak" ? 1.2 : 1;

    const totalLiters = (baseLiters + activityFactors[activity]) * climateFactor;
    
    setResult({
      liters: totalLiters,
      glasses: Math.ceil(totalLiters / 0.25) // 250ml per glass
    });

    if (w > 0) {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#60a5fa", "#ffffff"]
      });
    }
  };

  useEffect(() => {
    calculate();
  }, [weight, activity, climate]);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Card */}
        <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-blue-500/20 flex flex-col gap-6">
           <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Vücut Ağırlığı (kg)</label>
              <input 
                 type="number" 
                 value={weight} 
                 onChange={(e) => setWeight(e.target.value)}
                 className="input-field !text-3xl !py-4 font-black border-4 border-border focus:border-blue-500 transition-all"
                 placeholder="0"
              />
           </div>

           <div className="flex flex-col gap-4">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Günlük Hareket Seviyesi</label>
              <div className="grid grid-cols-2 gap-2">
                 {[
                   { id: "sedanter", label: "Az Hareket", icon: "🛋️" },
                   { id: "hafif", label: "Hafif Egz.", icon: "🚶" },
                   { id: "orta", label: "Orta Tempo", icon: "🏃" },
                   { id: "yuksek", label: "Ağır Spor", icon: "🏋️" }
                 ].map((act) => (
                    <button 
                       key={act.id}
                       onClick={() => setActivity(act.id as ActivityLevel)}
                       className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${activity === act.id ? 'bg-blue-500 text-white border-blue-500 shadow-lg scale-[1.02]' : 'bg-surface border-border text-muted hover:border-blue-500/30'}`}
                    >
                       <span className="text-xl">{act.icon}</span>
                       <span className="text-[10px] font-black uppercase text-center">{act.label}</span>
                    </button>
                 ))}
              </div>
           </div>

           <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">İklim Koşulları</label>
              <div className="flex bg-secondary/20 p-1.5 rounded-2xl gap-1">
                 <button 
                    onClick={() => setClimate("normal")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${climate === "normal" ? 'bg-surface text-blue-600 shadow-sm' : 'text-muted'}`}
                 >
                    Normal Isı
                 </button>
                 <button 
                    onClick={() => setClimate("sicak")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${climate === "sicak" ? 'bg-surface text-orange-600 shadow-sm' : 'text-muted'}`}
                 >
                    Sıcak / Nemli
                 </button>
              </div>
           </div>
        </div>

        {/* Result Area */}
        <div className="flex flex-col gap-4">
           {result ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-10 h-full bg-white dark:bg-zinc-900 border-4 border-blue-500/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
                    
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-5xl mb-6 animate-bounce">💧</div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4 italic">Günlük Hedefiniz</span>
                    
                    <div className="text-7xl font-black italic tracking-tighter text-blue-600 mb-2 drop-shadow-sm">
                       {result.liters.toFixed(2)} <span className="text-2xl not-italic">Litre</span>
                    </div>
                    
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-200/50 to-transparent my-8"></div>
                    
                    <div className="flex items-center gap-4">
                       <div className="flex flex-col items-center">
                          <span className="text-3xl font-black text-primary">{result.glasses}</span>
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest italic">Bardak</span>
                       </div>
                       <div className="h-8 w-px bg-border"></div>
                       <div className="flex flex-col items-center">
                          <span className="text-3xl font-black text-primary">{Math.ceil(result.liters * 1000 / 500)}</span>
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest italic">Şişe (500ml)</span>
                       </div>
                    </div>

                    <div className="mt-10 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-[9px] text-blue-600 dark:text-blue-300 font-medium leading-relaxed italic text-center max-w-xs">
                       💡 İpucu: Suyu bir kerede değil, gün içine yayarak tüketmek emilimi artırır ve vücudunuzu daha iyi hidre eder.
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-12 bg-secondary/5 rounded-[2.5rem] border-dashed border-4 border-border/40 text-center opacity-70">
                 <div className="text-5xl mb-6 grayscale">🥛</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-widest italic leading-relaxed">
                    SU İHTİYACINIZI<br/>ANALİZ ETMEK İÇİN<br/>KİLONUZU GİRİNİZ
                 </h4>
              </div>
           )}
        </div>
      </div>

      <div className="panel p-6 bg-blue-500/5 rounded-[2rem] border border-blue-500/10 flex flex-col md:flex-row items-center gap-6">
         <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-2xl">🧊</div>
         <div className="flex flex-col gap-1">
            <h4 className="text-sm font-black text-blue-950 dark:text-blue-200 uppercase tracking-widest italic">Su İçmenin Gücü</h4>
            <p className="text-[11px] leading-relaxed text-blue-800 dark:text-blue-400 font-medium">
               Vücudumuzun %60'ı sudan oluşur. Yeterli su tüketimi metabolizmayı %30 hızlandırır, cilt sağlığını korur ve zihinsel odaklanmayı artırır. 
               Egzersiz yaptığınız her 30 dakika için bu miktara ek olarak yaklaşık 500ml eklemeniz önerilir.
            </p>
         </div>
      </div>
    </div>
  );
}
