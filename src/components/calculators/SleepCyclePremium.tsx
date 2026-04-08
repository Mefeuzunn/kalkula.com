"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Moon, Clock, Bed, Sparkles, Info } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";

export function SleepCyclePremium() {
  const [mode, setMode] = useState<"wakeup" | "sleepnow">("wakeup");
  const [time, setTime] = useState("07:00");
  
  const [results, setResults] = useState<{
    time: string;
    cycles: number;
    hours: string;
    score: string;
    color: string;
  }[]>([]);

  const calculate = () => {
    const sleepCycles = [6, 5, 4, 3];
    const offset = 14;
    const newResults: any[] = [];

    if (mode === "wakeup") {
      const [h, m] = time.split(":").map(Number);
      const wakeDate = new Date();
      wakeDate.setHours(h, m, 0);

      sleepCycles.forEach(cycle => {
        const sleepDate = new Date(wakeDate.getTime() - (cycle * 90 * 60000) - (offset * 60000));
        newResults.push({
          time: sleepDate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          cycles: cycle,
          hours: `${(cycle * 1.5).toFixed(1)} Saat`,
          score: cycle >= 5 ? "Mükemmel" : cycle === 4 ? "İyi" : "Kısa",
          color: cycle === 6 ? "emerald" : cycle === 5 ? "blue" : cycle === 4 ? "amber" : "red"
        });
      });
    } else {
      const now = new Date();
      sleepCycles.forEach(cycle => {
        const wakeDate = new Date(now.getTime() + (cycle * 90 * 60000) + (offset * 60000));
        newResults.push({
          time: wakeDate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          cycles: cycle,
          hours: `${(cycle * 1.5).toFixed(1)} Saat`,
          score: cycle >= 5 ? "Mükemmel" : cycle === 4 ? "İyi" : "Kısa",
          color: cycle === 6 ? "emerald" : cycle === 5 ? "blue" : cycle === 4 ? "amber" : "red"
        });
      });
    }

    setResults(newResults);
    if (newResults.length > 0) {
      confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 }, colors: ["#8b5cf6", "#ffffff"] });
    }
  };

  const reset = () => { setMode("wakeup"); setTime("07:00"); setResults([]); };

  useEffect(() => { calculate(); }, [mode, time]);

  return (
    <V2CalculatorWrapper
      title="AKILLI UYKU DÖNGÜSÜ"
      icon="🌙"
      infoText="İdeal bir uyku döngüsü 90 dakikadır. Zinde uyanmak için döngünün sonunda uyanmanız gerekir. Hesaplamaya 14 dakikalık uykuya dalma süresi dahildir."
      results={results.length > 0 && (
        <div className="space-y-4">
          <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Bed className="w-4 h-4" /> İDEAL ZAMAN ÇİZELGESİ
          </div>
          <div className="grid grid-cols-1 gap-3">
            {results.map((res, i) => (
              <div key={i} className={`bg-white/5 p-5 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all border-l-4 ${
                res.color === 'emerald' ? 'border-l-emerald-500' : 
                res.color === 'blue' ? 'border-l-blue-500' : 
                res.color === 'amber' ? 'border-l-amber-500' : 'border-l-red-500'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black italic text-sm ${
                    res.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' : 
                    res.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 
                    res.color === 'amber' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {res.time}
                  </div>
                  <div>
                    <div className="text-sm font-black text-primary italic uppercase tracking-wide">{res.hours} UYKU</div>
                    <div className="text-[10px] text-muted uppercase font-black opacity-60">{res.cycles} DÖNGÜ</div>
                  </div>
                </div>
                <div className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest ${
                   res.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' : 
                   res.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 
                   res.color === 'amber' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {res.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Hesaplama Modu</label>
          <div className="flex bg-white/5 p-2 rounded-3xl gap-2 shadow-inner">
             <button 
                onClick={() => setMode("wakeup")}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "wakeup" ? 'bg-white text-slate-900 shadow-[0_10px_20px_rgba(255,255,255,0.1)] scale-[1.02]' : 'text-muted hover:text-primary'}`}
             >
                <Clock className="w-3 h-3 inline-block mr-2 mt-[-2px]" /> UYANMA SAATİ
             </button>
             <button 
                onClick={() => setMode("sleepnow")}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "sleepnow" ? 'bg-white text-slate-900 shadow-[0_10px_20px_rgba(255,255,255,0.1)] scale-[1.02]' : 'text-muted hover:text-primary'}`}
             >
                <Moon className="w-3 h-3 inline-block mr-2 mt-[-2px]" /> ŞİMDİ UYURSAM
             </button>
          </div>
        </div>

        {mode === "wakeup" && (
          <div className="animate-slide-up">
            <V2Input 
               label="KAÇTA UYANACAKSINIZ?" 
               type="time" 
               value={time} 
               onChange={setTime} 
            />
          </div>
        )}

        <div className="p-6 rounded-2xl bg-white/3 border border-white/5 flex gap-4 items-center">
           <div className="p-3 bg-purple-500/10 rounded-xl">
              <Sparkles className="w-5 h-5 text-purple-400" />
           </div>
           <p className="text-[10px] text-muted font-medium italic leading-relaxed">
              {mode === "wakeup" ? 'Zinde uyanmak için yukarıdaki saatlerden birinde yatağa girmiş olmalısınız.' : 'Eğer hemen uyursanız, yukarıdaki saatlerde uyanmak sizi daha enerjik hissettirecektir.'}
           </p>
        </div>
      </div>

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="🌙 Zamanı Planla"
      />
    </V2CalculatorWrapper>
  );
}
