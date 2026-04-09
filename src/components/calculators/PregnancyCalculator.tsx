"use client";

import React, { useState, useEffect } from "react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function PregnancyCalculator() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [result, setResult] = useState<{ dueDate: string; weeks: number; daysLeft: number; trimester: string; trimesterColor: string; themeColor: "blue" | "emerald" | "amber" | "red" } | null>(null);

  const calculate = () => {
    if (!lastPeriod) { setResult(null); return; }
    const date = new Date(lastPeriod);
    const today = new Date();
    const dueDate = new Date(date.getTime() + 280 * 24 * 60 * 60 * 1000);
    const diffTime = today.getTime() - date.getTime();
    const weeks = Math.max(0, Math.min(42, Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))));
    const daysLeft = Math.max(0, Math.round((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    let trimester = "1. Trimester";
    let trimesterColor = "#3b82f6";
    let themeColor: "blue" | "emerald" | "amber" | "red" = "blue";

    if (weeks >= 14 && weeks < 28) { 
       trimester = "2. Trimester"; 
       trimesterColor = "#22c55e"; 
       themeColor = "emerald";
    }
    else if (weeks >= 28) { 
       trimester = "3. Trimester"; 
       trimesterColor = "#f59e0b"; 
       themeColor = "amber";
    }

    setResult({ dueDate: dueDate.toLocaleDateString("tr-TR"), weeks, daysLeft, trimester, trimesterColor, themeColor });
  };

  const reset = () => {
    const today = new Date().toISOString().split("T")[0];
    setLastPeriod(today);
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setLastPeriod(today);
  }, []);

  useEffect(() => { calculate(); }, [lastPeriod]);

  return (
    <V2CalculatorWrapper
      title="GEBELİK TAKİP ANALİZİ"
      icon="🤰"
      infoText="Tahmini doğum tarihi, son adet baş tarihinden 280 gün (40 hafta) sonrasına karşılık gelir. Gebelik süreci kişiden kişiye farklılık gösterebilir, detaylar için doktorunuza başvurunuz."
      results={result && (
        <div className="space-y-8">
          <V2ResultCard
            color={result.themeColor}
            icon="👶"
            label="TAHMİNİ DOĞUM TARİHİ"
            value={result.dueDate}
            subLabel={result.trimester}
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">GEÇEN SÜRE</div>
                <div className="text-2xl font-black text-primary italic">{result.weeks} <span className="text-xs opacity-50">HAFTA</span></div>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">KALAN SÜRE</div>
                <div className="text-2xl font-black text-primary italic">{result.daysLeft} <span className="text-xs opacity-50">GÜN</span></div>
             </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted">
                <span>Tamamlanma Oranı</span>
                <span>%{Math.min(100, ((result.weeks / 40) * 100)).toFixed(0)}</span>
             </div>
             <div className="relative h-4 bg-white/5 rounded-full overflow-hidden">
                <div 
                   className="h-full transition-all duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                   style={{ 
                      width: `${Math.min(100, (result.weeks / 40) * 100)}%`, 
                      background: result.trimesterColor 
                   }}
                />
             </div>
          </div>
        </div>
      )}
    >
      <V2Input
        label="SON ADET TARİHİNİZ (SAT)"
        type="date"
        value={lastPeriod}
        onChange={setLastPeriod}
      />

      <V2ActionRow
        onCalculate={calculate}
        onReset={reset}
        calculateLabel="🤰 Gebelik Takibini Başlat"
      />
    </V2CalculatorWrapper>
  );
}
