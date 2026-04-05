"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

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
    const sleepCycles = [6, 5, 4, 3]; // Ideal number of cycles
    const offset = 14; // Average minutes to fall asleep
    const newResults: any[] = [];

    if (mode === "wakeup") {
      // Input: Target Wake Up Time -> Output: When to sleep
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
          color: cycle === 6 ? "#8b5cf6" : cycle === 5 ? "#a855f7" : cycle === 4 ? "#c084fc" : "#d8b4fe"
        });
      });
    } else {
      // Input: Current Time -> Output: When to wake up
      const now = new Date();
      sleepCycles.forEach(cycle => {
        const wakeDate = new Date(now.getTime() + (cycle * 90 * 60000) + (offset * 60000));
        newResults.push({
          time: wakeDate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          cycles: cycle,
          hours: `${(cycle * 1.5).toFixed(1)} Saat`,
          score: cycle >= 5 ? "Mükemmel" : cycle === 4 ? "İyi" : "Kısa",
          color: cycle === 6 ? "#8b5cf6" : cycle === 5 ? "#a855f7" : cycle === 4 ? "#c084fc" : "#d8b4fe"
        });
      });
    }

    setResults(newResults);
    confetti({ particleCount: 15, spread: 30, origin: { y: 0.7 }, colors: ["#8b5cf6", "#ffffff"] });
  };

  useEffect(() => {
    calculate();
  }, [mode, time]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-violet-500/20 flex flex-col gap-6">
              <div className="flex bg-secondary/15 p-1.5 rounded-2xl gap-1">
                 <button 
                    onClick={() => setMode("wakeup")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "wakeup" ? 'bg-surface text-violet-600 shadow-sm' : 'text-muted'}`}
                 >
                    ⏰ NE ZAMAN UYANMALIYIM?
                 </button>
                 <button 
                    onClick={() => setMode("sleepnow")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "sleepnow" ? 'bg-surface text-violet-600 shadow-sm' : 'text-muted'}`}
                 >
                    🛌 ŞİMDİ UYURSAM?
                 </button>
              </div>

              {mode === "wakeup" && (
                 <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Uyanmak İstediğiniz Saat</label>
                    <input 
                       type="time" 
                       value={time} 
                       onChange={e => setTime(e.target.value)}
                       className="input-field !py-4 font-black text-2xl text-center bg-violet-500/5 border-violet-500/20"
                    />
                 </div>
              )}

              <div className="mt-4 p-5 bg-violet-500/5 rounded-2xl border border-violet-500/10 flex items-start gap-4">
                 <span className="text-2xl">🌙</span>
                 <p className="text-[10px] text-violet-900/70 dark:text-violet-400 leading-relaxed font-bold italic lowercase">
                    * BİR UYKU DÖNGÜSÜ YAKLAŞIK 90 DAKİKADIR. ZİNDE UYANMAK İÇİN DÖNGÜNÜN SONUNA (REM EVRESİNE) DENK GELMELİSİNİZ.
                 </p>
              </div>
           </div>
        </div>

        {/* Results Timeline */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           <div className="panel p-8 bg-surface border-4 border-violet-500/10 shadow-2xl rounded-[3rem] relative overflow-hidden flex flex-col flex-1 min-h-[500px]">
              <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-violet-600 tracking-[0.3em] uppercase rotate-12">Sleep Engine v3.0</div>
              
              <div className="mb-10 text-center">
                 <span className="text-[10px] font-black text-violet-600 uppercase tracking-[0.4em] mb-4 bg-violet-500/10 px-4 py-1 rounded-full border border-violet-500/20 italic">Önerilen Zaman Çizelgesi</span>
                 <h3 className="text-2xl font-black italic tracking-tighter text-primary uppercase mt-4">
                    {mode === "wakeup" ? 'Bu saatlerde uyumalısınız:' : 'Bu saatlerde uyanmalısınız:'}
                 </h3>
              </div>

              <div className="grid gap-4 w-full">
                 {results.map((res, i) => (
                    <div 
                       key={i}
                       className="group relative flex items-center justify-between p-6 bg-white dark:bg-zinc-800 border-2 border-border/50 rounded-3xl hover:border-violet-500 transition-all hover:scale-[1.02] shadow-sm"
                       style={{ borderColor: i === 0 || i === 1 ? 'rgba(139, 92, 246, 0.3)' : undefined }}
                    >
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black italic text-violet-600 bg-violet-500/10 border border-violet-500/20">
                             {res.time}
                          </div>
                          <div className="flex flex-col">
                             <span className="text-xs font-black uppercase tracking-widest text-primary">{res.hours} Toplam Uyku</span>
                             <span className="text-[10px] font-bold text-muted uppercase italic">{res.cycles} Tam Döngü</span>
                          </div>
                       </div>

                       <div className="flex flex-col items-end">
                          <span className={`text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest italic`} style={{ background: res.color + "15", color: res.color }}>
                             {res.score}
                          </span>
                       </div>

                       {/* Hover Badge */}
                       {(i === 0 || i === 1) && (
                          <div className="absolute -top-3 left-6 px-3 py-1 bg-violet-600 text-white rounded-full text-[8px] font-black uppercase tracking-widest">EN ZİNDE</div>
                       )}
                    </div>
                 ))}
              </div>

              <div className="mt-auto pt-10 text-center">
                 <p className="text-[9px] font-black text-muted uppercase tracking-[0.2em] italic max-w-sm mx-auto leading-relaxed">
                    * Ortalama uykuya dalma süresi olan 14 dakika sonuçlara eklenmiştir.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
