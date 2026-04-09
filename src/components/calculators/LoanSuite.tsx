"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Landmark, 
  Percent, 
  Calendar, 
  Calculator, 
  TrendingUp, 
  Info, 
  ChevronRight, 
  RefreshCw,
  PieChart,
  DollarSign,
  Briefcase
} from "lucide-react";
import confetti from "canvas-confetti";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";


type LoanType = "personal" | "housing" | "vehicle" | "commercial";

interface InternalResult {
  monthlyPayment: number;
  totalInterest: number;
  totalTax: number;
  totalPayment: number;
  apr: number;
}

export function LoanSuite() {
  const [loanType, setLoanType] = useState<LoanType>("personal");
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("3.89"); // Current average rate
  const [months, setMonths] = useState("24");
  const [fee, setFee] = useState("500"); // Dosya masrafı

  // Turkish Banking Tax Decoders
  const taxConfig = useMemo(() => {
    switch (loanType) {
      case "housing": return { kkdf: 0, bsmv: 0, title: "Konut Kredisi", icon: "🏠" };
      case "vehicle": return { kkdf: 0.15, bsmv: 0.15, title: "Taşıt Kredisi", icon: "🚗" };
      case "commercial": return { kkdf: 0, bsmv: 0.05, title: "Ticari Kredi", icon: "🏢" };
      default: return { kkdf: 0.15, bsmv: 0.15, title: "İhtiyaç Kredisi", icon: "🛍️" };
    }
  }, [loanType]);

  const results = useMemo((): InternalResult | null => {
    const P = parseFloat(amount);
    const IR = parseFloat(rate) / 100;
    const N = parseInt(months);
    const F = parseFloat(fee) || 0;

    if (!P || !IR || !N || P <= 0 || IR <= 0 || N <= 0) return null;

    // effective monthly rate with taxes
    const effRate = IR * (1 + taxConfig.kkdf + taxConfig.bsmv);
    
    const monthlyPayment = (P * effRate * Math.pow(1 + effRate, N)) / (Math.pow(1 + effRate, N) - 1);
    const totalPayment = monthlyPayment * N;
    const totalCostWithFee = totalPayment + F;
    
    // Simple APR approximation (Turkish Standard)
    // APR = (Total Interest + Total Tax + Fee) / Principal / (Years) * 100
    // Real APR needs XIRR, but banks use a standardized 360/365 day nominal rate
    const totalInterestAndTax = totalPayment - P;
    const totalInterestOnly = (P * IR * N) / N; // simplistic but for tax separation:
    // A better way is to iterate the amortization but let's use the standard banking ratio:
    const taxRatio = (taxConfig.kkdf + taxConfig.bsmv) / (1 + taxConfig.kkdf + taxConfig.bsmv);
    const totalTax = totalInterestAndTax * taxRatio;
    const totalInterest = totalInterestAndTax - totalTax;

    // Annual Cost Ratio (Maliyet Oranı)
    const annualCostRatio = ((totalCostWithFee - P) / P / (N / 12)) * 100;

    return {
      monthlyPayment,
      totalInterest,
      totalTax,
      totalPayment: totalPayment + F,
      apr: annualCostRatio
    };
  }, [amount, rate, months, fee, taxConfig]);

  const fmt = (v: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="calc-wrapper max-w-6xl mx-auto">
      {/* PROFESSIONAL 3D TILE SWITCHER */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
        {(["personal", "housing", "vehicle", "commercial"] as LoanType[]).map((type) => (
          <button 
            key={type}
            onClick={() => { setLoanType(type); confetti({ particleCount: 25, spread: 30, origin: { y: 0.8 } }); }}
            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[2.5rem] transition-all duration-300 relative group border-2 ${
              loanType === type 
                ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_20px_50px_rgba(16,185,129,0.4)] -translate-y-3 border-b-[10px] border-emerald-800" 
                : "bg-surface border-border text-muted hover:border-emerald-500/30 hover:-translate-y-1 border-b-[4px]"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 ${loanType === type ? "bg-white/20 -rotate-12" : "bg-emerald-500/5"}`}>
                {type === "housing" ? "🏠" : type === "vehicle" ? "🚗" : type === "commercial" ? "🏢" : "🛍️"}
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] mb-1">
                    {type === "housing" ? "KONUT" : type === "vehicle" ? "TAŞIT" : type === "commercial" ? "TİCARİ" : "İHTİYAÇ"}
                </span>
                <span className="text-[9px] font-bold opacity-40 italic">
                    {type === "housing" ? "Kredisi" : type === "vehicle" ? "Kredisi" : type === "commercial" ? "Ticari" : "Bireysel"}
                </span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* INPUTS - 3D GLASS PANEL */}
        <div className="lg:col-span-5 space-y-8 bg-surface p-10 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          
          <h3 className="text-xs font-black text-muted uppercase tracking-[0.3em] flex items-center gap-3">
             <Landmark size={16} className="text-emerald-500" />
             KREDİ PARAMETRELERİ
          </h3>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Çekilecek Tutar</label>
              <div className="calc-input-key !bg-secondary/10">
                <input 
                  type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                  className="calc-input-field !text-3xl font-black py-6 pl-10 pr-16"
                  placeholder="100.000"
                />
                <span className="absolute right-8 top-[35%] text-2xl font-black text-emerald-500 opacity-40 italic">₺</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-primary/40 uppercase ml-2 font-mono">Aylık Faiz (%)</label>
                <div className="calc-input-key">
                   <input 
                    type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)}
                    className="calc-input-field !text-2xl font-black py-4"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-primary/40 uppercase ml-2 font-mono">Vade (Ay)</label>
                <div className="calc-input-key">
                   <input 
                    type="number" value={months} onChange={(e) => setMonths(e.target.value)}
                    className="calc-input-field !text-2xl font-black py-4"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-primary/40 uppercase ml-2">Tahsis Ücreti / Masraf</label>
              <div className="calc-input-key">
                <input 
                  type="number" value={fee} onChange={(e) => setFee(e.target.value)}
                  className="calc-input-field !text-xl font-black py-4"
                  placeholder="500"
                />
                <span className="absolute right-6 top-[35%] font-black text-muted opacity-30 italic">₺</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-dashed border-border flex justify-between items-center">
             <div className="flex flex-col">
                <span className="text-[9px] font-black text-muted uppercase tracking-widest mb-1 italic">Vergi Kanunu</span>
                <span className="text-xs font-black text-emerald-600">KKDF: %{taxConfig.kkdf * 100} / BSMV: %{taxConfig.bsmv * 100}</span>
             </div>
             <button 
                onClick={() => { setAmount("100000"); setRate("3.89"); setMonths("24"); setFee("500"); }}
                className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-muted hover:text-primary hover:bg-secondary/40 transition-all hover:rotate-180 duration-500"
             >
                <RefreshCw size={18} />
             </button>
          </div>
        </div>

        {/* RESULTS - PREMIUM BANKING PANEL */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {results ? (
            <>
              <V2Premium3DResult
                title={`${taxConfig.title} ÖZETİ`}
                mainLabel="AYLIK TAKSİT TUTARI"
                mainValue={fmt(results.monthlyPayment)}
                subLabel="TOPLAM GERİ ÖDEME (MASRAFLI)"
                subValue={fmt(results.totalPayment)}
                color="emerald"
                gaugePercentage={results.apr}
                gaugeLabel="APR / MALİYET"
                accentIcon={<TrendingUp size={32} />}
                items={[
                  {
                    label: "TOPLAM FAİZ",
                    value: fmt(results.totalInterest),
                    icon: <Percent size={16} />,
                    color: "bg-emerald-500/10 text-emerald-500"
                  },
                  {
                    label: "VERGİ YÜKÜ",
                    value: fmt(results.totalTax),
                    icon: <Calculator size={16} />,
                    color: "bg-purple-500/10 text-purple-500"
                  }
                ]}
              />

              <div className="bg-surface-variant/50 p-6 rounded-[2rem] border border-border flex items-center justify-between group cursor-pointer hover:bg-emerald-500/5 transition-all">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-md">
                         <Calendar size={24} className="text-emerald-500" />
                      </div>
                      <div>
                         <p className="text-xs font-black text-primary">Ödeme Planını Excel Olarak Al</p>
                         <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Taksit Taksit Döküm Listesi</p>
                      </div>
                  </div>
                  <ChevronRight size={20} className="text-muted group-hover:translate-x-2 transition-transform" />
              </div>
            </>

          ) : (
             <div className="flex-grow flex flex-col items-center justify-center p-20 bg-secondary/5 rounded-[4rem] border-4 border-dashed border-border opacity-50 grayscale">
                <Landmark size={80} className="mb-8 opacity-20" />
                <h4 className="text-sm font-black text-muted uppercase tracking-[0.4em] italic text-center">
                   HESAPLAMA İÇİN<br/>PARAMETRELERİ GİRİN
                </h4>
             </div>
          )}
        </div>
      </div>

      <div className="mt-16 p-10 bg-surface rounded-[3.5rem] border border-border shadow-lg relative overflow-hidden">
          <div className="absolute left-0 top-0 w-2 h-full bg-emerald-500" />
          <div className="flex flex-col md:flex-row gap-10 items-start">
             <div className="shrink-0">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-500">
                   <Briefcase size={36} />
                </div>
             </div>
             <div className="space-y-4">
                <h4 className="text-xl font-black tracking-tight italic">Profesyonel Bankacılık Bilgilendirmesi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                       <p className="text-[11px] font-black text-muted uppercase tracking-widest">KKDF Nedir?</p>
                       <p className="text-xs text-muted leading-relaxed font-medium">Kaynak Kullanımını Destekleme Fonu. İhtiyaç ve Taşıt kredilerinde faiz üzerinden %15 oranında hesaplanır. Konut kredilerinde muhaftır.</p>
                   </div>
                   <div className="space-y-2">
                       <p className="text-[11px] font-black text-muted uppercase tracking-widest">BSMV Nedir?</p>
                       <p className="text-xs text-muted leading-relaxed font-medium">Banka ve Sigorta Muameleleri Vergisi. Kredi faizi üzerinden hesaplanan %15'lik (Ticari kredilerde %5) bir vergidir.</p>
                   </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
}
