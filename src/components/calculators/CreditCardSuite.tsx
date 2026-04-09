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
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";


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
      {/* PROFESSIONAL 3D TILE SWITCHER */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
        {(["minimum", "installment", "cash-advance", "late-interest"] as CardTask[]).map((t) => (
          <button 
            key={t}
            onClick={() => { setTask(t); confetti({ particleCount: 25, spread: 30, origin: { y: 0.8 } }); }}
            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[2.5rem] transition-all duration-300 relative group border-2 ${
              task === t 
                ? "bg-blue-600 border-blue-500 text-white shadow-[0_20px_50px_rgba(37,99,235,0.4)] -translate-y-3 border-b-[10px] border-blue-800" 
                : "bg-surface border-border text-muted hover:border-blue-500/30 hover:-translate-y-1 border-b-[4px]"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 ${task === t ? "bg-white/20 rotate-12" : "bg-blue-500/5"}`}>
                {t === "minimum" ? "💳" : t === "installment" ? "🔢" : t === "cash-advance" ? "💵" : "⏰"}
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] mb-1">
                    {t === "minimum" ? "Asgari" : t === "installment" ? "Taksit" : t === "cash-advance" ? "Nakit" : "Gecikme"}
                </span>
                <span className="text-[9px] font-bold opacity-40 italic">
                    {t === "minimum" ? "Hesapla" : t === "installment" ? "Maliyeti" : t === "cash-advance" ? "Avans" : "Faizi"}
                </span>
            </div>
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

        <div className="flex flex-col gap-6">
           {task === "minimum" && results && "minPayment" in results ? (
             <V2Premium3DResult
               title="KREDİ KARTI ANALİZİ"
               mainLabel="ASGARI ÖDEME TUTARI"
               mainValue={fmt(results.minPayment ?? 0)}
               subLabel="KALAN BORÇ (BAKİYE DEVRİ)"
               subValue={fmt(results.remaining ?? 0)}
               color="blue"
               accentIcon={<CreditCard size={32} />}
               footerText="<b>Kart Sahibi Notu:</b> Asgari ödeme yapıldığında kalan borca akdi faiz uygulanır. Borcun tamamı ödenmediği sürece 'faizsiz dönem' avantajı kaybolur."
               items={[
                 {
                   label: "AYLIK FAİZ MALİYETİ",
                   value: `+${fmt(results.monthlyInterest ?? 0)}`,
                   icon: <TrendingDown size={16} />,
                   color: "bg-red-500/10 text-red-500"
                 },
                 {
                   label: "ASGARİ ORANI",
                   value: `%${((results.ratio ?? 0) * 100).toFixed(0)}`,
                   icon: <AlertCircle size={16} />,
                   color: "bg-blue-500/10 text-blue-500"
                 }
               ]}
             />
           ) : null}

           {task === "installment" && results && "monthlyPayment" in results ? (
              <V2Premium3DResult
                title="TAKSİTLENDİRME ANALİZİ"
                mainLabel="AYLIK TAKSİT TUTARI"
                mainValue={fmt(results.monthlyPayment ?? 0)}
                subLabel="TOPLAM GERİ ÖDEME"
                subValue={fmt(results.totalRepayment ?? 0)}
                color="zinc"
                accentIcon={<Clock size={32} />}
                items={[
                  {
                    label: "TOPLAM MALİYET",
                    value: `+${fmt(results.totalCost ?? 0)}`,
                    icon: <DollarSign size={16} />,
                    color: "bg-blue-500/10 text-blue-400"
                  },
                  {
                    label: "TAKSİT SAYISI",
                    value: `${installmentCount} Ay`,
                    icon: <Clock size={16} />,
                    color: "bg-zinc-500/10 text-zinc-400"
                  }
                ]}
              />
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
