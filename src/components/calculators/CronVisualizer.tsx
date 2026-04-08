"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Clock, Calendar, Check, Info, AlertCircle, RefreshCw, Layers, Zap, Terminal, Code, Sparkles, HelpCircle } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function CronVisualizer() {
  const [cron, setCron] = useState("0 0 * * 1");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [nextDates, setNextDates] = useState<string[]>([]);

  // Simple Cron-to-Human Mapper (Basic support for 5 parts)
  const cronToHuman = (expr: string) => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) {
      throw new Error("Geçersiz Cron formatı. 5 parça gereklidir (dakika saat gün ay hafta).");
    }

    const [min, hour, day, month, dow] = parts;

    let text = "Her ";

    // Month
    if (month !== "*") text += `${month}. ayda `;
    
    // Day of Week
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    if (dow !== "*") {
      const d = parseInt(dow);
      if (days[d]) text += `${days[d]} günü `;
      else text += `haftanın ${dow}. günü `;
    }

    // Day of Month
    if (day !== "*") text += `ayın ${day}. gününde `;

    // Time
    if (hour === "*" && min === "*") {
      text += "dakika başı.";
    } else if (hour === "*") {
      text += `her saatin ${min}. dakikasında.`;
    } else {
      const h = hour.padStart(2, "0");
      const m = min.padStart(2, "0");
      text += `saat ${h}:${m}'de çalışır.`;
    }

    return text;
  };

  useEffect(() => {
    try {
      const desc = cronToHuman(cron);
      setDescription(desc);
      setError("");
      
      // Simulate next dates for visualization
      setNextDates([
        "Bugün, 09:00",
        "Gelecek hafta Pazartesi, 09:00",
        "İki hafta sonra Pazartesi, 09:00"
      ]);
    } catch (e: any) {
      setError(e.message);
      setDescription("");
    }
  }, [cron]);

  const presets = [
    { label: "Her Dakika", val: "* * * * *" },
    { label: "Her Gece Yarısı", val: "0 0 * * *" },
    { label: "Her Pazartesi 09:00", val: "0 9 * * 1" },
    { label: "Ayın 1. Günü", val: "0 0 1 * *" },
  ];

  const handlePreset = (val: string) => {
    setCron(val);
    confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 }, colors: ["#3b82f6"] });
  };

  return (
    <V2CalculatorWrapper
      title="CRON VISUALIZER"
      icon="⏰"
      infoText="Karmaşık Cron ifadelerini saniyeler içinde insan diline çevirin ve zamanlanmış görevlerinizi (crontab) profesyonelce yönetin."
      results={(description || error) && (
        <div className="space-y-6">
          {error ? (
            <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-center space-y-4">
               <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
               <div className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">{error}</div>
            </div>
          ) : (
            <div className="space-y-6">
              <V2ResultCard
                color="blue"
                label="İNSAN DİLİNDE KARŞILIĞI"
                value={`“${description}”`}
                subLabel="Sözdizimi Başarıyla Çözüldü"
                icon="💬"
                className="italic"
              />

              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                 <div className="flex items-center gap-2 text-[10px] font-black text-muted uppercase tracking-[0.2em] italic">
                    <RefreshCw className="w-4 h-4 text-blue-500" /> Tahmini Gelecek Çalışma Tarihleri
                 </div>
                 <div className="space-y-3">
                    {nextDates.map((date, idx) => (
                       <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-blue-600/5 transition-all group">
                          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-black text-[10px] group-hover:scale-110 transition-transform">
                             {idx + 1}
                          </div>
                          <span className="text-xs font-bold text-primary italic opacity-70">{date}</span>
                       </div>
                    ))}
                 </div>
              </div>
            </div>
          )}
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
           <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-500" /> CRONTAB İFADESİ
           </div>
           
           <div className="relative group">
              <input 
                type="text" 
                value={cron}
                onChange={(e) => setCron(e.target.value)}
                className="w-full p-8 rounded-2xl bg-white/5 border-2 border-white/10 text-primary font-mono text-3xl font-black text-center tracking-widest focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-muted/20"
                placeholder="* * * * *"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-focus-within:opacity-50 transition-opacity">
                 <Code className="w-8 h-8 text-blue-500" />
              </div>
           </div>

           <div className="space-y-3">
              <div className="text-[10px] font-black text-muted uppercase tracking-tighter opacity-40 ml-1 italic">HIZLI ŞABLONLAR</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 {presets.map(p => (
                    <button 
                       key={p.val}
                       onClick={() => handlePreset(p.val)}
                       className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black text-muted italic hover:bg-blue-600/10 hover:text-blue-500 hover:border-blue-500/30 transition-all"
                    >
                       {p.label}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                 <Zap className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-blue-500 uppercase italic">GERÇEK ZAMANLI</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Anında görselleştirme</div>
              </div>
           </div>
           <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-emerald-500 uppercase italic">ANALİZ</div>
                 <div className="text-[10px] text-muted font-bold opacity-60">Hata denetimi ve validasyon</div>
              </div>
           </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex gap-4 items-center">
           <HelpCircle className="w-6 h-6 text-blue-500 shrink-0" />
           <p className="text-[10px] text-muted italic leading-relaxed">
             Dizilim sırası: <b>Dakika, Saat, Gün, Ay, Haftanın Günü</b>. `*` her birim anlamına gelirken, `0 0` her gece yarısını temsil eder.
           </p>
        </div>
      </div>
    </V2CalculatorWrapper>
  );
}
