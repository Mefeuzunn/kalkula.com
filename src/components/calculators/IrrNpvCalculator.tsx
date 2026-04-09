"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";

type CashFlow = { id: number; year: number; amount: string };

export function IrrNpvCalculator() {
  const [discountRate, setDiscountRate] = useState("10");
  const [initialInvestment, setInitialInvestment] = useState("");
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { id: 1, year: 1, amount: "" },
    { id: 2, year: 2, amount: "" },
    { id: 3, year: 3, amount: "" }
  ]);
  const [result, setResult] = useState<{ npv: number; irr: number | string; totalCashFlow: number; isProfitable: boolean } | null>(null);

  // IRR Hesaplama Algoritması (Newton-Raphson)
  const calculateIRR = (flows: number[]) => {
    let guess = 0.1;
    const maxIterations = 100;
    const precision = 1e-7;

    for (let i = 0; i < maxIterations; i++) {
      let npv = 0;
      let dNpv = 0;
      for (let j = 0; j < flows.length; j++) {
        const factor = Math.pow(1 + guess, j);
        npv += flows[j] / factor;
        if (j > 0) {
          dNpv -= j * flows[j] / (factor * (1 + guess));
        }
      }
      const newGuess = guess - npv / dNpv;
      if (Math.abs(newGuess - guess) < precision) return newGuess * 100;
      guess = newGuess;
    }
    return "Hesaplanamadı (Karmaşık Akış)";
  };

  const calculate = () => {
    const inv = -Math.abs(parseFloat(initialInvestment));
    const rate = parseFloat(discountRate) / 100;
    
    if (isNaN(inv)) return;

    const flows = [inv, ...cashFlows.map(cf => parseFloat(cf.amount) || 0)];
    
    // NPV = SUM( CF_t / (1+r)^t )
    let npv = 0;
    let totalCashFlow = 0;
    flows.forEach((amount, t) => {
      npv += amount / Math.pow(1 + rate, t);
      if (t > 0) totalCashFlow += amount;
    });

    const irr = calculateIRR(flows);
    const isProfitable = npv > 0;

    setResult({ npv, irr, totalCashFlow, isProfitable });
    if (isProfitable) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ["#2dd4bf", "#14b8a6"] });
    }
  };

  const addYear = () => {
    setCashFlows([...cashFlows, { id: Date.now(), year: cashFlows.length + 1, amount: "" }]);
  };

  const removeYear = (id: number) => {
    if (cashFlows.length <= 1) return;
    const newList = cashFlows.filter(cf => cf.id !== id).map((cf, i) => ({ ...cf, year: i + 1 }));
    setCashFlows(newList);
  };

  const updateFlow = (id: number, val: string) => {
    setCashFlows(cashFlows.map(cf => cf.id === id ? { ...cf, amount: val } : cf));
  };

  const fmt = (val: number) => val.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-muted uppercase px-1 tracking-widest">Başlangıç Yatırımı (Eksi)</label>
          <div className="relative">
             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 font-bold">₺</span>
             <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} className="input-field !pl-8 py-4 font-bold text-red-500" placeholder="100.000" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-muted uppercase px-1 tracking-widest">Beklenen İskonto Oranı (%)</label>
          <input type="number" value={discountRate} onChange={e => setDiscountRate(e.target.value)} className="input-field py-4 font-bold" placeholder="10" />
        </div>
      </div>

      <div className="panel p-6 bg-surface/40 border-2 border-border rounded-3xl">
        <div className="flex justify-between items-center mb-6">
           <span className="text-xs font-black text-muted uppercase tracking-widest">Yıllık Nakit Akışları</span>
           <button onClick={addYear} className="text-xs font-bold text-accent-primary hover:text-accent-primary/80">+ Yıl Ekle</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cashFlows.map((cf) => (
            <div key={cf.id} className="flex gap-2 items-center animate-fadeIn">
               <div className="w-12 h-10 flex items-center justify-center bg-secondary/10 rounded-xl text-[10px] font-black text-muted">YIL {cf.year}</div>
               <div className="relative flex-grow">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500/50 text-xs">$</span>
                 <input type="number" value={cf.amount} onChange={e => updateFlow(cf.id, e.target.value)} className="input-field !pl-6 !py-2" placeholder="Nakit Girişi" />
               </div>
               <button onClick={() => removeYear(cf.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
               </button>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-primary py-5 text-xl font-bold shadow-2xl" onClick={calculate}>Proje Verimliliğini Hesapla</button>

      {result && (
        <div className="result-container-premium animate-result">
           <div className={`result-card-premium ${!result.isProfitable ? 'border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]' : ''}`}>
              <div className={`result-badge ${result.isProfitable ? '!bg-green-500/10 !text-green-500 !border-green-500/20' : '!bg-red-500/10 !text-red-500 !border-red-500/20'}`}>
                {result.isProfitable ? 'PROJE KABUL EDİLEBİLİR' : 'PROJE VERİMSİZ'}
              </div>
              
              <div className={`text-4xl font-black mb-2 ${result.isProfitable ? 'text-accent-primary' : 'text-red-500'}`}>
                 {typeof result.irr === 'number' ? `%${result.irr.toFixed(2)}` : result.irr}
              </div>
              <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-8">İç Verim Oranı (IRR)</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-border">
                 <div className="text-left p-6 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Net Bugünkü Değer (NPV)</div>
                    <div className={`font-bold text-xl ${result.npv >= 0 ? 'text-accent-primary' : 'text-red-500'}`}>{fmt(result.npv)}</div>
                 </div>
                 <div className="text-left p-6 bg-secondary/10 rounded-2xl">
                    <div className="text-[10px] font-black text-muted uppercase mb-1">Toplam Nakit Girişi</div>
                    <div className="font-bold text-xl text-primary">{fmt(result.totalCashFlow)}</div>
                 </div>
              </div>

              <div className={`mt-6 p-5 rounded-2xl text-[11px] font-medium leading-relaxed ${result.isProfitable ? 'bg-green-500/5 text-green-600 border border-green-500/10' : 'bg-red-500/5 text-red-600 border border-red-500/10'}`}>
                 {result.isProfitable 
                   ? `💡 Bu yatırım, beklediğiniz %${discountRate} getiri oranının üzerinde bir verimlilik sağlıyor. NPV pozitif olduğu için proje finansal olarak mantıklı görünüyor.` 
                   : `⚠️ Dikkat! Yatırımınız %${discountRate} iskonto oranına göre negatif değer üretiyor. Harcanan para, beklenen getiriden daha az değer yaratıyor.`}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
