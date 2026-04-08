"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Info, Scale, Briefcase, Calculator, Star, Calendar, ShieldCheck, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { V2CalculatorWrapper } from "./ui-v2/V2CalculatorWrapper";
import { V2Input } from "./ui-v2/V2Input";
import { V2ActionRow } from "./ui-v2/V2ActionRow";
import { V2ResultCard } from "./ui-v2/V2ResultCard";

export function SeveranceCalculator() {
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [grossSalary, setGrossSalary] = useState("30000");
  const [severanceCeiling, setSeveranceCeiling] = useState("64948.77");
  const [includeNotice, setIncludeNotice] = useState(true);
  
  const [results, setResults] = useState<{
    durationYears: number;
    durationMonths: number;
    durationDays: number;
    totalDays: number;
    grossSeverance: number;
    stampTaxSeverance: number;
    netSeverance: number;
    noticeWeeks: number;
    grossNotice: number;
    incomeTaxNotice: number;
    stampTaxNotice: number;
    netNotice: number;
    grandTotal: number;
  } | null>(null);

  const calculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const salary = parseFloat(grossSalary) || 0;
    const ceiling = parseFloat(severanceCeiling) || 64948.77;

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      setResults(null);
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const remainingDays = totalDays % 30;

    const baseSalaryForSeverance = Math.min(salary, ceiling);
    const grossSeverance = (totalDays / 365) * baseSalaryForSeverance;
    const stampTaxRate = 0.00759;
    const stampTaxSeverance = grossSeverance * stampTaxRate;
    const netSeverance = totalDays >= 365 ? (grossSeverance - stampTaxSeverance) : 0;

    let noticeWeeks = 0;
    if (totalDays < 183) noticeWeeks = 2; // < 6 months
    else if (totalDays < 548) noticeWeeks = 4; // 6m - 1.5y
    else if (totalDays < 1095) noticeWeeks = 6; // 1.5y - 3y
    else noticeWeeks = 8; // > 3y

    const dailyGross = salary / 30;
    const grossNotice = (noticeWeeks * 7) * dailyGross;
    const incomeTaxRate = 0.15;
    const incomeTaxNotice = grossNotice * incomeTaxRate;
    const stampTaxNotice = grossNotice * stampTaxRate;
    const netNotice = includeNotice ? (grossNotice - incomeTaxNotice - stampTaxNotice) : 0;

    setResults({
      durationYears: years,
      durationMonths: months,
      durationDays: remainingDays,
      totalDays,
      grossSeverance,
      stampTaxSeverance,
      netSeverance,
      noticeWeeks,
      grossNotice,
      incomeTaxNotice,
      stampTaxNotice,
      netNotice,
      grandTotal: netSeverance + netNotice
    });

    if (totalDays >= 365) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const reset = () => {
    setStartDate("2020-01-01");
    setEndDate(new Date().toISOString().split('T')[0]);
    setGrossSalary("30000");
    setSeveranceCeiling("64948.77");
    setIncludeNotice(true);
    setResults(null);
  };

  const fmt = (v: number) => v.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <V2CalculatorWrapper
      title="KIDEM & İHBAR HESAPLA"
      icon="⚖️"
      infoText="4857 sayılı İş Kanunu'na göre çalışma süreniz üzerinden kıdem ve ihbar tazminatı tutarlarınızı yasal kesintiler dahil hesaplayın."
      results={results && (
        <div className="space-y-6">
          <V2ResultCard
            color="emerald"
            label="TOPLAM NET TAZMİNAT"
            value={fmt(results.grandTotal)}
            subLabel={`Süre: ${results.durationYears} Yıl, ${results.durationMonths} Ay, ${results.durationDays} Gün`}
            icon="🏦"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="text-[10px] font-black text-muted uppercase italic">KIDEM TAZMİNATI (NET)</div>
                <div className="text-xl font-black italic text-emerald-500">
                  {results.totalDays < 365 ? "YETERSİZ SÜRE" : fmt(results.netSeverance)}
                </div>
                {results.totalDays >= 365 && <div className="text-[9px] text-muted opacity-50">Brüt: {fmt(results.grossSeverance)}</div>}
             </div>
             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="text-[10px] font-black text-muted uppercase italic">İHBAR TAZMİNATI (NET)</div>
                <div className="text-xl font-black italic text-blue-500">
                  {includeNotice ? fmt(results.netNotice) : "DAHİL DEĞİL"}
                </div>
                {includeNotice && <div className="text-[9px] text-muted opacity-50">Süre: {results.noticeWeeks} Hafta</div>}
             </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-4">
             <div className="flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <div>
                   <div className="text-[10px] font-black uppercase text-blue-500 mb-1 italic">Yasal Kesinti Raporu</div>
                   <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      <div className="flex justify-between text-[10px] italic">
                         <span className="text-muted">Kıdem Damga V. (%0.759):</span>
                         <span className="text-primary font-bold">{fmt(results.stampTaxSeverance)}</span>
                      </div>
                      <div className="flex justify-between text-[10px] italic">
                         <span className="text-muted">İhbar Gelir V. (%15):</span>
                         <span className="text-primary font-bold">{fmt(results.incomeTaxNotice)}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-3 items-center">
             <Info className="w-4 h-4 text-blue-500 shrink-0" />
             <p className="text-[10px] text-muted italic leading-relaxed">
               Bu hesaplama 4857 sayılı İş Kanunu standartlarına göre yapılmıştır. Yemek, yol ve diğer yan haklar (giydirilmiş ücret) dahil edilmemiştir.
             </p>
          </div>
        </div>
      )}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Calendar className="w-4 h-4" /> Tarih Bilgileri
              </div>
              <V2Input label="İŞE GİRİŞ TARİHİ" type="date" value={startDate} onChange={setStartDate} unit="TAKVİM" />
              <V2Input label="İŞTEN ÇIKIŞ TARİHİ" type="date" value={endDate} onChange={setEndDate} unit="TAKVİM" />
           </div>

           <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                 <Briefcase className="w-4 h-4" /> Finansal Veriler
              </div>
              <V2Input label="SON BRÜT MAAŞ (AYLIK)" value={grossSalary} onChange={setGrossSalary} unit="₺" placeholder="30000" />
              <V2Input label="KIDEM TAZMİNATI TAVANI" value={severanceCeiling} onChange={setSeveranceCeiling} unit="₺" />
           </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/10">
                 <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-xs font-black italic text-primary">İHBAR TAZMİNATI ANALİZİ</div>
                 <div className="text-[10px] text-muted font-bold uppercase tracking-widest">Tazminat tutarına ekle</div>
              </div>
           </div>
           <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={includeNotice} 
                onChange={e => setIncludeNotice(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-14 h-8 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-muted after:border-white/20 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500 peer-checked:after:bg-white border border-white/5"></div>
           </label>
        </div>

        <V2ActionRow 
          onCalculate={calculate} 
          onReset={reset} 
          calculateLabel="⚖️ Tazminatı Hesapla"
        />
      </div>
    </V2CalculatorWrapper>
  );
}
