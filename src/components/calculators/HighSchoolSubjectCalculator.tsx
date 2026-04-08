"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, BookOpen, Clock, Calculator, Star, Target } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function HighSchoolSubjectCalculator() {
  const [courseName, setCourseName] = useState("");
  const [hours, setHours] = useState("");
  const [grade, setGrade] = useState("");

  const [result, setResult] = useState<{ weightedScore: number } | null>(null);

  const calculate = () => {
    const h = parseFloat(hours);
    const g = parseFloat(grade);

    if (h > 0 && g >= 0) {
      // MEB Lise Mevzuatina Gore Ders Puani = Ders Notu * Haftalik Ders Saati
      const weightedScore = h * g;
      setResult({ weightedScore });
      if (weightedScore >= 200) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setCourseName("");
    setHours("");
    setGrade("");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="DERS AĞIRLIK PUANI"
      icon="📕"
      infoText="Lise müfredatında bir dersin haftalık ağırlığı ile o dersin genel ortalamaya olan puan katkısını anında hesaplayın."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color="emerald"
            label="TOPLAM AGIRLIK PUANI"
            value={result.weightedScore.toFixed(2)}
            subLabel="Ortalamaya Katkı Tabanı"
            icon="📊"
          />

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
             <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Target className="w-5 h-5" />
             </div>
             <div>
                <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-1">DERS ETKİSİ</div>
                <p className="text-[11px] text-muted italic leading-tight">
                  Bu değer, tüm derslerin ağırlık puanları toplamının toplam saat sayısına bölünmesiyle karne notunuzu oluşturur.
                </p>
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <V2Input 
          label="DERSİN ADI" 
          value={courseName} 
          onChange={setCourseName} 
          type="text" 
          placeholder="Örn: Matematik" 
          fieldClassName="font-bold italic"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input 
             label="HAFTALIK DERS SAATİ" 
             value={hours} 
             onChange={setHours} 
             unit="SA" 
             placeholder="6" 
             min="1" 
             fieldClassName="!bg-blue-500/5 !text-blue-500 !border-blue-500/10"
           />
           <V2Input 
             label="DERS KARNE NOTU" 
             value={grade} 
             onChange={setGrade} 
             unit="P" 
             placeholder="75" 
             max="100" 
             fieldClassName="!bg-emerald-500/5 !text-emerald-500 !border-emerald-500/10"
           />
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📉 Ağırlık Puanını Bul"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
