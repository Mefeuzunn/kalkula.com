"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function CommercialAnalytics() {
  const [cost, setCost] = useState("1000");
  const [price, setPrice] = useState("1500");
  const [fixedCosts, setFixedCosts] = useState("5000");
  
  const [results, setResults] = useState<{
    profit: number;
    margin: number;
    markup: number;
    breakevenUnits: number;
    breakevenRevenue: number;
  } | null>(null);

  const calculate = () => {
    const c = parseFloat(cost) || 0;
    const p = parseFloat(price) || 0;
    const fc = parseFloat(fixedCosts) || 0;

    if (p <= 0 || c <= 0) {
      setResults(null);
      return;
    }

    const profit = p - c;
    const margin = (profit / p) * 100;
    const markup = (profit / c) * 100;
    const unitContribution = p - c;
    
    // Break-even Units = Fixed Costs / (Price - Variable Cost)
    const breakevenUnits = unitContribution > 0 ? Math.ceil(fc / unitContribution) : 0;
    const breakevenRevenue = breakevenUnits * p;

    setResults({
      profit,
      margin,
      markup,
      breakevenUnits,
      breakevenRevenue
    });

    if (profit > 0) {
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.7 },
        colors: ["#10b981", "#3b82f6"]
      });
    }
  };

  useEffect(() => {
    calculate();
  }, [cost, price, fixedCosts]);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="panel p-8 bg-secondary/5 border-border rounded-[3rem] border-b-8 border-emerald-500/20 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Birim Maliyet (TL)</label>
                 <input 
                    type="number" 
                    value={cost} 
                    onChange={e => setCost(e.target.value)}
                    className="input-field !text-2xl !py-4 font-black border-4 border-border transition-all"
                    placeholder="1000"
                 />
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Satış Fiyatı (TL)</label>
                 <input 
                    type="number" 
                    value={price} 
                    onChange={e => setPrice(e.target.value)}
                    className="input-field !text-2xl !py-4 font-black border-4 border-border transition-all"
                    placeholder="1500"
                 />
              </div>

              <div className="w-full h-px bg-border/40 my-2"></div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 italic">Aylık Sabit Giderler (TL)</label>
                 <div className="relative">
                    <input 
                       type="number" 
                       value={fixedCosts} 
                       onChange={e => setFixedCosts(e.target.value)}
                       className="input-field font-bold pr-16"
                       placeholder="5000"
                    />
                    <span className="absolute right-6 top-[28%] text-muted text-[8px] font-black italic">FIXED</span>
                 </div>
                 <p className="text-[9px] text-muted italic px-2">Kira, maaş, elektrik vb. satıştan bağımsız maliyetler.</p>
              </div>
           </div>
        </div>

        {/* Analytics Hub */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           {results ? (
              <div className="result-container-premium !animate-none h-full">
                 <div className="result-card-premium !p-8 h-full bg-white dark:bg-zinc-900 border-4 border-emerald-500/10 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-black italic text-[10px] text-emerald-600 tracking-[0.3em] uppercase rotate-12">Business Intelligence v1.0</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                       <div className="p-8 bg-emerald-500/5 rounded-[2.5rem] border border-emerald-500/20 flex flex-col items-center text-center">
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic mb-2">Birim Kâr Oranı (Marj)</span>
                          <div className="text-4xl font-black italic tracking-tighter text-primary">
                             %{results.margin.toFixed(1)}
                          </div>
                          <p className="mt-2 text-[10px] font-bold text-muted uppercase italic">Birim Kâr: {results.profit.toLocaleString()} TL</p>
                       </div>

                       <div className="p-8 bg-blue-500/5 rounded-[2.5rem] border border-blue-500/20 flex flex-col items-center text-center">
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic mb-2">Markup (Kâr Payı)</span>
                          <div className="text-4xl font-black italic tracking-tighter text-primary">
                             %{results.markup.toFixed(1)}
                          </div>
                          <p className="mt-2 text-[10px] font-bold text-muted uppercase italic">Maliyet Üzerine Artış</p>
                       </div>
                    </div>

                    {/* Break-even Visualization */}
                    <div className="panel p-8 bg-secondary/5 rounded-[3rem] border border-border group hover:border-emerald-500/30 transition-all">
                       <div className="flex items-center gap-4 mb-8">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl">📈</div>
                          <div className="flex flex-col">
                             <h4 className="text-[10px] font-black text-primary uppercase tracking-widest italic">Başabaş Noktası Analizi</h4>
                             <p className="text-[9px] text-muted font-bold italic">Sıfır Kâr - Sıfır Zarar Eşiği</p>
                          </div>
                       </div>

                       <div className="flex flex-col items-center text-center gap-6">
                          <div className="flex flex-col">
                             <span className="text-[11px] font-black text-muted uppercase italic mb-1">Kâra Geçmek İçin Satılması Gereken</span>
                             <div className="text-4xl font-black italic tracking-tighter text-emerald-600">
                                {results.breakevenUnits.toLocaleString()} <span className="text-sm not-italic ml-1">ADET</span>
                             </div>
                          </div>

                          <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden flex relative">
                             <div className="absolute left-[33%] top-0 h-full w-0.5 bg-red-500 z-10 animate-pulse"></div>
                             <div className="h-full w-[33%] bg-red-500/20"></div>
                             <div className="h-full flex-1 bg-emerald-500/20"></div>
                             <div className="absolute left-[33%] -top-4 text-[8px] font-black text-red-500 uppercase tracking-tighter italic">Risk Eşiği</div>
                          </div>

                          <div className="text-[10px] font-bold text-muted italic">
                             Aylık minimum<b> {results.breakevenRevenue.toLocaleString()} TL</b> ciro yapmalısınız.
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 p-4 bg-white/40 dark:bg-zinc-800/40 rounded-2xl border border-border text-[9px] text-muted/60 font-bold uppercase text-center tracking-[0.2em] leading-relaxed">
                       ℹ️ Kâr Marjı (Margin), satış fiyatı üzerinden; Markup ise maliyet üzerinden hesaplanan kâr oranını temsil eder.
                    </div>
                 </div>
              </div>
           ) : (
              <div className="panel h-full flex flex-col items-center justify-center p-12 bg-secondary/5 rounded-[3rem] border-dashed border-4 border-border/40 grayscale opacity-40 text-center">
                 <div className="text-6xl mb-6">📉</div>
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-widest italic leading-relaxed">
                    TİCARİ ANALİZ İÇİN<br/>MALİYET VE FİYAT GİRİNİZ
                 </h4>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
