"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function WaterIntakePremium() {
  const [weight, setWeight] = useState("75");
  const [activity, setActivity] = useState("30"); // minutes
  const [consumed, setConsumed] = useState(0); // ml
  
  const [target, setTarget] = useState(2500); // default ml

  const calculateTarget = () => {
    const w = parseFloat(weight) || 0;
    const a = parseFloat(activity) || 0;
    
    // Base 33ml per kg + 500ml per 30m exercise
    const base = w * 33;
    const extra = (a / 30) * 500;
    const final = Math.max(1500, base + extra);
    
    setTarget(final);
  };

  const addWater = (amount: number) => {
    const next = consumed + amount;
    setConsumed(next);
    
    if (next >= target && consumed < target) {
       confetti({
         particleCount: 100,
         spread: 70,
         origin: { y: 0.6 },
         colors: ["#3b82f6", "#60a5fa", "#ffffff"]
       });
    }
  };

  const resetProgress = () => {
    if (confirm("Günün ilerlemesini sıfırlamak istiyor musunuz?")) {
      setConsumed(0);
    }
  };

  useEffect(() => {
    calculateTarget();
  }, [weight, activity]);

  const progressPercent = Math.min(100, (consumed / target) * 100);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-blue-500/20 flex flex-col gap-8">
              <div className="flex flex-col gap-4 text-center">
                 <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] italic mb-2">Günlük Hedef</span>
                 <div className="text-5xl font-black italic tracking-tighter text-primary">
                    {(target / 1000).toFixed(1)} <span className="text-xl not-italic ml-1">Litre</span>
                 </div>
              </div>

              <div className="w-full h-px bg-border/40"></div>

              <div className="flex flex-col gap-4">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Kilonuz (kg)</label>
                 <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="input-field !py-4 font-black text-center"/>
              </div>

              <div className="flex flex-col gap-4">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Günlük Egzersiz (Dakika)</label>
                 <input type="number" value={activity} onChange={e => setActivity(e.target.value)} className="input-field !py-4 font-black text-center"/>
              </div>

              <div className="mt-4 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-center">
                 <p className="text-[10px] text-blue-900/70 dark:text-blue-400 leading-relaxed font-bold italic">
                    💡 Hidrasyon, metabolizma hızınızı %30'a kadar artırabilir. Hedefinize ulaşmak için bardaklara dokunun!
                 </p>
              </div>
           </div>
        </div>

        {/* Interaction Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           <div className="panel p-8 bg-surface border-4 border-blue-500/10 shadow-2xl rounded-[3rem] relative overflow-hidden flex flex-col items-center min-h-[500px]">
              <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-blue-600 tracking-[0.3em] uppercase rotate-12">Hydration Engine v1.2</div>
              
              <div className="relative w-48 h-64 border-4 border-blue-500/20 rounded-b-[4rem] rounded-t-2xl overflow-hidden mb-10 mt-10 bg-secondary/5 shadow-inner">
                 {/* Progress Water Fill */}
                 <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000 ease-out"
                    style={{ height: `${progressPercent}%` }}
                 >
                    <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 animate-pulse"></div>
                 </div>
                 {/* Percent text */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-4xl font-black italic tracking-tighter ${progressPercent > 50 ? 'text-white' : 'text-blue-600/50'}`}>%{progressPercent.toFixed(0)}</span>
                 </div>
              </div>

              <div className="flex flex-col items-center gap-6 w-full">
                 <div className="flex flex-wrap justify-center gap-4">
                    {[
                      { amount: 200, icon: "🥃", label: "200ml" },
                      { amount: 330, icon: "🥤", label: "330ml" },
                      { amount: 500, icon: "🍶", label: "500ml" }
                    ].map(item => (
                       <button 
                          key={item.label}
                          onClick={() => addWater(item.amount)}
                          className="flex flex-col items-center p-4 bg-white dark:bg-zinc-800 border-2 border-border/60 rounded-3xl hover:border-blue-500 transition-all hover:scale-105 active:scale-95 shadow-sm"
                       >
                          <span className="text-3xl mb-1">{item.icon}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{item.label}</span>
                       </button>
                    ))}
                 </div>

                 <div className="flex items-center gap-8 mt-6">
                    <div className="flex flex-col items-center">
                       <span className="text-[10px] font-black text-muted uppercase italic mb-1">Kalan</span>
                       <span className="text-2xl font-black text-primary">{Math.max(0, target - consumed)} ml</span>
                    </div>
                    <div className="w-px h-10 bg-border"></div>
                    <div className="flex flex-col items-center">
                       <span className="text-[10px] font-black text-muted uppercase italic mb-1">Tüketilen</span>
                       <span className="text-2xl font-black text-blue-600">{consumed} ml</span>
                    </div>
                 </div>

                 <button 
                    onClick={resetProgress}
                    className="mt-6 text-[10px] font-black uppercase text-muted hover:text-red-500 tracking-[0.2em] transition-colors italic"
                 >
                    İlerlemeyi Sıfırla
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
