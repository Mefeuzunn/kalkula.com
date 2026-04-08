"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Banknote, Percent, Calculator, TrendingUp, ArrowRight, CheckCircle, PieChart, ShieldCheck } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2Select } from "./ui-v2/V2Select";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function IncomeTaxCalculator() {
  const [brutto, setBrutto] = useState("70000");
  const [period, setPeriod] = useState("aylik");
  const [year, setYear] = useState("2026");
  
  const [results, setResults] = useState<{
    yearlyGross: number; brackets: { rate: number; taxable: number; tax: number; range: string }[];
    totalTax: number; effectiveRate: number; yearlyNet: number; avgMonthlyNet: number;
  } | null>(null);

  const TAX_DATA: any = {
    "2024": [ { limit: 110000, rate: 0.15 }, { limit: 230000, rate: 0.20 }, { limit: 580000, rate: 0.27 }, { limit: 3000000, rate: 0.35 }, { limit: Infinity, rate: 0.40 } ],
    "2025": [ { limit: 158000, rate: 0.15 }, { limit: 330000, rate: 0.20 }, { limit: 840000, rate: 0.27 }, { limit: 4300000, rate: 0.35 }, { limit: Infinity, rate: 0.40 } ],
    "2026": [ { limit: 230000, rate: 0.15 }, { limit: 580000, rate: 0.20 }, { limit: 1200000, rate: 0.27 }, { limit: 5000000, rate: 0.35 }, { limit: Infinity, rate: 0.40 } ]
  };

  const calculate = () => {
    const monthlyGross = parseFloat(brutto) || 0;
    const yearlyGross = period === "aylik" ? monthlyGross * 12 : monthlyGross;
    if (yearlyGross <= 0) { setResults(null); return; }

    const yearBrackets = TAX_DATA[year];
    let totalTax = 0; 
    let remaining = yearlyGross; 
    let prevLimit = 0; 
    const bracketDetails = [];

    for (const b of yearBrackets) {
      const taxableInRange = Math.min(remaining, b.limit - prevLimit);
      if (taxableInRange <= 0) break;
      const tax = taxableInRange * b.rate;
      totalTax += tax; 
      remaining -= taxableInRange;
      bracketDetails.push({ 
        rate: b.rate * 100, 
        taxable: taxableInRange, 
        tax: tax, 
        range: `${prevLimit.toLocaleString()} - ${b.limit === Infinity ? '∞' : b.limit.toLocaleString()} TL` 
      });
      prevLimit = b.limit;
    }

    const yearlyNet = yearlyGross - totalTax;
    setResults({ 
      yearlyGross, 
      brackets: bracketDetails, 
      totalTax, 
      effectiveRate: (totalTax / yearlyGross) * 100, 
      yearlyNet, 
      avgMonthlyNet: yearlyNet / 12 
    });
    
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const reset = () => {
    setBrutto("70000");
    setPeriod("aylik");
    setYear("2026");
    setResults(null);
  };

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });

  return (
    <V2CalculatorWrapper
      title="GELİR VERGİSİ HESAPLA"
      icon="💰"
      infoText="Gelir vergisi dilim usulü hesaplanır. Kümülatif matrah dilim sınırını aşan kısım için yüksek vergi ödenir. 2026 tebliğine uygundur."
      results={results && (
        <div className="space-y-6">
          <V2ResultCard
            color="emerald"
            label="YILLIK NET KAZANCINIZ"
            value={fmt(results.yearlyNet)}
            subLabel={`Ortalama Aylık Net: ${fmt(results.avgMonthlyNet)}`}
            icon="🏦"
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">TOPLAM VERGİ</div>
                <div className="text-xl font-black italic text-red-500">{fmt(results.totalTax)}</div>
             </div>
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-black text-muted uppercase mb-1">EFEKTİF ORAN</div>
                <div className="text-xl font-black italic text-purple-500">%{results.effectiveRate.toFixed(1)}</div>
             </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-4">
             <div className="flex justify-between items-center text-[10px] font-black italic text-muted uppercase tracking-widest">
                VERGİ DİLİMİ DAĞILIMI
             </div>
             
             <div className="h-3 w-full bg-white/5 rounded-full flex overflow-hidden border border-white/5">
                {results.brackets.map((b, idx) => (
                  <div key={idx} style={{ 
                    width: `${(b.taxable / results.yearlyGross) * 100}%`, 
                    background: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : idx === 2 ? '#8b5cf6' : idx === 3 ? '#f59e0b' : '#ef4444',
                  }} title={`%${b.rate} Dilim`} />
                ))}
             </div>

             <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
                {results.brackets.map((b, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : idx === 2 ? '#8b5cf6' : idx === 3 ? '#f59e0b' : '#ef4444' }} />
                        <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">%{b.rate} Dilimi <span className="opacity-50 text-[8px] ml-1">({b.range})</span></span>
                     </div>
                     <span className="text-xs font-black text-primary italic">{fmt(b.tax)}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-3 items-center">
             <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu hesaplama kümülatif matrah üzerinden yapılmıştır. Şirket türü, istisnalar ve diğer kesintiler (SGK, damga vergisi vb.) dahil değildir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <V2Input 
             label="BRÜT GELİR" 
             value={brutto} 
             onChange={setBrutto} 
             unit="₺" 
             placeholder="70000" 
             fieldClassName="!py-6 font-black text-3xl italic !bg-blue-500/5 !border-blue-500/10 text-primary"
           />
           <V2Select 
             label="GELİR PERİYODU" 
             value={period} 
             onChange={setPeriod} 
             options={[
               { value: "aylik", label: "Aylık kazanç" },
               { value: "yillik", label: "Yıllık toplam kazanç" }
             ]}
           />
           <V2Select 
             label="VERGİ YILI" 
             value={year} 
             onChange={setYear} 
             options={[
               { value: "2026", label: "2026 (Yeni Tebliğ)" },
               { value: "2025", label: "2025 Dilimleri" },
               { value: "2024", label: "2024 Arşiv" }
             ]}
           />
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="📉 Vergimi Hesapla"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
