"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Calculator, GraduationCap, Award, BookOpen, Star } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function HighSchoolYBPCalculator() {
  const [grade9, setGrade9] = useState("");
  const [grade10, setGrade10] = useState("");
  const [grade11, setGrade11] = useState("");
  const [grade12, setGrade12] = useState("");
  const [result, setResult] = useState<{ ybp: number } | null>(null);

  const calculate = () => {
    const arr = [grade9, grade10, grade11, grade12]
      .map(x => parseFloat(x))
      .filter(x => !isNaN(x) && x > 0);
    
    if (arr.length > 0) {
      const sum = arr.reduce((a, b) => a + b, 0);
      const ybp = sum / arr.length;
      setResult({ ybp });
      if (ybp >= 70) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setGrade9("");
    setGrade10("");
    setGrade11("");
    setGrade12("");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="DİPLOMA NOTU (YBP) HESAPLA"
      icon="📜"
      infoText="Lise öğreniminiz boyunca aldığınız yıl sonu başarı puanlarının (YBP) genel lise diploma notunuzu nasıl şekillendirdiğini net olarak hesaplayın."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.ybp >= 85 ? "emerald" : result.ybp >= 70 ? "blue" : "amber"}
            label="DİPLOMA NOTU"
            value={result.ybp.toFixed(2)}
            subLabel="Genel Mezuniyet Puanı"
            icon="🎓"
          />

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
             <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Star className="w-5 h-5" />
             </div>
             <div>
                <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-1">OBP ANALİZİ</div>
                <p className="text-[11px] text-muted italic leading-tight">
                  Tahmini OBP Değeriniz: <span className="text-white font-black">{(result.ybp * 5).toFixed(1)}</span>
                </p>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu puan üniversite sınavında (YKS), yerleştirme puanınıza eklenecek olan Ortaöğretim Başarı Puanının (OBP) temelini oluşturur.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input label="9. SINIF PUANI" value={grade9} onChange={setGrade9} unit="P" placeholder="Örn: 82.5" max="100" />
           <V2Input label="10. SINIF PUANI" value={grade10} onChange={setGrade10} unit="P" placeholder="Örn: 80.2" max="100" />
           <V2Input label="11. SINIF PUANI" value={grade11} onChange={setGrade11} unit="P" placeholder="Örn: 88.0" max="100" />
           <V2Input label="12. SINIF PUANI" value={grade12} onChange={setGrade12} unit="P" placeholder="Örn: 90.0" max="100" />
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📊 Ortalama Getir"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
