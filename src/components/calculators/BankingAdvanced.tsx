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
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";


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
      {/* PROFESSIONAL 3D TILE SWITCHER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
        {(["eligibility", "early-repayment", "dosya-masrafi"] as Tool[]).map((t) => (
          <button 
            key={t}
            onClick={() => { setTool(t); confetti({ particleCount: 25, spread: 30, origin: { y: 0.8 } }); }}
            className={`flex flex-col items-start p-8 rounded-[2.5rem] transition-all duration-300 relative group border-2 ${
              tool === t 
                ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_20px_50px_rgba(16,185,129,0.4)] -translate-y-3 border-b-[10px] border-emerald-800" 
                : "bg-surface border-border text-muted hover:border-emerald-500/30 hover:-translate-y-1 border-b-[4px]"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:rotate-12 ${tool === t ? "bg-white/20" : "bg-emerald-500/5 text-emerald-500"}`}>
               {t === "eligibility" ? "🎯" : t === "early-repayment" ? "🔄" : "🛡️"}
            </div>
            <div className="mt-6">
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${tool === t ? "opacity-60" : "text-emerald-500"}`}>
                   {t === "eligibility" ? "Kapasite" : t === "early-repayment" ? "Kapatma" : "Masraf"}
                </p>
                <h4 className="text-lg font-black tracking-tight leading-tight">
                   {t === "eligibility" ? "Ne Kadar Kredi Alabilirim?" : t === "early-repayment" ? "Erken Ödeme Hesabı" : "Dosya Masrafı"}
                </h4>
            </div>
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

        <div className="flex flex-col gap-6">
           {tool === "eligibility" && results && "maxPossibleLoan" in results ? (
             <V2Premium3DResult
               title="KREDİ KAPASİTE ANALİZİ"
               mainLabel="TAHMİNİ KREDİ LİMİTİNİZ"
               mainValue={`~ ${fmt(results.maxPossibleLoan ?? 0)}`}
               subLabel="MAKSİMUM AYLIK TAKSİT GÜCÜNÜZ"
               subValue={`${fmt(results.maxMonthlyPayment ?? 0)} / ay`}
               color="emerald"
               variant="precise"
               gaugePercentage={results.dtiRatio}
               gaugeLabel="BORÇ / GELİR"
               accentIcon={<Target size={32} />}
               footerText="<b>Finansör Notu:</b> Bu veriler simülasyon amaçlıdır. Kredi puanınız (Findeks) ve banka içi limitleriniz nihai sonucu etkileyecektir."
               items={[
                 {
                   label: "BORÇLULUK DURUMU",
                   value: (results.dtiRatio ?? 0) > 50 ? "YÜKSEK" : "SAĞLIKLI",
                   icon: <ShieldCheck size={16} />,
                   color: (results.dtiRatio ?? 0) > 50 ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                 }
               ]}
             />
           ) : null}

           {tool === "early-repayment" && results && "penaltyAmount" in results ? (
             <V2Premium3DResult
               title="ERKEN KAPATMA HESABI"
               mainLabel="ERKEN KAPATMA TOPLAM ÖDEME"
               mainValue={fmt(results.totalToPay ?? 0)}
               subLabel="KALAN ANAPARA BORCU"
               subValue={fmt(results.principal ?? 0)}
               color="zinc"
               variant="precise"
               accentIcon={<RefreshCw size={32} />}
               items={[
                 {
                   label: "ERKEN KAPAMA CEZASI",
                   value: `+${fmt(results.penaltyAmount ?? 0)}`,
                   icon: <DollarSign size={16} />,
                   color: "bg-red-500/10 text-red-400"
                 }
               ]}
             />
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
