"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Award, Star, GraduationCap, Calculator, Target } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function HighSchoolGraduationCalculator() {
  const [ybpList, setYbpList] = useState<string[]>(["", "", "", ""]);
  const [result, setResult] = useState<{ graduationScore: number; obp: number } | null>(null);

  const calculate = () => {
    const validScores = ybpList.map(s => parseFloat(s)).filter(s => !isNaN(s) && s > 0);
    if (validScores.length > 0) {
      const graduationScore = validScores.reduce((a, b) => a + b, 0) / validScores.length;
      // OBP = Mezuniyet Puani * 5
      const obp = graduationScore * 5;
      
      setResult({ graduationScore, obp });
      if (graduationScore >= 70) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResult(null);
    }
  };

  const updateVal = (idx: number, val: string) => {
    const n = [...ybpList];
    n[idx] = val;
    setYbpList(n);
  };

  const reset = () => {
    setYbpList(["", "", "", ""]);
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="MEZUNİYET & OBP HESAPLA"
      icon="📜"
      infoText="Lise öğrenimi boyunca aldığınız tüm yıl sonu başarı puanlarının (YBP) size üniversite sınavında (YKS) getireceği OBP değerini ve puan katkısını hesaplayın."
      results={result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <V2ResultCard
               color="blue"
               label="LİSE MEZUNİYET PUANI"
               value={result.graduationScore.toFixed(2)}
               subLabel="Diploma Notu"
               icon="🎓"
             />
             <V2ResultCard
               color="emerald"
               label="YKS OBP DEĞERİ"
               value={result.obp.toFixed(2)}
               subLabel="Başarı Puanı"
               icon="🏆"
             />
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
             <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Target className="w-5 h-5" />
             </div>
             <div>
                <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-1">PUAN KATKISI</div>
                <p className="text-[12px] text-white font-black italic">
                   YKS Puanınıza: <span className="text-emerald-500">+{(result.obp * 0.12).toFixed(2)}</span> Puan Eklenecek
                </p>
                <p className="text-[10px] text-muted italic mt-1 leading-tight">
                  Bu değer, OBP'nizin 0,12 katsayısı ile çarpımı sonucu ham puanınıza eklenen yerleştirme puanıdır.
                </p>
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {["9. SINIF", "10. SINIF", "11. SINIF", "12. SINIF"].map((label, idx) => (
             <V2Input 
               key={idx}
               label={label} 
               value={ybpList[idx]} 
               onChange={val => updateVal(idx, val)} 
               unit="P" 
               placeholder="Örn: 85.50" 
               max="100" 
             />
           ))}
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📊 Diploma ve OBP Hesapla"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
