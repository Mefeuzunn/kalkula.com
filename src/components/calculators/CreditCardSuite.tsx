"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  CreditCard, 
  Wallet, 
  ArrowRight, 
  RefreshCw, 
  AlertCircle,
  HelpCircle,
  Clock,
  TrendingDown,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";

type CardTask = "minimum" | "installment" | "cash-advance" | "late-interest";

export function CreditCardSuite() {
  const [task, setTask] = useState<CardTask>("minimum");
  const [debt, setDebt] = useState("20000");
  const [limit, setLimit] = useState("50000");
  
  // Specific inputs for installment
  const [purchaseAmount, setPurchaseAmount] = useState("5000");
  const [installmentCount, setInstallmentCount] = useState("6");
  const [monthlyCommission, setMonthlyCommission] = useState("5.00"); // 5% monthly is common now

  // Central Bank Caps (approximate for April 2026)
  const TCMB_CAP = 5.00; // Monthly interest cap
  const BSMV = 0.15; // 15%
  const KKDF = 0.15; // 15%

  const results = useMemo(() => {
    const d = parseFloat(debt) || 0;
    const l = parseFloat(limit) || 0;
    const p = parseFloat(purchaseAmount) || 0;
    const n = parseInt(installmentCount) || 1;
    const comm = parseFloat(monthlyCommission) || TCMB_CAP;

    if (task === "minimum") {
      const ratio = l > 25000 ? 0.40 : 0.20;
      const minPayment = d * ratio;
      const remaining = d - minPayment;
      const dailyInterest = remaining * (TCMB_CAP / 100 / 30) * (1 + BSMV + KKDF);
      return { minPayment, ratio, remaining, monthlyInterest: dailyInterest * 30 };
    }

    if (task === "installment") {
      const effectiveRate = (comm / 100) * (1 + BSMV + KKDF);
      const monthlyPayment = (p * effectiveRate * Math.pow(1 + effectiveRate, n)) / (Math.pow(1 + effectiveRate, n) - 1);
      const totalRepayment = monthlyPayment * n;
      const totalCost = totalRepayment - p;
      return { monthlyPayment, totalRepayment, totalCost };
    }

    return null;
  }, [task, debt, limit, purchaseAmount, installmentCount, monthlyCommission]);

  const fmt = (v: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(v);

  return (
    <div className="calc-wrapper max-w-5xl mx-auto">
      {/* PROFESSIONAL TAB SWITCHER */}
      <div className="flex bg-surface-variant p-2 rounded-[28px] mb-12 w-full max-w-xl mx-auto border border-border shadow-inner relative overflow-hidden">
        {(["minimum", "installment", "cash-advance", "late-interest"] as CardTask[]).map((t) => (
          <button 
            key={t}
            onClick={() => { setTask(t); confetti({ particleCount: 15, spread: 20 }); }}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl text-[9px] font-black transition-all duration-300 relative z-10 ${
              task === t 
                ? "bg-white dark:bg-slate-700 text-blue-600 shadow-lg -translate-y-1" 
                : "text-muted hover:text-primary opacity-60"
            }`}
          >
            <span className="text-lg">
                {t === "minimum" ? "💳" : t === "installment" ? "🔢" : t === "cash-advance" ? "💵" : "⏰"}
            </span>
            <span className="whitespace-nowrap uppercase tracking-tighter">
                {t === "minimum" ? "Asgari" : t === "installment" ? "Taksit" : t === "cash-advance" ? "Nakit" : "Gecikme"}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* INPUTS AREA */}
        <div className="space-y-8 bg-surface p-10 rounded-[3rem] border border-border shadow-xl">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                  <Wallet size={20} />
              </div>
              <h3 className="text-xs font-black text-muted uppercase tracking-[0.2em] font-mono">Hesaplama Parametreleri</h3>
           </div>

           {task === "minimum" && (
             <div className="space-y-6">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-muted uppercase ml-2">Kart Limiti (Limit Bazlı Oran)</label>
                   <div className="calc-input-key">
                      <input type="number" value={limit} onChange={e => setLimit(e.target.value)} className="calc-input-field !text-2xl font-black py-4" placeholder="50.000" />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-muted uppercase ml-2">Dönem Borcu</label>
                   <div className="calc-input-key !bg-blue-500/5">
                      <input type="number" value={debt} onChange={e => setDebt(e.target.value)} className="calc-input-field !text-2xl font-black py-4" placeholder="20.000" />
                   </div>
                </div>
             </div>
           )}

           {task === "installment" && (
             <div className="space-y-6">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-muted uppercase ml-2">Alışveriş Tutarı</label>
                   <div className="calc-input-key">
                      <input type="number" value={purchaseAmount} onChange={e => setPurchaseAmount(e.target.value)} className="calc-input-field !text-2xl font-black py-4" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-muted uppercase ml-2 font-mono">Taksit Sayısı</label>
                     <div className="calc-input-key">
                        <select value={installmentCount} onChange={e => setInstallmentCount(e.target.value)} className="calc-input-field !text-xl font-black py-4 appearance-none cursor-pointer">
                           {[3, 6, 9, 12].map(n => <option key={n} value={n}>{n} Ay</option>)}
                        </select>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-muted uppercase ml-2 font-mono">Aylık Faiz (%)</label>
                     <div className="calc-input-key">
                        <input type="number" step="0.01" value={monthlyCommission} onChange={e => setMonthlyCommission(e.target.value)} className="calc-input-field !text-xl font-black py-4" />
                     </div>
                  </div>
                </div>
             </div>
           )}

           <div className="pt-6 border-t border-border flex justify-between items-center text-[10px] font-black text-muted italic">
              <span>* TCMB Güncel Faiz Tavanı: %{TCMB_CAP}</span>
              <button onClick={() => { setDebt("20000"); setLimit("50000"); }} className="p-3 bg-secondary/10 rounded-xl hover:rotate-180 duration-500 transition-all"><RefreshCw size={14} /></button>
           </div>
        </div>

        {/* RESULTS AREA */}
        <div className="flex flex-col gap-6">
           {task === "minimum" && results && "minPayment" in results ? (
             <>
               <div className="bg-blue-600 p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden border-b-[8px] border-blue-800/40">
                  <p className="text-[11px] font-black opacity-60 uppercase tracking-[0.3em] mb-3">ASGARİ ÖDEME TUTARI</p>
                  <h3 className="text-6xl font-black tracking-tighter mb-8">{fmt(results.minPayment ?? 0)}</h3>
                  <div className="flex items-center gap-2 bg-white/10 w-fit px-4 py-2 rounded-xl border border-white/10">
                     <AlertCircle size={14} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Uygulanan Oran: %{((results.ratio ?? 0) * 100).toFixed(0)}</span>
                  </div>
               </div>
               
               <div className="bg-surface p-8 rounded-[3rem] border border-border shadow-xl space-y-6">
                  <div className="flex justify-between items-center border-b border-border pb-4">
                     <span className="text-[10px] font-black text-muted uppercase">Kalan Borç (Bakiye Devri)</span>
                     <span className="text-xl font-black text-primary">{fmt(results.remaining ?? 0)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-red-500/5 p-4 rounded-2xl border border-red-500/10">
                     <div className="flex items-center gap-2 text-red-500">
                        <TrendingDown size={16} />
                        <span className="text-[10px] font-black uppercase">Aylık Faiz Maliyeti</span>
                     </div>
                     <span className="text-xl font-black text-red-600">+{fmt(results.monthlyInterest ?? 0)}</span>
                  </div>
               </div>
             </>
           ) : null}

           {task === "installment" && results && "monthlyPayment" in results ? (
              <>
                <div className="bg-zinc-900 p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden border-b-[8px] border-black/40">
                   <p className="text-[11px] font-black opacity-60 uppercase tracking-[0.3em] mb-3">AYLIK TAKSİT TUTARI</p>
                   <h3 className="text-6xl font-black tracking-tighter mb-8">{fmt(results.monthlyPayment ?? 0)}</h3>
                   <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                      <div>
                         <p className="text-[9px] font-black opacity-40 uppercase tracking-widest mb-1">Toplam Geri Ödeme</p>
                         <p className="text-xl font-black">{fmt(results.totalRepayment ?? 0)}</p>
                      </div>
                      <div>
                         <p className="text-[9px] font-black opacity-40 uppercase tracking-widest mb-1">Toplam Maliyet</p>
                         <p className="text-xl font-black text-blue-400">+{fmt(results.totalCost ?? 0)}</p>
                      </div>
                   </div>
                </div>
              </>
           ) : null}

           <div className="bg-surface p-6 rounded-[2.5rem] border border-border flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                  <Info size={20} />
              </div>
              <p className="text-[10px] text-muted leading-relaxed font-bold italic">
                 <b>Kart Sahibi Notu:</b> Asgari ödeme yapıldığında kalan borca akdi faiz uygulanır. Borcun tamamı ödenmediği sürece "faizsiz dönem" avantajı kaybolur.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
