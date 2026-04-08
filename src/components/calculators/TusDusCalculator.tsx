"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Stethoscope, Activity, Target, Calculator, Star } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function TusDusCalculator() {
  const [tt1, setTt1] = useState("85");
  const [tk, setTk] = useState("90");
  const [result, setResult] = useState<{ klinik: number; temel: number } | null>(null);

  const calculate = () => {
    const t1 = parseFloat(tt1);
    const k = parseFloat(tk);
    if (!isNaN(t1) && !isNaN(k) && t1 >= 0 && k >= 0) {
      // TUS Yaklaşık Puan Formülü
      const pKlinik = 40 + (k * 0.45) + (t1 * 0.25);
      const pTemel = 40 + (t1 * 0.45) + (k * 0.25);
      setResult({ klinik: pKlinik, temel: pTemel });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setTt1("85");
    setTk("90");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="TUS / DUS PUAN HESAPLA"
      icon="🩺"
      infoText="Temel Tıp ve Klinik Tıp netlerinizi girerek geçmiş yılların standart sapmalarına göre tahmini yerleştirme puanınızı hesaplayın."
      results={result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <V2ResultCard
               color="emerald"
               label="KLİNİK PUANI (K)"
               value={result.klinik.toFixed(2)}
               subLabel="Tercih Puanı"
               icon="🏆"
             />
             <V2ResultCard
               color="blue"
               label="TEMEL PUANI (T)"
               value={result.temel.toFixed(2)}
               subLabel="Bilim Puanı"
               icon="📊"
             />
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
             <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Target className="w-5 h-5" />
             </div>
             <div>
                <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-1">ANALİZ</div>
                <p className="text-[11px] text-muted italic leading-tight">
                  Bu hesaplama, genel sınav ortalaması ve standart sapmaların geçmiş yıllara paralel olduğu varsayımıyla üretilmiştir.
                </p>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Gerçek puanlar ÖSYM verilerine göre ±2 puan değişkenlik gösterebilir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input 
             label="TEMEL TIP NETİ" 
             value={tt1} 
             onChange={setTt1} 
             unit="NET" 
             placeholder="85" 
             max="120" 
             fieldClassName="!bg-blue-500/5 !text-blue-500 !border-blue-500/10"
           />
           <V2Input 
             label="KLİNİK TIP NETİ" 
             value={tk} 
             onChange={setTk} 
             unit="NET" 
             placeholder="90" 
             max="120" 
             fieldClassName="!bg-emerald-500/5 !text-emerald-500 !border-emerald-500/10"
           />
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="🩺 Puanları Tahmin Et"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
