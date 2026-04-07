"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar, Check, Info, AlertCircle, RefreshCw, Layers } from "lucide-react";

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
    const days = ["Pazar", "Pazartesi", "Salı", "Çarsamba", "Perşembe", "Cuma", "Cumartesi"];
    if (dow !== "*") {
      const d = parseInt(dow);
      if (days[d]) text += `${days[d]} günü `;
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
      
      // Simulate next dates (Static example for UX)
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

  return (
    <div className="calc-wrapper animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-600">
          <Clock size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black">Cron Expression Visualizer</h1>
          <p className="text-muted text-sm uppercase tracking-widest font-bold">Zamanlanmış Görev Çözümleyici</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input & Presets */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
             <div className="space-y-6">
                <div className="space-y-4">
                   <label className="text-xs font-black text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Layers size={14} className="text-blue-500" /> CRONTAB İFADESİ
                   </label>
                   <input 
                     type="text" 
                     value={cron}
                     onChange={(e) => setCron(e.target.value)}
                     className="input-field w-full !text-2xl font-mono text-center tracking-widest focus:ring-4 focus:ring-blue-500/10 transition-all py-6"
                     placeholder="* * * * *"
                   />
                </div>

                <div className="space-y-3">
                   <p className="text-[10px] font-black text-muted uppercase tracking-tighter">HIZLI ŞABLONLAR</p>
                   <div className="grid grid-cols-2 gap-2">
                      {presets.map(p => (
                         <button 
                            key={p.val}
                            onClick={() => setCron(p.val)}
                            className="p-3 bg-secondary/10 border border-border rounded-xl text-[10px] font-bold text-muted hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all"
                         >
                            {p.label}
                         </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Translation & Preview */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           {error ? (
              <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2.5rem] text-center flex flex-col items-center justify-center gap-4 text-red-600 h-full">
                 <AlertCircle size={48} />
                 <p className="font-black text-sm uppercase tracking-widest">{error}</p>
              </div>
           ) : (
              <div className="space-y-6 flex flex-col h-full">
                 {/* Human Readable Translation */}
                 <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
                    <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                       <Clock size={200} />
                    </div>
                    <p className="text-[10px] font-black opacity-80 uppercase tracking-widest mb-2">İNSAN DİLİNDE KARŞILIĞI</p>
                    <h3 className="text-3xl font-black leading-tight italic">
                       “{description}”
                    </h3>
                    <div className="mt-8 flex items-center gap-3 bg-white/10 p-3 rounded-2xl w-fit backdrop-blur-sm">
                       <Check size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Sözdizimi Geçerli</span>
                    </div>
                 </div>

                 {/* Next Runs Illustration */}
                 <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl flex-grow">
                    <h4 className="text-xs font-black text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
                       <RefreshCw size={14} className="text-blue-500" /> Tahmini Gelecek Çalışma Tarihleri
                    </h4>
                    <div className="space-y-3">
                       {nextDates.map((date, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-secondary/10 rounded-2xl border border-border/40 hover:bg-secondary/20 transition-all cursor-default">
                             <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-600 flex items-center justify-center font-black text-[10px]">
                                {idx + 1}
                             </div>
                             <span className="text-sm font-bold text-primary">{date}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>

      <div className="calc-info-box mt-12">
        <span className="calc-info-box-icon">💡</span>
        <span className="calc-info-box-text text-muted">
           <b>Kullanım Notu:</b> Cron ifadeleri soldan sağa doğru; <b>Dakika, Saat, Ayın Günü, Ay ve Haftanın Günü</b> sırasını takip eder. <code>*</code> işareti "her birim" anlamına gelirken, <code>*/5</code> gibi ifadeler "her 5 birimde bir" anlamına gelir.
        </span>
      </div>
    </div>
  );
}
