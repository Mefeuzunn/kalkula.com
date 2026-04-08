"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Briefcase, Wallet, Calculator, Star, ArrowRight, CheckCircle, AlertTriangle, ShieldCheck, Download, Share2 } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function NetGrossCalculator() {
  const [net, setNet] = useState("35000"); 
  const [results, setResults] = useState<{ gross: number; sgk: number; tax: number; unemploy: number; stamp: number } | null>(null);

  const calculate = () => {
    const n = parseFloat(net);
    if (!isNaN(n) && n > 0) {
      // SGK işçi: %14, İşsizlik: %1, Gelir Vergisi: ~%15 (taban dilim), Damga: %0.759
      const totalDeductionRate = 0.14 + 0.01 + 0.15 + 0.00759;
      const gross = n / (1 - totalDeductionRate);
      const sgk = gross * 0.14;
      const unemploy = gross * 0.01;
      const tax = gross * 0.15;
      const stamp = gross * 0.00759;
      
      setResults({ gross, sgk, tax, unemploy, stamp });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setResults(null);
    }
  };

  const reset = () => {
    setNet("35000");
    setResults(null);
  };

  const fmt = (v: number) => 
    v.toLocaleString("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });

  return (
    <V2CalculatorWrapper
      title="NETTEN BRÜTE MAAŞ"
      icon="💼"
      infoText="Elinize geçen net maaş üzerinden brüt tutarı, SGK işçi payını ve gelir vergisi kesintilerini anında hesaplayın."
      results={results && (
        <div className="space-y-6">
          <V2ResultCard
            color="blue"
            label="TAHMİNİ BRÜT MAAŞ"
            value={fmt(results.gross)}
            subLabel="Aylık Toplam Kazanç"
            icon="📊"
          />

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="text-[10px] font-black text-muted uppercase tracking-widest italic mb-2">Kesinti Detayları</div>
             <div className="space-y-3">
                <div className="flex justify-between items-center text-xs italic">
                   <span className="text-muted">Net Maaş:</span>
                   <span className="text-emerald-500 font-bold">{fmt(parseFloat(net))}</span>
                </div>
                <div className="flex justify-between items-center text-xs italic border-t border-white/5 pt-3">
                   <span className="text-muted">SGK İşçi Payı (%14):</span>
                   <span className="text-red-500 font-bold">-{fmt(results.sgk)}</span>
                </div>
                <div className="flex justify-between items-center text-xs italic">
                   <span className="text-muted">İşsizlik Sigortası (%1):</span>
                   <span className="text-red-500 font-bold">-{fmt(results.unemploy)}</span>
                </div>
                <div className="flex justify-between items-center text-xs italic">
                   <span className="text-muted">Gelir Vergisi (%15):</span>
                   <span className="text-red-500 font-bold">-{fmt(results.tax)}</span>
                </div>
                <div className="flex justify-between items-center text-xs italic">
                   <span className="text-muted">Damga Vergisi (%0.759):</span>
                   <span className="text-red-500 font-bold">-{fmt(results.stamp)}</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase italic text-muted">
                <Download className="w-4 h-4" /> PDF Bordro
             </button>
             <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase italic text-muted">
                <Share2 className="w-4 h-4" /> Paylaş
             </button>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-3 items-center">
             <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu hesaplama taban vergi dilimi esas alınarak yapılmıştır. Kesin tutarlar için vergi muafiyetleri ve diğer yan haklar dahil edilmelidir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="max-w-md mx-auto">
           <V2Input 
             label="AYLIK NET MAAŞ" 
             value={net} 
             onChange={setNet} 
             unit="₺" 
             placeholder="35000" 
             fieldClassName="!py-10 text-center text-5xl font-black italic text-primary !bg-blue-500/5 !border-blue-500/10"
           />
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📉 Brüt Maaşı Hesapla"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
