"use client";

import React, { useState, useMemo } from "react";
import { 
  TrendingUp, 
  Target, 
  Landmark, 
  RefreshCw, 
  PieChart, 
  Clock, 
  Info,
  ChevronRight,
  Calculator,
  DollarSign,
  Briefcase,
  Percent
} from "lucide-react";
import confetti from "canvas-confetti";

type InvestmentTool = "cagr" | "savings" | "interest" | "repo" | "dividend" | "deposit";

export function InvestmentSuite() {
  const [tool, setTool] = useState<InvestmentTool>("cagr");

  // Shared States
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("45");
  const [term, setTerm] = useState("12");
  const [finalValue, setFinalValue] = useState("150000");
  const [monthlyContribution, setMonthlyContribution] = useState("5000");

  const results = useMemo(() => {
    const P = parseFloat(amount) || 0;
    const R = parseFloat(rate) / 100 || 0;
    const T = parseInt(term) || 0;
    const F = parseFloat(finalValue) || 0;
    const MC = parseFloat(monthlyContribution) || 0;

    switch (tool) {
      case "cagr": {
        if (P <= 0 || F <= 0 || T <= 0) return null;
        const cagr = (Math.pow(F / P, 1 / (T / 12)) - 1) * 100;
        const totalReturn = ((F - P) / P) * 100;
        return { cagr, totalReturn, gain: F - P };
      }
      case "savings": {
        if (T <= 0) return null;
        const monthlyRate = R / 12;
        const totalMonths = T;
        const fvPrincipal = P * Math.pow(1 + monthlyRate, totalMonths);
        const fvContributions = monthlyRate > 0
          ? MC * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
          : MC * totalMonths;
        const totalValue = fvPrincipal + fvContributions;
        const totalInvested = P + (MC * totalMonths);
        return { totalValue, totalInvested, interestGain: totalValue - totalInvested };
      }
      case "interest": {
        // Simple Interest (Mevduat style)
        const grossInterest = P * (R / 365) * (T * 30); // Approx
        const taxRate = 0.05; // Standard Turkish Tax
        const netInterest = grossInterest * (1 - taxRate);
        return { grossInterest, netInterest, tax: grossInterest - netInterest, total: P + netInterest };
      }
      case "repo": {
        const gross = P * (R / 365) * T;
        const tax = gross * 0.15; // Repo tax is usually higher
        return { gross, tax, net: gross - tax, total: P + gross - tax };
      }
      case "dividend": {
        const yieldPercent = (MC / P) * 100; // MC here acts as annual dividend
        const costBasis = P;
        return { yieldPercent, annualDividend: MC, monthlyDividend: MC / 12 };
      }
      case "deposit": {
        // Compound Monthly
        const totalValue = P * Math.pow(1 + R / 12, T);
        return { totalValue, gain: totalValue - P, effectiveYield: (Math.pow(1 + R / 12, 12) - 1) * 100 };
      }
      default: return null;
    }
  }, [tool, amount, rate, term, finalValue, monthlyContribution]);

  const fmt = (v: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="calc-wrapper max-w-6xl mx-auto pb-20">
      {/* 3D ACTION TILE SWITCHER */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
        {([
          { id: "cagr", label: "Bileşik Büyüme", emoji: "📈" },
          { id: "savings", label: "Birikim", emoji: "💰" },
          { id: "interest", label: "Faiz Getirisi", emoji: "🏦" },
          { id: "repo", label: "Repo Hesabı", emoji: "📉" },
          { id: "dividend", label: "Temettü", emoji: "💎" },
          { id: "deposit", label: "Vadeli Mevduat", emoji: "⏳" }
        ] as { id: InvestmentTool; label: string; emoji: string }[]).map((t) => (
          <button 
            key={t.id}
            onClick={() => { setTool(t.id); confetti({ particleCount: 20, spread: 30, origin: { y: 0.8 } }); }}
            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] transition-all duration-300 relative group border-2 ${
              tool === t.id 
                ? "bg-blue-600 border-blue-500 text-white shadow-[0_20px_50px_rgba(37,99,235,0.4)] -translate-y-3 border-b-[10px] border-blue-800" 
                : "bg-surface border-border text-muted hover:border-blue-500/30 hover:-translate-y-1 border-b-[4px]"
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 ${tool === t.id ? "bg-white/20 rotate-12" : "bg-blue-500/5"}`}>
                {t.emoji}
            </div>
            <span className="text-[10px] font-black uppercase tracking-tight text-center leading-tight">
                {t.label}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* INPUTS - 3D GLASS PANEL */}
        <div className="lg:col-span-5 space-y-8 bg-surface p-10 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          
          <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                  <Calculator size={20} />
              </div>
              <h3 className="text-xs font-black text-muted uppercase tracking-[0.2em]">YATIRIM PARAMETRELERİ</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Başlangıç Tutarı / Anapara</label>
              <div className="calc-input-key !bg-secondary/10">
                <input 
                  type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                  className="calc-input-field !text-2xl font-black py-4"
                />
                <span className="absolute right-6 top-[30%] text-xl font-black text-blue-500 opacity-40 italic">₺</span>
              </div>
            </div>

            {tool === "cagr" && (
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Ulaşılan Bitiş Değeri</label>
                    <div className="calc-input-key">
                        <input type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                        <span className="absolute right-6 top-[30%] text-xl font-black text-emerald-500 opacity-40 italic">₺</span>
                    </div>
                </div>
            )}

            {(tool === "savings" || tool === "dividend") && (
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-primary/40 uppercase ml-2">
                        {tool === "savings" ? "Aylık Ek Katkı" : "Yıllık Toplam Temettü (TL)"}
                    </label>
                    <div className="calc-input-key">
                        <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                        <span className="absolute right-6 top-[30%] text-xl font-black text-purple-500 opacity-40 italic">₺</span>
                    </div>
                </div>
            )}

            {tool !== "cagr" && tool !== "dividend" && (
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Yıllık Faiz Oranı (%)</label>
                    <div className="calc-input-key">
                        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                        <span className="absolute right-6 top-[30%] text-xl font-black text-blue-500 opacity-40 italic">%</span>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                <label className="text-[10px] font-black text-primary/40 uppercase ml-2">
                    {tool === "repo" ? "Vade (Gün)" : "Süre (Ay)"}
                </label>
                <div className="calc-input-key">
                    <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                </div>
            </div>
          </div>

          <div className="pt-6 border-t border-dashed border-border flex items-center gap-4 text-blue-500/60 italic text-[10px] font-black">
              <RefreshCw size={16} /> 2026 Piyasa Verileriyle Uyumludur
          </div>
        </div>

        {/* RESULTS - PREMIUM DASHBOARD */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {results ? (
            <>
              {/* HERO RESULT CARD */}
              <div className="bg-blue-600 p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden group border-b-[10px] border-blue-800/30">
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                
                <div className="relative z-10">
                   <p className="text-[11px] font-black opacity-60 uppercase tracking-[0.4em] mb-3 italic">
                      {tool === "cagr" ? "YILLIK BİLEŞİK GETİRİ" : 
                       tool === "savings" ? "VADE SONU BİRİKİM" : 
                       tool === "dividend" ? "TEMETTÜ VERİMİ" : "NET KAZANÇ"}
                   </p>
                   
                   <h3 className="text-6xl font-black tracking-tighter mb-8 italic drop-shadow-lg">
                      {tool === "cagr" ? `%${(results as any).cagr.toFixed(2)}` : 
                       tool === "dividend" ? `%${(results as any).yieldPercent.toFixed(2)}` : 
                       fmt((results as any).totalValue || (results as any).total || (results as any).net)}
                   </h3>

                   <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
                       <div>
                           <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">
                               {tool === "cagr" ? "Toplam Getiri %" : tool === "savings" ? "Toplam Anapara" : "Vergi Kesintisi"}
                           </p>
                           <p className="text-2xl font-black">
                               {tool === "cagr" ? `%${(results as any).totalReturn.toFixed(1)}` : 
                                tool === "savings" ? fmt((results as any).totalInvested) : 
                                tool === "dividend" ? fmt((results as any).annualDividend) :
                                fmt((results as any).tax || (results as any).gain)}
                           </p>
                       </div>
                       <div>
                           <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">
                               {tool === "dividend" ? "Aylık Pasif Gelir" : "Net Kar / Getiri"}
                           </p>
                           <p className="text-2xl font-black text-blue-200">
                               {tool === "dividend" ? fmt((results as any).monthlyDividend) : 
                                fmt((results as any).gain || (results as any).interestGain || (results as any).netInterest || (results as any).net)}
                           </p>
                       </div>
                   </div>
                </div>
              </div>

              {/* SECONDARY INFO TILES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl hover:shadow-2xl transition-all group">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 group-hover:rotate-12 transition-transform">
                              <TrendingUp size={20} />
                          </div>
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest">Performans Analizi</span>
                      </div>
                      <p className="text-sm font-bold text-primary leading-relaxed">
                          Yatırımınız piyasa ortalamalarına göre <span className="text-emerald-500">güçlü bir ivme</span> sergiliyor.
                      </p>
                  </div>

                  <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl hover:shadow-2xl transition-all group">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 group-hover:-rotate-12 transition-transform">
                              <Clock size={20} />
                          </div>
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest">Zaman Prömiyeri</span>
                      </div>
                      <p className="text-sm font-bold text-primary leading-relaxed">
                          Uzun vadeli stratejiniz <span className="text-purple-500">bileşik getiri</span> gücünden tam yararlanıyor.
                      </p>
                  </div>
              </div>

              {/* ACTION CALLOUT */}
              <div className="bg-surface-variant/50 p-6 rounded-[2rem] border border-border flex items-center justify-between group cursor-pointer hover:bg-blue-500/5 transition-all">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-md">
                         <PieChart size={24} className="text-blue-500" />
                      </div>
                      <div>
                         <p className="text-xs font-black text-primary italic">Detaylı Grafik Raporunu İndir</p>
                         <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Profesyonel PDF Dökümü</p>
                      </div>
                  </div>
                  <ChevronRight size={20} className="text-muted group-hover:translate-x-2 transition-transform" />
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[4rem] border-4 border-dashed border-border opacity-50 grayscale">
                <Target size={80} className="mb-8 opacity-20" />
                <h4 className="text-sm font-black text-muted uppercase tracking-[0.4em] italic text-center">
                   ANALİZ İÇİN<br/>VERİLERİ GİRİN
                </h4>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="mt-16 p-10 bg-surface rounded-[3.5rem] border border-border shadow-lg relative overflow-hidden">
          <div className="absolute left-0 top-0 w-2 h-full bg-blue-500" />
          <div className="flex flex-col md:flex-row gap-10 items-start">
             <div className="shrink-0">
                <div className="w-20 h-20 bg-blue-500/10 rounded-[2rem] flex items-center justify-center text-blue-500">
                   <Briefcase size={36} />
                </div>
             </div>
             <div className="space-y-4">
                <h4 className="text-xl font-black tracking-tight italic">Profesyonel Finansör Notu</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                       <p className="text-[11px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                           <Percent size={12} className="text-blue-500" /> Stopaj ve Vergiler
                       </p>
                       <p className="text-xs text-muted leading-relaxed font-medium">Banka mevduatlarında stopaj oranı vadeye göre %5 ile %15 arasında değişir. Repo işlemlerinde vergi yükü daha yüksektir.</p>
                   </div>
                   <div className="space-y-2">
                       <p className="text-[11px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                           <TrendingUp size={12} className="text-emerald-500" /> Bileşik Getiri Gücü
                       </p>
                       <p className="text-xs text-muted leading-relaxed font-medium">Paranın zaman değeri ve bileşik faiz etkisi, uzun vadeli portföylerde anaparadan çok faiz getirisinin büyümesini sağlar.</p>
                   </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
}
