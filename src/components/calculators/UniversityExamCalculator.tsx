"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, GraduationCap, Target, Calculator, Star, FileText, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function UniversityExamCalculator() {
  const [vize, setVize] = useState("");
  const [vizeWeight, setVizeWeight] = useState("40");
  const [finalScore, setFinalScore] = useState("");
  const [finalWeight, setFinalWeight] = useState("60");
  const [target, setTarget] = useState("50");
  const [result, setResult] = useState<{ average: number; needed: number; status: string; color: "emerald" | "purple" | "blue" | "amber" | "red"; risk: string } | null>(null);

  const calculate = () => {
    const v = parseFloat(vize);
    const vw = parseFloat(vizeWeight) / 100;
    const f = parseFloat(finalScore);
    const fw = parseFloat(finalWeight) / 100;
    const t = parseFloat(target);

    if (!isNaN(v) && vw + fw > 0) {
      let average = 0;
      if (!isNaN(f)) {
        average = (v * vw + f * fw) / (vw + fw);
      }
      
      const needed = (t * (vw + fw) - (v * vw)) / fw;
      
      let status = "ANALİZ EDİLDİ";
      let color: "emerald" | "purple" | "blue" | "amber" | "red" = "blue";
      let risk = "DÜŞÜK";

      if (!isNaN(f)) {
        status = average >= t ? "BAŞARILI" : "BAŞARISIZ";
        color = average >= t ? "emerald" : "red";
      }

      if (needed > 70) risk = "YÜKSEK";
      else if (needed > 45) risk = "ORTA";
      else risk = "DÜŞÜK";

      if (needed > 100) { color = "red"; risk = "İMKANSIZ"; }

      setResult({ average, needed: Math.max(0, needed), status, color, risk });
      
      if (status === "BAŞARILI" || (isNaN(f) && needed <= 50)) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      setResult(null);
    }
  };

  const reset = () => {
    setVize("");
    setVizeWeight("40");
    setFinalScore("");
    setFinalWeight("60");
    setTarget("50");
    setResult(null);
  };

  return (
    <V2CalculatorWrapper
      title="VİZE - FİNAL HESAPLA"
      icon="🎓"
      infoText="Vize notunuzu ve hedeflediğiniz geçme notunu girerek final sınavından kaç almanız gerektiğini anında öğrenin."
      results={result && (
        <div className="space-y-6">
          <V2ResultCard
            color={result.color}
            label="FİNALDE GEREKEN NOT"
            value={result.needed > 100 ? "KALDI" : result.needed.toFixed(0)}
            subLabel={result.needed > 100 ? "Başarı Hedefi İmkansız" : `Hedeflenen Geçme Notu: ${target}`}
            icon="🎯"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">MEVCUT ORTALAMA</div>
                <div className="text-2xl font-black italic text-primary">{result.average > 0 ? result.average.toFixed(2) : "--"}</div>
             </div>
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">RİSK SEVİYESİ</div>
                <div className={`text-2xl font-black italic ${result.risk === 'YÜKSEK' || result.risk === 'İMKANSIZ' ? 'text-red-500' : 'text-emerald-500'}`}>{result.risk}</div>
             </div>
          </div>

          <div className={`p-5 rounded-2xl border flex gap-4 ${result.needed > 100 ? 'bg-red-500/5 border-red-500/10' : 'bg-blue-500/5 border-blue-500/10'}`}>
             {result.needed > 100 ? <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" /> : <TrendingUp className="w-6 h-6 text-blue-500 shrink-0 mt-1" />}
             <div>
                <div className={`text-xs font-black uppercase italic mb-1 ${result.needed > 100 ? 'text-red-500' : 'text-blue-500'}`}>Analiz Sonucu</div>
                <p className="text-[11px] text-muted italic leading-relaxed">
                  {result.needed > 100 
                    ? "Maalesef vize notunuz çok düşük olduğu için finalden 100 alsanız bile hedefinize ulaşamıyorsunuz." 
                    : `Final sınavından ${result.needed.toFixed(0)} veya üzerinde bir not alırsanız dersi başarıyla tamamlarsınız.`}
                </p>
             </div>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <FileText className="w-4 h-4" /> Vize (Ara Sınav)
              </div>
              <V2Input label="VİZE NOTUNUZ" value={vize} onChange={setVize} unit="P" placeholder="65" />
              <V2Input label="VİZE ETKİSİ (%)" value={vizeWeight} onChange={setVizeWeight} unit="%" placeholder="40" />
           </div>

           <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <GraduationCap className="w-4 h-4" /> Final (Dönem Sonu)
              </div>
              <V2Input label="FİNAL NOTU (İsteğe Bağlı)" value={finalScore} onChange={setFinalScore} unit="P" placeholder="70" />
              <V2Input label="FİNAL ETKİSİ (%)" value={finalWeight} onChange={setFinalWeight} unit="%" placeholder="60" />
           </div>
        </div>

        <div className="max-w-xs mx-auto">
           <V2Input 
             label="HEDEF GEÇME NOTU" 
             value={target} 
             onChange={setTarget} 
             unit="P" 
             placeholder="50" 
             fieldClassName="!py-6 text-center text-4xl font-black italic text-primary"
           />
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📉 Durumumu Analiz Et"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
