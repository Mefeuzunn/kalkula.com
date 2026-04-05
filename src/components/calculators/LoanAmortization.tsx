"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function LoanAmortization() {
  const [amount, setAmount] = useState("100000");
  const [term, setTerm] = useState("12");
  const [interest, setInterest] = useState("3.5");
  
  const [summary, setSummary] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    schedule: { 
      period: number; 
      payment: number; 
      principal: number; 
      interestAmt: number; 
      balance: number 
    }[];
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(amount);
    const n = parseFloat(term);
    const i = parseFloat(interest) / 100;

    if (P <= 0 || n <= 0 || i <= 0) {
      setSummary(null);
      return;
    }

    // Monthly payment formula: P * (i * (1+i)^n) / ((1+i)^n - 1)
    const monthlyPayment = P * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    const schedule = [];
    let remainingBalance = P;

    for (let k = 1; k <= n; k++) {
      const interestAmt = remainingBalance * i;
      const principal = monthlyPayment - interestAmt;
      remainingBalance -= principal;

      schedule.push({
        period: k,
        payment: monthlyPayment,
        principal,
        interestAmt,
        balance: Math.max(0, remainingBalance)
      });
    }

    setSummary({ monthlyPayment, totalPayment, totalInterest, schedule });

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#1e40af"]
    });
  };

  useEffect(() => {
    calculate();
  }, [amount, term, interest]);

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-4 flex flex-col gap-5">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] border-b-8 border-blue-500/20 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Kredi Tutarı (TL)</label>
                 <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    className="input-field !text-2xl !py-4 font-black border-4 border-border transition-all"
                    placeholder="100.000"
                 />
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Vade (Ay)</label>
                 <div className="relative">
                    <input 
                       type="number" 
                       value={term} 
                       onChange={(e) => setTerm(e.target.value)}
                       className="input-field !text-2xl !py-4 font-black border-4 border-border transition-all pr-16"
                       placeholder="12"
                    />
                    <span className="absolute right-6 top-[32%] text-muted font-black italic opacity-30">AY</span>
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 block italic">Aylık Faiz Oranı (%)</label>
                 <div className="relative">
                    <input 
                       type="number" 
                       step="0.01"
                       value={interest} 
                       onChange={(e) => setInterest(e.target.value)}
                       className="input-field !text-2xl !py-4 font-black border-4 border-border transition-all pr-16"
                       placeholder="3.50"
                    />
                    <span className="absolute right-6 top-[32%] text-muted font-black italic opacity-30">%</span>
                 </div>
              </div>

              <div className="mt-4 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-[9px] text-blue-600 dark:text-blue-300 italic text-center font-medium">
                 ℹ️ Girdiğiniz değerlere göre ödeme tablosu anlık olarak aşağıda güncellenmektedir.
              </div>
           </div>
        </div>

        {/* Summary Dashboard */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           {summary ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                 <div className="panel p-8 bg-surface border-4 border-blue-500 shadow-xl rounded-[2.5rem] flex flex-col items-center text-center">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic mb-2">Aylık Taksit</span>
                    <div className="text-3xl font-black text-primary italic tracking-tighter">
                       {summary.monthlyPayment.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺
                    </div>
                 </div>
                 <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] flex flex-col items-center text-center">
                    <span className="text-[9px] font-black text-muted uppercase tracking-widest italic mb-2">Toplam Faiz</span>
                    <div className="text-3xl font-black text-red-600 italic tracking-tighter">
                       {summary.totalInterest.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺
                    </div>
                 </div>
                 <div className="panel p-8 bg-secondary/5 border-border rounded-[2.5rem] flex flex-col items-center text-center">
                    <span className="text-[9px] font-black text-muted uppercase tracking-widest italic mb-2">Geri Ödeme</span>
                    <div className="text-3xl font-black text-primary italic tracking-tighter">
                       {summary.totalPayment.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-48 flex items-center justify-center bg-secondary/5 rounded-[2.5rem] border-dashed border-4 border-border/40 grayscale opacity-40">
                 <span className="text-[10px] font-black text-muted uppercase tracking-widest italic">Hesaplama İçin Verileri Doldurun</span>
              </div>
           )}

           {/* Amortization Table */}
           {summary && (
              <div className="panel bg-surface border border-border rounded-[2.5rem] overflow-hidden shadow-2xl animate-result">
                 <div className="p-6 border-b border-border bg-secondary/5 flex justify-between items-center">
                    <h3 className="text-xs font-black text-primary uppercase tracking-widest italic">📅 Detaylı Ödeme Planı (Amortizasyon)</h3>
                    <span className="text-[9px] font-bold text-muted uppercase">{term} Taksit</span>
                 </div>
                 <div className="max-h-[500px] overflow-y-auto custom-pb-scrollbar">
                    <table className="w-full text-left border-collapse">
                       <thead className="sticky top-0 bg-white dark:bg-zinc-900 border-b-2 border-border z-10">
                          <tr>
                             <th className="p-4 text-[9px] font-black text-muted uppercase tracking-widest">Dönem</th>
                             <th className="p-4 text-[9px] font-black text-muted uppercase tracking-widest">Taksit</th>
                             <th className="p-4 text-[9px] font-black text-muted uppercase tracking-widest">Anapara</th>
                             <th className="p-4 text-[9px] font-black text-muted uppercase tracking-widest">Faiz</th>
                             <th className="p-4 text-[9px] font-black text-muted uppercase tracking-widest text-right">Kalan Borç</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-border/30">
                          {summary.schedule.map((row) => (
                             <tr key={row.period} className="hover:bg-blue-500/5 transition-colors group">
                                <td className="p-4 text-[11px] font-black text-muted italic">#{row.period}</td>
                                <td className="p-4 text-[11px] font-bold text-primary">{row.payment.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</td>
                                <td className="p-4 text-[11px] font-bold text-green-600">{row.principal.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</td>
                                <td className="p-4 text-[11px] font-bold text-red-500">{row.interestAmt.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</td>
                                <td className="p-4 text-[11px] font-black text-primary text-right">{row.balance.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
                 <div className="p-6 bg-secondary/5 text-center">
                    <span className="text-[9px] font-black text-muted uppercase tracking-widest italic">Analizin Sonu</span>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
