"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, GraduationCap, Target, Calculator, Star, BookOpen, Award, FileText } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function AgssCalculator() {
  const [gkgyCorrect, setGkgyCorrect] = useState("45");
  const [gkgyWrong, setGkgyWrong] = useState("10");
  const [alanCorrect, setAlanCorrect] = useState("60");
  const [alanWrong, setAlanWrong] = useState("15");
  const [result, setResult] = useState<{ net: number; point: number; gkgyNet: number; alanNet: number } | null>(null);

  const calculate = () => {
    const gkgyC = parseFloat(gkgyCorrect) || 0;
    const gkgyW = parseFloat(gkgyWrong) || 0;
    const alanC = parseFloat(alanCorrect) || 0;
    const alanW = parseFloat(alanWrong) || 0;

    const gkgyNet = Math.max(0, gkgyC - (gkgyW / 4));
    const alanNet = Math.max(0, alanC - (alanW / 4));
    const totalNet = gkgyNet + alanNet;
    const point = 50 + (gkgyNet * 0.4) + (alanNet * 0.5);

    if (totalNet > 0) {
      setResult({ net: totalNet, point: point, gkgyNet, alanNet });
      if (point >= 60) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setGkgyCorrect("45");
    setGkgyWrong("10");
    setAlanCorrect("60");
    setAlanWrong("15");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="AGS PUAN HESAPLA"
      icon="🎓"
      infoText="Akademik Personel Seçme Sınavı (AGS) Genel Yetenek ve Alan Bilgisi netlerinize göre tahmini yerleştirme puanınızı hesaplayın."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color="blue"
            label="TAHMİNİ AGS PUANI"
            value={result.point.toFixed(2)}
            subLabel="Olası Standart Sapma Dahil Değildir"
            icon="📊"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <V2ResultCard color="emerald" label="TOPLAM NET" value={result.net.toFixed(2)} subLabel="Toplam Başarı" icon="✅" />
             <V2ResultCard color="purple" label="GKGY NETİ" value={result.gkgyNet.toFixed(2)} subLabel="Genel Yetenek/Kültür" icon="📖" />
             <V2ResultCard color="amber" label="ALAN NETİ" value={result.alanNet.toFixed(2)} subLabel="Alan Bilgisi" icon="🎯" />
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Hesaplama, genel katsayı ortalamalarına göre 4 yanlışın 1 doğruyu götürdüğü varsayımsal projeksiyonlar kullanılarak yapılmıştır.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic mb-2 flex items-center gap-2">
                 <FileText className="w-4 h-4" /> GK-GY Bölümü
              </div>
              <V2Input label="DOĞRU SAYISI" value={gkgyCorrect} onChange={setGkgyCorrect} unit="D" placeholder="45" min="0" fieldClassName="!text-emerald-500" />
              <V2Input label="YANLIŞ SAYISI" value={gkgyWrong} onChange={setGkgyWrong} unit="Y" placeholder="10" min="0" fieldClassName="!text-red-500" />
           </div>

           <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] italic mb-2 flex items-center gap-2">
                 <Target className="w-4 h-4" /> ALAN BİLGİSİ
              </div>
              <V2Input label="DOĞRU SAYISI" value={alanCorrect} onChange={setAlanCorrect} unit="D" placeholder="60" min="0" fieldClassName="!text-emerald-500" />
              <V2Input label="YANLIŞ SAYISI" value={alanWrong} onChange={setAlanWrong} unit="Y" placeholder="15" min="0" fieldClassName="!text-red-500" />
           </div>
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="🎓 Puanı Analiz Et"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
