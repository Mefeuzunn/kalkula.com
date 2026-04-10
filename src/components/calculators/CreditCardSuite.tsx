"use client";

import React, { useState, useMemo } from "react";
import { 
  CreditCard, 
  Wallet, 
  RefreshCw, 
  AlertCircle,
  Clock,
  TrendingDown,
  Info,
  DollarSign
} from "lucide-react";
import confetti from "canvas-confetti";
import { V2Premium3DResult } from "./ui-v2/V2Premium3DResult";

type CardTask = "minimum" | "installment" | "cash-advance" | "late-interest";

export function CreditCardSuite() {
  const [task, setTask] = useState<CardTask>("minimum");
  const [debt, setDebt] = useState("20000");
  const [limit, setLimit] = useState("50000");
  
  const [purchaseAmount, setPurchaseAmount] = useState("5000");
  const [installmentCount, setInstallmentCount] = useState("6");
  const [monthlyCommission, setMonthlyCommission] = useState("5.00");

  const results = useMemo(() => {
    const d = parseFloat(debt) || 0;
    const l = parseFloat(limit) || 0;
    const p = parseFloat(purchaseAmount) || 0;
    const n = parseInt(installmentCount) || 1;
    const rate = parseFloat(monthlyCommission) || 5;

    if (task === "minimum") {
      const ratio = l > 25000 ? 0.40 : 0.20;
      const minPayment = d * ratio;
      const remaining = d - minPayment;
      const monthlyInterest = remaining * (rate / 100) * 1.30; // Including taxes approx.
      return { minPayment, ratio, remaining, monthlyInterest };
    }

    if (task === "installment") {
      const r = (rate / 100) * 1.30; // 30% taxes (BSMV+KKDF)
      const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalRepayment = monthlyPayment * n;
      const totalCost = totalRepayment - p;
      return { monthlyPayment, totalRepayment, totalCost };
    }

    return null;
  }, [task, debt, limit, purchaseAmount, installmentCount, monthlyCommission]);

  const fmt = (v: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(v);

  const reset = () => {
    setDebt("20000");
    setLimit("50000");
    setPurchaseAmount("5000");
    setInstallmentCount("6");
    setMonthlyCommission("5.00");
  };

  return (
    <div className="calc-wrapper max-w-5xl mx-auto space-y-12">
      {/* TILE SWITCHER */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {(["minimum", "installment", "cash-advance", "late-interest"] as CardTask[]).map((t) => (
          <button 
            key={t}
            onClick={() => { setTask(t); confetti({ particleCount: 20, spread: 30, origin: { y: 0.8 } }); }}
            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] transition-all border-2 ${
              task === t 
                ? "bg-blue-600 border-blue-500 text-white shadow-xl -translate-y-1" 
                : "bg-surface border-border text-muted hover:border-blue-500/30"
            }`}
          >
            <div className="text-2xl mb-1">
                {t === "minimum" ? "💳" : t === "installment" ? "🔢" : t === "cash-advance" ? "💵" : "⏰"}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-center">
                {t === "minimum" ? "Asgari Ödeme" : t === "installment" ? "Taksitlendirme" : t === "cash-advance" ? "Nakit Avans" : "Gecikme Faizi"}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8 bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl">
           <div className="flex items-center gap-3 mb-4">
              <Wallet className="text-blue-500" size={20} />
              <h3 className="text-xs font-black text-muted uppercase tracking-widest font-mono">Giriş Parametreleri</h3>
           </div>

           {task === "minimum" && (
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-muted uppercase px-2">KART LİMİTİ</label>
                   <input type="number" value={limit} onChange={e => setLimit(e.target.value)} className="calc-input-field !text-xl font-black py-4" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-muted uppercase px-2">DÖNEM BORCU</label>
                   <input type="number" value={debt} onChange={e => setDebt(e.target.value)} className="calc-input-field !text-xl font-black py-4" />
                </div>
             </div>
           )}

           {task === "installment" && (
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-muted uppercase px-2">ALIŞVERİŞ TUTARI</label>
                   <input type="number" value={purchaseAmount} onChange={e => setPurchaseAmount(e.target.value)} className="calc-input-field !text-xl font-black py-4" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-muted uppercase px-2">TAKSİT</label>
                     <select value={installmentCount} onChange={e => setInstallmentCount(e.target.value)} className="calc-input-field font-black py-4 appearance-none cursor-pointer">
                        {[3, 6, 9, 12, 18, 24].map(n => <option key={n} value={n.toString()}>{n} Ay</option>)}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-muted uppercase px-2">FAİZ (%)</label>
                     <input type="number" value={monthlyCommission} onChange={e => setMonthlyCommission(e.target.value)} className="calc-input-field font-black py-4" />
                  </div>
                </div>
             </div>
           )}

           <div className="pt-6 border-t border-border flex justify-between items-center text-[10px] font-black text-muted italic">
              <span>* TCMB Nisan 2026 Faiz Tavanı: %5.00</span>
              <button onClick={reset} className="p-3 bg-secondary/10 rounded-xl hover:rotate-180 transition-all"><RefreshCw size={14} /></button>
           </div>
        </div>

        <div className="space-y-6">
           {task === "minimum" && results && "minPayment" in results ? (
             <V2Premium3DResult
               title="KREDİ KARTI ANALİZİ"
               mainLabel="ASGARİ ÖDEME TUTARI"
               mainValue={fmt(results.minPayment || 0)}
               subLabel="GELECEK AYA DEVREDEN BORÇ"
               subValue={fmt(results.remaining || 0)}
               color="blue"
               variant="precise"
               accentIcon={<CreditCard size={32} />}
               items={[
                 {
                   label: "TAHMİNİ EK FAİZ",
                   value: `+${fmt(results.monthlyInterest || 0)}`,
                   icon: <TrendingDown size={16} />,
                   color: "text-red-500"
                 },
                 {
                   label: "ASGARİ ORAN",
                   value: `%${((results.ratio || 0) * 100).toFixed(0)}`,
                   icon: <AlertCircle size={16} />,
                   color: "text-blue-500"
                 }
               ]}
               footerText="* Hesaplamaya BSMV ve KKDF vergileri dahildir."
             />
           ) : null}

           {task === "installment" && results && "monthlyPayment" in results ? (
              <V2Premium3DResult
                title="TAKSİTLENDİRME ANALİZİ"
                mainLabel="AYLIK TAKSİT TUTARI"
                mainValue={fmt(results.monthlyPayment || 0)}
                subLabel="TOPLAM GERİ ÖDEME"
                subValue={fmt(results.totalRepayment || 0)}
                color="zinc"
                variant="precise"
                accentIcon={<Clock size={32} />}
                items={[
                  {
                    label: "TOPLAM FAİZ MALİYETİ",
                    value: `+${fmt(results.totalCost || 0)}`,
                    icon: <DollarSign size={16} />,
                    color: "text-blue-400"
                  },
                  {
                    label: "VADE",
                    value: `${installmentCount} Ay`,
                    icon: <Clock size={16} />,
                    color: "text-zinc-400"
                  }
                 ]}
              />
           ) : null}

           <div className="bg-surface p-6 rounded-[2rem] border border-border flex items-start gap-4">
              <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <p className="text-[10px] text-muted leading-relaxed font-bold italic">
                 Asgari ödeme yapıldığında kalan borca akdi faiz uygulanır. Borcunuzun tamamını ödemeniz halinde faiz uygulanmaz.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
