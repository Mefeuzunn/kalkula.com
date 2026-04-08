"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Plus, Trash2, Info, Calculator, Star, BookOpen } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function LessonGradeCalculator() {
  const [grades, setGrades] = useState<string[]>(["", ""]);
  const [result, setResult] = useState<{ average: number } | null>(null);

  const calculate = () => {
    const validGrades = grades.map(g => parseFloat(g)).filter(g => !isNaN(g));
    if (validGrades.length > 0) {
      const avg = validGrades.reduce((a, b) => a + b, 0) / validGrades.length;
      setResult({ average: avg });
      if (avg >= 70) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setGrades(["", ""]);
    setResult(null);
  };

  const updateGrade = (idx: number, val: string) => {
    const newGrades = [...grades];
    newGrades[idx] = val;
    setGrades(newGrades);
  };

  const addGrade = () => setGrades([...grades, ""]);
  const removeGrade = (idx: number) => {
    if (grades.length <= 1) return;
    setGrades(grades.filter((_, i) => i !== idx));
  };

  return (
    <V2CalculatorWrapper
      title="DERS ORTALAMASI HESAPLA"
      icon="📝"
      infoText="Herhangi bir dersin çeşitli notlarını girerek aritmetik ortalamasını anında hesaplayın."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.average >= 85 ? "emerald" : result.average >= 70 ? "purple" : result.average >= 50 ? "blue" : "red"}
            label="ARİTMETİK ORTALAMA"
            value={result.average.toFixed(2)}
            subLabel="Puan Bazında Sonuç"
            icon="🏆"
          />

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
             <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Star className="w-5 h-5" />
             </div>
             <div>
                <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-1">NOT ANALİZİ</div>
                <p className="text-[11px] text-muted italic leading-tight">
                  Tüm notların eşit ağırlıklı olduğu varsayılarak hesaplanmıştır.
                </p>
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
           <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Not Listesi
           </h4>
           <button 
             onClick={addGrade}
             className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95"
           >
             <Plus className="w-3.5 h-3.5" /> Not Ekle
           </button>
        </div>

        <div className="space-y-3">
          {grades.map((grade, idx) => (
            <div key={idx} className="flex gap-3 items-center animate-fade-in">
               <div className="flex-1">
                 <V2Input 
                   label="" 
                   placeholder={`Not ${idx + 1}`} 
                   value={grade} 
                   onChange={val => updateGrade(idx, val)} 
                   fieldClassName="!py-3 font-black text-center italic"
                   min="0"
                   max="100"
                 />
               </div>
               <button 
                 onClick={() => removeGrade(idx)}
                 className="p-3 rounded-xl text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90"
               >
                 <Trash2 className="w-5 h-5" />
               </button>
            </div>
          ))}
        </div>
        
        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📉 Ortalamayı Bul"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
