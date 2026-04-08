"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Droplet, Plus, RotateCcw, Info } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function WaterIntakePremium() {
  const [weight, setWeight] = useState("75");
  const [activity, setActivity] = useState("30"); 
  const [consumed, setConsumed] = useState(0); 
  const [target, setTarget] = useState(2500); 

  const calculateTarget = () => {
    const w = parseFloat(weight) || 0;
    const a = parseFloat(activity) || 0;
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
    <V2CalculatorWrapper
      title="AKILLI SU TAKİPÇİSİ"
      icon="💧"
      infoText="Vücut ağırlığınıza ve günlük aktivite seviyenize göre kişiselleştirilmiş su içme hedefinizi belirler ve takibini sağlar."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Sol Panel: Ayarlar */}
        <div className="space-y-6">
           <div className="p-8 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 text-center animate-pulse-slow">
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2">GÜNLÜK HEDEFİNİZ</div>
              <div className="text-5xl font-black text-primary italic">{(target / 1000).toFixed(1)} <span className="text-xl opacity-50">LİTRE</span></div>
           </div>

           <div className="space-y-6">
              <V2Input label="KİLONUZ (KG)" value={weight} onChange={setWeight} unit="KG" placeholder="75" />
              <V2Input label="GÜNLÜK EGZERSİZ (DK)" value={activity} onChange={setActivity} unit="DK" placeholder="30" />
           </div>

           <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-start">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
              <p className="text-[10px] text-muted font-medium leading-relaxed italic">
                 Hidrasyon, metabolizma hızınızı artırabilir ve bilişsel fonksiyonları destekler. Hedefinize ulaşmak için aşağıdaki bardaklara dokunarak su ekleyin.
              </p>
           </div>
        </div>

        {/* Sağ Panel: İnteraktif Bardak */}
        <div className="glass-morphism p-8 rounded-[3rem] border border-white/10 flex flex-col items-center shadow-2xl relative overflow-hidden group">
           {/* Su Dolum Efekti */}
           <div className="relative w-40 h-56 border-4 border-blue-500/20 rounded-b-[3.5rem] rounded-t-xl overflow-hidden mb-8 mt-4 bg-white/5 shadow-inner">
              <div 
                 className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000 ease-out"
                 style={{ height: `${progressPercent}%` }}
              >
                 <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 ${progressPercent > 50 ? 'text-white' : 'text-blue-500/50'}`}>%{progressPercent.toFixed(0)}</span>
              </div>
           </div>

           {/* Hızlı Ekleme Butonları */}
           <div className="grid grid-cols-3 gap-3 w-full">
              {[
                { amount: 200, label: "200ML", icon: "🥃" },
                { amount: 330, label: "330ML", icon: "🥤" },
                { amount: 500, label: "500ML", icon: "🍶" }
              ].map(item => (
                <button 
                   key={item.label}
                   onClick={() => addWater(item.amount)}
                   className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-white/10 transition-all active:scale-95 group/btn"
                >
                   <span className="text-2xl mb-1 group-hover/btn:scale-110 transition-transform">{item.icon}</span>
                   <span className="text-[9px] font-black text-muted tracking-widest">{item.label}</span>
                </button>
              ))}
           </div>

           <div className="flex items-center gap-8 mt-8 w-full justify-center">
              <div className="text-center">
                 <div className="text-[9px] font-black text-muted uppercase mb-1">KALAN</div>
                 <div className="text-xl font-black text-primary">{Math.max(0, target - consumed)} ML</div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center">
                 <div className="text-[9px] font-black text-muted uppercase mb-1">TÜKETİLEN</div>
                 <div className="text-xl font-black text-blue-500">{consumed} ML</div>
              </div>
           </div>

           <button 
              onClick={resetProgress}
              className="mt-8 flex items-center gap-2 text-[9px] font-black uppercase text-muted hover:text-red-500 transition-colors tracking-widest"
           >
              <RotateCcw className="w-3 h-3" /> İLERLEMEYİ SIFIRLA
           </button>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
