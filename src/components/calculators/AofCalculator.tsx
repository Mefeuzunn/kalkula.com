"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, GraduationCap, BookMarked, Calculator, Star, Award, Target, AlertTriangle } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function AofCalculator() {
  const [vize, setVize] = useState("60");
  const [final, setFinal] = useState("70");
  const [result, setResult] = useState<{ ortalama: number; harf: string; durum: string; color: "emerald" | "purple" | "blue" | "amber" | "red"; isFailed: boolean } | null>(null);

  const calculate = () => {
    const v = parseFloat(vize);
    const f = parseFloat(final);
    if (!isNaN(v) && !isNaN(f) && v >= 0 && f >= 0 && v <= 100 && f <= 100) {
      const ortalama = (v * 0.3) + (f * 0.7);
      let harf = ""; 
      let durum = ""; 
      let color: "emerald" | "purple" | "blue" | "amber" | "red" = "blue"; 
      let isFailed = false;

      if (f < 35) {
        harf = "FF"; durum = "Final Barajı Altında"; color = "red"; isFailed = true;
      } else if (ortalama < 35) {
        harf = "FF"; durum = "Ortalama Yetersiz"; color = "red"; isFailed = true;
      } else if (ortalama >= 84) { harf = "AA"; durum = "Üstün Başarı"; color = "emerald"; }
      else if (ortalama >= 77) { harf = "AB"; durum = "Yüksek Başarı"; color = "emerald"; }
      else if (ortalama >= 71) { harf = "BA"; durum = "Başarılı"; color = "blue"; }
      else if (ortalama >= 56) { harf = "BB"; durum = "Geçer"; color = "blue"; }
      else if (ortalama >= 50) { harf = "CC"; durum = "Geçer"; color = "purple"; }
      else { harf = "DC"; durum = "Koşullu Geçti"; color = "amber"; }

      setResult({ ortalama, harf, durum, color, isFailed });
      if (!isFailed) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setVize("60");
    setFinal("70");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="AÖF NOT HESAPLA"
      icon="🎓"
      infoText="Açıköğretim Fakültesi vize (%30) ve final (%70) ağırlıklarını kullanarak harf notunuzu ve başarı durumunuzu anında hesaplayın."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.color}
            label="GENEL ORTALAMA"
            value={result.ortalama.toFixed(2)}
            subLabel={`DURUM: ${result.durum}`}
            icon="📊"
          />

          <div className="grid grid-cols-2 gap-4">
             <div className={`p-5 rounded-2xl bg-${result.color}-500/5 border border-${result.color}-500/10 text-center`}>
                <div className="text-[10px] font-black text-muted uppercase mb-1">HARF NOTU</div>
                <div className={`text-3xl font-black italic text-${result.color}-500`}>{result.harf}</div>
             </div>
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col justify-center gap-1">
                <div className="text-[10px] font-black text-muted uppercase">SONUÇ</div>
                <div className={`text-xs font-bold ${result.isFailed ? 'text-red-500' : 'text-emerald-500'} italic`}>
                  {result.isFailed ? 'BAŞARISIZ' : 'BAŞARILI'}
                </div>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
             <p className="text-[11px] text-muted italic leading-relaxed">
               AÖF sisteminde final sınavından en az <span className="text-white font-bold">35</span> alma zorunluluğu (baraj) bulunmaktadır.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <V2Input 
             label="VİZE NOTU (%30)" 
             value={vize} 
             onChange={setVize} 
             unit="P" 
             placeholder="60" 
             max="100" 
             fieldClassName="!bg-blue-500/5 !text-blue-500 !border-blue-500/10"
           />
           <V2Input 
             label="FİNAL NOTU (%70)" 
             value={final} 
             onChange={setFinal} 
             unit="P" 
             placeholder="70" 
             max="100" 
             fieldClassName="!bg-emerald-500/5 !text-emerald-500 !border-emerald-500/10"
           />
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📉 Durumu Sorgula"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
