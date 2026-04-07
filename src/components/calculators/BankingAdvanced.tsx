"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  ShieldCheck, 
  Target, 
  HelpCircle, 
  CheckCircle2, 
  DollarSign, 
  Briefcase, 
  TrendingUp,
  RefreshCw,
  Info,
  ChevronRight
} from "lucide-react";
import confetti from "canvas-confetti";

type Tool = "eligibility" | "early-repayment" | "dosya-masrafi";

export function BankingAdvanced() {
  const [tool, setTool] = useState<Tool>("eligibility");
  
  // Eligibility states
  const [income, setIncome] = useState("30000");
  const [existingDebt, setExistingDebt] = useState("5000");
  
  // Early Repayment states
  const [remainingPrincipal, setRemainingPrincipal] = useState("80000");
  const [penaltyPercent, setPenaltyPercent] = useState("2.0");

  const results = useMemo(() => {
    if (tool === "eligibility") {
      const inc = parseFloat(income);
      const debt = parseFloat(existingDebt);
      const netIncome = Math.max(0, inc - debt);
      // DTI limit is usually 50% for standard banks
      const maxMonthlyPayment = netIncome * 0.50;
      // Reverse monthly payment to principal (at 3.5% monthly for 24 months)
      const r = 0.035 * 1.30; // approx effective monthly
      const n = 24;
      const maxPossibleLoan = maxMonthlyPayment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
      
      return { maxMonthlyPayment, maxPossibleLoan, dtiRatio: (debt / inc) * 100 };
    }

    if (tool === "early-repayment") {
      const principal = parseFloat(remainingPrincipal);
      const penalty = parseFloat(penaltyPercent) / 100;
      const totalToPay = principal * (1 + penalty);
      return { principal, penaltyAmount: principal * penalty, totalToPay };
    }

    return null;
  }, [tool, income, existingDebt, remainingPrincipal, penaltyPercent]);

  const fmt = (v: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="calc-wrapper max-w-5xl mx-auto pb-20">
      {/* TOOL SWITCHER */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {(["eligibility", "early-repayment", "dosya-masrafi"] as Tool[]).map((t) => (
          <button 
            key={t}
            onClick={() => { setTool(t); confetti({ particleCount: 15, spread: 20 }); }}
            className={`p-6 rounded-[2rem] border-2 transition-all duration-300 text-left relative overflow-hidden group ${
              tool === t 
                ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_15px_30px_rgba(16,185,129,0.3)] -translate-y-2" 
                : "bg-surface border-border text-muted hover:border-emerald-500/30"
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${tool === t ? "bg-white/20" : "bg-emerald-500/10 text-emerald-500"}`}>
               {t === "eligibility" ? <Target size={24} /> : t === "early-repayment" ? <RefreshCw size={24} /> : <ShieldCheck size={24} />}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">
               {t === "eligibility" ? "Kapasite" : t === "early-repayment" ? "Kapatma" : "Masraf"}
            </p>
            <h4 className="text-sm font-black font-mono tracking-tight">
               {t === "eligibility" ? "Ne Kadar Kredi Alabilirim?" : t === "early-repayment" ? "Erken Ödeme Hesabı" : "Dosya Masrafı"}
            </h4>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* INPUTS AREA */}
        <div className="space-y-8 bg-surface p-10 rounded-[3rem] border border-border shadow-2xl">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Briefcase size={20} />
              </div>
              <h3 className="text-xs font-black text-muted uppercase tracking-widest">Girdi Verileri</h3>
           </div>

           {tool === "eligibility" && (
             <div className="space-y-6">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-muted uppercase ml-2">Aylık Net Gelir (Hane Toplamı)</label>
                   <div className="calc-input-key">
                      <input type="number" value={income} onChange={e => setIncome(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-muted uppercase ml-2">Mevcut Aylık Taksit Ödemeleriniz</label>
                   <div className="calc-input-key !bg-secondary/10">
                      <input type="number" value={existingDebt} onChange={e => setExistingDebt(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                   </div>
                </div>
             </div>
           )}

           {tool === "early-repayment" && (
             <div className="space-y-6">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-muted uppercase ml-2">Kalan Anapara Borcu</label>
                   <div className="calc-input-key">
                      <input type="number" value={remainingPrincipal} onChange={e => setRemainingPrincipal(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-muted uppercase ml-2">Erken Kapama Ceza Oranı (%)</label>
                   <div className="calc-input-key">
                      <input type="number" step="0.5" value={penaltyPercent} onChange={e => setPenaltyPercent(e.target.value)} className="calc-input-field !text-xl font-black py-4" />
                   </div>
                </div>
             </div>
           )}

           <div className="pt-6 border-t border-border flex items-center gap-4 text-emerald-500/60 drop-shadow-sm italic text-[10px] font-black">
              <CheckCircle2 size={16} /> 2026 Bankacılık Mevzuatına Uygundur
           </div>
        </div>

        {/* RESULTS AREA */}
        <div className="flex flex-col gap-6">
           {tool === "eligibility" && results && "maxPossibleLoan" in results ? (
             <div className="flex flex-col gap-6">
               <div className="bg-emerald-600 p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden border-b-[8px] border-emerald-800/30">
                  <p className="text-[11px] font-black opacity-60 uppercase tracking-widest mb-3 italic">TAHMİNİ KREDİ LİMİTİNİZ</p>
                  <h3 className="text-6xl font-black tracking-tight mb-8">~ {fmt(results.maxPossibleLoan ?? 0)}</h3>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
                      <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Maksimum Aylık Taksit Gücünüz</p>
                      <p className="text-2xl font-black">{fmt(results.maxMonthlyPayment ?? 0)} / ay</p>
                  </div>
               </div>

               <div className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-[10px] font-black text-muted uppercase">Borç / Gelir Oranı</span>
                     <span className={`text-xl font-black ${(results.dtiRatio ?? 0) > 50 ? "text-red-500" : "text-emerald-500"}`}>%{(results.dtiRatio ?? 0).toFixed(1)}</span>
                  </div>
                  <div className="h-3 w-full bg-secondary/20 rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-1000 ${(results.dtiRatio ?? 0) > 50 ? "bg-red-500" : "bg-emerald-500"}`} style={{ width: `${Math.min(100, results.dtiRatio ?? 0)}%` }} />
                  </div>
                  <p className="text-[10px] text-muted italic mt-4 font-bold">* %50 üzerindeki oranlarda bankalar genellikle kredi onaylamazlar.</p>
               </div>
             </div>
           ) : null}

           {tool === "early-repayment" && results && "penaltyAmount" in results ? (
             <div className="flex flex-col gap-6">
                <div className="bg-zinc-900 p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden border-b-[8px] border-black/50">
                    <p className="text-[11px] font-black opacity-40 uppercase tracking-widest mb-3 italic">ERKEN KAPATMA TOPLAM ÖDEME</p>
                    <h3 className="text-6xl font-black tracking-tighter mb-8">{fmt(results.totalToPay ?? 0)}</h3>
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 uppercase tracking-widest text-[10px] font-black">
                       <span className="opacity-60">Uygulanan Ceza Tutarı</span>
                       <span className="text-red-400 text-lg">+{fmt(results.penaltyAmount ?? 0)}</span>
                    </div>
                </div>
             </div>
           ) : null}

           <div className="bg-surface p-6 rounded-[2.5rem] border border-border flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
                  <Info size={20} />
              </div>
              <p className="text-[10px] text-muted leading-relaxed font-bold italic">
                 <b>Finansör Notu:</b> Bu veriler simülasyon amaçlıdır. Kredi puanınız (Findeks) ve banka içi limitleriniz nihai sonucu etkileyecektir.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
