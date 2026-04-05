"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function SeveranceCalculator() {
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [grossSalary, setGrossSalary] = useState("30000");
  const [severanceCeiling, setSeveranceCeiling] = useState("35058.58"); // July 2024 Ceiling
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
    const ceiling = parseFloat(severanceCeiling) || 35058.58;

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      setResults(null);
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const remainingDays = totalDays % 30;

    // Severance Calculation
    // Base salary for severance is CAPPED by ceiling
    const baseSalaryForSeverance = Math.min(salary, ceiling);
    const grossSeverance = (totalDays / 365) * baseSalaryForSeverance;
    const stampTaxRate = 0.00759;
    const stampTaxSeverance = grossSeverance * stampTaxRate;
    const netSeverance = totalDays >= 365 ? (grossSeverance - stampTaxSeverance) : 0;

    // Notice Pay Calculation
    let noticeWeeks = 0;
    if (totalDays < 183) noticeWeeks = 2; // < 6 months
    else if (totalDays < 548) noticeWeeks = 4; // 6m - 1.5y
    else if (totalDays < 1095) noticeWeeks = 6; // 1.5y - 3y
    else noticeWeeks = 8; // > 3y

    const dailyGross = salary / 30;
    const grossNotice = (noticeWeeks * 7) * dailyGross;
    const incomeTaxRate = 0.15; // Starting bracket
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
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#10b981", "#3b82f6"]
      });
    }
  };

  useEffect(() => {
    calculate();
  }, [startDate, endDate, grossSalary, severanceCeiling, includeNotice]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inputs */}
        <div className="lg:col-span-5 flex flex-col gap-5">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-emerald-500/20 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">İşe Giriş</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input-field font-bold" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">İşten Çıkış</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input-field font-bold" />
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Brüt Maaş (TL)</label>
                 <input 
                    type="number" 
                    value={grossSalary} 
                    onChange={e => setGrossSalary(e.target.value)} 
                    className="input-field !text-2xl font-black !py-4" 
                    placeholder="30.000" 
                 />
              </div>

              <div className="flex flex-col gap-2">
                 <div className="flex justify-between items-center px-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest italic">Kıdem Tavanı</label>
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-bold italic">Temmuz 2024</span>
                 </div>
                 <input 
                    type="number" 
                    value={severanceCeiling} 
                    onChange={e => setSeveranceCeiling(e.target.value)} 
                    className="input-field font-bold !py-3" 
                 />
              </div>

              <label className="flex items-center gap-3 p-4 bg-white/40 dark:bg-zinc-800/40 rounded-2xl border border-border cursor-pointer hover:bg-white transition-all">
                 <input type="checkbox" checked={includeNotice} onChange={e => setIncludeNotice(e.target.checked)} className="w-5 h-5 rounded-lg border-2 border-border text-emerald-500 focus:ring-emerald-500" />
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-primary uppercase">İhbar Tazminatını Dahil Et</span>
                    <span className="text-[9px] text-muted font-bold">Kullanılmayan ihbar süresi tazminatı</span>
                 </div>
              </label>
           </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           {results ? (
              <div className="result-container-premium !animate-none">
                 <div className="result-card-premium !p-8 bg-surface border-4 border-emerald-500 shadow-2xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 font-black italic text-[9px] text-emerald-600/10 tracking-[0.3em] uppercase rotate-12">Labor Court Pro v1.0</div>
                    
                    <div className="flex flex-col items-center text-center mb-10">
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4 bg-emerald-500/10 px-4 py-1 rounded-full border border-emerald-500/20 italic">Toplam Net Tahsilat</span>
                       <div className="text-6xl font-black italic tracking-tighter text-primary">
                          {results.grandTotal.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {/* Severance Block */}
                       <div className="p-6 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/20 flex flex-col gap-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black text-emerald-600 uppercase italic">Kıdem Tazminatı</span>
                             <span className="text-[8px] font-black text-emerald-500 uppercase">{results.durationYears} Yıl {results.durationMonths} Ay</span>
                          </div>
                          {results.totalDays < 365 ? (
                             <div className="text-xs font-bold text-red-500 italic py-4">Ödeme İçin 1 Yıl Şartı Tamamlanmadı</div>
                          ) : (
                             <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-[9px] font-bold text-muted uppercase"><span>Brüt:</span> <span>{results.grossSeverance.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span></div>
                                <div className="flex justify-between text-[9px] font-bold text-red-500 uppercase"><span>Damga V.:</span> <span>-{results.stampTaxSeverance.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span></div>
                                <div className="h-px bg-emerald-500/20 my-1"></div>
                                <div className="flex justify-between text-lg font-black text-emerald-700 italic"><span>NET:</span> <span>{results.netSeverance.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span></div>
                             </div>
                          )}
                       </div>

                       {/* Notice Block */}
                       <div className="p-6 bg-blue-500/5 rounded-[2rem] border border-blue-500/20 flex flex-col gap-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black text-blue-600 uppercase italic">İhbar Tazminatı</span>
                             <span className="text-[8px] font-black text-blue-500 uppercase">{results.noticeWeeks} Hafta</span>
                          </div>
                          {!includeNotice ? (
                             <div className="text-xs font-bold text-muted italic py-4">Hesaplamaya Dahil Edilmedi</div>
                          ) : (
                             <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-[9px] font-bold text-muted uppercase"><span>Brüt:</span> <span>{results.grossNotice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span></div>
                                <div className="flex justify-between text-[9px] font-bold text-red-500 uppercase"><span>Gelir V.:</span> <span>-{results.incomeTaxNotice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span></div>
                                <div className="flex justify-between text-[9px] font-bold text-red-500 uppercase"><span>Damga V.:</span> <span>-{results.stampTaxNotice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span></div>
                                <div className="h-px bg-blue-500/20 my-1"></div>
                                <div className="flex justify-between text-lg font-black text-blue-700 italic"><span>NET:</span> <span>{results.netNotice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span></div>
                             </div>
                          )}
                       </div>
                    </div>

                    <div className="mt-8 p-4 bg-secondary/10 rounded-2xl border border-border text-[9px] text-muted font-medium italic leading-relaxed text-center">
                       💡 Toplam Çalışma Süresi: <b>{results.totalDays} Gün</b>. <br/>
                       Bu hesaplayıcı 4857 sayılı İş Kanunu'na uygundur.
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-12 bg-secondary/5 rounded-[3rem] border-dashed border-4 border-border/40 grayscale opacity-40 text-center">
                 <div className="text-6xl mb-6">🤝</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-widest italic leading-relaxed">
                    TAZMİNAT ANALİZİ İÇİN<br/>TARİH VE MAAŞ BİLGİSİ GİRİNİZ
                 </h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
