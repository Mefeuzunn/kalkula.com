"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Calculator, Star, BookOpen, GraduationCap } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function EOkulCalculator() {
  const [yazili1, setYazili1] = useState("");
  const [yazili2, setYazili2] = useState("");
  const [performans1, setPerformans1] = useState("");
  const [performans2, setPerformans2] = useState("");
  const [proje, setProje] = useState("");
  const [result, setResult] = useState<{ average: number } | null>(null);

  const calculate = () => {
    const scores = [];
    if (yazili1) scores.push(parseFloat(yazili1));
    if (yazili2) scores.push(parseFloat(yazili2));
    if (performans1) scores.push(parseFloat(performans1));
    if (performans2) scores.push(parseFloat(performans2));
    if (proje) scores.push(parseFloat(proje));

    if (scores.length > 0) {
      const total = scores.reduce((a, b) => a + b, 0);
      const average = total / scores.length;
      setResult({ average });
      if (average >= 70) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setYazili1("");
    setYazili2("");
    setPerformans1("");
    setPerformans2("");
    setProje("");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="E-OKUL NOT HESAPLA"
      icon="🏫"
      infoText="E-okul Veli Bilgilendirme Sistemi (VBS) mantığıyla tek bir dersinizin karneye düşecek kesin puanını bulun."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.average >= 50 ? "emerald" : "red"}
            label="KARNE PUANI"
            value={result.average.toFixed(4)}
            subLabel="Kesin Hesaplanan Değer"
            icon="📊"
          />

          <div className="p-5 rounded-3xl bg-white/5 border border-white/5 flex gap-4 items-center">
             <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Star className="w-5 h-5" />
             </div>
             <div>
                <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-1">DURUM ANALİZİ</div>
                <p className="text-[11px] text-muted italic leading-tight">
                  {result.average >= 85 ? "Pekiyi! Harika bir karne notu." : 
                   result.average >= 70 ? "İyi! Başarılı bir seviye." :
                   result.average >= 50 ? "Geçer. Notlarınızı biraz yükseltmeye çalışın." :
                   "Zayıf! Bu ders için daha fazla çalışmanız gerekebilir."}
                </p>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu puan sınıf geçme ve teşekkür/takdir hesaplamalarında karneye yansıyan kesin ağırlıklı değerdir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="space-y-4">
           <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] px-2 italic flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Yazılı Sınavlar
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2Input label="1. YAZILI" value={yazili1} onChange={setYazili1} unit="P" placeholder="85" max="100" />
              <V2Input label="2. YAZILI" value={yazili2} onChange={setYazili2} unit="P" placeholder="90" max="100" />
           </div>
        </div>

        <div className="space-y-4">
           <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] px-2 italic flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" /> Sözlü & Performans
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <V2Input label="1. PERFORMANS" value={performans1} onChange={setPerformans1} unit="P" placeholder="100" max="100" />
              <V2Input label="2. PERFORMANS" value={performans2} onChange={setPerformans2} unit="P" placeholder="Opsiyonel" max="100" />
           </div>
           <V2Input label="PROJE NOTU" value={proje} onChange={setProje} unit="P" placeholder="Opsiyonel" max="100" />
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📉 Karne Notunu Bul"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
